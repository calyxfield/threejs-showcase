(function () {
'use strict';
const $=id=>document.getElementById(id), sim=window.gravitySimulation;
const colors=['#276f78','#b56624','#895589','#315f9b'];
const dashes=[[],[8,4],[3,3],[10,3,2,3]];
let worker=null, result=null, snapshot=null;
const number=x=>Math.abs(x)!==0&&(Math.abs(x)<.001||Math.abs(x)>=10000)?x.toExponential(3):x.toFixed(4);
const step=x=>Number(x.toPrecision(6)).toString();
const signed=x=>(x>=0?'+':'−')+number(Math.abs(x));
function settings(){return {dt:sim.dt,mode:sim.mode,delay:sim.delay,propagationSpeed:sim.propagationSpeed,duration:Number($('analysisDuration').value)};}
function context(s){return (s.mode==='fixed'?'Fixed delay '+s.delay.toFixed(2)+' s':'Finite speed c = '+s.propagationSpeed.toFixed(2)+' units/s')+' · selected Δt = '+step(s.dt)+' s · t = 0–'+s.duration+' s';}
function changed(){
 if(!snapshot)return;
 const now=settings();
 $('analysisStale').hidden=now.dt===snapshot.dt&&now.mode===snapshot.mode&&now.duration===snapshot.duration&&(now.mode==='fixed'?now.delay===snapshot.delay:now.propagationSpeed===snapshot.propagationSpeed);
}
function busy(isBusy){$('runAnalysis').disabled=isBusy;$('analysisDuration').disabled=isBusy;$('analysisStatus').hidden=!isBusy;}
function stop(){if(worker){worker.terminate();worker=null;}busy(false);}
function fail(message){stop();$('analysisError').textContent=message;$('analysisError').hidden=false;}
function start(){
 stop();snapshot=settings();result=null;window.gravityAnalysisResult=null;
 $('analysisError').hidden=true;$('analysisResult').hidden=true;$('analysisStale').hidden=true;
 $('analysisProgress').value=0;$('analysisProgressText').textContent='Starting four runs…';busy(true);
 try{
  worker=new Worker('analysis-worker.js?v=20260927b');
  worker.onmessage=event=>{
   const data=event.data;
   if(data.type==='progress'){
    $('analysisProgress').value=(data.runIndex+data.progress)/4;
    $('analysisProgressText').textContent='Run '+(data.runIndex+1)+' / 4 · '+Math.round(data.progress*100)+'%';
   }else if(data.type==='complete'){
    result=data.result;window.gravityAnalysisResult=result;stop();showResult();changed();
   }else if(data.type==='error')fail('Analysis stopped. '+data.message);
  };
  worker.onerror=()=>fail('Analysis could not run. Reload the page and try again. For a downloaded copy, open it through a local web server.');
  worker.postMessage({type:'start',settings:snapshot});
 }catch(e){fail('Analysis could not start. '+e.message);}
}
$('runAnalysis').addEventListener('click',start);
$('cancelAnalysis').addEventListener('click',()=>fail('Analysis cancelled.'));
['delay','propagationSpeed','timeStep'].forEach(id=>$(id).addEventListener('input',changed));
$('analysisDuration').addEventListener('change',changed);
document.querySelectorAll('input[name="mode"]').forEach(el=>el.addEventListener('change',changed));
document.querySelectorAll('[data-delay],[data-speed],#defaultStep').forEach(el=>el.addEventListener('click',changed));
function showResult(){
 $('analysisResult').hidden=false;$('analysisContext').textContent=context(result.settings);
 const runs=result.runs,ref=runs[result.referenceIndex];
 $('analysisSummary').textContent='Selected step vs finest: maximum position gap '+number(runs[0].maxPositionDifference)+' units. At half the selected step: '+number(runs[1].maxPositionDifference)+' units. Finest comparison step: '+step(ref.dt)+' s.';
 $('analysisLegend').replaceChildren();$('analysisRows').replaceChildren();
 runs.forEach((run,i)=>{
  const label=i===0?'Selected Δt':'Δt/'+Math.pow(2,i);
  const legend=document.createElement('span'),key=document.createElement('i');
  key.className='analysis-key';key.style.borderColor=colors[i];if(i>0)key.style.borderTopStyle=i===2?'dotted':'dashed';
  legend.append(key,document.createTextNode(label+(i===result.referenceIndex?' · reference':'')));$('analysisLegend').append(legend);
  const end=run.series[run.series.length-1],tr=document.createElement('tr');
  [step(run.dt),number(end.separation/2),signed(end.energyChange),i===result.referenceIndex?'reference':number(run.maxPositionDifference)].forEach((value,j)=>{
   const td=document.createElement('td');td.textContent=value;
   if(j===0){const small=document.createElement('small');small.textContent=label;small.style.color=colors[i];td.append(small);}
   tr.append(td);
  });$('analysisRows').append(tr);
 });
 draw();
}
function setup(canvas){
 const rect=canvas.getBoundingClientRect(),ratio=Math.min(2,window.devicePixelRatio||1);
 canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);
 const ctx=canvas.getContext('2d');ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,rect.width,rect.height);
 ctx.font='10px ui-monospace, monospace';return {ctx,w:rect.width,h:rect.height};
}
function axes(ctx,w,h,xlo,xhi,ylo,yhi,xlabel){
 const box={left:54,right:w-12,top:12,bottom:h-31};
 const x=v=>box.left+(v-xlo)/(xhi-xlo)*(box.right-box.left),y=v=>box.bottom-(v-ylo)/(yhi-ylo)*(box.bottom-box.top);
 ctx.lineWidth=.7;ctx.strokeStyle='#d7ddd2';ctx.fillStyle='#5f706a';
 for(let i=0;i<=4;i++){
  const xv=xlo+(xhi-xlo)*i/4,yv=ylo+(yhi-ylo)*i/4;
  ctx.beginPath();ctx.moveTo(x(xv),box.top);ctx.lineTo(x(xv),box.bottom);ctx.moveTo(box.left,y(yv));ctx.lineTo(box.right,y(yv));ctx.stroke();
  ctx.textAlign='center';ctx.fillText(tick(xv),x(xv),box.bottom+14);
  ctx.textAlign='right';ctx.fillText(tick(yv),box.left-6,y(yv)+3);
 }
 ctx.textAlign='right';ctx.fillText(xlabel,box.right,h-1);ctx.textAlign='left';
 return {x,y,box};
}
function tick(x){if(Math.abs(x)<1e-12)return '0';return Math.abs(x)<.001||Math.abs(x)>=10000?x.toExponential(1):Number(x.toPrecision(3)).toString();}
function traces(ctx,coords,pairs){
 ctx.save();ctx.beginPath();ctx.rect(coords.box.left,coords.box.top,coords.box.right-coords.box.left,coords.box.bottom-coords.box.top);ctx.clip();
 pairs.forEach((points,i)=>{ctx.strokeStyle=colors[i];ctx.lineWidth=i===0?2.6:1.6;ctx.setLineDash(dashes[i]);ctx.beginPath();points.forEach(([x,y],j)=>{if(j===0)ctx.moveTo(coords.x(x),coords.y(y));else ctx.lineTo(coords.x(x),coords.y(y));});ctx.stroke();});
 ctx.restore();
}
function draw(){
 if(!result||$('analysisResult').hidden)return;
 const runs=result.runs;
 {
  const {ctx,w,h}=setup($('analysisOrbit'));let xmin=Infinity,xmax=-Infinity,ymin=Infinity,ymax=-Infinity;
  runs.forEach(run=>run.series.forEach(s=>{const [x,y]=s.positions[0];xmin=Math.min(xmin,x);xmax=Math.max(xmax,x);ymin=Math.min(ymin,y);ymax=Math.max(ymax,y);}));
  const unitsPerPixel=1.15*Math.max(Math.max(.1,xmax-xmin)/(w-66),Math.max(.1,ymax-ymin)/(h-43));
  const centerX=(xmin+xmax)/2,centerY=(ymin+ymax)/2,xextent=(w-66)*unitsPerPixel/2,yextent=(h-43)*unitsPerPixel/2;
  const xy=axes(ctx,w,h,centerX-xextent,centerX+xextent,centerY-yextent,centerY+yextent,'x');
  traces(ctx,xy,runs.map(run=>run.series.map(s=>s.positions[0])));
  ctx.fillStyle='#53675e';ctx.fillText('y',6,11);
 }
 {
  const {ctx,w,h}=setup($('analysisEnergy'));let lo=0,hi=0;
  runs.forEach(run=>run.series.forEach(s=>{lo=Math.min(lo,s.energyChange);hi=Math.max(hi,s.energyChange);}));
  const margin=Math.max((hi-lo)*.12,1e-10);lo-=margin;hi+=margin;
  const xy=axes(ctx,w,h,0,result.settings.duration,lo,hi,'time (s)');
  traces(ctx,xy,runs.map(run=>run.series.map(s=>[s.t,s.energyChange])));
 }
}
window.addEventListener('resize',draw);
})();
