import assert from 'node:assert/strict';
import GravitySimulation from './physics.js';

const norm = a => Math.hypot(...a.flat());
const distance = (a, b) => norm(a.flat().map((v, i) => v - b.flat()[i]));
const state = s => s.positions.flat().concat(s.velocities.flat());
const evolve = (delay, dt, duration) => new GravitySimulation({ delay, dt }).step(Math.round(duration / dt));
const report = (name, value) => console.log(`${name}: ${value}`);

// Circular orbit gives an independent analytic reference over forty revolutions.
{
  const sim = new GravitySimulation();
  const energy0 = sim.energy();
  sim.step(Math.round(40 * sim.period / sim.dt));
  const theta = 2 * Math.PI * sim.t / sim.period;
  const expected = [[-Math.cos(theta), -Math.sin(theta)], [Math.cos(theta), Math.sin(theta)]];
  const error = distance(sim.positions, expected);
  const energyDrift = Math.abs(sim.energy() - energy0);
  assert(error < 1e-8, `Circular phase/position error ${error}`);
  assert(energyDrift < 1e-11, `Energy drift ${energyDrift}`);
  assert(sim._history.length === sim._capacity * 8);
  assert(sim._capacity <= Math.ceil(6 / sim.dt) + 4);
  report('40-orbit circular position error / energy drift', `${error} / ${energyDrift}`);
}

// Fractional past samples and prehistory agree with the independent circular solution.
{
  const sim = evolve(0, 1 / 600, 8);
  for (const delay of [0, 0.0003, 0.7237, 5.9997, 6]) {
    const theta = 2 * Math.PI * (sim.t - delay) / sim.period;
    assert(distance(sim.pastPositions(delay), [[-Math.cos(theta), -Math.sin(theta)], [Math.cos(theta), Math.sin(theta)]]) < 1e-10);
  }
  sim.setDelay(6).reset();
  assert.equal(sim.delay, 6);
  assert.equal(sim.t, 0);
  assert.deepEqual(sim.positions, [[-1, 0], [1, 0]]);
  const theta = -2 * Math.PI * 6 / sim.period;
  assert(distance(sim.pastPositions(), [[-Math.cos(theta), -Math.sin(theta)], [Math.cos(theta), Math.sin(theta)]]) < 1e-14);
  report('History, six-second retention, and reset', 'passed');
}

// A delayed trajectory is compared at three resolutions, not merely to itself.
{
  const coarse = evolve(0.731, 1 / 150, 20);
  const medium = evolve(0.731, 1 / 300, 20);
  const fine = evolve(0.731, 1 / 600, 20);
  const coarseError = distance(state(coarse), state(medium));
  const fineError = distance(state(medium), state(fine));
  assert(fineError < 1e-6, `Delayed trajectory error ${fineError}`);
  assert(coarseError > fineError * 7, `Weak refinement ratio ${coarseError / fineError}`);
  const baseline = evolve(0, 1 / 600, 20);
  const difference = distance(fine.positions, baseline.positions);
  assert(difference > 0.5, `Delay has too little effect: ${difference}`);
  report('Delayed step-halving ratio / fine error / zero-delay separation', `${coarseError / fineError} / ${fineError} / ${difference}`);
}

// Small positive delay tests within-step interpolation and the continuous zero limit.
{
  const delay = 0.0002;
  const coarse = evolve(delay, 1 / 150, 10);
  const medium = evolve(delay, 1 / 300, 10);
  const fine = evolve(delay, 1 / 600, 10);
  const coarseError = distance(state(coarse), state(medium));
  const fineError = distance(state(medium), state(fine));
  assert(fineError < 1e-7);
  assert(coarseError > fineError * 5, `Small-delay refinement ratio ${coarseError / fineError}`);
  const nearZero = evolve(1e-10, 1 / 600, 10);
  const zero = evolve(0, 1 / 600, 10);
  assert(distance(state(nearZero), state(zero)) < 1e-8);
  report('Substep-delay refinement ratio / fine error', `${coarseError / fineError} / ${fineError}`);
}

