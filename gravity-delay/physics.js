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
 * Stored history always covers MAX_DELAY, including while delay is zero.
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
    constructor({ dt = 1 / 600, delay = 0 } = {}) {
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
      this.setDelay(delay);
      this.reset();
    }

    setDelay(seconds) {
      if (!Number.isFinite(seconds)) throw new RangeError('Delay must be finite');
      this.delay = Math.max(0, Math.min(MAX_DELAY, seconds));
      return this;
    }

    // Restart at t = 0, retaining the selected delay and integration step.
    reset() {
      this.t = 0;
      this._tick = 0;
      this._state = [-1, 0, 1, 0, 0, -OMEGA, 0, OMEGA];
      this.positions = [[-1, 0], [1, 0]];
      this.velocities = [[0, -OMEGA], [0, OMEGA]];
      this._history.fill(0);
      this._head = 0;
      this._length = 0;
      this._save();
      return this;
    }

    _save() {
      // Keep a left bracket older than the maximum selectable delay.
      while (this._length > 2 && this._times[(this._head + 1) % this._capacity] < this.t - MAX_DELAY) {
        this._head = (this._head + 1) % this._capacity;
        this._length--;
      }
      if (this._length === this._capacity) {
        const capacity = Math.min(this.maxHistorySamples, this._capacity * 2);
        if (capacity === this._capacity) throw new Error('History capacity exceeded');
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

    _positionsAt(time, endpoint, stepSize = this.dt) {
      if (time < 0) {
        const c = Math.cos(OMEGA * time), s = Math.sin(OMEGA * time);
        return [-c, -s, c, s];
      }
      if (time >= this.t && !endpoint) return this._state.slice(0, 4);
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
        if (lo === hi) return this._state.slice(0, 4);
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
      const p = new Array(4);
      for (let i = 0; i < 4; i++) {
        p[i] = h00 * left[leftOffset + i] + h10 * left[leftOffset + i + 4]
          + h01 * right[rightOffset + i] + h11 * right[rightOffset + i + 4];
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
      const a = this._acceleration(this._state, this._positionsAt(this.t - this.delay));
      return [[a[0], a[1]], [a[2], a[3]]];
    }

    _derivative(state, time, endpoint, h) {
      const past = this.delay === 0 ? state : this._positionsAt(time - this.delay, endpoint, h);
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
        while (targetTime - this.t > this.dt * 1e-8) {
          const past = this._positionsAt(this.t - this.delay);
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
          if (this.delay > 0 && this.delay < h) {
            const a = this._acceleration(this._state, past);
            next = this._state.map((v, i) => i < 4
              ? v + h * this._state[i + 4] + h * h * a[i] / 2
              : v + h * a[i - 4]);
            for (let pass = 0; pass < 4; pass++) next = this._rk4(next, h);
          } else {
            next = this._rk4(null, h);
          }
          if (!next.every(Number.isFinite)) throw new Error('Simulation became non-finite; reset to restart');
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
