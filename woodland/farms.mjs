export const MAX_FARMS=64,MAX_FARM_TILES=1048576,MAX_FARM_CHUNKS=4096,FARM_RATE=256;
export const popcount=n=>{n-=n>>>1&0x55555555;n=(n&0x33333333)+(n>>>2&0x33333333);return (((n+(n>>>4))&0x0f0f0f0f)*0x01010101)>>>24;};
const bits=(a,b)=>((0xffffffff>>>a)<<(a) & (b===32?0xffffffff:(2**b-1)))>>>0;
const key=(x,y)=>`${x},${y}`;
const row=(entry,y)=>entry.length===2?0xffffffff:entry[2][y];
export const coverageArea=coverage=>coverage.reduce((n,e)=>n+(e.length===2?1024:e[2].reduce((a,b)=>a+popcount(b),0)),0);
export function patchCoverage(coverage,rect,erase=false){
 if(![rect.x,rect.y,rect.w,rect.h].every(Number.isSafeInteger)||rect.w<1||rect.h<1||Math.abs(rect.x)>1e9||Math.abs(rect.y)>1e9||rect.w*rect.h>MAX_FARM_TILES) return {error:'Patch limit: 1,048,576 tiles.'};
 const map=new Map(coverage.map(e=>[key(e[0],e[1]),e]));
 const x0=Math.floor(rect.x/32),x1=Math.floor((rect.x+rect.w-1)/32),y0=Math.floor(rect.y/32),y1=Math.floor((rect.y+rect.h-1)/32);
 if((x1-x0+1)*(y1-y0+1)>MAX_FARM_CHUNKS)return{error:'Patch spans too many regions. Keep the field more compact.'};
 for(let cy=y0;cy<=y1;cy++)for(let cx=x0;cx<=x1;cx++){
  const k=key(cx,cy),old=map.get(k);if(erase&&!old)continue;
  const rows=old?Array.from({length:32},(_,y)=>row(old,y)):Array(32).fill(0),mask=bits(Math.max(0,rect.x-cx*32),Math.min(32,rect.x+rect.w-cx*32));
  for(let y=Math.max(0,rect.y-cy*32);y<Math.min(32,rect.y+rect.h-cy*32);y++)rows[y]=(erase?rows[y]&~mask:rows[y]|mask)>>>0;
  if(rows.every(v=>v===0))map.delete(k);else map.set(k,rows.every(v=>v===0xffffffff)?[cx,cy]:[cx,cy,rows]);
 }
 const result=[...map.values()].sort((a,b)=>a[1]-b[1]||a[0]-b[0]),area=coverageArea(result);
 if(result.length>MAX_FARM_CHUNKS||area>MAX_FARM_TILES)return{error:'Farm limit: 1,048,576 tiles across at most 4,096 regions.'};
 return{coverage:result,area};
}
// Coverage operations visit at most 32 bitmask rows per stored region, never tile objects.
export function combineCoverage(a,b,subtract=false){
 const map=new Map(a.map(e=>[key(e[0],e[1]),e]));
 for(const e of b){const k=key(e[0],e[1]),old=map.get(k);if(subtract&&!old)continue;
  const rows=Array.from({length:32},(_,y)=>(subtract?row(old,y)&~row(e,y):(old?row(old,y):0)|row(e,y))>>>0);
  if(rows.every(v=>!v))map.delete(k);else map.set(k,rows.every(v=>v===0xffffffff)?[e[0],e[1]]:[e[0],e[1],rows]);
 }return [...map.values()].sort((a,b)=>a[1]-b[1]||a[0]-b[0]);
}
export function coverageContains(coverage,x,y){const cx=Math.floor(x/32),cy=Math.floor(y/32),e=coverage.find(e=>e[0]===cx&&e[1]===cy);return !!e&&!!(row(e,y-cy*32)&(1<<(x-cx*32)));}
export function preparedCoverage(work){
 if(!work)return [];const n=Math.floor(work.area*work.progress+1e-7),result=[];
 for(const c of compileCoverage(work.coverage)){if(c.start>=n)break;const rows=Array.from({length:32},(_,y)=>preparedRow(c,y,n-c.start));if(rows.every(v=>v===0xffffffff))result.push([c.cx,c.cy]);else if(rows.some(v=>v))result.push([c.cx,c.cy,rows]);}return result;
}
export function validateCoverage(coverage){
 if(!Array.isArray(coverage)||coverage.length>MAX_FARM_CHUNKS)throw Error('Invalid farm coverage.');const seen=new Set();
 for(const e of coverage){
  if(!Array.isArray(e)||![2,3].includes(e.length)||!Number.isInteger(e[0])||!Number.isInteger(e[1])||Math.abs(e[0])>31250000||Math.abs(e[1])>31250000||(e.length===3&&(!Array.isArray(e[2])||e[2].length!==32||!e[2].every(v=>Number.isInteger(v)&&v>=0&&v<=0xffffffff)||e[2].every(v=>v===0))))throw Error('Invalid farm coverage.');
  const k=key(e[0],e[1]);if(seen.has(k))throw Error('Duplicate farm region.');seen.add(k);
 }if(coverageArea(coverage)>MAX_FARM_TILES)throw Error('Farm coverage limit exceeded.');return coverage;
}
export function coverageLimit(coverage){return coverage.length>MAX_FARM_CHUNKS||coverageArea(coverage)>MAX_FARM_TILES;}
export function validateFarms(farms,soil=[]){
 if(!Array.isArray(farms)||farms.length>MAX_FARMS)throw Error('Invalid farm list.');validateCoverage(soil);
 const ids=new Set();let occupied=[],reserved=soil;
 for(const f of farms){
  if(!Number.isInteger(f.id)||f.id<1||ids.has(f.id)||!(f.controller===null||Number.isInteger(f.controller)&&f.controller>=0))throw Error('Invalid farm.');ids.add(f.id);validateCoverage(f.coverage);
  if(f.area!==coverageArea(f.coverage)||coverageArea(combineCoverage(f.coverage,occupied,true))!==f.area)throw Error('Saved allotments overlap or area is invalid.');occupied=combineCoverage(occupied,f.coverage);
  if(f.work!==null){const w=f.work;validateCoverage(w?.coverage);if(!w.area||w.area!==coverageArea(w.coverage)||!Number.isFinite(w.progress)||w.progress<0||w.progress>1||combineCoverage(w.coverage,f.coverage,true).length)throw Error('Invalid farm preparation.');}
  reserved=combineCoverage(reserved,f.coverage);
 }if(coverageLimit(reserved)||occupied.length>MAX_FARM_CHUNKS)throw Error('Farm coverage limit exceeded.');return farms;
}
export function coverageIntersectsRect(coverage,r){
 for(const e of coverage){const [cx,cy]=e,x=Math.max(r.x-cx*32,0),end=Math.min(r.x+r.w-cx*32,32);if(end<=x)continue;const mask=bits(x,end);
  for(let y=Math.max(r.y-cy*32,0);y<Math.min(r.y+r.h-cy*32,32);y++)if(row(e,y)&mask)return true;
 }return false;
}
export function farmPlacementError(game,coverage,id=null){
 if(!game.ship)return 'Land the ship first.';
 const others=game.farms.filter(f=>f.id!==id);
 if(id===null&&others.length>=MAX_FARMS)return 'Prototype limit: 64 farm buildings.';
 let reserved=combineCoverage(game.soil||[],preparedCoverage(game.farms.find(f=>f.id===id)?.work)),occupied=[];
 for(const f of others){reserved=combineCoverage(reserved,f.coverage);occupied=combineCoverage(occupied,f.coverage);}
 reserved=combineCoverage(reserved,coverage);
 if(coverageLimit(reserved))return 'Land limit: 1,048,576 tiles, including prepared ground. Keep scattered fields within 4,096 regions.';
 if(coverageIntersectsRect(coverage,game.ship)||game.sites.some(s=>coverageIntersectsRect(coverage,s)))return 'Allotment overlaps the ship or a building.';
 if(coverageArea(combineCoverage(coverage,occupied,true))!==coverageArea(coverage))return 'These tiles already belong to another farm.';
 return '';
}
export function compileCoverage(coverage){
 let count=0;return [...coverage].sort((a,b)=>a[1]-b[1]||a[0]-b[0]).map(e=>{const prefix=new Uint16Array(33);for(let y=0;y<32;y++)prefix[y+1]=prefix[y]+popcount(row(e,y));const c={cx:e[0],cy:e[1],rows:e.length===2?null:e[2],prefix,start:count,count:prefix[32]};count+=c.count;return c;});
}
export function preparedRow(c,y,count){
 const value=c.rows?c.rows[y]:0xffffffff,n=count-c.prefix[y];if(n<=0)return 0;if(n>=popcount(value))return value;
 let kept=0,rest=value;for(let i=0;i<n;i++){const bit=rest&-rest;kept|=bit;rest^=bit;}return kept>>>0;
}
export class FarmIndex{
 constructor(farms,soil=[]){this.byChunk=new Map();this.fields=new Map();this.soilEntries=compileCoverage(soil);const sources=[{id:0,coverage:soil,area:coverageArea(soil),progress:1},...farms.filter(f=>f.work).map(f=>({id:f.id,...f.work,source:f.work}))];for(const farm of sources){const entries=compileCoverage(farm.coverage);this.fields.set(farm.id,{farm:farm.source||farm,entries});for(const c of entries){const k=key(c.cx,c.cy);if(!this.byChunk.has(k))this.byChunk.set(k,[]);this.byChunk.get(k).push({farm:farm.source||farm,c});}}}
 isPrepared(x,y){const cx=Math.floor(x/32),cy=Math.floor(y/32),lx=x-cx*32,ly=y-cy*32;for(const{farm,c}of this.byChunk.get(key(cx,cy))||[]){const count=Math.floor(farm.area*farm.progress+1e-7)-c.start;if(count>0&&(preparedRow(c,ly,count)&(1<<lx)))return true;}return false;}
 entryAt(id,count){const entries=this.fields.get(id).entries;let lo=0,hi=entries.length;while(lo<hi){const mid=(lo+hi)>>1;if(entries[mid].start+entries[mid].count<=count)lo=mid+1;else hi=mid;}return {entries,index:lo,c:entries[lo]};}
 changed(world,id,before,after){const{entries,index}=this.entryAt(id,before);for(let i=index;i<entries.length&&entries[i].start<after;i++)world.state.markChunkChanged(entries[i].cx,entries[i].cy);}
 sectionEnd(id,count){const{c}=this.entryAt(id,count);return c.start+c.count;}
 target(id,count=0){const{c}=this.entryAt(id,count);const local=count-c.start;let y=0;while(c.prefix[y+1]<=local)y++;const v=((c.rows?c.rows[y]:0xffffffff)&~preparedRow(c,y,local))>>>0;return{x:c.cx*32+31-Math.clz32((v&-v)>>>0)+.5,y:c.cy*32+y+.5};}
}
export function bindFarms(world,game){world.farmCoverage=new FarmIndex(game?.farms||[],game?.soil||[]);return world.farmCoverage;}
// A swept square brush is rasterized into row spans in one bounded mask pass.
export function brushCoverage(coverage,a,b,size,erase=false){
 if(!Number.isInteger(size)||size<1||size>1024||![a.x,a.y,b.x,b.y].every(n=>Number.isSafeInteger(n)&&Math.abs(n)<=1e9))return{error:'Invalid brush position.'};
 const dx=b.x-a.x,dy=b.y-a.y;
 if(Math.max(Math.abs(dx),Math.abs(dy))>8192)return{error:'Stroke limit: 8,192 m per movement. Zoom in or use shorter strokes.'};
 const half=Math.floor(size/2);
 if(Math.min(a.x,b.x)-half < -1e9 || Math.min(a.y,b.y)-half < -1e9 || Math.max(a.x,b.x)-half+size>1e9 || Math.max(a.y,b.y)-half+size>1e9)return{error:'Brush reaches the world-coordinate limit.'};
 const map=new Map(),put=(x,y,end)=>{
  const cy=Math.floor(y/32),ly=y-cy*32;
  for(let cx=Math.floor(x/32);cx<=Math.floor((end-1)/32);cx++){
   const k=key(cx,cy);let e=map.get(k);if(!e){e=[cx,cy,Array(32).fill(0)];map.set(k,e);}e[2][ly]=(e[2][ly]|bits(Math.max(0,x-cx*32),Math.min(32,end-cx*32)))>>>0;
  }
 };
 for(let y=Math.min(a.y,b.y)-half;y<Math.max(a.y,b.y)-half+size;y++){
  let t0=0,t1=1;
  if(dy){const u=(y+half-size+1-a.y)/dy,v=(y+half-a.y)/dy;t0=Math.max(0,Math.min(u,v));t1=Math.min(1,Math.max(u,v));}
  const x0=a.x+dx*t0,x1=a.x+dx*t1;put(Math.floor(Math.min(x0,x1))-half,y,Math.ceil(Math.max(x0,x1))-half+size);
  if(map.size>MAX_FARM_CHUNKS)return{error:'Stroke spans too many regions. Use a shorter stroke.'};
 }
 const patch=[...map.values()].map(e=>e[2].every(v=>v===0xffffffff)?e.slice(0,2):e),result=combineCoverage(coverage,patch,erase);
 if(coverageLimit(result))return{error:'Allotment limit: 1,048,576 tiles / 4,096 regions.'};
 return{coverage:result,area:coverageArea(result)};
}
