import {validateFarms,coverageIntersectsRect,farmPlacementError,coverageArea,bindFarms,FARM_RATE,combineCoverage,preparedCoverage,patchCoverage} from './farms.mjs';
export const SHIP = Object.freeze({ w: 40, h: 12 });
export const BUILDING = Object.freeze({ w: 6, h: 6 });
export const BUILD_SECONDS = 6;
export const DRONE_SPEED = 24;
export const CUT_SECONDS = 2;
export const MAX_JOBS = 256, MAX_SELECTION_TILES = 4096, MAX_CUT_ORDER = 128;
export const MAX_SITES = 1000;
export const overlaps = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const point = p => p && Number.isFinite(p.x) && Number.isFinite(p.y) && Math.abs(p.x) <= 1e9 && Math.abs(p.y) <= 1e9;
const grid = p => point(p) && Number.isInteger(p.x) && Number.isInteger(p.y);
const footprint = (p, size) => grid(p) && p.w === size.w && p.h === size.h;
export function newConstruction() {
  return { version: 4, soil: [], farms: [], jobs: [], ship: null, pending: { x: -20, y: -6 }, sites: [], cursor: 0, drone: null };
}
function validateLegacy(game) {
  if (!game || !Array.isArray(game.sites) || game.sites.length > MAX_SITES || !Number.isInteger(game.cursor) || game.cursor < 0 || game.cursor > game.sites.length) throw new Error('Invalid construction state.');
  if (!game.ship) {
    if (!grid(game.pending) || game.sites.length || game.cursor || game.drone !== null) throw new Error('Invalid landing state.');
    return game;
  }
  if (!footprint(game.ship, SHIP) || game.pending !== null || !point(game.drone) || !['idle','outbound','building','returning'].includes(game.drone.stage)) throw new Error('Invalid ship or drone state.');
  for (let i = 0; i < game.sites.length; i++) {
    const site = game.sites[i];
    if (!footprint(site, BUILDING) || !Number.isFinite(site.progress) || site.progress < 0 || site.progress > 1 || (i < game.cursor ? site.progress !== 1 : i > game.cursor && site.progress !== 0) || overlaps(site, game.ship)) throw new Error('Invalid building state.');
    for (let j = 0; j < i; j++) if (overlaps(site, game.sites[j])) throw new Error('Saved buildings overlap.');
  }
  if (['outbound','building'].includes(game.drone.stage) && game.cursor >= game.sites.length) throw new Error('Drone target is missing.');
  return game;
}
// Versionless construction saves used the site cursor as their build-only queue.
export function validateConstruction(input) {
  let game = input;
  if (game && game.version === undefined) {
    validateLegacy(game);
    game = { ...game, version: 2, jobs: game.sites.slice(game.cursor).map((_, i) => ({ kind: 'build', site: game.cursor + i })) };
  }
  if (game?.version === 2) game = {...game,version:3,farms:[]};
  if (game?.version === 3) game={...game,version:4,soil:[],farms:game.farms.map(f=>({id:f.id,controller:null,coverage:f.coverage,area:f.area,work:{coverage:structuredClone(f.coverage),area:f.area,progress:f.progress}}))};
  if (game) validateFarms(game.farms,game.soil);
  if (!game || game.version !== 4 || !Array.isArray(game.jobs) || game.jobs.length > MAX_SITES || !Array.isArray(game.sites) || game.sites.length > MAX_SITES || !Number.isInteger(game.cursor)) throw new Error('Invalid drone queue.');
  if (!game.ship) {
    if (!grid(game.pending) || game.sites.length || game.cursor || game.jobs.length || game.farms.length || game.soil.length || game.drone !== null) throw new Error('Invalid landing state.');
    return game;
  }
  if (!footprint(game.ship, SHIP) || game.pending !== null || !point(game.drone) || !['idle','outbound','building','cutting','preparing','returning'].includes(game.drone.stage)) throw new Error('Invalid ship or drone state.');
  let completed = 0;
  for (let i = 0; i < game.sites.length; i++) {
    const site = game.sites[i];
    if ((site.farm!==undefined&&(!Number.isInteger(site.farm)||!game.farms.some(f=>f.id===site.farm&&f.controller===i))) || !footprint(site, BUILDING) || !Number.isFinite(site.progress) || site.progress < 0 || site.progress > 1 || overlaps(site, game.ship)) throw new Error('Invalid building state.');
    if (site.progress === 1) completed++;
    for (let j = 0; j < i; j++) if (overlaps(site, game.sites[j])) throw new Error('Saved buildings overlap.');
  }
  if (game.cursor !== completed) throw new Error('Invalid completed-building count.');
  const builds = new Set(), cuts = new Set(), farms = new Set();
  for (let i = 0; i < game.jobs.length; i++) {
    const job = game.jobs[i];
    if (job.kind === 'build') {
      if (!Number.isInteger(job.site) || !game.sites[job.site] || builds.has(job.site) || game.sites[job.site].progress === 1 || (i > 0 && game.sites[job.site].progress !== 0)) throw new Error('Invalid build job.');
      builds.add(job.site);
    } else if (job.kind === 'cut') {
      const key = `${job.x},${job.y}`;
      if (!grid(job) || !Number.isFinite(job.progress) || job.progress < 0 || job.progress >= 1 || (i > 0 && job.progress !== 0) || cuts.has(key)) throw new Error('Invalid cutting job.');
      cuts.add(key);
    } else if (job.kind === 'farm') {
      const farm=game.farms.find(f=>f.id===job.farm);
      if(!farm?.work||farm.work.progress===1||farms.has(job.farm)||(i>0&&farm.work.progress!==0))throw Error('Invalid farm job.');farms.add(job.farm);
    } else throw new Error('Unknown drone job.');
  }
  if (builds.size !== game.sites.length - completed) throw new Error('Missing building job.');
  for(const farm of game.farms){if(farm.work&&farm.work.progress<1&&!farms.has(farm.id)||farm.controller!==null&&game.sites[farm.controller]?.farm!==farm.id||coverageIntersectsRect(farm.coverage,game.ship)||game.sites.some(s=>coverageIntersectsRect(farm.coverage,s)))throw Error('Invalid farm footprint or missing job.');}
  const first = game.jobs[0], stage = game.drone.stage;
  if (['outbound','building','cutting','preparing'].includes(stage) && !first || stage === 'building' && first?.kind !== 'build' || stage === 'cutting' && first?.kind !== 'cut' || stage === 'preparing' && first?.kind !== 'farm') throw new Error('Drone target is missing or mismatched.');
  if (first) {
    const progress = first.kind === 'build' ? game.sites[first.site].progress : first.kind === 'farm' ? game.farms.find(f=>f.id===first.farm).work.progress : first.progress;
    if (!['building','cutting','preparing'].includes(stage) && !(first.kind==='farm'&&stage==='outbound') && progress !== 0) throw new Error('Invalid work phase.');
  }
  return game;
}
export function selectTrees(world, game, a, b) {
  const rect = { x: Math.min(a.x,b.x), y: Math.min(a.y,b.y), w: Math.abs(a.x-b.x)+1, h: Math.abs(a.y-b.y)+1 };
  if (!grid(a) || !grid(b) || rect.w * rect.h > MAX_SELECTION_TILES) return { rect, trees: [], error: `Select at most ${MAX_SELECTION_TILES.toLocaleString()} tiles at once.` };
  const queued = new Set(game.jobs.filter(j => j.kind === 'cut').map(j => `${j.x},${j.y}`)), trees = [];
  for (let y = rect.y; y < rect.y + rect.h; y++) for (let x = rect.x; x < rect.x + rect.w; x++) {
    if (!queued.has(`${x},${y}`) && world.isTree(x,y)) {
      trees.push({x,y});
      if (trees.length > MAX_CUT_ORDER) return { rect, trees: [], error: `Select at most ${MAX_CUT_ORDER} trees per order.` };
    }
  }
  return { rect, trees, error: trees.length ? '' : 'No unqueued trees in this selection.' };
}
export function orderCuts(world, game, trees) {
  if (!game.ship || !Array.isArray(trees) || !trees.length || trees.length > MAX_CUT_ORDER) return { error: 'Choose trees first.' };
  const seen = new Set(game.jobs.filter(j => j.kind === 'cut').map(j => `${j.x},${j.y}`)), jobs = [];
  for (const tree of trees) {
    const key = `${tree.x},${tree.y}`;
    if (grid(tree) && !seen.has(key) && canPlace(game, {...tree,w:1,h:1}) && world.isTree(tree.x,tree.y)) { jobs.push({kind:'cut',x:tree.x,y:tree.y,progress:0}); seen.add(key); }
  }
  if (!jobs.length) return { error: 'These trees are already queued or cleared.' };
  if (game.jobs.length + jobs.length > MAX_JOBS) return { error: `Queue limit: ${MAX_JOBS.toLocaleString()} jobs. Wait for the drone to finish some work.` };
  if (!hasEditRoom(world,game,null,jobs)) return { error: 'This world has reached its tree-clearing limit.' };
  game.jobs.push(...jobs); return { count: jobs.length };
}
export function canPlace(game, rect) {
  if (!grid(rect)) return false;
  return (!game.ship || !overlaps(game.ship, rect)) && !game.sites.some(site => overlaps(site, rect)) && !(game.farms||[]).some(f=>coverageIntersectsRect(f.coverage,rect));
}
// Reserve pending cut edits too, so later footprints cannot exhaust save capacity.
export function hasEditRoom(world, game, rect = null, additional = []) {
  let edits = 0; for (const values of world.state.edits.values()) edits += values.size;
  const reserved = new Set();
  const reserve = (x,y) => {
    const cx = Math.floor(x/32), cy = Math.floor(y/32), index = (y-cy*32)*32+x-cx*32;
    if (!world.state.chunkEdits(cx,cy)?.has(index)) reserved.add(`${x},${y}`);
  };
  for (const job of game.jobs) if (job.kind === 'cut') reserve(job.x,job.y);
  for (const job of additional) reserve(job.x,job.y);
  if (rect) for (let y=rect.y;y<rect.y+rect.h;y++) for (let x=rect.x;x<rect.x+rect.w;x++) if (world.isTree(x,y)) reserve(x,y);
  return edits + reserved.size <= 200000;
}
export function clearFootprint(world, rect) {
  for (let y = rect.y; y < rect.y + rect.h; y++) for (let x = rect.x; x < rect.x + rect.w; x++) {
    const value = world.tile(x, y);
    if (value & 8) world.state.setTile(x, y, value & ~8);
  }
}
export function land(world, game) {
  if (game.ship || !grid(game.pending) || !hasEditRoom(world,game,{...game.pending,...SHIP})) return false;
  game.ship = { ...game.pending, ...SHIP }; game.pending = null;
  clearFootprint(world, game.ship);
  game.drone = { x: game.ship.x + SHIP.w / 2, y: game.ship.y + SHIP.h / 2, stage: 'idle' };
  return true;
}
export function placeBuilding(world, game, position) {
  const rect = { ...position, ...BUILDING };
  if (!game.ship || game.sites.length >= MAX_SITES || game.jobs.length >= MAX_JOBS || !canPlace(game, rect) || !hasEditRoom(world,game,rect)) return false;
  clearFootprint(world, rect); game.sites.push({ ...rect, progress: 0 }); game.jobs.push({kind:'build',site:game.sites.length-1}); return true;
}
export function controllerCanPlace(game,rect,farmId=null){
 return grid(rect)&&(!game.ship||!overlaps(game.ship,rect))&&!game.sites.some(s=>overlaps(s,rect))&&!game.farms.some(f=>f.id!==farmId&&coverageIntersectsRect(f.coverage,rect));
}
export function placeController(world,game,position,farmId=null){
 const rect={...position,...BUILDING};let farm=game.farms.find(f=>f.id===farmId);
 if(!game.ship||game.jobs.length>=MAX_JOBS||game.sites.length>=MAX_SITES||(!farm&&game.farms.length>=64)||(farm&&farm.controller!==null)||!controllerCanPlace(game,rect,farmId)||!hasEditRoom(world,game,rect))return{error:'Choose a free 6 × 6 site. The farm building or drone queue limit may have been reached.'};
 if(!farm){farm={id:Math.max(0,...game.farms.map(f=>f.id))+1,controller:null,coverage:[],area:0,work:null};game.farms.push(farm);}
 // Moving old prepared coverage into permanent soil preserves the legacy field
 // when the controller occupies part of its previous allotment.
 if(farm.coverage.length||farm.work){
  const coverage=patchCoverage(farm.coverage,rect,true).coverage;
  const result=applyAllotment(world,game,farm.id,coverage);if(result.error)return result;
 }
 clearFootprint(world,rect);farm.controller=game.sites.length;game.sites.push({...rect,progress:0,farm:farm.id});
 // A controller must be built before any replacement preparation for its field.
 const job=game.jobs.findIndex(j=>j.kind==='farm'&&j.farm===farm.id),build={kind:'build',site:farm.controller};
 if(job>=0)game.jobs.splice(job,0,build);else game.jobs.push(build);
 bindFarms(world,game);return{farm};
}
export function applyAllotment(world,game,id,coverage){
 const farm=game.farms.find(f=>f.id===id);if(!farm)return{error:'Farm is missing.'};
 const error=farmPlacementError(game,coverage,id);if(error)return{error};
 const soil=combineCoverage(game.soil,preparedCoverage(farm.work)),remaining=combineCoverage(coverage,soil,true);
 const at=game.jobs.findIndex(j=>j.kind==='farm'&&j.farm===id);
 if(remaining.length&&game.jobs.length-(at>=0?1:0)>=MAX_JOBS)return{error:'Drone queue is full.'};
 if(at===0&&['outbound','preparing'].includes(game.drone.stage))game.drone.stage='returning';
 if(at>=0)game.jobs.splice(at,1);
 game.soil=soil;farm.coverage=structuredClone(coverage);farm.area=coverageArea(coverage);
 farm.work=remaining.length?{coverage:remaining,area:coverageArea(remaining),progress:0}:null;
 if(farm.work)game.jobs.push({kind:'farm',farm:id});
 bindFarms(world,game);return{farm};
}
// One active job per update. Terrain is queried only at cut arrival/completion;
// simulation and authoritative edits never depend on camera/render caches.
export function advanceConstruction(game, seconds, world) {
  if (!game?.ship || !Number.isFinite(seconds) || seconds <= 0) return false;
  const d = game.drone; let changed = false;
  const farmIndex=world && (world.farmCoverage || bindFarms(world,game));
  while (seconds > 1e-8) {
    if (d.stage === 'idle') {
      if (!game.jobs.length) break;
      d.stage = 'outbound'; changed = true;
    }
    const job = game.jobs[0], site = job?.kind === 'build' ? game.sites[job.site] : job?.kind === 'farm' ? farmIndex.fields.get(job.farm).farm : job;
    if (d.stage === 'building' || d.stage === 'cutting' || d.stage === 'preparing') {
      const duration = job.kind === 'cut' ? CUT_SECONDS : job.kind === 'farm' ? Math.max(3,site.area/FARM_RATE) : BUILD_SECONDS;
      const before=job.kind==='farm'?Math.floor(site.area*site.progress+1e-7):0;
      const end=job.kind==='farm'?farmIndex.sectionEnd(job.farm,before)/site.area:1;
      const needed = (end - site.progress) * duration, used = Math.min(seconds, needed);
      site.progress = Math.min(end, site.progress + used / duration); seconds -= used; changed = true;
      if(job.kind==='farm')farmIndex.changed(world,job.farm,before,Math.floor(site.area*site.progress+1e-7));
      if (used >= needed) {
        site.progress = end;
        if(job.kind==='farm'&&end<1){d.stage='outbound';continue;}
        if (job.kind === 'cut') { const value = world.tile(job.x,job.y); if (value & 8) world.state.setTile(job.x,job.y,value & ~8); }
        else if(job.kind==='build') game.cursor++;
        game.jobs.shift(); d.stage = 'returning';
      } else break;
    } else {
      const target = d.stage === 'returning' ? game.ship : job.kind==='farm' ? farmIndex.target(job.farm,Math.floor(site.area*site.progress+1e-7)) : site;
      const isFarm=d.stage!=='returning'&&job.kind==='farm';
      const tx = target.x + (isFarm?0:(target.w || 1)/2), ty = target.y + (isFarm?0:(target.h || 1)/2);
      const distance = Math.hypot(tx - d.x, ty - d.y), needed = distance / DRONE_SPEED;
      if (seconds >= needed) {
        d.x = tx; d.y = ty; seconds -= needed; changed = true;
        if (d.stage === 'returning') d.stage = 'idle';
        else if (job.kind === 'cut' && !world.isTree(job.x,job.y)) { game.jobs.shift(); d.stage = 'returning'; }
        else d.stage = job.kind === 'cut' ? 'cutting' : job.kind==='farm' ? 'preparing' : 'building';
      } else {
        const t = seconds / needed; d.x += (tx - d.x) * t; d.y += (ty - d.y) * t; changed = true; break;
      }
    }
  }
  return changed;
}
