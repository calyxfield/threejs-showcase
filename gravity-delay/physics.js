/*
 * Two equal unit masses, G = 1, dimensionless time and distance.
 * a_i(t) = (p_j(t-delay) - p_i(t)) /
 *          (|p_j(t-delay) - p_i(t)|² + epsilon²)^(3/2), epsilon = 0.03.
 * This is a deliberately delayed Newtonian toy, not general relativity.
 * A circular orbit supplies the prescribed history before t = 0; with a
 * positive delay that history is an initial condition, not a delayed solution.
 * RK4 uses cubic Hermite interpolation of stored position/velocity samples.
 * Close encounters subdivide the public time step using the local gravitational
 * time scale; their extra samples are retained in the same bounded history.
 * Delays shorter than one step use four endpoint-predictor iterations for
 * within-step history; delay = 0 uses ordinary, simultaneous RK4 stages.
 * Fixed-delay history covers MAX_DELAY even while delay is zero.
 * Finite-propagation mode instead solves c*tau = |p_j(t-tau)-p_i(t)|
 * independently at each RK stage. It retains the complete positive-time
 * history, stops after 300 simulated seconds or one million samples, and
 * requires all interpolated source speeds < c so the retarded root is unique.
 * These explicit limits never substitute a clipped or invented source time.
 */
