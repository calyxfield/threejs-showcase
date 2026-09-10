import {WORKER_HALL,BUILD_SECONDS,CUT_SECONDS,jobKey} from './construction.mjs';
import {combineCoverage,coverageArea,coverageContains,coverageIntersectsRect,preparedCoverage,compileCoverage,validateCoverage,reservations,workerReservations} from './farms.mjs';
// Prototype balance, deliberately separate from production recipes and hiring policy.
export const BALANCE={startingGold:80,maxWorkers:32,storageKg:256,carryKg:24,walkSpeed:10,woodlandFactor:.65,sowRate:16,harvestRate:24,maxRouteDistance:2048,maxRouteNodes:12000};
export const VILLAGES={layout:2,width:48,height:36,houses:20,firstRadius:448,ringStep:128,rings:12,minSeparation:512};
export const CROPS={wheat:{name:'Wheat',growSeconds:16,kgPerTile:.25,price:2},corn:{name:'Corn',growSeconds:24,kgPerTile:.5,price:3}};
export const FARM_TILES_PER_WORKER=200;
export const staffingTarget=farm=>Math.ceil(farm.area/FARM_TILES_PER_WORKER);
export const HIRING={kind:'wages',wage:2,period:60,unpaid:'grace-then-leave',graceMonths:3};
const integer=n=>Number.isSafeInteger(n)&&n>=0;
const point=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&Math.abs(p.x)<=1e9&&Math.abs(p.y)<=1e9;
const inside=(p,r,pad=0)=>p.x>r.x-pad&&p.y>r.y-pad&&p.x<r.x+r.w+pad&&p.y<r.y+r.h+pad;
const overlap=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export const door=r=>({x:r.x+r.w/2,y:r.y+r.h+2});
export function newEconomy(){return{version:3,settled:false,clock:0,gold:BALANCE.startingGold,towns:[],workers:[],farms:[],sold:{wheat:0,corn:0},nextWorker:1,lastDeparture:''};}
export function farmEconomy(world,id){let f=world.economy.farms.find(f=>f.farm===id);if(!f){f={farm:id,crop:null,stock:{wheat:0,corn:0},cycle:null,cycles:0};world.economy.farms.push(f);}return f;}
export function validateEconomy(e,game,seed=0){
 if(e?.version===1){e.version=2;for(const w of e.workers||[]){w.workplace=w.assignment?.farm??null;w.reconsider=!w.assignment;}assignHomes(e,seed);}
 if(e?.version===2){e.version=3;for(const w of e.workers){w.hallReported=false;}}
 if(!e||e.version!==3||typeof e.settled!=='boolean'||!Number.isFinite(e.clock)||e.clock<0||!integer(e.gold)||!Array.isArray(e.towns)||e.towns.length>2||!Array.isArray(e.workers)||e.workers.length>BALANCE.maxWorkers||!Array.isArray(e.farms)||e.farms.length>64||!integer(e.nextWorker)||!e.sold||!Object.keys(CROPS).every(k=>integer(e.sold[k])))throw Error('Invalid farming/trade state.');
 e.lastDeparture??='';if(typeof e.lastDeparture!=='string'||e.lastDeparture.length>160)throw Error('Invalid departure notice.');
 const towns=new Set(),ids=new Set(),farms=new Set();
 for(const t of e.towns){if(!integer(t.id)||towns.has(t.id)||!point(t)||!Number.isInteger(t.x)||!Number.isInteger(t.y)||!(((t.layout??1)===1&&t.w===18&&t.h===14)||(t.layout===VILLAGES.layout&&t.w===VILLAGES.width&&t.h===VILLAGES.height))||typeof t.name!=='string'||t.name.length>40)throw Error('Invalid town.');if(game?.ship&&overlap(t,game.ship)||game?.sites.some(s=>overlap(t,s))||e.towns.some(other=>other!==t&&overlap(t,other))||game&&coverageIntersectsRect(game.soil,t)||game?.farms.some(f=>coverageIntersectsRect(f.coverage,t)))throw Error('Town overlaps occupied land.');towns.add(t.id);}
 for(const f of e.farms){if(!integer(f.farm)||farms.has(f.farm)||!game?.farms.some(x=>x.id===f.farm)||!(f.crop===null||CROPS[f.crop])||!Object.keys(CROPS).every(k=>integer(f.stock?.[k])&&f.stock[k]<=BALANCE.storageKg)||!integer(f.cycles))throw Error('Invalid crop storage.');farms.add(f.farm);
  if(f.cycle){const c=f.cycle;validateCoverage(c.coverage);if(!CROPS[c.crop]||!['sowing','growing','harvesting'].includes(c.phase)||c.area!==coverageArea(c.coverage)||!c.area||!Number.isFinite(c.work)||c.work<0||c.work>c.area||!Number.isFinite(c.grown)||c.grown<0||c.grown>CROPS[c.crop].growSeconds||!integer(c.paid)||c.paid>Math.floor(c.area*CROPS[c.crop].kgPerTile))throw Error('Invalid crop cycle.');}
 }
 for(const w of e.workers){const ht=e.towns.find(t=>t.id===w.home?.town),h=w.home;
  if(h?.site!==undefined){const site=game?.sites[h.site];if(!integer(h.site)||!site?.house||site.progress!==1||h.x!==door(site).x||h.y!==door(site).y||e.workers.some(other=>other!==w&&other.home?.site===h.site))throw Error('Invalid occupied house.');}
  else if(h?.awaiting){if(!ht||h.x!==door(ht).x||h.y!==door(ht).y)throw Error('Invalid pending home.');}
  else if(!ht||!integer(h.house)||h.house>=((ht.layout??1)===1?6:VILLAGES.houses)||!point(h)||!Number.isFinite(h.laneX)||h.x<ht.x||h.x>ht.x+ht.w||h.y<ht.y||h.y>ht.y+ht.h||h.laneX<ht.x||h.laneX>ht.x+ht.w||e.workers.some(other=>other!==w&&other.home?.town===h.town&&other.home.house===h.house))throw Error('Invalid villager home.');
  if(!(w.workplace===null||typeof w.workplace==='string'&&/^hall:[0-9]+$/.test(w.workplace)&&game?.sites[Number(w.workplace.slice(5))]?.hall||game?.farms.some(f=>f.id===w.workplace&&f.controller!==null))||typeof w.reconsider!=='boolean')throw Error('Invalid automatic workplace.');w.missedMonths??=0;w.leaving??=false;w.homeTown??=e.towns[0]?.id;if(!integer(w.missedMonths)||w.missedMonths>HIRING.graceMonths||typeof w.leaving!=='boolean'||!towns.has(w.homeTown))throw Error('Invalid worker payroll.');if(!Number.isFinite(w.paidUntil)||w.paidUntil<0||typeof w.unpaid!=='boolean'||!integer(w.id)||ids.has(w.id)||w.id>=e.nextWorker||!point(w)||!['idle','travelling','farm','waiting','unloading','returning-cargo'].includes(w.phase)||!Array.isArray(w.path)||w.path.length>4096||!w.path.every(point)||!integer(w.step)||w.step>w.path.length||typeof w.note!=='string'||w.note.length>160||!Number.isFinite(w.retry)||w.retry<0||!(w.cargo===null||CROPS[w.cargo.crop]&&integer(w.cargo.kg)&&w.cargo.kg>0&&w.cargo.kg<=BALANCE.carryKg&&game.farms.some(f=>f.id===w.cargo.farm)))throw Error('Invalid worker or cargo.');ids.add(w.id);
  if(w.hallReported!==undefined&&typeof w.hallReported!=='boolean')throw Error('Invalid hall attendance.');
  if(w.assignment?.kind==='hall'){if(w.workplace!==`hall:${w.assignment.site}`||!game.sites[w.assignment.site]?.hall||game.sites[w.assignment.site].progress!==1)throw Error('Invalid hall assignment.');}
  else if(w.assignment&&(!['farm','delivery'].includes(w.assignment.kind)||!game.farms.some(f=>f.id===w.assignment.farm&&f.controller!==null)||w.assignment.kind==='delivery'&&!towns.has(w.assignment.town)))throw Error('Invalid work assignment.');
  if(w.destination){const d=w.destination;if(!point(d)||!['farm','town','return','home','house','hall','job'].includes(d.kind)||['town','home'].includes(d.kind)&&!towns.has(d.id)||d.kind==='house'&&!game.sites[d.id]?.house||d.kind==='hall'&&!game.sites[d.id]?.hall||['farm','return'].includes(d.kind)&&!game.farms.some(f=>f.id===d.id)||d.kind==='job'&&(!game.jobs.some(j=>jobKey(j)===d.id&&j.claimant===`worker:${w.id}`)))throw Error('Invalid worker destination.');}

 }
 for(const job of game?.jobs||[])if(job.claimant?.startsWith('worker:')){const w=e.workers.find(w=>job.claimant===`worker:${w.id}`);if(!w||w.assignment?.kind!=='hall'||!w.hallReported||w.leaving)throw Error('Missing human job claimant.');}
 for(let site=0;site<(game?.sites.length||0);site++)if(game.sites[site].hall&&e.workers.filter(w=>!w.leaving&&w.workplace===`hall:${site}`).length>WORKER_HALL.capacity)throw Error('Worker hall exceeds capacity.');
 return e;
}
export function townHouses(t,seed){
 const large=(t.layout??1)===VILLAGES.layout;
 return Array.from({length:large?VILLAGES.houses:6},(_,i)=>{
  const columns=large?5:3,col=i%columns,row=Math.floor(i/columns),v=((seed>>>0)+t.id*13+i*7)%3;
  const house={x:t.x+(large?4+col*9+(v-1)*.5:1+col*5.5),y:t.y+(large?3+row*8:1+row*7),w:large?5:4,h:(large?4.5+v*.25:3.5+v*.25)+.6};
  return {...house,house:i,laneX:t.x+(large?11+col*9:6+col*5.5),door:{x:house.x+house.w/2,y:house.y+house.h+(large?1.2:1.0)}};
 });
}
function freeVillageHome(e,town,seed){const house=townHouses(town,seed).find(h=>!e.workers.some(w=>w.home?.town===town.id&&w.home.house===h.house));return house?{town:town.id,house:house.house,...house.door,laneX:house.laneX}:null;}
function assignHomes(e,seed){
 for(const w of e.workers){if(w.home&&!w.home.awaiting)continue;const town=e.towns.find(t=>t.id===w.homeTown)||e.towns[0];if(!town)continue;
  w.home=freeVillageHome(e,town,seed)||{town:town.id,awaiting:true,...door(town)};
 }
}
export function hiringHome(world,townId){
 const e=world.economy,t=e.towns.find(t=>t.id===townId);if(!t)return null;
 const village=freeVillageHome(e,t,world.seed);if(village)return village;
 const site=world.construction.sites.findIndex((s,i)=>s.house&&s.progress===1&&!e.workers.some(w=>w.home.site===i));
 return site<0?null:{site,...door(world.construction.sites[site])};
}
export function homeTarget(world,w){if(w.home.site!==undefined)return{...door(world.construction.sites[w.home.site]),kind:'house',id:w.home.site,label:`House ${w.home.site+1}`,home:w.home};const t=world.economy.towns.find(t=>t.id===w.home.town);return{x:w.home.x,y:w.home.y,kind:'home',id:t.id,label:`home in ${t.name}`,home:w.home};}
function allocateHouses(world){
 const e=world.economy;
 for(let site=0;site<world.construction.sites.length;site++){
  const building=world.construction.sites[site];if(!building.house||building.progress!==1||e.workers.some(w=>w.home.site===site))continue;
  const target={...door(building),kind:'house',id:site,label:`House ${site+1}`,home:{site,...door(building)}};
  const residents=e.workers.filter(w=>w.home.site===undefined&&!w.leaving&&!w.cargo&&w.phase!=='travelling'&&w.assignment?.kind!=='delivery'&&!world.construction.jobs.some(j=>j.claimant===`worker:${w.id}`)).sort((a,b)=>Math.hypot(a.x-target.x,a.y-target.y)-Math.hypot(b.x-target.x,b.y-target.y)||a.id-b.id);
  const resident=residents.find(w=>!route(world,w,target).error);if(!resident)continue;
  // Compute the exit path using the previous village home before adopting the new one.
  resident.previousHome=resident.home;startTravel(world,resident,target);resident.home=target.home;resident.reconsider=true;
 }
}
export function bindEconomy(world){
 if(!world.construction)return;
 world.economy||=newEconomy();assignHomes(world.economy,world.seed);reservations.set(world.construction,world.economy.towns);workerReservations.set(world.construction,world.economy.workers);
 world.marketContains=(x,y)=>world.economy.towns.some(t=>inside({x:x+.5,y:y+.5},t));
}
export function ensureTowns(world){
 const g=world.construction,e=world.economy;if(!g?.ship||e.settled)return false;
 const center={x:g.ship.x+20,y:g.ship.y+6},names=['Oakford','Brookend'];
 for(let id=e.towns.length+1;id<=2;id++){
  let found=null;
  for(let ring=0;ring<VILLAGES.rings&&!found;ring++)for(let n=0;n<8&&!found;n++){
   const angle=(n+(world.seed%8)+(id===2?4:0))*Math.PI/4,radius=VILLAGES.firstRadius+ring*VILLAGES.ringStep,t={id,name:names[id-1],layout:VILLAGES.layout,x:Math.round(center.x+Math.cos(angle)*radius)-VILLAGES.width/2,y:Math.round(center.y+Math.sin(angle)*radius)-VILLAGES.height/2,w:VILLAGES.width,h:VILLAGES.height};
   const space={x:t.x-4,y:t.y-4,w:t.w+8,h:t.h+8};
   if(e.towns.some(other=>Math.hypot(other.x+other.w/2-t.x-t.w/2,other.y+other.h/2-t.y-t.h/2)<VILLAGES.minSeparation)||g.jobs.some(job=>job.kind==='cut'&&inside({x:job.x+.5,y:job.y+.5},space))||overlap(space,g.ship)||g.sites.some(s=>overlap(space,s))||e.towns.some(s=>overlap(space,s))||coverageIntersectsRect(g.soil,space)||g.farms.some(f=>coverageIntersectsRect(f.coverage,space)))continue;found=t;
  }
  if(!found)break;e.towns.push(found);
  for(let cy=Math.floor(found.y/32);cy<=Math.floor((found.y+found.h)/32);cy++)for(let cx=Math.floor(found.x/32);cx<=Math.floor((found.x+found.w)/32);cx++)world.state.markChunkChanged(cx,cy);
 }
 e.settled=true;bindEconomy(world);return true;
}
const obstacles=world=>[world.construction.ship,...world.construction.sites,...world.economy.towns].filter(Boolean);
// Segment/rectangle intersection also prevents diagonal corner clipping.
function hits(a,b,r,pad=1){let lo=0,hi=1;for(const axis of ['x','y']){const size=axis==='x'?'w':'h',d=b[axis]-a[axis],min=r[axis]-pad,max=r[axis]+r[size]+pad;if(Math.abs(d)<1e-9){if(a[axis]<=min||a[axis]>=max)return false;continue;}let u=(min-a[axis])/d,v=(max-a[axis])/d;if(u>v)[u,v]=[v,u];lo=Math.max(lo,u);hi=Math.min(hi,v);if(lo>=hi)return false;}return hi>0&&lo<1;}
export function segmentBlocked(world,a,b){
 const town=world.economy.towns.find(t=>inside(a,t,2.1)||inside(b,t,2.1));
 if(!town)return obstacles(world).some(r=>hits(a,b,r));
 // Village entry follows narrow streets. Check the actual walls at pedestrian clearance.
 return [world.construction.ship,...world.construction.sites,...world.economy.towns.flatMap(t=>t===town?townHouses(t,world.seed):[t])].filter(Boolean).some(r=>hits(a,b,r,.15));
}
export function route(world,a,b){
 if(Math.hypot(a.x-b.x,a.y-b.y)<.001)return{path:[{x:b.x,y:b.y}]};
 const passage=p=>{const h=p.home?.site!==undefined&&p.previousHome?p.previousHome:p.home,t=h&&world.economy.towns.find(t=>t.id===h.town);if(!t||h.awaiting||!inside(p,t,2.1))return[];return[{x:h.laneX,y:p.y},{x:h.laneX,y:t.y+t.h+2}];};
 const leaving=passage(a),entering=passage(b),start=leaving.at(-1)||a,end=entering.at(-1)||b;
 const middle=outsideRoute(world,start,end);if(middle.error)return middle;
 const path=[...leaving,...middle.path,...entering.slice(0,-1).reverse(),...(entering.length?[{x:b.x,y:b.y}]:[])];
 let previous=a;for(const p of path){if(segmentBlocked(world,previous,p))return{error:'No clear way to the house. Leave a wider gap.'};previous=p;}
 return{path};
}
function outsideRoute(world,a,b){
 if(Math.hypot(a.x-b.x,a.y-b.y)>BALANCE.maxRouteDistance)return{error:'Destination is too far away. Choose a closer farm or town.'};
 const blocks=obstacles(world);if(!blocks.some(r=>hits(a,b,r)))return{path:[{x:b.x,y:b.y}]};
 const step=4,start={x:Math.round(a.x/step),y:Math.round(a.y/step)},end={x:Math.round(b.x/step),y:Math.round(b.y/step)},key=(x,y)=>`${x},${y}`;
 const heap=[],push=n=>{heap.push(n);for(let i=heap.length-1;i>0;){const p=(i-1)>>1;if(heap[p].f<=heap[i].f)break;[heap[i],heap[p]]=[heap[p],heap[i]];i=p;}},pop=()=>{const n=heap[0],last=heap.pop();if(heap.length){heap[0]=last;for(let i=0;;){let j=i,l=i*2+1;if(l<heap.length&&heap[l].f<heap[j].f)j=l;if(l+1<heap.length&&heap[l+1].f<heap[j].f)j=l+1;if(j===i)break;[heap[i],heap[j]]=[heap[j],heap[i]];i=j;}}return n;};
 const seen=new Map(),initial={...start,g:0,f:0,parent:null,point:a};seen.set(key(start.x,start.y),initial);push(initial);let finish=null,visits=0;
 while(heap.length&&visits++<BALANCE.maxRouteNodes){const n=pop();if(n.closed)continue;n.closed=true;
  if(Math.hypot(n.point.x-b.x,n.point.y-b.y)<8&&!blocks.some(r=>hits(n.point,b,r))){finish=n;break;}
  for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const x=n.x+dx,y=n.y+dy,p={x:x*step,y:y*step};if(Math.abs(x-start.x)>520||Math.abs(y-start.y)>520||blocks.some(r=>hits(n.point,p,r)))continue;
   const g=n.g+Math.hypot(dx,dy),k=key(x,y),old=seen.get(k);if(old&&old.g<=g)continue;const next={x,y,point:p,g,f:g+Math.hypot(x-end.x,y-end.y),parent:n};seen.set(k,next);push(next);
  }
 }
 if(!finish)return{error:'No clear way through the buildings. Leave a wider gap.'};
 const path=[{x:b.x,y:b.y}];for(let n=finish;n.parent;n=n.parent)path.push(n.point);path.reverse();
 // Keep only necessary corners; route size stays bounded independently of land area.
 const simple=[];let current=a;for(let i=0;i<path.length;){let j=i;while(j+1<path.length&&!blocks.some(r=>hits(current,path[j+1],r)))j++;simple.push(path[j]);current=path[j];i=j+1;}return{path:simple};
}
export function hireWorker(world,townId){const e=world.economy,t=e.towns.find(t=>t.id===townId);if(!t)return{error:'Choose a town.'};if(e.workers.length>=BALANCE.maxWorkers)return{error:`Worker limit: ${BALANCE.maxWorkers}.`};if(e.gold<HIRING.wage)return{error:'Not enough gold.'};const home=hiringHome(world,townId);if(!home)return{error:'No vacant home. Build a house before hiring here.'};e.gold-=HIRING.wage;const worker={paidUntil:e.clock+HIRING.period,unpaid:false,missedMonths:0,leaving:false,homeTown:townId,home,workplace:null,reconsider:true,id:e.nextWorker++,...door(t),assignment:null,cargo:null,phase:'idle',destination:null,path:[],step:0,note:'Looking for nearby work',retry:0};e.workers.push(worker);assignHomes(e,world.seed);if(worker.home.site===undefined){worker.x=worker.home.x;worker.y=worker.home.y;}chooseWorkplace(world,worker);return{worker};}
function startTravel(world,w,destination){const r=route(world,w,destination);w.destination=destination;w.path=r.path||[];w.step=0;w.phase=r.error?'waiting':'travelling';w.note=r.error||`Going to ${destination.label}`;w.retry=r.error?2:0;}
export function assignWorker(world,id,assignment){const w=world.economy.workers.find(w=>w.id===id);if(!w)return{error:'Worker is missing.'};if(w.leaving)return{error:'This worker is leaving after three unpaid months.'};if(assignment){const f=world.construction.farms.find(f=>f.id===assignment.farm&&f.controller!==null);if(!f||!['farm','delivery'].includes(assignment.kind)||assignment.kind==='delivery'&&!world.economy.towns.some(t=>t.id===assignment.town))return{error:'Choose a farm and town.'};}
 w.assignment=assignment?{...assignment}:null;w.path=[];w.step=0;w.destination=null;w.phase='idle';w.note=w.cargo?'Returning the carried harvest before changing jobs':'Looking for nearby work';w.workplace=assignment?.farm??null;w.reconsider=!assignment;w.retry=0;return{worker:w};}
