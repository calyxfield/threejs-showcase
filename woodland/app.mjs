import { World, CHUNK_SIZE, DEFAULTS, hash } from './world.mjs';

const $ = id => document.getElementById(id);
const canvas = $('world'), ctx = canvas.getContext('2d', { alpha: false });
const form = $('settings');
const RASTER_TILE = 16, RASTER_LIMIT = 64;
const rasters = new Map(), keys = new Set();
let world, player, width = 1, height = 1, zoom = 30, last = 0, facing = 0;
let visibleChunks = 0, frameCount = 0, frameMs = 0, statsAt = 0;
let renderedStateRevision = 0;
const grass = ['#9aa570','#929f68','#8b9a62','#84955d','#7d9058','#768b54','#718550','#6a804c'];
const crowns = ['#36573c','#416341','#34533a','#4a6a43'];

function settings() {
  return { seed: $('seed').value, scale: +$('scale').value, detail: +$('detail').value, density: +$('density').value };
}
function labels() {
  $('scale-value').value = `${$('scale').value} m`;
  $('detail-value').value = `${$('detail').value} ${+$('detail').value === 1 ? 'layer' : 'layers'}`;
  $('density-value').value = `${$('density').value} / 100`;
}
function releaseRasters() {
  for (const raster of rasters.values()) { raster.width = 0; raster.height = 0; }
  rasters.clear();
}
function regenerate() {
  world = new World(settings());
  player = world.spawn();
  renderedStateRevision = world.state.revision;
  releaseRasters(); keys.clear();
  $('apply-state').textContent = 'World ready. Take a walk.';
  updateStats();
  canvas.focus({ preventScroll: true });
}
form.addEventListener('submit', event => { event.preventDefault(); regenerate(); });
form.addEventListener('input', () => { labels(); $('apply-state').textContent = 'Settings changed. Regenerate to apply.'; });
$('new-seed').addEventListener('click', () => {
  $('seed').value = `woodland-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;
  regenerate();
});

function resize() {
  const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
  setZoom(zoom);
}
function setZoom(next) {
  // Keep even very wide displays below 7 × 7 visible chunks at the widest view.
  const min = Math.max(10, width / (CHUNK_SIZE * 6), height / (CHUNK_SIZE * 6));
  zoom = Math.max(min, Math.min(60, next));
  $('zoom-label').textContent = `${Math.round(zoom / 30 * 100)}%`;
  const scaleMetres = zoom > 38 ? 2 : 5;
  $('scale-line').style.width = `${scaleMetres * zoom}px`;
  $('scale-distance').textContent = `${scaleMetres} m`;
  $('scale-label').textContent = zoom >= 16 ? '1 SQUARE = 1 m' : 'GRID = 8 m · TILES = 1 m';
}
$('zoom-in').addEventListener('click', () => setZoom(zoom * 1.25));
$('zoom-out').addEventListener('click', () => setZoom(zoom / 1.25));
canvas.addEventListener('wheel', event => { event.preventDefault(); setZoom(zoom * Math.exp(-event.deltaY * 0.0015)); }, { passive: false });
new ResizeObserver(resize).observe(canvas);
canvas.addEventListener('pointerdown', () => canvas.focus({ preventScroll: true }));
const movementKeys = new Set(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright','shift']);
window.addEventListener('keydown', event => {
  if (event.target.matches('input, textarea') || !movementKeys.has(event.key.toLowerCase())) return;
  event.preventDefault(); keys.add(event.key.toLowerCase());
});
window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());
document.addEventListener('visibilitychange', () => { keys.clear(); last = 0; });
const touchKeys = {up:'arrowup',left:'arrowleft',down:'arrowdown',right:'arrowright'};
for (const button of document.querySelectorAll('[data-dir]')) {
  button.addEventListener('pointerdown', event => {
    event.preventDefault(); button.setPointerCapture(event.pointerId); keys.add(touchKeys[button.dataset.dir]);
  });
  for (const type of ['pointerup','pointercancel','lostpointercapture']) button.addEventListener(type, () => keys.delete(touchKeys[button.dataset.dir]));
}

function rasterChunk(cx, cy) {
  const key = `${cx},${cy}`;
  if (rasters.has(key)) {
    const raster = rasters.get(key); rasters.delete(key); rasters.set(key, raster); return raster;
  }
  const data = world.chunk(cx, cy), edits = world.state.chunkEdits(cx,cy), raster = document.createElement('canvas');
  raster.width = raster.height = CHUNK_SIZE * RASTER_TILE;
  const c = raster.getContext('2d', { alpha: false });
  for (let y = 0; y < CHUNK_SIZE; y++) for (let x = 0; x < CHUNK_SIZE; x++) {
    const index = y * CHUNK_SIZE + x;
    const tile = edits?.get(index) ?? data[index], px = x * RASTER_TILE, py = y * RASTER_TILE;
    c.fillStyle = grass[tile & 7]; c.fillRect(px, py, 16, 16);
    const variation = hash(cx * CHUNK_SIZE + x, cy * CHUNK_SIZE + y, world.seed);
    if ((variation & 7) === 0) {
      c.fillStyle = '#d5d5a229'; c.fillRect(px + 3, py + 4, 1, 2); c.fillRect(px + 5, py + 6, 1, 2);
    }
    if (tile & 8) {
      const v = (tile >> 4) & 3;
      c.fillStyle = '#20392738'; c.beginPath(); c.ellipse(px+9, py+10, 6, 5, -.35, 0, Math.PI*2); c.fill();
      c.fillStyle = '#615038'; c.fillRect(px+7, py+9, 2, 5);
      c.fillStyle = '#294733'; c.beginPath(); c.arc(px+8, py+7, 6, 0, Math.PI*2); c.fill();
      c.fillStyle = crowns[v]; c.beginPath(); c.arc(px+7, py+6, 5, 0, Math.PI*2); c.fill();
      c.fillStyle = '#72905788'; c.beginPath(); c.arc(px+5.5, py+4.5, 2.5, 0, Math.PI*2); c.fill();
      c.fillStyle = '#bdd18a55'; c.fillRect(px+5,py+3,2,1);
    }
  }
  rasters.set(key, raster);
  if (rasters.size > RASTER_LIMIT) {
    const oldest = rasters.keys().next().value;
    const evicted = rasters.get(oldest); evicted.width = evicted.height = 0; rasters.delete(oldest);
  }
  return raster;
}

function clearAt(x, y) {
  const radius = 0.34; // Player radius 0.18 m + trunk radius 0.16 m.
  for (let ty = Math.floor(y-radius); ty <= Math.floor(y+radius); ty++) {
    for (let tx = Math.floor(x-radius); tx <= Math.floor(x+radius); tx++) {
      if (world.isTree(tx,ty) && Math.hypot(x-tx-0.5,y-ty-0.5) < radius) return false;
    }
  }
  return true;
}
function move(dt) {
  let dx = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));
  let dy = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
  if (!dx && !dy) return;
  facing = Math.atan2(dy,dx);
  const distance = (keys.has('shift') ? 7 : 3.5) * dt / Math.hypot(dx,dy);
  dx *= distance; dy *= distance;
  const steps = Math.ceil(Math.hypot(dx,dy) / 0.1);
  for (let i = 0; i < steps; i++) {
    if (clearAt(player.x+dx/steps, player.y)) player.x += dx/steps;
    if (clearAt(player.x, player.y+dy/steps)) player.y += dy/steps;
  }
}
function updateStats() {
  $('world-stats').textContent = `Seed: ${world.settings.seed}\n${world.chunks.size} / ${world.cacheLimit} data chunks\n${rasters.size} / ${RASTER_LIMIT} map images\n${visibleChunks} visible chunks`;
  $('world-stats').style.whiteSpace = 'pre-wrap';
}
function draw(now) {
  const start = performance.now();
  if (renderedStateRevision !== world.state.revision) {
    releaseRasters(); renderedStateRevision = world.state.revision;
  }
  const dt = last ? Math.min((now-last)/1000, 0.05) : 0; last = now;
  move(dt);
  const left = player.x - width / zoom / 2, top = player.y - height / zoom / 2;
  const right = left + width / zoom, bottom = top + height / zoom;
  visibleChunks = 0;
  for (let cy = Math.floor(top/CHUNK_SIZE); cy <= Math.floor(bottom/CHUNK_SIZE); cy++) {
    for (let cx = Math.floor(left/CHUNK_SIZE); cx <= Math.floor(right/CHUNK_SIZE); cx++) {
      const x = (cx*CHUNK_SIZE-left)*zoom, y = (cy*CHUNK_SIZE-top)*zoom;
      // Shared rounded edges prevent seams between adjacent raster chunks.
      const x0 = Math.round(x), y0 = Math.round(y), x1 = Math.round(x+CHUNK_SIZE*zoom), y1 = Math.round(y+CHUNK_SIZE*zoom);
      ctx.drawImage(rasterChunk(cx,cy),x0,y0,x1-x0,y1-y0); visibleChunks++;
    }
  }
  const gridStep = zoom >= 16 ? 1 : 8;
  ctx.lineWidth = 1; ctx.strokeStyle = '#253e2015'; ctx.beginPath();
  for (let x = Math.ceil(left/gridStep)*gridStep; x <= right; x += gridStep) { const sx = Math.round((x-left)*zoom)+.5; ctx.moveTo(sx,0);ctx.lineTo(sx,height); }
  for (let y = Math.ceil(top/gridStep)*gridStep; y <= bottom; y += gridStep) { const sy = Math.round((y-top)*zoom)+.5; ctx.moveTo(0,sy);ctx.lineTo(width,sy); }
  ctx.stroke();
  ctx.strokeStyle = '#263c2822';ctx.beginPath();
  for(let x=Math.ceil(left/8)*8;x<=right;x+=8){const sx=Math.round((x-left)*zoom)+.5;ctx.moveTo(sx,0);ctx.lineTo(sx,height);}
  for(let y=Math.ceil(top/8)*8;y<=bottom;y+=8){const sy=Math.round((y-top)*zoom)+.5;ctx.moveTo(0,sy);ctx.lineTo(width,sy);}
  ctx.stroke();
  const px = width/2, py = height/2, r = Math.max(4,zoom*.23);
  ctx.fillStyle='#16372844';ctx.beginPath();ctx.ellipse(px+2,py+3,r+3,r+1,0,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#f3e6b098';ctx.lineWidth=1;ctx.beginPath();ctx.arc(px,py,r+5,0,Math.PI*2);ctx.stroke();
  ctx.save();ctx.translate(px,py);ctx.rotate(facing);ctx.fillStyle='#253d35';ctx.beginPath();ctx.ellipse(0,0,r*.8,r*1.1,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#e6bd74';ctx.beginPath();ctx.arc(r*.2,0,r*.7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff0bb';ctx.fillRect(r*.7,-1.5,3,3);ctx.restore();
  frameCount++; frameMs += performance.now()-start;
  if(now-statsAt>250){$('position').textContent=`X ${Math.floor(player.x)} · Y ${Math.floor(player.y)}`;updateStats();statsAt=now;}
  requestAnimationFrame(draw);
}

// Read-only diagnostics for reproducible, bounded verification.
window.woodland = Object.freeze({
  get settings(){return {...world.settings};},
  get position(){return {...player};},
  get metrics(){return {frames:frameCount,meanWorkMs:frameMs/Math.max(1,frameCount),dataChunks:world.chunks.size,rasterChunks:rasters.size,visibleChunks,zoom};},
  tile:(x,y)=>world.tile(x,y),
});
for (const key of Object.keys(DEFAULTS)) $(key).value = DEFAULTS[key];
labels();regenerate();resize();requestAnimationFrame(draw);
