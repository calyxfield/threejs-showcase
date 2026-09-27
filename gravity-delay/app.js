(function () {
'use strict';
const $ = id => document.getElementById(id);
const sim = new GravitySimulation();
window.gravitySimulation = sim;
const canvas = $('orbit'), ctx = canvas.getContext('2d');
const chart = $('chart'), cx = chart.getContext('2d');
const colors = ['#7cd6ef', '#f8bf73'];
let paused = false, lastFrame = null, accumulator = 0, scale = null, width = 0, height = 0;
let history = [], lastSample = -1, speed = 1;
const energy0=sim.energy();
let activeSamples=null;
function fitCanvas(c) {
  const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
  if (c.width !== Math.round(r.width*d) || c.height !== Math.round(r.height*d)) {
    c.width = Math.round(r.width*d); c.height = Math.round(r.height*d);
  }
  const context = c.getContext('2d'); context.setTransform(d,0,0,d,0,0);
  return [r.width, r.height];
}
function delayChanged(value) {
  sim.setDelay(Number(value));
  $('delay').value = String(sim.delay);
  $('delayValue').innerHTML = sim.delay.toFixed(2) + ' <small>s</small>';
  $('delay').setAttribute('aria-valuetext',sim.delay.toFixed(2)+' simulated seconds');
  document.querySelectorAll('[data-delay]').forEach(b => b.setAttribute('aria-pressed',String(Number(b.dataset.delay)===sim.delay)));
  render();
}
$('delay').addEventListener('input', e => delayChanged(e.target.value));
document.querySelectorAll('[data-delay]').forEach(b => b.addEventListener('click', () => delayChanged(b.dataset.delay)));
$('pause').addEventListener('click', () => {paused=!paused; updateStatus();});
function resetView() {
  history=[]; lastSample=-1; accumulator=0; scale=null;
  $('error').hidden=true; record(); render(); updateStatus();
}
function resetOrbit(){sim.reset();resetView();}
$('reset').addEventListener('click',resetOrbit);
$('errorReset').addEventListener('click',resetOrbit);
function showError(e) {
  paused=true;$('error').hidden=false;$('errorText').textContent=e.message;updateStatus();
}
document.querySelectorAll('input[name="mode"]').forEach(input=>input.addEventListener('change',()=>{
  if(!input.checked)return;
  sim.setMode(input.value);
  const propagation=sim.mode==='propagation';
  $('fixedControls').hidden=propagation;$('propagationControls').hidden=!propagation;$('travelReadout').hidden=!propagation;
  $('controlsHelp').textContent=propagation?'Delay follows signal travel time. Change c live; Reset restarts the orbit.':'The slider changes the force live. Reset restarts the orbit with your selected delay.';
  resetView();
}));
function propagationChanged(c){
  sim.setPropagationSpeed(c);
  $('propagationSpeed').value=String(100*Math.log(c/2)/Math.log(50));
  $('propagationValue').innerHTML=c.toFixed(1)+' <small>units/s</small>';
  $('propagationSpeed').setAttribute('aria-valuetext',c.toFixed(2)+' distance units per simulated second');
  document.querySelectorAll('[data-speed]').forEach(b=>b.setAttribute('aria-pressed',String(Math.abs(Number(b.dataset.speed)-c)<1e-9)));
  $('error').hidden=true;render();
}
$('propagationSpeed').addEventListener('input',e=>propagationChanged(2*Math.pow(50,Number(e.target.value)/100)));
document.querySelectorAll('[data-speed]').forEach(b=>b.addEventListener('click',()=>propagationChanged(Number(b.dataset.speed))));
const minTimeStep=1/2400,maxTimeStep=.05,defaultTimeStep=1/600;
function updateTimeStepControl(){
  $('timeStep').value=String(100*Math.log(sim.dt/minTimeStep)/Math.log(maxTimeStep/minTimeStep));
  $('timeStepValue').textContent=sim.dt.toFixed(6)+' s';
  $('timeStep').setAttribute('aria-valuetext',sim.dt.toFixed(6)+' simulated seconds maximum step');
}
function timeStepChanged(dt){
  if(dt===sim.dt)return;
  sim.setTimeStep(dt);updateTimeStepControl();resetView();
}
$('timeStep').addEventListener('input',e=>timeStepChanged(Math.min(maxTimeStep,Math.max(minTimeStep,minTimeStep*Math.pow(maxTimeStep/minTimeStep,Number(e.target.value)/100)))));
$('defaultStep').addEventListener('click',()=>timeStepChanged(defaultTimeStep));
updateTimeStepControl();
$('speed').addEventListener('change', e => {speed=Number(e.target.value); accumulator=0;});
['ghosts','forces','trails','velocity'].forEach(id => $(id).addEventListener('change',render));
function updateStatus() {
  $('pause').textContent=paused?'Resume':'Pause';
  $('status').textContent=paused?'Ⅱ PAUSED':'● RUNNING';
  $('status').style.color=paused?'#e2c99d':'#98d6b4';
}
function record() {
  if(sim.t-lastSample < .04 && lastSample>=0) return;
  history.push({t:sim.t,p:sim.positions.map(p=>p.slice()),s:Math.hypot(sim.positions[0][0]-sim.positions[1][0],sim.positions[0][1]-sim.positions[1][1])/2});
  lastSample=sim.t;
  while(history.length && history[0].t < sim.t-30) history.shift();
}
function world(p) {return [width/2+p[0]*scale,height/2-p[1]*scale];}
function circle(x,y,r,stroke,fill,line=1) {
  ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.lineWidth=line;
  if(fill){ctx.fillStyle=fill;ctx.fill();} if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}
}
function niceSpacing(wanted) {
  const p=Math.pow(10,Math.floor(Math.log10(wanted))), v=wanted/p;
  return (v<2?2:v<5?5:10)*p;
}
function drawPlot() {
  [width,height]=fitCanvas(canvas);
  if(!width||!height)return;
  ctx.clearRect(0,0,width,height);
  const past=activeSamples?[activeSamples[1].position,activeSamples[0].position]:sim.positions;
  const hasDelay=activeSamples&&activeSamples.some(x=>x.delay>1e-8);
  let extent=1.35;
  const envelope=p=>{extent=Math.max(extent,Math.abs(p[0]),Math.abs(p[1]));};
  sim.positions.forEach(envelope); if($('ghosts').checked)past.forEach(envelope);
  if($('trails').checked)history.forEach(x=>x.p.forEach(envelope));
  const target=Math.min(width-110,height-128)/(2*extent*1.15);
  if(scale===null)scale=target;else scale+=(target-scale)*(target<scale?.14:.06);
  // Ensure the current objects always fit, even after a close encounter.
  const bodiesExtent=Math.max(1.35,...sim.positions.flatMap(p=>p.map(Math.abs)));
  scale=Math.min(scale,Math.min(width-70,height-90)/(2*bodiesExtent));
  const gridStep=niceSpacing(75/scale), pixels=gridStep*scale;
  ctx.strokeStyle='#233239';ctx.lineWidth=.6;ctx.beginPath();
  for(let x=width/2 % pixels;x<width;x+=pixels){ctx.moveTo(x,42);ctx.lineTo(x,height-34);}
  for(let y=height/2 % pixels;y<height-34;y+=pixels){if(y>=42){ctx.moveTo(0,y);ctx.lineTo(width,y);}}
  ctx.stroke();
  ctx.setLineDash([3,6]);circle(width/2,height/2,scale,'#40505a',null);ctx.setLineDash([]);
  ctx.strokeStyle='#647a7e';ctx.beginPath();ctx.moveTo(width/2-4,height/2);ctx.lineTo(width/2+4,height/2);ctx.moveTo(width/2,height/2-4);ctx.lineTo(width/2,height/2+4);ctx.stroke();
  if($('trails').checked && history.length>1){
    for(let body=0;body<2;body++){
      const segments=8;
      for(let part=0;part<segments;part++){
        const start=Math.floor(part*(history.length-1)/segments),end=Math.floor((part+1)*(history.length-1)/segments);
        ctx.beginPath();for(let k=start;k<=end;k++){const [x,y]=world(history[k].p[body]);if(k===start)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
        ctx.strokeStyle=colors[body];ctx.globalAlpha=.1+.65*(part+1)/segments;ctx.lineWidth=1.7;ctx.stroke();
      }
    }ctx.globalAlpha=1;
  }
  if($('forces').checked && activeSamples){
    sim.positions.forEach((p,i)=>{
      const [x,y]=world(p),[tx,ty]=world(past[1-i]),dist=Math.hypot(tx-x,ty-y);
      if(dist<1)return;
      const dx=(tx-x)/dist,dy=(ty-y)/dist,len=Math.min(62,dist*.55);
      ctx.globalAlpha=.5;ctx.strokeStyle='#e5ece1';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(x+dx*14,y+dy*14);ctx.lineTo(x+dx*len,y+dy*len);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x+dx*len,y+dy*len);ctx.lineTo(x+dx*(len-6)-dy*3,y+dy*(len-6)+dx*3);ctx.lineTo(x+dx*(len-6)+dy*3,y+dy*(len-6)-dx*3);ctx.closePath();ctx.fillStyle='#e5ece1';ctx.fill();ctx.globalAlpha=1;
      if(hasDelay && $('ghosts').checked){ctx.globalAlpha=.16;ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(x+dx*len,y+dy*len);ctx.lineTo(tx,ty);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}
    });
  }
  if($('ghosts').checked && hasDelay){
    past.forEach((p,i)=>{const[x,y]=world(p);ctx.globalAlpha=.7;circle(x,y,10,colors[i],null,1.4);circle(x,y,2,null,colors[i]);ctx.globalAlpha=1;});
  }
  if($('velocity').checked){
    const multiplier=Math.min(100,85/Math.max(.001,...sim.velocities.map(v=>Math.hypot(...v))));
    sim.positions.forEach((p,i)=>{
      const[x,y]=world(p),v=sim.velocities[i],vx=v[0]*multiplier,vy=-v[1]*multiplier,l=Math.hypot(vx,vy);
      if(l<10)return;
      const dx=vx/l,dy=vy/l;
      ctx.strokeStyle=colors[i];ctx.fillStyle=colors[i];ctx.globalAlpha=.9;ctx.lineWidth=1.6;
      ctx.beginPath();ctx.moveTo(x+dx*10,y+dy*10);ctx.lineTo(x+vx,y+vy);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x+vx,y+vy);ctx.lineTo(x+vx-dx*7-dy*3.5,y+vy-dy*7+dx*3.5);ctx.lineTo(x+vx-dx*7+dy*3.5,y+vy-dy*7-dx*3.5);ctx.closePath();ctx.fill();ctx.globalAlpha=1;
    });
  }
  sim.positions.forEach((p,i)=>{
    const[x,y]=world(p);const glow=ctx.createRadialGradient(x,y,1,x,y,27);glow.addColorStop(0,colors[i]+'35');glow.addColorStop(1,colors[i]+'00');circle(x,y,27,null,glow);
    circle(x,y,8,'#10191f',colors[i],2);ctx.font='11px ui-monospace,monospace';ctx.fillStyle=colors[i];ctx.fillText(i===0?'A':'B',x+13,y-11);
  });
  $('scale').textContent='GRID '+Number(gridStep.toPrecision(3))+' UNITS · AUTO FIT';
}
function drawChart() {
  const [w,h]=fitCanvas(chart);cx.clearRect(0,0,w,h);if(!history.length)return;
  const values=history.map(s=>s.s),lo=Math.min(.9,...values),hi=Math.max(1.1,...values),pad=(hi-lo)*.1;
  const y=v=>h-6-(v-lo+pad)/(hi-lo+2*pad)*(h-12);
  cx.setLineDash([3,4]);cx.strokeStyle='#b1beb3';cx.beginPath();cx.moveTo(0,y(1));cx.lineTo(w,y(1));cx.stroke();cx.setLineDash([]);
  cx.strokeStyle='#257b85';cx.lineWidth=1.6;cx.beginPath();
  const start=Math.max(0,sim.t-30),span=Math.max(30,sim.t-start);
  history.forEach((s,i)=>{const px=(s.t-start)/span*w,py=y(s.s);if(i===0)cx.moveTo(px,py);else cx.lineTo(px,py);});cx.stroke();
  cx.fillStyle='#637567';cx.font='9px ui-monospace,monospace';cx.fillText('1×',3,Math.max(9,y(1)-3));
}
function signed(x){return (x>=0?'+':'−')+Math.abs(x).toFixed(3);}
function render(){
  try{activeSamples=sim.forceSamples();}catch(e){activeSamples=null;showError(e);}
  drawPlot();drawChart();$('time').textContent=sim.t.toFixed(2);
  $('separation').textContent=(Math.hypot(sim.positions[0][0]-sim.positions[1][0],sim.positions[0][1]-sim.positions[1][1])/2).toFixed(3);
  $('energyChange').textContent=signed((sim.energy()-energy0)/Math.abs(energy0));
  $('velocityA').textContent=sim.velocities[0].map(signed).join(', ');$('velocityB').textContent=sim.velocities[1].map(signed).join(', ');
  $('travelDelays').textContent=activeSamples?activeSamples.map(s=>s.delay.toFixed(3)+' s').join(' / '):'—';
}
function tick(now) {
  const elapsed=lastFrame===null?0:Math.min(.1,(now-lastFrame)/1000);lastFrame=now;
  if(!paused){
    accumulator+=elapsed*speed;
    try{while(accumulator>=sim.dt){sim.step();accumulator-=sim.dt;record();}}
    catch(e){showError(e);}
  }
  render();requestAnimationFrame(tick);
}
document.addEventListener('visibilitychange',()=>{lastFrame=null;accumulator=0;});
$('period').textContent=sim.period.toFixed(2);record();requestAnimationFrame(tick);
})();
