import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import GravitySimulation from './physics.js';
import GravityAnalysis from './analysis-core.js';

const gap = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const report = (name, value) => console.log(`${name}: ${value}`);

// Noncommensurate dt guarantees output times lie between integration endpoints.
// An independent circular solution checks exact-time positions and sampled energy.
{
  const progress = [];
  const settings = { dt: 0.037, duration: 10, mode: 'fixed', delay: 0, propagationSpeed: 2 };
  const result = GravityAnalysis.runAnalysis(settings, update => progress.push(update));
  assert.equal(result.runs.length, 4);
  assert.equal(result.referenceIndex, 3);
  assert.equal(result.sampleCount, 241);
  assert.deepEqual(result.settings, settings);
  const omega = 2 * Math.PI / new GravitySimulation().period;
  for (const [index, run] of result.runs.entries()) {
    assert.equal(run.dt, settings.dt / 2 ** index);
    assert.equal(run.series.length, 241);
    for (const [i, sample] of run.series.entries()) {
      assert.equal(sample.t, 10 * i / 240);
      const expected = [-Math.cos(omega * sample.t), -Math.sin(omega * sample.t)];
      assert(gap(sample.positions[0], expected) < 1e-7, 'Samples must use exact common times');
      assert(Math.abs(sample.separation - 2) < 1e-7);
      assert(Math.abs(sample.speed - omega) < 1e-7);
      assert(Math.abs(sample.energyChange) < 1e-7);
    }
    const differences = run.series.map((sample, i) => Math.max(...sample.positions.map((p, body) => gap(p, result.runs[3].series[i].positions[body]))));
    assert.equal(run.maxPositionDifference, Math.max(...differences));
    assert.equal(run.finalPositionDifference, differences.at(-1));
    assert(progress.some(p => p.runIndex === index && p.progress === 0));
    assert(progress.some(p => p.runIndex === index && p.progress === 1));
  }
  assert.equal(result.runs[3].maxPositionDifference, 0);
  assert(progress.every(p => p.progress >= 0 && p.progress <= 1));

  // Compare a between-step energy sample directly with the engine's Hermite
  // derivative; using velocities from the later endpoint would fail this test.
  const delayed = GravityAnalysis.runAnalysis({ ...settings, delay: 0.731 });
  const sim = new GravitySimulation({ dt: settings.dt, delay: 0.731 });
  const e0 = sim.energy();
  const sample = delayed.runs[0].series[7];
  sim.step(Math.ceil(sample.t / sim.dt));
  const s = sim._positionsAt(sample.t, null, sim.dt, true);
  const energy = s.slice(4).reduce((sum, v) => sum + v * v / 2, 0)
    - 1 / Math.sqrt((s[0] - s[2]) ** 2 + (s[1] - s[3]) ** 2 + sim.softening ** 2);
  assert(Math.abs(sample.energyChange - (energy - e0) / Math.abs(e0)) < 1e-12);
  report('Exact shared sampling, interpolation, sampled energy, gap metrics, progress', 'passed');
}

// Identical snapshots reproduce all numerical output. Caller mutation cannot
// change a run's force controls halfway through the comparison.
{
  const settings = { dt: 1 / 600, delay: 0.5, duration: 20 };
  const a = GravityAnalysis.runAnalysis(settings);
  const b = GravityAnalysis.runAnalysis(settings, () => { settings.delay = 6; });
  assert.deepEqual(a.runs, b.runs);
  assert.deepEqual(a.settings, b.settings);
  report('Default-size delayed comparison / repeatability', `${a.elapsedMs.toFixed(1)} ms / passed`);
}

// The deliberately coarse maximum-delay case must visibly improve with
// refinement, and the finite-speed mode must preserve its own force settings.
{
  const coarse = GravityAnalysis.runAnalysis({ dt: 0.05, delay: 6, duration: 20 });
  const differences = coarse.runs.map(run => run.finalPositionDifference);
  assert(differences[0] > 1);
  assert(differences[0] > differences[1] * 10);
  assert(differences[1] > differences[2] * 10);
  assert.equal(differences[3], 0);
  report('Maximum-delay final position gaps at dt / dt2 / dt4 / dt8', differences.join(' / '));

  const propagation = GravityAnalysis.runAnalysis({ mode: 'propagation', propagationSpeed: 2, dt: 1 / 600, duration: 20 });
  assert.equal(propagation.settings.mode, 'propagation');
  assert.equal(propagation.settings.propagationSpeed, 2);
  assert(propagation.runs[0].series.at(-1).separation > 10);
  assert(propagation.runs[0].maxPositionDifference < 1e-6);
  assert(propagation.elapsedMs < 45000);
  report('Default finite-speed comparison', `${propagation.elapsedMs.toFixed(1)} ms`);
}

// The finest requested propagation run cannot store 60 seconds at dt1/19200.
// It must fail explicitly, with run and time, instead of returning three runs.
{
  let completedRuns = 0;
  assert.throws(() => GravityAnalysis.runAnalysis({ mode: 'propagation', dt: 1 / 2400, duration: 60 }, p => {
    if (p.progress === 1) completedRuns++;
  }), /Run 4\/4 .* stopped at t=52\.083.*history limit/);
  assert.equal(completedRuns, 3);
  assert.throws(() => GravityAnalysis.runAnalysis({ dt: 0.1 }), RangeError);
  assert.throws(() => GravityAnalysis.runAnalysis({ duration: 21 }), RangeError);
  report('Model limit rejects the entire comparison; invalid settings rejected', 'passed');
}

// Exercise the classic-script worker wrapper with real imported browser builds.
{
  const messages = [], imports = [];
  const context = vm.createContext({ URL, performance, location: { href: 'https://example.test/analysis-worker.js?v=test-release' }, postMessage: message => messages.push(message) });
  context.self = context;
  context.importScripts = (...urls) => {
    for (const url of urls) {
      imports.push(url);
      vm.runInContext(fs.readFileSync(new URL(url.split('?')[0], import.meta.url), 'utf8'), context);
    }
  };
  vm.runInContext(fs.readFileSync(new URL('./analysis-worker.js', import.meta.url), 'utf8'), context);
  context.onmessage({ data: { type: 'start', settings: { dt: 0.05, duration: 10 } } });
  assert.deepEqual(imports, ['physics.js?v=test-release', 'analysis-core.js?v=test-release']);
  assert.equal(messages.filter(m => m.type === 'complete').length, 1);
  assert.equal(messages.at(-1).type, 'complete');
  messages.length = 0;
  context.onmessage({ data: { type: 'start', settings: { duration: 21 } } });
  assert.equal(messages.length, 1);
  assert.equal(messages[0].type, 'error');
  assert.match(messages[0].message, /duration/);
  messages.length = 0;
  let clockCalls = 0;
  context.performance = { now: () => clockCalls++ ? 45001 : 0 };
  context.onmessage({ data: { type: 'start', settings: { dt: 0.05, duration: 10 } } });
  assert.equal(messages.length, 1);
  assert.equal(messages[0].type, 'error');
  assert.match(messages[0].message, /Run 1\/4 .* t=0\.000000 s: Analysis exceeded its 45-second compute limit/);
  report('Versioned worker imports, progress/completion, errors and compute limit', 'passed');
}

console.log('All sensitivity-analysis checks passed.');
