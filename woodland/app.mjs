import { World, CHUNK_SIZE, DEFAULTS, hash } from './world.mjs';
import { readSaves, writeSave, encodeSave, decodeState } from './saves.mjs';

const $ = id => document.getElementById(id);
const canvas = $('world'), ctx = canvas.getContext('2d', { alpha: false });
const form = $('settings');
const RASTER_TILE = 16, RASTER_LIMIT = 64;
const rasters = new Map(), overviews = new Map(), keys = new Set();
let active = null, screen = 'menu', dirty = false, lastSaved = 0, lastChanged = 0;
let overviewCells = 0, overviewChunks = 0, overviewBuildMs = 0;
let world, camera, width = 1, height = 1, zoom = 30, last = 0, drag = null;
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
function showScreen(name) {
  screen = name; keys.clear(); stopDrag(); last = 0;
  for (const id of ['menu','create-screen','load-screen','viewport']) $(id).hidden = id !== name;
  $('continue-world').hidden = !active;
  if (name === 'viewport') { resize(); canvas.focus({ preventScroll: true }); }
}
function storageMessage(error) {
  return error.name === 'QuotaExceededError' ? 'Browser storage is full. This world is still open in this tab.' : error.name === 'SecurityError' ? 'Browser storage is unavailable. This world is still open in this tab.' : `${error.message} This world is still open in this tab.`;
}
function saveCurrent() {
  if (!active) return true;
  try {
    writeSave(encodeSave(active.id, active.name, world, camera, zoom));
    dirty = false; lastSaved = performance.now();
    $('save-status').classList.remove('error'); $('save-status').textContent = 'Saved in this browser';
    $('menu-status').textContent = ''; return true;
  } catch (error) {
    const message = storageMessage(error);
    $('save-status').classList.add('error'); $('save-status').textContent = message;
    $('menu-status').textContent = message; lastSaved = performance.now(); return false;
  }
}
function changed() {
  if (!dirty && !$('save-status').classList.contains('error')) $('save-status').textContent = 'Saving...';
  dirty = true; lastChanged = performance.now();
}
function openWorld(save) {
  world = new World(save.settings, 96, decodeState(save));
  active = { id: save.id, name: save.name }; camera = { ...save.camera }; zoom = save.zoom;
  renderedStateRevision = world.state.revision; releaseRasters(); overviews.clear();
  dirty = false; $('world-title').textContent = active.name;
  $('save-status').classList.remove('error'); $('save-status').textContent = 'Saved in this browser';
  showScreen('viewport'); updateStats();
}
function loadList() {
  const list = $('save-list'); list.replaceChildren(); $('load-status').textContent = '';
  try {
    const saves = readSaves();
    if (!saves.length) {
      const empty = document.createElement('p'); empty.className = 'empty';
      empty.textContent = 'No saved worlds yet. Choose New World from the main menu to begin.'; list.append(empty);
    }
    for (const save of saves) {
      const item = document.createElement('div'); item.className = 'save-item';
      const copy = document.createElement('div'), title = document.createElement('h3'), info = document.createElement('p'), button = document.createElement('button');
      title.textContent = save.name; info.textContent = `Seed ${save.settings.seed} · ${new Date(save.updated).toLocaleString()}`;
      button.textContent = 'Load'; button.setAttribute('aria-label', `Load ${save.name}`);
      button.addEventListener('click', () => { if (active && dirty && !saveCurrent()) { $('load-status').textContent = 'The open world could not be saved. Return to the menu to continue it.'; return; } openWorld(save); });
      copy.append(title, info); item.append(copy, button); list.append(item);
    }
  } catch (error) { $('load-status').textContent = `Could not load worlds. ${error.message}`; }
  showScreen('load-screen');
}
$('new-world').addEventListener('click', () => showScreen('create-screen'));
$('load-world').addEventListener('click', loadList);
$('continue-world').addEventListener('click', () => showScreen('viewport'));
for (const button of document.querySelectorAll('[data-back]')) button.addEventListener('click', () => showScreen('menu'));
$('save-menu').addEventListener('click', () => { saveCurrent(); showScreen('menu'); });
$('random-seed').addEventListener('click', () => { $('seed').value = `woodland-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`; });
form.addEventListener('input', labels);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (active && dirty && !saveCurrent()) { showScreen('menu'); return; }
  world = new World(settings()); camera = { x: 0, y: 0 }; zoom = 30;
  active = { id: crypto.randomUUID(), name: $('world-name').value.trim() || world.settings.seed || 'Untitled woodland' };
  renderedStateRevision = world.state.revision; releaseRasters(); overviews.clear();
  $('world-title').textContent = active.name; dirty = true; showScreen('viewport'); saveCurrent();
});
window.addEventListener('pagehide', () => { if (active && dirty) saveCurrent(); });

