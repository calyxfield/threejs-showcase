(() => {
  'use strict';
  const canvas = document.getElementById('sheet');
  const ctx = canvas.getContext('2d');
  const $ = id => document.getElementById(id);
  const radius = 1.65, omega = 0.52, soften = 0.42, extent = 9, size = 65;
  const spacing = 2 * extent / (size - 1), colors = ['#7cd6ef', '#f8bf73'];
  const heights = new Float32Array(size * size);
  const projected = new Float32Array(size * size * 3);
  let time = 0, speed = 2.4, playback = 1, paused = false, yaw = -0.58, pitch = 0.76, zoom = 1;
  let width = 1, height = 1, scale = 1, last = 0, lastDraw = -Infinity, frames = 0;
  let cosYaw, sinYaw, sinPitch, cosPitch;

  function source(t, body) {
    const phase = omega * t + body * Math.PI;
    return [radius * Math.cos(phase), radius * Math.sin(phase)];
  }
  // Since c > R*omega, f(tau) = c*tau - |x-r(t-tau)| is strictly
  // increasing. These geometric bounds bracket its unique causal root.
  function retardedDelay(x, y, t, body, c = speed) {
    const distance = Math.hypot(x, y);
    let lo = Math.max(0, distance - radius) / c, hi = (distance + radius) / c;
    let tau = (lo + hi) * 0.5;
    for (let iteration = 0; iteration < 24; iteration++) {
      const phase = omega * (t - tau) + body * Math.PI;
      const sx = radius * Math.cos(phase), sy = radius * Math.sin(phase);
      const dx = x - sx, dy = y - sy, d = Math.hypot(dx, dy);
      const f = c * tau - d;
      if (Math.abs(f) < 1e-7) break;
      if (f > 0) hi = tau; else lo = tau;
      const derivative = c - (dx * (-omega * sy) + dy * omega * sx) / Math.max(d, 1e-12);
      const next = tau - f / derivative;
      tau = next > lo && next < hi ? next : (lo + hi) * 0.5;
    }
    return tau;
  }
  function field(x, y, t = time, c = speed) {
    let value = 0;
    for (let body = 0; body < 2; body++) {
      const d = c * retardedDelay(x, y, t, body, c);
      value -= 1.7 / Math.sqrt(d * d + soften * soften);
    }
    return value;
  }
  function surface(x, y) {
    const u = Math.max(0, Math.min(size - 1.000001, (x + extent) / spacing));
    const v = Math.max(0, Math.min(size - 1.000001, (y + extent) / spacing));
    const i = Math.floor(u), j = Math.floor(v), a = u - i, b = v - j, index = j * size + i;
    return (heights[index] * (1 - a) + heights[index + 1] * a) * (1 - b)
      + (heights[index + size] * (1 - a) + heights[index + size + 1] * a) * b;
  }
  function project(x, y, z) {
    const horizontal = cosYaw * x - sinYaw * y;
    const depth = sinYaw * x + cosYaw * y;
    return [width * .5 + scale * horizontal, height * .47 + scale * (sinPitch * depth - cosPitch * z), cosPitch * depth + sinPitch * z];
  }
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    invalidate();
  }
  function invalidate() { lastDraw = -Infinity; }
  function curve(points, color, lineWidth = 1) {
    ctx.beginPath(); let drawing = false;
    for (const point of points) {
      if (!point) { drawing = false; continue; }
      if (drawing) ctx.lineTo(point[0], point[1]); else { ctx.moveTo(point[0], point[1]); drawing = true; }
    }
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke();
  }
  function drawRing(body, emitted) {
    const age = time - emitted, r = speed * age;
    if (r < .16 || r > 14) return;
    const center = source(emitted, body), points = [];
    for (let k = 0; k <= 130; k++) {
      const a = k * Math.PI * 2 / 130, x = center[0] + r * Math.cos(a), y = center[1] + r * Math.sin(a);
      points.push(Math.abs(x) > extent || Math.abs(y) > extent ? null : project(x, y, surface(x, y) + .035));
    }
    ctx.globalAlpha = .46 * Math.min(1, r / .8) * Math.max(0, 1 - r / 15);
    curve(points, colors[body], 1.25); ctx.globalAlpha = 1;
  }
  function draw() {
    frames++;
    cosYaw = Math.cos(yaw); sinYaw = Math.sin(yaw); sinPitch = Math.sin(pitch); cosPitch = Math.cos(pitch);
    scale = Math.min(width / 25.5, height / 19.3) * zoom;
    ctx.fillStyle = '#10191f'; ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * .5, height * .48, 0, width * .5, height * .48, width * .55);
    glow.addColorStop(0, '#1b313b'); glow.addColorStop(1, '#10191f');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);
    for (let j = 0; j < size; j++) for (let i = 0; i < size; i++) {
      const index = j * size + i, x = -extent + i * spacing, y = -extent + j * spacing;
      const z = field(x, y); heights[index] = z;
      const p = project(x, y, z);
      projected[index * 3] = p[0]; projected[index * 3 + 1] = p[1]; projected[index * 3 + 2] = p[2];
    }
    // Draw translucent filled quads back to front, then a fine wire grid.
    const cells = [];
    for (let j = 0; j < size - 1; j++) for (let i = 0; i < size - 1; i++) {
      const n = j * size + i;
      cells.push([n, (projected[n * 3 + 2] + projected[(n + size + 1) * 3 + 2]) * .5]);
    }
    cells.sort((a, b) => a[1] - b[1]);
    for (const [n] of cells) {
      const corners = [n, n + 1, n + size + 1, n + size];
      ctx.beginPath();
      for (let k = 0; k < 4; k++) {
        const p = corners[k] * 3;
        if (!k) ctx.moveTo(projected[p], projected[p + 1]); else ctx.lineTo(projected[p], projected[p + 1]);
      }
      ctx.closePath();
      const slope = Math.min(1, Math.abs(heights[n] - heights[n + 1]) * 2 + Math.abs(heights[n] - heights[n + size]) * 2);
      ctx.fillStyle = `rgba(36,69,81,${.08 + slope * .19})`; ctx.fill();
    }
    for (let axis = 0; axis < 2; axis++) for (let line = 0; line < size; line++) {
      const points = [];
      for (let k = 0; k < size; k++) {
        const n = (axis ? line * size + k : k * size + line) * 3;
        points.push([projected[n], projected[n + 1]]);
      }
      curve(points, line % 4 === 0 ? 'rgba(121,176,190,.34)' : 'rgba(92,145,163,.19)', line % 4 === 0 ? .8 : .55);
    }
    // The dashed orbit lies in the reference plane, not on the field surface.
    ctx.setLineDash([3, 5]);
    const orbit = [];
    for (let k = 0; k <= 120; k++) { const a = k / 120 * Math.PI * 2; orbit.push(project(radius * Math.cos(a), radius * Math.sin(a), .05)); }
    curve(orbit, 'rgba(162,188,196,.3)', .8); ctx.setLineDash([]);
    if ($('rings').checked) {
      const interval = 1.5, latest = Math.floor(time / interval);
      for (let event = latest - Math.ceil(14 / speed / interval); event <= latest; event++) for (let body = 0; body < 2; body++) drawRing(body, event * interval);
    }
    const bodies = [0, 1].map(body => { const [x, y] = source(time, body); return { body, x, y, p: project(x, y, .25) }; }).sort((a, b) => a.p[2] - b.p[2]);
    for (const { body, x, y, p } of bodies) {
      const foot = project(x, y, field(x, y));
      ctx.setLineDash([2, 3]); curve([p, foot], body === 0 ? '#507f91' : '#9b795a', 1); ctx.setLineDash([]);
      ctx.fillStyle = colors[body]; ctx.beginPath(); ctx.arc(foot[0], foot[1], 2, 0, 2 * Math.PI); ctx.fill();
      const r = Math.max(5, scale * .21), halo = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r * 3.5);
      halo.addColorStop(0, body === 0 ? '#7cd6ef55' : '#f8bf7355'); halo.addColorStop(1, body === 0 ? '#7cd6ef00' : '#f8bf7300');
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(p[0], p[1], r * 3.5, 0, 2 * Math.PI); ctx.fill();
      const sphere = ctx.createRadialGradient(p[0] - r * .3, p[1] - r * .4, r * .1, p[0], p[1], r);
      sphere.addColorStop(0, '#ffffff'); sphere.addColorStop(.3, colors[body]); sphere.addColorStop(1, body === 0 ? '#246582' : '#9d5d31');
      ctx.fillStyle = sphere; ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 2 * Math.PI); ctx.fill();
      ctx.fillStyle = colors[body]; ctx.font = '10px ui-monospace, monospace'; ctx.fillText(body === 0 ? 'A' : 'B', p[0] + r + 7, p[1] + 3);
    }
    $('clock').textContent = `t = ${time.toFixed(1)} s`;
  }
  function updateStatus() { $('pause').textContent = paused ? 'Resume' : 'Pause'; $('status').textContent = paused ? 'Ⅱ PAUSED' : '● RUNNING'; }
  function togglePause() { paused = !paused; updateStatus(); invalidate(); }
  $('pause').addEventListener('click', togglePause);
  $('reset').addEventListener('click', () => { time = 0; paused = false; updateStatus(); invalidate(); });
  $('view').addEventListener('click', () => { yaw = -.58; pitch = .76; zoom = 1; invalidate(); });
  $('signalSpeed').addEventListener('input', event => { speed = Number(event.target.value); time = 0; $('speedValue').innerHTML = `${speed.toFixed(1)} <small>units/s</small>`; invalidate(); });
  $('playback').addEventListener('change', event => { playback = Number(event.target.value); });
  $('rings').addEventListener('change', () => { document.querySelector('.annotation').hidden = !$('rings').checked; invalidate(); });
  let drag = null;
  canvas.addEventListener('pointerdown', event => { drag = [event.clientX, event.clientY]; canvas.setPointerCapture(event.pointerId); });
  canvas.addEventListener('pointermove', event => { if (!drag) return; yaw += (event.clientX - drag[0]) * .007; pitch = Math.max(.2, Math.min(1.25, pitch + (event.clientY - drag[1]) * .005)); drag = [event.clientX, event.clientY]; invalidate(); });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(type, () => { drag = null; });
  canvas.addEventListener('wheel', event => { event.preventDefault(); zoom = Math.max(.65, Math.min(1.8, zoom * Math.exp(-event.deltaY * .001))); invalidate(); }, { passive: false });
  canvas.addEventListener('keydown', event => {
    if (event.code === 'Space') togglePause();
    else if (event.key === 'ArrowLeft') yaw -= .12;
    else if (event.key === 'ArrowRight') yaw += .12;
    else if (event.key === 'ArrowUp') pitch = Math.max(.2, pitch - .08);
    else if (event.key === 'ArrowDown') pitch = Math.min(1.25, pitch + .08);
    else if (event.key === '+' || event.key === '=') zoom = Math.min(1.8, zoom * 1.1);
    else if (event.key === '-') zoom = Math.max(.65, zoom / 1.1);
    else return;
    event.preventDefault(); invalidate();
  });
  function frame(now) {
    const delta = last ? Math.min((now - last) / 1000, .1) : 0; last = now;
    if (!paused && !document.hidden) time += delta * playback;
    if ((!paused && now - lastDraw > 30) || lastDraw === -Infinity) { draw(); lastDraw = now; }
    requestAnimationFrame(frame);
  }
  new ResizeObserver(resize).observe(canvas);
  window.sheetDemo = { source, field, retardedDelay, get state() { return { time, speed, paused, yaw, pitch, zoom, frames }; } };
  resize(); requestAnimationFrame(frame);
})();