// P scales the full crop cycle; B is the allotted farm's base staffing.
export function laborProductivity(people,base){if(!(base>0)||!(people>0))return 0;const ratio=people/base;return ratio<=1?ratio:1+.75*Math.log2(ratio);}
export function setCrop(world,id,crop){if(!(crop===null||CROPS[crop]))return false;const f=farmEconomy(world,id);if(f.crop===crop)return true;f.crop=crop;restartCrop(world,id);return true;}
export function restartCrop(world,id){const f=world.economy.farms.find(f=>f.farm===id);if(f)f.cycle=null;for(const w of world.economy.workers)if(w.assignment?.kind==='farm'&&w.assignment.farm===id){w.destination=null;w.path=[];w.step=0;w.phase='idle';}}
export function cropTarget(world,id){const f=world.construction.farms.find(f=>f.id===id),site=world.construction.sites[f?.controller];return site?{...door(site),kind:'farm',id,label:`Farm ${id}`}:null;}
// A workplace is stable between relevant changes; carrying and return trips finish first.
const dispatchState=new WeakMap();
function hasWorkplaceSlot(world,f,w){const assigned=world.economy.workers.filter(v=>!v.leaving&&v.workplace===f.id).sort((a,b)=>a.id-b.id),slots=staffingTarget(f);return w.workplace===f.id?assigned.indexOf(w)<slots:assigned.length<slots;}
function usableFarm(world,f){const stock=farmEconomy(world,f.id);return f.controller!==null&&((f.area>0&&stock.crop)||Object.values(stock.stock).some(n=>n>0));}
function refreshWorkplaces(world){
 const g=world.construction,e=world.economy,stamp=g.sites.flatMap((s,i)=>s.hall?[`${i}:${s.progress===1}`]:[]).join(',')+'|'+g.farms.map(f=>`${f.id}:${f.controller}:${f.area}:${farmEconomy(world,f.id).crop}`).join(',');
 const previous=dispatchState.get(world);dispatchState.set(world,stamp);
 // Restoring a saved route must not itself cancel the trip.
 if(previous!==undefined&&previous!==stamp)for(const w of e.workers)w.reconsider=true;
}
function hallTarget(world,site){return{...door(world.construction.sites[site]),kind:'hall',id:site,label:`Worker hall ${site+1}`};}
function hallSlot(world,site,w){const workers=world.economy.workers.filter(v=>!v.leaving&&v.workplace===`hall:${site}`).sort((a,b)=>a.id-b.id);return w.workplace===`hall:${site}`?workers.indexOf(w)<WORKER_HALL.capacity:workers.length<WORKER_HALL.capacity;}
function releaseHumanJob(world,w){for(const j of world.construction.jobs)if(j.claimant===`worker:${w.id}`)j.claimant=null;if(w.destination?.kind==='job'){w.destination=null;w.path=[];w.step=0;w.phase='idle';}}
function chooseWorkplace(world,w){
 const choices=world.construction.farms.filter(f=>usableFarm(world,f)&&hasWorkplaceSlot(world,f,w)).map(f=>({key:f.id,target:cropTarget(world,f.id),assignment:{kind:'farm',farm:f.id}}));
 world.construction.sites.forEach((s,site)=>{if(s.hall&&s.progress===1&&hallSlot(world,site,w))choices.push({key:`hall:${site}`,target:hallTarget(world,site),assignment:{kind:'hall',site}});});
 choices.sort((a,b)=>Math.hypot(w.x-a.target.x,w.y-a.target.y)-Math.hypot(w.x-b.target.x,w.y-b.target.y)||String(a.key).localeCompare(String(b.key)));
 const chosen=choices.find(({target})=>!route(world,w,target).error),old=w.workplace;
 w.workplace=chosen?.key??null;w.reconsider=false;
 if(old!==w.workplace){releaseHumanJob(world,w);w.hallReported=false;}
 if(w.workplace===null){w.assignment=null;w.destination=null;w.path=[];w.step=0;w.phase='idle';w.note=choices.length?'No reachable workplace. Leave a clear route.':'Waiting for a vacant farm or worker hall';w.retry=2;return;}
 if(old!==w.workplace||w.assignment?.kind!==chosen.assignment.kind){w.assignment=chosen.assignment;w.destination=null;w.path=[];w.step=0;w.phase='idle';w.retry=0;}
 w.note=`Working automatically at ${chosen.target.label}`;
}
function humanJobTarget(world,job){return job.kind==='build'?{...door(world.construction.sites[job.site]),kind:'job',id:jobKey(job),label:`blueprint ${job.site+1}`}:{x:job.x+.5,y:job.y+.5,kind:'job',id:jobKey(job),label:'marked tree'};}
function hallStep(world,w,dt){
 const g=world.construction,site=w.assignment.site;
 if(!w.hallReported){const target=hallTarget(world,site);if(Math.hypot(w.x-target.x,w.y-target.y)>.1){startTravel(world,w,target);return;}w.hallReported=true;}
 let job=g.jobs.find(j=>j.claimant===`worker:${w.id}`);
 if(!job){
  for(const candidate of g.jobs){if(candidate.claimant||!['build','cut'].includes(candidate.kind))continue;const target=humanJobTarget(world,candidate);if(route(world,w,target).error)continue;candidate.claimant=`worker:${w.id}`;job=candidate;startTravel(world,w,target);return;}
  const home=homeTarget(world,w);if(Math.hypot(w.x-home.x,w.y-home.y)>.1)startTravel(world,w,home);else{w.phase='idle';w.note=`At home · Worker hall ${site+1} has no reachable build or cut jobs`;w.retry=2;}return;
 }
 if(job.kind==='cut'&&!world.isTree(job.x,job.y)){g.jobs.splice(g.jobs.indexOf(job),1);w.destination=null;w.phase='idle';return;}
 const target=humanJobTarget(world,job);
 if(Math.hypot(w.x-target.x,w.y-target.y)>.1){if(route(world,w,target).error){releaseHumanJob(world,w);w.note='Job blocked; waiting for a clear route';w.retry=2;return;}startTravel(world,w,target);return;}
 const object=job.kind==='build'?g.sites[job.site]:job;
 object.progress=Math.min(1,object.progress+dt/(job.kind==='build'?BUILD_SECONDS:CUT_SECONDS));w.phase='waiting';w.note=`${job.kind==='build'?'Constructing':'Cutting tree'} · ${Math.floor(object.progress*100)}%`;
 if(object.progress===1){if(job.kind==='build')g.cursor++;else{const value=world.tile(job.x,job.y);if(value&8)world.state.setTile(job.x,job.y,value&~8);}g.jobs.splice(g.jobs.indexOf(job),1);w.destination=null;w.phase='idle';w.note='Job complete';}
}

