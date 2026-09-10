import {validateFarms,coverageIntersectsRect,farmPlacementError,coverageArea,bindFarms,FARM_RATE,combineCoverage,preparedCoverage,patchCoverage,reservations,workerReservations,validateFields,refreshFarmCoverage,farmFields,validateCoverage} from './farms.mjs';
export const SHIP = Object.freeze({ w: 40, h: 12 });
export const BUILDING = Object.freeze({ w: 6, h: 6 });
export const WORKER_HALL = Object.freeze({ w: 15, h: 10, capacity: 10 });
export const jobKey = job => job.kind === 'build' ? `build:${job.site}` : job.kind === 'cut' ? `cut:${job.x},${job.y}` : `field:${job.field}`;
export const droneJob = game => game.jobs.find(j=>j.claimant==='drone');
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
  return { version: 6, soil: [], farms: [], fields: [], jobs: [], ship: null, pending: { x: -20, y: -6 }, sites: [], cursor: 0, drone: null };
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
    if (!footprint(site, site.hall?WORKER_HALL:BUILDING) || site.hall!==undefined&&(site.hall!==true||site.house!==undefined||site.farm!==undefined) || !Number.isFinite(site.progress) || site.progress < 0 || site.progress > 1 || (i < game.cursor ? site.progress !== 1 : i > game.cursor && site.progress !== 0) || overlaps(site, game.ship)) throw new Error('Invalid building state.');
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
  if(game?.version===4){game.version=5;for(const job of game.jobs)job.claimant=null;if(['outbound','building','cutting','preparing'].includes(game.drone?.stage)&&game.jobs[0])game.jobs[0].claimant='drone';}
  if(game?.version===5){
    game.fields=game.farms.filter(f=>f.area||f.work).map(f=>({id:f.id,coverage:structuredClone(f.coverage),area:f.area,assignedFarm:f.id,work:f.work}));
    for(const farm of game.farms)farm.work=null;
    for(const job of game.jobs)if(job.kind==='farm'){job.kind='field';job.field=job.farm;delete job.farm;}
    game.version=6;
  }
  if (game){validateFarms(game.farms,game.soil);validateFields(game);}
  if (!game || game.version !== 6 || !Array.isArray(game.jobs) || game.jobs.length > MAX_SITES || !Array.isArray(game.sites) || game.sites.length > MAX_SITES || !Number.isInteger(game.cursor)) throw new Error('Invalid drone queue.');
  if (!game.ship) {
    if (!grid(game.pending) || game.sites.length || game.cursor || game.jobs.length || game.farms.length || game.fields.length || game.soil.length || game.drone !== null) throw new Error('Invalid landing state.');
    return game;
  }
  if (!footprint(game.ship, SHIP) || game.pending !== null || !point(game.drone) || !['idle','outbound','building','cutting','preparing','returning'].includes(game.drone.stage)) throw new Error('Invalid ship or drone state.');
  let completed = 0;
  for (let i = 0; i < game.sites.length; i++) {
    const site = game.sites[i];
    if ((site.house!==undefined&&(site.house!==true||site.farm!==undefined)) || (site.farm!==undefined&&(!Number.isInteger(site.farm)||!game.farms.some(f=>f.id===site.farm&&f.controller===i))) || !footprint(site, site.hall?WORKER_HALL:BUILDING) || site.hall!==undefined&&(site.hall!==true||site.house!==undefined||site.farm!==undefined) || !Number.isFinite(site.progress) || site.progress < 0 || site.progress > 1 || overlaps(site, game.ship)) throw new Error('Invalid building state.');
    if (site.progress === 1) completed++;
    for (let j = 0; j < i; j++) if (overlaps(site, game.sites[j])) throw new Error('Saved buildings overlap.');
  }
  if (game.cursor !== completed) throw new Error('Invalid completed-building count.');
  const builds = new Set(), cuts = new Set(), farms = new Set();
  const claimants=new Set();
  for (let i = 0; i < game.jobs.length; i++) {
    const job = game.jobs[i];job.claimant??=null;
    if(job.claimant!==null){if(typeof job.claimant!=='string'||!(/^(drone|worker:[1-9][0-9]*)$/).test(job.claimant)||claimants.has(job.claimant)||job.kind==='field'&&job.claimant!=='drone')throw Error('Invalid job claimant.');claimants.add(job.claimant);}
    if (job.kind === 'build') {
      if (!Number.isInteger(job.site) || !game.sites[job.site] || builds.has(job.site) || game.sites[job.site].progress === 1) throw new Error('Invalid build job.');
      builds.add(job.site);
    } else if (job.kind === 'cut') {
      const key = `${job.x},${job.y}`;
      if (!grid(job) || !Number.isFinite(job.progress) || job.progress < 0 || job.progress >= 1 || cuts.has(key)) throw new Error('Invalid cutting job.');
      cuts.add(key);
    } else if (job.kind === 'field') {
      const field=game.fields.find(f=>f.id===job.field);
      if(!field?.work||field.work.progress===1||farms.has(job.field))throw Error('Invalid field job.');farms.add(job.field);
    } else throw new Error('Unknown drone job.');
  }
  if (builds.size !== game.sites.length - completed) throw new Error('Missing building job.');
  for(const farm of game.farms)if(farm.controller!==null&&game.sites[farm.controller]?.farm!==farm.id)throw Error('Invalid farm building.');
  for(const field of game.fields)if(field.work&&field.work.progress<1&&!farms.has(field.id)||coverageIntersectsRect(field.coverage,game.ship)||game.sites.some(s=>coverageIntersectsRect(field.coverage,s)))throw Error('Invalid field footprint or missing job.');
  const first = droneJob(game), stage = game.drone.stage;
  if (['outbound','building','cutting','preparing'].includes(stage) && !first || ['idle','returning'].includes(stage)&&first || stage === 'building' && first?.kind !== 'build' || stage === 'cutting' && first?.kind !== 'cut' || stage === 'preparing' && first?.kind !== 'field') throw new Error('Drone target is missing or mismatched.');
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
  return !(workerReservations.get(game)||[]).some(w=>overlaps({x:w.x-1,y:w.y-1,w:2,h:2},rect)) && (!game.ship || !overlaps(game.ship, rect)) && ![...game.sites,...(reservations.get(game)||[])].some(site => overlaps(site, rect)) && !(game.fields||game.farms||[]).some(f=>coverageIntersectsRect(f.coverage,rect));
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
  if (game.ship || !grid(game.pending) || !canPlace(game,{...game.pending,...SHIP}) || !hasEditRoom(world,game,{...game.pending,...SHIP})) return false;
  game.ship = { ...game.pending, ...SHIP }; game.pending = null;
  clearFootprint(world, game.ship);
  game.drone = { x: game.ship.x + SHIP.w / 2, y: game.ship.y + SHIP.h / 2, stage: 'idle' };
  return true;
}
export function placeBuilding(world, game, position, house = false) {
  const hall=house==='hall';
  const rect = { ...position, ...(hall?WORKER_HALL:BUILDING) };
  if (!game.ship || game.sites.length >= MAX_SITES || game.jobs.length >= MAX_JOBS || !canPlace(game, rect) || !hasEditRoom(world,game,rect)) return false;
  clearFootprint(world, rect); game.sites.push({ ...rect, progress: 0, ...(hall?{hall:true}:house?{house:true}:{}) }); game.jobs.push({kind:'build',site:game.sites.length-1}); return true;
}
export function controllerCanPlace(game,rect,farmId=null){
 return grid(rect)&&!(workerReservations.get(game)||[]).some(w=>overlaps({x:w.x-1,y:w.y-1,w:2,h:2},rect))&&(!game.ship||!overlaps(game.ship,rect))&&![...game.sites,...(reservations.get(game)||[])].some(s=>overlaps(s,rect))&&!(game.fields||game.farms).some(f=>(farmId===null||(game.fields?f.assignedFarm!==farmId:f.id!==farmId))&&coverageIntersectsRect(f.coverage,rect));
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
 game.jobs.push({kind:'build',site:farm.controller});
 bindFarms(world,game);return{farm};
}
export const placeFarmBuilding=placeController;
// Compatibility for callers editing a single legacy allotment. New UI edits fields.
export function applyAllotment(world,game,id,coverage){
 const farm=game.farms.find(f=>f.id===id);if(!farm)return{error:'Farm is missing.'};
 const fields=farmFields(game,id);if(!fields.length&&!coverageArea(coverage))return{farm};if(fields.length>1)return{error:'Edit each field separately.'};
 const result=fields.length?editField(world,game,fields[0].id,coverage):createField(world,game,coverage);
 if(result.error)return result;if(!fields.length)requestFieldAssignment(world,game,result.field.id,id);return{farm,field:result.field};
}
export function createField(world,game,coverage){
 try{validateCoverage(coverage);}catch(error){return{error:error.message};}
 if(!coverageArea(coverage))return{error:'Choose some land for the field.'};
 const error=farmPlacementError(game,coverage);if(error)return{error};
 const field={id:Math.max(0,...game.fields.map(f=>f.id))+1,coverage:[],area:0,assignedFarm:null,work:null};
 const result=replaceFieldCoverage(world,game,field,coverage);if(result.error)return result;
 game.fields.push(field);bindFarms(world,game);return{field};
}
export function editField(world,game,id,coverage){
 const field=game.fields.find(f=>f.id===id);if(!field)return{error:'Field is missing.'};
 try{validateCoverage(coverage);}catch(error){return{error:error.message};}
 const error=farmPlacementError(game,coverage,id);if(error)return{error};
 if(!combineCoverage(coverage,field.coverage,true).length&&!combineCoverage(field.coverage,coverage,true).length)return{field};
 if(world.economy?.farms.find(f=>f.farm===field.assignedFarm)?.cycle)return{error:'Finish the current crop cycle before editing this field.'};
 return replaceFieldCoverage(world,game,field,coverage);
}
function replaceFieldCoverage(world,game,field,coverage){
 const soil=combineCoverage(game.soil,preparedCoverage(field.work)),remaining=combineCoverage(coverage,soil,true);
 const at=game.jobs.findIndex(j=>j.kind==='field'&&j.field===field.id);
 if(remaining.length&&game.jobs.length-(at>=0?1:0)>=MAX_JOBS)return{error:'Drone queue is full.'};
 if(at>=0&&game.jobs[at].claimant==='drone')game.drone.stage='returning';
 if(at>=0)game.jobs.splice(at,1);
 game.soil=soil;field.coverage=structuredClone(coverage);field.area=coverageArea(coverage);
 field.work=remaining.length?{coverage:remaining,area:coverageArea(remaining),progress:0}:null;
 if(field.work)game.jobs.push({kind:'field',field:field.id});
 refreshFarmCoverage(game);bindFarms(world,game);return{field};
}
// One active job per update. Terrain is queried only at cut arrival/completion;
// simulation and authoritative edits never depend on camera/render caches.
export function advanceConstruction(game, seconds, world) {
  if (!game?.ship || !Number.isFinite(seconds) || seconds <= 0) return false;
  const d = game.drone; let changed = false;
  const farmIndex=world && (world.farmCoverage || bindFarms(world,game));
  while (seconds > 1e-8) {
    if (d.stage === 'idle') {
      const next=game.jobs.find(j=>!j.claimant);if(!next)break;next.claimant='drone';
      d.stage = 'outbound'; changed = true;
    }
    const job = droneJob(game), site = job?.kind === 'build' ? game.sites[job.site] : job?.kind === 'field' ? farmIndex.fields.get(job.field).farm : job;
    if (d.stage === 'building' || d.stage === 'cutting' || d.stage === 'preparing') {
      const duration = job.kind === 'cut' ? CUT_SECONDS : job.kind === 'field' ? Math.max(3,site.area/FARM_RATE) : BUILD_SECONDS;
      const before=job.kind==='field'?Math.floor(site.area*site.progress+1e-7):0;
      const end=job.kind==='field'?farmIndex.sectionEnd(job.field,before)/site.area:1;
      const needed = (end - site.progress) * duration, used = Math.min(seconds, needed);
      site.progress = Math.min(end, site.progress + used / duration); seconds -= used; changed = true;
      if(job.kind==='field')farmIndex.changed(world,job.field,before,Math.floor(site.area*site.progress+1e-7));
      if (used >= needed) {
        site.progress = end;
        if(job.kind==='field'&&end<1){d.stage='outbound';continue;}
        if (job.kind === 'cut') { const value = world.tile(job.x,job.y); if (value & 8) world.state.setTile(job.x,job.y,value & ~8); }
        else if(job.kind==='build') game.cursor++;
        game.jobs.splice(game.jobs.indexOf(job),1); d.stage = 'returning';
      } else break;
    } else {
      const target = d.stage === 'returning' ? game.ship : job.kind==='field' ? farmIndex.target(job.field,Math.floor(site.area*site.progress+1e-7)) : site;
      const isFarm=d.stage!=='returning'&&job.kind==='field';
      const tx = target.x + (isFarm?0:(target.w || 1)/2), ty = target.y + (isFarm?0:(target.h || 1)/2);
      const distance = Math.hypot(tx - d.x, ty - d.y), needed = distance / DRONE_SPEED;
      if (seconds >= needed) {
        d.x = tx; d.y = ty; seconds -= needed; changed = true;
        if (d.stage === 'returning') d.stage = 'idle';
        else if (job.kind === 'cut' && !world.isTree(job.x,job.y)) { game.jobs.splice(game.jobs.indexOf(job),1); d.stage = 'returning'; }
        else d.stage = job.kind === 'cut' ? 'cutting' : job.kind==='field' ? 'preparing' : 'building';
      } else {
        const t = seconds / needed; d.x += (tx - d.x) * t; d.y += (ty - d.y) * t; changed = true; break;
      }
    }
  }
  return changed;
}