function resize() {
  const rect = canvas.getBoundingClientRect(); width = rect.width; height = rect.height;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = false;
  setZoom(zoom);
}
function formatDistance(metres) {
  return metres >= 1000 ? `${Number((metres / 1000).toPrecision(3))} km` : `${Number(metres.toPrecision(3))} m`;
}
function detailView() { return zoom >= Math.max(8, width / (CHUNK_SIZE * 6), height / (CHUNK_SIZE * 6)); }
function setZoom(next) {
  const before = zoom; zoom = Math.max(.01, Math.min(60, next));
  const target = 100 / zoom, power = 10 ** Math.floor(Math.log10(target));
  const scaleMetres = [1, 2, 5, 10].map(n => n * power).find(n => n >= target);
  $('scale-line').style.width = `${scaleMetres * zoom}px`;
  $('scale-distance').textContent = formatDistance(scaleMetres);
  $('scale-label').textContent = detailView() ? (zoom >= 16 ? '1 SQUARE = 1 m' : 'GRID = 8 m · TILES = 1 m') : 'FOREST COVER · APPROXIMATE';
  $('view-span').textContent = `${formatDistance(width / zoom)} across`;
  if (before !== zoom && active) changed();
}
$('zoom-in').addEventListener('click', () => setZoom(zoom * 2));
$('zoom-out').addEventListener('click', () => setZoom(zoom / 2));
$('zoom-reset').addEventListener('click', () => setZoom(30));
canvas.addEventListener('wheel', event => { event.preventDefault(); setZoom(zoom * Math.exp(-event.deltaY * 0.0015)); }, { passive: false });
new ResizeObserver(resize).observe(canvas);
canvas.addEventListener('pointerdown', event => {
  if (screen !== 'viewport' || event.button !== 0 || drag) return;
  event.preventDefault();
  canvas.focus({ preventScroll: true });
  canvas.setPointerCapture(event.pointerId);
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
  canvas.classList.add('dragging');
});
canvas.addEventListener('pointermove', event => {
  if (!drag || event.pointerId !== drag.id) return;
  camera.x -= (event.clientX - drag.x) / zoom;
  camera.y -= (event.clientY - drag.y) / zoom;
  drag.x = event.clientX; drag.y = event.clientY; changed();
});
function stopDrag() {
  if (drag && canvas.hasPointerCapture(drag.id)) canvas.releasePointerCapture(drag.id);
  drag = null; canvas.classList.remove('dragging');
}
for (const type of ['pointerup','pointercancel','lostpointercapture']) canvas.addEventListener(type, event => {
  if (drag && event.pointerId === drag.id) stopDrag();
});
const movementKeys = new Set(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright']);
window.addEventListener('keydown', event => {
  if (screen !== 'viewport' || event.target.matches('input, textarea') || !movementKeys.has(event.key.toLowerCase())) return;
  event.preventDefault(); keys.add(event.key.toLowerCase());
});
window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => { keys.clear(); stopDrag(); });
document.addEventListener('visibilitychange', () => { keys.clear(); stopDrag(); last = 0; if (document.hidden && active && dirty) saveCurrent(); });
form.addEventListener('focusin', () => keys.clear());
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