function beginDelivery(world,w,f){
 // One temporary carrier per farm leaves the rest farming. The sole worker can do both.
 if(world.economy.workers.some(other=>other!==w&&other.assignment?.kind==='delivery'&&other.assignment.farm===f.farm))return false;
 const crop=Object.keys(CROPS).find(k=>f.stock[k]>=BALANCE.carryKg||f.stock[k]>0&&(!f.cycle||f.cycle.phase!=='harvesting'));
 if(!crop)return false;
 const towns=world.economy.towns.map(t=>({t,target:{...door(t),kind:'town',id:t.id,label:t.name}})).sort((a,b)=>Math.hypot(w.x-a.target.x,w.y-a.target.y)-Math.hypot(w.x-b.target.x,w.y-b.target.y)||a.t.id-b.t.id);
 const chosen=towns.find(({target})=>!route(world,w,target).error);
 if(!chosen){w.note='Harvest stored; no reachable village market';return false;}
 const kg=Math.min(BALANCE.carryKg,f.stock[crop]);f.stock[crop]-=kg;w.cargo={farm:f.farm,crop,kg};w.assignment={kind:'delivery',farm:f.farm,town:chosen.t.id};startTravel(world,w,chosen.target);return true;
}
function cycleCoverage(world,id){const f=world.construction.farms.find(f=>f.id===id),prepared=combineCoverage(world.construction.soil,preparedCoverage(f.work));return combineCoverage(f.coverage,combineCoverage(f.coverage,prepared,true),true);}
function beginCycle(world,f){const farm=world.construction.farms.find(g=>g.id===f.farm);if(!f.crop||farm?.controller===null||world.construction.sites[farm.controller].progress!==1)return;const coverage=cycleCoverage(world,f.farm),area=coverageArea(coverage);if(area)f.cycle={crop:f.crop,coverage,area,phase:'sowing',work:0,grown:0,paid:0};}
function moveWorker(world,w,dt){
 if(w.step>=w.path.length)return true;let time=dt;
 while(time>0&&w.step<w.path.length){const p=w.path[w.step];if(segmentBlocked(world,w,p)){startTravel(world,w,w.destination);return false;}const distance=Math.hypot(p.x-w.x,p.y-w.y),speed=BALANCE.walkSpeed*(world.isGrassland(w.x,w.y)?1:BALANCE.woodlandFactor),duration=distance/speed;if(time>=duration){w.x=p.x;w.y=p.y;w.step++;time-=duration;}else{const a=time/duration;w.x+=(p.x-w.x)*a;w.y+=(p.y-w.y)*a;return false;}}
 return w.step===w.path.length;
}
function arrive(world,w){const e=world.economy,d=w.destination;if(d.kind==='house')delete w.previousHome;
 if(d.kind==='town'&&w.cargo){const t=e.towns.find(t=>t.id===d.id),cargo=w.cargo;e.gold+=cargo.kg*CROPS[cargo.crop].price;e.sold[cargo.crop]+=cargo.kg;w.cargo=null;w.note=`Sold ${cargo.kg} kg at ${t.name}`;}
 if(d.kind==='hall')w.hallReported=true;
 if(d.kind==='farm'&&!w.cargo&&w.assignment?.kind==='delivery'){w.assignment={kind:'farm',farm:d.id};w.workplace=d.id;}
 w.phase=d.kind==='farm'&&w.assignment?.kind==='farm'?'farm':d.kind==='return'?'returning-cargo':'waiting';w.retry=0;
}
// A departing worker completes carried delivery (or returns cancelled cargo), then walks home.
function departureStep(world,w,dt){
 releaseHumanJob(world,w);
 const e=world.economy,delivery=w.cargo&&w.assignment?.kind==='delivery'&&w.assignment.farm===w.cargo.farm;
 const town=e.towns.find(t=>t.id===(delivery?w.assignment.town:w.homeTown));
 const target=w.cargo&&!delivery?{...cropTarget(world,w.cargo.farm),kind:'return'}:w.cargo?{...door(town),kind:'town',id:town.id,label:town.name}:homeTarget(world,w);
 if(w.destination?.kind!==target.kind||w.destination?.id!==target.id){startTravel(world,w,target);return;}
 if(w.phase==='travelling'){if(moveWorker(world,w,dt))arrive(world,w);return;}
 if(w.retry>0){w.retry=Math.max(0,w.retry-dt);return;}
 if(Math.hypot(w.x-target.x,w.y-target.y)>.1){startTravel(world,w,target);return;}
 if(w.cargo&&target.kind==='return'){
  const f=farmEconomy(world,w.cargo.farm),n=Math.min(BALANCE.storageKg-f.stock[w.cargo.crop],w.cargo.kg);f.stock[w.cargo.crop]+=n;w.cargo.kg-=n;if(w.cargo.kg){w.note='Leaving: waiting for room to return cargo';return;}w.cargo=null;w.destination=null;return;
 }
 if(!w.cargo){e.lastDeparture=`Worker ${w.id} left after three unpaid months. No wages are owed.`;e.workers.splice(e.workers.indexOf(w),1);}
}
function payroll(e,w){
 if(w.leaving||e.clock+1e-9<w.paidUntil)return;
 if(e.gold>=HIRING.wage){e.gold-=HIRING.wage;w.unpaid=false;w.missedMonths=0;w.paidUntil+=HIRING.period;}
 else if(w.missedMonths<HIRING.graceMonths){w.unpaid=true;w.missedMonths++;w.paidUntil+=HIRING.period;}
 else{w.leaving=true;w.unpaid=true;w.note='Leaving after three unpaid months';}
}
const hallReturnQueue=new WeakMap();
function workerStep(world,w,dt){
 // A new order can redirect a reported hall worker walking home. Try once per queue change.
 if(w.phase==='travelling'&&w.assignment?.kind==='hall'&&w.hallReported&&!w.previousHome&&['home','house'].includes(w.destination?.kind)){const pending=world.construction.jobs.filter(j=>!j.claimant&&['build','cut'].includes(j.kind)).map(jobKey).join('|');if(hallReturnQueue.get(w)!==pending){hallReturnQueue.set(w,pending);if(pending)hallStep(world,w,0);}}
 if(w.phase==='travelling'){if(moveWorker(world,w,dt))arrive(world,w);return;}
 if(w.retry>0){w.retry=Math.max(0,w.retry-dt);return;}
 if(w.cargo&&(!w.assignment||w.assignment.kind!=='delivery'||w.assignment.farm!==w.cargo.farm||w.destination?.kind==='return')){
  const target={...cropTarget(world,w.cargo.farm),kind:'return'};if(!target)return;
  if(w.phase!=='returning-cargo'){startTravel(world,w,target);return;}
  const f=farmEconomy(world,w.cargo.farm),room=BALANCE.storageKg-f.stock[w.cargo.crop],n=Math.min(room,w.cargo.kg);f.stock[w.cargo.crop]+=n;w.cargo.kg-=n;if(!w.cargo.kg){w.cargo=null;w.phase='idle';w.destination=null;}else w.note='Waiting for room to return cargo';return;
 }
 if(!w.cargo&&w.assignment?.kind!=='delivery'){
  const current=world.construction.farms.find(f=>f.id===w.workplace),hall=w.assignment?.kind==='hall'&&world.construction.sites[w.assignment.site];
  if(w.reconsider||!(hall?.hall&&hall.progress===1&&hallSlot(world,w.assignment.site,w))&&(!current||!usableFarm(world,current)||!hasWorkplaceSlot(world,current,w)))chooseWorkplace(world,w);
 }
 const a=w.assignment;if(!a){
  const home=homeTarget(world,w);if(Math.hypot(w.x-home.x,w.y-home.y)>.1)startTravel(world,w,home);else{w.phase='idle';w.note=w.home.awaiting?'Awaiting a house · waiting for nearby work':'At home · waiting for nearby work';}return;
 }
 if(a.kind==='hall'){hallStep(world,w,dt);return;}
 const target=cropTarget(world,a.farm),f=farmEconomy(world,a.farm);
 if(a.kind==='farm'){
  if(w.phase!=='farm'){startTravel(world,w,target);return;}if(beginDelivery(world,w,f))return;w.note=f.cycle?`${CROPS[f.cycle.crop].name}: ${f.cycle.phase}`:f.crop?'Waiting for prepared land':'Choose a crop';return;
 }
 if(w.cargo){const t=world.economy.towns.find(t=>t.id===a.town);startTravel(world,w,{...door(t),kind:'town',id:t.id,label:t.name});return;}
 if(w.destination?.kind!=='farm'||Math.hypot(w.x-target.x,w.y-target.y)>.1){startTravel(world,w,target);return;}
 const crop=Object.keys(CROPS).find(k=>f.stock[k]>0);if(!crop){w.phase='waiting';w.note=`Waiting for harvest at Farm ${a.farm}`;return;}
 const cycle=f.cycle,producing=cycle?.crop===crop&&world.economy.workers.some(worker=>!worker.leaving&&worker.assignment?.kind==='farm'&&worker.assignment.farm===a.farm),batch=cycle?Math.min(BALANCE.carryKg,Math.max(1,Math.floor(cycle.area*CROPS[crop].kgPerTile))):1;const targetLoad=producing&&f.stock[crop]+Math.floor(cycle.area*CROPS[crop].kgPerTile)-cycle.paid>=batch?batch:1;if(f.stock[crop]<targetLoad){w.note=`Waiting for ${targetLoad} kg at Farm ${a.farm}`;return;}
 const kg=Math.min(BALANCE.carryKg,f.stock[crop]);f.stock[crop]-=kg;w.cargo={farm:a.farm,crop,kg};const t=world.economy.towns.find(t=>t.id===a.town);startTravel(world,w,{...door(t),kind:'town',id:t.id,label:t.name});
}
export function advanceEconomy(world,seconds){
 if(!world.construction?.ship||!Number.isFinite(seconds)||seconds<=0)return false;bindEconomy(world);ensureTowns(world);refreshWorkplaces(world);const e=world.economy;
 // Small deterministic simulation slices keep arrival/work transitions ordered.
 let remaining=seconds,changed=false;
 while(remaining>1e-8){const dt=Math.min(.25,remaining);remaining-=dt;e.clock+=dt;changed=true;
  allocateHouses(world);
  for(const w of [...e.workers]){payroll(e,w);if(w.leaving)departureStep(world,w,dt);else workerStep(world,w,dt);}
  const labor=new Map();for(const w of e.workers)if(!w.leaving&&w.phase==='farm'&&w.assignment?.kind==='farm')labor.set(w.assignment.farm,(labor.get(w.assignment.farm)||0)+1);
  for(const f of e.farms){if(!f.cycle){if(labor.get(f.farm))beginCycle(world,f);if(!f.cycle)continue;}const c=f.cycle,people=labor.get(f.farm)||0,crop=CROPS[c.crop],base=staffingTarget(world.construction.farms.find(g=>g.id===f.farm)),level=laborProductivity(people,base);
   if(c.phase==='growing'){c.grown=Math.min(crop.growSeconds,c.grown+dt*level);if(c.grown===crop.growSeconds){c.phase='harvesting';c.work=0;}changed=true;}
   else if(people){const rate=c.phase==='sowing'?BALANCE.sowRate:BALANCE.harvestRate;
    if(c.phase==='harvesting'&&f.stock[c.crop]>=BALANCE.storageKg)continue;
    c.work=Math.min(c.area,c.work+dt*base*level*rate);
    if(c.phase==='harvesting'){const due=Math.floor(c.work*crop.kgPerTile)-c.paid,n=Math.min(due,BALANCE.storageKg-f.stock[c.crop]);c.paid+=n;f.stock[c.crop]+=n;if(n<due)c.work=Math.min(c.work,(c.paid+1)/crop.kgPerTile-1e-6);}
    if(c.work===c.area){if(c.phase==='sowing'){c.phase='growing';c.work=0;}else{f.cycles++;f.cycle=null;}}changed=true;
   }
  }
 }
 return changed;
}