// Maximum delay starts near an old source position and repeatedly traverses its
// softened core. A nominal fixed RK4 step alone fails this refinement check.
{
  const coarse = evolve(6, 1 / 600, 20);
  const medium = evolve(6, 1 / 1200, 20);
  const fine = evolve(6, 1 / 2400, 20);
  const coarseError = distance(state(coarse), state(medium));
  const fineError = distance(state(medium), state(fine));
  assert(coarseError < 1e-4, `Maximum-delay step-halving error ${coarseError}`);
  assert(fineError < coarseError / 8, `Maximum-delay refinement ratio ${coarseError / fineError}`);
  assert(coarse._capacity <= coarse.maxHistorySamples);
  report('Maximum-delay 20-second refinement ratio / nominal-step error', `${coarseError / fineError} / ${coarseError}`);
}

// Slider changes preserve a finite, centrosymmetric trajectory and full history.
{
  const sim = new GravitySimulation();
  for (const delay of [0, 6, 3, 0.1, 5.999, 0, 0.0001, 1.7, 6]) {
    sim.setDelay(delay).step(12000);
    assert(state(sim).every(Number.isFinite));
    assert(norm(sim.pastPositions(6)) > 0);
    for (let axis = 0; axis < 2; axis++) {
      assert(Math.abs(sim.positions[0][axis] + sim.positions[1][axis]) < 1e-9);
      assert(Math.abs(sim.velocities[0][axis] + sim.velocities[1][axis]) < 1e-9);
    }
    assert(sim._capacity <= sim.maxHistorySamples);
    assert(sim._length <= sim.maxHistorySamples);
  }
  report('180-second slider sweep, symmetry, finite state, bounded storage', 'passed');
}

// Accelerations use the current target and the other body's old source position.
{
  const sim = new GravitySimulation({ delay: 2 });
  const p = sim.pastPositions();
  const dx = p[1][0] - sim.positions[0][0];
  const dy = p[1][1] - sim.positions[0][1];
  const scale = (dx * dx + dy * dy + 0.03 ** 2) ** -1.5;
  assert(distance(sim.accelerations()[0], [dx * scale, dy * scale]) < 1e-14);
  assert.throws(() => sim.setDelay(NaN), RangeError);
  assert.throws(() => sim.step(-1), RangeError);
  assert.throws(() => sim.pastPositions(7), RangeError);
  report('Force definition and invalid inputs', 'passed');
}

// Independent analytic t=0 reference: the two circular-history points are
// separated by 2*cos(omega*tau/2), so c*tau equals that chord length.
{
  const sim = new GravitySimulation({ mode: 'propagation', propagationSpeed: 2 });
  const omega = 2 * Math.PI / sim.period;
  let lo = 0, hi = 1;
  for (let i = 0; i < 60; i++) {
    const tau = (lo + hi) / 2;
    if (2 * tau > 2 * Math.cos(omega * tau / 2)) hi = tau;
    else lo = tau;
  }
  const expected = (lo + hi) / 2;
  const samples = sim.forceSamples();
  assert(Math.abs(samples[0].delay - expected) < 1e-11);
  assert(distance(samples[0].position, [Math.cos(omega * expected), -Math.sin(omega * expected)]) < 1e-11);
  assert.deepEqual(samples[0].position.map(v => -v), samples[1].position);
  assert.equal(sim.t, 0, 'Sampling must not advance the simulation');
  report('Propagation analytic circular prehistory delay', samples[0].delay);
}

