/* Timestep sensitivity comparison for GravitySimulation. Each run starts from
 * the same initial orbit. The finest run is a numerical reference, not truth.
 * All reported maxima are over the 241 common output samples. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./physics.js'));
  } else {
    root.GravityAnalysis = factory(root.GravitySimulation);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (GravitySimulation) {
  'use strict';

  const SAMPLE_COUNT = 241;
  const MAX_WALL_TIME_MS = 45000;
  const clock = () => typeof performance !== 'undefined' ? performance.now() : Date.now();

  function snapshotSettings(input) {
    const settings = {
      mode: input.mode ?? 'fixed',
      delay: input.delay ?? 0,
      propagationSpeed: input.propagationSpeed ?? 2,
      dt: input.dt ?? 1 / 600,
      duration: input.duration ?? 20
    };
    if (!Number.isFinite(settings.dt) || settings.dt < 1 / 2400 || settings.dt > 0.05) {
      throw new RangeError('Analysis maximum timestep must be between 1/2400 and 0.05 seconds');
    }
    if (![10, 20, 60].includes(settings.duration)) throw new RangeError('Analysis duration must be 10, 20, or 60 seconds');
    if (!['fixed', 'propagation'].includes(settings.mode)) throw new RangeError('Unknown analysis force mode');
    if (!Number.isFinite(settings.delay) || settings.delay < 0 || settings.delay > 6) throw new RangeError('Analysis delay must be between 0 and 6 seconds');
    if (!Number.isFinite(settings.propagationSpeed) || settings.propagationSpeed < 2 || settings.propagationSpeed > 100) {
      throw new RangeError('Analysis signal speed must be between 2 and 100');
    }
    return settings;
  }

  function sampleState(sim, t, initialEnergy) {
    // This read-only engine hook evaluates its cubic Hermite position AND
    // derivative at the exact requested time, including between saved steps.
    const state = sim._positionsAt(t, null, sim.dt, true);
    if (!state.every(Number.isFinite)) throw new Error('Non-finite interpolated state');
    const separation = Math.hypot(state[0] - state[2], state[1] - state[3]);
    const kinetic = state.slice(4).reduce((sum, v) => sum + v * v / 2, 0);
    const energy = kinetic - 1 / Math.sqrt(separation * separation + sim.softening * sim.softening);
    return {
      t,
      positions: [state.slice(0, 2), state.slice(2, 4)],
      energyChange: (energy - initialEnergy) / Math.abs(initialEnergy),
      separation,
      speed: Math.max(Math.hypot(state[4], state[5]), Math.hypot(state[6], state[7]))
    };
  }

  function positionDifference(a, b) {
    return Math.max(...a.positions.map((p, body) => Math.hypot(p[0] - b.positions[body][0], p[1] - b.positions[body][1])));
  }

  function runAnalysis(input = {}, onProgress = () => {}) {
    const settings = snapshotSettings(input);
    if (typeof onProgress !== 'function') throw new TypeError('Progress callback must be a function');
    const startedAt = clock();
    const runs = [];
    let lastProgressAt = -Infinity;
    const checkTime = () => {
      if (clock() - startedAt > MAX_WALL_TIME_MS) {
        throw new Error('Analysis exceeded its 45-second compute limit. Try a shorter duration or larger maximum timestep.');
      }
    };

    for (let runIndex = 0; runIndex < 4; runIndex++) {
      const dt = settings.dt / (2 ** runIndex);
      let sim;
      try {
        checkTime();
        sim = new GravitySimulation({ ...settings, dt });
        const initialEnergy = sim.energy();
        const series = [];
        onProgress({ runIndex, progress: 0 });
        lastProgressAt = clock();
        for (let sampleIndex = 0; sampleIndex < SAMPLE_COUNT; sampleIndex++) {
          const t = settings.duration * sampleIndex / (SAMPLE_COUNT - 1);
          // Advance to the first integration endpoint at or after t. Using
          // history interpolation avoids comparing mismatched run endpoints.
          const targetTick = Math.ceil(t / dt);
          while (sim._tick < targetTick) {
            sim.step(Math.min(512, targetTick - sim._tick));
            checkTime();
            if (clock() - lastProgressAt >= 80) {
              // Reserve exactly 1 for a fully sampled, successfully finished run.
              onProgress({ runIndex, progress: Math.min(1 - Number.EPSILON, sim.t / settings.duration) });
              lastProgressAt = clock();
            }
          }
          series.push(sampleState(sim, t, initialEnergy));
        }
        runs.push({ dt, series });
        onProgress({ runIndex, progress: 1 });
      } catch (error) {
        const time = sim ? sim.t.toFixed(6) : '0.000000';
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Run ${runIndex + 1}/4 (dt=${dt.toPrecision(6)} s) stopped at t=${time} s: ${detail}`);
      }
    }

    const referenceIndex = runs.length - 1;
    const reference = runs[referenceIndex];
    for (const run of runs) {
      let maxPositionDifference = 0;
      let maxPositionDifferenceTime = 0;
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const gap = positionDifference(run.series[i], reference.series[i]);
        run.series[i].positionDifference = gap;
        if (gap > maxPositionDifference) {
          maxPositionDifference = gap;
          maxPositionDifferenceTime = run.series[i].t;
        }
      }
      run.maxPositionDifference = maxPositionDifference;
      run.maxPositionDifferenceTime = maxPositionDifferenceTime;
      run.finalPositionDifference = run.series[SAMPLE_COUNT - 1].positionDifference;
    }
    return { settings, referenceIndex, sampleCount: SAMPLE_COUNT, runs, elapsedMs: clock() - startedAt };
  }

  return { runAnalysis };
});