// Requests are saved on each field. A crop snapshot never changes land midway
// through its cycle, and harvest/cargo continue to belong to their source farm.
export function fieldAssignmentState(world,field){
 const pending=Object.hasOwn(field,'requestedFarm'),current=field.assignedFarm,requested=pending?field.requestedFarm:current;
 const active=id=>id!==null&&!!world.economy?.farms.find(f=>f.farm===id)?.cycle;
 return{current,requested,pending,waitingFor:!pending?null:active(current)?'source-harvest':active(requested)?'target-harvest':null};
}
export function processFieldAssignments(world){
 const game=world.construction;if(!game?.fields)return false;let changed=false;
 const active=id=>id!==null&&!!world.economy?.farms.find(f=>f.farm===id)?.cycle;
 for(const field of game.fields){
  if(!Object.hasOwn(field,'requestedFarm'))continue;
  if(field.requestedFarm===field.assignedFarm){delete field.requestedFarm;changed=true;continue;}
  if(active(field.assignedFarm))continue;
  if(field.assignedFarm!==null){field.assignedFarm=null;changed=true;}
  if(active(field.requestedFarm))continue;
  field.assignedFarm=field.requestedFarm;delete field.requestedFarm;changed=true;
 }
 if(changed)refreshFarmCoverage(game);return changed;
}
export function requestFieldAssignment(world,game,id,farmId){
 const field=game.fields.find(f=>f.id===id);if(!field)return{error:'Field is missing.'};
 if(farmId!==null&&!game.farms.some(f=>f.id===farmId))return{error:'Farm building is missing.'};
 field.requestedFarm=farmId;processFieldAssignments(world);return{field,...fieldAssignmentState(world,field)};
}
export function cancelFieldAssignment(world,game,id){
 const field=game.fields.find(f=>f.id===id);if(!field)return{error:'Field is missing.'};delete field.requestedFarm;return{field};
}
export function assignFieldsToFarm(world,game,farmId,ids){
 const farm=game.farms.find(f=>f.id===farmId);if(!farm)return{error:'Farm building is missing.'};
 if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.some(id=>!game.fields.some(f=>f.id===id)))return{error:'Choose existing fields.'};
 const selected=new Set(ids);
 for(const field of game.fields){const intended=Object.hasOwn(field,'requestedFarm')?field.requestedFarm:field.assignedFarm;
  if(selected.has(field.id))field.requestedFarm=farmId;
  else if(intended===farmId)field.requestedFarm=null;
 }
 processFieldAssignments(world);return{farm,pending:game.fields.some(f=>Object.hasOwn(f,'requestedFarm')&&(f.assignedFarm===farmId||f.requestedFarm===farmId))};
}
