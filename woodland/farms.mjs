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
export function validateFarms(farms){
 if(!Array.isArray(farms)||farms.length>MAX_FARMS)throw Error('Invalid farm list.');
 let total=0,chunks=0;const ids=new Set(),occupied=new Map();
 for(const farm of farms){
  if(!Number.isInteger(farm.id)||farm.id<1||ids.has(farm.id)||!Number.isFinite(farm.progress)||farm.progress<0||farm.progress>1||!Array.isArray(farm.coverage)||!farm.coverage.length)throw Error('Invalid farm.');ids.add(farm.id);
  const seen=new Set();for(const e of farm.coverage){
   if(!Array.isArray(e)||![2,3].includes(e.length)||!Number.isInteger(e[0])||!Number.isInteger(e[1])||Math.abs(e[0])>31250000||Math.abs(e[1])>31250000||(e.length===3&&(!Array.isArray(e[2])||e[2].length!==32||!e[2].every(v=>Number.isInteger(v)&&v>=0&&v<=0xffffffff)||e[2].every(v=>v===0))))throw Error('Invalid farm coverage.');
   const k=key(e[0],e[1]);if(seen.has(k))throw Error('Duplicate farm region.');seen.add(k);
   const prior=occupied.get(k)||Array(32).fill(0);for(let y=0;y<32;y++){if(prior[y]&row(e,y))throw Error('Saved farms overlap.');prior[y]=(prior[y]|row(e,y))>>>0;}occupied.set(k,prior);
  }
  const area=coverageArea(farm.coverage);if(farm.area!==area)throw Error('Invalid farm area.');total+=area;chunks+=farm.coverage.length;
 }
 if(total>MAX_FARM_TILES||chunks>MAX_FARM_CHUNKS)throw Error('Farm coverage limit exceeded.');return farms;
}
export function coverageIntersectsRect(coverage,r){
 for(const e of coverage){const [cx,cy]=e,x=Math.max(r.x-cx*32,0),end=Math.min(r.x+r.w-cx*32,32);if(end<=x)continue;const mask=bits(x,end);
  for(let y=Math.max(r.y-cy*32,0);y<Math.min(r.y+r.h-cy*32,32);y++)if(row(e,y)&mask)return true;
 }return false;
}
export function farmPlacementError(game,coverage){
 const area=coverageArea(coverage);if(!area)return 'Add some tiles to the farm first.';
 if(game.farms.length>=MAX_FARMS||game.farms.reduce((n,f)=>n+f.area,0)+area>MAX_FARM_TILES||game.farms.reduce((n,f)=>n+f.coverage.length,0)+coverage.length>MAX_FARM_CHUNKS)return 'Prototype limit: 64 farms, 1,048,576 tiles and 4,096 regions total.';
 if(coverageIntersectsRect(coverage,game.ship)||game.sites.some(s=>coverageIntersectsRect(coverage,s)))return 'Farm tiles overlap the ship or a building.';
 const existing=new Map();for(const f of game.farms)for(const e of f.coverage){const k=key(e[0],e[1]);if(!existing.has(k))existing.set(k,[]);existing.get(k).push(e);}
 for(const e of coverage)for(const other of existing.get(key(e[0],e[1]))||[])for(let y=0;y<32;y++)if(row(e,y)&row(other,y))return 'Farm tiles overlap another farm.';
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
 constructor(farms){this.byChunk=new Map();this.fields=new Map();for(const farm of farms){const entries=compileCoverage(farm.coverage);this.fields.set(farm.id,{farm,entries});for(const c of entries){const k=key(c.cx,c.cy);if(!this.byChunk.has(k))this.byChunk.set(k,[]);this.byChunk.get(k).push({farm,c});}}}
 isPrepared(x,y){const cx=Math.floor(x/32),cy=Math.floor(y/32),lx=x-cx*32,ly=y-cy*32;for(const{farm,c}of this.byChunk.get(key(cx,cy))||[]){const count=Math.floor(farm.area*farm.progress+1e-7)-c.start;if(count>0&&(preparedRow(c,ly,count)&(1<<lx)))return true;}return false;}
 entryAt(id,count){const entries=this.fields.get(id).entries;let lo=0,hi=entries.length;while(lo<hi){const mid=(lo+hi)>>1;if(entries[mid].start+entries[mid].count<=count)lo=mid+1;else hi=mid;}return {entries,index:lo,c:entries[lo]};}
 changed(world,id,before,after){const{entries,index}=this.entryAt(id,before);for(let i=index;i<entries.length&&entries[i].start<after;i++)world.state.markChunkChanged(entries[i].cx,entries[i].cy);}
 sectionEnd(id,count){const{c}=this.entryAt(id,count);return c.start+c.count;}
 target(id,count=0){const{c}=this.entryAt(id,count);const local=count-c.start;let y=0;while(c.prefix[y+1]<=local)y++;const v=((c.rows?c.rows[y]:0xffffffff)&~preparedRow(c,y,local))>>>0;return{x:c.cx*32+31-Math.clz32((v&-v)>>>0)+.5,y:c.cy*32+y+.5};}
}
export function bindFarms(world,game){world.farmCoverage=new FarmIndex(game?.farms||[]);return world.farmCoverage;}
