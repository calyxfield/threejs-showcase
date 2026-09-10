import {BALANCE,VILLAGES,CROPS,HIRING,newEconomy,bindEconomy,ensureTowns,farmEconomy,hireWorker,hiringHome,staffingTarget,laborProductivity,setCrop,advanceEconomy} from './economy.mjs';
import {brushCoverage,patchCoverage,coverageContains,coverageArea,farmPlacementError,compileCoverage,preparedRow,bindFarms} from './farms.mjs';
import { World, CHUNK_SIZE, DEFAULTS, hash, CURRENT_GENERATOR } from './world.mjs';
import { readSaves, writeSave, encodeSave, decodeState } from './saves.mjs';
import {placeFarmBuilding,createField,editField,assignFieldsToFarm,cancelFieldAssignment} from './construction.mjs';
import { SHIP, BUILDING, WORKER_HALL, droneJob, MAX_SITES, MAX_JOBS, hasEditRoom, selectTrees, orderCuts, newConstruction, canPlace, land, placeBuilding, controllerCanPlace, advanceConstruction } from './construction.mjs';

const $ = id => document.getElementById(id);
const canvas = $('world'), ctx = canvas.getContext('2d', { alpha: false });
const form = $('settings');
const RASTER_TILE = 16, RASTER_LIMIT = 64;
const OVERVIEW_SIZE=128,OVERVIEW_LIMIT=160,OVERVIEW_TARGET=3,OVERVIEW_SAMPLES=640;
const rasters = new Map(), overviews = new Map(), keys = new Set();
let economySelection=null,economyListStamp='',detailReturn=null,mapHits=[];
let farmTab='production',fieldChoices=new Set(),fieldListStamp='';
const assignmentDrafts=new Map(),fieldGeometry=new WeakMap();
const assignmentMode=()=>economySelection?.kind==='farm'&&farmTab==='fields'&&!farmDraft&&!placement;
let selectedVillagerId=null,villagerListStamp='';
const MAP_ZOOM=2;
const mapView=()=>zoom<MAP_ZOOM;
let active = null, screen = 'menu', dirty = false, lastSaved = 0, lastChanged = 0;
let farmDraft = null, farmErase = false, farmPreview = null, farmDraftEntries = [];
let controllerPlacement = false, selectedFarm = null, farmGesture = 'rectangle', brushSize = 8, brushCursor = null;
let housePlacement=false,hallPlacement=false;
const placementSize=()=>hallPlacement?WORKER_HALL:BUILDING;
let placement = null, cutting = false, selection = null, orderError = '', simulationAt = 0;
let overviewCells = 0, overviewChunks = 0, overviewBuildMs = 0,overviewBuilds=0,overviewFinePixels=0;
let world, camera, width = 1, height = 1, zoom = 30, last = 0, drag = null;
let visibleChunks = 0, frameCount = 0, frameMs = 0, statsAt = 0;
let renderedStateRevision = 0;
const grass = ['#9aa570','#929f68','#8b9a62','#84955d','#7d9058','#768b54','#718550','#6a804c'];
const meadow = ['#b2b67c','#adb177','#a7ae72','#a2aa6d','#9da668','#98a363','#93a05f','#909d5b'];
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
  resetWorldChrome();
  world = new World(save.settings, 96, decodeState(save), save.generator);
  world.construction = save.version >= 2 ? structuredClone(save.construction) : null; bindFarms(world,world.construction);world.economy=save.economy?structuredClone(save.economy):world.construction?newEconomy():null;bindEconomy(world);economySelection=null;economyListStamp='';$('economy-panel').hidden=true;resetVillagers();
  assignmentDrafts.clear();controllerPlacement=false;selectedFarm=null;placement = null; cutting = false; selection = null; farmDraft = null; farmPreview = null; orderError = ''; canvas.classList.remove('selecting'); simulationAt = performance.now();
  detailReturn=null;active = { id: save.id, name: save.name }; camera = { ...save.camera }; zoom = save.zoom;
  renderedStateRevision = world.state.revision; releaseRasters(); overviews.clear();
  dirty = false; $('world-title').textContent = active.name;
  $('save-status').classList.remove('error'); $('save-status').textContent = 'Saved in this browser';
  showScreen('viewport'); updateStats(); updateBuildUI();
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
      button.addEventListener('click', () => {
        if (active && dirty && !saveCurrent()) { $('load-status').textContent = 'The open world could not be saved. Return to the menu to continue it.'; return; }
        try {
          const latest = readSaves().find(item => item.id === save.id);
          if (!latest) throw new Error('This saved world is no longer available.');
          openWorld(latest);
        } catch (error) { $('load-status').textContent = `Could not load world. ${error.message}`; }
      });
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
$('random-seed').addEventListener('click', () => { $('seed').value = `steel-space-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`; });
form.addEventListener('input', labels);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (active && dirty && !saveCurrent()) { showScreen('menu'); return; }
  resetWorldChrome();
  world = new World(settings(), 96, undefined, CURRENT_GENERATOR); world.construction = newConstruction(); bindFarms(world,world.construction);world.economy=newEconomy();bindEconomy(world);economySelection=null;economyListStamp='';$('economy-panel').hidden=true;resetVillagers();
  detailReturn=null;camera = { x: 0, y: 0 }; zoom = Math.min(16, innerWidth / 60); assignmentDrafts.clear();controllerPlacement=false;selectedFarm=null;placement = null; cutting = false; selection = null; farmDraft = null; farmPreview = null; orderError = ''; canvas.classList.remove('selecting'); simulationAt = performance.now();
  active = { id: crypto.randomUUID(), name: $('world-name').value.trim() || world.settings.seed || 'Untitled world' };
  renderedStateRevision = world.state.revision; releaseRasters(); overviews.clear();
  $('world-title').textContent = active.name; dirty = true; showScreen('viewport'); updateBuildUI(); saveCurrent();
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
function detailView() { return zoom >= Math.max(4, width / (CHUNK_SIZE * 6), height / (CHUNK_SIZE * 6)); }
function setZoom(next) {
  const before = zoom;if(before>=MAP_ZOOM&&next<MAP_ZOOM&&camera)detailReturn={camera:{...camera},zoom:before}; zoom = Math.max(.01, Math.min(60, next));
  const target = 100 / zoom, power = 10 ** Math.floor(Math.log10(target));
  const scaleMetres = [1, 2, 5, 10].map(n => n * power).find(n => n >= target);
  $('scale-line').style.width = `${scaleMetres * zoom}px`;
  $('scale-distance').textContent = formatDistance(scaleMetres);
  $('map-toggle').setAttribute('aria-pressed',String(mapView()));$('scale-label').textContent = mapView()?'REGIONAL MAP · APPROXIMATE':detailView() ? (zoom >= 16 ? '1 SQUARE = 1 m' : 'GRID = 8 m · TILES = 1 m') : 'FOREST COVER · APPROXIMATE';
  $('view-span').textContent = `${formatDistance(width / zoom)} across`;
  if (before !== zoom && active) changed();
}
function toggleMap(){if(screen!=='viewport')return;stopDrag();if(mapView()){const back=detailReturn;camera=back?{...back.camera}:{...camera};setZoom(back?.zoom||16);detailReturn=null;}else setZoom(Math.min(.8,width/1800));changed();}
$('map-toggle').addEventListener('click',toggleMap);
$('zoom-in').addEventListener('click', () => setZoom(zoom * 2));
$('zoom-out').addEventListener('click', () => setZoom(zoom / 2));
$('zoom-reset').addEventListener('click', () => setZoom(30));
canvas.addEventListener('wheel', event => { event.preventDefault(); setZoom(zoom * Math.exp(-event.deltaY * 0.0015)); }, { passive: false });
new ResizeObserver(resize).observe(canvas);
const compactToolbar = matchMedia('(max-width: 700px)');
function sizeToolbar(){document.documentElement.style.setProperty('--header',`${document.querySelector('.toolbar').getBoundingClientRect().height||64}px`);}
compactToolbar.addEventListener('change', sizeToolbar); sizeToolbar();
canvas.addEventListener('pointerdown', event => {
  if (screen !== 'viewport' || event.button !== 0 || drag) return;
  event.preventDefault();
  canvas.focus({ preventScroll: true });
  canvas.setPointerCapture(event.pointerId);
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: event.clientX, startY: event.clientY, moved: false };
  if (farmDraft) { drag.anchor=mapTile(event.clientX,event.clientY);drag.last=drag.anchor;drag.base=farmDraft.coverage;drag.stroke=farmDraft.coverage;updateFarmPatch(event.clientX,event.clientY); }
  else if (cutting) { drag.anchor = mapTile(event.clientX,event.clientY); updateSelection(event.clientX,event.clientY); }
  else canvas.classList.add('dragging');
});
canvas.addEventListener('pointermove', event => {
  if(farmDraft&&farmGesture==='brush')brushCursor=mapTile(event.clientX,event.clientY);
  if (!drag || event.pointerId !== drag.id) return;
  if (!drag.moved && Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) <= 6) return;
  drag.moved = true;
  if (farmDraft) { updateFarmPatch(event.clientX,event.clientY); return; }
  if (cutting) { updateSelection(event.clientX,event.clientY); return; }
  camera.x -= (event.clientX - drag.x) / zoom;
  camera.y -= (event.clientY - drag.y) / zoom;
  drag.x = event.clientX; drag.y = event.clientY; changed();
});
function stopDrag() {
  if(farmPreview&&farmDraft){farmPreview=null;farmDraftEntries=compileCoverage(farmDraft.coverage);updateBuildUI();}
  if (drag && canvas.hasPointerCapture(drag.id)) canvas.releasePointerCapture(drag.id);
  drag = null; canvas.classList.remove('dragging');
}
for (const type of ['pointerup','pointercancel','lostpointercapture']) canvas.addEventListener(type, event => {
  if (drag && event.pointerId === drag.id) {
    if (type === 'pointerup') { if(farmDraft){updateFarmPatch(event.clientX,event.clientY);if(!farmPreview.error)farmDraft={...farmDraft,...farmPreview,error:undefined};else farmDraft.error=farmPreview.error;farmPreview=null;updateBuildUI();} else if (cutting) updateSelection(event.clientX,event.clientY); else if (!drag.moved) selectSite(event.clientX,event.clientY,event.pointerType); }
    else if (type === 'pointercancel') { if(cutting)selection=null; }
    stopDrag();
  }
});
const movementKeys = new Set(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright']);
window.addEventListener('keydown', event => {
  if(screen==='viewport'&&!event.target.matches('input, textarea, select')&&event.key.toLowerCase()==='m'&&!event.repeat){event.preventDefault();toggleMap();return;}
  if (screen === 'viewport' && event.key === 'Escape') { if(document.querySelector('.inspector:not([hidden])'))closeChrome();else cancelTool(); return; }
  if (screen !== 'viewport' || event.target.matches('input, textarea, select') || !movementKeys.has(event.key.toLowerCase())) return;
  event.preventDefault(); keys.add(event.key.toLowerCase());
});
window.addEventListener('keyup', event => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => { keys.clear(); stopDrag(); });
document.addEventListener('visibilitychange', () => { keys.clear(); stopDrag(); last = 0; if (document.hidden && active && dirty) saveCurrent(); });
form.addEventListener('focusin', () => keys.clear());
document.addEventListener('focusin', event => { if(event.target.matches('select'))keys.clear(); });
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
    const raster = rasters.get(key); rasters.delete(key);
    if (raster.editRevision === (world.state.chunkRevisions.get(key) || 0)) { rasters.set(key, raster); return raster; }
    raster.width = raster.height = 0;
  }
  const data = world.chunk(cx, cy), edits = world.state.chunkEdits(cx,cy), raster = document.createElement('canvas');
  raster.width = raster.height = CHUNK_SIZE * RASTER_TILE;
  const c = raster.getContext('2d', { alpha: false });
  for (let y = 0; y < CHUNK_SIZE; y++) for (let x = 0; x < CHUNK_SIZE; x++) {
    const index = y * CHUNK_SIZE + x;
    const wx=cx*32+x,wy=cy*32+y,prepared=world.farmCoverage?.isPrepared(wx,wy);
    const tile = world.resolveTile(wx,wy,edits?.get(index) ?? data[index]), px = x * RASTER_TILE, py = y * RASTER_TILE;
    c.fillStyle = prepared ? '#826c4d' : (tile & 64 ? meadow : grass)[tile & 7]; c.fillRect(px, py, 16, 16);
    const variation = hash(cx * CHUNK_SIZE + x, cy * CHUNK_SIZE + y, world.seed);
    if (!prepared && (variation & 7) === 0) {
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
  raster.editRevision = world.state.chunkRevisions.get(key) || 0;
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
function selectSite(clientX, clientY, pointerType='mouse') {
  orderError = '';
  const game = world.construction;
  if (!game) return;
  if(game.ship&&!placement){
    if(assignmentMode()){const point=mapTile(clientX,clientY),field=game.fields.find(f=>coverageContains(f.coverage,point.x,point.y));if(field){toggleFieldChoice(field.id);return;}}
    if(mapView()){const bounds=canvas.getBoundingClientRect(),x=clientX-bounds.left,y=clientY-bounds.top,label=[...mapHits].reverse().find(h=>h.isLabel&&x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h);if(label){if(label.kind==='ship')$('view-ship').click();else showEconomy({kind:label.kind,id:label.id});return;}}
    const worker=hitVillager(clientX,clientY,pointerType);if(worker){showVillagers(worker.id);return;}
    if(mapView()){const bounds=canvas.getBoundingClientRect(),x=clientX-bounds.left,y=clientY-bounds.top,hit=[...mapHits].reverse().find(h=>x>=h.x&&x<=h.x+h.w&&y>=h.y&&y<=h.y+h.h);if(hit){if(hit.kind==='ship')$('view-ship').click();else showEconomy({kind:hit.kind,id:hit.id});return;}}
    const point=mapTile(clientX,clientY),farm=game.farms.find(f=>f.controller!==null&&coverageIntersectsSite(game.sites[f.controller],point))||game.farms.find(f=>f.controller===null&&coverageContains(f.coverage,point.x,point.y));
    const hall=game.sites.findIndex(s=>s.hall&&coverageIntersectsSite(s,point));if(hall>=0){showEconomy({kind:'hall',id:hall});return;}
    if(farm){showEconomy({kind:'farm',id:farm.id});return;}const field=game.fields.find(f=>coverageContains(f.coverage,point.x,point.y));if(field){showEconomy({kind:'field',id:field.id});return;}const town=world.economy?.towns.find(t=>Math.abs(point.x-t.x-t.w/2)<Math.max(t.w/2,8/zoom)&&Math.abs(point.y-t.y-t.h/2)<Math.max(t.h/2,8/zoom));if(town){showEconomy({kind:'town',id:town.id});return;}return;
  }
  const bounds = canvas.getBoundingClientRect(), size = game.ship ? placementSize() : SHIP;
  const position = { x: Math.floor(camera.x + (clientX - bounds.left - width / 2) / zoom - size.w / 2), y: Math.floor(camera.y + (clientY - bounds.top - height / 2) / zoom - size.h / 2) };
  if (!game.ship) { game.pending = position; changed(); }
  else placement = position;
  updateBuildUI();
}
function mapTile(clientX, clientY) {
  const bounds = canvas.getBoundingClientRect();
  return { x: Math.floor(camera.x + (clientX-bounds.left-width/2)/zoom), y: Math.floor(camera.y + (clientY-bounds.top-height/2)/zoom) };
}
function updateSelection(x,y) {
  selection = detailView() ? selectTrees(world,world.construction,drag.anchor,mapTile(x,y)) : {trees:[],error:'Zoom in to select individual trees.'};
  updateBuildUI();
}
function coverageIntersectsSite(site,p){return p.x>=site.x&&p.y>=site.y&&p.x<site.x+site.w&&p.y<site.y+site.h;}
function cancelTool() { closeChrome();hallPlacement=false;housePlacement=false;farmDraft=null;farmPreview=null;farmDraftEntries=[];controllerPlacement=false;selectedFarm=null;brushCursor=null;orderError = ''; stopDrag(); placement = null; cutting = false; selection = null; canvas.classList.remove('selecting'); updateBuildUI(); }
function openAllotment(id=null){
 if(farmDraft){if(selectedFarm===id){closeChrome();return;}$('economy-message').textContent='Finish or cancel the current field draft before editing another field.';return;}
 cancelTool();const f=world.construction.fields.find(f=>f.id===id);selectedFarm=id;farmGesture='rectangle';$('farm-gesture').value='rectangle';
 farmDraft={coverage:structuredClone(f?.coverage||[]),area:f?.area||0};farmDraftEntries=compileCoverage(farmDraft.coverage);farmErase=false;canvas.classList.add('selecting');updateBuildUI();
}
function updateFarmPatch(x,y){
 if(farmGesture==='brush'){updateFarmBrush(x,y);return;}
 const a=drag.anchor,b=mapTile(x,y),rect={x:Math.min(a.x,b.x),y:Math.min(a.y,b.y),w:Math.abs(a.x-b.x)+1,h:Math.abs(a.y-b.y)+1};
 const result=rect.x < -1e9||rect.y < -1e9||rect.x+rect.w>1e9||rect.y+rect.h>1e9?{error:'Selection reaches the world-coordinate limit.'}:patchCoverage(drag.base,rect,farmErase);
 if(!result.error){farmPreview={...result,rect};}
 else farmPreview={...farmDraft,error:result.error,rect};
 if(farmPreview.coverage)farmDraftEntries=compileCoverage(farmPreview.coverage);updateBuildUI();
}
function updateFarmBrush(x,y){
 const b=mapTile(x,y),result=brushCoverage(drag.stroke,drag.last,b,brushSize,farmErase);brushCursor=b;
 if(!result.error){drag.stroke=result.coverage;drag.last=b;farmPreview=result;}
 else farmPreview={...farmDraft,error:result.error};
 if(farmPreview.coverage)farmDraftEntries=compileCoverage(farmPreview.coverage);updateBuildUI();
}
function updateBuildUI() {
  document.querySelector('.controls span').textContent = farmDraft ? (farmGesture==='brush'?(farmErase?'Brush to erase allotment':'Brush to allot land'):(farmErase?'Drag a box to erase allotment':'Drag a box to allot land')) : cutting ? 'Drag to select trees' : 'Drag to pan';
  canvas.setAttribute('aria-label', farmDraft ? `Farm allotment. ${farmGesture==='brush'?'Paint with the selected brush width':'Drag a rectangular selection'} to add or erase land. Apply saves changes; Escape cancels. W A S D pans.` : cutting ? 'Top-down world map. Tap a tree or drag to select trees, then confirm the order. W A S D or arrow keys pan. Escape cancels selection.' : 'Top-down world map. Drag with mouse or touch to pan the camera, or use W A S D or arrow keys. Zoom with the mouse wheel or plus and minus buttons.');
  const game = world?.construction;
  $('build-panel').hidden = !game||!!game.ship&&!placement&&!cutting&&!farmDraft;
  $('ship-tools').hidden = !game?.ship;$('construction-tools').hidden = !game?.ship;
  $('build-panel').classList.toggle('context-active', !!game && (!game.ship || !!placement || cutting || !!farmDraft));
  if (!game) return;
  $('farm-modes').hidden=!farmDraft;$('brush-controls').hidden=!farmDraft||farmGesture!=='brush';
  if(farmDraft){$('farm-add').setAttribute('aria-pressed',String(!farmErase));$('farm-erase').setAttribute('aria-pressed',String(farmErase));}
  const landing = !game.ship, rect = landing ? {...game.pending,...SHIP} : placement ? {...placement,...placementSize()} : null;
  const valid = rect && (controllerPlacement?controllerCanPlace(game,rect,selectedFarm):canPlace(game,rect)) && zoom >= 4;
  $('build-title').textContent = landing ? 'Choose a landing site' : farmDraft ? (selectedFarm===null?'New field':`Edit field ${selectedFarm}`) : controllerPlacement ? 'Place farm building' : cutting ? 'Cut trees' : placement ? (hallPlacement?'Worker hall blueprint':housePlacement?'House blueprint':'Building blueprint') : 'Construction orders';
  $('build-help').textContent = landing ? '40 × 12 tiles. Tap the map to choose, then land. Trees under the ship will be cleared.' : farmDraft ? `${farmGesture==='brush'?'Brush':'Drag boxes'} to add or erase field land. Cancel discards this draft. Assign saved fields from a farm building. WASD / arrows pan.` : controllerPlacement ? '6 × 6 tiles. Place the building, then click it to assign separately created fields.' : cutting ? 'Tap a tree or drag a box, then confirm. Up to 128 trees / 4,096 tiles per order. WASD / arrows pan.' : placement ? (hallPlacement?'Wooden level 1 · 15 × 10 tiles · 10 hired workers. Humans report here, then build and cut trees automatically.':housePlacement?'6 × 6 tiles. One villager moves in automatically after construction finishes.':'6 × 6 tiles. Tap a site, then place. Build and cut orders share one queue.') : 'Place blueprints or mark trees. The ship drone and worker halls share the orders.';
  $('confirm-build').hidden = !rect && !cutting && !farmDraft;
  $('confirm-build').textContent = landing ? 'Land here' : farmDraft ? (selectedFarm===null?'Create field':'Apply field') : controllerPlacement ? 'Place farm building' : cutting ? `Order cutting${selection?.trees.length ? ' ('+selection.trees.length+')' : ''}` : 'Place blueprint';
  $('confirm-build').disabled = farmDraft ? !!farmDraft.error || !!farmPlacementError(game,farmDraft.coverage,selectedFarm) : cutting ? !detailView() || !selection?.trees.length || !!selection.error : !valid || (!landing && (game.jobs.length >= MAX_JOBS || game.sites.length >= MAX_SITES));
  $('cancel-build').hidden = !placement && !cutting && !farmDraft;
  for(const id of ['start-build','start-house','start-hall','start-farm','start-field']){$(id).hidden=false;$(id).disabled=landing||!!farmDraft||game.sites.length>=MAX_SITES||game.jobs.length>=MAX_JOBS;}
  $('start-cut').hidden=landing;$('start-cut').disabled=!!farmDraft;
  $('palette-status').textContent=farmDraft?'Finish or cancel the current land draft to place another structure.':'';
  $('view-ship').hidden = landing;
  let status = '';
  if(farmDraft){const d=farmPreview||farmDraft;status=d.error||farmPlacementError(game,d.coverage,selectedFarm)||`${d.area.toLocaleString()} tiles in field · drone preparation`;if(farmGesture==='brush')status+=` · ${brushSize} m brush`;else if(d.rect)status+=` · Selection ${d.rect.w} × ${d.rect.h} m`;}
  else if (cutting) status = !detailView() ? 'Zoom in to select individual trees.' : selection?.error || (selection ? `${selection.trees.length} ${selection.trees.length === 1 ? 'tree' : 'trees'} marked · ${game.jobs.length} jobs queued` : 'Select trees. Dragging marks an area in this tool.');
  else if (rect) status = zoom < 4 ? 'Zoom in to choose exact tiles.' : valid ? `Site X ${rect.x} · Y ${rect.y}` : 'This footprint overlaps occupied ground.';
  else {
    const d = game.drone, job = droneJob(game), queue = game.jobs.length;
    const progress = job?.kind === 'build' ? game.sites[job.site].progress : job?.kind==='field' ? world.farmCoverage.fields.get(job.field).farm.progress : job?.progress;
    status = ['building','cutting','preparing'].includes(d.stage) ? `Drone ${d.stage} ${Math.floor(progress*100)}% · ${queue} remaining` : d.stage === 'outbound' ? `Flying to ${job.kind === 'cut' ? 'tree' : job.kind==='field' ? 'field section' : 'blueprint'} · ${queue} remaining` : d.stage === 'returning' ? `Drone returning · ${queue} queued` : `${game.cursor} buildings · ${game.fields.filter(f=>!f.work||f.work.progress===1).length} fields prepared · Drone ready`;
    if (queue >= MAX_JOBS) status += ` · Queue limit ${MAX_JOBS}`;
  }
  $('build-status').textContent = orderError || status;$('queue-status').textContent=!placement&&!cutting&&!farmDraft?status:'';
  for(const b of document.querySelectorAll('[data-gesture]'))b.setAttribute('aria-pressed',String(b.dataset.gesture===farmGesture));
  sizeToolbar();
}
$('start-build').addEventListener('click', () => {
  cancelTool(); placement = { x: Math.floor(camera.x - BUILDING.w/2), y: Math.floor(camera.y - BUILDING.h/2) }; updateBuildUI();
});
$('start-hall').addEventListener('click',()=>{cancelTool();hallPlacement=true;placement={x:Math.floor(camera.x-WORKER_HALL.w/2),y:Math.floor(camera.y-WORKER_HALL.h/2)};updateBuildUI();});
$('start-house').addEventListener('click',()=>{cancelTool();housePlacement=true;placement={x:Math.floor(camera.x-3),y:Math.floor(camera.y-3)};updateBuildUI();});
$('start-cut').addEventListener('click', () => { cancelTool(); cutting = true; canvas.classList.add('selecting'); updateBuildUI(); });
$('start-field').addEventListener('click',()=>openAllotment());
$('start-farm').addEventListener('click',()=>{cancelTool();controllerPlacement=true;placement={x:Math.floor(camera.x-3),y:Math.floor(camera.y-3)};updateBuildUI();});
$('farm-add').addEventListener('click',()=>{stopDrag();farmErase=false;updateBuildUI();});
$('farm-erase').addEventListener('click',()=>{stopDrag();farmErase=true;updateBuildUI();});
$('farm-gesture').addEventListener('change',()=>{stopDrag();farmGesture=$('farm-gesture').value;brushCursor=null;updateBuildUI();});
$('farm-brush').addEventListener('change',()=>{stopDrag();brushSize=Math.max(1,Math.min(1024,Math.round(Number($('farm-brush').value)||1)));$('farm-brush').value=String(brushSize);updateBuildUI();});
$('cancel-build').addEventListener('click', cancelTool);
$('confirm-build').addEventListener('click', () => {
  const game = world.construction;
  if(farmDraft){const result=selectedFarm===null?createField(world,game,farmDraft.coverage):editField(world,game,selectedFarm,farmDraft.coverage);if(result.error){farmDraft.error=result.error;updateBuildUI();return;}const id=result.field.id;cancelTool();showEconomy({kind:'field',id});changed();saveCurrent();return;}
  if (zoom < 4) return;
  if (cutting) {
    if (!detailView()) return;
    const result = orderCuts(world,game,selection?.trees);
    if (result.error) { selection = {...selection,error:result.error}; updateBuildUI(); return; }
    cancelTool(); changed(); saveCurrent(); return;
  }
  if (!hasEditRoom(world,game,{...(game.ship ? placement : game.pending),...(game.ship ? placementSize() : SHIP)})) { orderError = 'This world has reached its tree-clearing limit.'; updateBuildUI(); return; }
  if(controllerPlacement){const result=placeFarmBuilding(world,game,placement,selectedFarm);if(result.error){orderError=result.error;updateBuildUI();return;}const id=result.farm.id;cancelTool();showEconomy({kind:'farm',id});changed();saveCurrent();return;}
  const success = game.ship ? placeBuilding(world,game,placement,hallPlacement?'hall':housePlacement) : land(world,game);
  if (success) { ensureTowns(world);cancelTool(); changed(); saveCurrent(); }
});
$('view-ship').addEventListener('click',()=>{const ship=world.construction.ship;frameLocation({x:ship.x+ship.w/2,y:ship.y+ship.h/2},60,28);});

function drawShipDetails(ship, drone, left, top) {
  if (zoom < 3) return;
  const sx = (ship.x - left) * zoom, sy = (ship.y - top) * zoom;
  if (sx + ship.w * zoom < 0 || sx > width || sy + ship.h * zoom < 0 || sy > height) return;
  ctx.save(); ctx.translate(sx, sy); ctx.scale(zoom, zoom); ctx.lineWidth = 1 / zoom;
  // Broad roof plates retain the continuous, rectangular 40 × 12 m hull.
  ctx.fillStyle = '#a5abae'; ctx.fillRect(.15, .15, 39.7, .35);
  ctx.fillStyle = '#646e75'; ctx.fillRect(.15, 11.5, 39.7, .35);
  ctx.fillStyle = '#949da3'; ctx.fillRect(7, 5.4, 26, 1.2);
  for (const [x, w] of [[7.5,7],[25.5,6.5]]) for (const y of [1.3,7]) {
    ctx.fillStyle = '#9ba3a7'; ctx.fillRect(x,y,w,3.7);
    ctx.strokeStyle = '#707d85'; ctx.strokeRect(x,y,w,3.7);
  }
  // Two large engine housings at the stern; no exhaust while landed.
  for (const y of [2,6.8]) {
    ctx.fillStyle = '#59656d'; ctx.fillRect(.8,y,5.7,3.2);
    ctx.fillStyle = '#3b474f'; ctx.fillRect(1.2,y+.4,1.4,2.4);
    ctx.fillStyle = '#77848c'; ctx.fillRect(3,y+.4,3.1,2.4);
    ctx.strokeStyle = '#b0b9bd'; ctx.strokeRect(.8,y,5.7,3.2);
  }
  // Sealed bow plating on the uncrewed ship; no cockpit or glazing.
  ctx.fillStyle = '#9ba3a7'; ctx.beginPath();
  ctx.moveTo(33,1.5);ctx.lineTo(37.8,1.5);ctx.lineTo(39.2,3);ctx.lineTo(39.2,9);ctx.lineTo(37.8,10.5);ctx.lineTo(33,10.5);ctx.closePath();ctx.fill();
  ctx.strokeStyle = '#707d85';ctx.stroke();
  // This roof bay is centred on the drone's real departure/return coordinates.
  const distance = drone ? Math.hypot(drone.x - ship.x - ship.w / 2, drone.y - ship.y - ship.h / 2) : Infinity;
  const openness = drone?.stage === 'outbound' ? Math.max(0,1-distance/8) : drone?.stage === 'returning' ? Math.max(0,1-distance/12) : 0;
  ctx.fillStyle = '#4c5a63';ctx.fillRect(16.2,2.5,7.6,7);
  ctx.fillStyle = '#273640';ctx.fillRect(16.7,3,6.6,6);
  const doorWidth = 3.3 * (1-openness);
  ctx.fillStyle = '#a1acb3';ctx.fillRect(16.7,3,doorWidth,6);ctx.fillRect(23.3-doorWidth,3,doorWidth,6);
  ctx.strokeStyle = '#bdcbd0';ctx.strokeRect(16.2,2.5,7.6,7);
  ctx.strokeStyle = '#5b707c';ctx.beginPath();ctx.moveTo(16.7+doorWidth,3);ctx.lineTo(16.7+doorWidth,9);ctx.moveTo(23.3-doorWidth,3);ctx.lineTo(23.3-doorWidth,9);ctx.stroke();
  ctx.restore();
  if (zoom >= 10) { ctx.save();ctx.fillStyle = '#e1e5e4';ctx.font = '10px monospace';ctx.fillText('DRONE BAY',sx+17.1*zoom,sy+2*zoom);ctx.restore(); }
}
function drawFarmCoverage(entries,left,top,color,prepared=Infinity,outline=false){
 ctx.save();ctx.fillStyle=color;ctx.strokeStyle=color;ctx.lineWidth=1;
 for(const c of entries){const sx=(c.cx*32-left)*zoom,sy=(c.cy*32-top)*zoom,size=32*zoom;if(sx+size<0||sy+size<0||sx>width||sy>height)continue;
  const count=Math.max(0,Math.min(c.count,prepared-c.start));if(!count)continue;
  if(!c.rows&&count===1024){if(outline)ctx.strokeRect(sx,sy,size,size);else ctx.fillRect(sx,sy,size,size);continue;}
  for(let y=0;y<32;y++){let v=preparedRow(c,y,count);if(!v)continue;let x=0;while(x<32){while(x<32&&!(v&(1<<x)))x++;const a=x;while(x<32&&(v&(1<<x)))x++;if(x>a){if(outline)ctx.strokeRect(sx+a*zoom,sy+y*zoom,(x-a)*zoom,zoom);else ctx.fillRect(sx+a*zoom,sy+y*zoom,(x-a)*zoom,zoom);}}}
 }ctx.restore();
}
function drawFarms(left,top){
 for(const{farm,entries}of world.farmCoverage?.fields.values()||[]){
  if(!detailView())drawFarmCoverage(entries,left,top,'#826c4d',Math.floor(farm.area*farm.progress+1e-7));
  if(farm.progress<1)drawFarmCoverage(entries,left,top,'#bfcf8c55',Infinity,true);
 }
 drawFieldAssignments(left,top);
 if(farmDraft){drawFarmCoverage(farmDraftEntries,left,top,farmPreview?.error?'#ee907b77':'#98d5df88');drawFarmCoverage(farmDraftEntries,left,top,farmPreview?.error?'#ffac91':'#d5f5ff',Infinity,true);if(farmGesture==='brush'&&brushCursor){ctx.strokeStyle=farmErase?'#ffbc94':'#fff6cf';ctx.lineWidth=2;ctx.strokeRect((brushCursor.x-Math.floor(brushSize/2)-left)*zoom,(brushCursor.y-Math.floor(brushSize/2)-top)*zoom,brushSize*zoom,brushSize*zoom);}else if(farmPreview?.rect){const r=farmPreview.rect;ctx.strokeStyle=farmErase?'#ffbc94':'#fff6cf';ctx.lineWidth=2;ctx.strokeRect((r.x-left)*zoom,(r.y-top)*zoom,r.w*zoom,r.h*zoom);}}
}
function drawConstruction(left, top) {
  const game = world.construction;
  if (!game) return;
  function rectangle(rect, fill, stroke, progress = 1, preview = false, shipMarker = false) {
    const sx = (rect.x - left) * zoom, sy = (rect.y - top) * zoom;
    const w = Math.max(rect.w * zoom, rect.w === SHIP.w ? 10 : 7), h = Math.max(rect.h * zoom, 7);
    if (sx + w < 0 || sx > width || sy + h < 0 || sy > height) return;
    ctx.save(); ctx.lineWidth = preview ? 2 : 1.5;
    ctx.fillStyle = fill; ctx.fillRect(sx, sy + h * (1 - progress), w, h * progress);
    ctx.strokeStyle = stroke; if (preview || progress < 1) ctx.setLineDash([5, 4]);
    ctx.strokeRect(sx, sy, w, h); ctx.restore();
    if (shipMarker && zoom < 1) { ctx.fillStyle = '#f3f1df'; ctx.font = '10px monospace'; ctx.fillText('SHIP', sx + 14, sy + 8); }
    if (rect.w === BUILDING.w && zoom >= 4 && progress < 1 && !preview) {
      ctx.fillStyle = '#e1f4f6'; ctx.font = '11px monospace'; ctx.fillText(`${Math.floor(progress * 100)}%`, sx, sy - 5);
    }
  }
  if (game.ship) { rectangle(game.ship, '#8c8f92', '#d1d4d5', 1, false, true); drawShipDetails(game.ship, game.drone, left, top); }
  for (const site of game.sites) {
    rectangle(site,site.hall?'#87684c':site.house?'#93705a':site.farm?'#948169':site.progress===1?'#7e8990':'#98a7ad',site.farm?'#efe0b6':site.progress===1?'#c6d0d3':'#b3e8f3',site.progress);
    if(site.hall){const sx=(site.x-left)*zoom,sy=(site.y-top)*zoom,sw=site.w*zoom,sh=site.h*zoom;if(sx+sw>=0&&sx<=width&&sy+sh>=0&&sy<=height){ctx.strokeStyle='#ceab79';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(sx,sy+sh*.5);ctx.lineTo(sx+sw,sy+sh*.5);ctx.stroke();ctx.fillStyle='#443426';ctx.fillRect(sx+sw*.4,sy+sh-zoom,sw*.2,zoom);const count=world.economy.workers.filter(w=>!w.leaving&&w.workplace===`hall:${game.sites.indexOf(site)}`).length;ctx.fillStyle='#fff0ce';ctx.font='11px Arial';ctx.fillText(`Worker hall · L1 · ${count}/10`,sx,sy-6);}}
    if(site.house&&site.progress===1){const sx=(site.x-left)*zoom,sy=(site.y-top)*zoom,sw=site.w*zoom,sh=site.h*zoom;if(sx+sw>=0&&sx<=width&&sy+sh>=0&&sy<=height){ctx.strokeStyle='#d6b99b';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(sx+sw/2,sy);ctx.lineTo(sx+sw/2,sy+sh);ctx.stroke();ctx.fillStyle='#44352d';ctx.fillRect(sx+sw*.4,sy+sh-zoom*.6,sw*.2,zoom*.6);const resident=world.economy.workers.find(w=>w.home.site===game.sites.indexOf(site));ctx.fillStyle='#fff0ce';ctx.font='11px Arial';ctx.fillText(resident?`Home · ${resident.id}`:'House · vacant',sx,sy-6);if(resident?.id===selectedVillagerId){ctx.strokeStyle='#fff0a4';ctx.lineWidth=2;ctx.strokeRect(sx-2,sy-2,sw+4,sh+4);}}}
    if(site.farm){const sx=(site.x-left)*zoom,sy=(site.y-top)*zoom;if(sx>-60&&sx<width&&sy>-60&&sy<height){ctx.fillStyle='#f5ead2';ctx.font='11px monospace';ctx.fillText(`F${site.farm}`,sx+3,sy+Math.max(13,site.h*zoom/2));if(zoom>=4&&site.progress===1){ctx.strokeStyle='#5a5040';ctx.lineWidth=2;ctx.strokeRect(sx+zoom,sy+zoom,site.w*zoom-2*zoom,site.h*zoom-2*zoom);}}}
  }
  const ghost = !game.ship ? { ...game.pending, ...SHIP } : placement ? { ...placement, ...placementSize() } : null;
  if (ghost) { const valid = controllerPlacement?controllerCanPlace(game,ghost,selectedFarm):canPlace(game, ghost); rectangle(ghost, valid ? '#c5e0df55' : '#d3706355', valid ? '#e2f0df' : '#f4a38e', 1, true); }
  function treeMark(tree, color, progress = 0) {
    const sx = (tree.x+.5-left)*zoom, sy = (tree.y+.5-top)*zoom, r = Math.max(4,zoom*.64);
    if (sx+r<0 || sx-r>width || sy+r<0 || sy-r>height) return;
    ctx.save();ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(sx,sy,r,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(sx-3,sy-3);ctx.lineTo(sx+3,sy+3);ctx.moveTo(sx+3,sy-3);ctx.lineTo(sx-3,sy+3);ctx.stroke();
    if (progress>0) {ctx.lineWidth=3;ctx.beginPath();ctx.arc(sx,sy,r+3,-Math.PI/2,-Math.PI/2+progress*Math.PI*2);ctx.stroke();}
    ctx.restore();
  }
  for (const job of game.jobs) if (job.kind === 'cut') treeMark(job,'#f5c773',job.progress);
  if (cutting && selection) {
    if (selection.rect) rectangle(selection.rect,selection.error?'#d3706322':'#f4df9a19',selection.error?'#efa18b':'#f6e5a5',1,true);
    for (const tree of selection.trees) treeMark(tree,'#fff5c8');
  }
  const d = game.drone;
  if (d && d.stage !== 'idle') {
    const sx = (d.x - left) * zoom, sy = (d.y - top) * zoom, r = Math.max(4, Math.min(7, zoom * .4));
    if (sx > -10 && sx < width + 10 && sy > -10 && sy < height + 10) {
      ctx.fillStyle = '#f0d18a'; ctx.strokeStyle = '#35404a'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(sx,sy-r);ctx.lineTo(sx+r,sy);ctx.lineTo(sx,sy+r);ctx.lineTo(sx-r,sy);ctx.closePath();ctx.fill();ctx.stroke();
    }
  }
}
function updateStats() {
  updateEconomyUI();
  const biome = world.isGrassland(camera.x, camera.y) ? 'Grasslands' : 'Woodland';
  $('world-stats').textContent = `${biome}\nSeed: ${world.settings.seed}\nPatch size: ${world.settings.scale} m\nNoise layers: ${world.settings.detail}\nTree amount: ${world.settings.density} / 100`;
  $('world-stats').style.whiteSpace = 'pre-wrap';
}
function overviewChunk(cx, cy, step) {
  const key = `${mapView()?'map':'terrain'}:${step}:${cx},${cy}`;
  if (overviews.has(key)) { const raster = overviews.get(key); overviews.delete(key); overviews.set(key, raster); return raster; }
  // Shared world-aligned sample points plus a one-sample neighbor border keep interpolation seamless.
  const start=performance.now(),size=OVERVIEW_SIZE+3,raster=document.createElement('canvas');raster.width=raster.height=size;
  const c=raster.getContext('2d'),pixels=c.createImageData(size,size),map=mapView();
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const wx=(cx*OVERVIEW_SIZE+x-1)*step,wy=(cy*OVERVIEW_SIZE+y-1)*step,f=world.field(wx,wy),meadow=world.isGrassland(wx,wy)?1:0;
    const t=Math.max(0,Math.min(1,(f-.27)/.43)),cover=meadow?0:t*t*(3-2*t)*world.settings.density/100*.92,i=(y*size+x)*4;
    if(map){const color=meadow?[173,177,123]:cover>=.22?[75,111,81]:[137,153,102];pixels.data[i]=color[0];pixels.data[i+1]=color[1];pixels.data[i+2]=color[2];}
    else{pixels.data[i]=148-f*22-cover*65+meadow*20;pixels.data[i+1]=161-f*18-cover*58+meadow*15;pixels.data[i+2]=103-f*17-cover*28+meadow*10;}pixels.data[i+3]=255;
  }
  c.putImageData(pixels,0,0);overviews.set(key,raster);overviewBuildMs+=performance.now()-start;overviewBuilds++;
  if(overviews.size>OVERVIEW_LIMIT){const oldest=overviews.keys().next().value,old=overviews.get(oldest);old.width=old.height=0;overviews.delete(oldest);}return raster;
}
function drawOverviewLayer(left,top,right,bottom,step,alpha){
  if(alpha<=.001)return;const metres=OVERVIEW_SIZE*step,pixels=step*zoom,dpr=Math.min(devicePixelRatio||1,2);ctx.globalAlpha=alpha;
  for(let cy=Math.floor(top/metres);cy<=Math.floor(bottom/metres);cy++)for(let cx=Math.floor(left/metres);cx<=Math.floor(right/metres);cx++){
    const x=(cx*metres-left)*zoom,y=(cy*metres-top)*zoom,x0=Math.floor(x*dpr)/dpr,y0=Math.floor(y*dpr)/dpr,x1=Math.floor((x+metres*zoom)*dpr)/dpr,y1=Math.floor((y+metres*zoom)*dpr)/dpr;
    ctx.save();ctx.beginPath();ctx.rect(x0,y0,x1-x0,y1-y0);ctx.clip();ctx.drawImage(overviewChunk(cx,cy,step),x-1.5*pixels,y-1.5*pixels,(OVERVIEW_SIZE+3)*pixels,(OVERVIEW_SIZE+3)*pixels);ctx.restore();overviewChunks++;overviewCells+=(OVERVIEW_SIZE+3)**2;
  }ctx.globalAlpha=1;
}
function draw(now) {
  requestAnimationFrame(draw);
  if (active) {
    if (simulationAt){const seconds=Math.max(0,(now-simulationAt)/1000);if(advanceConstruction(world.construction,seconds,world)||false)changed();if(advanceEconomy(world,seconds))changed();}
    simulationAt = now;
    if (dirty && now-lastSaved > 1000 && (now-lastChanged > 500 || now-lastSaved > 5000)) saveCurrent();
  }
  if (screen !== 'viewport') return;
  const start = performance.now();
  if (renderedStateRevision !== world.state.revision) {
    renderedStateRevision = world.state.revision; changed();
  }
  const dt = last ? Math.min((now-last)/1000, 0.05) : 0; last = now;
  pan(dt);
  const left = camera.x - width / zoom / 2, top = camera.y - height / zoom / 2;
  const right = left + width / zoom, bottom = top + height / zoom;
  const detailed=detailView();visibleChunks=0;overviewCells=0;overviewChunks=0;
  if(detailed){ctx.imageSmoothingEnabled=false;const metres=CHUNK_SIZE;
    for(let cy=Math.floor(top/metres);cy<=Math.floor(bottom/metres);cy++)for(let cx=Math.floor(left/metres);cx<=Math.floor(right/metres);cx++){
      const x=(cx*metres-left)*zoom,y=(cy*metres-top)*zoom,x0=Math.round(x),y0=Math.round(y),x1=Math.round(x+metres*zoom),y1=Math.round(y+metres*zoom);ctx.drawImage(rasterChunk(cx,cy),x0,y0,x1-x0,y1-y0);visibleChunks++;
    }
  }else{
    const target=Math.max(OVERVIEW_TARGET,width/OVERVIEW_SAMPLES,height/OVERVIEW_SAMPLES),level=Math.log2(target/zoom),fine=2**Math.floor(level),blend=level-Math.floor(level);overviewFinePixels=fine*zoom;
    ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='low';drawOverviewLayer(left,top,right,bottom,fine,1);drawOverviewLayer(left,top,right,bottom,fine*2,blend);ctx.imageSmoothingEnabled=false;visibleChunks=overviewChunks;
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
  drawFarms(left,top);
  if(mapView())drawMapSymbols(left,top);else{mapHits=[];drawConstruction(left, top);drawEconomy(left,top);}
  frameCount++; frameMs += performance.now()-start;
  if(now-statsAt>250){$('position').textContent=`X ${Math.floor(camera.x)} · Y ${Math.floor(camera.y)}`;updateStats();updateBuildUI();statsAt=now;}
  if (dirty && now-lastSaved > 1000 && (now-lastChanged > 500 || now-lastSaved > 5000)) saveCurrent();
}

// Read-only diagnostics for reproducible, bounded verification.
window.woodland = Object.freeze({
  get construction(){return world?.construction ? structuredClone(world.construction) : null;},
  get economy(){return world?.economy?structuredClone(world.economy):null;},
  get farmDraft(){return farmDraft ? structuredClone(farmPreview?.coverage?farmPreview:farmDraft) : null;},
  get selection(){return selection ? structuredClone(selection) : null;},
  get cutting(){return cutting;},
  get generator(){return world?.generator;},
  get placement(){return placement ? {...placement} : null;},
  get settings(){return world ? {...world.settings} : null;},
  get screen(){return screen;},
  get name(){return active?.name;},
  get camera(){return {...camera};},
  get metrics(){return {frames:frameCount,meanWorkMs:frameMs/Math.max(1,frameCount),dataChunks:world?.chunks.size || 0,dataGenerated:world?.generated||0,rasterChunks:rasters.size,visibleChunks,zoom,overviewCells,overviewChunks,overviewCache:overviews.size,overviewBuildMs,overviewBuilds,overviewFinePixels,overviewLimit:OVERVIEW_LIMIT,spanMetres:width/zoom,mode:mapView()?'map':detailView()?'detail':'overview'};},
  tile:(x,y)=>world.tile(x,y),
});
for (const key of ['scale', 'detail', 'density']) $(key).value = DEFAULTS[key];
labels();showScreen('menu');requestAnimationFrame(draw);

function refillSelect(node,items){const old=node.value;const list=$('town-list');list.replaceChildren(...items.map(([value,label])=>{const b=document.createElement('button');b.type='button';b.dataset.town=String(value);b.textContent=label;b.addEventListener('click',()=>{node.value=String(value);node.dispatchEvent(new Event('change'));});return b;}));node.value=items.some(([v])=>String(v)===old)?old:String(items[0]?.[0]??'');}

function showEconomy(selection){closeChrome();farmTab='production';fieldListStamp='';if(selection.kind==='farm'){if(!assignmentDrafts.has(selection.id))resetAssignmentDraft(selection.id);fieldChoices=assignmentDrafts.get(selection.id).choices;}$('economy-message').textContent='';economySelection=selection;economyListStamp='';$('economy-panel').hidden=false;document.body.classList.add('inspector-open');updateEconomyUI();if(selection.kind==='town')$('town-choice').value=String(selection.id);if(selection.kind==='hall'){const hall=world.construction.sites[selection.id],town=[...world.economy.towns].sort((a,b)=>Math.hypot(a.x-hall.x,a.y-hall.y)-Math.hypot(b.x-hall.x,b.y-hall.y))[0];if(town)$('town-choice').value=String(town.id);}if(selection.kind==='farm'){$('crop-choice').value=farmEconomy(world,selection.id).crop||'';}updateEconomyUI();requestAnimationFrame(()=>revealSelection(selection));}
function updateEconomyUI(){
 updateVillagersUI();
 const e=world?.economy;$('gold-balance').hidden=!e;if(!e)return;$('gold-balance').textContent=`${e.gold} gold`;
 if(!economySelection)return;
 const farm=economySelection.kind==='farm'?farmEconomy(world,economySelection.id):null;
 $('economy-title').textContent=farm?`Farm ${farm.farm}`:'Towns';$('farm-operations').hidden=!farm;$('farm-action-bar').hidden=!farm;$('town-action-bar').hidden=!!farm;$('market-operations').hidden=!!farm;$('apply-crop').disabled=!!farmDraft;$('edit-farm-land').disabled=false;updateFieldUI(farm);
 const stamp=e.towns.map(t=>t.id).join(',');
 if(stamp!==economyListStamp){refillSelect($('town-choice'),e.towns.map(t=>[t.id,t.name]));economyListStamp=stamp;}
 if(farm){const c=farm.cycle,workers=e.workers.filter(w=>w.workplace===farm.farm&&!w.leaving),base=staffingTarget(world.construction.farms.find(f=>f.id===farm.farm)),productive=workers.filter(w=>w.phase==='farm'&&w.assignment?.kind==='farm').length,carriers=workers.filter(w=>w.assignment?.kind==='delivery').length,level=laborProductivity(productive,base),progress=c?Math.floor((c.phase==='growing'?c.grown/CROPS[c.crop].growSeconds:c.work/c.area)*100):0;
 const status=!farm.crop?'Choose a crop':!base?(farm.stock.wheat+farm.stock.corn?'Stored crops remain here. Assign a field to resume deliveries.':'No fields assigned'):!productive?'Waiting for workers at the farm':!c?'Waiting for the building and prepared land':c.phase==='harvesting'&&farm.stock[c.crop]>=BALANCE.storageKg?'Storage full · waiting for delivery':`${CROPS[c.crop].name} · ${c.phase} ${progress}%`;
 $('farm-economy-status').innerHTML=`<div class="metric-main"><strong>${Math.round(level*100)}%</strong><span>Production level</span></div><p class="stage-label">${status}</p><div class="progress-track"><span style="width:${progress}%"></span></div><div class="metric-grid"><div class="metric"><strong>${workers.length} / ${base}</strong><span>Assigned / base workers</span></div><div class="metric"><strong>${productive} working</strong><span>${carriers} delivering</span></div></div><h3>Crop storage</h3><div class="stat-row"><span>Wheat</span><strong>${farm.stock.wheat} kg</strong></div><div class="stat-row"><span>Corn</span><strong>${farm.stock.corn} kg</strong></div>`;}
 const hall=economySelection.kind==='hall'?world.construction.sites[economySelection.id]:null;$('hall-operations').hidden=!hall;if(hall){const workers=e.workers.filter(w=>!w.leaving&&w.workplace===`hall:${economySelection.id}`),working=workers.filter(w=>world.construction.jobs.some(j=>j.claimant===`worker:${w.id}`)).length;$('economy-title').textContent=`Worker hall ${economySelection.id+1}`;$('hall-status').innerHTML=`<div class="metric-main"><strong>${workers.length} / 10</strong><span>Workers assigned</span></div><p class="stage-label">${hall.progress<1?`Under construction · ${Math.floor(hall.progress*100)}%`:working?`${working} on construction or cutting jobs`:'Waiting for reachable construction or cutting orders'}</p>`;}
 for(const b of document.querySelectorAll('[data-crop]'))b.setAttribute('aria-pressed',String(b.dataset.crop===$('crop-choice').value));for(const b of $('town-list').children)b.setAttribute('aria-pressed',String(b.dataset.town===$('town-choice').value));

 const town=e.towns.find(t=>t.id===Number($('town-choice').value));if(economySelection.kind==='town'&&town)$('economy-title').textContent=`${town.name} · hiring`;$('town-prices').innerHTML=town?`<h3>Market prices</h3><div class="stat-row"><span>Wheat</span><strong>${CROPS.wheat.price} gold/kg</strong></div><div class="stat-row"><span>Corn</span><strong>${CROPS.corn.price} gold/kg</strong></div>`:'';$('hire-worker').textContent=`Hire · ${HIRING.wage} gold/month`;$('hire-worker').disabled=!town||e.gold<HIRING.wage||e.workers.length>=BALANCE.maxWorkers||!hiringHome(world,town?.id);$('hire-worker').title=town&&!hiringHome(world,town.id)?'No vacant home. Build a house before hiring here.':'';if(town&&!hiringHome(world,town.id))$('town-prices').insertAdjacentHTML('beforeend','<p class="notice">No vacant home. Build a house to hire here.</p>');
 $('payroll-policy').textContent=`Month ${Math.floor(e.clock/HIRING.period)+1} · 1 game month = ${HIRING.period} seconds. Workers allow ${HIRING.graceMonths} unpaid months, then leave; missed wages are forgiven.`;$('departure-notice').textContent=e.lastDeparture;$('departure-notice').hidden=!e.lastDeparture;
}
$('open-trade').addEventListener('click',()=>showEconomy({kind:'overview'}));$('close-economy').addEventListener('click',closeChrome);
$('town-choice').addEventListener('change',()=>{$('economy-message').textContent='';updateEconomyUI();});
$('hire-worker').addEventListener('click',()=>{const r=hireWorker(world,Number($('town-choice').value));$('economy-message').textContent=r.error||`Villager hired in ${world.economy.towns.find(t=>t.id===r.worker.homeTown).name}. Nearby work and deliveries are automatic.`;if(r.worker){selectedVillagerId=r.worker.id;changed();saveCurrent();}updateEconomyUI();});
$('apply-crop').addEventListener('click',()=>{if(economySelection?.kind!=='farm')return;setCrop(world,economySelection.id,$('crop-choice').value||null);$('economy-message').textContent='Crop choice saved. Unharvested work restarts; stored harvest stays.';changed();saveCurrent();updateEconomyUI();});
$('edit-farm-land').addEventListener('click',()=>{farmTab='fields';updateEconomyUI();requestAnimationFrame(frameAssignedFields);});
$('view-town').addEventListener('click',()=>{const t=world.economy.towns.find(t=>t.id===Number($('town-choice').value));if(t)frameLocation({x:t.x+t.w/2,y:t.y+t.h/2},t.w+24,t.h+24,10);});
function drawEconomy(left,top){const e=world.economy;if(!e)return;
 for(const t of e.towns){const x=(t.x-left)*zoom,y=(t.y-top)*zoom,w=t.w*zoom,h=t.h*zoom;if(x+w<0||y+h<0||x>width||y>height)continue;
  if(zoom>=2){const large=t.layout===VILLAGES.layout;ctx.fillStyle='#b6a37c77';ctx.fillRect(x+(large?19.5:7.5)*zoom,y,(large?1.5:3)*zoom,h);ctx.fillRect(x,y+(large?9.1:6)*zoom,w,(large?1.4:2)*zoom);
   for(let i=0;i<(large?VILLAGES.houses:6);i++){const columns=large?5:3,col=i%columns,row=Math.floor(i/columns),v=((world.seed>>>0)+t.id*13+i*7)%3,hx=x+(large?4+col*9+(v-1)*.5:1+col*5.5)*zoom,hy=y+(large?3+row*8:1+row*7)*zoom,rw=(large?5:4)*zoom,rh=(large?4.5+v*.25:3.5+v*.25)*zoom;ctx.fillStyle='#d0baa0';ctx.fillRect(hx,hy,rw,rh+zoom*.6);ctx.fillStyle=['#765445','#87705a','#67645a'][v];ctx.fillRect(hx-zoom*.25,hy-zoom*.2,rw+zoom*.5,rh);ctx.strokeStyle='#baa285';ctx.lineWidth=Math.max(1,zoom*.12);ctx.beginPath();ctx.moveTo(hx+rw/2,hy);ctx.lineTo(hx+rw/2,hy+rh);ctx.stroke();ctx.fillStyle='#463d32';ctx.fillRect(hx+rw*.4,hy+rh,zoom*.8,zoom*.6);const resident=e.workers.find(w=>w.id===selectedVillagerId&&w.home.town===t.id&&w.home.house===i);if(resident){ctx.strokeStyle='#fff0a4';ctx.lineWidth=2;ctx.strokeRect(hx-2,hy-2,rw+4,rh+zoom*.6+4);ctx.fillStyle='#fff0a4';ctx.font='11px Arial';ctx.fillText(`Home · ${resident.id}`,hx,hy-6);}}
  }else{ctx.fillStyle='#c9b18b';ctx.fillRect(x,y,Math.max(12,w),Math.max(10,h));ctx.strokeStyle='#f2dfb9';ctx.lineWidth=1.5;ctx.strokeRect(x,y,Math.max(12,w),Math.max(10,h));}
  ctx.fillStyle='#fff1cf';ctx.font='12px Arial';ctx.fillText(t.name,x,y-6);
 }
 const selected=selectedVillagerId;for(const w of e.workers){const x=(w.x-left)*zoom,y=(w.y-top)*zoom;if(selected===w.id&&w.path.length){ctx.strokeStyle='#f0cf7866';ctx.lineWidth=1.5;ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(x,y);for(const p of w.path.slice(w.step))ctx.lineTo((p.x-left)*zoom,(p.y-top)*zoom);ctx.stroke();ctx.setLineDash([]);}if(x<-30||y<-30||x>width+30||y>height+30)continue;const size=Math.max(4,Math.min(8,zoom*.5));ctx.fillStyle=w.unpaid?'#df8970':'#f5e2a3';ctx.strokeStyle='#40392a';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x,y,size,0,Math.PI*2);ctx.fill();ctx.stroke();if(w.assignment?.kind==='delivery'||w.cargo){ctx.fillStyle=w.cargo?'#d8a454':'#837655';ctx.fillRect(x+size+2,y-size,Math.max(8,size*2),size*2);ctx.strokeRect(x+size+2,y-size,Math.max(8,size*2),size*2);if(w.cargo){ctx.fillStyle='#fff3ca';ctx.font='10px Arial';ctx.fillText(`${w.cargo.kg} kg`,x-5,y-size-5);}}ctx.fillStyle='#fff5da';ctx.font='10px Arial';if(selected===w.id)drawVillagerSelection(w,x,y,size);}
 for(const f of e.farms){const site=world.construction.sites[world.construction.farms.find(g=>g.id===f.farm)?.controller];if(!site||site.progress<1||!f.crop)continue;const x=(site.x-left)*zoom,y=(site.y-top)*zoom;if(x<0||y<0||x>width||y>height)continue;ctx.fillStyle='#f1d780';ctx.font='11px Arial';ctx.fillText(CROPS[f.crop].name,x,y+site.h*zoom+14);}
}

function boxesOverlap(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
function mapLineHits(a,b,r){let lo=0,hi=1;for(const axis of ['x','y']){const d=b[axis]-a[axis],min=r[axis]-2,max=r[axis]+r[axis==='x'?'w':'h']+2;if(Math.abs(d)<1e-9){if(a[axis]<min||a[axis]>max)return false;continue;}let u=(min-a[axis])/d,v=(max-a[axis])/d;if(u>v)[u,v]=[v,u];lo=Math.max(lo,u);hi=Math.min(hi,v);if(lo>=hi)return false;}return hi>0&&lo<1;}
function drawMapSymbols(left,top){
 mapHits=[];const game=world.construction;if(!game)return;
 const symbols=[...(game.ship?[{kind:'ship',id:0,rect:game.ship,label:'Ship',color:'#d3d8d4'}]:[]),...game.sites.flatMap((site,id)=>site.hall?[{kind:'hall',id,rect:site,label:`Worker hall ${id+1}`,color:'#ba9467'}]:[]),...game.farms.filter(f=>f.controller!==null).map(f=>({kind:'farm',id:f.id,rect:game.sites[f.controller],label:`Farm ${f.id}`,color:'#c49b66'})),...(world.economy?.towns||[]).map(t=>({kind:'town',id:t.id,rect:t,label:t.name,color:'#f2d992'}))];
 const markers=symbols.map(s=>({x:(s.rect.x+s.rect.w/2-left)*zoom-9,y:(s.rect.y+s.rect.h/2-top)*zoom-9,w:18,h:18})),labels=[];ctx.font='12px Arial';
 for(const symbol of symbols){const r=symbol.rect,x=(r.x+r.w/2-left)*zoom,y=(r.y+r.h/2-top)*zoom;if(x<-30||y<-30||x>width+30||y>height+30)continue;
  ctx.fillStyle=symbol.color;ctx.strokeStyle='#293d32';ctx.lineWidth=2;ctx.beginPath();if(symbol.kind==='town')ctx.arc(x,y,7,0,Math.PI*2);else if(symbol.kind==='ship'){ctx.moveTo(x,y-8);ctx.lineTo(x+8,y);ctx.lineTo(x,y+8);ctx.lineTo(x-8,y);ctx.closePath();}else ctx.rect(x-6,y-6,12,12);ctx.fill();ctx.stroke();
  const tw=ctx.measureText(symbol.label).width+10,above=symbol.kind==='town';let box,anchor;
  if(above){const start={x,y:y-8};outer:for(let row=0;row<labels.length+markers.length+3;row++)for(const offset of [0,-tw-12,tw+12]){const candidate={x:Math.min(width-tw-4,Math.max(4,x-tw/2+offset)),y:y-32-row*20,w:tw,h:19},end={x:Math.max(candidate.x+5,Math.min(candidate.x+tw-5,x)),y:candidate.y+19};if([...labels,...markers].some(b=>boxesOverlap(candidate,b)))continue;if(labels.some(b=>mapLineHits(start,end,b)))continue;if(markers.some(b=>Math.abs(b.x+9-x)>1||Math.abs(b.y+9-y)>1?mapLineHits(start,end,b):false))continue;box=candidate;anchor=end;break outer;}}
  if(!box){let lx=Math.min(width-tw-4,Math.max(4,above?x-tw/2:x+12)),ly=above?y-32:Math.max(4,y-9);for(let n=0;n<labels.length+markers.length+1&&[...labels,...markers].some(b=>boxesOverlap({x:lx,y:ly,w:tw,h:19},b));n++)ly+=above?-20:20;box={x:lx,y:ly,w:tw,h:19};anchor={x:above?lx+tw/2:lx,y:above?ly+19:ly+9};}
  labels.push({...box,text:symbol.label});ctx.strokeStyle='#ece7c288';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(above?x:x+7,above?y-8:y);ctx.lineTo(anchor.x,anchor.y);ctx.stroke();mapHits.push({kind:symbol.kind,id:symbol.id,x:x-9,y:y-9,w:18,h:18},{kind:symbol.kind,id:symbol.id,...box,isLabel:true});
 }
 for(const b of labels){ctx.fillStyle='#293d32e8';ctx.fillRect(b.x,b.y,b.w,b.h);ctx.fillStyle='#f5ebcf';ctx.fillText(b.text,b.x+5,b.y+14);}
 const d=game.drone;if(d){const x=(d.x-left)*zoom,y=(d.y-top)*zoom;ctx.fillStyle='#efcf72';ctx.fillRect(x-2,y-2,4,4);}
 for(const w of world.economy?.workers||[]){ctx.fillStyle=w.cargo?'#ffdf83':'#faf0c8';ctx.beginPath();ctx.arc((w.x-left)*zoom,(w.y-top)*zoom,w.cargo?3:2,0,Math.PI*2);ctx.fill();if(w.id===selectedVillagerId)drawVillagerSelection(w,(w.x-left)*zoom,(w.y-top)*zoom,w.cargo?3:2);}
}


// The roster reads the simulation. Choosing a person never applies a job.
function resetVillagers(){selectedVillagerId=null;villagerListStamp='';closeVillagers();}
function closeVillagers(){
  $('villager-panel').hidden=true;
  $('open-villagers').setAttribute('aria-expanded','false');
}
function showVillagers(id=selectedVillagerId){
  closeChrome();
  if(id===null)id=world.economy?.workers[0]?.id??null;
  selectedVillagerId=id;
  $('villager-panel').hidden=false;document.body.classList.add('inspector-open');
  $('open-villagers').setAttribute('aria-expanded','true');
  updateVillagersUI();
}
function villagerJob(w){
  const a=w.assignment;
  if(!a)return 'Waiting for nearby work';
  if(a.kind==='hall')return `Worker hall ${a.site+1}`;
  if(a.kind==='farm')return `Farm ${a.farm}`;
  const town=world.economy.towns.find(t=>t.id===a.town);
  return `Deliver · Farm ${a.farm} → ${town?.name||'town'}`;
}
function villagerPay(w){
  const e=world.economy;
  if(w.leaving)return 'Leaving after three unpaid months. No wages are owed.';
  if(w.unpaid){
    const remaining=Math.max(0,Math.ceil(w.paidUntil+(HIRING.graceMonths-w.missedMonths)*HIRING.period-e.clock));
    return `Unpaid · ${w.missedMonths} of ${HIRING.graceMonths} grace months used. Leaves in ${remaining}s unless paid. Missed wages are forgiven.`;
  }
  return `Paid · ${HIRING.wage} gold/month. Due in ${Math.max(0,Math.ceil(w.paidUntil-e.clock))}s.`;
}
function updateVillagersUI(){
  const e=world?.economy;
  if(!e||$('villager-panel').hidden)return;
  $('villager-heading').textContent=`Villagers · ${e.workers.length} hired`;
  const stamp=e.workers.map(w=>w.id).join(',');
  if(stamp!==villagerListStamp||!$('villager-list').children.length){
    const focused=document.activeElement?.dataset.villagerId;
    $('villager-list').replaceChildren(...e.workers.map(w=>{
      const button=document.createElement('button');button.type='button';button.dataset.villagerId=String(w.id);
      const name=document.createElement('strong');name.textContent=`Villager ${w.id}`;
      const job=document.createElement('span');button.append(name,job);
      button.addEventListener('click',()=>{selectedVillagerId=w.id;updateVillagersUI();});
      return button;
    }));
    villagerListStamp=stamp;
    if(focused)$('villager-list').querySelector(`[data-villager-id="${focused}"]`)?.focus({preventScroll:true});
  }
  const noSelection=selectedVillagerId===null;
  $('villager-empty').hidden=e.workers.length>0||!noSelection;
  $('villager-body').hidden=e.workers.length===0&&noSelection;
  for(const button of $('villager-list').children){
    const w=e.workers.find(w=>w.id===Number(button.dataset.villagerId));
    button.setAttribute('aria-pressed',String(w.id===selectedVillagerId));
    button.lastElementChild.textContent=w.leaving?'Leaving':villagerJob(w);
  }
  const w=e.workers.find(w=>w.id===selectedVillagerId);
  $('villager-name').textContent=selectedVillagerId===null?'Select a villager':`Villager ${selectedVillagerId}`;
  $('villager-gone').hidden=!!w||noSelection;
  $('villager-facts').hidden=!w;
  $('view-villager').disabled=!w;
  $('view-villager-home').disabled=!w;$('view-villager-home').textContent=w?.home.awaiting?'Go to village':'Go to home';
  $('villager-origin').textContent=w?`Hired in ${e.towns.find(t=>t.id===w.homeTown)?.name||'a village'}`:'';
  if(!w)return;
  $('villager-home').textContent=w.home.awaiting?'Awaiting a house':w.home.site!==undefined?`House ${w.home.site+1} · your settlement`:`House ${w.home.house+1} · ${e.towns.find(t=>t.id===w.home.town)?.name||'village'}`;
  $('villager-job').textContent=villagerJob(w);
  $('villager-activity').textContent=w.leaving?`Leaving · ${w.note}`:w.note;
  $('villager-cargo').textContent=w.cargo?`${w.cargo.kg} kg ${CROPS[w.cargo.crop].name.toLowerCase()} from Farm ${w.cargo.farm}`:'Empty';
  $('villager-pay').textContent=villagerPay(w)+` A game month is ${HIRING.period}s.`;
}
function hitVillager(clientX,clientY,pointerType){
  const bounds=canvas.getBoundingClientRect(),x=clientX-bounds.left,y=clientY-bounds.top;
  const radius=pointerType==='touch'?12:mapView()?8:Math.max(8,Math.min(8,zoom*.5)+3);
  let found=null,nearest=radius;
  // Later-drawn people win exact overlaps. The roster exposes every person there.
  for(const w of world.economy?.workers||[]){
    const sx=(w.x-camera.x)*zoom+width/2,sy=(w.y-camera.y)*zoom+height/2;
    if(sx<0||sy<0||sx>width||sy>height)continue;
    const distance=Math.hypot(sx-x,sy-y);
    if(distance<=nearest){found=w;nearest=distance;}
  }
  return found;
}
function drawVillagerSelection(w,x,y,size){
  if(x<0||y<0||x>width||y>height)return;
  ctx.save();ctx.strokeStyle='#fff1b8';ctx.lineWidth=2;
  ctx.beginPath();ctx.arc(x,y,size+5,0,Math.PI*2);ctx.stroke();
  const label=`Villager ${w.id}`;ctx.font='bold 11px Arial';
  const tw=ctx.measureText(label).width+10,lx=Math.max(3,Math.min(width-tw-3,x-tw/2)),ly=y+size+10;
  ctx.fillStyle='#20382df2';ctx.fillRect(lx,ly,tw,18);ctx.fillStyle='#fff1c0';ctx.fillText(label,lx+5,ly+13);ctx.restore();
}
$('open-villagers').addEventListener('click',()=>{$('villager-panel').hidden?showVillagers():closeChrome();});
$('close-villagers').addEventListener('click',()=>{closeChrome();$('open-villagers').focus();});
$('view-villager').addEventListener('click',()=>{const w=world.economy.workers.find(w=>w.id===selectedVillagerId);if(w)frameLocation(w,35,24);});
$('view-villager-home').addEventListener('click',()=>{const w=world.economy.workers.find(w=>w.id===selectedVillagerId);if(w)frameLocation({x:w.home.x,y:w.home.y-3},32,24);});

// Chrome changes never cancel a world tool. Only explicit Cancel/Escape without a panel does that.
function closeChrome(){for(const id of ['build-palette','game-menu','economy-panel'])$(id).hidden=true;economySelection=null;closeVillagers();$('open-build').setAttribute('aria-expanded','false');$('open-game-menu').setAttribute('aria-expanded','false');document.body.classList.remove('inspector-open');}
function togglePanel(id,button){const open=$(id).hidden;closeChrome();if(open){$(id).hidden=false;$(button).setAttribute('aria-expanded','true');document.body.classList.add('inspector-open');}updateBuildUI();}
function frameLocation(point,spanX=35,spanY=24,maxZoom=16){closeChrome();sizeToolbar();const top=Math.max(document.querySelector('.toolbar').getBoundingClientRect().bottom,$('build-panel').hidden?0:$('build-panel').getBoundingClientRect().bottom)+16,bottom=mapBottomEdge(),available=Math.max(60,bottom-top);setZoom(Math.min(maxZoom,(width-40)/spanX,available/spanY));camera={x:point.x,y:point.y-((top+bottom)/2-height/2)/zoom};changed();canvas.focus({preventScroll:true});}
$('open-build').addEventListener('click',()=>togglePanel('build-palette','open-build'));
$('close-palette').addEventListener('click',closeChrome);
$('open-game-menu').addEventListener('click',()=>togglePanel('game-menu','open-game-menu'));
$('close-game-menu').addEventListener('click',closeChrome);
$('show-work-rules').addEventListener('click',()=>{const open=$('work-rules').hidden;$('work-rules').hidden=!open;$('show-work-rules').setAttribute('aria-expanded',String(open));});
for(const b of document.querySelectorAll('[data-crop]'))b.addEventListener('click',()=>{$('crop-choice').value=b.dataset.crop;updateEconomyUI();});
for(const b of document.querySelectorAll('[data-gesture]'))b.addEventListener('click',()=>{$('farm-gesture').value=b.dataset.gesture;$('farm-gesture').dispatchEvent(new Event('change'));});
for(const [id,delta]of [['brush-less',-1],['brush-more',1]])$(id).addEventListener('click',()=>{$('farm-brush').value=String(Number($('farm-brush').value)+delta);$('farm-brush').dispatchEvent(new Event('change'));});
for(const b of document.querySelectorAll('[data-creation-tab]'))b.addEventListener('click',()=>{for(const id of ['world-settings','terrain-settings'])$(id).hidden=id!==b.dataset.creationTab;for(const other of document.querySelectorAll('[data-creation-tab]'))other.setAttribute('aria-pressed',String(other===b));});
new ResizeObserver(sizeToolbar).observe(document.querySelector('.toolbar'));
function fieldStatus(field){const current=field.assignedFarm===null?'Unassigned':`Farm ${field.assignedFarm}`;if(!Object.hasOwn(field,'requestedFarm'))return current;const destination=field.requestedFarm===null?'unassigned':`Farm ${field.requestedFarm}`;const sourceActive=world.economy.farms.find(f=>f.farm===field.assignedFarm)?.cycle;return `${current} → ${destination} · waiting for ${sourceActive?'source harvest':'target cycle boundary'}`;}
function updateFieldUI(farm){
 $('place-legacy-controller').hidden=!farm||world.construction.farms.find(f=>f.id===farm.farm)?.controller!==null;
 const field=economySelection.kind==='field'?world.construction.fields.find(f=>f.id===economySelection.id):null;
 $('farm-tabs').hidden=!farm;$('farm-fields').hidden=!farm||farmTab!=='fields';$('farm-operations').hidden=!farm||farmTab!=='production';$('farm-action-bar').hidden=!farm||farmTab!=='production';$('field-assignment-bar').hidden=!farm||farmTab!=='fields';$('field-operations').hidden=!field;$('field-action-bar').hidden=!field;
 if(field){$('economy-title').textContent=`Field ${field.id}`;$('town-action-bar').hidden=true;$('market-operations').hidden=true;const prepared=field.area-(field.work?Math.ceil(field.work.area*(1-field.work.progress)):0);$('field-status').innerHTML=`<div class="metric-main"><strong>${field.area}</strong><span>Field tiles</span></div><p class="stage-label">${prepared} prepared · ${field.work?.progress<1?'drone preparation queued or in progress':'Ready'}</p><h3>Farm assignment</h3><p>${fieldStatus(field)}</p><p class="panel-intro">Click a farm building and open Fields to assign this land. Unassigned fields do not grow crops.</p>`;$('cancel-field-request').hidden=!Object.hasOwn(field,'requestedFarm');$('edit-field').disabled=!!farmDraft&&selectedFarm!==field.id;}
 for(const b of document.querySelectorAll('[data-farm-tab]'))b.setAttribute('aria-pressed',String(b.dataset.farmTab===farmTab));
 const fieldSurface=!!field||!!farm&&farmTab==='fields';$('show-work-rules').hidden=fieldSurface;if(fieldSurface)$('work-rules').hidden=true;
 if(!farm)return;
 const draft=assignmentDrafts.get(farm.farm);if(!draft?.dirty){resetAssignmentDraft(farm.farm);fieldChoices=assignmentDrafts.get(farm.farm).choices;}
 const fields=world.construction.fields,stamp=JSON.stringify(fields.map(f=>[f.id,f.area,f.assignedFarm,f.requestedFarm,fieldChoices.has(f.id)]));
 if(stamp!==fieldListStamp){fieldListStamp=stamp;$('field-list').replaceChildren(...fields.map(f=>{const row=document.createElement('div');row.className='field-row';const choice=document.createElement('button');choice.dataset.fieldChoice=f.id;choice.setAttribute('aria-pressed',String(fieldChoices.has(f.id)));choice.innerHTML=`<strong>Field ${f.id} · ${f.area} tiles</strong><span>${fieldChoices.has(f.id)?'Selected':'Not selected'} · ${fieldStatus(f)}</span>`;choice.addEventListener('click',()=>toggleFieldChoice(f.id));const view=document.createElement('button');view.textContent='Locate';view.className='quiet';view.dataset.locateField=f.id;view.addEventListener('click',()=>locateAssignmentField(f));row.append(choice,view);return row;}));if(!fields.length)$('field-list').textContent='No fields yet. Open Build → Field to mark one.';}
 $('field-selection-status').textContent=`${fieldChoices.size} selected · ${fields.filter(f=>fieldChoices.has(f.id)).reduce((n,f)=>n+f.area,0)} tiles${assignmentDrafts.get(farm.farm)?.dirty?' · Unapplied':''}`;
}
for(const b of document.querySelectorAll('[data-farm-tab]'))b.addEventListener('click',()=>{farmTab=b.dataset.farmTab;updateEconomyUI();if(farmTab==='fields')requestAnimationFrame(frameAssignedFields);});
$('apply-fields').addEventListener('click',()=>{const r=assignFieldsToFarm(world,world.construction,economySelection.id,[...fieldChoices]);$('economy-message').textContent=r.error||'Field assignment saved. Active crops finish before linked area changes.';if(!r.error){resetAssignmentDraft(economySelection.id);fieldChoices=assignmentDrafts.get(economySelection.id).choices;changed();saveCurrent();}updateEconomyUI();});
$('cancel-fields').addEventListener('click',()=>{resetAssignmentDraft(economySelection.id);fieldChoices=assignmentDrafts.get(economySelection.id).choices;$('economy-message').textContent='Unapplied choices cancelled.';updateEconomyUI();});
$('edit-field').addEventListener('click',()=>openAllotment(economySelection.id));
$('view-field').addEventListener('click',()=>{const f=world.construction.fields.find(f=>f.id===economySelection.id),p=fieldPoint(f);if(p)frameLocation(p,40,30);});
$('cancel-field-request').addEventListener('click',()=>{const r=cancelFieldAssignment(world,world.construction,economySelection.id);$('economy-message').textContent=r.error||'Pending change cancelled. The field keeps its current farm.';if(!r.error){changed();saveCurrent();}updateEconomyUI();});
function fieldPoint(field){const entry=compileCoverage(field?.coverage||[])[0];if(!entry)return null;for(let y=0;y<32;y++){const row=entry.rows?entry.rows[y]:0xffffffff;if(row)return{x:entry.cx*32+31-Math.clz32((row&-row)>>>0)+.5,y:entry.cy*32+y+.5};}return null;}
function revealSelection(selection){if(economySelection!==selection)return;const game=world.construction;let site=selection.kind==='farm'?game.sites[game.farms.find(f=>f.id===selection.id)?.controller]:selection.kind==='hall'?game.sites[selection.id]:selection.kind==='town'?world.economy.towns.find(t=>t.id===selection.id):null;const p=site?{x:site.x+site.w/2,y:site.y+site.h/2}:selection.kind==='field'?fieldPoint(game.fields.find(f=>f.id===selection.id)):null;if(!p)return;const panel=$('economy-panel').getBoundingClientRect();let l=16,r=width-16,t=document.querySelector('.toolbar').getBoundingClientRect().bottom+16,b=mapBottomEdge();if(panel.width>width*.7)b=Math.min(b,panel.top-16);else r=panel.left-16;const sx=(p.x-camera.x)*zoom+width/2,sy=(p.y-camera.y)*zoom+height/2;if(sx<l+30||sx>r-30||sy<t+30||sy>b-30){camera.x=p.x-((l+r)/2-width/2)/zoom;camera.y=p.y-((t+b)/2-height/2)/zoom;changed();}}

$('place-legacy-controller').addEventListener('click',()=>{const id=economySelection.id;cancelTool();selectedFarm=id;controllerPlacement=true;placement={x:Math.floor(camera.x-3),y:Math.floor(camera.y-3)};updateBuildUI();});

function intendedFieldIds(id){return world.construction.fields.filter(f=>(Object.hasOwn(f,'requestedFarm')?f.requestedFarm:f.assignedFarm)===id).map(f=>f.id);}
function resetAssignmentDraft(id){assignmentDrafts.set(id,{choices:new Set(intendedFieldIds(id)),dirty:false});}
function toggleFieldChoice(id){fieldChoices.has(id)?fieldChoices.delete(id):fieldChoices.add(id);const current=new Set(intendedFieldIds(economySelection.id));assignmentDrafts.set(economySelection.id,{choices:fieldChoices,dirty:current.size!==fieldChoices.size||[...current].some(id=>!fieldChoices.has(id))});$('economy-message').textContent='';updateEconomyUI();}
function fieldShape(field){let shape=fieldGeometry.get(field.coverage);if(shape)return shape;const entries=compileCoverage(field.coverage);let x=Infinity,y=Infinity,right=-Infinity,bottom=-Infinity;for(const c of entries)for(let row=0;row<32;row++){const bits=c.rows?c.rows[row]:0xffffffff;if(!bits)continue;const first=31-Math.clz32((bits&-bits)>>>0),last=31-Math.clz32(bits);x=Math.min(x,c.cx*32+first);right=Math.max(right,c.cx*32+last+1);y=Math.min(y,c.cy*32+row);bottom=Math.max(bottom,c.cy*32+row+1);}shape={entries,x,y,w:right-x,h:bottom-y};fieldGeometry.set(field.coverage,shape);return shape;}
function freeMapRect(){let l=16,r=width-16,t=document.querySelector('.toolbar').getBoundingClientRect().bottom+16,b=mapBottomEdge();const panel=$('economy-panel');if(!panel.hidden){const p=panel.getBoundingClientRect();if(p.width>width*.7)b=Math.min(b,p.top-16);else r=p.left-16;}if(!$('build-panel').hidden)t=Math.max(t,$('build-panel').getBoundingClientRect().bottom+12);return{l,r,t,b};}
function locateAssignmentField(field){frameAssignmentBounds(fieldShape(field));}
function frameAssignmentBounds(s){if(!Number.isFinite(s.x))return;const f=freeMapRect(),availableW=Math.max(50,f.r-f.l-36),availableH=Math.max(50,f.b-f.t-48);setZoom(Math.min(16,availableW/Math.max(8,s.w),availableH/Math.max(8,s.h)));camera={x:s.x+s.w/2-((f.l+f.r)/2-width/2)/zoom,y:s.y+s.h/2-((f.t+f.b)/2-height/2)/zoom};changed();canvas.focus({preventScroll:true});}
function drawFieldAssignments(left,top){const mode=assignmentMode();for(const field of world.construction.fields||[]){const inspected=economySelection?.kind==='field'&&economySelection.id===field.id,related=economySelection?.kind==='farm'&&field.assignedFarm===economySelection.id;if(!mode&&!inspected&&!related)continue;const s=fieldShape(field);if((s.x+s.w-left)*zoom<0||(s.y+s.h-top)*zoom<0||(s.x-left)*zoom>width||(s.y-top)*zoom>height)continue;const selected=mode?fieldChoices.has(field.id):true;drawFarmCoverage(s.entries,left,top,selected?'#e8bd7033':'#9ccad626');drawFarmCoverage(s.entries,left,top,selected?'#e8bd70':'#afd8e2',Infinity,true);if(!mode)continue;const free=freeMapRect();let point=null;for(const c of s.entries){for(let y=0;y<32&&!point;y++){const bits=c.rows?c.rows[y]:0xffffffff;if(!bits)continue;const lo=c.cx*32+31-Math.clz32((bits&-bits)>>>0),hi=c.cx*32+31-Math.clz32(bits)+1,sy=(c.cy*32+y-top)*zoom;if(sy<free.t||sy>free.b-22||(hi-left)*zoom<free.l||(lo-left)*zoom>free.r)continue;point={x:Math.max(free.l,(lo-left)*zoom),y:sy};}if(point)break;}if(!point)continue;const label=`Field ${field.id} · ${selected?'Selected':'Not selected'}`;ctx.save();ctx.font='bold 12px Arial';const w=ctx.measureText(label).width+16,l=Math.min(point.x,free.r-w);ctx.fillStyle=selected?'#e8bd70':'#243b43';ctx.fillRect(l,point.y,w,24);ctx.strokeStyle=selected?'#ffe0a4':'#afd8e2';ctx.strokeRect(l,point.y,w,24);ctx.fillStyle=selected?'#242b2e':'#e4f3f6';ctx.fillText(label,l+8,point.y+16);ctx.restore();}}

function frameAssignedFields(){if(!assignmentMode())return;const game=world.construction,farm=game.farms.find(f=>f.id===economySelection.id),site=game.sites[farm.controller],shapes=game.fields.filter(f=>f.assignedFarm===farm.id).map(fieldShape);if(site)shapes.push(site);if(!shapes.length)return;const x=Math.min(...shapes.map(s=>s.x)),y=Math.min(...shapes.map(s=>s.y)),right=Math.max(...shapes.map(s=>s.x+s.w)),bottom=Math.max(...shapes.map(s=>s.y+s.h));frameAssignmentBounds({x,y,w:right-x,h:bottom-y});}

// A new/loaded world starts with neutral chrome. Continue retains this world's live tools and drafts.
function resetWorldChrome(){closeChrome();farmTab='production';fieldChoices=new Set();fieldListStamp='';farmDraftEntries=[];hallPlacement=false;housePlacement=false;brushCursor=null;$('work-rules').hidden=true;$('show-work-rules').setAttribute('aria-expanded','false');$('economy-message').textContent='';}

function mapBottomEdge(){let bottom=height-24;for(const id of ['camera-tools','construction-tools','build-palette'])if(!$(id).hidden)bottom=Math.min(bottom,$(id).getBoundingClientRect().top-14);return bottom;}
