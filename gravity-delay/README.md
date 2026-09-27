# Gravity, delayed

Interactive two-body toy requested by Normanj, with finite propagation requested by Henry. Public app: https://calyxfield.github.io/threejs-showcase/gravity-delay/

Serve this folder to use every feature. The orbit itself also works by opening index.html directly, but the sensitivity worker needs HTTP(S). No dependencies or build step. The optional curved-sheet illustration is at sheet.html and is independent of the orbit experiment.

## Orbit experiment

Two equal unit masses start in a circular orbit. Fixed delay uses a live 0–6 simulated-second slider. Finite speed instead solves cτ = |r_other(t−τ) − r_receiver(t)| at every force evaluation, with an adjustable signal speed from 2 to 100 distance units per simulated second. The initial body speed is about 0.5. Both modes pull the current receiver toward the historical source, using that distance and direction. This is delayed Newtonian gravity, not general relativity.

G=1, initial separation=2, softening=0.03. Negative-time history is a prescribed circular orbit. Initial period≈12.57. Integration uses RK4 with a selectable maximum timestep from 1/2400 to 1/20 s (default 1/600), with smaller steps for close encounters, cubic Hermite history and a within-step predictor for short delays. Finite speed uses safeguarded Newton/bisection and retains the full trajectory; it pauses at 300 simulated seconds, one million samples, or when the source history violates the solver's sub-signal-speed condition. Fixed delay retains a bounded six-second history.

Mode and timestep changes reset the orbit. The timestep slider preserves other settings; Default restores 1/600 s. Large steps can introduce numerical error, especially during close encounters. Delay and signal-speed sliders act live. Reset preserves selected controls and paused/running state. Trails retain 30 simulated seconds and the camera fits automatically. Colored velocity arrows share a visual scale; white force arrows show direction only. Numerical velocity components and actual travel delays are displayed. Energy is instantaneous kinetic plus softened gravitational potential energy, shown as ΔE/|E_initial|. That quantity need not be conserved by this toy force rule.

## Timestep sensitivity

The Run sensitivity analysis button compares four fresh runs from the same initial orbit at the selected maximum timestep, half, quarter and eighth of it. It snapshots the current force mode and its delay or signal speed, held constant for the selected 10, 20 (default) or 60 simulated seconds. It does not reset, pause or alter the live simulation. A dedicated Worker keeps the page responsive and can be cancelled.

The panel overlays body A paths and normalized energy changes, and lists final separation, final energy change and maximum body-position difference versus the finest run. Every run is sampled at 241 identical times using the physics history interpolation. Differences use the larger Euclidean position gap of the two bodies at each sample; reported maxima are over those samples. The finest run is a numerical comparison, not an exact solution or evidence that the force model is physically correct. Control changes mark old results as stale.

Runs retain the physics engine's safeguards, and analysis stops after 45 wall-clock seconds. Any failure stops the comparison with its run and time, without presenting incomplete results as success. Finite-speed analysis at the smallest selected step and 60 seconds exceeds the finest run's one-million-sample history limit near 52 seconds; choose a shorter duration. Close-encounter substeps remain active. Source files: analysis-core.js, analysis-worker.js and analysis-ui.js. Run `node analysis.test.mjs` for the analysis tests. Browser evidence is in /workspace/artifacts/gravity-delay-20260926/sensitivity/.

## Curved sheet

sheet.html, sheet.css and sheet.js provide a separate Canvas illustration. Its height sums softened retarded scalar potentials from prescribed circular source orbits. Colored rings mark outgoing signals. The field does not drive the bodies and is not a solution of Einstein's equations or a gravitational-wave waveform. Controls include speed, pause/reset, camera rotation/zoom, playback and signal-ring visibility. No external dependencies.

## Validation

Run `node physics.test.mjs`. Checks cover 40 zero-delay orbits, history interpolation, near-zero delays, half-step convergence, close encounters, long slider sweeps, propagation residuals, full-history retention, the high-c limit, symmetry and explicit limits. Chromium checks cover desktop/mobile layout, controls, velocity and energy outputs, live delay changes, finite-speed mode, and reset recovery. Sheet checks cover retarded-time residuals, controls and rendering. Evidence is in /workspace/artifacts/gravity-delay-20260926/finite-speed/ and /workspace/artifacts/gravity-delay-20260926/sheet/.