function pan(dt) {
  const dx = Number(keys.has('d') || keys.has('arrowright')) - Number(keys.has('a') || keys.has('arrowleft'));
  const dy = Number(keys.has('s') || keys.has('arrowdown')) - Number(keys.has('w') || keys.has('arrowup'));
  if (!dx && !dy) return;
  const distance = 480 / zoom * dt / Math.hypot(dx,dy);
  camera.x += dx * distance; camera.y += dy * distance; changed();
}
function updateStats() {
  $('world-stats').textContent = `Seed: ${world.settings.seed}\nPatch size: ${world.settings.scale} m\nNoise layers: ${world.settings.detail}\nTree amount: ${world.settings.density} / 100`;
  $('world-stats').style.whiteSpace = 'pre-wrap';
}
function overviewChunk(cx, cy, step) {
  const key = `${step}:${cx},${cy}`;
  if (overviews.has(key)) { const raster = overviews.get(key); overviews.delete(key); overviews.set(key, raster); return raster; }
  const start = performance.now(), raster = document.createElement('canvas'); raster.width = raster.height = 32;
  const c = raster.getContext('2d'), pixels = c.createImageData(32, 32);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    let cover = 0, field = 0;
    for (const [ox, oy] of [[.25,.25],[.75,.25],[.25,.75],[.75,.75]]) {
      const f = world.field((cx * 32 + x + ox) * step, (cy * 32 + y + oy) * step);
      const t = Math.max(0, Math.min(1, (f - .27) / .43));
      field += f / 4; cover += t * t * (3 - 2 * t) * world.settings.density / 100 * .92 / 4;
    }
    const i = (y * 32 + x) * 4;
    pixels.data[i] = 148 - field * 22 - cover * 65;
    pixels.data[i+1] = 161 - field * 18 - cover * 58;
    pixels.data[i+2] = 103 - field * 17 - cover * 28; pixels.data[i+3] = 255;
  }
  c.putImageData(pixels, 0, 0); overviews.set(key, raster); overviewBuildMs += performance.now() - start;
  if (overviews.size > 64) { const oldest = overviews.keys().next().value, old = overviews.get(oldest); old.width = old.height = 0; overviews.delete(oldest); }
  return raster;
}
function draw(now) {
  requestAnimationFrame(draw);
  if (screen !== 'viewport') return;
  const start = performance.now();
  if (renderedStateRevision !== world.state.revision) {
    releaseRasters(); overviews.clear(); renderedStateRevision = world.state.revision; changed();
  }
  const dt = last ? Math.min((now-last)/1000, 0.05) : 0; last = now;
  pan(dt);
  const left = camera.x - width / zoom / 2, top = camera.y - height / zoom / 2;
  const right = left + width / zoom, bottom = top + height / zoom;
  const detailed = detailView(), samplePixels = Math.max(12, width / 192, height / 192);
  const step = detailed ? 1 : 2 ** Math.ceil(Math.log2(samplePixels / zoom)), chunkMetres = CHUNK_SIZE * step;
  visibleChunks = 0; overviewCells = 0; overviewChunks = 0;
  for (let cy = Math.floor(top/chunkMetres); cy <= Math.floor(bottom/chunkMetres); cy++) {
    for (let cx = Math.floor(left/chunkMetres); cx <= Math.floor(right/chunkMetres); cx++) {
      const x = (cx*chunkMetres-left)*zoom, y = (cy*chunkMetres-top)*zoom;
      const x0 = Math.round(x), y0 = Math.round(y), x1 = Math.round(x+chunkMetres*zoom), y1 = Math.round(y+chunkMetres*zoom);
      ctx.drawImage(detailed ? rasterChunk(cx,cy) : overviewChunk(cx,cy,step),x0,y0,x1-x0,y1-y0);
      visibleChunks++; if (!detailed) { overviewChunks++; overviewCells += 1024; }
    }
  }
  if (detailed) {
  const gridStep = zoom >= 16 ? 1 : 8;
  ctx.lineWidth = 1; ctx.strokeStyle = '#253e2015'; ctx.beginPath();
  for (let x = Math.ceil(left/gridStep)*gridStep; x <= right; x += gridStep) { const sx = Math.round((x-left)*zoom)+.5; ctx.moveTo(sx,0);ctx.lineTo(sx,height); }
  for (let y = Math.ceil(top/gridStep)*gridStep; y <= bottom; y += gridStep) { const sy = Math.round((y-top)*zoom)+.5; ctx.moveTo(0,sy);ctx.lineTo(width,sy); }
  ctx.stroke();
  ctx.strokeStyle = '#263c2822';ctx.beginPath();
  for(let x=Math.ceil(left/8)*8;x<=right;x+=8){const sx=Math.round((x-left)*zoom)+.5;ctx.moveTo(sx,0);ctx.lineTo(sx,height);}
  for(let y=Math.ceil(top/8)*8;y<=bottom;y+=8){const sy=Math.round((y-top)*zoom)+.5;ctx.moveTo(0,sy);ctx.lineTo(width,sy);}
  ctx.stroke();
  }
  frameCount++; frameMs += performance.now()-start;
  if(now-statsAt>250){$('position').textContent=`X ${Math.floor(camera.x)} · Y ${Math.floor(camera.y)}`;updateStats();statsAt=now;}
  if (dirty && now-lastSaved > 1000 && (now-lastChanged > 500 || now-lastSaved > 5000)) saveCurrent();
}

// Read-only diagnostics for reproducible, bounded verification.
window.woodland = Object.freeze({
  get settings(){return world ? {...world.settings} : null;},
  get screen(){return screen;},
  get name(){return active?.name;},
  get camera(){return {...camera};},
  get metrics(){return {frames:frameCount,meanWorkMs:frameMs/Math.max(1,frameCount),dataChunks:world?.chunks.size || 0,rasterChunks:rasters.size,visibleChunks,zoom,overviewCells,overviewChunks,overviewCache:overviews.size,overviewBuildMs,spanMetres:width/zoom,mode:detailView()?'detail':'overview'};},
  tile:(x,y)=>world.tile(x,y),
});
for (const key of Object.keys(DEFAULTS)) $(key).value = DEFAULTS[key];
labels();showScreen('menu');requestAnimationFrame(draw);