// Solve the actual retarded-time equation, including sources older than six
// seconds, and compare independently refined propagation trajectories.
{
  const run = (dt, duration, c = 2) => new GravitySimulation({ mode: 'propagation', dt, propagationSpeed: c }).step(Math.round(duration / dt));
  const coarse = run(1 / 150, 20), medium = run(1 / 300, 20), fine = run(1 / 600, 20);
  const coarseError = distance(state(coarse), state(medium));
  const fineError = distance(state(medium), state(fine));
  assert(fineError < 1e-8);
  assert(coarseError > fineError * 7);
  const sim = run(1 / 600, 100);
  for (const [receiver, sample] of sim.forceSamples().entries()) {
    const residual = Math.abs(sim.propagationSpeed * sample.delay - distance(sample.position, sim.positions[receiver]));
    assert(residual < 1e-9);
    assert(sample.delay > 6, 'Propagation history must not be clipped to the fixed slider range');
    assert(distance(sample.position, sim._positionsAt(sim.t - sample.delay).slice((1 - receiver) * 2, (2 - receiver) * 2)) < 1e-12);
  }
  assert(sim.forceSamples()[0].delay > fine.forceSamples()[0].delay);
  assert(sim._times[sim._head] === 0, 'Retain full positive-time propagation history');
  report('Propagation step-halving ratio / fine error / delay at t100', `${coarseError / fineError} / ${fineError} / ${sim.forceSamples()[0].delay}`);
}

// The high-signal-speed force and trajectory approach instantaneous gravity.
{
  const sim = new GravitySimulation({ mode: 'propagation', propagationSpeed: 1e8 });
  const baseline = new GravitySimulation();
  assert(distance(sim.accelerations(), baseline.accelerations()) < 1e-8);
  sim.step(6000);
  baseline.step(6000);
  const error = distance(state(sim), state(baseline));
  assert(error < 1e-6);
  report('High-c trajectory difference from instantaneous gravity at t10', error);
}

// Mode switches restart history while keeping controls; speed changes are live.
{
  const sim = new GravitySimulation({ delay: 1.7 });
  sim.step(600).setPropagationSpeed(100).setMode('propagation');
  assert.equal(sim.t, 0);
  assert.equal(sim.delay, 1.7);
  assert.equal(sim.propagationSpeed, 100);
  for (const c of [2, 100, 3, 2, 50]) {
    const before = sim.t;
    sim.setPropagationSpeed(c);
    assert.equal(sim.t, before);
    sim.step(6000);
    assert(state(sim).every(Number.isFinite));
    assert(Math.abs(sim.positions[0][0] + sim.positions[1][0]) < 1e-12);
    for (const [receiver, sample] of sim.forceSamples().entries()) {
      assert(Math.abs(c * sample.delay - distance(sample.position, sim.positions[receiver])) < 1e-9);
    }
  }
  sim.setMode('fixed');
  assert.equal(sim.t, 0);
  assert.equal(sim.delay, 1.7);
  assert.equal(sim.propagationSpeed, 50);
  assert.equal(sim.forceSamples()[0].delay, 1.7);
  assert.deepEqual(sim.forceSamples()[0].position, sim.pastPositions()[1]);
  report('Mode reset, live signal-speed changes, c endpoints, symmetry', 'passed');
}

// Limits stop explicitly rather than inventing missing history or selecting an
// ambiguous retarded root. A too-low c can be corrected without losing state.
{
  const sim = new GravitySimulation({ mode: 'propagation' });
  sim.step(180000);
  assert.equal(sim.t, 300);
  assert(sim._length < sim.maxHistorySamples);
  assert.throws(() => sim.step(), /300-second history limit/);
  const preserved = state(sim);
  sim.setPropagationSpeed(0.55);
  assert.throws(() => sim.forceSamples(), /source reached or exceeded/);
  assert.deepEqual(state(sim), preserved);
  sim.setPropagationSpeed(2).reset();
  assert.equal(sim.mode, 'propagation');
  assert.equal(sim.propagationSpeed, 2);
  assert.equal(sim._length, 1);
  sim.maxHistorySamples = 2;
  sim.step();
  assert.throws(() => sim.step(), /history limit/);
  assert.throws(() => sim.setPropagationSpeed(0.4), RangeError);
  report('Propagation duration, source-speed, sample-count limits', 'passed');
}

console.log('All numerical checks passed.');