(function (root, factory) {
  const GravitySimulation = factory();
  if (typeof module === 'object' && module.exports) module.exports = GravitySimulation;
  else root.GravitySimulation = GravitySimulation;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const MAX_DELAY = 6;
  const SOFTENING = 0.03;
  const OMEGA = Math.sqrt(2 / Math.pow(4 + SOFTENING * SOFTENING, 1.5));

  class GravitySimulation {
    constructor({ dt = 1 / 600, delay = 0, mode = 'fixed', propagationSpeed = 2 } = {}) {
      if (!Number.isFinite(dt) || dt < 0.00001 || dt > 0.05) {
        throw new RangeError('dt must be between 0.00001 and 0.05 seconds');
      }
      this.dt = dt;
      this.period = 2 * Math.PI / OMEGA;
      this.softening = SOFTENING;
      this.maxDelay = MAX_DELAY;
      this._capacity = Math.ceil(MAX_DELAY / dt) + 4;
      this._history = new Float64Array(this._capacity * 8);
      this._times = new Float64Array(this._capacity);
      this._minStep = Math.min(dt / 64, 1 / 40000);
      this.maxHistorySamples = Math.ceil(MAX_DELAY / this._minStep) + 256;
      this.maxPropagationTime = 300;
      this.mode = mode;
      if (mode !== 'fixed' && mode !== 'propagation') throw new RangeError('Unknown force mode');
      this.setPropagationSpeed(propagationSpeed);
      this.setDelay(delay);
      this.reset();
    }

    setDelay(seconds) {
      if (!Number.isFinite(seconds)) throw new RangeError('Delay must be finite');
      this.delay = Math.max(0, Math.min(MAX_DELAY, seconds));
      return this;
    }

    setMode(mode) {
      if (mode !== 'fixed' && mode !== 'propagation') throw new RangeError('Unknown force mode');
      if (mode !== this.mode) {
        this.mode = mode;
        this.reset();
      }
      return this;
    }

    setPropagationSpeed(speed) {
      if (!Number.isFinite(speed) || speed <= OMEGA) {
        throw new RangeError('Signal speed must exceed the initial source speed (about 0.5)');
      }
      this.propagationSpeed = speed;
      return this;
    }

    _checkPropagation(state = this._state) {
      const speed = Math.max(this._maxSourceSpeed, Math.hypot(state[4], state[5]), Math.hypot(state[6], state[7]));
      if (speed >= this.propagationSpeed) {
        throw new Error('Signal-speed model limit: a source reached or exceeded the signal speed. Increase signal speed or reset.');
      }
    }

    // Restart at t = 0, retaining the selected delay and integration step.
    reset() {
      this.t = 0;
      this._tick = 0;
      this._state = [-1, 0, 1, 0, 0, -OMEGA, 0, OMEGA];
      this.positions = [[-1, 0], [1, 0]];
      this.velocities = [[0, -OMEGA], [0, OMEGA]];
      this._capacity = Math.ceil(MAX_DELAY / this.dt) + 4;
      this._history = new Float64Array(this._capacity * 8);
      this._times = new Float64Array(this._capacity);
      this.maxHistorySamples = this.mode === 'propagation' ? 1000000 : Math.ceil(MAX_DELAY / this._minStep) + 256;
      this._maxSourceSpeed = OMEGA;
      this._head = 0;
      this._length = 0;
      this._save();
      return this;
    }

    _interpolatedSpeedBound(next, h) {
      let bound = this._maxSourceSpeed;
      // A Hermite curve's velocity lies in the convex hull of these three
      // quadratic Bezier controls. Bound ALL interpolated source speeds,
      // not merely the velocities at the saved endpoints.
      for (let body = 0; body < 4; body += 2) {
        const vx = next[body + 4], vy = next[body + 5];
        const mx = 3 * (next[body] - this._state[body]) / h - vx - this._state[body + 4];
        const my = 3 * (next[body + 1] - this._state[body + 1]) / h - vy - this._state[body + 5];
        bound = Math.max(bound, Math.hypot(vx, vy), Math.hypot(mx, my));
      }
      return bound;
    }

    _save() {
      // Propagation needs the entire history; fixed mode keeps a six-second bracket.
      while (this.mode === 'fixed' && this._length > 2 && this._times[(this._head + 1) % this._capacity] < this.t - MAX_DELAY) {
        this._head = (this._head + 1) % this._capacity;
        this._length--;
      }
      if (this._length === this._capacity) {
        const capacity = Math.min(this.maxHistorySamples, this._capacity * 2);
        if (capacity === this._capacity) throw new Error('Signal-speed model history limit reached (one million samples). Reset to restart.');
        const history = new Float64Array(capacity * 8), times = new Float64Array(capacity);
        for (let i = 0; i < this._length; i++) {
          const index = (this._head + i) % this._capacity;
          history.set(this._history.subarray(index * 8, index * 8 + 8), i * 8);
          times[i] = this._times[index];
        }
        this._history = history;
        this._times = times;
        this._head = 0;
        this._capacity = capacity;
      }
      const index = (this._head + this._length) % this._capacity;
      this._times[index] = this.t;
      this._history.set(this._state, index * 8);
      this._length++;
    }

    _positionsAt(time, endpoint, stepSize = this.dt, includeVelocity = false) {
      if (time < 0) {
        const c = Math.cos(OMEGA * time), s = Math.sin(OMEGA * time);
        const p = [-c, -s, c, s];
        return includeVelocity ? p.concat([OMEGA * s, -OMEGA * c, -OMEGA * s, OMEGA * c]) : p;
      }
      if (time >= this.t && !endpoint) return this._state.slice(0, includeVelocity ? 8 : 4);
      let left, right, leftOffset, rightOffset, u, width;
      if (time > this.t) {
        left = this._state;
        right = endpoint;
        leftOffset = rightOffset = 0;
        width = stepSize;
        u = Math.min(1, (time - this.t) / width);
      } else {
        if (time < this._times[this._head] - 1e-10) throw new RangeError('Requested time is outside retained history');
        let lo = 0, hi = this._length - 1;
        while (hi - lo > 1) {
          const mid = (lo + hi) >>> 1;
          if (this._times[(this._head + mid) % this._capacity] <= time) lo = mid;
          else hi = mid;
        }
        if (lo === hi) return this._state.slice(0, includeVelocity ? 8 : 4);
        const li = (this._head + lo) % this._capacity;
        const ri = (this._head + hi) % this._capacity;
        left = right = this._history;
        leftOffset = li * 8;
        rightOffset = ri * 8;
        width = this._times[ri] - this._times[li];
        u = Math.max(0, Math.min(1, (time - this._times[li]) / width));
      }
      const u2 = u * u, u3 = u2 * u;
      const h00 = 2 * u3 - 3 * u2 + 1;
      const h10 = (u3 - 2 * u2 + u) * width;
      const h01 = -2 * u3 + 3 * u2;
      const h11 = (u3 - u2) * width;
      const p = new Array(includeVelocity ? 8 : 4);
      for (let i = 0; i < 4; i++) {
        p[i] = h00 * left[leftOffset + i] + h10 * left[leftOffset + i + 4]
          + h01 * right[rightOffset + i] + h11 * right[rightOffset + i + 4];
        if (includeVelocity) {
          p[i + 4] = (6 * u2 - 6 * u) / width * left[leftOffset + i]
            + (3 * u2 - 4 * u + 1) * left[leftOffset + i + 4]
            + (-6 * u2 + 6 * u) / width * right[rightOffset + i]
            + (3 * u2 - 2 * u) * right[rightOffset + i + 4];
        }
      }
      return p;
    }

    pastPositions(delay = this.delay) {
      if (!Number.isFinite(delay) || delay < 0 || delay > MAX_DELAY) {
        throw new RangeError('History delay must be between 0 and 6 seconds');
      }
      const p = this._positionsAt(this.t - delay);
      return [[p[0], p[1]], [p[2], p[3]]];
    }

    _retardedSource(state, time, receiver, endpoint, h) {
      const other = 2 - receiver;
      const c = this.propagationSpeed;
      // At hi the source lies in the analytic prehistory and has radius one,
      // so c*hi is provably at least the receiver-to-source distance.
      let lo = 0;
      let hi = Math.max(time, (Math.hypot(state[receiver], state[receiver + 1]) + 1) / c) + 1;
      let tau = Math.min(hi, Math.hypot(state[other] - state[receiver], state[other + 1] - state[receiver + 1]) / c);
      for (let iteration = 0; iteration < 64; iteration++) {
        const sample = this._positionsAt(time - tau, endpoint, h, true);
        const dx = sample[other] - state[receiver], dy = sample[other + 1] - state[receiver + 1];
        const distance = Math.hypot(dx, dy);
        const residual = c * tau - distance;
        if (Math.abs(residual) < 1e-11 * Math.max(1, distance)) {
          return { position: [sample[other], sample[other + 1]], delay: tau };
        }
        if (residual > 0) hi = tau;
        else lo = tau;
        const derivative = c + (distance ? (dx * sample[other + 4] + dy * sample[other + 5]) / distance : 0);
        const candidate = tau - residual / derivative;
        tau = candidate > lo && candidate < hi ? candidate : (lo + hi) / 2;
      }
      throw new Error('Retarded source solver did not converge. Reset or increase signal speed.');
    }

    _samplesFor(state, time, endpoint, h = this.dt) {
      if (this.mode === 'fixed') {
        const past = this.delay === 0 ? state : this._positionsAt(time - this.delay, endpoint, h);
        return [{ position: [past[2], past[3]], delay: this.delay }, { position: [past[0], past[1]], delay: this.delay }];
      }
      this._checkPropagation(state);
      return [this._retardedSource(state, time, 0, endpoint, h), this._retardedSource(state, time, 2, endpoint, h)];
    }

    // Indexed by RECEIVER: entry 0 is body 1's old position pulling on body 0.
    forceSamples() {
      return this._samplesFor(this._state, this.t, null);
    }

    _sourcePositions(state, time, endpoint, h) {
      if (this.mode === 'fixed') return this.delay === 0 ? state : this._positionsAt(time - this.delay, endpoint, h);
      const samples = this._samplesFor(state, time, endpoint, h);
      return samples[1].position.concat(samples[0].position);
    }

    _acceleration(state, past) {
      const a = new Array(4);
      for (let i = 0; i < 4; i += 2) {
        const other = 2 - i;
        const dx = past[other] - state[i];
        const dy = past[other + 1] - state[i + 1];
        const r2 = dx * dx + dy * dy + SOFTENING * SOFTENING;
        const scale = 1 / (r2 * Math.sqrt(r2));
        a[i] = dx * scale;
        a[i + 1] = dy * scale;
      }
      return a;
    }

    accelerations() {
      const a = this._acceleration(this._state, this._sourcePositions(this._state, this.t, null, this.dt));
      return [[a[0], a[1]], [a[2], a[3]]];
    }

    _derivative(state, time, endpoint, h) {
      const past = this._sourcePositions(state, time, endpoint, h);
      return state.slice(4).concat(this._acceleration(state, past));
    }

    _rk4(endpoint, h) {
      const y = this._state;
      const k1 = this._derivative(y, this.t, endpoint, h);
      const k2 = this._derivative(y.map((v, i) => v + h * k1[i] / 2), this.t + h / 2, endpoint, h);
      const k3 = this._derivative(y.map((v, i) => v + h * k2[i] / 2), this.t + h / 2, endpoint, h);
      const k4 = this._derivative(y.map((v, i) => v + h * k3[i]), this.t + h, endpoint, h);
      return y.map((v, i) => v + h * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6);
    }

    step(count = 1) {
      if (!Number.isSafeInteger(count) || count < 0) throw new RangeError('Step count must be a nonnegative integer');
      for (let n = 0; n < count; n++) {
        const targetTime = (this._tick + 1) * this.dt;
        if (this.mode === 'propagation' && targetTime > this.maxPropagationTime + 1e-10) {
          throw new Error('Signal-speed model reached its 300-second history limit. Reset to restart.');
        }
        while (targetTime - this.t > this.dt * 1e-8) {
          const samples = this._samplesFor(this._state, this.t, null);
          const past = samples[1].position.concat(samples[0].position);
          let safeStep = this.dt;
          for (let body = 0; body < 4; body += 2) {
            const dx = past[2 - body] - this._state[body];
            const dy = past[3 - body] - this._state[body + 1];
            // Resolve motion through the softened force core, which is crucial
            // near delay ~ half an orbit. Scale with dt for convergence testing.
            safeStep = Math.min(safeStep, 4.8 * this.dt * Math.pow(dx * dx + dy * dy + SOFTENING ** 2, 0.75));
          }
          let h = this.dt;
          while (h > safeStep && h / 2 >= this._minStep) h /= 2;
          h = Math.min(h, targetTime - this.t);
          let next;
          const needsWithinStep = this.mode === 'propagation'
            ? Math.min(samples[0].delay, samples[1].delay) < 2 * h * this.propagationSpeed / (this.propagationSpeed - this._maxSourceSpeed)
            : this.delay > 0 && this.delay < h;
          if (needsWithinStep) {
            const a = this._acceleration(this._state, past);
            next = this._state.map((v, i) => i < 4
              ? v + h * this._state[i + 4] + h * h * a[i] / 2
              : v + h * a[i - 4]);
            for (let pass = 0; pass < 4; pass++) next = this._rk4(next, h);
          } else {
            next = this._rk4(null, h);
          }
          if (!next.every(Number.isFinite)) throw new Error('Simulation became non-finite; reset to restart');
          if (this.mode === 'propagation') {
            const bound = this._interpolatedSpeedBound(next, h);
            if (bound >= this.propagationSpeed) throw new Error('Signal-speed model limit: a source reached or exceeded the signal speed. Increase signal speed or reset.');
            if (this._length >= this.maxHistorySamples) throw new Error('Signal-speed model history limit reached (one million samples). Reset to restart.');
            this._maxSourceSpeed = bound;
          }
          this._state = next;
          this.t += h;
          this._save();
        }
        this._tick++;
        this.t = targetTime;
        for (let body = 0; body < 2; body++) {
          for (let axis = 0; axis < 2; axis++) {
            this.positions[body][axis] = this._state[body * 2 + axis];
            this.velocities[body][axis] = this._state[body * 2 + axis + 4];
          }
        }
      }
      return this;
    }

    // Instantaneous mechanical energy; only conserved by the zero-delay model.
    energy() {
      const s = this._state;
      const r2 = (s[0] - s[2]) ** 2 + (s[1] - s[3]) ** 2;
      return s.slice(4).reduce((sum, v) => sum + v * v / 2, 0)
        - 1 / Math.sqrt(r2 + SOFTENING * SOFTENING);
    }
  }

  return GravitySimulation;
});
