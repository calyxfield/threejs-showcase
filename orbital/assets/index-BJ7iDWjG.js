(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=(e=0,t=0,n=0)=>new Float64Array([e,t,n]),t=(t,n)=>e(t[0]+n[0],t[1]+n[1],t[2]+n[2]),n=(t,n)=>e(t[0]-n[0],t[1]-n[1],t[2]-n[2]),r=(t,n)=>e(t[0]*n,t[1]*n,t[2]*n),i=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],a=(t,n)=>e(t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]),o=e=>Math.hypot(...e),s=e=>r(e,1/(o(e)||1)),c=(e,t,n)=>Math.max(t,Math.min(n,e)),l=e=>(e%(Math.PI*2)+Math.PI*2)%(Math.PI*2),u=()=>new Float64Array([0,0,0,1]),d=e=>{let t=Math.hypot(...e);return new Float64Array(e.map(e=>e/t))};function f(e,t){return new Float64Array([e[3]*t[0]+e[0]*t[3]+e[1]*t[2]-e[2]*t[1],e[3]*t[1]-e[0]*t[2]+e[1]*t[3]+e[2]*t[0],e[3]*t[2]+e[0]*t[1]-e[1]*t[0]+e[2]*t[3],e[3]*t[3]-e[0]*t[0]-e[1]*t[1]-e[2]*t[2]])}function p(e,t){let n=Math.sin(t/2);return new Float64Array([e[0]*n,e[1]*n,e[2]*n,Math.cos(t/2)])}function m(e,n){let i=e.slice(0,3),o=r(a(i,n),2);return t(n,t(r(o,e[3]),a(i,o)))}var h=(e,t)=>m(new Float64Array([-e[0],-e[1],-e[2],e[3]]),t);function g(e,t=[0,1,0]){let n=r(s(e),-1),i=a(t,n);o(i)<1e-8&&(i=a([0,0,1],n)),i=s(i);let c=a(n,i),l=i[0],u=c[0],f=n[0],p=i[1],m=c[1],h=n[1],g=i[2],_=c[2],v=n[2],y=l+m+v,b;if(y>0){let e=Math.sqrt(y+1)*2;b=[(_-h)/e,(f-g)/e,(p-u)/e,e/4]}else if(l>m&&l>v){let e=Math.sqrt(1+l-m-v)*2;b=[e/4,(u+p)/e,(f+g)/e,(_-h)/e]}else if(m>v){let e=Math.sqrt(1+m-l-v)*2;b=[(u+p)/e,e/4,(h+_)/e,(f-g)/e]}else{let e=Math.sqrt(1+v-l-m)*2;b=[(f+g)/e,(h+_)/e,e/4,(p-u)/e]}return d(b)}function _(t,n){return e(t[0]*n[0]+t[1]*n[1]+t[2]*n[2],t[3]*n[0]+t[4]*n[1]+t[5]*n[2],t[6]*n[0]+t[7]*n[1]+t[8]*n[2])}function v(t,n){let[i,a,o,s,c,l,u,d,f]=t,p=c*f-l*d,m=o*d-a*f,h=a*l-o*c,g=l*u-s*f,_=i*f-o*u,v=o*s-i*l,y=s*d-c*u,b=a*u-i*d,x=i*c-a*s,S=i*p+a*g+o*y;if(Math.abs(S)<1e-12)throw Error(`Singular inertia tensor`);return r(e(p*n[0]+m*n[1]+h*n[2],g*n[0]+_*n[1]+v*n[2],y*n[0]+b*n[1]+x*n[2]),1/S)}function y(t,n){let i=f(new Float64Array([-t[0],-t[1],-t[2],t[3]]),n);i[3]<0&&(i=new Float64Array(i.map(e=>-e)));let a=2*Math.acos(c(i[3],-1,1)),o=Math.hypot(i[0],i[1],i[2]);return o>1e-10?r(i.slice(0,3),a/o):e()}var b={name:`Aster`,radius:18e4,mu:6e9},x=9.80665;function S(t,n=0,r=b.mu){return{r:e(t*Math.cos(n),0,-t*Math.sin(n)),v:e(-Math.sqrt(r/t)*Math.sin(n),0,-Math.sqrt(r/t)*Math.cos(n))}}var C=(e,t=b.mu)=>r(e,-t/o(e)**3),w=(e,t=b.mu)=>i(e.v,e.v)/2-t/o(e.r);function T(e,t=b.mu){let i=o(e.r),s=a(e.r,e.v),c=n(r(a(e.v,s),1/t),r(e.r,1/i)),l=o(c),u=-t/(2*w(e,t));return{a:u,ecc:l,evec:c,h:s,periapsis:u*(1-l),apoapsis:l<1?u*(1+l):1/0,period:u>0?2*Math.PI*Math.sqrt(u**3/t):1/0}}function E(e){if(Math.abs(e)<=.5){let t=.5,n=1/6,r=t,i=n;for(let a=1;a<=16&&(r*=-e/((2*a+1)*(2*a+2)),i*=-e/((2*a+2)*(2*a+3)),t+=r,n+=i,!(Math.abs(r)<=2**-52*Math.abs(t)&&Math.abs(i)<=2**-52*Math.abs(n)));a++);return{c:t,s:n}}if(e>0){let t=Math.sqrt(e),n=Math.sin(t/2);return{c:2*n*n/e,s:(t-Math.sin(t))/(t*t*t)}}let t=Math.sqrt(-e),n=Math.sinh(t/2);return{c:2*n*n/-e,s:(Math.sinh(t)-t)/(t*t*t)}}function D(n,a,s=b.mu){let c=e=>e?.length===3&&Array.from(e).every(Number.isFinite);if(!c(n?.r)||!c(n?.v)||!Number.isFinite(a)||!Number.isFinite(s)||s<=0)throw Error(`Orbit propagation requires finite 3D state/time and positive finite mu`);let l=o(n.r);if(!Number.isFinite(l)||l<=0)throw Error(`Orbit propagation requires a positive finite radius`);if(a===0)return{r:e(...n.r),v:e(...n.v)};let u=Math.sqrt(s/l),d=l/u,f=r(n.r,1/l),p=r(n.v,1/u),m=2-i(p,p),h=i(f,p);if(!Number.isFinite(d)||d<=0||!Number.isFinite(m)||!Number.isFinite(h))throw Error(`Orbit state exceeds numerical range`);let g=a;if(m>0){let e=2*Math.PI*d/(m*Math.sqrt(m));Number.isFinite(e)&&Math.abs(g)>e/2&&(g%=e,g>e/2&&(g-=e),g<-e/2&&(g+=e))}if(g===0)return{r:e(...n.r),v:e(...n.v)};let _=Math.sign(g),v=Math.abs(g)/d,y=_*h;if(!Number.isFinite(v)||v===0)throw Error(`Orbit interval exceeds numerical range`);function x(e){let t=m*e*e,{c:n,s:r}=E(t),i=e*e*n,a=e*e*e*r,o=y*i,s=(1-m)*a;return{F:o+s+e-v,dF:y*e*(1-t*r)+(1-m)*i+1,u2:i,u3:a,roundoff:8*2**-52*(Math.abs(o)+Math.abs(s)+e+v)}}let S=0,C=Math.min(v,Math.max(1,Math.cbrt(v)*Math.cbrt(6))),w;for(let e=0;e<256&&(w=x(C),!(!Number.isFinite(w.F)||w.F>=0));e++)if(S=C,C*=2,!Number.isFinite(C))throw Error(`Orbit interval exceeds numerical range`);if(Number.isFinite(w.F)&&w.F<0)throw Error(`Orbit root could not be bracketed`);let T=(S+C)/2,D=null;for(let e=0;e<256;e++){let e=x(T),t=8*2**-52*Math.max(1,Math.abs(T));if(Number.isFinite(e.F)&&Number.isFinite(e.dF)&&e.dF>0&&Math.abs(e.F)<=e.roundoff&&Math.abs(e.F/e.dF)<=t){D=e;break}if(!Number.isFinite(e.F)||e.F>0?C=T:S=T,C-S<=t){T=(S+C)/2,D=x(T);break}let n=T-e.F/e.dF;T=Number.isFinite(n)&&e.dF>0&&n>S&&n<C&&Math.abs(n-T)<=(C-S)/2?n:(S+C)/2}if(!D||!Number.isFinite(D.F)||!Number.isFinite(D.u2)||!Number.isFinite(D.u3))throw Error(`Orbit solver did not converge within numerical range`);let{u2:O,u3:k}=D,A=1-O,j=_*(y*O+T-m*k),M=t(r(f,A),r(p,j)),N=o(M);if(!Number.isFinite(N)||N<=0)throw Error(`Orbit propagation reached an unresolved central singularity`);let P=_*(m*k-T)/N,F=1-O/N,I=r(M,l),ee=r(t(r(f,P),r(p,F)),u);if(!c(I)||!c(ee))throw Error(`Orbit result exceeds numerical range`);return{r:I,v:ee}}function O(n,i,{mu:a=b.mu,force:s=e(),exhaustVelocity:c=1/0,dryMass:l=1,massFlow:u=null,externalForce:d=e()}={}){let f=Math.max(0,n.fuel||0),p=l+f,m=o(s),h=u??(m&&Number.isFinite(c)?m/c:0),g=Math.min(f,h*i),_=h>0?g/(h*i):1,v=p-g/2,y=t(r(s,_/v),r(d,1/v)),x=t(C(n.r,a),y),S=t(n.r,t(r(n.v,i),r(x,i*i/2))),w=t(C(S,a),y);return{r:S,v:t(n.v,r(t(x,w),i/2)),fuel:f-g}}function k(e,t,n=b.mu){let r=(e+t)/2,i=Math.PI*Math.sqrt(r**3/n),a=Math.sqrt(n/e),o=Math.sqrt(n/t),s=Math.sqrt(n*(2/e-1/r)),c=Math.sqrt(n*(2/t-1/r));return{a:r,time:i,departure:s-a,arrival:o-c,phase:Math.PI-Math.sqrt(n/t**3)*i}}function A(e,t,n,r,i=b.mu){let a=k(n,r,i),o=Math.sqrt(i/r**3)-Math.sqrt(i/n**3),s=l(t-e),c=l(a.phase);if(Math.abs(o)<1e-12)return 0;let u=(c-s)/o,d=2*Math.PI/Math.abs(o);return u=(u%d+d)%d,u<1e-6||d-u<1e-6?0:u}var j={engine:{id:`engine`,accepts:[`engine`],position:[0,0,7.1],quaternion:[0,0,0,1]},dock:{id:`dock`,accepts:[`dock`],position:[0,0,-7.05],quaternion:[0,0,0,1]},...Object.fromEntries(Array.from({length:6},(e,t)=>[`rack`+t,{id:`rack`+t,accepts:[`tank`,`rack`],position:[t<3?-2.31:2.31,0,-3.5+t%3*3.5],quaternion:[0,0,0,1]}]))},M={core:{name:`Structural core`,kind:`core`,mass:3500,cost:16e3,size:[2.6,2.4,13.2]},courier:{name:`Courier engine pair`,kind:`engine`,mass:1200,cost:12e3,size:[2.2,2.2,1.8],thrust:18e3,isp:360,engineCount:2},hauler:{name:`Hauler engine cluster`,kind:`engine`,mass:1800,cost:19e3,size:[2.2,2.2,1.8],thrust:45e3,isp:300,engineCount:4},endurance:{name:`Endurance engine`,kind:`engine`,mass:1e3,cost:22e3,size:[1.2,1.2,1.8],thrust:9e3,isp:470,engineCount:1},tank:{name:`800 kg propellant tank`,kind:`tank`,mass:180,cost:3200,size:[1.4,1.4,2.8],fuelCapacity:800},rack:{name:`1 tonne cargo rack`,kind:`rack`,mass:220,cost:1800,size:[1.54,2.58,3.04],cargoCapacity:1e3},decoupler:{name:`Radial decoupler`,kind:`coupler`,mass:35,cost:900,size:[.18,2.7,3]},dock:{name:`1.3 m keyed docking collar`,kind:`dock`,mass:250,cost:1800,size:[1.6,1.6,1.4],diameter:1.3}},N=[[-3.3,-2.6,8.8],[-3.3,2.6,8.8],[3.3,-2.6,8.8],[3.3,2.6,8.8]];for(let[e,t]of Object.entries(M))t.id=`part:`+e,t.recipe={id:`recipe:`+e+`:v1`,inputs:[{resourceId:`refined-alloy`,quantity:t.mass*.7,unit:`kg`},{resourceId:`conductive-metals`,quantity:t.mass*.2,unit:`kg`},{resourceId:`industrial-ceramics`,quantity:t.mass*.1,unit:`kg`}]};var P={rcs:{name:`RCS pack`,mass:90,cost:2600,thrust:1e3,isp:260,position:[0,0,0],size:[2.8,2.8,12]},wheels:{name:`Reaction wheel pack`,mass:120,cost:4200,torque:8e3,power:2e3,position:[0,0,1],size:[1.6,1.6,1]},battery:{name:`8 MJ battery`,mass:150,cost:2200,capacity:8e6,position:[0,-.6,0],size:[1.8,.7,2]}};for(let[e,t]of Object.entries(P))t.id=`system:`+e,t.recipe={id:`recipe:system-`+e+`:v1`,inputs:[{resourceId:`refined-alloy`,quantity:t.mass*.7,unit:`kg`},{resourceId:`conductive-metals`,quantity:t.mass*.2,unit:`kg`},{resourceId:`industrial-ceramics`,quantity:t.mass*.1,unit:`kg`}]};function F(e=`design-01`,t=`Courier`){return{version:1,id:e,name:t,coreId:e+`:core`,revision:0,parts:[],couplers:[],stages:[],systems:{rcs:!0,wheels:!0,battery:!0}}}function I(e,t,n){let r=j[t],i=M[n];if(!r)throw Error(`No attachment port `+t);if(!i||!r.accepts.includes(i.kind))throw Error(`That part is incompatible with this port`);if(e.parts.some(e=>e.port===t))throw Error(`Attachment port is occupied`);let a=e.revision+1;return{...e,revision:a,parts:[...e.parts,{id:`${e.id}:${t}:${a}`,part:n,port:t,position:[...r.position],quaternion:[...r.quaternion]}]}}function ee(e,t){if(!e.parts.some(e=>e.port===t))throw Error(`Attachment port is empty`);return{...e,revision:e.revision+1,parts:e.parts.filter(e=>e.port!==t)}}function te(){let e=F(`courier-01`,`Courier 01`);e=I(e,`engine`,`courier`),e=I(e,`dock`,`dock`);for(let t=0;t<6;t++)e=I(e,`rack`+t,t===0||t===3?`tank`:`rack`);return e.revision++,e.stages=[{id:e.id+`:stage:`+e.revision,actions:[{type:`engine`,partId:e.parts.find(e=>e.port===`engine`).id,enabled:!0}]}],e}function ne(e,{flight:t=!1,stages:n=!1}={}){if(e?.version!==1||typeof e.id!=`string`||typeof e.name!=`string`||typeof e.coreId!=`string`||!Number.isInteger(e.revision)||e.revision<0||!Array.isArray(e.parts)||e.parts.length>8)throw Error(`Invalid saved design`);let r=new Set,i=new Set([e.coreId]);for(let t of e.parts){let e=j[t.port],n=M[t.part];if(!e||!n||!e.accepts.includes(n.kind))throw Error(`Disconnected or incompatible saved part`);if(typeof t.id!=`string`||r.has(t.port)||i.has(t.id))throw Error(`Duplicate occupied port or part identity`);if(r.add(t.port),i.add(t.id),!Array.isArray(t.position)||t.position.length!==3||!t.position.every(Number.isFinite)||!Array.isArray(t.quaternion)||t.quaternion.length!==4||!t.quaternion.every(Number.isFinite)||e.position.some((e,n)=>Math.abs(e-t.position[n])>1e-8)||e.quaternion.some((e,n)=>Math.abs(e-t.quaternion[n])>1e-8))throw Error(`Saved part does not match its attachment frame`)}let a=new Set;for(let t of e.couplers||[]){if(typeof t.id!=`string`||i.has(t.id)||a.has(t.port)||!/^rack[0-5]$/.test(t.port))throw Error(`Invalid or duplicate decoupler`);a.add(t.port),i.add(t.id)}if(n){let t=new Set;for(let n of e.stages||[]){if(typeof n.id!=`string`||t.has(n.id)||!Array.isArray(n.actions)||!n.actions.length)throw Error(`Invalid stage identity`);t.add(n.id);for(let t of n.actions)if(t.type===`engine`){if(typeof t.enabled!=`boolean`||!e.parts.some(e=>e.id===t.partId&&M[e.part].kind===`engine`))throw Error(`Stage refers to missing engine`)}else if(t.type===`separate`){let n=(e.couplers||[]).find(e=>e.id===t.partId);if(!n||!e.parts.some(e=>e.port===n.port))throw Error(`Stage refers to empty decoupler`)}else throw Error(`Invalid stage action`)}}if(t){if(!r.has(`engine`))throw Error(`Fit an engine before launch`);if(!r.has(`dock`))throw Error(`Fit a docking collar before launch`);if(!e.parts.some(e=>e.part===`tank`))throw Error(`Fit a propellant tank before launch`)}return!0}function re(e){return ne(e,{stages:!0}),JSON.stringify(e)}function ie(e){let t=JSON.parse(e);return ne(t,{stages:!0}),t}function ae(e,{fuel:t=0,cargoCount:n=0,contents:r=null}={}){ne(e);let i=[...e.parts].sort((e,t)=>e.port.localeCompare(t.port)),a=i.filter(e=>M[e.part].kind===`tank`),o=i.filter(e=>M[e.part].kind===`rack`),s=i.find(e=>M[e.part].kind===`engine`),c=a.reduce((e,t)=>e+M[t.part].fuelCapacity,0),l=o.length*1e3;if(!Number.isFinite(t)||t<0||t>c+1e-7)throw Error(`Propellant exceeds installed tank capacity`);if(!Number.isInteger(n)||n<0||n>o.length)throw Error(`Cargo exceeds installed racks`);let u=[...Object.entries(P).filter(([t])=>e.systems?.[t]!==!1).map(([t,n])=>({id:e.coreId+`:`+t,mass:n.mass,size:n.size,position:n.position})),...(e.couplers||[]).map(e=>({id:e.id,mass:35,size:[.18,2.7,3],position:[j[e.port].position[0]<0?-1.52:1.52,0,j[e.port].position[2]]}))],d=[...u,{id:e.coreId,mass:M.core.mass,size:M.core.size,position:[0,0,0]},...i.map(e=>({id:e.id,mass:M[e.part].mass-(M[e.part].kind===`engine`?80:0),size:M[e.part].size,position:e.position})),...s?N.map((e,t)=>({id:s.id+`:foot:`+t,mass:20,size:[.7,.7,.2],position:[e[0],e[1],e[2]-.1]})):[]];for(let e of a)d.push({id:e.id+`:fuel`,mass:r?r[e.id].fuel:t/c*M[e.part].fuelCapacity,size:M[e.part].size,position:e.position});for(let e of r?o.filter(e=>r[e.id].cargo):o.slice(0,n))d.push({id:e.id+`:cargo`,mass:1e3,size:M[e.part].size,position:e.position});let f=M.core.mass+i.reduce((e,t)=>e+M[t.part].mass,0)+u.reduce((e,t)=>e+t.mass,0),p=f+t+n*1e3,{com:m,inertia:h}=oe(d),g=s?M[s.part]:null;return{dryMass:f,mass:p,cargoMass:n*1e3,cargoCount:n,cargoCapacity:l,fuel:t,fuelCapacity:c,com:m,inertia:h,thrust:g?.thrust||0,isp:g?.isp||0,deltaV:t&&g?g.isp*x*Math.log(p/(p-t)):0,cost:M.core.cost+i.reduce((e,t)=>e+M[t.part].cost,0)+Object.entries(P).filter(([t])=>e.systems?.[t]!==!1).reduce((e,[,t])=>e+t.cost,0)+(e.couplers||[]).length*900,engineCount:g?.engineCount||0,layout:Array.from({length:6},(e,t)=>{let n=i.find(e=>e.port===`rack`+t);return n?M[n.part].kind===`rack`?`cargo`:`tank`:`empty`}),parts:d,wheelTorque:e.systems?.wheels===!1?0:P.wheels.torque,wheelPower:P.wheels.power,batteryCapacity:e.systems?.battery===!1?0:P.battery.capacity,rcsThrust:e.systems?.rcs===!1?0:P.rcs.thrust}}function oe(n){let a=n.reduce((e,t)=>e+t.mass,0);if(!(a>0))throw Error(`An assembly needs positive mass`);let o=r(n.reduce((e,n)=>t(e,r(n.position,n.mass)),e()),1/a),s=new Float64Array(9);for(let e of n){let t=e.position.map((e,t)=>e-o[t]),n=e.mass,[r,a,c]=e.size,l=[n*(a*a+c*c)/12,n*(r*r+c*c)/12,n*(r*r+a*a)/12],u=i(t,t);for(let e=0;e<3;e++)for(let r=0;r<3;r++)s[e*3+r]+=(e===r?l[e]+n*u:0)-n*t[e]*t[r]}return{mass:a,com:o,inertia:s}}function se(e,t){if(!/^rack[0-5]$/.test(t)||!e.parts.some(e=>e.port===t))throw Error(`Fit a tank or cargo module before its decoupler`);if((e.couplers||[]).some(e=>e.port===t))throw Error(`This mount already has a decoupler`);let n=e.revision+1;return{...e,revision:n,couplers:[...e.couplers||[],{id:e.id+`:coupler:`+t+`:`+n,port:t}]}}function L(e){if(!e.debris)return ae(e.design,{fuel:e.fuel,cargoCount:e.cargoCount,contents:e.contents});let t=M[e.module.part],n=[{id:e.module.id,mass:t.mass,size:t.size,position:[0,0,0]}];return e.fuel&&n.push({id:e.module.id+`:fuel`,mass:e.fuel,size:t.size,position:[0,0,0]}),e.cargoCount&&n.push({id:e.module.id+`:cargo`,mass:e.cargoCount*1e3,size:t.size,position:[0,0,0]}),{...oe(n),dryMass:t.mass,cargoMass:e.cargoCount*1e3,cargoCount:e.cargoCount,cargoCapacity:t.cargoCapacity||0,fuel:e.fuel,fuelCapacity:t.fuelCapacity||0,thrust:0,isp:0,deltaV:0,parts:n,wheelTorque:0,batteryCapacity:0,rcsThrust:0}}function ce(e){if(e.contents)return e.contents;let t=e.fuel||0,n=e.cargoCount||0,r=e.design.parts.slice().sort((e,t)=>e.port.localeCompare(t.port)),i=r.filter(e=>e.part===`tank`),a=r.filter(e=>e.part===`rack`),o=i.length*800;return e.contents=Object.fromEntries(r.map(e=>[e.id,{fuel:e.part===`tank`?t/o*800:0,cargo:+(e.part===`rack`&&a.indexOf(e)<n),resourceId:e.part===`rack`?`refined-alloy`:null,unit:`kg`}])),le(e),e.contents}function le(e){return Object.defineProperties(e,{fuel:{enumerable:!0,configurable:!0,get(){return Object.values(this.contents).reduce((e,t)=>e+t.fuel,0)},set(e){let t=this.design.parts.filter(e=>e.part===`tank`).map(e=>e.id),n=t.reduce((e,t)=>e+(this.contents[t]?.fuel||0),0),r=t.length*800;if(!Number.isFinite(e)||e<-1e-6||e>r+1e-6)throw Error(`Invalid physical tank inventory`);let i=Math.min(r,Math.max(0,e)),a=Object.fromEntries(t.map(e=>[e,n>0?i*this.contents[e].fuel/n:i/(t.length||1)])),o=0;for(let e of t)o+=Math.max(0,a[e]-800),a[e]=Math.min(800,a[e]);for(let e of t){let t=Math.min(o,800-a[e]);a[e]+=t,o-=t}if(o>1e-7)throw Error(`Physical tanks cannot hold requested inventory`);for(let e of t)this.contents[e]??={fuel:0,cargo:0},this.contents[e].fuel=a[e]}},cargoCount:{enumerable:!0,configurable:!0,get(){return Object.values(this.contents).reduce((e,t)=>e+t.cargo,0)},set(e){let t=this.design.parts.filter(e=>e.part===`rack`).sort((e,t)=>e.port.localeCompare(t.port));if(!Number.isInteger(e)||e<0||e>t.length)throw Error(`Cargo exceeds physical rack inventory`);t.forEach((t,n)=>{this.contents[t.id]??={fuel:0,cargo:0},this.contents[t.id].cargo=+(n<e)})}}}),e}var ue=[{id:`assembly`,name:`Kepler Assembly`},{id:`outer`,name:`Faraday Depot`},{id:`inner`,name:`Lagrange Foundry`}],de={center:[0,0,45],radiusM:18,maxSpeedMps:.1,maxSpinRadS:.005,maxThrustFraction:.001},fe=e=>ue.some(t=>t.id===e);function pe(e){let n=m(e.q,de.center),r=m(e.q,e.omega);return{r:t(e.r,n),v:t(e.v,a(r,n)),radius:de.radiusM}}function me(e,r,i=e.selected){if(!fe(r))return{available:!1,reason:`Unknown station service`};let s=e.station(r),c=pe(s),l=o(n(i.r,c.r)),u=m(s.q,s.omega),d=t(s.v,a(u,n(i.r,s.r))),f=o(n(i.v,d)),p=o(n(m(i.q,i.omega),u)),h=`Service ready`;return i.debris?h=`A detached module cannot use station handling`:i.joinedId?h=`Undock joined ships before station handling`:i.docked?h=`Release the docking collar to use the service zone`:i.landed||i.frameId!==s.frameId||i.epoch!==e.time?h=`Ship is not at this station`:!Number.isFinite(l)||l>c.radius?h=`Enter this station’s marked service zone`:!Number.isFinite(f)||f>de.maxSpeedMps?h=`Match station velocity below 0.10 m/s`:!Number.isFinite(p)||p>de.maxSpinRadS?h=`Stop relative rotation before handling`:(i.burn||i.throttle>de.maxThrustFraction||(i.visual?.main||0)>de.maxThrustFraction||Object.values(i.visual?.jets||{}).some(e=>e>de.maxThrustFraction))&&(h=`Cut thrust and let the thrusters stop before handling`),{available:h===`Service ready`,reason:h,siteId:r,range:l,speed:f,spin:p,zone:c}}function he(e,i,o,s){if(e.joinedId||e.docked||e.debris)throw Error(`Station loading requires one independent free ship`);let c=L(e),l=le({...e,contents:structuredClone(e.contents)});o===`propellant`?l.fuel=Math.max(0,s):l.cargoCount=s/1e3;let u=L(l),d=m(e.q,n(u.com,c.com)),f=m(e.q,e.omega),p=m(i.q,i.omega),g=i.v,y=r(n(e.v,g),c.mass),b=m(e.q,_(c.inertia,e.omega)),x=new Map(c.parts.map(e=>[e.id,e])),S=new Map(u.parts.map(e=>[e.id,e]));for(let o of new Set([...x.keys(),...S.keys()])){let s=S.get(o)||x.get(o),l=(S.get(o)?.mass||0)-(x.get(o)?.mass||0);if(!l)continue;let u=m(e.q,n(s.position,c.com)),d=l>0,_=d?p:f,v=r(d?a(p,n(t(e.r,u),i.r)):t(n(e.v,g),a(f,u)),l),[C,w,T]=s.size,E=h(e.q,_),D=m(e.q,[l*(w*w+T*T)/12*E[0],l*(C*C+T*T)/12*E[1],l*(C*C+w*w)/12*E[2]]);y=t(y,v),b=t(b,t(a(u,v),D))}let C=t(e.r,d),w=t(g,r(y,1/u.mass)),T=v(u.inertia,h(e.q,n(b,a(d,y))));if(![...C,...w,...T].every(Number.isFinite))throw Error(`Invalid station loading state`);return{contents:l.contents,r:C,v:w,omega:T}}var ge=1e3,_e=1001,ve=1002,ye=1003,R=1004,be=1005,z=1006,xe=1007,Se=1008,Ce=1009,B=1010,we=1011,Te=1012,V=1013,Ee=1014,H=1015,De=1016,Oe=1017,ke=1018,Ae=1020,je=35902,Me=35899,Ne=1021,Pe=1022,Fe=1023,Ie=1026,Le=1027,Re=1028,ze=1029,Be=1030,Ve=1031,He=1033,Ue=33776,We=33777,Ge=33778,Ke=33779,qe=35840,Je=35841,Ye=35842,Xe=35843,Ze=36196,Qe=37492,$e=37496,et=37488,tt=37489,nt=37490,rt=37491,it=37808,at=37809,ot=37810,st=37811,ct=37812,lt=37813,ut=37814,dt=37815,ft=37816,pt=37817,mt=37818,ht=37819,gt=37820,_t=37821,vt=36492,yt=36494,bt=36495,xt=36283,St=36284,Ct=36285,wt=36286,Tt=2300,Et=2301,Dt=2302,Ot=2303,kt=2400,At=2401,jt=2402,Mt=3200,Nt=`srgb`,Pt=`srgb-linear`,Ft=`linear`,It=`srgb`,Lt=7680,Rt=35044,zt=2e3;function Bt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Vt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ht(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ut(){let e=Ht(`canvas`);return e.style.display=`block`,e}var Wt={};function Gt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Kt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function U(...e){e=Kt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function W(...e){e=Kt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function qt(...e){let t=e.join(` `);t in Wt||(Wt[t]=!0,U(...e))}function Jt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Yt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Xt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Zt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Qt=1234567,$t=Math.PI/180,en=180/Math.PI;function tn(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Zt[e&255]+Zt[e>>8&255]+Zt[e>>16&255]+Zt[e>>24&255]+`-`+Zt[t&255]+Zt[t>>8&255]+`-`+Zt[t>>16&15|64]+Zt[t>>24&255]+`-`+Zt[n&63|128]+Zt[n>>8&255]+`-`+Zt[n>>16&255]+Zt[n>>24&255]+Zt[r&255]+Zt[r>>8&255]+Zt[r>>16&255]+Zt[r>>24&255]).toLowerCase()}function G(e,t,n){return Math.max(t,Math.min(n,e))}function nn(e,t){return(e%t+t)%t}function rn(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function an(e,t,n){return e===t?0:(n-e)/(t-e)}function on(e,t,n){return(1-n)*e+n*t}function sn(e,t,n,r){return on(e,t,1-Math.exp(-n*r))}function cn(e,t=1){return t-Math.abs(nn(e,t*2)-t)}function ln(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function un(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function dn(e,t){return e+Math.floor(Math.random()*(t-e+1))}function fn(e,t){return e+Math.random()*(t-e)}function pn(e){return e*(.5-Math.random())}function mn(e){e!==void 0&&(Qt=e);let t=Qt+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function hn(e){return e*$t}function gn(e){return e*en}function _n(e){return!(e&e-1)&&e!==0}function vn(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function yn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function bn(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:U(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function xn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Sn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Cn={DEG2RAD:$t,RAD2DEG:en,generateUUID:tn,clamp:G,euclideanModulo:nn,mapLinear:rn,inverseLerp:an,lerp:on,damp:sn,pingpong:cn,smoothstep:ln,smootherstep:un,randInt:dn,randFloat:fn,randFloatSpread:pn,seededRandom:mn,degToRad:hn,radToDeg:gn,isPowerOfTwo:_n,ceilPowerOfTwo:vn,floorPowerOfTwo:yn,setQuaternionFromProperEuler:bn,normalize:Sn,denormalize:xn},K=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=G(this.x,e,t),this.y=G(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(G(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},wn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:U(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(G(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},q=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(En.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(En.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this.z=G(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=G(this.x,e,t),this.y=G(this.y,e,t),this.z=G(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tn.copy(this).projectOnVector(e),this.sub(Tn)}reflect(e){return this.sub(Tn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(G(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Tn=new q,En=new wn,J=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return qt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Dn.makeScale(e,t)),this}rotate(e){return qt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Dn.makeRotation(-e)),this}translate(e,t){return qt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Dn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Dn=new J,On=new J().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kn=new J().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function An(){let e={enabled:!0,workingColorSpace:Pt,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Mn(e.r),e.g=Mn(e.g),e.b=Mn(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Nn(e.r),e.g=Nn(e.g),e.b=Nn(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ft:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return qt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return qt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Pt]:{primaries:t,whitePoint:r,transfer:Ft,toXYZ:On,fromXYZ:kn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:t,whitePoint:r,transfer:It,toXYZ:On,fromXYZ:kn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),e}var jn=An();function Mn(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Nn(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Pn,Fn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Pn===void 0&&(Pn=Ht(`canvas`)),Pn.width=e.width,Pn.height=e.height;let t=Pn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Pn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ht(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Mn(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Mn(t[e]/255)*255):t[e]=Mn(t[e]);return{data:t,width:e.width,height:e.height}}return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},In=0,Ln=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:In++}),this.uuid=tn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Rn(r[t].image)):e.push(Rn(r[t]))}else e=Rn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Rn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Fn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(U(`Texture: Unable to serialize Texture.`),{})}var zn=0,Bn=new q,Vn=class e extends Xt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=_e,i=_e,a=z,o=Se,s=Fe,c=Ce,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zn++}),this.uuid=tn(),this.name=``,this.source=new Ln(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new J,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Bn).x}get height(){return this.source.getSize(Bn).y}get depth(){return this.source.getSize(Bn).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){U(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ge:e.x-=Math.floor(e.x);break;case _e:e.x=e.x<0?0:1;break;case ve:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case ge:e.y-=Math.floor(e.y);break;case _e:e.y=e.y<0?0:1;break;case ve:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Vn.DEFAULT_IMAGE=null,Vn.DEFAULT_MAPPING=300,Vn.DEFAULT_ANISOTROPY=1;var Hn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this.z=G(this.z,e.z,t.z),this.w=G(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=G(this.x,e,t),this.y=G(this.y,e,t),this.z=G(this.z,e,t),this.w=G(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Un=class extends Xt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:z,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Hn(0,0,e,t),this.scissorTest=!1,this.viewport=new Hn(0,0,e,t),this.textures=[];let r=new Vn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:z,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ln(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Wn=class extends Un{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Gn=class extends Vn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ye,this.minFilter=ye,this.wrapR=_e,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Kn=class extends Vn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=ye,this.minFilter=ye,this.wrapR=_e,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},qn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Jn.setFromMatrixColumn(e,0).length(),i=1/Jn.setFromMatrixColumn(e,1).length(),a=1/Jn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xn,e,Zn)}lookAt(e,t,n){let r=this.elements;return er.subVectors(e,t),er.lengthSq()===0&&(er.z=1),er.normalize(),Qn.crossVectors(n,er),Qn.lengthSq()===0&&(Math.abs(n.z)===1?er.x+=1e-4:er.z+=1e-4,er.normalize(),Qn.crossVectors(n,er)),Qn.normalize(),$n.crossVectors(er,Qn),r[0]=Qn.x,r[4]=$n.x,r[8]=er.x,r[1]=Qn.y,r[5]=$n.y,r[9]=er.y,r[2]=Qn.z,r[6]=$n.z,r[10]=er.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Jn.set(r[0],r[1],r[2]).length(),o=Jn.set(r[4],r[5],r[6]).length(),s=Jn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Yn.copy(this);let c=1/a,l=1/o,u=1/s;return Yn.elements[0]*=c,Yn.elements[1]*=c,Yn.elements[2]*=c,Yn.elements[4]*=l,Yn.elements[5]*=l,Yn.elements[6]*=l,Yn.elements[8]*=u,Yn.elements[9]*=u,Yn.elements[10]*=u,t.setFromRotationMatrix(Yn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=zt,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=zt,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Jn=new q,Yn=new qn,Xn=new q(0,0,0),Zn=new q(1,1,1),Qn=new q,$n=new q,er=new q,tr=new qn,nr=new wn,rr=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(G(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-G(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(G(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-G(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(G(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-G(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:U(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return tr.makeRotationFromQuaternion(e),this.setFromRotationMatrix(tr,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return nr.setFromEuler(this),this.setFromQuaternion(nr,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};rr.DEFAULT_ORDER=`XYZ`;var ir=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},ar=0,or=new q,sr=new wn,cr=new qn,lr=new q,ur=new q,dr=new q,fr=new wn,pr=new q(1,0,0),mr=new q(0,1,0),hr=new q(0,0,1),gr={type:`added`},_r={type:`removed`},vr={type:`childadded`,child:null},yr={type:`childremoved`,child:null},br=class e extends Xt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ar++}),this.uuid=tn(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new q,n=new rr,r=new wn,i=new q(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new qn},normalMatrix:{value:new J}}),this.matrix=new qn,this.matrixWorld=new qn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ir,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.multiply(sr),this}rotateOnWorldAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.premultiply(sr),this}rotateX(e){return this.rotateOnAxis(pr,e)}rotateY(e){return this.rotateOnAxis(mr,e)}rotateZ(e){return this.rotateOnAxis(hr,e)}translateOnAxis(e,t){return or.copy(e).applyQuaternion(this.quaternion),this.position.add(or.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pr,e)}translateY(e){return this.translateOnAxis(mr,e)}translateZ(e){return this.translateOnAxis(hr,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(cr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lr.copy(e):lr.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?cr.lookAt(ur,lr,this.up):cr.lookAt(lr,ur,this.up),this.quaternion.setFromRotationMatrix(cr),r&&(cr.extractRotation(r.matrixWorld),sr.setFromRotationMatrix(cr),this.quaternion.premultiply(sr.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(W(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(gr),vr.child=e,this.dispatchEvent(vr),vr.child=null):W(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_r),yr.child=e,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),cr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),cr.multiply(e.parent.matrixWorld)),e.applyMatrix4(cr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(gr),vr.child=e,this.dispatchEvent(vr),vr.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,e,dr),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,fr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};br.DEFAULT_UP=new q(0,1,0),br.DEFAULT_MATRIX_AUTO_UPDATE=!0,br.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var xr=class extends br{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Sr={type:`move`},Cr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new xr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},wr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Tr={h:0,s:0,l:0},Er={h:0,s:0,l:0};function Dr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,jn.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=jn.workingColorSpace){return this.r=e,this.g=t,this.b=n,jn.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=jn.workingColorSpace){if(e=nn(e,1),t=G(t,0,1),n=G(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Dr(i,r,e+1/3),this.g=Dr(i,r,e),this.b=Dr(i,r,e-1/3)}return jn.colorSpaceToWorking(this,r),this}setStyle(e,t=Nt){function n(t){t!==void 0&&parseFloat(t)<1&&U(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:U(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);U(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=wr[e.toLowerCase()];return n===void 0?U(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=Nn(e.r),this.g=Nn(e.g),this.b=Nn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return jn.workingToColorSpace(Or.copy(this),e),Math.round(G(Or.r*255,0,255))*65536+Math.round(G(Or.g*255,0,255))*256+Math.round(G(Or.b*255,0,255))}getHexString(e=Nt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=jn.workingColorSpace){jn.workingToColorSpace(Or.copy(this),t);let n=Or.r,r=Or.g,i=Or.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=jn.workingColorSpace){return jn.workingToColorSpace(Or.copy(this),t),e.r=Or.r,e.g=Or.g,e.b=Or.b,e}getStyle(e=Nt){jn.workingToColorSpace(Or.copy(this),e);let t=Or.r,n=Or.g,r=Or.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Tr),this.setHSL(Tr.h+e,Tr.s+t,Tr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Tr),e.getHSL(Er);let n=on(Tr.h,Er.h,t),r=on(Tr.s,Er.s,t),i=on(Tr.l,Er.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Or=new Y;Y.NAMES=wr;var kr=class extends br{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new rr,this.environmentIntensity=1,this.environmentRotation=new rr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ar=new q,jr=new q,Mr=new q,Nr=new q,Pr=new q,Fr=new q,Ir=new q,Lr=new q,Rr=new q,zr=new q,Br=new Hn,Vr=new Hn,Hr=new Hn,Ur=class e{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ar.subVectors(e,t),r.cross(Ar);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ar.subVectors(r,t),jr.subVectors(n,t),Mr.subVectors(e,t);let a=Ar.dot(Ar),o=Ar.dot(jr),s=Ar.dot(Mr),c=jr.dot(jr),l=jr.dot(Mr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Nr)!==null&&Nr.x>=0&&Nr.y>=0&&Nr.x+Nr.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Nr)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Nr.x),s.addScaledVector(a,Nr.y),s.addScaledVector(o,Nr.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Br.setScalar(0),Vr.setScalar(0),Hr.setScalar(0),Br.fromBufferAttribute(e,t),Vr.fromBufferAttribute(e,n),Hr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Br,i.x),a.addScaledVector(Vr,i.y),a.addScaledVector(Hr,i.z),a}static isFrontFacing(e,t,n,r){return Ar.subVectors(n,t),jr.subVectors(e,t),Ar.cross(jr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ar.subVectors(this.c,this.b),jr.subVectors(this.a,this.b),Ar.cross(jr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Pr.subVectors(r,n),Fr.subVectors(i,n),Lr.subVectors(e,n);let s=Pr.dot(Lr),c=Fr.dot(Lr);if(s<=0&&c<=0)return t.copy(n);Rr.subVectors(e,r);let l=Pr.dot(Rr),u=Fr.dot(Rr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Pr,a);zr.subVectors(e,i);let f=Pr.dot(zr),p=Fr.dot(zr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Fr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Ir.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Ir,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Pr,a).addScaledVector(Fr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wr=class{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Kr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Kr):Kr.fromBufferAttribute(r,t),Kr.applyMatrix4(e.matrixWorld),this.expandByPoint(Kr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),qr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),qr.copy(e.boundingBox)),qr.applyMatrix4(e.matrixWorld),this.union(qr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kr),Kr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ei),ti.subVectors(this.max,ei),Jr.subVectors(e.a,ei),Yr.subVectors(e.b,ei),Xr.subVectors(e.c,ei),Zr.subVectors(Yr,Jr),Qr.subVectors(Xr,Yr),$r.subVectors(Jr,Xr);let t=[0,-Zr.z,Zr.y,0,-Qr.z,Qr.y,0,-$r.z,$r.y,Zr.z,0,-Zr.x,Qr.z,0,-Qr.x,$r.z,0,-$r.x,-Zr.y,Zr.x,0,-Qr.y,Qr.x,0,-$r.y,$r.x,0];return!ii(t,Jr,Yr,Xr,ti)||(t=[1,0,0,0,1,0,0,0,1],!ii(t,Jr,Yr,Xr,ti))?!1:(ni.crossVectors(Zr,Qr),t=[ni.x,ni.y,ni.z],ii(t,Jr,Yr,Xr,ti))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gr=[new q,new q,new q,new q,new q,new q,new q,new q],Kr=new q,qr=new Wr,Jr=new q,Yr=new q,Xr=new q,Zr=new q,Qr=new q,$r=new q,ei=new q,ti=new q,ni=new q,ri=new q;function ii(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ri.fromArray(e,a);let o=i.x*Math.abs(ri.x)+i.y*Math.abs(ri.y)+i.z*Math.abs(ri.z),s=t.dot(ri),c=n.dot(ri),l=r.dot(ri);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ai=new q,oi=new K,si=0,ci=class extends Xt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:si++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Rt,this.updateRanges=[],this.gpuType=H,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)oi.fromBufferAttribute(this,t),oi.applyMatrix3(e),this.setXY(t,oi.x,oi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyMatrix3(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyMatrix4(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.applyNormalMatrix(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ai.fromBufferAttribute(this,t),ai.transformDirection(e),this.setXYZ(t,ai.x,ai.y,ai.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array),r=Sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Sn(t,this.array),n=Sn(n,this.array),r=Sn(r,this.array),i=Sn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},li=class extends ci{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ui=class extends ci{constructor(e,t,n){super(new Uint32Array(e),t,n)}},di=class extends ci{constructor(e,t,n){super(new Float32Array(e),t,n)}},fi=new Wr,pi=new q,mi=new q,hi=class{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?fi.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pi.subVectors(e,this.center);let t=pi.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(pi,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mi.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pi.copy(e.center).add(mi)),this.expandByPoint(pi.copy(e.center).sub(mi))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},gi=0,_i=new qn,vi=new br,yi=new q,bi=new Wr,xi=new Wr,Si=new q,Ci=class e extends Xt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gi++}),this.uuid=tn(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Bt(e)?ui:li)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new J().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _i.makeRotationFromQuaternion(e),this.applyMatrix4(_i),this}rotateX(e){return _i.makeRotationX(e),this.applyMatrix4(_i),this}rotateY(e){return _i.makeRotationY(e),this.applyMatrix4(_i),this}rotateZ(e){return _i.makeRotationZ(e),this.applyMatrix4(_i),this}translate(e,t,n){return _i.makeTranslation(e,t,n),this.applyMatrix4(_i),this}scale(e,t,n){return _i.makeScale(e,t,n),this.applyMatrix4(_i),this}lookAt(e){return vi.lookAt(e),vi.updateMatrix(),this.applyMatrix4(vi.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new di(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];bi.setFromBufferAttribute(n),this.morphTargetsRelative?(Si.addVectors(this.boundingBox.min,bi.min),this.boundingBox.expandByPoint(Si),Si.addVectors(this.boundingBox.max,bi.max),this.boundingBox.expandByPoint(Si)):(this.boundingBox.expandByPoint(bi.min),this.boundingBox.expandByPoint(bi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new q,1/0);return}if(e){let n=this.boundingSphere.center;if(bi.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];xi.setFromBufferAttribute(n),this.morphTargetsRelative?(Si.addVectors(bi.min,xi.min),bi.expandByPoint(Si),Si.addVectors(bi.max,xi.max),bi.expandByPoint(Si)):(bi.expandByPoint(xi.min),bi.expandByPoint(xi.max))}bi.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Si.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Si));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Si.fromBufferAttribute(a,t),o&&(yi.fromBufferAttribute(e,t),Si.add(yi)),r=Math.max(r,n.distanceToSquared(Si))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new ci(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new q,s[e]=new q;let c=new q,l=new q,u=new q,d=new K,f=new K,p=new K,m=new q,h=new q;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new q,y=new q,b=new q,x=new q;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new ci(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new q,i=new q,a=new q,o=new q,s=new q,c=new q,l=new q,u=new q;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Si.fromBufferAttribute(e,t),Si.normalize(),e.setXYZ(t,Si.x,Si.y,Si.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new ci(a,r,i)}if(this.index===null)return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},wi=0,Ti=class extends Xt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:wi++}),this.uuid=tn(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Lt,this.stencilZFail=Lt,this.stencilZPass=Lt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){U(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new K().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ei=new q,Di=new q,Oi=new q,ki=new q,Ai=new q,ji=new q,Mi=new q,Ni=class{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ei.copy(this.origin).addScaledVector(this.direction,t),Ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Di.copy(e).add(t).multiplyScalar(.5),Oi.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(Di);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Oi),o=ki.dot(this.direction),s=-ki.dot(Oi),c=ki.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Di).addScaledVector(Oi,d),f}intersectSphere(e,t){Ei.subVectors(e.center,this.origin);let n=Ei.dot(this.direction),r=Ei.dot(Ei)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ei)!==null}intersectTriangle(e,t,n,r,i){Ai.subVectors(t,e),ji.subVectors(n,e),Mi.crossVectors(Ai,ji);let a=this.direction.dot(Mi),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ki.subVectors(this.origin,e);let s=o*this.direction.dot(ji.crossVectors(ki,ji));if(s<0)return null;let c=o*this.direction.dot(Ai.cross(ki));if(c<0||s+c>a)return null;let l=-o*ki.dot(Mi);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pi=class extends Ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Fi=new qn,Ii=new Ni,Li=new hi,Ri=new q,zi=new q,Bi=new q,Vi=new q,Hi=new q,Ui=new q,Wi=new q,Gi=new q,Ki=class extends br{constructor(e=new Ci,t=new Pi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Ui.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Hi.fromBufferAttribute(s,e),a?Ui.addScaledVector(Hi,r):Ui.addScaledVector(Hi.sub(t),r))}t.add(Ui)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Li.copy(n.boundingSphere),Li.applyMatrix4(i),Ii.copy(e.ray).recast(e.near),!(Li.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Li,Ri)===null||Ii.origin.distanceToSquared(Ri)>(e.far-e.near)**2))&&(Fi.copy(i).invert(),Ii.copy(e.ray).applyMatrix4(Fi),(n.boundingBox===null||Ii.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ji(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ji(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ji(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ji(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function qi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Gi.copy(s),Gi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Gi);return l<n.near||l>n.far?null:{distance:l,point:Gi.clone(),object:e}}function Ji(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,zi),e.getVertexPosition(c,Bi),e.getVertexPosition(l,Vi);let u=qi(e,t,n,r,zi,Bi,Vi,Wi);if(u){let e=new q;Ur.getBarycoord(Wi,zi,Bi,Vi,e),i&&(u.uv=Ur.getInterpolatedAttribute(i,s,c,l,e,new K)),a&&(u.uv1=Ur.getInterpolatedAttribute(a,s,c,l,e,new K)),o&&(u.normal=Ur.getInterpolatedAttribute(o,s,c,l,e,new q),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new q,materialIndex:0};Ur.getNormal(zi,Bi,Vi,t.normal),u.face=t,u.barycoord=e}return u}var Yi=class extends Vn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=ye,l=ye,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xi=class extends ci{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Zi=new qn,Qi=new qn,$i=[],ea=new Wr,ta=new qn,na=new Ki,ra=new hi,ia=class extends Ki{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Xi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,ta)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zi),ea.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(ea)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Zi),ra.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(ra)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(na.geometry=this.geometry,na.material=this.material,na.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ra.copy(this.boundingSphere),ra.applyMatrix4(n),e.ray.intersectsSphere(ra)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Zi),Qi.multiplyMatrices(n,Zi),na.matrixWorld=Qi,na.raycast(e,$i);for(let e=0,n=$i.length;e<n;e++){let n=$i[e];n.instanceId=i,n.object=this,t.push(n)}$i.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Xi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yi(new Float32Array(r*this.count),r,this.count,Re,H));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},aa=new q,oa=new q,sa=new J,ca=class{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=aa.subVectors(n,t).cross(oa.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(aa),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sa.getNormalMatrix(e),r=this.coplanarPoint(aa).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},la=new hi,ua=new K(.5,.5),da=new q,fa=class{constructor(e=new ca,t=new ca,n=new ca,r=new ca,i=new ca,a=new ca){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zt,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),la.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),la.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(la)}intersectsSprite(e){return la.center.set(0,0,0),la.radius=.7071067811865476+ua.distanceTo(e.center),la.applyMatrix4(e.matrixWorld),this.intersectsSphere(la)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(da.x=r.normal.x>0?e.max.x:e.min.x,da.y=r.normal.y>0?e.max.y:e.min.y,da.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(da)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},pa=class extends Ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Y(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ma=new q,ha=new q,ga=new qn,_a=new Ni,va=new hi,ya=new q,ba=new q,xa=class extends br{constructor(e=new Ci,t=new pa){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)ma.fromBufferAttribute(t,e-1),ha.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=ma.distanceTo(ha);e.setAttribute(`lineDistance`,new di(n,1))}else U(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),va.copy(n.boundingSphere),va.applyMatrix4(r),va.radius+=i,e.ray.intersectsSphere(va)===!1)return;ga.copy(r).invert(),_a.copy(e.ray).applyMatrix4(ga);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Sa(this,e,_a,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Sa(this,e,_a,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Sa(this,e,_a,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Sa(this,e,_a,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Sa(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(ma.fromBufferAttribute(s,i),ha.fromBufferAttribute(s,a),n.distanceSqToSegment(ma,ha,ya,ba)>r)return;ya.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(ya);if(!(c<t.near||c>t.far))return{distance:c,point:ba.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Ca=new q,wa=new q,Ta=class extends xa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Ca.fromBufferAttribute(t,e),wa.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Ca.distanceTo(wa);e.setAttribute(`lineDistance`,new di(n,1))}else U(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Ea=class extends Ti{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Da=new qn,Oa=new Ni,ka=new hi,Aa=new q,ja=class extends br{constructor(e=new Ci,t=new Ea){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ka.copy(n.boundingSphere),ka.applyMatrix4(r),ka.radius+=i,e.ray.intersectsSphere(ka)===!1)return;Da.copy(r).invert(),Oa.copy(e.ray).applyMatrix4(Da);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Aa.fromBufferAttribute(l,n),Ma(Aa,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Aa.fromBufferAttribute(l,a),Ma(Aa,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Ma(e,t,n,r,i,a,o){let s=Oa.distanceSqToPoint(e);if(s<n){let n=new q;Oa.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Na=class extends Vn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pa=class extends Vn{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Fa=class extends Vn{constructor(e,t,n=Ee,r,i,a,o=ye,s=ye,c,l=Ie,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ln(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Ia=class extends Fa{constructor(e,t=Ee,n=301,r,i,a=ye,o=ye,s,c=Ie){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},La=class extends Vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ra=class e extends Ci{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new di(c,3)),this.setAttribute(`normal`,new di(l,3)),this.setAttribute(`uv`,new di(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new q;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},za=class e extends Ci{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new q,l=new K;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new di(a,3)),this.setAttribute(`normal`,new di(o,3)),this.setAttribute(`uv`,new di(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ba=class e extends Ci{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new di(u,3)),this.setAttribute(`normal`,new di(d,3)),this.setAttribute(`uv`,new di(f,2));function _(){let a=new q,_=new q,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new K,m=new q,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Va=class e extends Ba{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ha=class e extends Ci{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new di(i,3)),this.setAttribute(`normal`,new di(i.slice(),3)),this.setAttribute(`uv`,new di(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new q,r=new q,i=new q;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new q;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new q;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new q,t=new q,n=new q,r=new q,o=new K,s=new K,c=new K;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ua=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){U(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new K:new q);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new q,r=[],i=[],a=[],o=new q,s=new qn;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new q)}i[0]=new q,a[0]=new q;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(G(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(G(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Wa=class extends Ua{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new K){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ga=class extends Wa{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ka(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var qa=new q,Ja=new q,Ya=new Ka,Xa=new Ka,Za=new Ka,Qa=class extends Ua{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new q){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Ja.subVectors(r[0],r[1]).add(r[0]),c=Ja);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(qa.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=qa),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ya.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Xa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Za.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ya.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Xa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Za.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ya.calc(s),Xa.calc(s),Za.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new q().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function $a(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function eo(e,t){let n=1-e;return n*n*t}function to(e,t){return 2*(1-e)*e*t}function no(e,t){return e*e*t}function ro(e,t,n,r){return eo(e,t)+to(e,n)+no(e,r)}function io(e,t){let n=1-e;return n*n*n*t}function ao(e,t){let n=1-e;return 3*n*n*e*t}function oo(e,t){return 3*(1-e)*e*e*t}function so(e,t){return e*e*e*t}function co(e,t,n,r,i){return io(e,t)+ao(e,n)+oo(e,r)+so(e,i)}var lo=class extends Ua{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(co(e,r.x,i.x,a.x,o.x),co(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},uo=class extends Ua{constructor(e=new q,t=new q,n=new q,r=new q){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(co(e,r.x,i.x,a.x,o.x),co(e,r.y,i.y,a.y,o.y),co(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},fo=class extends Ua{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},po=class extends Ua{constructor(e=new q,t=new q){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new q){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},mo=class extends Ua{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ro(e,r.x,i.x,a.x),ro(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends Ua{constructor(e=new q,t=new q,n=new q){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ro(e,r.x,i.x,a.x),ro(e,r.y,i.y,a.y),ro(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},go=class extends Ua{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new K){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set($a(o,s.x,c.x,l.x,u.x),$a(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this}},_o=Object.freeze({__proto__:null,ArcCurve:Ga,CatmullRomCurve3:Qa,CubicBezierCurve:lo,CubicBezierCurve3:uo,EllipseCurve:Wa,LineCurve:fo,LineCurve3:po,QuadraticBezierCurve:mo,QuadraticBezierCurve3:ho,SplineCurve:go}),vo=class extends Ua{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new _o[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new _o[n.type]().fromJSON(n))}return this}},yo=class extends vo{constructor(e){super(),this.type=`Path`,this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new fo(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new mo(this.currentPoint.clone(),new K(e,t),new K(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new lo(this.currentPoint.clone(),new K(e,t),new K(n,r),new K(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new go([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new Wa(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},bo=class extends yo{constructor(e){super(e),this.uuid=tn(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new yo().fromJSON(n))}return this}};function xo(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=So(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=ko(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return wo(a,o,n,s,c,l,0),o}function So(e,t,n,r,i){let a;if(i===$o(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Xo(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Xo(i/r|0,e[i],e[i+1],a);return a&&Ho(a,a.next)&&(Zo(a),a=a.next),a}function Co(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ho(n,n.next)||Vo(n.prev,n,n.next)===0)){if(Zo(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function wo(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Po(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?Eo(e,r,i,a):To(e)){t.push(c.i,e.i,l.i),Zo(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=Do(Co(e),t),wo(e,t,n,r,i,a,2)):o===2&&Oo(e,t,n,r,i,a):wo(Co(e),t,n,r,i,a,1);break}}}function To(e){let t=e.prev,n=e,r=e.next;if(Vo(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&zo(i,s,a,c,o,l,m.x,m.y)&&Vo(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Eo(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Vo(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Io(p,m,t,n,r),v=Io(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&zo(s,u,c,d,l,f,y.x,y.y)&&Vo(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&zo(s,u,c,d,l,f,b.x,b.y)&&Vo(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&zo(s,u,c,d,l,f,y.x,y.y)&&Vo(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&zo(s,u,c,d,l,f,b.x,b.y)&&Vo(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Do(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ho(r,i)&&Uo(r,n,n.next,i)&&qo(r,i)&&qo(i,r)&&(t.push(r.i,n.i,i.i),Zo(n),Zo(n.next),n=e=i),n=n.next}while(n!==e);return Co(n)}function Oo(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Bo(o,e)){let s=Yo(o,e);o=Co(o,o.next),s=Co(s,s.next),wo(o,t,n,r,i,a,0),wo(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function ko(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=So(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Lo(o))}i.sort(Ao);for(let e=0;e<i.length;e++)n=jo(i[e],n);return n}function Ao(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function jo(e,t){let n=Mo(e,t);if(!n)return t;let r=Yo(n,e);return Co(r,r.next),Co(n,n.next)}function Mo(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ho(e,n))return n;do{if(Ho(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&Ro(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);qo(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&No(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function No(e,t){return Vo(e.prev,e,t.prev)<0&&Vo(t.next,e,e.next)<0}function Po(e,t,n,r){let i=e;do i.z===0&&(i.z=Io(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,Fo(i)}function Fo(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Io(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Lo(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ro(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function zo(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&Ro(e,t,n,r,i,a,o,s)}function Bo(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Ko(e,t)&&(qo(e,t)&&qo(t,e)&&Jo(e,t)&&(Vo(e.prev,e,t.prev)||Vo(e,t.prev,t))||Ho(e,t)&&Vo(e.prev,e,e.next)>0&&Vo(t.prev,t,t.next)>0)}function Vo(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ho(e,t){return e.x===t.x&&e.y===t.y}function Uo(e,t,n,r){let i=Go(Vo(e,t,n)),a=Go(Vo(e,t,r)),o=Go(Vo(n,r,e)),s=Go(Vo(n,r,t));return!!(i!==a&&o!==s||i===0&&Wo(e,n,t)||a===0&&Wo(e,r,t)||o===0&&Wo(n,e,r)||s===0&&Wo(n,t,r))}function Wo(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Go(e){return e>0?1:e<0?-1:0}function Ko(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&Uo(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function qo(e,t){return Vo(e.prev,e,e.next)<0?Vo(e,t,e.next)>=0&&Vo(e,e.prev,t)>=0:Vo(e,t,e.prev)<0||Vo(e,e.next,t)<0}function Jo(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Yo(e,t){let n=Qo(e.i,e.x,e.y),r=Qo(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Xo(e,t,n,r){let i=Qo(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Zo(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Qo(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $o(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var es=class{static triangulate(e,t,n=2){return xo(e,t,n)}},ts=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];ns(e),rs(n,e);let a=e.length;t.forEach(ns);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,rs(n,t[e]);let o=es.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function ns(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function rs(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var is=class e extends Ci{constructor(e=new bo([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new di(r,3)),this.setAttribute(`uv`,new di(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?as:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new q,b=new q,x=new q}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!ts.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];ts.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||W(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new K(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new K(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let F;if(p===0)F=ts.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);ie(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);ie(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}F=ts.triangulateShape(e,t)}let I=F.length,ee=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],ee):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),ie(x.x,x.y,x.z)):ie(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],ee):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),ie(x.x,x.y,x.z)):ie(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);ie(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?ie(i.x,i.y+g[s-1].y,g[s-1].x+n):ie(i.x,i.y,c+n)}}}te(),ne();function te(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<I;e++){let n=F[e];ae(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<I;e++){let n=F[e];ae(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<I;e++){let t=F[e];ae(t[2],t[1],t[0])}for(let e=0;e<I;e++){let t=F[e];ae(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function ne(){let e=r.length/3,t=0;re(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];re(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function re(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);oe(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ie(e,t,n){a.push(e),a.push(t),a.push(n)}function ae(e,t,i){se(e),se(t),se(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);L(o[0]),L(o[1]),L(o[2])}function oe(e,t,i,a){se(e),se(t),se(a),se(t),se(i),se(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);L(s[0]),L(s[1]),L(s[3]),L(s[1]),L(s[2]),L(s[3])}function se(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function L(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return os(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new _o[i.type]().fromJSON(i)),new e(r,t.options)}},as={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new K(a,o),new K(s,c),new K(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new K(o,1-c),new K(l,1-d),new K(f,1-m),new K(h,1-_)]:[new K(s,1-c),new K(u,1-d),new K(p,1-m),new K(g,1-_)]}};function os(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var ss=class e extends Ci{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=G(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new q,d=new K,f=new q,p=new q,m=new q,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new di(a,3)),this.setAttribute(`uv`,new di(o,2)),this.setAttribute(`normal`,new di(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},cs=class e extends Ha{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type=`OctahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ls=class e extends Ci{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new di(p,3)),this.setAttribute(`normal`,new di(m,3)),this.setAttribute(`uv`,new di(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},us=class e extends Ci{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new q,p=new K;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new di(s,3)),this.setAttribute(`normal`,new di(c,3)),this.setAttribute(`uv`,new di(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ds=class e extends Ci{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new q,d=new q,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new di(p,3)),this.setAttribute(`normal`,new di(m,3)),this.setAttribute(`uv`,new di(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},fs=class e extends Ci{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new q,f=new q,p=new q;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new di(c,3)),this.setAttribute(`normal`,new di(l,3)),this.setAttribute(`uv`,new di(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};function ps(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(hs(i))i.isRenderTargetTexture?(U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(hs(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ms(e){let t={};for(let n=0;n<e.length;n++){let r=ps(e[n]);for(let e in r)t[e]=r[e]}return t}function hs(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function gs(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function _s(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jn.workingColorSpace}var vs={clone:ps,merge:ms},ys=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bs=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xs=class extends Ti{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ys,this.fragmentShader=bs,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=gs(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Hn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new qn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ss=class extends xs{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Cs=class extends Ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ws=class extends Cs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new K(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return G(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Y(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Y(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Y(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ts=class extends Ti{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new rr,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Es=class extends Ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Mt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ds=class extends Ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Os=class extends pa{constructor(e){super(),this.isLineDashedMaterial=!0,this.type=`LineDashedMaterial`,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ks(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var As=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},js=class extends As{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:kt,endingEnd:kt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case At:i=e,o=2*t-n;break;case jt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case At:a=e,s=2*n-t;break;case jt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},Ms=class extends As{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ns=class extends As{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ps=class extends As{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Fs=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ks(t,this.TimeBufferType),this.values=ks(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ks(e.times,Array),values:ks(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ns(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ms(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new js(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ps(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Tt:t=this.InterpolantFactoryMethodDiscrete;break;case Et:t=this.InterpolantFactoryMethodLinear;break;case Dt:t=this.InterpolantFactoryMethodSmooth;break;case Ot:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return U(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tt;case this.InterpolantFactoryMethodLinear:return Et;case this.InterpolantFactoryMethodSmooth:return Dt;case this.InterpolantFactoryMethodBezier:return Ot}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(W(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(W(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){W(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){W(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Vt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){W(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Dt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Fs.prototype.ValueTypeName=``,Fs.prototype.TimeBufferType=Float32Array,Fs.prototype.ValueBufferType=Float32Array,Fs.prototype.DefaultInterpolation=Et;var Is=class extends Fs{constructor(e,t,n){super(e,t,n)}};Is.prototype.ValueTypeName=`bool`,Is.prototype.ValueBufferType=Array,Is.prototype.DefaultInterpolation=Tt,Is.prototype.InterpolantFactoryMethodLinear=void 0,Is.prototype.InterpolantFactoryMethodSmooth=void 0;var Ls=class extends Fs{constructor(e,t,n,r){super(e,t,n,r)}};Ls.prototype.ValueTypeName=`color`;var Rs=class extends Fs{constructor(e,t,n,r){super(e,t,n,r)}};Rs.prototype.ValueTypeName=`number`;var zs=class extends As{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)wn.slerpFlat(i,0,a,c-o,a,c,s);return i}},Bs=class extends Fs{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new zs(this.times,this.values,this.getValueSize(),e)}};Bs.prototype.ValueTypeName=`quaternion`,Bs.prototype.InterpolantFactoryMethodSmooth=void 0;var Vs=class extends Fs{constructor(e,t,n){super(e,t,n)}};Vs.prototype.ValueTypeName=`string`,Vs.prototype.ValueBufferType=Array,Vs.prototype.DefaultInterpolation=Tt,Vs.prototype.InterpolantFactoryMethodLinear=void 0,Vs.prototype.InterpolantFactoryMethodSmooth=void 0;var Hs=class extends Fs{constructor(e,t,n,r){super(e,t,n,r)}};Hs.prototype.ValueTypeName=`vector`;var Us=class extends br{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ws=class extends Us{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(br.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Gs=new qn,Ks=new q,qs=new q,Js=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=Ce,this.map=null,this.mapPass=null,this.matrix=new qn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fa,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new Hn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ks.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ks),qs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(qs),t.updateMatrixWorld(),Gs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Gs,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Gs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ys=new q,Xs=new wn,Zs=new q,Qs=class extends br{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new qn,this.projectionMatrix=new qn,this.projectionMatrixInverse=new qn,this.coordinateSystem=zt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ys,Xs,Zs),Zs.x===1&&Zs.y===1&&Zs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ys,Xs,Zs.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ys,Xs,Zs),Zs.x===1&&Zs.y===1&&Zs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ys,Xs,Zs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},$s=new q,ec=new K,tc=new K,nc=class extends Qs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=en*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($t*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return en*2*Math.atan(Math.tan($t*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$s.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($s.x,$s.y).multiplyScalar(-e/$s.z),$s.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($s.x,$s.y).multiplyScalar(-e/$s.z)}getViewSize(e,t){return this.getViewBounds(e,ec,tc),t.subVectors(tc,ec)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($t*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},rc=class extends Js{constructor(){super(new nc(90,1,.5,500)),this.isPointLightShadow=!0}},ic=class extends Us{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new rc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},ac=class extends Qs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},oc=class extends Js{constructor(){super(new ac(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},sc=class extends Us{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(br.DEFAULT_UP),this.updateMatrix(),this.target=new br,this.shadow=new oc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},cc=-90,lc=1,uc=class extends br{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new nc(cc,lc,e,t);r.layers=this.layers,this.add(r);let i=new nc(cc,lc,e,t);i.layers=this.layers,this.add(i);let a=new nc(cc,lc,e,t);a.layers=this.layers,this.add(a);let o=new nc(cc,lc,e,t);o.layers=this.layers,this.add(o);let s=new nc(cc,lc,e,t);s.layers=this.layers,this.add(s);let c=new nc(cc,lc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},dc=class extends nc{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},fc=`\\[\\]\\.:\\/`,pc=RegExp(`[\\[\\]\\.:\\/]`,`g`),mc=`[^\\[\\]\\.:\\/]`,hc=`[^`+fc.replace(`\\.`,``)+`]`,gc=`((?:WC+[\\/:])*)`.replace(`WC`,mc),_c=`(WCOD+)?`.replace(`WCOD`,hc),vc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,mc),yc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,mc),bc=RegExp(`^`+gc+_c+vc+yc+`$`),xc=[`material`,`materials`,`bones`,`map`],Sc=class{constructor(e,t,n){let r=n||Cc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Cc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(pc,``)}static parseTrackName(e){let t=bc.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);xc.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){U(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){W(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;W(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Cc.Composite=Sc,Cc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Cc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Cc.prototype.GetterByBindingType=[Cc.prototype._getValue_direct,Cc.prototype._getValue_array,Cc.prototype._getValue_arrayElement,Cc.prototype._getValue_toArray],Cc.prototype.SetterByBindingTypeAndVersioning=[[Cc.prototype._setValue_direct,Cc.prototype._setValue_direct_setNeedsUpdate,Cc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Cc.prototype._setValue_array,Cc.prototype._setValue_array_setNeedsUpdate,Cc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Cc.prototype._setValue_arrayElement,Cc.prototype._setValue_arrayElement_setNeedsUpdate,Cc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Cc.prototype._setValue_fromArray,Cc.prototype._setValue_fromArray_setNeedsUpdate,Cc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wc=new qn,Tc=class{constructor(e,t,n=0,r=1/0){this.ray=new Ni(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ir,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):W(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return wc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wc),this}intersectObject(e,t=!0,n=[]){return Dc(e,this,n,t),n.sort(Ec),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Dc(e[r],this,n,t);return n.sort(Ec),n}};function Ec(e,t){return e.distance-t.distance}function Dc(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Dc(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var Oc=new Wr,kc=class extends Ta{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),r=new Float32Array(24),i=new Ci;i.setIndex(new ci(n,1)),i.setAttribute(`position`,new ci(r,3)),super(i,new pa({color:t,toneMapped:!1})),this.object=e,this.type=`BoxHelper`,this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Oc.setFromObject(this.object),Oc.isEmpty())return;let e=Oc.min,t=Oc.max,n=this.geometry.attributes.position,r=n.array;r[0]=t.x,r[1]=t.y,r[2]=t.z,r[3]=e.x,r[4]=t.y,r[5]=t.z,r[6]=e.x,r[7]=e.y,r[8]=t.z,r[9]=t.x,r[10]=e.y,r[11]=t.z,r[12]=t.x,r[13]=t.y,r[14]=e.z,r[15]=e.x,r[16]=t.y,r[17]=e.z,r[18]=e.x,r[19]=e.y,r[20]=e.z,r[21]=t.x,r[22]=e.y,r[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}};function Ac(e,t,n,r){let i=jc(r);switch(n){case Ne:return e*t;case Re:return e*t/i.components*i.byteLength;case ze:return e*t/i.components*i.byteLength;case Be:return e*t*2/i.components*i.byteLength;case Ve:return e*t*2/i.components*i.byteLength;case Pe:return e*t*3/i.components*i.byteLength;case Fe:return e*t*4/i.components*i.byteLength;case He:return e*t*4/i.components*i.byteLength;case Ue:case We:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ge:case Ke:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Je:case Xe:return Math.max(e,16)*Math.max(t,8)/4;case qe:case Ye:return Math.max(e,8)*Math.max(t,8)/2;case Ze:case Qe:case et:case tt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case $e:case nt:case rt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case it:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case at:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ot:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case st:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ct:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case lt:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ut:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case dt:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ft:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case pt:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case mt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ht:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case gt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case _t:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case vt:case yt:case bt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case xt:case St:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ct:case wt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function jc(e){switch(e){case Ce:case B:return{byteLength:1,components:1};case Te:case we:case De:return{byteLength:2,components:1};case Oe:case ke:return{byteLength:2,components:4};case Ee:case V:case H:return{byteLength:4,components:1};case je:case Me:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?U(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function Mc(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Nc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new J}},envmap:{envMap:{value:null},envMapRotation:{value:new J},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new J}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new J}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new J},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new J},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new J},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new J}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new J}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new J}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0},uvTransform:{value:new J}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}}},Pc={basic:{uniforms:ms([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:ms([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:ms([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:ms([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:ms([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new Y(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:ms([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:ms([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:ms([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:ms([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:ms([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:ms([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new J},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new J}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:ms([Z.common,Z.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:ms([Z.lights,Z.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};Pc.physical={uniforms:ms([Pc.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new J},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new J},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new J},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new J},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new J},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new J},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new J},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new J},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new J},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new J},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new J},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new J}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var Fc={r:0,b:0,g:0},Ic=new qn,Lc=new J;Lc.set(-1,0,0,0,1,0,0,0,1);function Rc(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Ki(new Ra(1,1,1),new xs({name:`BackgroundCubeMaterial`,uniforms:ps(Pc.backgroundCube.uniforms),vertexShader:Pc.backgroundCube.vertexShader,fragmentShader:Pc.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ic.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Lc),l.material.toneMapped=jn.getTransfer(i.colorSpace)!==It,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Ki(new ls(2,2),new xs({name:`BackgroundMaterial`,uniforms:ps(Pc.background.uniforms),vertexShader:Pc.background.vertexShader,fragmentShader:Pc.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=jn.getTransfer(i.colorSpace)!==It,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Fc,_s(e)),n.buffers.color.setClear(Fc.r,Fc.g,Fc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function zc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Bc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Vc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(U(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Hc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ca,s=new J,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Uc=4,Wc=[.125,.215,.35,.446,.526,.582],Gc=20,Kc=256,qc=new ac,Jc=new Y,Yc=null,Xc=0,Zc=0,Qc=!1,$c=new q,el=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=$c}=i;Yc=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ol(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Yc,Xc,Zc),this._renderer.xr.enabled=Qc,e.scissorTest=!1,rl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yc=this._renderer.getRenderTarget(),Xc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Qc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:z,minFilter:z,generateMipmaps:!1,type:De,format:Fe,colorSpace:Pt,depthBuffer:!1},r=nl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nl(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tl(r)),this._blurMaterial=al(r,e,t),this._ggxMaterial=il(r,e,t)}return r}_compileMaterial(e){let t=new Ki(new Ci,e);this._renderer.compile(t,qc)}_sceneToCubeUV(e,t,n,r,i){let a=new nc(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Jc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ki(new Ra,new Pi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Jc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;rl(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ol());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;rl(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,qc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Uc?n-d+Uc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,rl(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,qc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,rl(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,qc)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&W(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Gc;m>Gc&&U(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gc}`);let h=[],g=0;for(let e=0;e<Gc;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];rl(t,3*v*(r>_-Uc?r-_+Uc:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,qc)}};function tl(e){let t=[],n=[],r=[],i=e,a=e-Uc+1+Wc.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Uc?s=Wc[o-e+Uc-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Ci;h.setAttribute(`position`,new ci(f,3)),h.setAttribute(`uv`,new ci(p,2)),h.setAttribute(`faceIndex`,new ci(m,1)),r.push(new Ki(h,null)),i>Uc&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function nl(e,t,n){let r=new Wn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function rl(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function il(e,t,n){return new xs({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Kc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:cl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function al(e,t,n){let r=new Float32Array(Gc),i=new q(0,1,0);return new xs({name:`SphericalGaussianBlur`,defines:{n:Gc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ol(){return new xs({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function sl(){return new xs({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function cl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var ll=class extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Na(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ra(5,5,5),i=new xs({name:`CubemapFromEquirect`,uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Ki(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=z),new uc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ul(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new ll(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new el(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new el(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function dl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&qt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function fl(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?ui:li)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function pl(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ml(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:W(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function hl(e,t,n){let r=new WeakMap,i=new Hn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Gn(h,p,m,u);g.type=H,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new K(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function gl(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var _l={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function vl(e,t,n,r,i,a){let o=new Wn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Fa(t,n):void 0}),s=new Wn(t,n,{type:De,depthBuffer:!1,stencilBuffer:!1}),c=new Ci;c.setAttribute(`position`,new di([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new di([0,2,0,0,2,0],2));let l=new Ss({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Ki(c,l),d=new ac(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},jn.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=_l[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var yl=new Vn,bl=new Fa(1,1),xl=new Gn,Sl=new Kn,Cl=new Na,wl=[],Tl=[],El=new Float32Array(16),Dl=new Float32Array(9),Ol=new Float32Array(4);function kl(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=wl[i];if(a===void 0&&(a=new Float32Array(i),wl[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Al(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function jl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ml(e,t){let n=Tl[t];n===void 0&&(n=new Int32Array(t),Tl[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Nl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Al(n,t))return;e.uniform2fv(this.addr,t),jl(n,t)}}function Fl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Al(n,t))return;e.uniform3fv(this.addr,t),jl(n,t)}}function Il(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Al(n,t))return;e.uniform4fv(this.addr,t),jl(n,t)}}function Ll(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Al(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),jl(n,t)}else{if(Al(n,r))return;Ol.set(r),e.uniformMatrix2fv(this.addr,!1,Ol),jl(n,r)}}function Rl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Al(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),jl(n,t)}else{if(Al(n,r))return;Dl.set(r),e.uniformMatrix3fv(this.addr,!1,Dl),jl(n,r)}}function zl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Al(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),jl(n,t)}else{if(Al(n,r))return;El.set(r),e.uniformMatrix4fv(this.addr,!1,El),jl(n,r)}}function Bl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Vl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Al(n,t))return;e.uniform2iv(this.addr,t),jl(n,t)}}function Hl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Al(n,t))return;e.uniform3iv(this.addr,t),jl(n,t)}}function Ul(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Al(n,t))return;e.uniform4iv(this.addr,t),jl(n,t)}}function Wl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Gl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Al(n,t))return;e.uniform2uiv(this.addr,t),jl(n,t)}}function Kl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Al(n,t))return;e.uniform3uiv(this.addr,t),jl(n,t)}}function ql(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Al(n,t))return;e.uniform4uiv(this.addr,t),jl(n,t)}}function Jl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(bl.compareFunction=n.isReversedDepthBuffer()?518:515,a=bl):a=yl,n.setTexture2D(t||a,i)}function Yl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Sl,i)}function Xl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Cl,i)}function Zl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||xl,i)}function Ql(e){switch(e){case 5126:return Nl;case 35664:return Pl;case 35665:return Fl;case 35666:return Il;case 35674:return Ll;case 35675:return Rl;case 35676:return zl;case 5124:case 35670:return Bl;case 35667:case 35671:return Vl;case 35668:case 35672:return Hl;case 35669:case 35673:return Ul;case 5125:return Wl;case 36294:return Gl;case 36295:return Kl;case 36296:return ql;case 35678:case 36198:case 36298:case 36306:case 35682:return Jl;case 35679:case 36299:case 36307:return Yl;case 35680:case 36300:case 36308:case 36293:return Xl;case 36289:case 36303:case 36311:case 36292:return Zl}}function $l(e,t){e.uniform1fv(this.addr,t)}function eu(e,t){let n=kl(t,this.size,2);e.uniform2fv(this.addr,n)}function tu(e,t){let n=kl(t,this.size,3);e.uniform3fv(this.addr,n)}function nu(e,t){let n=kl(t,this.size,4);e.uniform4fv(this.addr,n)}function ru(e,t){let n=kl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function iu(e,t){let n=kl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function au(e,t){let n=kl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ou(e,t){e.uniform1iv(this.addr,t)}function su(e,t){e.uniform2iv(this.addr,t)}function cu(e,t){e.uniform3iv(this.addr,t)}function lu(e,t){e.uniform4iv(this.addr,t)}function uu(e,t){e.uniform1uiv(this.addr,t)}function du(e,t){e.uniform2uiv(this.addr,t)}function fu(e,t){e.uniform3uiv(this.addr,t)}function pu(e,t){e.uniform4uiv(this.addr,t)}function mu(e,t,n){let r=this.cache,i=t.length,a=Ml(n,i);Al(r,a)||(e.uniform1iv(this.addr,a),jl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?bl:yl;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function hu(e,t,n){let r=this.cache,i=t.length,a=Ml(n,i);Al(r,a)||(e.uniform1iv(this.addr,a),jl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Sl,a[e])}function gu(e,t,n){let r=this.cache,i=t.length,a=Ml(n,i);Al(r,a)||(e.uniform1iv(this.addr,a),jl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Cl,a[e])}function _u(e,t,n){let r=this.cache,i=t.length,a=Ml(n,i);Al(r,a)||(e.uniform1iv(this.addr,a),jl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||xl,a[e])}function vu(e){switch(e){case 5126:return $l;case 35664:return eu;case 35665:return tu;case 35666:return nu;case 35674:return ru;case 35675:return iu;case 35676:return au;case 5124:case 35670:return ou;case 35667:case 35671:return su;case 35668:case 35672:return cu;case 35669:case 35673:return lu;case 5125:return uu;case 36294:return du;case 36295:return fu;case 36296:return pu;case 35678:case 36198:case 36298:case 36306:case 35682:return mu;case 35679:case 36299:case 36307:return hu;case 35680:case 36300:case 36308:case 36293:return gu;case 36289:case 36303:case 36311:case 36292:return _u}}var yu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ql(t.type)}},bu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vu(t.type)}},xu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Su=/(\w+)(\])?(\[|\.)?/g;function Cu(e,t){e.seq.push(t),e.map[t.id]=t}function wu(e,t,n){let r=e.name,i=r.length;for(Su.lastIndex=0;;){let a=Su.exec(r),o=Su.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Cu(n,l===void 0?new yu(s,e,t):new bu(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new xu(s),Cu(n,e)),n=e}}}var Tu=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);wu(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Eu(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Du=37297,Ou=0;function ku(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Au=new J;function ju(e){jn._getMatrix(Au,jn.workingColorSpace,e);let t=`mat3( ${Au.elements.map(e=>e.toFixed(4))} )`;switch(jn.getTransfer(e)){case Ft:return[t,`LinearTransferOETF`];case It:return[t,`sRGBTransferOETF`];default:return U(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Mu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ku(e.getShaderSource(t),r)}return i}function Nu(e,t){let n=ju(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Pu={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Fu(e,t){let n=Pu[t];return n===void 0?(U(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Iu=new q;function Lu(){return jn.getLuminanceCoefficients(Iu),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Iu.x.toFixed(4)}, ${Iu.y.toFixed(4)}, ${Iu.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ru(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Vu).join(`
`)}function zu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Bu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Vu(e){return e!==``}function Hu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Wu=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gu(e){return e.replace(Wu,qu)}var Ku=new Map;function qu(e,t){let n=X[t];if(n===void 0){let e=Ku.get(t);if(e!==void 0)n=X[e],U(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Gu(n)}var Ju=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yu(e){return e.replace(Ju,Xu)}function Xu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Zu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Qu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function $u(e){return Qu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ed={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function td(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:ed[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var nd={302:`ENVMAP_MODE_REFRACTION`};function rd(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:nd[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var id={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ad(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:id[e.combine]||`ENVMAP_BLENDING_NONE`}function od(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function sd(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=$u(n),l=td(n),u=rd(n),d=ad(n),f=od(n),p=Ru(n),m=zu(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Vu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Vu).join(`
`),_.length>0&&(_+=`
`)):(g=[Zu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Vu).join(`
`),_=[Zu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:Fu(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,Nu(`linearToOutputTexel`,n.outputColorSpace),Lu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Vu).join(`
`)),o=Gu(o),o=Hu(o,n),o=Uu(o,n),s=Gu(s),s=Hu(s,n),s=Uu(s,n),o=Yu(o),s=Yu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Eu(i,i.VERTEX_SHADER,y),S=Eu(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Mu(i,x,`vertex`),n=Mu(i,S,`fragment`);W(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):U(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Tu(i,h),T=Bu(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Du)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ou++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var cd=0,ld=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ud(e),t.set(e,n)),n}},ud=class{constructor(e){this.id=cd++,this.code=e,this.usedTimes=0}};function dd(e){return e===1030||e===37490||e===36285}function fd(e,t,n,r,i,a){let o=new ir,s=new ld,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&U(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Pc[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,ee=!!x,te=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,se=!!i.metalnessMap,L=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.dispersion>0,de=i.iridescence>0,fe=i.sheen>0,pe=i.transmission>0,me=ce&&!!i.anisotropyMap,he=le&&!!i.clearcoatMap,ge=le&&!!i.clearcoatNormalMap,_e=le&&!!i.clearcoatRoughnessMap,ve=de&&!!i.iridescenceMap,ye=de&&!!i.iridescenceThicknessMap,R=fe&&!!i.sheenColorMap,be=fe&&!!i.sheenRoughnessMap,z=!!i.specularMap,xe=!!i.specularColorMap,Se=!!i.specularIntensityMap,Ce=pe&&!!i.transmissionMap,B=pe&&!!i.thicknessMap,we=!!i.gradientMap,Te=!!i.alphaMap,V=i.alphaTest>0,Ee=!!i.alphaHash,H=!!i.extensions,De=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(De=e.toneMapping);let Oe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:jn.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:ee,envMapMode:ee&&x.mapping,envMapCubeUVHeight:S,aoMap:te,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&dd(i.normalMap.format),metalnessMap:se,roughnessMap:L,anisotropy:ce,anisotropyMap:me,clearcoat:le,clearcoatMap:he,clearcoatNormalMap:ge,clearcoatRoughnessMap:_e,dispersion:ue,iridescence:de,iridescenceMap:ve,iridescenceThicknessMap:ye,sheen:fe,sheenColorMap:R,sheenRoughnessMap:be,specularMap:z,specularColorMap:xe,specularIntensityMap:Se,transmission:pe,transmissionMap:Ce,thicknessMap:B,gradientMap:we,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:V,alphaHash:Ee,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:te&&m(i.aoMap.channel),lightMapUv:ne&&m(i.lightMap.channel),bumpMapUv:re&&m(i.bumpMap.channel),normalMapUv:ie&&m(i.normalMap.channel),displacementMapUv:ae&&m(i.displacementMap.channel),emissiveMapUv:oe&&m(i.emissiveMap.channel),metalnessMapUv:se&&m(i.metalnessMap.channel),roughnessMapUv:L&&m(i.roughnessMap.channel),anisotropyMapUv:me&&m(i.anisotropyMap.channel),clearcoatMapUv:he&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ge&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:R&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(i.sheenRoughnessMap.channel),specularMapUv:z&&m(i.specularMap.channel),specularColorMapUv:xe&&m(i.specularColorMap.channel),specularIntensityMapUv:Se&&m(i.specularIntensityMap.channel),transmissionMapUv:Ce&&m(i.transmissionMap.channel),thicknessMapUv:B&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ie||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&jn.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&jn.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:H&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(H&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Pc[t];n=vs.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new sd(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function pd(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function md(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function hd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function gd(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||md),r.length>1&&r.sort(t||hd),i.length>1&&i.sort(t||hd),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function _d(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new gd,e.set(t,[i])):n>=r.length?(i=new gd,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function vd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new q,color:new Y};break;case`SpotLight`:n={position:new q,direction:new q,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new q,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new q,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new q,halfWidth:new q,halfHeight:new q}}return e[t.id]=n,n}}}function yd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var bd=0;function xd(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Sd(e){let t=new vd,n=yd(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new q);let i=new q,a=new qn,o=new qn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(xd);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=bd++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Cd(e){let t=new Sd(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function wd(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Cd(e),t.set(n,[a])):r>=i.length?(a=new Cd(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Td=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ed=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Dd=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],Od=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],kd=new qn,Ad=new q,jd=new q;function Md(e,t,n){let r=new fa,i=new K,a=new K,o=new Hn,s=new Es,c=new Ds,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new xs({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:Td,fragmentShader:Ed}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ci;m.setAttribute(`position`,new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Ki(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(U(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){U(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Wn(i.x,i.y,{format:Be,type:De,minFilter:z,magFilter:z,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Fa(i.x,i.y,H),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Ie,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ye,d.map.depthTexture.magFilter=ye}else l.isPointLight?(d.map=new ll(i.x),d.map.depthTexture=new Ia(i.x,Ee)):(d.map=new Wn(i.x,i.y),d.map.depthTexture=new Fa(i.x,i.y,Ee)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Ie,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=z,d.map.depthTexture.magFilter=z):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=ye,d.map.depthTexture.magFilter=ye);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Ad.setFromMatrixPosition(l.matrixWorld),e.position.copy(Ad),jd.copy(e.position),jd.add(Dd[t]),e.up.copy(Od[t]),e.lookAt(jd),e.updateMatrixWorld(),n.makeTranslation(-Ad.x,-Ad.y,-Ad.z),kd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(kd,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Wn(i.x,i.y,{format:Be,type:De})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Nd(e,t){function n(){let t=!1,n=new Hn,r=null,i=new Hn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):L(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Yt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):L(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Hn().fromArray(te),ie=new Hn().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),se(e.CULL_FACE),pe(0);function se(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function L(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(L(e.BLEND),g=!1);return}if(g===!1&&(se(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:W(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:W(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?L(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):L(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?L(e.CULL_FACE):(se(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):L(e.POLYGON_OFFSET_FILL)}function ye(t){t?se(e.SCISSOR_TEST):L(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function be(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function z(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function B(){try{e.texSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function V(){try{e.texStorage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function H(){try{e.texImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function De(){try{e.texImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Oe(t){return d[t]===void 0?e.getParameter(t):d[t]}function ke(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ae(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function je(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function Me(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ne(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:L,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:R,bindTexture:be,unbindTexture:z,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:H,texImage3D:De,pixelStorei:ke,getParameter:Oe,updateUBOMapping:Me,uniformBlockBinding:Ne,texStorage2D:V,texStorage3D:Ee,texSubImage2D:Ce,texSubImage3D:B,compressedTexSubImage2D:we,compressedTexSubImage3D:Te,scissor:Ae,viewport:je,reset:Pe}}function Pd(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new K,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Ht(`canvas`)}function g(e,t,n){let r=1,i=De(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),U(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&U(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ft:jn.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&U(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&Ee(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)U(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)U(`WebGLRenderer: Texture marked for update but image is incomplete`);else{L(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){L(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function I(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){L(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ee(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ce(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let te={[ge]:e.REPEAT,[_e]:e.CLAMP_TO_EDGE,[ve]:e.MIRRORED_REPEAT},ne={[ye]:e.NEAREST,[R]:e.NEAREST_MIPMAP_NEAREST,[be]:e.NEAREST_MIPMAP_LINEAR,[z]:e.LINEAR,[xe]:e.LINEAR_MIPMAP_NEAREST,[Se]:e.LINEAR_MIPMAP_LINEAR},re={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ie(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,te[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,te[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,te[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ne[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ne[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,re[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ae(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function oe(e,t,n){return Math.floor(Math.floor(e/n)/t)}function se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=oe(n.start,r.width,4),c=oe(t.start,r.width,4);n.start<=i+1&&a===c&&oe(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function L(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ae(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=jn.getPrimaries(jn.workingColorSpace),r=o.colorSpace===``?null:jn.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=H(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ie(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Le,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&se(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Ac(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Ac(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=De(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=De(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ce(t,o,s){if(o.image.length!==6)return;let c=ae(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=jn.getPrimaries(jn.workingColorSpace),r=o.colorSpace===``?null:jn.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=H(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);ie(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=De(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),V(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Te(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ue(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;V(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);V(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function de(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ie(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=Te(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)V(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)V(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function fe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)de(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?de(i.__webglFramebuffer[0],t,0):de(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ue(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ue(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function pe(t,n,i){let a=r.get(t);n!==void 0&&le(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&fe(t)}function me(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&V(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ue(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ie(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)le(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else le(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ie(c,a),le(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ie(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)le(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else le(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&fe(t)}function he(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Ce=[],B=[];function we(t){if(t.samples>0){if(V(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ce.length=0,B.length=0,Ce.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Ce.push(l),B.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,B)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(i.maxSamples,e.samples)}function V(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ee(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function H(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(jn.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):W(`WebGLTextures: Unsupported texture color space:`,n)),t}function De(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=F,this.setTexture3D=I,this.setTextureCube=ee,this.rebindTextures=pe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=fe,this.setupFrameBufferTexture=le,this.useMultisampledRTT=V,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Fd(e,t){function n(n,r=``){let i,a=jn.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Id=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ld=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Rd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new La(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new xs({vertexShader:Id,fragmentShader:Ld,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ki(new ls(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},zd=class extends Xt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Rd,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new K,C=null,w=new nc;w.viewport=new Hn;let T=new nc;T.viewport=new Hn;let E=[w,T],D=new dc,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Cr,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Cr,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Cr,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function j(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,j),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,re.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,j),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Le:Ie,a=_.stencil?Ae:Ee);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Wn(d.textureWidth,d.textureHeight,{format:Fe,type:Ce,depthTexture:new Fa(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Wn(f.framebufferWidth,f.framebufferHeight,{format:Fe,type:Ce,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),re.setContext(r),re.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let N=new q,P=new q;function F(e,t,n){N.setFromMatrixPosition(t.matrixWorld),P.setFromMatrixPosition(n.matrixWorld);let r=N.distanceTo(P),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function I(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;I(D,i);for(let e=0;e<a.length;e++)I(a[e],i);a.length===2?F(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ee(e,D,i)};function ee(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=en*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let te=null;function ne(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new nc,o.layers.enable(n),o.viewport=new Hn,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new La,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}te&&te(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let re=new Mc;re.setAnimationLoop(ne),this.setAnimationLoop=function(e){te=e},this.dispose=function(){}}},Bd=new qn,Vd=new J;Vd.set(-1,0,0,0,1,0,0,0,1);function Hd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,_s(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Bd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Vd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ud(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return W(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):U(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Wd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Gd=null;function Kd(){return Gd===null&&(Gd=new Yi(Wd,16,16,Be,De),Gd.name=`DFG_LUT`,Gd.minFilter=z,Gd.magFilter=z,Gd.wrapS=_e,Gd.wrapT=_e,Gd.generateMipmaps=!1,Gd.needsUpdate=!0),Gd}var qd=class{constructor(e={}){let{canvas:t=Ut(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Ce}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([He,Ve,ze]),g=new Set([Ce,Ee,Te,Ae,Oe,ke]),_=new Uint32Array(4),v=new Int32Array(4),y=new q,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Nt;let j=0,M=0,N=null,P=-1,F=null,I=new Hn,ee=new Hn,te=null,ne=new Y(0),re=0,ie=t.width,ae=t.height,oe=1,se=null,L=null,ce=new Hn(0,0,ie,ae),le=new Hn(0,0,ie,ae),ue=!1,de=new fa,fe=!1,pe=!1,me=new qn,he=new q,ge=new Hn,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return N===null?oe:1}let R=n;function be(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,$e,!1),t.addEventListener(`webglcontextrestored`,et,!1),t.addEventListener(`webglcontextcreationerror`,tt,!1),R===null){let t=`webgl2`;if(R=be(t,e),R===null)throw be(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw W(`WebGLRenderer: `+e.message),e}let z,xe,B,we,V,H,je,Me,Ne,Pe,Fe,Ie,Le,Re,Be,Ue,We,Ge,Ke,qe,Je,Ye,Xe;function Ze(){z=new dl(R),z.init(),Je=new Fd(R,z),xe=new Vc(R,z,e,Je),B=new Nd(R,z),xe.reversedDepthBuffer&&d&&B.buffers.depth.setReversed(!0),O=R.createFramebuffer(),k=R.createFramebuffer(),A=R.createFramebuffer(),we=new ml(R),V=new pd,H=new Pd(R,z,B,V,xe,Je,we),je=new ul(T),Me=new Nc(R),Ye=new zc(R,Me),Ne=new fl(R,Me,we,Ye),Pe=new gl(R,Ne,Me,Ye,we),Ge=new hl(R,xe,H),Be=new Hc(V),Fe=new fd(T,je,z,xe,Ye,Be),Ie=new Hd(T,V),Le=new _d,Re=new wd(z),We=new Rc(T,je,B,Pe,p,s),Ue=new Md(T,Pe,xe),Xe=new Ud(R,we,xe,B),Ke=new Bc(R,z,we),qe=new pl(R,z,we),we.programs=Fe.programs,T.capabilities=xe,T.extensions=z,T.properties=V,T.renderLists=Le,T.shadowMap=Ue,T.state=B,T.info=we}Ze(),m!==1009&&(w=new vl(m,t.width,t.height,o,r,i));let Qe=new zd(T,R);this.xr=Qe,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=z.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=z.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(e){e!==void 0&&(oe=e,this.setSize(ie,ae,!1))},this.getSize=function(e){return e.set(ie,ae)},this.setSize=function(e,n,r=!0){if(Qe.isPresenting){U(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ie=e,ae=n,t.width=Math.floor(e*oe),t.height=Math.floor(n*oe),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ie*oe,ae*oe).floor()},this.setDrawingBufferSize=function(e,n,r){ie=e,ae=n,oe=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),B.viewport(I.copy(ce).multiplyScalar(oe).round())},this.getScissor=function(e){return e.copy(le)},this.setScissor=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),B.scissor(ee.copy(le).multiplyScalar(oe).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(e){B.setScissorTest(ue=e)},this.setOpaqueSort=function(e){se=e},this.setTransparentSort=function(e){L=e},this.getClearColor=function(e){return e.copy(We.getClearColor())},this.setClearColor=function(){We.setClearColor(...arguments)},this.getClearAlpha=function(){return We.getClearAlpha()},this.setClearAlpha=function(){We.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=We.getClearColor(),r=We.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,$e,!1),t.removeEventListener(`webglcontextrestored`,et,!1),t.removeEventListener(`webglcontextcreationerror`,tt,!1),We.dispose(),Le.dispose(),Re.dispose(),V.dispose(),je.dispose(),Pe.dispose(),Ye.dispose(),Xe.dispose(),Fe.dispose(),Qe.dispose(),Qe.removeEventListener(`sessionstart`,ct),Qe.removeEventListener(`sessionend`,lt),ut.stop()};function $e(e){e.preventDefault(),Gt(`WebGLRenderer: Context Lost.`),E=!0}function et(){Gt(`WebGLRenderer: Context Restored.`),E=!1;let e=we.autoReset,t=Ue.enabled,n=Ue.autoUpdate,r=Ue.needsUpdate,i=Ue.type;Ze(),we.autoReset=e,Ue.enabled=t,Ue.autoUpdate=n,Ue.needsUpdate=r,Ue.type=i}function tt(e){W(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function nt(e){let t=e.target;t.removeEventListener(`dispose`,nt),rt(t)}function rt(e){it(e),V.remove(e)}function it(e){let t=V.get(e).programs;t!==void 0&&(t.forEach(function(e){Fe.releaseProgram(e)}),e.isShaderMaterial&&Fe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=bt(e,t,n,r,i);B.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ne.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ye.setup(i,r,s,n,c);let h,g=Ke;if(c!==null&&(h=Me.get(c),g=qe,g.setIndex(h)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*ye()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(z.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Me.get(c).bytesPerElement:1,o=V.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function at(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,gt(e,t,n),e.side=0,e.needsUpdate=!0,gt(e,t,n),e.side=2):gt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Re.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];at(a,n,e),r.add(a)}else at(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){V.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}z.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ot=null;function st(e){ot&&ot(e)}function ct(){ut.stop()}function lt(){ut.start()}let ut=new Mc;ut.setAnimationLoop(st),typeof self<`u`&&ut.setContext(self),this.setAnimationLoop=function(e){ot=e,Qe.setAnimationLoop(e),e===null?ut.stop():ut.start()},Qe.addEventListener(`sessionstart`,ct),Qe.addEventListener(`sessionend`,lt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Qe.enabled===!0&&Qe.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(t),t=Qe.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Re.get(e,C.length),x.init(t),x.state.textureUnits=H.getTextureUnits(),C.push(x),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),de.setFromProjectionMatrix(me,zt,t.reversedDepth),pe=this.localClippingEnabled,fe=Be.init(this.clippingPlanes,pe),b=Le.get(e,S.length),b.init(),S.push(b),Qe.enabled===!0&&Qe.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&dt(e,t,-1/0,T.sortObjects)}dt(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(se,L,t.reversedDepth),ve=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,ve&&We.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),fe===!0&&Be.beginShadows();let i=x.state.shadowsArray;if(Ue.render(i,e,t),fe===!0&&Be.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];pt(n,r,e,a)}ve&&We.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ft(b,e,n,n.viewport)}}else r.length>0&&pt(n,r,e,t),ve&&We.render(e),ft(b,e,t)}N!==null&&M===0&&(H.updateMultisampleRenderTarget(N),H.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ye.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],H.setTextureUnits(x.state.textureUnits),fe===!0&&Be.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function dt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||de.intersectsSprite(e)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let t=Pe.update(e),i=e.material;i.visible&&b.push(e,t,i,n,ge.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||de.intersectsObject(e))){let t=Pe.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ge.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,ge.z,o)}}else i.visible&&b.push(e,t,i,n,ge.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)dt(i[e],t,n,r)}function ft(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),fe===!0&&Be.setGlobalState(T.clippingPlanes,n),r&&B.viewport(I.copy(r)),i.length>0&&mt(i,t,n),a.length>0&&mt(a,t,n),o.length>0&&mt(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function pt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=z.has(`EXT_color_buffer_half_float`)||z.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Wn(1,1,{generateMipmaps:!0,type:e?De:Ce,minFilter:Se,samples:Math.max(4,xe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jn.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ne),re=T.getClearAlpha(),re<1&&T.setClearColor(16777215,.5),T.clear(),ve&&We.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),fe===!0&&Be.setGlobalState(T.clippingPlanes,r),mt(e,n,r),H.updateMultisampleRenderTarget(a),H.updateRenderTargetMipmap(a),z.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ht(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(H.updateMultisampleRenderTarget(a),H.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ne,re),d!==void 0&&(r.viewport=d),T.toneMapping=u}function mt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ht(o,t,n,s,l,c)}}function ht(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function gt(e,t,n){t.isScene!==!0&&(t=_e);let r=V.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Fe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Fe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=je.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,nt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return vt(e,s),d}else s.uniforms=Fe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Fe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Be.uniform),vt(e,s),r.needsLights=St(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function _t(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Tu.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function vt(e,t){let n=V.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function yt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function bt(e,t,n,r,i){t.isScene!==!0&&(t=_e),H.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:jn.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=je.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=V.get(r),y=x.state.lights;if(fe===!0&&(pe===!0||e!==F)){let t=e===F&&r.id===P;Be.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Be.numPlanes||v.numIntersection!==Be.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=gt(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(B.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=yt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||F!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(R,`projectionMatrix`,e.projectionMatrix),O.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(R,he.setFromMatrixPosition(e.matrixWorld)),xe.logarithmicDepthBuffer&&O.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,H),y.state.spotShadowMap.length>0&&O.setValue(R,`spotShadowMap`,y.state.spotShadowMap,H),y.state.pointShadowMap.length>0&&O.setValue(R,`pointShadowMap`,y.state.pointShadowMap,H)),i.isSkinnedMesh){O.setOptional(R,i,`bindMatrix`),O.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(R,`boneTexture`,e.boneTexture,H))}i.isBatchedMesh&&(O.setOptional(R,i,`batchingTexture`),O.setValue(R,`batchingTexture`,i._matricesTexture,H),O.setOptional(R,i,`batchingIdTexture`),O.setValue(R,`batchingIdTexture`,i._indirectTexture,H),O.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(R,`batchingColorTexture`,i._colorsTexture,H));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ge.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Kd()),w){if(O.setValue(R,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&xt(k,E),a&&r.fog===!0&&Ie.refreshFogUniforms(k,a),Ie.refreshMaterialUniforms(k,r,oe,ae,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Tu.upload(R,_t(v),k,H)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Tu.upload(R,_t(v),k,H),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(R,`center`,i.center),O.setValue(R,`modelViewMatrix`,i.modelViewMatrix),O.setValue(R,`normalMatrix`,i.normalMatrix),O.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Xe.update(n,S),Xe.bind(n,S)}}return S}function xt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function St(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=V.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),V.get(e.texture).__webglTexture=t,V.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=V.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=V.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),ee.copy(e.scissor),te=e.scissorTest,B.viewport(I),B.scissor(ee),B.setScissorTest(te),P=-1;return}if(o.__webglFramebuffer===void 0)H.setupRenderTarget(e);else if(o.__hasExternalTextures)H.rebindTextures(e,V.get(e.texture).__webglTexture,V.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&V.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);H.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=V.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&H.useMultisampledRTT(e)===!1?V.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),ee.copy(e.scissor),te=e.scissorTest}else I.copy(ce).multiplyScalar(oe).floor(),ee.copy(le).multiplyScalar(oe).floor(),te=ue;if(n!==0&&(r=O),B.bindFramebuffer(R.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(I),B.scissor(ee),B.setScissorTest(te),i){let r=V.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=V.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=V.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}P=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){B.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s),!xe.textureFormatReadable(c)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!xe.textureTypeReadable(l)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Je.convert(c),Je.convert(l),a)}finally{let e=N===null?null:V.get(N).__webglFramebuffer;B.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s),!xe.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!xe.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,d),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Je.convert(l),Je.convert(u),0);let f=N===null?null:V.get(N).__webglFramebuffer;B.bindFramebuffer(R.FRAMEBUFFER,f);let p=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await Jt(R,p,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,d),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.deleteBuffer(d),R.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;H.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Je.convert(t.format),_=Je.convert(t.type),v;t.isData3DTexture?(H.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(H.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(H.setTexture2D(t,0),v=R.TEXTURE_2D),B.activeTexture(R.TEXTURE0),B.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=B.getParameter(R.UNPACK_ROW_LENGTH),b=B.getParameter(R.UNPACK_IMAGE_HEIGHT),x=B.getParameter(R.UNPACK_SKIP_PIXELS),S=B.getParameter(R.UNPACK_SKIP_ROWS),C=B.getParameter(R.UNPACK_SKIP_IMAGES);B.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),B.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),B.pixelStorei(R.UNPACK_SKIP_PIXELS,l),B.pixelStorei(R.UNPACK_SKIP_ROWS,u),B.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=V.get(e),r=V.get(t),h=V.get(n.__renderTarget),g=V.get(r.__renderTarget);B.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),B.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,V.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,V.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);B.bindFramebuffer(R.READ_FRAMEBUFFER,null),B.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||V.has(e)){let n=V.get(e),r=V.get(t);B.bindFramebuffer(R.READ_FRAMEBUFFER,k),B.bindFramebuffer(R.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);B.bindFramebuffer(R.READ_FRAMEBUFFER,null),B.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);B.pixelStorei(R.UNPACK_ROW_LENGTH,y),B.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),B.pixelStorei(R.UNPACK_SKIP_PIXELS,x),B.pixelStorei(R.UNPACK_SKIP_ROWS,S),B.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),B.unbindTexture()},this.initRenderTarget=function(e){V.get(e).__webglFramebuffer===void 0&&H.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?H.setTextureCube(e,0):e.isData3DTexture?H.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?H.setTexture2DArray(e,0):H.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,B.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return zt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=jn._getDrawingBufferColorSpace(e),t.unpackColorSpace=jn._getUnpackColorSpace()}};function Jd(){let e=new xr;e.name=`Station service envelope`,e.position.fromArray(de.center);let t=[],n=de.radiusM;for(let e=0;e<3;e++)for(let r=0;r<48;r+=2)for(let i of[r,r+1]){let r=[0,0,0],a=i/48*Math.PI*2;r[(e+1)%3]=Math.cos(a)*n,r[(e+2)%3]=Math.sin(a)*n,t.push(...r)}let r=new Ci;r.setAttribute(`position`,new di(t,3));let i=new pa({color:8636851,transparent:!0,opacity:.32,depthWrite:!1}),a=new Ta(r,i);return a.raycast=()=>{},e.add(a),{group:e,setReady(e){i.color.setHex(e?11855557:8636851),i.opacity=e?.5:.32}}}function Yd(e,{getFleet:t,onChange:n,onError:r}){let i=document.createElement(`section`);i.id=`maneuver-editor`,e.insertBefore(i,e.children[1]),i.innerHTML=`<div class="eyebrow">MANEUVER NODE</div><p class="node-help">Click your orbit to place a burn.</p><div class="node-fields" hidden><label>Ignition in, s<input id="node-time" type="number" min="60" step="10"></label><label class="prograde">Prograde, m/s<input id="node-prograde" type="number" step="1"></label><label class="radial">Radial out, m/s<input id="node-radial" type="number" step="1"></label><label class="normal">Normal, m/s<input id="node-normal" type="number" step="1"></label><p class="node-readout" aria-live="polite"></p><div class="button-grid"><button id="node-commit" class="primary">Commit node</button><button id="node-delete">Delete</button></div><p class="subtle">Negative values reverse direction. Point manually at ignition; preview assumes a settled ship at full throttle.</p></div>`;let a=e=>i.querySelector(e),o=a(`.node-fields`),s=a(`.node-readout`),c=a(`#node-commit`),l=null,u=null,d=null,f=``,p=!1;function m(){let e=t(),n=e.plan,r=n?.kind===`maneuver`;if((u!==e||l!==e.selectedId)&&(u=e,l=e.selectedId,d=null,f=``,p=!1),n!==d&&(d=n,!r&&!f&&(p=!1),r)){p=!0,f=``,a(`#node-time`).value=(n.nodes[0].start-e.time).toFixed(1);for(let e of[`prograde`,`radial`,`normal`])a(`#node-`+e).value=n.nodes[0].maneuver.components[e]}if(o.hidden=!p,i.hidden=document.body.dataset.view!==`map`,a(`.node-help`).textContent=r?`Click another orbit point to move ignition.`:`Click your orbit to place a burn.`,c.disabled=!r||e.selected.plan===n,r&&e.selected.plan===n&&document.activeElement!==a(`#node-time`)&&(a(`#node-time`).value=Math.max(0,n.nodes[0].start-e.time).toFixed(1)),f)s.textContent=f;else if(r){let t=n.nodes[0];s.textContent=`${e.selected.plan===n?`COMMITTED`:`PREVIEW`} · ${t.deltaV.toFixed(1)} m/s\n${t.duration.toFixed(2)} s burn · ${n.consumed.toFixed(1)} kg fuel\n${n.final.fuel.toFixed(1)} kg remaining${n.surfaceLimited?`
Path ends at surface warning region`:``}`}}function h(e){let i=t();i.paused=!0,p=!0,f=``;try{i.makeManeuver(e)}catch(e){f=e.message,r(e.message)}n(),m()}for(let e of[`time`,`prograde`,`radial`,`normal`])a(`#node-`+e).addEventListener(`input`,()=>{h({version:1,start:t().time+Number(a(`#node-time`).value),components:Object.fromEntries([`prograde`,`radial`,`normal`].map(e=>[e,Number(a(`#node-`+e).value)]))})});c.onclick=()=>{try{t().commitPlan(),t().paused=!1,n()}catch(e){r(e.message)}m()},a(`#node-delete`).onclick=()=>{t().cancel(),g(),n()};function g(){p=!1,d=null,f=``,m()}function _(e){let n=t().plan;h({version:1,start:e,components:n?.kind===`maneuver`?n.nodes[0].maneuver.components:{prograde:10,radial:0,normal:0}})}return{refresh:m,reset:g,selectPoint:_}}var Xd=(e,t)=>{if(!e)throw Error(t)},Zd=e=>typeof e==`string`&&e.length>0,Qd=e=>Number.isFinite(e)&&e>=0,$d=(e,t)=>e===t.resourceId;function ef(e){let t=new Map;for(let n of e){let e=t.get(n.resourceId)||{sum:0,error:0},r=n.amountKg-e.error,i=e.sum+r;Xd(Number.isFinite(i),`Resource total overflows`),t.set(n.resourceId,{sum:i,error:i-e.sum-r})}return new Map([...t].map(([e,t])=>[e,t.sum]))}function tf(e,t){Xd(Array.isArray(e),`Pumps must be an array`);let n=new Set(t.map(e=>e.id)),r=new Set;for(let t of e)Xd(t&&Zd(t.id)&&!r.has(t.id),`Invalid or duplicate pump identity`),r.add(t.id),Xd(n.has(t.sourceTankId)&&n.has(t.destinationTankId),`Pump references an absent tank`),Xd(t.sourceTankId!==t.destinationTankId,`A pump needs distinct tanks`),Xd(typeof t.enabled==`boolean`&&Qd(t.rateKgPerS),`Invalid pump controls`);return!0}function nf({tanks:e,pumps:t,membership:n,dt:r,compatible:i=$d}){Xd(Qd(r),`Invalid pump time interval`),Xd(typeof i==`function`,`Invalid compatibility policy`),Xd(Array.isArray(e)&&Array.isArray(n),`Invalid tanks or membership`);let a=new Map,o=new Map,s=new Set;for(let e of n){Xd(e&&Zd(e.bodyId)&&!s.has(e.bodyId),`Invalid or duplicate physical body`),s.add(e.bodyId),Xd(Array.isArray(e.componentIds)&&e.componentIds.length>0,`Empty physical membership`);for(let t of e.componentIds)Xd(Zd(t)&&!o.has(t),`Component belongs to multiple physical bodies`),o.set(t,e.bodyId)}for(let t of e)Xd(t&&Zd(t.id)&&!a.has(t.id),`Invalid or duplicate tank identity`),Xd(Zd(t.componentId)&&o.has(t.componentId),`Tank has no physical component`),Xd(Zd(t.resourceId)&&Qd(t.amountKg)&&Qd(t.capacityKg)&&t.amountKg<=t.capacityKg,`Invalid tank contents or capacity`),a.set(t.id,Object.freeze({...t}));let c=ef(e);tf(t,e);for(let e of t){if(Xd(Number.isFinite(e.rateKgPerS*r),`Pump interval overflows`),!e.enabled)continue;let t=a.get(e.sourceTankId),n=a.get(e.destinationTankId);Xd(t.resourceId===n.resourceId&&i(t.resourceId,n,t)===!0,`Incompatible pump resource`)}let l=new Map(e.map(e=>[e.id,e.amountKg])),u=new Map(e.map(e=>[e.id,e.capacityKg-e.amountKg])),d=new Map(e.map(e=>[e.id,0])),f=new Map(t.map(e=>[e.id,{...e}])),p=[];for(let e of[...t].sort((e,t)=>e.id<t.id?-1:+(e.id>t.id))){let t=a.get(e.sourceTankId),n=a.get(e.destinationTankId),i={pumpId:e.id,sourceTankId:t.id,destinationTankId:n.id,resourceId:t.resourceId,quantityKg:0,status:`disabled`};if(e.enabled){if(o.get(t.componentId)!==o.get(n.componentId))f.get(e.id).enabled=!1,i.status=`disconnected`;else{let a=e.rateKgPerS*r,o=l.get(t.id),s=u.get(n.id),c=Math.min(a,o,s);i.quantityKg=c,i.status=a===0?`idle`:c===a?`flowing`:o<=s?`source-limited`:`capacity-limited`,l.set(t.id,o-c),u.set(n.id,s-c),d.set(t.id,d.get(t.id)-c),d.set(n.id,d.get(n.id)+c)}}p.push(i)}let m=e.map(e=>({...e,amountKg:e.amountKg+d.get(e.id)}));for(let e of m){let t=32*2**-52*Math.max(1,e.capacityKg);Xd(Number.isFinite(e.amountKg)&&e.amountKg>=-t&&e.amountKg<=e.capacityKg+t,`Pump result exceeds tank capacity`),e.amountKg=Math.min(e.capacityKg,Math.max(0,e.amountKg))}let h=ef(m);for(let[e,t]of c){let n=64*2**-52*Math.max(1,t);Xd(Math.abs(h.get(e)-t)<=n,`Pump transaction does not conserve resource`)}return{tanks:m,pumps:t.map(e=>f.get(e.id)),transfers:p,changedTankIds:e.filter(e=>d.get(e.id)!==0).map(e=>e.id)}}var rf=e=>new Float64Array([-e[0],-e[1],-e[2],e[3]]),af=class{constructor(){this.nodes=new Map([[`universe`,{id:`universe`,parent:null,at:()=>({r:e(),v:e(),q:u(),omega:e()})}]])}add({id:e,parent:t=`universe`,at:n}){if(this.nodes.has(e)||!this.nodes.has(t)||typeof n!=`function`)throw Error(`Invalid frame identity, parent or transform`);return this.nodes.set(e,{id:e,parent:t,at:n}),this}path(e){let t=[];for(;e;){let n=this.nodes.get(e);if(!n)throw Error(`Unknown reference frame`);t.push(e),e=n.parent}return t}common(e,t){let n=new Set(this.path(t));return this.path(e).find(e=>n.has(e))}transform(r,i,o){if(r.epoch!==void 0&&Math.abs(r.epoch-o)>1e-8)throw Error(`Frame conversion requires a shared epoch`);let s=r.frameId,c=this.common(s,i),l=this.path(s).slice(0,this.path(s).indexOf(c)),p=this.path(i).slice(0,this.path(i).indexOf(c)).reverse(),g={r:e(...r.r),v:e(...r.v),q:r.q?new Float64Array(r.q):u(),omega:r.omega?e(...r.omega):e()};for(let e of l){let n=this.nodes.get(e).at(o);g={r:t(n.r,m(n.q,g.r)),v:t(n.v,m(n.q,t(g.v,a(n.omega,g.r)))),q:d(f(n.q,g.q)),omega:m(n.q,t(g.omega,n.omega))}}for(let e of p){let t=this.nodes.get(e).at(o),r=h(t.q,n(g.r,t.r));g={r,v:n(h(t.q,n(g.v,t.v)),a(t.omega,r)),q:d(f(rf(t.q),g.q)),omega:n(h(t.q,g.omega),t.omega)}}return{...r,...g,frameId:i,epoch:o}}relative(e,t,r){let i=this.common(e.frameId,t.frameId),a=this.transform(e,i,r),o=this.transform(t,i,r);return{r:n(a.r,o.r),v:n(a.v,o.v),frameId:i,epoch:r}}};function of({parentOffset:t=e(0x6f05b59d3b200000,-0x29a2241af62c0000,0x4563918244f40000)}={}){return new af().add({id:`star`,at:()=>({r:t,v:e(),q:u(),omega:e()})}).add({id:`aster`,parent:`star`,at:t=>({r:e(12e10,0,22e3*t),v:e(0,0,22e3),q:u(),omega:e()})})}var sf=(t,n=`aster`,r=0)=>({r:t.r,v:t.v,q:t.q||u(),omega:t.q?m(t.q,t.omega||e()):e(),frameId:t.frameId||n,epoch:r}),cf=of(),lf={id:`nose`,type:`capture-1.3`,position:[0,0,-7.95],normal:[0,0,-1]},uf={id:`forward`,type:`capture-1.3`,position:[0,0,17.65],normal:[0,0,1]};function df(r,i){let o=r.design?L(r).com:e(),s=m(r.q,n(i.position,o)),c=m(r.q,r.omega||e());return{r:t(r.r,s),v:t(r.v,a(c,s)),normal:m(r.q,i.normal),up:m(r.q,[0,1,0])}}function ff(e,t,{occupiedBy:a=null,time:l=0,shipPort:u=lf,depotPort:d=uf,frames:f=cf}={}){let p=f.common(e.frameId||`aster`,t.frameId||`aster`),m=e=>{if((e.frameId||`aster`)===p)return e;let t=f.transform(sf(e,e.frameId,l),p,l);return{...e,...t,omega:h(t.q,t.omega)}};e=m(e),t=m(t);let g=df(e,u),_=df(t,d),v=n(g.r,_.r),y=n(g.v,_.v),b=o(v),x=o(y),S=Math.acos(c(i(g.normal,r(_.normal,-1)),-1,1)),C=Math.acos(c(i(g.up,_.up),-1,1)),w=u.type===d.type,T=!a||a===e.id,E=l<(e.captureInhibitUntil||0),D={range:b,speed:x,closing:-i(y,s(v)),alignment:S,roll:C,compatible:w,available:T,inhibited:E,shipPort:g,depotPort:_};return D.status=w?T?E?`released`:b<=.65&&x<=.45&&S<8*Math.PI/180&&C<12*Math.PI/180?`capture`:b<.8&&x>2?`impact`:b<.65?S>=8*Math.PI/180||C>=12*Math.PI/180?`misaligned`:`too-fast`:`approach`:`occupied`:`incompatible`,D}function pf(r,i,o=uf){let s=df(i,o),c=r.design?L(r).com:e(),l=m(i.q,n(c,lf.position)),u=m(i.q,i.omega||e());r.frameId=i.frameId||`aster`,r.epoch=i.epoch??r.epoch,r.r=t(s.r,l),r.v=t(s.v,a(u,l)),r.q=new Float64Array(i.q),r.omega=new Float64Array(i.omega||e())}function mf(e,t,n={}){let r=ff(e,t,n);return r.status===`capture`?(e.docked={stationId:t.id,portId:uf.id},pf(e,t),r):r}function hf(e,n,i=0){if(e.docked?.stationId!==n.id)throw Error(`Ship is not attached to this depot`);pf(e,n);let a=df(n,uf).normal;return e.v=t(e.v,r(a,.15)),e.docked=null,e.captureInhibitUntil=i+8,{separationDeltaV:.15}}function gf(e,a){let o=a.depotPort.normal,s=i(n(e.v,a.depotPort.v),o);return s<0&&(e.v=n(e.v,r(o,s*1.15))),e.r=t(e.r,r(o,Math.max(0,.8-a.range))),a.status===`impact`?`damage`:`bump`}var _f=()=>[0,0,0],vf=()=>[0,0,0,1],yf=e=>Array.from(e),bf=(e,n)=>yf(t(e,n)),xf=(e,t)=>yf(n(e,t)),Sf=(e,t)=>yf(r(e,t)),Cf=e=>structuredClone(e),wf=(e,t)=>{if(!e)throw Error(t)},Tf=(e,t)=>e?.length===t&&Array.from(e).every(Number.isFinite),Ef=e=>typeof e==`string`&&e.length>0,Df=e=>Tf(e,4)&&Math.abs(Math.hypot(...e)-1)<1e-10,Of=e=>Tf(e,3)&&Math.abs(o(e)-1)<1e-10,kf=(e,t)=>e.id<t.id?-1:+(e.id>t.id);function Af(e){if(!Tf(e,9))return!1;let t=1e-10*Math.max(...e.map(Math.abs),1);if(Math.abs(e[1]-e[3])>t||Math.abs(e[2]-e[6])>t||Math.abs(e[5]-e[7])>t)return!1;let n=e[0]*(e[4]*e[8]-e[5]*e[7])-e[1]*(e[3]*e[8]-e[5]*e[6])+e[2]*(e[3]*e[7]-e[4]*e[6]);return e[0]>0&&e[0]*e[4]-e[1]*e[3]>0&&n>0}function jf(e,t){let n=[[1,0,0],[0,1,0],[0,0,1]].map(e=>m(t,e));return Array.from({length:9},(t,r)=>{let i=Math.floor(r/3),a=r%3,o=0;for(let t=0;t<3;t++)for(let r=0;r<3;r++)o+=n[t][i]*e[3*t+r]*n[r][a];return o})}function Mf(e){wf(e.length>0,`Empty assembly`);let t=e.reduce((e,t)=>e+t.mass,0),n=_f();for(let r of e)n=bf(n,Sf(r.position,r.mass/t));let r=Array(9).fill(0);for(let t of e){let e=xf(t.position,n),a=i(e,e),o=jf(t.inertia,t.q);for(let n=0;n<3;n++)for(let i=0;i<3;i++)r[3*n+i]+=o[3*n+i]+t.mass*((n===i?a:0)-e[n]*e[i])}return{mass:t,com:n,inertia:r}}function Nf(e,t){let n=new Set(e.map(e=>e.id)),r=[];for(;n.size;){let e=new Set([n.values().next().value]),i=[...e];for(let r of i){n.delete(r);for(let n of t){let t=n.a.componentId===r?n.b.componentId:n.b.componentId===r?n.a.componentId:null;t!==null&&!e.has(t)&&(e.add(t),i.push(t))}}r.push(e)}return r}function Pf(e,t){let n=e.components.find(e=>e.id===t?.componentId),r=n?.ports.find(e=>e.id===t?.portId);return wf(r,`Invalid port reference`),{component:n,port:r}}var Ff=(e,t)=>e.componentId===t.componentId&&e.portId===t.portId,If=(e,t)=>e.joints.some(e=>Ff(e.a,t)||Ff(e.b,t))||Pf(e,t).port.available===!1;function Lf(e){wf(Ef(e.id)&&Ef(e.frameId)&&Number.isFinite(e.epoch),`Invalid body identity/frame/epoch`),wf(Tf(e.r,3)&&Tf(e.v,3)&&Tf(e.omega,3)&&Df(e.q),`Invalid body motion`),wf(Array.isArray(e.components)&&e.components.length>0&&Array.isArray(e.joints),`Invalid component graph`);let t=new Set,n=new Set,r=new Set;for(let a of e.components){wf(Ef(a.id)&&!t.has(a.id),`Duplicate or invalid component ID`),t.add(a.id),wf(Number.isFinite(a.mass)&&a.mass>0&&Af(a.inertia),`Invalid finite component mass/inertia`),wf(Tf(a.position,3)&&Df(a.q),`Invalid component transform`),wf(Array.isArray(a.ports)&&Array.isArray(a.engines)&&Array.isArray(a.resources),`Missing component hardware/inventory`);let e=new Set;for(let t of a.ports)wf(Ef(t.id)&&!e.has(t.id)&&Ef(t.type),`Invalid port identity/type`),e.add(t.id),wf(Tf(t.position,3)&&Of(t.normal)&&Of(t.up)&&Math.abs(i(t.normal,t.up))<1e-10,`Invalid port face basis`),wf(Number.isFinite(t.radius)&&t.radius>0&&(t.available===void 0||typeof t.available==`boolean`),`Invalid port radius/availability`);for(let e of a.resources)wf(Ef(e.id)&&!r.has(e.id)&&Ef(e.resourceId)&&Number.isFinite(e.amountKg)&&e.amountKg>=0,`Invalid resource identity/quantity`),r.add(e.id);for(let e of a.engines)wf(Ef(e.id)&&!n.has(e.id),`Duplicate or invalid engine ID`),n.add(e.id),wf(Tf(e.position,3)&&Of(e.direction)&&Number.isFinite(e.maxThrust)&&e.maxThrust>=0&&Number.isFinite(e.isp)&&e.isp>0&&typeof e.enabled==`boolean`,`Invalid engine`),wf(a.resources.some(t=>t.id===e.feedResourceId),`Engine feed must name its own component resource`)}let a=new Set,s=[];for(let t of e.joints){wf(Ef(t.id)&&!a.has(t.id)&&t.a.componentId!==t.b.componentId,`Invalid joint`),a.add(t.id),Pf(e,t.a),Pf(e,t.b);for(let e of[t.a,t.b])wf(!s.some(t=>Ff(t,e)),`Port occupied twice`),s.push(e)}wf(Nf(e.components,e.joints).length===1,`Disconnected assembly`);let c=Mf(e.components);return wf(Number.isFinite(c.mass)&&Af(c.inertia),`Invalid combined mass/inertia`),wf(o(c.com)<1e-8,`Assembly origin must be its COM`),c}function Rf({id:e,frameId:t,epoch:n,r,v:i,q:a=vf(),omega:o=_f(),component:s}){let c={...Cf(s),position:_f(),q:vf(),ports:Cf(s.ports||[]),engines:Cf(s.engines||[]),resources:Cf(s.resources||[])},l={id:e,frameId:t,epoch:n,r:yf(r),v:yf(i),q:yf(a),omega:yf(o),components:[c],joints:[]};return Lf(l),l}function zf(e,t){let n=e.components.find(e=>e.id===t);wf(n,`Unknown component`);let r=m(e.q,n.position),i=m(e.q,e.omega),o=yf(f(e.q,n.q));return{r:bf(e.r,r),v:bf(e.v,a(i,r)),q:o,omega:yf(h(o,i))}}function Bf(e,t){let{component:n,port:r}=Pf(e,t),i=zf(e,n.id),o=m(i.q,r.position),s=m(e.q,e.omega);return{r:bf(i.r,o),v:bf(i.v,a(s,o)),normal:yf(m(i.q,r.normal)),up:yf(m(i.q,r.up)),omega:yf(s),radius:r.radius}}function Vf(e,t,a,s,l){try{Lf(e),Lf(a),wf(e.id!==a.id&&e.frameId===a.frameId&&e.epoch===a.epoch,`Bodies need distinct IDs and a common frame/epoch`);for(let e of[`contactToleranceM`,`lateralToleranceM`,`normalToleranceRad`,`rollToleranceRad`,`maxContactSpeedMps`])wf(Number.isFinite(l?.[e])&&l[e]>=0,`Missing/invalid contact tolerance`);wf(l.normalToleranceRad<Math.PI/2&&l.rollToleranceRad<Math.PI/2,`Invalid angular tolerance`);let u=Pf(e,t).port,d=Pf(a,s).port;if(u.type!==d.type||Math.abs(u.radius-d.radius)>l.contactToleranceM)return{ok:!1,reason:`incompatible`};if(If(e,t)||If(a,s))return{ok:!1,reason:`occupied`};let f=Bf(e,t),p=Bf(a,s),m=xf(p.r,f.r),h=Math.acos(c(-i(f.normal,p.normal),-1,1)),g=Math.acos(c(i(f.up,p.up),-1,1)),_=i(m,f.normal),v=o(n(m,r(f.normal,_))),y=Math.abs(_)+Math.max(f.radius,p.radius)*Math.sin(h),b=o(n(p.v,f.v))+Math.max(f.radius,p.radius)*o(n(p.omega,f.omega)),x={axial:_,lateral:v,faceGap:y,normalAngle:h,rollAngle:g,contactSpeed:b};return h>l.normalToleranceRad||g>l.rollToleranceRad?{ok:!1,reason:`misaligned`,...x}:y>l.contactToleranceM||v>l.lateralToleranceM?{ok:!1,reason:`separated`,...x}:b>l.maxContactSpeedMps?{ok:!1,reason:`too-fast`,...x}:l.clearanceVerified===!0?{ok:!0,reason:`contact`,...x}:{ok:!1,reason:`clearance-unverified`,...x}}catch(e){return{ok:!1,reason:`invalid`,detail:e.message}}}function Hf(e,i,o,s,{id:c,jointId:l,...u}){let d=Vf(e,i,o,s,u);if(!d.ok)return{ok:!1,assessment:d};try{wf(Ef(c)&&Ef(l),`Missing joined body/joint ID`);let u=Mf(e.components),p=Mf(o.components),g=u.mass+p.mass,y=bf(e.r,Sf(xf(o.r,e.r),p.mass/g)),b=bf(Sf(e.v,u.mass/g),Sf(o.v,p.mass/g)),x=yf(e.q),S=[...e.components.map(t=>({body:e,c:t})),...o.components.map(e=>({body:o,c:e}))].map(({body:e,c:r})=>{let i=t(n(e.r,y),m(e.q,r.position));return{...Cf(r),position:yf(h(x,i)),q:yf(f([-x[0],-x[1],-x[2],x[3]],f(e.q,r.q)))}}).sort(kf),C=[...Cf(e.joints),...Cf(o.joints),{id:l,a:Cf(i),b:Cf(s)}].sort(kf),w={id:c,frameId:e.frameId,epoch:e.epoch,r:y,v:b,q:x,omega:_f(),components:S,joints:C},T=Lf(w).inertia,E=_f();for(let[i,s]of[[e,u],[o,p]])E=bf(E,t(a(n(i.r,y),r(n(i.v,b),s.mass)),m(i.q,_(s.inertia,i.omega))));return w.omega=yf(v(T,h(x,E))),{ok:!0,assessment:d,body:w}}catch(e){return{ok:!1,assessment:{ok:!1,reason:`invalid`,detail:e.message}}}}function Uf(e,t,{bodyIds:r,releaseImpulseWorld:i=_f()}={}){Lf(e),wf(Tf(i,3),`Invalid release impulse`);let s=e.joints.find(e=>e.id===t);wf(s,`Unknown joint`);let c=e.joints.filter(e=>e.id!==t),l=Nf(e.components,c);wf(Array.isArray(r)&&r.length===l.length&&r.every(Ef)&&new Set(r).size===l.length,`Supply one distinct body ID per resulting connected component`),wf(l.length===2||o(i)===0,`Release impulse needs two disconnected bodies`);let u=l.map((t,n)=>{let i=Cf(e.components.filter(e=>t.has(e.id))),o=Mf(i),s=m(e.q,o.com);for(let e of i)e.position=xf(e.position,o.com);let l={...Cf(e),id:r[n],r:bf(e.r,s),v:bf(e.v,a(m(e.q,e.omega),s)),components:i,joints:Cf(c.filter(e=>t.has(e.a.componentId)))};return Lf(l),l});if(o(i)>0){let t=Bf(e,s.a).r,r=Bf(e,s.b).r,o=bf(t,Sf(xf(r,t),.5));for(let e of u){let t=Sf(i,e.components.some(e=>e.id===s.a.componentId)?1:-1),r=Mf(e.components);e.v=bf(e.v,Sf(t,1/r.mass)),e.omega=bf(e.omega,v(r.inertia,h(e.q,a(n(o,e.r),t))))}}return u}function Wf(e,n,i){Lf(e),wf(Number.isFinite(i)&&i>0,`Invalid engine interval`);let o=new Set(e.components.flatMap(e=>e.engines.map(e=>e.id)));for(let[e,t]of Object.entries(n))wf(o.has(e)&&Number.isFinite(t)&&t>=0&&t<=1,`Invalid engine throttle`);let s=[],c=new Map;for(let t of e.components)for(let e of t.engines){let r=e.enabled?e.maxThrust*(n[e.id]??0):0,a=r*i/(e.isp*9.80665),o=t.resources.find(t=>t.id===e.feedResourceId),l=c.get(o.id)||{componentId:t.id,resourceId:o.id,availableKg:o.amountKg,requestedKg:0};l.requestedKg+=a,c.set(o.id,l),s.push({c:t,e,thrust:r,requestedKg:a,account:l})}let l=_f(),u=_f(),d=[];for(let{c:e,e:n,thrust:i,requestedKg:o,account:c}of s){let s=c.requestedKg>0?Math.min(1,c.availableKg/c.requestedKg):1,f=t(e.position,m(e.q,n.position)),p=r(m(e.q,n.direction),i*s),h=a(f,p);l=bf(l,p),u=bf(u,h),d.push({engineId:n.id,componentId:e.id,feedResourceId:n.feedResourceId,thrust:i*s,consumedKg:o*s,force:yf(p),torque:yf(h)})}return{force:l,torque:u,worldForce:yf(m(e.q,l)),worldTorque:yf(m(e.q,u)),engines:d,consumption:[...c.values()].map(e=>({componentId:e.componentId,resourceId:e.resourceId,amountKg:Math.min(e.availableKg,e.requestedKg)}))}}var Gf=e=>e===1?[[0,0,6.55]]:e===2?[[-.72,0,6.55],[.72,0,6.55]]:e===4?[[-.72,-.62,6.55],[-.72,.62,6.55],[.72,-.62,6.55],[.72,.62,6.55]]:[],Kf=s([70,95,45]),qf=[[`px`,[1,0,0],[[-1.45,.9,-5.8],[-1.45,-.9,5.7]]],[`nx`,[-1,0,0],[[1.45,.9,-5.8],[1.45,-.9,5.7]]],[`py`,[0,1,0],[[-.85,-1.4,-5.8],[.85,-1.4,5.7]]],[`ny`,[0,-1,0],[[-.85,2.12,-5.8],[.85,1.4,5.7]]],[`pz`,[0,0,1],[[-.85,.8,-6.8],[.85,-.8,-6.8]]],[`nz`,[0,0,-1],[[-1.1,.9,6.5],[1.1,-.9,6.5]]]].flatMap(([e,t,n])=>n.map((n,r)=>({name:e+`_`+r,axis:e,force:t,position:n})));function Jf(t={}){return!t.main&&!o(t.translation||e())&&!o(t.rotation||e())&&!o(t.externalForce||e())&&!o(t.externalTorque||e())&&!o(t.externalTorqueWorld||e())}function Yf(e,t={}){return Jf(t)&&o(e.omega)<1e-5&&!e.burn}function Xf(e){if(e.debris)return 0;let t=i(e.r,Kf);return t<0&&o(n(e.r,r(Kf,t)))<b.radius?0:800*Math.max(0,i(m(e.q,[0,1,0]),Kf))}function Zf(e,t,i){let o=qf.map(e=>{let t=r(e.force,i.rcsThrust),o=r(a(n(e.position,i.com),t),1/6);return[...t,...o]}),s=[...e,...r(t,1/6)],l=new Float64Array(12);for(let e=0;e<24;e++)for(let e=0;e<12;e++){let t=o[e],n=t.reduce((e,t)=>e+t*t,0)||1,r=t.reduce((e,t,n)=>e+t*s[n],0)/n,i=c(l[e]+r,0,1),a=i-l[e];l[e]=i;for(let e=0;e<6;e++)s[e]-=t[e]*a}return l}function Qf(i,s={}){let l=L(i),u=i.design?.parts.find(e=>e.port===`engine`),d=Gf(l.engineCount),f=d.map((e,t)=>i.engineSwitches?.[u.id+`/bell-`+t]!==!1),p=f.filter(Boolean).length/(d.length||1),m=i.engineEnabled!==!1&&i.fuel>0?c(i.burn?.throttle??s.main??0,0,1)*l.thrust*p:0,h=e(0,0,-m),g=d.reduce((e,i,o)=>f[o]?t(e,a(n(i,l.com),r(h,1/(f.filter(Boolean).length||1)))):e,e()),v=s.rotation||e(),y=i.rateDamping!==!1,b=y?r(n(r(v,.18),i.omega),2.5):r(v,.35),x=a(i.omega,_(l.inertia,i.omega)),S=y||o(v)>0?t(_(l.inertia,b),x):e(),C=r(s.translation||e(),l.rcsThrust*2),w=a(r(l.com,-1),C),T=y||o(v)>0?n(S,t(g,w)):e(),E=i.wheelsEnabled===!1?0:l.wheelTorque;return{stats:l,enginePart:u,mounts:d,enabledBells:f,fractionEnabled:p,main:m,mainForce:h,engineTorque:g,rate:v,damping:y,translation:C,baseTranslationTorque:w,gyro:x,wantedTorque:S,wheelRequest:T,wheelRating:E,wheelIdeal:r(T,Math.min(1,E/(o(T)||1)))}}function $f(e,t,n={}){let{stats:r,wheelRating:i,wheelIdeal:a}=Qf(e,n),s=i?30+r.wheelPower*o(a)/i:0;return c((e.energy??r.batteryCapacity)+Xf(e)*t-s*t,0,r.batteryCapacity)}function ep(i,l,u={}){let{stats:g,enginePart:y,mounts:b,enabledBells:S,fractionEnabled:C,main:w,mainForce:T,engineTorque:E,rate:D,damping:k,translation:A,baseTranslationTorque:j,gyro:M,wantedTorque:N,wheelRequest:P,wheelRating:F,wheelIdeal:I}=Qf(i,u);i.energy??=g.batteryCapacity;let ee=Xf(i),te=Math.max(0,i.energy)+ee*l,ne=F?30+g.wheelPower*o(I)/F:0,re=ne>0?Math.min(1,te/(ne*l)):1,ie=r(I,re);i.energy=c(te-ne*l*re-(u.magneticJ||0),0,g.batteryCapacity),i.electrical={solar:ee,draw:ne*re+(u.magneticJ||0)/l,magnetDraw:(u.magneticJ||0)/l};let ae=i.rcsEnabled!==!1&&g.rcsThrust>0&&!i.debris?Zf(A,k||o(D)>0?n(N,t(E,ie)):j,g):new Float64Array(12),oe=e(...T),se=e(),ce=0;for(let e=0;e<qf.length;e++){let i=r(qf[e].force,ae[e]*g.rcsThrust);oe=t(oe,i),se=t(se,a(n(qf[e].position,g.com),i)),ce+=ae[e]*g.rcsThrust}let le=w/(g.isp*9.80665||1/0)+ce/(260*x),ue=le>0?Math.min(1,i.fuel/(le*l)):1,de=r(t(E,se),ue),fe=v(g.inertia,n(t(t(de,ie),t(u.externalTorque||e(),h(i.q,u.externalTorqueWorld||e()))),M)),pe=le*l*ue,me=i.fuel-pe/2,he=pe?L({...i,fuel:me,contents:i.contents?Object.fromEntries(Object.entries(i.contents).map(([e,t])=>[e,{...t,fuel:t.fuel*me/i.fuel}])):void 0}):g,ge=t(i.omega,r(fe,l/2)),_e=o(ge),ve=_e?d(f(i.q,p(s(ge),_e*l/2))):i.q,ye=t(t(t(de,ie),t(u.externalTorque||e(),h(ve,u.externalTorqueWorld||e()))),a(n(g.com,he.com),r(oe,ue))),R=v(he.inertia,n(ye,a(ge,_(he.inertia,ge)))),be=m(ve,oe);i.omega=t(i.omega,r(R,l)),_e&&(i.q=d(f(i.q,p(s(ge),_e*l))));let z=O(i,l,{force:be,externalForce:u.externalForce||e(),massFlow:le,dryMass:g.dryMass+g.cargoMass});i.r=z.r,i.v=z.v,i.fuel=z.fuel,i.burn&&(i.burn.consumed+=g.fuel-z.fuel,i.burn.achieved=g.isp*x*Math.log(i.burn.startMass/(g.dryMass+g.cargoMass+i.fuel))),i.visual={main:g.thrust?w*ue/g.thrust:0,bells:S.map(e=>e&&g.thrust?w*ue/g.thrust/(C||1):0),jets:Object.fromEntries(qf.map((e,t)=>[e.name,ae[t]*ue]))}}function tp(e,t){let n=L(e);e.energy??=n.batteryCapacity;let r={r:e.r,v:e.v};for(let i=0;i<t;i+=30){let a=Math.min(30,t-i),o=D(r,i+a/2),s=Xf({...e,r:o.r});e.energy=c(e.energy+(s-(e.wheelsEnabled!==!1&&n.wheelTorque?30:0))*a,0,n.batteryCapacity)}let i=D(r,t);e.r=i.r,e.v=i.v,e.visual={main:0,jets:{}}}function np(e,t){let n={r:e.r,v:e.v},r=L(e),i=m(e.q,_(r.inertia,e.omega)),a=0;for(;a<t-1e-10;){let l=v(r.inertia,h(e.q,i)),u=o(l),m=Math.min(t-a,2,.03/(u||1e-8)),g=u?d(f(e.q,p(s(l),u*m/2))):e.q,_=v(r.inertia,h(g,i)),y=o(_)*m;if(r.batteryCapacity){let t=D(n,a+m/2);e.energy=c((e.energy??r.batteryCapacity)+Xf({...e,q:g,r:t.r})*m,0,r.batteryCapacity)}y&&(e.q=d(f(e.q,p(s(_),y)))),a+=m}e.omega=v(r.inertia,h(e.q,i));let l=D(n,t);e.r=l.r,e.v=l.v,e.visual={main:0,jets:{}}}function rp(e,t,n={}){if(Jf(n)&&!e.burn&&(e.debris||e.rcsEnabled===!1&&e.wheelsEnabled===!1))return np(e,t),`analytic coast / free spin`;if(Yf(e,n))return tp(e,t),`analytic`;let r=0;for(;r<t-1e-10;){if(Yf(e,n)){tp(e,t-r);break}let i=Math.min(.05,t-r);ep(e,i,n),r+=i}return`numerical`}var ip={contactToleranceM:.001,lateralToleranceM:.001,normalToleranceRad:5e-4,rollToleranceRad:.015,maxContactSpeedMps:.2};function ap(e){if(e.debris)return[];let t=L(e),n=e.design.parts.find(e=>M[e.part].kind===`engine`);return Gf(t.engineCount).map((r,i)=>({id:n.id+`/bell-`+i,position:r,direction:[0,0,-1],maxThrust:t.thrust/t.engineCount,isp:t.isp,enabled:e.engineEnabled!==!1&&e.engineSwitches?.[n.id+`/bell-`+i]!==!1,feedResourceId:e.id+`/tank-manifold`}))}function op(e){let t=L(e);return{id:e.id,mass:t.mass,inertia:[...t.inertia],designCom:[...t.com],ports:e.design.parts.some(e=>e.port===`dock`)?[{...lf,position:[...n(lf.position,t.com)],up:[0,1,0],radius:.85}]:[],engines:ap(e).map(e=>({...e,position:[...n(e.position,t.com)]})),resources:[{id:e.id+`/tank-manifold`,resourceId:`propellant`,amountKg:e.fuel,tankIds:e.design.parts.filter(e=>e.part===`tank`).map(e=>e.id)}]}}function sp(e){return Rf({id:e.id,frameId:e.frameId,epoch:e.epoch,r:e.r,v:e.v,q:e.q,omega:e.omega,component:op(e)})}var cp=e=>({componentId:e.id,portId:`nose`}),lp=[{min:[-4.8,-3,-6.8],max:[4.8,3.1,8.8]},{min:[-.91,-.91,-7.949],max:[.91,.91,-6.8]}];function up(e){let i=L(e).com;return lp.map(a=>({center:t(e.r,m(e.q,n(r(t(a.min,a.max),.5),i))),half:r(n(a.max,a.min),.5),axes:[[1,0,0],[0,1,0],[0,0,1]].map(t=>m(e.q,t))}))}function dp(e,t){let r=n(t.center,e.center);for(let n of[...e.axes,...t.axes,...e.axes.flatMap(e=>t.axes.map(t=>a(e,t)))]){if(o(n)<1e-9)continue;let a=e=>e.axes.reduce((t,r,a)=>t+Math.abs(i(n,r))*e.half[a],0);if(Math.abs(i(r,n))>=a(e)+a(t)-1e-8)return!1}return!0}function fp(e,t){return up(e).every(e=>up(t).every(t=>!dp(e,t)))}function pp(c,l){let u=df(c,lf),d=df(l,lf),f=s(n(u.normal,d.normal)),p=(t,a)=>{let s=n(a,r(t,i(a,t))),c=o(s);return c>1e-9?r(s,.85/c):e()},h=p(u.normal,f),g=p(d.normal,r(f,-1)),_=t(u.r,h),v=t(d.r,g),y=r(t(_,v),.5),b=n(d.r,u.r),x=o(n(b,r(f,i(b,f)))),S=t(c.v,a(m(c.q,c.omega),n(y,c.r))),C=t(l.v,a(m(l.q,l.omega),n(y,l.r)));return{gap:i(n(v,_),f),closing:-i(n(C,S),f),normal:f,point:y,overlap:x<1.7&&i(u.normal,d.normal)<-.9}}function mp(e,t){let r=df(e,lf),a=df(t,lf),s=o(n(a.r,r.r)),l=o(n(a.v,r.v)),u=Math.acos(c(-i(r.normal,a.normal),-1,1)),d=Math.acos(c(i(r.up,a.up),-1,1)),f={ok:!1,reason:`unavailable`};return!e.debris&&!t.debris&&!e.docked&&!t.docked&&!e.joinedId&&!t.joinedId&&!e.landed&&!t.landed&&(f=Vf(sp(e),cp(e),sp(t),cp(t),{...ip,clearanceVerified:fp(e,t)})),{...f,range:s,speed:l,alignment:u,roll:d,closing:-i(n(a.v,r.v),r.normal),shipPort:r,depotPort:a,status:f.ok?`contact`:f.reason}}function hp(e,o,s){let c=s.rim?.normal||s.shipPort.normal,l=s.rim?.point||r(t(s.shipPort.r,s.depotPort.r),.5),u=L(e),d=L(o),f=n(l,e.r),p=n(l,o.r),g=t(e.v,a(m(e.q,e.omega),f)),_=i(n(t(o.v,a(m(o.q,o.omega),p)),g),c);if(_>=0)return!1;let y=(e,t,n)=>m(e.q,v(t.inertia,h(e.q,a(n,c)))),b=1/u.mass+1/d.mass+i(c,t(a(y(e,u,f),f),a(y(o,d,p),p))),x=r(c,-_/b);return e.v=n(e.v,r(x,1/u.mass)),o.v=t(o.v,r(x,1/d.mass)),e.omega=n(e.omega,v(u.inertia,h(e.q,a(f,x)))),o.omega=t(o.omega,v(d.inertia,h(o.q,a(p,x)))),!0}function gp(e,t,n){let r=mp(e,t);if(!r.ok)throw Error(`Cannot join: `+r.reason);let i=Hf(sp(e),cp(e),sp(t),cp(t),{...ip,clearanceVerified:fp(e,t),id:n,jointId:n+`/joint`});if(!i.ok)throw Error(`Cannot join: `+i.assessment.reason);return i.body}function _p(e,t){for(let n of e.components){let r=t.find(e=>e.id===n.id);Object.assign(r,zf(e,n.id),{epoch:e.epoch,joinedId:e.id,status:`joined`}),r.r=new Float64Array(r.r),r.v=new Float64Array(r.v),r.q=new Float64Array(r.q),r.omega=new Float64Array(r.omega)}}function vp(e,t){let n=Uf(e,e.joints[0].id,{bodyIds:e.components.map(e=>e.id)});for(let r of n){let n=t.find(e=>e.id===r.components[0].id);Object.assign(n,zf(r,n.id),{joinedId:null,latchArmed:!1,status:`coasting`,captureInhibitUntil:e.epoch+2}),n.throttle=0}return n}function yp(e,r){e.components=e.components.map(e=>{let i=op(r.find(t=>t.id===e.id));return{...i,q:e.q,position:[...t(e.position,m(e.q,n(i.designCom,e.designCom)))]}});let i=Mf(e.components).com,o=m(e.q,i);e.r=[...t(e.r,o)],e.v=[...t(e.v,a(m(e.q,e.omega),o))];for(let t of e.components)t.position=[...n(t.position,i)]}function bp(i,l,u,g,y={}){let S=0;for(;S<u-1e-10;){let C=Math.min(.02,u-S);yp(i,l);let w=Mf(i.components),T={};for(let e of i.components){let t=l.find(t=>t.id===e.id);for(let n of e.engines)T[n.id]=t.id===g?y.main??t.throttle:t.throttle||0}let E=Wf(i,T,C),D=E.force,O=E.torque;for(let s of i.components){let u=l.find(e=>e.id===s.id),d=L(u),f=u.id===g?y:{},p=f.rotation||e(),v=h(s.q,i.omega),b=u.rateDamping===!1?r(p,.35):r(n(r(p,.18),v),2.5),S=u.rateDamping!==!1||o(p)?_(d.inertia,b):e(),w=u.wheelsEnabled===!1?e():r(S,Math.min(1,d.wheelTorque/(o(S)||1))),T=Xf(u),k=(u.energy??d.batteryCapacity)+T*C,A=u.wheelsEnabled!==!1&&d.wheelTorque?30+2e3*o(w)/d.wheelTorque:0,j=A?Math.min(1,k/(A*C)):1;u.energy=c(k-A*C*j,0,d.batteryCapacity),u.electrical={solar:T,draw:A*j};let M=r(w,j),N=r(f.translation||e(),d.rcsThrust*2),P=u.rcsEnabled===!1?new Float64Array(12):Zf(N,n(S,M),d),F=e(),I=e(),ee=0,te={};for(let e=0;e<qf.length;e++){let i=qf[e],s=r(i.force,d.rcsThrust*P[e]);F=t(F,s),I=t(I,a(n(i.position,d.com),s)),ee+=o(s)*C/(260*x),te[i.name]=P[e]}let ne=E.consumption.find(e=>e.componentId===u.id)?.amountKg||0,re=ee?Math.min(1,Math.max(0,u.fuel-ne)/ee):1;F=r(F,re),I=t(r(I,re),M);for(let e of Object.keys(te))te[e]*=re;let ie=m(s.q,F);D=t(D,ie),O=t(O,t(m(s.q,I),a(s.position,ie))),u.fuel=Math.max(0,u.fuel-ne-ee*re),u.visual={main:0,bells:E.engines.filter(e=>e.componentId===u.id).map(e=>e.thrust/(d.thrust/d.engineCount)),jets:te},u.visual.main=u.visual.bells.reduce((e,t)=>e+t,0)/(d.engineCount||1)}let k=m(i.q,D),A=t(m(i.q,_(w.inertia,i.omega)),r(m(i.q,O),C)),j=e=>r(e,-b.mu/o(e)**3),M=t(j(i.r),r(k,1/w.mass)),N=t(i.r,t(r(i.v,C),r(M,C*C/2))),P=t(j(N),r(k,1/w.mass));i.r=[...N],i.v=[...t(i.v,r(t(M,P),C/2))];let F=o(i.omega)*C/2,I=F?d(f(i.q,p(s(i.omega),F))):i.q,ee=n(A,r(m(i.q,O),C/2)),te=v(w.inertia,h(I,ee)),ne=o(te)*C;ne&&(i.q=[...d(f(i.q,p(s(te),ne)))]),i.omega=[...v(w.inertia,h(i.q,A))],yp(i,l),i.epoch+=C,_p(i,l),S+=C}}function xp(e,t,r){if(Lf(e),e.components.length!==2||e.joints.length!==1||e.epoch!==r||e.frameId!==`aster`)throw Error(`Unsupported live assembly`);for(let r of e.components){let i=t.find(e=>e.id===r.id);if(!i||i.debris||i.docked||i.landed||i.burn||i.plan||i.joinedId!==e.id)throw Error(`Invalid joined vessel reference`);let a=zf(e,r.id),s=op(i);for(let e of[`r`,`v`,`q`,`omega`])if(o(n(a[e],i[e]))>1e-7||e===`q`&&Math.abs(a.q[3]-i.q[3])>1e-7)throw Error(`Joined pose disagrees`);for(let e of[`mass`,`inertia`,`designCom`,`ports`,`engines`,`resources`])if(JSON.stringify(r[e])!==JSON.stringify(s[e]))throw Error(`Joined hardware/inventory disagrees`)}let[i,a]=e.components.map(e=>t.find(t=>t.id===e.id));if(!fp(i,a))throw Error(`Joined hulls overlap`);if(!Vf(sp(i),cp(i),sp(a),cp(a),{...ip,clearanceVerified:!0}).ok)throw Error(`Joined faces do not contact`)}var Sp=.02,Cp=(e,t)=>{if(!e)throw Error(t)},wp=[`stopped`,`flowing`,`idle`,`source-limited`,`capacity-limited`,`disconnected`,`unavailable`,`disabled`],Tp=e=>e.debris?structuredClone(e):le(structuredClone(e));function Ep(e){let t=[];for(let n of e.ships){let e=n.debris?[n.module]:n.design.parts;for(let r of e.filter(e=>M[e.part]?.kind===`tank`))t.push({id:r.id,componentId:n.id,resourceId:`propellant`,amountKg:n.debris?n.fuel:n.contents[r.id].fuel,capacityKg:M[r.part].fuelCapacity,name:n.id.toUpperCase().replace(`-`,` `)+` · Tank `+(n.debris?`module`:Number(r.port.slice(4))+1),available:!n.docked&&!n.landed&&!n.debris})}let n=e.assemblies.map(e=>(Lf(e),{bodyId:e.id,componentIds:e.components.map(e=>e.id)})),r=new Set(n.flatMap(e=>e.componentIds));for(let t of e.ships)Cp(!t.joinedId||n.some(e=>e.bodyId===t.joinedId&&e.componentIds.includes(t.id)),`Invalid pumping membership`),r.has(t.id)||n.push({bodyId:t.id,componentIds:[t.id]});return{tanks:t,membership:n}}function Dp(e,t=e.pumps){Cp(Array.isArray(t)&&t.length<=100,`Invalid pump collection`);for(let e of t)Cp(Number.isFinite(e.transferredKg)&&e.transferredKg>=0&&Number.isFinite(e.elapsedS)&&e.elapsedS>=0&&wp.includes(e.status),`Invalid pump progress`),Cp(e.rateKgPerS>0&&e.rateKgPerS<=20,`Pump rate exceeds installed capability`);let n=Ep(e);return nf({...n,pumps:t,dt:0}),n}function Op(e,t,n){let r=Dp(e,t),i=new Set(r.tanks.filter(e=>!e.available).map(e=>e.id)),a=t.map(e=>i.has(e.sourceTankId)||i.has(e.destinationTankId)?{...e,enabled:!1,status:`unavailable`}:e),o=nf({...r,pumps:a,dt:n});return o.pumps=o.pumps.map(e=>{let r=t.find(t=>t.id===e.id),i=o.transfers.find(t=>t.pumpId===e.id),s=i.status===`disconnected`?`disconnected`:a.find(t=>t.id===e.id).status===`unavailable`?`unavailable`:e.enabled?n?i.status:r.status:r.enabled?`disconnected`:r.status;return{...e,transferredKg:r.transferredKg+i.quantityKg,elapsedS:r.elapsedS+(e.enabled?n:0),status:s}}),o}function kp(e,r){let i=Mf(e.components),a=m(e.q,_(i.inertia,e.omega)),o=structuredClone(e);o.components=e.components.map(e=>{let i=op(r.find(t=>t.id===e.id));return{...i,q:[...e.q],position:[...t(e.position,m(e.q,n(i.designCom,e.designCom)))]}});let s=Mf(o.components);Cp(Math.abs(s.mass-i.mass)<1e-7,`Internal transfer changed total body mass`);for(let e of o.components)e.position=[...n(e.position,s.com)];return o.omega=[...v(s.inertia,h(o.q,a))],Lf(o),o}function Ap(e,t){if(!e.pumps?.length)return;Cp(Number.isFinite(t)&&t>=0&&t<=.020000000100000002,`Pump phase needs a bounded physical substep`);let n=Op(e,e.pumps,t);if(!n.changedTankIds.length)return e.pumps=n.pumps,n;let r=new Set(n.changedTankIds),i=new Set(n.tanks.filter(e=>r.has(e.id)).map(e=>e.componentId)),a=e.ships.map(Tp),o=new Map;for(let e of n.tanks.filter(e=>r.has(e.id))){let t=a.find(t=>t.id===e.componentId);t.contents[e.id].fuel=e.amountKg}let s=new Set;for(let t of e.assemblies){if(!t.components.some(e=>i.has(e.id)))continue;let e=kp(t,a);_p(e,a),xp(e,a,e.epoch),o.set(t.id,e),t.components.forEach(e=>s.add(e.id))}for(let t of i){if(s.has(t))continue;let n=e.ships.find(e=>e.id===t),r=a.find(e=>e.id===t),i=kp(sp(n),a);r.omega=new Float64Array(i.omega),L(r),s.add(t)}for(let t of s){let n=e.ships.find(e=>e.id===t),r=a.find(e=>e.id===t);n.contents=r.contents;for(let e of[`r`,`v`,`q`,`omega`])n[e]=new Float64Array(r[e]);(n.plan||n.navigation||n.guidance||n.burn)&&e.takeover(n)}for(let t of e.assemblies)o.has(t.id)&&Object.assign(t,o.get(t.id));return e.pumps=n.pumps,n}function jp(e,t,n,r=20){let i=Ep(e),a=i.tanks.find(e=>e.id===t),o=i.tanks.find(e=>e.id===n);Cp(a&&o,`Choose two installed tanks`),Cp(a.available&&o.available,`Pumping requires free-flight tanks; release the depot or surface support first`),Cp(i.membership.some(e=>e.componentIds.includes(a.componentId)&&e.componentIds.includes(o.componentId)),`Tanks must be on the same ship or physically joined ships`);let s=`pump/`+t+`/`+n,c=e.pumps.find(e=>e.id===s),l={id:s,sourceTankId:t,destinationTankId:n,rateKgPerS:r,enabled:!0,transferredKg:c?.transferredKg||0,elapsedS:c?.elapsedS||0,status:`idle`},u=[...e.pumps.filter(e=>e.id!==s).map(e=>e.sourceTankId===n&&e.destinationTankId===t?{...e,enabled:!1,status:`stopped`}:e),l];Op(e,u,0),e.pumps=u;for(let t of i.membership.find(e=>e.componentIds.includes(a.componentId)).componentIds){let n=e.ships.find(e=>e.id===t);e.takeover(n)}return e.message=`Pump started · `+r+` kg/s`,l}function Mp(e,t){let n=e.pumps.find(e=>e.id===t);return Cp(n,`Unknown pump`),n.enabled=!1,n.status=`stopped`,e.message=`Pump stopped`,n}function Np({getFleet:e,onAction:t,onFocus:n,onHighlight:r}){let i=new Map,a=e=>e.name;function o(e){i.get(e)?.element.remove(),i.delete(e),r([...i.keys()]),u()}function s(){for(let e of[...i.keys()])o(e)}function c(e){t(e),u()}function l(t,s,l){if(i.has(t)){i.get(t).element.focus();return}i.size===2&&o([...i.keys()][1]);let d=Ep(e()).tanks.find(e=>e.id===t);if(!d)return;let f=document.createElement(`section`);f.className=`tank-card`,f.dataset.tankId=t,f.tabIndex=-1;let p=[...i.values()][0],m=p?Math.max(10,Math.min(innerWidth-230,parseFloat(p.element.style.left)+(parseFloat(p.element.style.left)<innerWidth/2?235:-235))):Math.max(10,Math.min(innerWidth-230,s+14));f.style.left=m+`px`,f.style.top=Math.max(80,Math.min(innerHeight-250,l))+`px`,f.innerHTML=`<button class="tank-close" aria-label="Close tank">×</button><h2></h2><div class="tank-quantity"></div><meter min="0"></meter><label>Rate <input type="number" min="0.1" max="20" step="0.1" value="20" aria-label="Pump rate kg per second"> kg/s</label><div class="tank-buttons"><button data-direction="in">In</button><button data-direction="out">Out</button><button data-stop>Stop</button></div><p class="tank-state"></p>`,f.querySelector(`h2`).textContent=a(d),f.querySelector(`input`).max=20,f.querySelector(`input`).value=20,f.querySelector(`.tank-close`).onclick=()=>o(t),f.addEventListener(`pointerdown`,n);for(let n of f.querySelectorAll(`[data-direction]`))n.onclick=()=>c(()=>{let r=[...i.keys()].find(e=>e!==t);if(!r)throw Error(`Open a second tank`);let a=Number(f.querySelector(`input`).value);e().startPump(n.dataset.direction===`out`?t:r,n.dataset.direction===`out`?r:t,a)});f.querySelector(`[data-stop]`).onclick=()=>c(()=>{for(let n of e().pumps.filter(e=>e.enabled&&(e.sourceTankId===t||e.destinationTankId===t)))e().stopPump(n.id)}),document.body.append(f),i.set(t,{element:f}),r([...i.keys()]),u()}function u(){let t=e(),{tanks:n,membership:r}=Ep(t);for(let[e,{element:s}]of i){let c=n.find(t=>t.id===e);if(!c){o(e);continue}let l=n.find(t=>t.id!==e&&i.has(t.id)),u=l&&r.some(e=>e.componentIds.includes(c.componentId)&&e.componentIds.includes(l.componentId));s.querySelector(`.tank-quantity`).textContent=c.amountKg.toFixed(1)+` / `+c.capacityKg+` kg`;let d=s.querySelector(`meter`);d.max=c.capacityKg,d.value=c.amountKg;let f=t.pumps.filter(t=>t.sourceTankId===e||t.destinationTankId===e),p=f.find(e=>e.enabled),m=p||f.at(-1);for(let e of s.querySelectorAll(`[data-direction]`))e.disabled=!l||!u||!c.available||!l.available;s.querySelector(`[data-stop]`).disabled=!p;let h=s.querySelector(`.tank-state`);if(!c.available)h.textContent=`Release the depot or surface support to pump.`;else if(!l)h.textContent=`Click another tank, then choose In or Out.`;else if(!u)h.textContent=`Tanks disconnected`+(m?` · pump stopped`:``);else if(m){let t=m.destinationTankId===e?`In`:`Out`;h.textContent={"source-limited":`Source empty · waiting`,"capacity-limited":`Destination full · waiting`,flowing:`Pumping`,idle:`Ready`,stopped:`Stopped`,disconnected:`Stopped after undock`,disabled:`Stopped`,unavailable:`Unavailable`}[m.status]+` · `+t+` · `+m.transferredKg.toFixed(1)+` kg moved`}else h.textContent=`Connected to `+a(l)}}return{open:l,closeAll:s,refresh:u,get isOpen(){return i.size>0},get selectedIds(){return[...i.keys()]}}}var Pp=Object.freeze({Space:`stage`,KeyX:`cutoff`,KeyZ:`full-throttle`,KeyR:`toggle-rcs`,KeyT:`toggle-damping`,CapsLock:`toggle-precision`,KeyV:`cycle-camera`,KeyM:`toggle-map`,BracketLeft:`previous-ship`,BracketRight:`next-ship`,Escape:`settings`,KeyB:`toggle-yard`,KeyG:`exchange`,Enter:`execute-planned-burn`});Object.freeze({Period:`warp-faster`,Comma:`warp-slower`,Slash:`warp-normal`});function Fp({code:e,repeat:t=!1}){return t?null:Pp[e]||null}function Ip(e,{precision:t=!1,view:n=`flight`}={}){let r=(t,n)=>+!!e.has(t)-!!e.has(n),i=t?.15:1;return[`flight`,`map`].includes(n)?{translation:[r(`KeyL`,`KeyJ`)*i,r(`KeyK`,`KeyI`)*i,r(`KeyN`,`KeyH`)*i],rotation:[r(`KeyS`,`KeyW`)*i,r(`KeyA`,`KeyD`)*i,r(`KeyQ`,`KeyE`)*i],throttleRate:((e.has(`ShiftLeft`)||e.has(`ShiftRight`)?1:0)-(e.has(`ControlLeft`)||e.has(`ControlRight`)?1:0))*.25}:{translation:[0,0,0],rotation:[0,0,0],throttleRate:0}}function Lp(e,t,n){if(![e,t,n].every(Number.isFinite)||n<0)throw Error(`Finite throttle state/rate and nonnegative duration required`);return Math.max(0,Math.min(1,e+t*n))}var Rp=Object.freeze({attitude:`W S · A D · Q E`,translation:`I K · J L · H N`,throttle:`Shift / Ctrl`,stage:`Space`,cutoff:`X`,full:`Z`,precision:`CapsLock`,rcs:`R`,damping:`T`,map:`M`,yard:`B`,ships:`[ / ]`,camera:`V`,exchange:`G`,settings:`Esc`,execute:`Enter`}),zp=Object.freeze([`KeyW`,`KeyA`,`KeyS`,`KeyD`,`KeyQ`,`KeyE`,`KeyI`,`KeyJ`,`KeyK`,`KeyL`,`KeyH`,`KeyN`,`ShiftLeft`,`ShiftRight`,`ControlLeft`,`ControlRight`]);function Bp(e){ne(e);let t=new Set;for(let n of e.stages||[]){if(typeof n.id!=`string`||t.has(n.id)||!Array.isArray(n.actions)||!n.actions.length)throw Error(`Invalid stage group identity or actions`);t.add(n.id);let r=new Set;for(let t of n.actions){if(r.has(t.partId))throw Error(`A part cannot act twice in one stage`);if(r.add(t.partId),t.type===`separate`){let n=(e.couplers||[]).find(e=>e.id===t.partId);if(!n||!e.parts.some(e=>e.port===n.port))throw Error(`Separation refers to an empty or missing decoupler`)}else if(t.type===`engine`){if(!e.parts.some(e=>e.id===t.partId&&M[e.part].kind===`engine`)||typeof t.enabled!=`boolean`)throw Error(`Engine stage refers to missing hardware`)}else throw Error(`Unsupported stage action`)}}return!0}function Vp(e,t){ce(e);let n=e.design.couplers.find(e=>e.id===t),r=e.design.parts.find(e=>e.port===n?.port);if(!r)throw Error(`The decoupler has no attached module`);let i=e.contents[r.id]||{fuel:0,cargo:0},a={...e.design,parts:e.design.parts.filter(e=>e.id!==r.id)},o=ae(a,{fuel:e.fuel-i.fuel,cargoCount:e.cargoCount-i.cargo}),s={id:e.id+`/`+r.id.split(`/`).at(-1),name:M[r.part].name,module:structuredClone(r),debris:!0,fuel:i.fuel,cargoCount:i.cargo,resourceId:i.resourceId,contents:{[r.id]:structuredClone(i)},q:new Float64Array(e.q),omega:new Float64Array(e.omega),frameId:e.frameId,epoch:e.epoch,visual:{main:0,jets:{}},status:`separated`,docked:null,damage:0,stageIndex:0};return{coupler:n,part:r,contents:i,parentDesign:a,parentStats:o,child:s,childStats:L(s)}}function Hp(e){if(e.debris)throw Error(`Separated module has no stage controller`);let t=e.design.stages?.[e.stageIndex||0];if(!t)throw Error(`No stage remains`);if((e.activatedStages||[]).includes(t.id))throw Error(`Stage has already activated`);let n=t.actions.filter(e=>e.type===`separate`).map(t=>Vp(e,t.partId));for(let n of t.actions.filter(e=>e.type===`engine`))if(!e.design.parts.some(e=>e.id===n.partId&&M[e.part].kind===`engine`))throw Error(`Stage refers to removed engine`);let r=new Set(n.map(e=>e.part.id)),i=ae({...e.design,parts:e.design.parts.filter(e=>!r.has(e.id))},{fuel:e.fuel-n.reduce((e,t)=>e+t.contents.fuel,0),cargoCount:e.cargoCount-n.reduce((e,t)=>e+t.contents.cargo,0)});return{id:t.id,parent:{mass:i.mass,com:[...i.com],inertia:[...i.inertia]},actions:structuredClone(t.actions),splits:n.map(e=>({partId:e.part.id,name:M[e.part.part].name,fuel:e.contents.fuel,cargo:e.contents.cargo,mass:e.childStats.mass,inertia:[...e.childStats.inertia],parentMass:e.parentStats.mass,parentCOM:[...e.parentStats.com],parentInertia:[...e.parentStats.inertia]}))}}function Up(i,{relativeSeparationSpeed:o=.2}={}){let s=Hp(i),c=[];for(let l of s.actions){if(l.type===`engine`){i.engineEnabled=l.enabled;continue}let s=L(i),u=Vp(i,l.partId),d=e(...i.r),f=e(...i.v),p=m(i.q,i.omega),g=n(d,m(i.q,s.com)),_=u.child;i.design=u.parentDesign,delete i.contents[u.part.id];let y=L(i);i.r=t(g,m(i.q,y.com)),i.v=t(f,a(p,n(i.r,d))),_.r=t(g,m(i.q,u.part.position)),_.v=t(f,a(p,n(_.r,d)));let b=e(u.part.position[0]<0?-1:1,0,0),x=r(m(i.q,b),o/(1/y.mass+1/u.childStats.mass)),S=t(g,m(i.q,[u.part.position[0]<0?-1.52:1.52,0,u.part.position[2]]));i.v=n(i.v,r(x,1/y.mass)),_.v=t(_.v,r(x,1/u.childStats.mass));let C=h(i.q,a(n(S,i.r),r(x,-1))),w=h(_.q,a(n(S,_.r),x));i.omega=t(i.omega,v(y.inertia,C)),_.omega=t(_.omega,v(u.childStats.inertia,w)),c.push(_)}return i.activatedStages=[...i.activatedStages||[],s.id],i.stageIndex=(i.stageIndex||0)+1,i.burn=null,i.plan=null,i.targetQ=null,{preview:s,children:c}}function Wp(e,{stageIndex:t=0,activatedStages:n=[]}={}){let r=new Set;for(let t of e.stages||[]){if(typeof t.id!=`string`||r.has(t.id)||!Array.isArray(t.actions))throw Error(`Invalid stage identity`);r.add(t.id)}Bp({...e,stages:(e.stages||[]).filter((e,r)=>r>=t&&!n.includes(e.id)&&e.actions.length)})}function Gp(e,t,{stageIndex:n=0,activatedStages:r=[]}={}){if(!Number.isInteger(n)||n<0||n>(e.stages||[]).length)throw Error(`Invalid consumed-stage prefix`);let i=structuredClone(e),a=i.stages??=[],o=new Set([...r,...a.slice(0,n).map(e=>e.id)]);function s(e){let t=a.findIndex(t=>t.id===e);if(t<0)throw Error(`Unknown stage`);if(t<n||o.has(e))throw Error(`Consumed stage cannot be edited`);return t}function c(e){return a[s(e)]}function l(e){if(!Number.isInteger(e)||e<n||e>a.length)throw Error(`Cannot reorder across consumed stages`);return e}if(Wp(i,{stageIndex:n,activatedStages:r}),t.type===`add-group`){let e=l(t.index??a.length),n=i.revision+1,r=i.id+`:stage:`+n;for(;a.some(e=>e.id===r);)r=i.id+`:stage:`+ ++n;a.splice(e,0,{id:r,actions:[]}),i.revision=n-1}else if(t.type===`reorder-group`){let e=s(t.groupId),n=l(t.index);if(n===a.length)throw Error(`Reorder target is a final array index`);let[r]=a.splice(e,1);a.splice(n,0,r)}else if(t.type===`remove-group`){let e=s(t.groupId);if(a[e].actions.length)throw Error(`Move or remove the parts before deleting this stage`);a.splice(e,1)}else if(t.type===`assign-action`){let e=c(t.groupId);if(e.actions.some(e=>e.partId===t.action?.partId))throw Error(`Part already assigned in this stage`);e.actions.push(structuredClone(t.action))}else if(t.type===`move-action`){let e=c(t.fromGroupId),n=c(t.toGroupId),r=e.actions.findIndex(e=>e.partId===t.partId);if(r<0)throw Error(`Unknown staged part`);if(e===n)return i;if(n.actions.some(e=>e.partId===t.partId))throw Error(`Part already assigned in destination stage`);n.actions.push(e.actions.splice(r,1)[0])}else if(t.type===`remove-action`){let e=c(t.groupId),n=e.actions.findIndex(e=>e.partId===t.partId);if(n<0)throw Error(`Unknown staged part`);e.actions.splice(n,1)}else throw Error(`Unknown stage edit`);return i.revision++,Wp(i,{stageIndex:n,activatedStages:r}),i}function Kp(e,t,{stageIndex:n=0,activatedStages:r=[]}={}){if(Wp(t,{stageIndex:n,activatedStages:r}),t.stages.slice(n).some(e=>!e.actions.length))throw Error(`Fill or remove empty stages before applying`);let i=e=>{let{stages:t,revision:n,...r}=e;return r};if(JSON.stringify(i(e))!==JSON.stringify(i(t)))throw Error(`Stage editing cannot change physical hardware`);if(!Number.isInteger(n)||n<0||n>e.stages.length)throw Error(`Invalid consumed-stage prefix`);for(let r=0;r<n;r++)if(JSON.stringify(e.stages[r])!==JSON.stringify(t.stages[r]))throw Error(`Consumed stage prefix changed`);for(let n of r){let r=e.stages.findIndex(e=>e.id===n),i=t.stages.findIndex(e=>e.id===n);if(r<0||r!==i||JSON.stringify(e.stages[r])!==JSON.stringify(t.stages[i]))throw Error(`Consumed stage changed`)}let a=new Set;for(let e of t.stages.slice(n))for(let t of e.actions)if(t.type===`separate`){if(a.has(t.partId))throw Error(`Decoupler would fire twice`);a.add(t.partId)}return Bp({...t,stages:t.stages.slice(n).filter(e=>!r.includes(e.id))}),structuredClone(t)}function qp(e,t){let n=e.stages?.find(e=>e.id===t);if(!n)throw Error(`Unknown stage`);return n.actions.map(t=>t.type===`separate`?{actionPartId:t.partId,affectedPartId:e.parts.find(n=>n.port===e.couplers.find(e=>e.id===t.partId)?.port)?.id}:{actionPartId:t.partId,affectedPartId:t.partId})}var Jp={engine:`<path d="M9 3h6v5l4 10H5L9 8Z"/><path d="M8 21l2-2m2 3v-3m4 2-2-2"/>`,off:`<path d="M9 3h6v5l4 10H5L9 8Z"/><path d="m3 3 18 18"/>`,separate:`<path d="M4 3h16v6H4Zm0 12h16v6H4Z"/><path d="m2 12 4-2v4Zm20 0-4-2v4Z"/>`};function Yp(e,{getCurrent:t,onApply:n,onPreview:r,onError:i,onCancel:a}){let o=null,s=null,c=null,l=null,u=document.createElement(`div`);u.className=`stage-tooltip`,u.hidden=!0,document.body.append(u);let d=(e,t)=>{let n=document.createElement(e);return t!==void 0&&(n.textContent=t),n},f=(e,t,n=!1)=>{let r=d(`button`,e);return r.type=`button`,r.disabled=n,r.onclick=()=>{try{t()}catch(e){i(e.message)}},r},p=e=>`<svg viewBox="0 0 24 24" aria-hidden="true">`+Jp[e.type===`separate`?`separate`:e.enabled?`engine`:`off`]+`</svg>`;function m(){let e=t();return{stageIndex:e.stageIndex||0,activatedStages:e.activatedStages||[]}}function h(e){let t=o.parts.find(t=>t.id===e.partId),n=o.couplers?.find(t=>t.id===e.partId),r=o.parts.find(e=>e.port===n?.port);return e.type===`engine`?(e.enabled?`Activate `:`Shut down `)+(M[t?.part]?.name||`engines`):`Separate `+(r?.part===`tank`?`tank`:`cargo rack`)+` `+(Number(n?.port.slice(4))+1)}function g(e){if(!e){r(null);return}let t=qp(o,e.groupId).filter(t=>!e.partId||t.actionPartId===e.partId);r(o,e.groupId,t)}function _(e,t,n){e.onmouseenter=()=>{g(t),u.textContent=n,u.hidden=!1;let r=e.getBoundingClientRect();u.style.left=Math.max(8,r.left-190)+`px`,u.style.top=r.top+`px`},e.onmouseleave=()=>{u.hidden=!0,g(l)}}function v(e){l=e,u.hidden=!0,g(e),x()}function y(e){o=Gp(o,e,m()),u.hidden=!0,l=null,r(null),x()}function b(){let e=t();o=structuredClone(e.design),s={id:e.id,stageIndex:e.stageIndex||0,revision:e.design.revision},l=null,u.hidden=!0,r(null),x()}function x(){e.replaceChildren();let r=t(),g=m();if(r.id!==s.id||g.stageIndex!==s.stageIndex||r.design.revision!==s.revision){e.append(d(`p`,`Stack changed.`),f(`Reload`,b));return}let x=o.stages||[];for(let[t,n]of x.entries()){let r=t<g.stageIndex||g.activatedStages.includes(n.id),a=t===g.stageIndex,o=d(`div`);o.className=`stage-row`+(r?` consumed`:``)+(a?` next`:``)+(l?.groupId===n.id?` selected`:``),o.dataset.stageId=n.id;let s=f(String(t+1).padStart(2,`0`),()=>v({groupId:n.id}),r);s.className=`stage-number`,s.setAttribute(`aria-label`,(r?`Fired stage `:`Stage `)+(t+1)),s.title=r?`Fired`:a?`Next stage · drag to reorder`:`Drag to reorder`,s.draggable=!r,s.ondragstart=e=>{c={groupId:n.id},e.dataTransfer.setData(`text/plain`,n.id),u.hidden=!0},o.append(s),r||_(s,{groupId:n.id},`Stage `+(t+1)+(a?` · next`:``));let m=d(`div`);m.className=`stage-icons`;for(let e of n.actions){let t=h(e),i={groupId:n.id,partId:e.partId},a=f(``,()=>v(i),r);a.className=`stage-action`+(e.type===`engine`&&!e.enabled?` off`:``)+(l?.partId===e.partId&&l.groupId===n.id?` selected`:``),a.innerHTML=p(e),a.setAttribute(`aria-label`,t),a.title=t,a.dataset.partId=e.partId,a.draggable=!r,a.ondragstart=t=>{c=i,t.dataTransfer.setData(`text/plain`,e.partId),t.stopPropagation(),u.hidden=!0},r||_(a,i,t),m.append(a)}if(o.append(m),r){let e=d(`span`,`✓`);e.className=`stage-done`,e.title=`Fired`,o.append(e)}else{let e=f(`+`,()=>v({groupId:n.id,add:!0}));e.className=`stage-add`,e.setAttribute(`aria-label`,`Add action to stage `+(t+1)),o.append(e)}o.ondragover=e=>{r||e.preventDefault()},o.ondrop=e=>{if(e.preventDefault(),c&&!r){try{y(c.partId?{type:`move-action`,fromGroupId:c.groupId,toGroupId:n.id,partId:c.partId}:{type:`reorder-group`,groupId:c.groupId,index:t})}catch(e){i(e.message)}c=null}},e.append(o)}if(x.length||e.append(d(`p`,`No stages`)),l){let t=x.find(e=>e.id===l.groupId),n=x.indexOf(t),r=t?.actions.find(e=>e.partId===l.partId),a=d(`div`);if(a.className=`stage-context`,a.append(d(`small`,r?h(r):`Stage `+(n+1))),l.add){let e=[];for(let t of o.parts.filter(e=>M[e.part].kind===`engine`))for(let n of[!0,!1])e.push({type:`engine`,partId:t.id,enabled:n});for(let t of o.couplers||[])o.parts.some(e=>e.port===t.port)&&e.push({type:`separate`,partId:t.id});for(let n of e){let e=f(h(n),()=>y({type:`assign-action`,groupId:t.id,action:n}));e.className=`stage-choice`,e.innerHTML=p(n)+`<span></span>`,e.querySelector(`span`).textContent=h(n),a.append(e)}}else if(r){let e=d(`select`);e.setAttribute(`aria-label`,`Move selected action`),e.append(new Option(`Move to…`,``));for(let[n,r]of x.entries())n>=g.stageIndex&&r.id!==t.id&&e.append(new Option(`Stage `+(n+1),r.id));e.disabled=e.options.length===1,e.onchange=()=>{try{y({type:`move-action`,fromGroupId:t.id,toGroupId:e.value,partId:r.partId})}catch(e){i(e.message)}},a.append(e,f(`Remove`,()=>y({type:`remove-action`,groupId:t.id,partId:r.partId})))}else a.append(f(`↑`,()=>y({type:`reorder-group`,groupId:t.id,index:n-1}),n<=g.stageIndex),f(`↓`,()=>y({type:`reorder-group`,groupId:t.id,index:n+1}),n===x.length-1),f(`Remove`,()=>y({type:`remove-group`,groupId:t.id}),!!t.actions.length));e.append(a)}let S=d(`div`);S.className=`stage-footer`;let C=f(`+`,()=>y({type:`add-group`}));C.setAttribute(`aria-label`,`Add stage`),C.title=`Add stage`,S.append(C,f(`Cancel`,a),f(`Apply`,()=>{let e=t();if(e.id!==s.id)throw Error(`Selected vessel changed`);n(Kp(e.design,o,{stageIndex:e.stageIndex||0,activatedStages:e.activatedStages||[]})),b()})),e.append(S)}return{reset:b,refresh:()=>o&&x(),close:()=>{o=null,l=null,u.hidden=!0,r(null)}}}function Xp(e,t,n){return e===void 0||n>=1?t:e+(t-e)*Math.max(0,n)}function Zp(e,t,n){return!e||n>=1?[...t]:t.map((t,r)=>e[r]+(t-e[r])*Math.max(0,n))}function Qp(e,t,n){let r=t.find(e=>e.id===n);return e.joinedId&&r?.joinedId===e.joinedId?r:e}function $p(e,t,n,r){let i=h(r,m(n,[Math.sin(e)*Math.cos(t),Math.sin(t),Math.cos(e)*Math.cos(t)]));return{yaw:Math.atan2(i[0],i[2]),pitch:Math.atan2(i[1],Math.hypot(i[0],i[2]))}}function em(e,i,a,o,s){let c=e?.startOffset||[0,0,0],l=e?.elapsed??4;e&&e.anchorId!==i?(c=t(e.offset,n(o||a,a)),l=0):l=Math.min(4,l+Math.max(0,s));let u=l/4,d=r(c,1-u*u*(3-2*u));return{anchorId:i,startOffset:c,elapsed:l,offset:d,target:t(a,d)}}var tm={version:1,strokeM:.65,stiffnessNPerM:1800,dampingNsPerM:1800,friction:.7,bottomImpactMps:.8,maxStepS:.01},nm=()=>({version:1,feet:Array.from({length:4},()=>({compression:0,compressionRate:0,normalForce:0,contact:!1,bottomed:!1})),dissipatedJ:0}),rm={foundation:{polygonXZ:[[-36,-32],[30,-32],[36,-26],[36,28],[30,32],[-30,32],[-36,26]],top:-.12,bottom:-1},footprint:{min:[-36,-1,-32],max:[36,8.6,32]},pad:{min:[-14,0,-16],max:[14,0,16],cornerChamfer:4,polygonXZ:[[-10,-16],[10,-16],[14,-12],[14,12],[10,16],[-10,16],[-14,12],[-14,-12]]},clearVolumes:[{id:`aster-surface-yard/pad-clear`,min:[-14,.02,-16],max:[14,60,16]},{id:`aster-surface-yard/approach-clear`,min:[-14,.02,16],max:[14,40,64]}],obstacles:[{id:`aster-surface-yard/cargo`,min:[-32,0,-15],max:[-19,7.1,12]},{id:`aster-surface-yard/fuel`,min:[18.1,0,-20],max:[34,7.5,11]},{id:`aster-surface-yard/shelter`,min:[-19,0,-31],max:[-1,4.3,-20]},{id:`aster-surface-yard/beacon-west`,min:[-34,0,22],max:[-32,8.6,24]},{id:`aster-surface-yard/beacon-east`,min:[32,0,22],max:[34,8.6,24]},{id:`aster-surface-yard/marker-west-13`,min:[-16.73,0,12.77],max:[-16.27,1.16,13.23]},{id:`aster-surface-yard/marker-west-28`,min:[-16.73,0,27.77],max:[-16.27,1.16,28.23]},{id:`aster-surface-yard/marker-east-13`,min:[16.27,0,12.77],max:[16.73,1.16,13.23]},{id:`aster-surface-yard/marker-east-28`,min:[16.27,0,27.77],max:[16.73,1.16,28.23]}]},im=[{id:`aster-surface-yard`,name:`Serein Exchange`,phase:0},{id:`aster-ridge-exchange`,name:`Ridge Exchange`,phase:.016}].map(e=>({...e,radius:b.radius+1,halfWidth:14,halfLength:16,handlingRadius:8})),am=im[0];function om(t=0,n=am.id){let i=im.find(e=>e.id===n);if(!i)throw Error(`Unknown surface venue`);let a=p([0,1,0],i.phase),o=m(a,[1,0,0]);return{...i,frameId:`aster`,epoch:t,r:r(o,i.radius),v:e(),q:f(a,p([0,0,1],-Math.PI/2)),omega:e(),normal:o}}function sm(e){return im.map(t=>om(e.epoch,t.id)).sort((t,r)=>o(n(e.r,t.r))-o(n(e.r,r.r)))[0]}function cm(e,t,n=.5){return Math.abs(e)<=am.halfWidth-n&&Math.abs(t)<=am.halfLength-n&&Math.abs(e)+Math.abs(t)<=am.halfWidth+am.halfLength-rm.pad.cornerChamfer-Math.SQRT2*n}function lm(e,{uncompressed:i=!1}={}){if(e.debris||!e.design.parts.some(e=>M[e.part].kind===`engine`))return[];let o=L(e),s=m(e.q,e.omega);return N.map((c,l)=>{let u=i?0:e.suspension?.feet[l]?.compression||0,d=t(c,[0,0,-u]),f=m(e.q,n(d,o.com)),p=t(e.v,a(s,f)),h=i?0:e.suspension?.feet[l]?.compressionRate||0;return{index:l,compression:u,offset:f,r:t(e.r,f),bodyVelocity:p,v:t(p,r(m(e.q,[0,0,-1]),h))}})}function um(e,t=sm(e)){let r=m(e.q,[0,0,-1]),o=i(r,t.normal),s=i(a(m(e.q,e.omega),r),t.normal);return lm(e,{uncompressed:!0}).map(e=>{let r=i(n(e.r,t.r),t.normal),a=o>.5?Math.max(0,-r/o):0,c=Math.min(tm.strokeM,a),l=a>0&&a<tm.strokeM?(-i(e.v,t.normal)-c*s)/o:0,u=o>.5&&r<=0;return{compression:c,compressionRate:l,normalForce:u?Math.max(0,(tm.stiffnessNPerM*c+tm.dampingNsPerM*l)/o):0,contact:u,bottomed:a>=tm.strokeM,travel:a,cosine:o}})}function dm(e,r=null){let a=r?om(e.epoch,r):sm(e),s=lm(e).map(e=>({...e,local:h(a.q,n(e.r,a.r))})),l=s.length===4&&s.every(e=>cm(e.local[0],e.local[2])),u=s.map(e=>e.local[1]),d=s.length?Math.min(...u):o(e.r)-b.radius,f=m(e.q,[0,0,-1]),p=Math.acos(c(i(f,a.normal),-1,1)),g=o(e.v),_=L(e),v=h(e.q,a.normal),y=(8.8-_.com[2])/(v[2]||1e-9),x=Math.abs(_.com[0]+y*v[0])<3.1&&Math.abs(_.com[1]+y*v[1])<2.4,S=e.suspension?e.suspension.feet.every(e=>e.contact&&e.normalForce>0&&!e.bottomed):!1,C=S&&x&&l&&Math.max(...u)<.006&&d>=-.03&&p<.04&&g<.025&&o(e.omega)<.005,w=n(e.r,m(e.q,_.com)),T=h(a.q,n(w,a.r)),E=!e.debris&&e.design.parts.filter(e=>[`tank`,`rack`].includes(e.part)).every(r=>{let i=h(a.q,n(t(w,m(e.q,r.position)),a.r)),s=r.part===`tank`?[4,0,0]:[-4,0,0];return i[1]>=0&&i[1]<=14&&o(n(i,s))<=18}),D=C&&E&&Math.hypot(T[0],T[2])<a.handlingRadius;return{siteId:a.id,feet:s,inside:l,supported:x,loaded:S,suspension:e.suspension||null,clearance:d,tilt:p,speed:g,stable:C,handling:D,range:o(n(e.r,a.r)),settled:C&&e.landed?.siteId===a.id&&(e.landed?.stableTime||0)>=2}}function fm(e,n,i,o){e.v=t(e.v,r(i,1/o.mass)),e.omega=t(e.omega,v(o.inertia,h(e.q,a(n,i))))}function pm(e,t,n,r){let o=h(e.q,a(t,n)),s=m(e.q,v(r.inertia,o));return 1/r.mass+i(n,a(s,t))}function mm(i,o){i.suspension??=nm();let s=sm(i),c=um(i,s),l=lm(i,{uncompressed:!0});if(!(l.length===4&&l.every(e=>{let t=h(s.q,n(e.r,s.r));return cm(t[0],t[2])})))return{externalForce:e(),externalTorque:e(),normalImpulses:[0,0,0,0]};i.suspension.feet=c.map(({travel:e,cosine:t,...n})=>n);let u=e(),d=e(),f=lm(i);for(let e=0;e<c.length;e++){let n=c[e],l=r(s.normal,n.normalForce);if(u=t(u,l),d=t(d,a(f[e].offset,l)),n.contact){let e=n.compressionRate>=0?tm.dampingNsPerM*n.compressionRate:Math.max(tm.dampingNsPerM*n.compressionRate,-tm.stiffnessNPerM*n.compression);i.suspension.dissipatedJ+=Math.max(0,e*n.compressionRate*o)}}return{externalForce:u,externalTorque:h(i.q,d),normalImpulses:c.map(e=>e.normalForce*o)}}function hm(e,a,s){let c=sm(e),l=c.normal,u=L(e);e.suspension??=nm();let d=um(e,c),f=lm(e,{uncompressed:!0});if(!(f.length===4&&f.every(e=>{let t=h(c.q,n(e.r,c.r));return cm(t[0],t[2])})))return e.suspension.feet=nm().feet,e.landed=null,null;if(e.suspension.feet=d.map(({travel:e,cosine:t,...n})=>n),dm(e).tilt>.22&&d.some(e=>e.contact))return e.landed=null,e.damage=1,`impact`;let p=new Float64Array(s);for(let t=0;t<d.length;t++){let n=d[t];if(!n.contact)continue;let r=lm(e)[t];if(n.bottomed&&Math.max(0,-i(r.bodyVelocity,l))>tm.bottomImpactMps)return e.landed=null,e.damage=1,`impact`}let m=new Float64Array(4);for(let t=0;t<12;t++)for(let t=0;t<d.length;t++)if(d[t].bottomed){let n=lm(e)[t],a=i(n.bodyVelocity,l),o=m[t],s=Math.max(0,o-a/pm(e,n.offset,l,u)),c=s-o;m[t]=s,c&&fm(e,n.offset,r(l,c),u)}for(let t=0;t<d.length;t++){let a=lm(e)[t],s=n(a.v,r(l,i(a.v,l))),c=o(s),d=p[t]+m[t];if(c>1e-10&&d>0){let t=r(s,-1/c),n=Math.min(tm.friction*d,c/pm(e,a.offset,t,u));fm(e,a.offset,r(t,n),u)}}let g=dm(e).clearance;g<-1e-6&&d.some(e=>e.bottomed)&&(e.r=t(e.r,r(l,Math.min(-g,.025))),e.suspension.feet=um(e,c).map(({travel:e,cosine:t,...n})=>n)),e.suspension.feet=um(e,c).map(({travel:e,cosine:t,...n})=>n);let _=dm(e),v=_.stable?(e.landed?.stableTime||0)+a:0;return e.landed=_.stable?{siteId:c.id,stableTime:v}:null,v>=2&&(e.status=`landed`),v>=2?`landed`:d.some(e=>e.contact)?`contact`:null}function gm(n,i){if(!n.landed||!Jf(i)||n.burn||o(n.v)>1e-6||o(n.omega)>1e-6||!dm(n).stable)return!1;let s=L(n),c=sm(n),l=lm(n),u=um(n,c),d=s.mass*b.mu/o(n.r)**2,f=0,p=e();for(let e=0;e<u.length;e++){let n=tm.stiffnessNPerM*u[e].compression/u[e].cosine;f+=n,p=t(p,a(l[e].offset,r(c.normal,n)))}return Math.abs(f-d)<d*2e-5&&o(p)<.02}function _m(e,t){let n=L(e),r=Xf(e),i=e.wheelsEnabled!==!1&&n.wheelTorque?30:0;return e.energy=c(e.energy+(r-i)*t,0,n.batteryCapacity),e.electrical={solar:r,draw:i},e.visual={main:0,jets:{}},e.landed.stableTime+=t,e.status=`landed`,`landed`}function vm(e,t,n){let r=0;for(let i=0;i<n.length;i++){let a=n[i],o=n[(i+1)%n.length],s=(o[0]-a[0])*(t-a[1])-(o[1]-a[1])*(e-a[0]);if(Math.abs(s)>1e-8){if(r&&Math.sign(s)!==r)return!1;r=Math.sign(s)}}return!0}function ym(e){let r=L(e),i=sm(e);return r.parts.some(a=>{let s=[1/0,1/0,1/0],c=[-1/0,-1/0,-1/0];for(let l of[-.5,.5])for(let u of[-.5,.5])for(let d of[-.5,.5]){let f=a.id.includes(`:foot:`)?Number(a.id.split(`:foot:`)[1]):-1,p=e.suspension?.feet[f]?.compression||0,g=t(a.position,[a.size[0]*l,a.size[1]*u,a.size[2]*d-p]),_=t(e.r,m(e.q,n(g,r.com)));if(o(_)<b.radius)return!0;let v=h(i.q,n(_,i.r));if(v[1]<rm.foundation.top&&vm(v[0],v[2],rm.foundation.polygonXZ))return!0;for(let e=0;e<3;e++)s[e]=Math.min(s[e],v[e]),c[e]=Math.max(c[e],v[e])}return rm.obstacles.some(e=>s.every((t,n)=>t<e.max[n]&&c[n]>e.min[n]))})}function bm(e,t,n={}){let r=0,i=null;for(;r<t-1e-10;){if(gm(e,n))return _m(e,t-r);let a=Math.min(tm.maxStepS,t-r),o=mm(e,a);if(rp(e,a,{...n,...o}),r+=a,i=hm(e,a,o.normalImpulses),i===`impact`||ym(e))return e.landed=null,e.damage=1,e.status=`surface impact`,`impact`}return i}function xm(e,t=null){let n=dm(e,t);return(!t||n.siteId===t)&&!e.docked&&!e.burn&&!(e.throttle>0)&&n.handling&&n.settled&&e.damage<1}function Sm(e){if(!e.suspension){if(!e.debris&&e.design.parts.some(e=>M[e.part].kind===`engine`))throw Error(`Missing suspension state`);return!0}let t=e.suspension;if(t.version!==1||!Array.isArray(t.feet)||t.feet.length!==4||!Number.isFinite(t.dissipatedJ)||t.dissipatedJ<0)throw Error(`Invalid suspension state`);let r=sm(e),i=um(e,r),a=lm(e);for(let e=0;e<4;e++){let o=t.feet[e];if(!Number.isFinite(o.compression)||o.compression<0||o.compression>tm.strokeM||!Number.isFinite(o.compressionRate)||!Number.isFinite(o.normalForce)||o.normalForce<0||typeof o.contact!=`boolean`||typeof o.bottomed!=`boolean`||o.bottomed&&o.compression<tm.strokeM-1e-8||!o.contact&&(o.compression!==0||o.normalForce!==0))throw Error(`Invalid suspension travel or force`);if(o.contact){let t=a[e],i=t&&h(r.q,n(t.r,r.r));if(!i||!cm(i[0],i[2],0))throw Error(`Suspension contact is outside the pad`)}let s=o.contact?Math.max(0,(tm.stiffnessNPerM*o.compression+tm.dampingNsPerM*o.compressionRate)/(i[e]?.cosine||1)):0;if(Math.abs(o.normalForce-s)>1e-6*Math.max(1,s))throw Error(`Suspension force disagrees with spring/damper state`);if(o.contact&&(!i[e]||Math.abs(o.compression-i[e].compression)>1e-5))throw Error(`Suspension does not match physical shoe contact`)}return!0}var Cm=[...im,...ue];function wm(e,t){return fe(t)?me(e,t):{available:xm(e.selected,t),reason:`Settle on this exchange pad within handling reach`}}var Tm={"refined-alloy":{name:`Refined alloy`,lotKg:1e3,ask:8,bid:6,sellDepth:8e3,buyDepth:12e3,storageCapacity:4e4},propellant:{name:`Propellant`,lotKg:1,ask:12,bid:9,sellDepth:1e4,buyDepth:1e4,storageCapacity:1e4}},Em=(e,t,n)=>e===`aster-ridge-exchange`?{ask:t===`propellant`?11:9,bid:t===`propellant`?8:7}:{ask:n.ask,bid:n.bid};function Dm(e=am.id){return{id:e+`/book`,revision:0,orders:Object.fromEntries(Object.entries(Tm).map(([t,n])=>[t,{...Em(e,t,n),sellRemaining:n.sellDepth,buyRemaining:n.buyDepth}]))}}function Om(){return{market:{ownerId:`venue`,stock:Object.fromEntries(Object.entries(Tm).map(([e,t])=>[e,t.sellDepth]))},warehouse:{ownerId:`player`,stock:Object.fromEntries(Object.keys(Tm).map(e=>[e,0]))}}}function km(e){let t=e.exchange;if(!Cm.some(t=>t.id===e.id)||!t||t.id!==e.id+`/book`||!Number.isSafeInteger(t.revision)||t.revision<0||Object.keys(t.orders||{}).length!==2)throw Error(`Invalid exchange identity, revision or orders`);for(let[n,r]of Object.entries(Tm)){let i=t.orders[n],a=Em(e.id,n,r);if(!i||![i.ask,i.bid,i.sellRemaining,i.buyRemaining].every(e=>Number.isSafeInteger(e)&&e>=0)||i.ask!==a.ask||i.bid!==a.bid||i.sellRemaining>r.sellDepth||i.buyRemaining>r.buyDepth)throw Error(`Invalid local exchange order`)}for(let[t,n]of[[`market`,`venue`],[`warehouse`,`player`]]){let r=e[t];if(!r||r.ownerId!==n||Object.keys(r.stock||{}).length!==2)throw Error(`Invalid venue inventory ownership`);for(let[e,n]of Object.entries(Tm)){let i=r.stock[e];if(!Number.isSafeInteger(i)||i<0||t===`warehouse`&&i>n.storageCapacity)throw Error(`Invalid venue inventory capacity`)}}return!0}function Am(e,{siteId:t=am.id,resourceId:n,quantityKg:r,revision:i},a=!0,o=!0){if(!Array.isArray(e.ledger)||!Number.isSafeInteger(e.credits)||e.credits<0)throw Error(`Invalid transaction journal or credits`);let s=e.selected,c=e.sites[t],l=Tm[n];if(!c||!Cm.some(e=>e.id===t))throw Error(`Unknown exchange venue`);if(a){let n=wm(e,t);if(!n.available)throw Error(n.reason);if(s.joinedId)throw Error(`Undock joined ships before handling`);if(!e.timeline||typeof e.timeline.cancelShip!=`function`)throw Error(`Invalid maneuver journal`)}if(km(c),i!==c.exchange.revision||i>=2**53-1)throw Error(`Quote changed; review the current order`);if(!l||!Number.isSafeInteger(r)||r<=0||o&&r%l.lotKg)throw Error(`Choose a positive whole cargo container or kilogram of fuel`);return{ship:s,site:c,good:l,stats:a?L(s):null}}function jm(e,r,i,o,s,c){if(fe(c.id)){let t=he(r,e.station(c.id),o,s);Object.assign(r,t)}else{o===`propellant`?r.fuel=Math.max(0,s):r.cargoCount=s/1e3;let e=L(r),c=m(r.q,n(e.com,i.com));r.r=t(r.r,c),r.v=t(r.v,a(m(r.q,r.omega),c))}e.timeline.cancelShip(r.id),r.plan=null,r.navigation=null,r.guidance=null,r.targetQ=null,e.plan=null}function Mm(e,t,{resourceId:n,quantityKg:r},i,a=0){return t.exchange.revision++,e.ledger.push({time:e.time,kind:i,amount:a,label:`${i} ${r} kg ${n}`,siteId:t.id,resourceId:n,quantityKg:r,revision:t.exchange.revision}),e.message=`${i} ${r} kg ${Tm[n].name.toLowerCase()}`,{revision:t.exchange.revision,credits:e.credits,quantityKg:r}}var Nm=(e,t)=>t===`propellant`?e.fuel:e.cargoCount*1e3,Pm=(e,t)=>t===`propellant`?e.fuelCapacity:e.cargoCapacity;function Fm(e,t={}){let{ship:n,site:r,stats:i}=Am(e,t),{resourceId:a,quantityKg:o,side:s}=t;if(![`buy`,`sell`].includes(s))throw Error(`Invalid trade side`);let c=r.exchange.orders[a],l=s===`buy`,u=l?`sellRemaining`:`buyRemaining`,d=o*(l?c.ask:c.bid),f=r.market.stock[a],p=Nm(n,a);if(c[u]<o)throw Error(`Order has insufficient remaining depth`);if(l&&(f<o||e.credits<d||p+o>Pm(i,a)+1e-7))throw Error(`Insufficient local stock, credits or ship capacity`);if(!l&&p+1e-7<o)throw Error(`Ship does not contain that quantity`);let m=f+(l?-o:o);if(!Number.isSafeInteger(m)||m<0)throw Error(`Invalid market stock value`);let h=e.credits+(l?-d:d);if(!Number.isSafeInteger(h)||h<0)throw Error(`Invalid trade value`);return jm(e,n,i,a,p+(l?o:-o),r),e.credits=h,r.market.stock[a]=m,c[u]-=o,Mm(e,r,t,l?`Bought`:`Sold`,l?-d:d)}function Im(e,t={}){let{ship:n,site:r,stats:i,good:a}=Am(e,t),{resourceId:o,quantityKg:s,direction:c}=t;if(![`deposit`,`withdraw`].includes(c))throw Error(`Invalid storage operation`);let l=c===`deposit`,u=Nm(n,o),d=r.warehouse.stock[o];if(l&&(u+1e-7<s||d+s>a.storageCapacity))throw Error(`Insufficient ship inventory or warehouse capacity`);if(!l&&(d<s||u+s>Pm(i,o)+1e-7))throw Error(`Insufficient owned stock or ship capacity`);return jm(e,n,i,o,u+(l?-s:s),r),r.warehouse.stock[o]=d+(l?s:-s),Mm(e,r,t,l?`Deposited`:`Withdrew`)}function Lm(e,t={}){let{site:n}=Am(e,t,!1,!1),{resourceId:r,quantityKg:i}=t,a=n.warehouse.stock[r],o=n.exchange.orders[r];if(a<i)throw Error(`Insufficient owned warehouse stock`);if(o.buyRemaining<i)throw Error(`Order has insufficient remaining depth`);let s=o.bid*i,c=e.credits+s;if(!Number.isSafeInteger(c))throw Error(`Invalid trade value`);let l=n.market.stock[r]+i;if(!Number.isSafeInteger(l))throw Error(`Invalid market stock value`);return n.warehouse.stock[r]-=i,n.market.stock[r]=l,o.buyRemaining-=i,e.credits=c,Mm(e,n,t,`Sold stored`,s)}function Rm(e,{engineCount:t=0,parts:n=[]}={}){if(!t)return e;let r=new xr,i=new Cs({color:9150113,metalness:.7,roughness:.5}),a=new Cs({color:12833749,metalness:.85,roughness:.22}),o=new Cs({color:3754315,metalness:.35,roughness:.8}),s=new Cs({color:13215581,metalness:.5,roughness:.5}),c=[],l=[];r.name=`SuspendedEngineLandingFrame`,e.group.add(r);let u=(e,t,n,i)=>{let a=t.clone().sub(e),o=new Ba(n,n,1,10),s=new Ki(o,i);return s.position.copy(e).add(t).multiplyScalar(.5),s.quaternion.setFromUnitVectors(new q(0,1,0),a.clone().normalize()),s.scale.y=a.length(),r.add(s),c.push(o),s};for(let[e,t]of N.entries()){let d=new q(t[0],t[1],7.45);u(new q(Math.sign(t[0])*1.05,Math.sign(t[1])*.8,6.6),d,.11,i),u(new q(Math.sign(t[0])*1.05,Math.sign(t[1])*.8,5.85),d,.055,i);let f=u(new q(t[0],t[1],7.1),new q(t[0],t[1],7.9),.17,i);f.name=`SuspensionHousing`+e;let p=u(new q(t[0],t[1],7.5),new q(t[0],t[1],8.7),.09,a);p.name=`SuspensionPiston`+e,u(new q(t[0],t[1],7.86),new q(t[0],t[1],7.93),.183,s);let m=new Ra(.7,.7,.2),h=new Ki(m,o);h.name=`SupportShoe`+e,h.userData.partId=n.find(t=>t.id.endsWith(`:foot:`+e))?.id,h.position.set(t[0],t[1],t[2]-.1),r.add(h),c.push(m),l.push({point:t,piston:p,shoe:h})}let d=e.updateVisuals?.bind(e);e.updateVisuals=(e={})=>{d?.(e),l.forEach(({point:t,piston:n,shoe:r},i)=>{let a=Cn.clamp(e.suspension?.feet?.[i]?.compression||0,0,tm.strokeM),o=t[2]-.1-a;r.position.z=o,n.position.z=(7.5+o)/2,n.scale.y=o-7.5,r.userData.compressionM=a})};let f=e.dispose.bind(e);return e.dispose=()=>{c.forEach(e=>e.dispose()),i.dispose(),a.dispose(),o.dispose(),s.dispose(),f()},e}function zm(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ci,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Bm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Bm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Bm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new ci(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Vm({id:e=`serein-01`}={}){if(typeof e!=`string`||!e.trim())throw Error(`Site needs a nonempty stable id`);let t=new xr;t.name=e;let n=[],r=[],i=new Map,a=(e,t=.75,n=.05,i=0)=>{let a=new Cs({color:e,roughness:t,metalness:n,emissive:i,emissiveIntensity:1.5});return r.push(a),a},o={base:a(7892064),pad:a(2505536),edge:a(11119264),cream:a(14475465),cargo:a(12937531),fuel:a(11583137,.48,.25),steel:a(5466476,.42,.55),dark:a(1976620),amber:a(13079875,.5,.1,9062673),cyan:a(11792606,.4,.1,4497033)};function s(e,t,n=[0,0,0],r=[0,0,0]){e.applyMatrix4(new qn().compose(new q(...n),new wn().setFromEuler(new rr(...r)),new q(1,1,1)));let a=e.index?e.toNonIndexed():e;a!==e&&e.dispose(),i.has(t)||i.set(t,[]),i.get(t).push(a)}let c=(e,t,n,r)=>s(new Ra(...n),e,t,r),l=(e,t,n,r,i=[0,0,0],a=20)=>s(new Ba(n,n,r,a),e,t,i);function u(e,t,n,r=.06){let i=new q(...t),a=new q(...n),o=a.clone().sub(i),c=new Ba(r,r,o.length(),8);c.applyQuaternion(new wn().setFromUnitVectors(new q(0,1,0),o.normalize())),s(c,e,i.add(a).multiplyScalar(.5).toArray())}function d(e,t,n,r){let i=new bo;t.forEach(([e,t],n)=>n?i.lineTo(e,-t):i.moveTo(e,-t)),i.closePath();let a=new is(i,{depth:r-n,bevelEnabled:!1});a.rotateX(-Math.PI/2),s(a,e,[0,n,0])}d(o.base,[[-36,-32],[30,-32],[36,-26],[36,28],[30,32],[-30,32],[-36,26]],-1,-.12),d(o.edge,[[-11,-17],[11,-17],[15,-13],[15,13],[11,17],[-11,17],[-15,13],[-15,-13]],-.12,-.025),d(o.pad,[[-10,-16],[10,-16],[14,-12],[14,12],[10,16],[-10,16],[-14,12],[-14,-12]],-.025,0);for(let e of[-12.8,12.8])for(let t of[-8,0,8])c(o.cream,[e,.003,t],[.18,.006,5.5]);for(let e of[-14.8,14.8])c(o.cream,[0,.003,e],[18,.006,.18]);for(let e of[-4,4])for(let t of[-6,6])c(o.cyan,[e,.004,t-Math.sign(t)],[.17,.008,2]),c(o.cyan,[e-Math.sign(e),.004,t],[2,.008,.17]);for(let e=18;e<=29;e+=3.5)c(o.cream,[-.72,-.11,e],[.15,.012,1.8],[0,-.65,0]),c(o.cream,[.72,-.11,e],[.15,.012,1.8],[0,.65,0]);for(let e of[-14.6,14.6])for(let t of[-10,-5,0,5,10])c(o.cyan,[e,-.012,t],[.22,.018,.75]);for(let e of[-16.5,16.5])for(let t of[13,28])l(o.dark,[e,.45,t],.16,1.1),l(o.cyan,[e,1.05,t],.22,.2);for(let e of[-9,-3,3,9])c(o.dark,[e,.001,0],[.018,.002,27]);for(let e of[-10,-5,0,5,10])c(o.dark,[0,.001,e],[24,.002,.018]);for(let e of[-10.8,10.8])for(let t of[-11,0,11])l(o.steel,[e,.004,t],.12,.008,[0,0,0],12);for(let e of[-1,1]){c(o.dark,[e*17.6,-.08,0],[.3,.04,27]);for(let t=-12;t<=12;t+=.65)c(o.steel,[e*17.6,-.049,t],[.27,.018,.09])}c(o.steel,[-25,-.01,-2],[13,.2,25]);for(let e of[-29,-24])for(let t of[-10,-5]){c(o.dark,[e,.22,t],[1.8,.28,3.25]),c(o.cargo,[e,1.635,t],[1.44,2.55,2.96]);for(let n of[-.64,.64])for(let r of[-1.39,1.39])c(o.edge,[e+n,1.65,t+r],[.1,2.6,.1]);for(let n=-1;n<=1;n+=.4)c(o.edge,[e+.727,1.6,t+n],[.025,2.1,.04])}for(let e of[-31,-20]){c(o.dark,[e,.19,1.5],[.55,.24,17]);for(let t of[-3,6])c(o.steel,[e,3.3,t],[.4,6.4,.4]),u(o.steel,[e,.3,t-1],[e,3,t],.09)}for(let e of[-3,6])c(o.cream,[-25.5,6.6,e],[11.8,.5,.55]),c(o.cargo,[-25.5,6.92,e],[10,.13,.6]);c(o.steel,[-25.5,6.45,1.5],[1.2,.5,9]),c(o.dark,[-25.5,5.9,1.5],[1.7,.55,2.5]);for(let e of[-26.1,-24.9])u(o.steel,[e,5.8,1.5],[e,2.8,1.5],.025);c(o.cream,[-25.5,2.75,1.5],[1.65,.18,3]),c(o.cargo,[-23,.4,10],[2.2,.6,3.8]),c(o.steel,[-23,1.8,11.5],[1.8,2.6,.2]);for(let e of[-23.7,-22.3])c(o.steel,[e,.8,9.7],[.16,.15,2.8]);for(let e of[-23.8,-22.2])for(let t of[8.7,11.3])l(o.dark,[e,.24,t],.22,.16,[0,0,Math.PI/2],12);c(o.edge,[-10,1.4,-26],[17,3,8]);for(let e of[-16,-10,-4])c(o.cream,[e-1.2,3.5,-26],[3.4,.24,10],[0,0,.21]),c(o.cream,[e+1.2,3.5,-26],[3.4,.24,10],[0,0,-.21]),c(o.dark,[e,1.9,-21.975],[2.6,1.05,.07]);c(o.dark,[-10,1.05,-21.9],[1.2,2.2,.12]);for(let e=0;e<3;e++)c(o.steel,[-10,-.03+e*.12,-21.2-e*.25],[2,.12,.75]);for(let e of[-11.3,-8.7])u(o.cream,[e,.18,-20.8],[e,1.3,-21.8],.035);for(let e=-17;e<=-3;e+=2.3)c(o.cyan,[e,3,-21.8],[.55,.08,.08]);c(o.dark,[26,-.01,-8],[16,.2,23]);for(let e of[18.4,33.6])c(o.edge,[e,.32,-8],[.3,.7,23]);for(let e of[-19.4,3.4])c(o.edge,[26,.32,e],[15,.7,.3]);for(let e of[-12,-4]){l(o.fuel,[26,3.6,e],2.7,6.5),l(o.cream,[26,7,e],2.72,.26);for(let t of[.65,5.7])l(o.steel,[26,t,e],2.77,.13);l(o.dark,[26,7.28,e],.45,.35);for(let t of[1.3,2.8,4.3])c(o.cyan,[23.29,t,e],[.045,.15,.6]);u(o.steel,[26,.7,e],[21,.7,e],.18),u(o.steel,[29,.4,e],[29,7.2,e],.045),u(o.steel,[29,.4,e+.5],[29,7.2,e+.5],.045);for(let t=.6;t<7.2;t+=.3)u(o.steel,[29,t,e],[29,t,e+.5],.035)}u(o.steel,[21,.7,-12],[21,.7,9],.18),c(o.fuel,[21,1,8],[3,2,3]),l(o.dark,[19.3,1,8],.75,.3,[0,0,Math.PI/2]),l(o.steel,[19.1,1,8],.78,.1,[0,0,Math.PI/2]),c(o.cyan,[19.3,1.4,9.52],[.8,.22,.04]),c(o.dark,[19,1,10.3],[.75,1.3,.75]);for(let e of[7,9])c(o.amber,[18.2,.4,e],[.14,.9,.14]);u(o.steel,[21,.7,0],[21,-.5,0],.12),u(o.steel,[21,-.5,0],[4,-.5,0],.12),u(o.steel,[4,-.5,0],[4,-.02,0],.12),l(o.steel,[4,.005,0],.46,.01),l(o.dark,[4,.011,0],.3,.006);for(let e of[-33,33]){u(o.steel,[e,-.1,23],[e,7.7,23],.12);for(let t of[-.7,.7])u(o.cream,[e,6.1,23],[e+t,8.2,23],.1),c(o.amber,[e+t,8.25,23],[.24,.6,.24])}let f={};function p(n,r,i){let a=new br;a.name=`${e}/${n}`,a.userData={id:a.name,role:i,normal:[0,1,0],forward:[0,0,-1]},a.position.fromArray(r),t.add(a),f[n]=a}p(`pad`,[0,0,0],`surface centre; +Y normal, -Z heading`),p(`approach`,[0,30,55],`reference approach point; advisory geometry only`),p(`cargo`,[-4,0,0],`pad cargo service position; mobile carrier must travel here`),p(`fuel`,[4,0,0],`flush closed coupling; under-pad line to compound`),p(`cargoHandling`,[-18.5,.5,0],`west pad-edge handling interface`),p(`fuelHandling`,[18.5,1,9],`east stowed fuel service interface`),p(`exchange`,[-10,.3,-20.8],`shelter access`);let m={foundation:{polygonXZ:[[-36,-32],[30,-32],[36,-26],[36,28],[30,32],[-30,32],[-36,26]],top:-.12,bottom:-1},footprint:{min:[-36,-1,-32],max:[36,8.6,32]},pad:{min:[-14,0,-16],max:[14,0,16],cornerChamfer:4,polygonXZ:[[-10,-16],[10,-16],[14,-12],[14,12],[10,16],[-10,16],[-14,12],[-14,-12]]},clearVolumes:[{id:`${e}/pad-clear`,min:[-14,.02,-16],max:[14,60,16]},{id:`${e}/approach-clear`,min:[-14,.02,16],max:[14,40,64]}],obstacles:[{id:`${e}/cargo`,min:[-32,0,-15],max:[-19,7.1,12]},{id:`${e}/fuel`,min:[18.1,0,-20],max:[34,7.5,11]},{id:`${e}/shelter`,min:[-19,0,-31],max:[-1,4.3,-20]},{id:`${e}/beacon-west`,min:[-34,0,22],max:[-32,8.6,24]},{id:`${e}/beacon-east`,min:[32,0,22],max:[34,8.6,24]}]};for(let t of[-16.5,16.5])for(let n of[13,28])m.obstacles.push({id:`${e}/marker-${t<0?`west`:`east`}-${n}`,min:[t-.23,0,n-.23],max:[t+.23,1.16,n+.23]});for(let[a,o]of i){let i=zm(o);o.forEach(e=>e.dispose()),n.push(i);let s=new Ki(i,a);s.name=`${e}/surface-${r.indexOf(a)}`,s.castShadow=!0,s.receiveShadow=!0,t.add(s)}i.clear(),t.userData={id:e,units:`metres`,bounds:m};let h=!1;return{group:t,anchors:f,bounds:m,dispose(){h||(h=!0,n.forEach(e=>e.dispose()),r.forEach(e=>e.dispose()),t.removeFromParent())}}}var Hm=class extends kr{constructor(){super(),this.name=`RoomEnvironment`,this.position.y=-3.5;let e=new Ra;e.deleteAttribute(`uv`);let t=new Cs({side:1}),n=new Cs,r=new ic(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let i=new Ki(e,t);i.position.set(-.757,13.219,.717),i.scale.set(31.713,28.305,28.591),this.add(i);let a=new ia(e,n,6),o=new br;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);let s=new Ki(e,Um(50));s.position.set(-16.116,14.37,8.208),s.scale.set(.1,2.428,2.739),this.add(s);let c=new Ki(e,Um(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let l=new Ki(e,Um(17));l.position.set(14.904,12.198,-1.832),l.scale.set(.15,4.265,6.331),this.add(l);let u=new Ki(e,Um(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let d=new Ki(e,Um(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);let f=new Ki(e,Um(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Um(e){return new Ts({color:0,emissive:16777215,emissiveIntensity:e})}var Wm=new q;function Gm(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Wm.copy(t),Wm[r]=0,Wm.normalize();let l=.5*o/(o+s),u=1-Wm.angleTo(e)/c;return Math.sign(Wm[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Km=class e extends Ra{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new q,c=new q,l=new q(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new q,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=Gm(m,c,`z`,`y`,i,n),f[a+1]=1-Gm(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-Gm(m,c,`z`,`y`,i,n),f[a+1]=1-Gm(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-Gm(m,c,`x`,`z`,i,e),f[a+1]=Gm(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-Gm(m,c,`x`,`z`,i,e),f[a+1]=1-Gm(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-Gm(m,c,`x`,`y`,i,e),f[a+1]=1-Gm(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=Gm(m,c,`x`,`y`,i,e),f[a+1]=1-Gm(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}};function qm(){let e=new xr,t=new Map,n=[],r={paint:new Cs({color:12633530,metalness:.08,roughness:.43}),dark:new Cs({color:1516329,metalness:.6,roughness:.42}),steel:new Cs({color:6781056,metalness:.93,roughness:.28}),orange:new Cs({color:13329454,metalness:.05,roughness:.48}),foil:new Cs({color:11704396,metalness:.85,roughness:.36}),glass:new ws({color:1059122,metalness:.35,roughness:.09,clearcoat:.8,clearcoatRoughness:.12}),cyan:new Cs({color:8833486,emissive:4034716,emissiveIntensity:.6,roughness:.5}),solar:new ws({color:1188407,metalness:.5,roughness:.24,clearcoat:.45})},i=new wn;function a(e,n,r=[0,0,0],a=[0,0,0]){e.applyMatrix4(new qn().compose(new q(...r),i.setFromEuler(new rr(...a)),new q(1,1,1)));let o=e.index?e.toNonIndexed():e;o!==e&&e.dispose();for(let e of Object.keys(o.attributes))[`position`,`normal`,`uv`].includes(e)||o.deleteAttribute(e);let s=t.get(n);s||t.set(n,s=[]),s.push(o)}let o=(e,t,n,r=[0,0,0])=>a(new Ra(...n),e,t,r),s=(e,t,n,r=.06)=>a(new Km(...n,2,r),e,t),c=(e,t,n,r,i=[0,0,0],o=20)=>a(new Ba(n,n,r,o),e,t,i);function l(e,t,n,r=.06){let i=new q(...t),o=new q(...n),s=o.clone().sub(i),c=new Ba(r,r,s.length(),8);c.applyQuaternion(new wn().setFromUnitVectors(new q(0,1,0),s.normalize())),a(c,e,i.add(o).multiplyScalar(.5).toArray())}let u=(e,t,n,r=.04,i=[0,0,0])=>a(new fs(n,r,8,40),e,t,i);function d(e,t,r,i,o=[0,0,0],s=`#263239`,c=`#d7d9c6`){let l=document.createElement(`canvas`);l.width=512,l.height=128;let u=l.getContext(`2d`);u.fillStyle=s,u.fillRect(0,0,512,128),u.fillStyle=c,u.font=`bold 56px sans-serif`,u.textAlign=`center`,u.textBaseline=`middle`,u.fillText(e,256,66,490);let d=new Pa(l);d.colorSpace=Nt,n.push(d);let f=new Cs({map:d,roughness:.65,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});n.push(f),a(new ls(r,i),f,t,o)}function f(){for(let[r,i]of t){let t=zm(i);i.forEach(e=>e.dispose());let a=new Ki(t,r);a.castShadow=!0,a.receiveShadow=!0,e.add(a),n.push(t)}return t.clear(),e}function p(){n.forEach(e=>e.dispose()),Object.values(r).forEach(e=>e.dispose()),e.removeFromParent()}return{group:e,materials:r,resources:n,add:a,box:o,rounded:s,cylinder:c,beam:l,ring:u,label:d,finish:f,dispose:p}}function Jm(e,t){if(t!==-1&&t!==1)throw Error(`Solar array side must be -1 or +1`);let n=e.materials;e.box(n.dark,[t*3.65,2.92,2],[2.2,.09,4.1]);for(let r=0;r<4;r++)for(let i=0;i<7;i++)e.box(n.solar,[t*(3.65+(r-1.5)*.53),2.975,2+(i-3)*.53],[.51,.012,.49]);for(let r of[2.575,4.725])e.box(n.steel,[t*r,2.943,2],[.05,.076,4.1]);for(let r of[-.025,4.025])e.box(n.steel,[t*3.65,2.943,r],[2.1,.076,.05]);for(let r of[.5,3.5])e.box(n.steel,[t*3.65,2.845,r],[2.2,.07,.12]),e.box(n.steel,[t*1.22,1.25,r],[.25,.3,.42]),e.box(n.steel,[t*1.32,.7,r],[.14,.36,.3]),e.beam(n.steel,[t*1.22,1.4,r],[t*2.86,2.83,r],.065),e.beam(n.steel,[t*1.32,.7,r],[t*2.86,2.83,r],.055),e.box(n.dark,[t*2.86,2.82,r],[.22,.13,.22])}function Ym({cargoSlots:e=6,layout:t=null,engineCount:n=4,docking:r=!0,rcs:i=!0,wheel:a=!0,decouplers:o=[],registration:s=`HF–01`}={}){let c=qm(),l=c.materials,u=c.group;u.name=`IndustrialFreighter`;let d={dock:new br,cargo:[],jets:{},attachments:{core:new br,slots:[],engines:[]}};if(u.add(d.attachments.core),![0,1,2,4].includes(n))throw Error(`Freighter engineCount must be0,1,2or4`);let f=Array.from({length:6},(n,r)=>t?t[r]??`empty`:r<e?`cargo`:`empty`);if(f.some(e=>![`cargo`,`tank`,`empty`].includes(e)))throw Error(`Unknown freighter rack module`);c.rounded(l.paint,[0,0,0],[2.6,2.4,13.2],.18),c.box(l.dark,[0,-1.34,.2],[2.9,.26,13.8]),c.rounded(l.paint,[0,1.5,-4.6],[2.4,1,3],.2),c.box(l.glass,[0,1.65,-6.115],[1.75,.46,.035]);for(let e of[-.9,0,.9])c.box(l.steel,[e,1.65,-6.14],[.045,.5,.05]);for(let e of[-5,-2.5,0,2.5,5]){c.box(l.steel,[0,1.22,e],[2.7,.075,.16]),c.box(l.dark,[0,1.267,e+.5],[1.6,.03,.5]);for(let t=-5;t<=5;t++)c.box(l.steel,[t*.13,1.29,e+.5],[.035,.025,.46])}for(let e of[-1,1]){c.box(l.orange,[e*1.325,.4,-4.8],[.045,.18,1.5]),c.box(l.foil,[e*1.32,-.3,4.6],[.04,1.1,2.2]);for(let t of[-1.48,1.48]){c.box(l.steel,[e*3.15,t,0],[.15,.15,10.6]),c.box(l.steel,[e*1.48,t,0],[.16,.16,10.6]);for(let n of[-5.2,-1.75,1.75,5.2])c.beam(l.steel,[e*1.48,t,n],[e*3.15,t,n],.08)}for(let t of[-5.2,-1.75,1.75,5.2])c.beam(l.steel,[e*3.15,-1.48,t],[e*3.15,1.48,t],.075),c.beam(l.dark,[e*1.48,-1.48,t],[e*3.15,1.48,t],.035);c.cylinder(l.steel,[e*.79,-1.65,4.55],.43,2.5,[Math.PI/2,0,0]);for(let t of[3.5,5.6])c.ring(l.dark,[e*.79,-1.65,t],.45,.065);Jm(c,e)}let p=new br;if(p.name=`ReactionWheelMount`,p.position.set(0,1.43,3.65),p.userData.attached=!!a,u.add(p),d.attachments.wheel=p,a){c.rounded(l.steel,[0,1.43,3.65],[1.25,.4,.95],.07);for(let e of[-.42,0,.42])c.box(l.dark,[e,1.64,3.65],[.055,.025,.75]);c.box(l.orange,[0,1.44,3.16],[.7,.15,.035])}c.label(s,[0,1.24,-1],1.8,.45,[-Math.PI/2,0,0]),c.label(`FREIGHT / 06`,[0,-.22,-6.63],1.8,.45,[0,Math.PI,0]);let m=qm();if(d.dockMesh=m.group,m.group.name=`DockingCollar`,u.add(m.group),r){m.cylinder(m.materials.dark,[0,0,-7.05],.8,.9,[Math.PI/2,0,0]),m.cylinder(m.materials.steel,[0,0,-7.62],.73,.3,[Math.PI/2,0,0]),m.ring(m.materials.steel,[0,0,-7.81],.65,.07),m.add(new us(.56,.85,48),m.materials.steel,[0,0,-7.95],[0,Math.PI,0]),m.cylinder(m.materials.dark,[0,0,-7.83],.56,.04,[Math.PI/2,0,0]);for(let e=0;e<6;e++){let t=e*Math.PI/3;m.box(m.materials.orange,[Math.sin(t)*.72,Math.cos(t)*.72,-7.85],[.11,.2,.16],[0,0,-t]),m.cylinder(m.materials.steel,[Math.sin(t)*.49,Math.cos(t)*.49,-7.88],.035,.06,[Math.PI/2,0,0],8)}}m.finish(),d.dock.userData.attached=!!r,d.dock.name=`Dock / outward -Z`,d.dock.position.set(0,0,-7.95),u.add(d.dock);let h=new xr;h.name=`CaptureLatch`,h.visible=!!r,u.add(h);let g=l.orange.clone();c.resources.push(g);for(let e=0;e<3;e++){let t=e*Math.PI*2/3,n=new Ra(.13,.16,.12),r=new Ki(n,g);c.resources.push(n),r.position.set(Math.sin(t)*.7,Math.cos(t)*.7,-7.8),r.rotation.z=-t,h.add(r)}let _=[],v=[],y=[];for(let e=0;e<6;e++){let t=new br;if(t.name=`RackMount`+e,t.position.set(e<3?-2.31:2.31,0,-3.5+e%3*3.5),u.add(t),d.attachments.slots.push(t),o.includes(e)){let n=qm();n.group.name=`Decoupler`+e,u.add(n.group),y.push(n),n.box(l.steel,[e<3?-1.52:1.52,0,t.position.z],[.1,2.3,2.7]);for(let r of[-.85,.85])n.box(l.orange,[e<3?-1.585:1.585,r,t.position.z],[.035,.1,2.5]);n.finish()}if(f[e]===`empty`)continue;if(f[e]===`tank`){let n=Xm(`tank`),r=n.group;r.position.copy(t.position),r.name=`TankModule`+e,u.add(r),v.push(n);continue}let n=e<3?-1:1,r=-3.5+e%3*3.5,i=Xm(`cargo`,{side:n,index:e}),a=i.group;a.name=`CargoSlot`+e,a.position.set(n*2.31,0,r),u.add(a),_.push(i);let s=new br;s.name=`CargoAnchor`+e,s.position.copy(a.position),u.add(s),d.cargo.push(s)}let b=[];function x(e,t){let n=new Va(e,t,24,1,!0);n.rotateX(Math.PI/2),n.translate(0,0,t/2);let r=new Pi({color:9752034,transparent:!0,opacity:.2,blending:2,depthWrite:!1,side:2,toneMapped:!1});return c.resources.push(n,r),new Ki(n,r)}let S=n===0?[]:n===1?[[0,0]]:n===2?[[-.72,0],[.72,0]]:[[-.72,-.62],[-.72,.62],[.72,-.62],[.72,.62]];for(let[e,t]of S.length?S:[[0,0]]){let r=new br;r.name=`EngineMount`+d.attachments.engines.length,r.position.set(e,t,6.55),u.add(r),d.attachments.engines.push(r),r.userData.attached=n>0}let C=qm();d.engineMesh=C.group,C.group.name=`EngineGroup`,u.add(C.group);let w=l.dark.clone();w.color.set(3424327),w.side=2,w.roughness=.44,c.resources.push(w);for(let[e,t]of S){let n=new ss([[.23,0],[.25,.23],[.34,.55],[.51,1.03],[.55,1.18]].map(e=>new K(...e)),24);n.rotateX(Math.PI/2),C.add(n,w,[e,t,6.55]),C.cylinder(C.materials.dark,[e,t,6.64],.24,.045,[Math.PI/2,0,0]),C.ring(C.materials.steel,[e,t,7.73],.55,.045);for(let n of[6.66,6.85,7.04])C.ring(C.materials.foil,[e,t,n],.28+(n-6.66)*.2,.022);let r=x(.47,4.2);r.position.set(e,t,7.73),u.add(r),b.push(r)}C.finish();let T=[];for(let[e,t,n]of[[`px`,[1,0,0],[[-1.45,.9,-5.8],[-1.45,-.9,5.7]]],[`nx`,[-1,0,0],[[1.45,.9,-5.8],[1.45,-.9,5.7]]],[`py`,[0,1,0],[[-.85,-1.4,-5.8],[.85,-1.4,5.7]]],[`ny`,[0,-1,0],[[-.85,2.12,-5.8],[.85,1.4,5.7]]],[`pz`,[0,0,1],[[-.85,.8,-6.8],[.85,-.8,-6.8]]],[`nz`,[0,0,-1],[[-1.1,.9,6.5],[1.1,-.9,6.5]]]])n.forEach((n,r)=>{let a=e+`_`+r,o=new xr,s=new q(...t).negate();o.name=a,o.position.fromArray(n),o.quaternion.setFromUnitVectors(new q(0,0,1),s),o.userData.force=t,o.userData.axis=e,u.add(o),d.jets[a]=o,o.userData.attached=!!i,o.visible=!!i;let f=new Ki(new Ba(.1,.16,.24,12),l.dark);f.geometry.rotateX(Math.PI/2),f.position.z=.08,o.add(f),c.resources.push(f.geometry);let p=x(.075,.8);p.position.z=.2,o.add(p),T.push({name:a,axis:e,flame:p})});c.finish();function E({main:e=0,bells:t=null,jets:n={},cargoCount:r=0,docked:i=!1}={}){b.forEach((n,r)=>{let i=Cn.clamp(t?.[r]??e,0,1);n.visible=i>.001,n.scale.z=.25+.75*i,n.material.opacity=.1+.22*i}),T.forEach(({name:e,axis:t,flame:r})=>{let i=Cn.clamp(n[e]??n[t]??0,0,1);r.visible=i>.001,r.scale.z=.35+.65*i,r.material.opacity=.15+.3*i}),_.forEach((e,t)=>{e.group.visible=t<Math.round(r)}),h.position.z=i?.09:0}return E(),{group:u,anchors:d,updateVisuals:E,dimensions:{length:15.9,width:9.5,height:5.1,dockingDiameter:1.3,cargoSlots:_.length},design:{layout:f,docking:!!r,engineCount:S.length,rcs:!!i,wheel:!!a,decouplers:[...o],cargoCapacity:_.length,tankModules:v.length},dispose(){y.forEach(e=>e.dispose()),C.dispose(),m.dispose(),_.forEach(e=>e.dispose()),v.forEach(e=>e.dispose()),c.dispose()}}}function Xm(e,{side:t=1,index:n=0,cargoLoaded:r=!0}={}){if(e===`tank`){let e=qm(),t=e.materials;e.cylinder(t.paint,[0,0,0],.68,2.72,[Math.PI/2,0,0],28);for(let n of[-1.35,1.35])e.cylinder(t.steel,[0,0,n],.66,.12,[Math.PI/2,0,0],28),e.ring(t.orange,[0,0,n],.65,.055);for(let n of[-.9,.9])e.ring(t.dark,[0,0,n],.71,.085);e.box(t.dark,[0,-1.18,0],[1.3,.15,2.9]);for(let n of[-.9,.9])e.beam(t.steel,[-.55,-1.18,n],[-.55,-.35,n],.065);return e.label(`PROPELLANT`,[0,.72,0],1.8,.36,[-Math.PI/2,0,0]),e.finish(),e}if(e!==`cargo`)throw Error(`Detached module kind must be tank or cargo`);let i=qm(),a=i.materials;for(let e of[-1.18,1.18])i.box(a.steel,[0,e,0],[1.54,.12,3.04]);for(let e of[-.7,.7])for(let t of[-1.45,1.45])i.box(a.steel,[e,0,t],[.1,2.36,.1]);if(r){i.rounded(a.orange,[0,0,0],[1.44,2.55,2.96],.065);for(let e of[-1.43,1.43]){i.box(a.dark,[0,0,e],[1.48,2.58,.06]);for(let t of[-.8,0,.8])i.box(a.steel,[0,t,e*1.04],[1.27,.05,.07])}for(let e=-4;e<=4;e++)i.box(a.paint,[t*.74,0,e*.29],[.025,2.15,.055]);i.label(`CARGO `+String(n+1).padStart(2,`0`),[t*.762,.55,0],1.8,.38,[0,t*Math.PI/2,0])}return i.finish(),i}function Zm({kind:e=`tank`,cargoLoaded:t=!1}={}){let n=Xm(e,{cargoLoaded:t});return n.group.name=`Detached `+e,{group:n.group,dimensions:e===`tank`?{width:1.8,height:2.05,length:2.9}:{width:1.54,height:t?2.58:2.48,length:3.045},dispose(){n.dispose()}}}function Qm({name:e=`KEPLER / FUEL`,owned:t=!1}={}){let n=qm(),r=n.materials,i=n.group;i.name=`OrbitalFreightDepot`,n.cylinder(r.paint,[0,0,0],3.1,20,[Math.PI/2,0,0],40);for(let e of[-9.8,-6,0,6,9.8])n.ring(r.steel,[0,0,e],3.13,.16);for(let e of[-1,1]){n.box(r.steel,[e*7.3,-1,0],[.55,.55,23]);for(let t of[-9,-3,3,9])n.beam(r.steel,[e*2.8,-1.6,t],[e*7.3,-1,t],.2),n.beam(r.dark,[e*2.8,1.5,t],[e*7.3,-1,t],.11);for(let t of[-6,6]){n.cylinder(r.paint,[e*7.3,0,t],1.9,8,[Math.PI/2,0,0],32);for(let i of[-3.8,3.8])n.cylinder(r.dark,[e*7.3,0,t+i],1.84,.25,[Math.PI/2,0,0],32),n.ring(r.orange,[e*7.3,0,t+i],1.9,.13);for(let i of[-2.7,2.7])n.ring(r.steel,[e*7.3,0,t+i],1.94,.15);n.box(r.dark,[e*9.23,.2,t],[.07,1.1,2.9])}n.beam(r.steel,[e*7.3,-1,-1],[e*22,-1,-1],.2);for(let t of[-6.5,4.5])n.beam(r.dark,[e*7.3,-1,t],[e*22,-1,-1],.09);n.box(r.dark,[e*20,-1,0],[16,.22,13]);for(let t=0;t<8;t++)for(let i=0;i<10;i++)n.box(r.solar,[e*(12.3+t*2.15),-.87,-5.8+i*1.29],[2.02,.035,1.18]),n.box(r.steel,[e*(12.3+t*2.15),-.835,-5.8+i*1.29],[.025,.015,1.16]);n.box(r.steel,[e*3.5,4,-4],[2.2,.16,9]);for(let t=-8;t<=0;t+=.45)n.box(r.dark,[e*3.5,4.1,t],[2.1,.12,.075]);for(let t of[-7,-1])n.beam(r.steel,[e*2,2,t],[e*3.5,4,t],.1)}n.cylinder(r.dark,[0,0,12.5],1.9,6,[Math.PI/2,0,0],32);for(let e of[10,12,14.8])n.ring(r.steel,[0,0,e],1.95,.1);n.cylinder(r.paint,[0,0,16.25],1.3,1.5,[Math.PI/2,0,0],32),n.cylinder(r.dark,[0,0,17.2],.85,.55,[Math.PI/2,0,0],32),n.ring(r.steel,[0,0,17.55],.69,.075);for(let e=0;e<8;e++){let t=e*Math.PI/4;n.box(r.orange,[Math.cos(t)*1.16,Math.sin(t)*1.16,17.03],[.16,.3,.06],[0,0,t])}for(let e of[-2.1,2.1])for(let t of[-2.1,2.1])n.beam(r.steel,[e*.8,t*.8,14],[e,t,17],.075),n.box(r.cyan,[e,t,17.05],[.12,.12,.16]);n.label(e,[0,3.23,2.3],5.5,1,[-Math.PI/2,0,0]),n.label(`APPROACH / 01`,[0,2.65,14.2],4,.65);for(let e of[-2,2])n.beam(r.orange,[e,3.45,-8],[e,3.45,8],.12);n.beam(r.steel,[-2,3.45,-5],[2,3.45,-5],.15),n.beam(r.paint,[0,3.45,-5],[0,7,-5],.2),n.beam(r.paint,[0,7,-5],[4.2,7,-5],.17),n.beam(r.dark,[4.2,7,-5],[4.2,4.8,-5],.1);for(let e of[-1,1])n.beam(r.steel,[4.2,4.8,-5],[4.2+e*.5,4.4,-5],.08);let a=new ds(1.1,24,12,0,Math.PI*2,0,Math.PI*.4);a.rotateX(Math.PI),n.add(a,r.paint,[0,5,7]),n.beam(r.steel,[0,2.8,7],[0,5,7],.1);let o=new br;o.name=`Depot dock / outward +Z`,o.position.set(0,0,17.65),o.rotation.y=Math.PI,i.add(o);let s=new br;s.name=`FuelServiceAnchor`,s.position.set(1.1,-.5,16.8),i.add(s);let c=new Pi({color:t?8436644:13805151});n.resources.push(c);let l=new Ki(new Ra(.08,1.4,2.5),c);return n.resources.push(l.geometry),l.position.set(9.29,.2,-6),i.add(l),n.finish(),{group:i,anchors:{dock:o,fuel:s},dimensions:{width:58,length:28,height:11,dockingDiameter:1.3},updateVisuals({fuelFraction:e=1}={}){l.scale.y=Math.max(.025,Cn.clamp(e,0,1))},dispose:n.dispose}}function $m({bodyRadius:e=18e4,starRadius:t=1e3}={}){let n=new xr,r=new xr,i=new xr;n.name=`OrbitalEnvironment`,r.name=`AirlessBody`,i.name=`FixedStars`,n.add(r,i);let a=731,o=()=>(a=1664525*a+1013904223>>>0,a/4294967296),s=2048,c=1024,l=new Float32Array(s*c),u=new Uint8Array(s*c*4),d=new Uint8Array(s*c*4),f=Array.from({length:108},()=>{let e=o()*2-1,t=o()*Math.PI*2,n=Math.sqrt(1-e*e),r=.018+o()**2*.16;return{x:Math.cos(t)*n,y:e,z:Math.sin(t)*n,radius:r,limit:Math.cos(r*1.25),depth:.45+o()*.55}}),p=new Float32Array(s),m=new Float32Array(s);for(let e=0;e<s;e++){let t=e/s*Math.PI*2;p[e]=-Math.cos(t),m[e]=Math.sin(t)}for(let e=0;e<c;e++){let t=(e/1023-.5)*Math.PI,n=Math.sin(t),r=Math.cos(t);for(let t=0;t<s;t++){let i=p[t]*r,a=m[t]*r,o=(Math.sin(i*5+n*3-a*4)+Math.sin(i*9-n*7+a*5))*.5,c=Math.sin(i*18+n*11+a*13)*Math.cos(i*9-n*17+a*7),d=c*75e-6,h=0;for(let e of f){let t=i*e.x+n*e.y+a*e.z;if(t>e.limit){let n=Math.acos(Math.min(1,t))/e.radius,r=Math.exp(-(((n-.96)/.1)**2)),i=n<.93?(1-n*n)**2:0;d+=e.radius*e.depth*(r*.008-i*.032),h+=r*3-i*2}}let g=(e*s+t)*4;l[e*s+t]=d;let _=Cn.clamp(103+o*13+c*3+h,65,137);u[g]=_*.98,u[g+1]=_,u[g+2]=_*1.015,u[g+3]=255}}for(let e=0;e<c;e++)for(let t=0;t<s;t++){let n=(e,t)=>l[Cn.clamp(t,0,1023)*s+(e+s)%s],r=Math.max(.025,Math.cos((e/1023-.5)*Math.PI)),i=Cn.smoothstep(r,.025,.14),a=(n(t+1,e)-n(t-1,e))*s/(Math.PI*4*r)*i,o=(n(t,e+1)-n(t,e-1))*c/(Math.PI*2)*i,u=new q(-a,-o,1).normalize(),f=(e*s+t)*4;d[f]=(u.x*.5+.5)*255,d[f+1]=(u.y*.5+.5)*255,d[f+2]=(u.z*.5+.5)*255,d[f+3]=255}function h(e,t=!1){let n=new Yi(e,s,c);return n.colorSpace=t?Nt:``,n.wrapS=ge,n.magFilter=z,n.minFilter=Se,n.generateMipmaps=!0,n.anisotropy=4,n.needsUpdate=!0,n}let g=h(u,!0),_=h(d),v=new Cs({map:g,normalMap:_,normalScale:new K(1,1),roughness:1,metalness:0,envMapIntensity:0}),y=new ds(e,160,96),b=new Ki(y,v);b.name=`RegolithAndCraterRelief`,r.add(b);let x=[],S=[];for(let e=0;e<1900;e++){let e=o()*2-1,n=o()*Math.PI*2,r=Math.sqrt(1-e*e);x.push(Math.cos(n)*r*t,e*t,Math.sin(n)*r*t);let i=.25+o()**3*.75,a=new Y().setRGB(i*(.86+o()*.14),i*.94,i);S.push(a.r,a.g,a.b)}let C=new Ci;C.setAttribute(`position`,new di(x,3)),C.setAttribute(`color`,new di(S,3));let w=new Ea({size:1.2,sizeAttenuation:!1,vertexColors:!0,depthWrite:!1,depthTest:!1,fog:!1,toneMapped:!1}),T=new ja(C,w);return T.frustumCulled=!1,T.renderOrder=-1e3,i.add(T),{group:n,planet:r,stars:i,bodyRadius:e,dispose(){n.removeFromParent(),[y,v,g,_,C,w].forEach(e=>e.dispose())}}}var eh=Object.freeze({rangeM:.5,lateralM:.1,normalConeRad:20*Math.PI/180,rollConeRad:20*Math.PI/180,maxContactSpeedMps:.25,radiusToleranceM:.001,penetrationSkinM:.001,springNpm:500,dampingNspm:1400,maxForceN:80,normalSpringNm:300,rollSpringNm:150,angularDampingNms:500,maxCoupleNm:60,maxStepS:.02}),th=Array.from,nh=()=>[0,0,0],rh=(e,t)=>e?.length===t&&Array.from(e).every(Number.isFinite),ih=(e,t)=>{if(!e)throw Error(t)},ah=e=>rh(e,3)&&Math.abs(o(e)-1)<1e-9,oh=e=>typeof e==`string`&&e.length>0,sh=e=>th(r(e,-1)),ch=(e,t)=>Math.min(1,t/(o(e)||1)),lh=()=>({force:nh(),torque:nh()});function uh(e){ih(e&&oh(e.bodyId)&&oh(e.frameId)&&oh(e.type)&&Number.isFinite(e.epoch),`Invalid port identity/frame/epoch`);for(let t of[`com`,`position`,`velocity`,`omega`])ih(rh(e[t],3),`Invalid port `+t);ih(ah(e.normal)&&ah(e.up)&&Math.abs(i(e.normal,e.up))<1e-9,`Invalid face basis`),ih(Number.isFinite(e.radius)&&e.radius>0&&typeof e.available==`boolean`&&typeof e.enabled==`boolean`,`Invalid port hardware`)}function dh(e,s,l,{dt:u,power:d}={}){let f=(e,t={},n)=>({active:!1,reason:e,...n?{detail:n}:{},a:lh(),b:lh(),electrical:{aJ:0,bJ:0},metrics:t});try{uh(e),uh(s),ih(e.bodyId!==s.bodyId&&e.frameId===s.frameId&&e.epoch===s.epoch,`Ports need distinct bodies in one common frame/epoch`);for(let e of Object.keys(eh))ih(Number.isFinite(l?.[e])&&l[e]>=0,`Invalid parameter `+e);let p=l;if(ih(p.rangeM>0&&p.maxStepS>0&&p.normalConeRad<Math.PI/2&&p.rollConeRad<Math.PI/2,`Invalid range/cone/step`),ih(Number.isFinite(u)&&u>0,`Invalid dt`),d)for(let e of[`wattsPerPort`,`aAvailableJ`,`bAvailableJ`])ih(Number.isFinite(d[e])&&d[e]>=0,`Invalid power `+e);if(u>p.maxStepS)return f(`step-too-large`);if(!e.enabled||!s.enabled)return f(`disabled`);if(!e.available||!s.available)return f(`unavailable`);if(e.type!==s.type||Math.abs(e.radius-s.radius)>p.radiusToleranceM)return f(`incompatible`);let m=n(s.position,e.position),h=o(m),g=Math.acos(c(-i(e.normal,s.normal),-1,1)),_=Math.acos(c(i(e.up,s.up),-1,1)),v=i(m,e.normal),y=-i(m,s.normal),b=Math.max(o(n(m,r(e.normal,v))),o(t(m,r(s.normal,y)))),x=n(s.omega,e.omega),S=o(n(s.velocity,e.velocity))+Math.max(e.radius,s.radius)*o(x),C={distance:h,axialA:v,axialB:y,lateral:b,normalAngle:g,rollAngle:_,rimSpeed:S};if(h>=p.rangeM)return f(`out-of-range`,C);if(v<-p.penetrationSkinM||y<-p.penetrationSkinM)return f(`past-face`,C);if(g>p.normalConeRad||_>p.rollConeRad||b>p.lateralM)return f(`misaligned`,C);if(S>p.maxContactSpeedMps)return f(`too-fast`,C);let w=d?d.wattsPerPort*u:0,T=w>0?Math.min(1,d.aAvailableJ/w,d.bAvailableJ/w):1;if(T===0)return f(`unpowered`,C);let E=t(e.position,r(m,.5)),D=n(E,e.com),O=n(E,s.com),k=t(e.velocity,a(e.omega,n(E,e.position))),A=n(t(s.velocity,a(s.omega,n(E,s.position))),k),j=t(r(m,p.springNpm),r(A,p.dampingNspm)),M=t(t(r(a(e.normal,sh(s.normal)),p.normalSpringNm),r(a(e.up,s.up),p.rollSpringNm)),r(x,p.angularDampingNms)),N=(1-h/p.rangeM)**2*T,P=ch(j,p.maxForceN)*N,F=ch(M,p.maxCoupleNm)*N,I=r(j,P),ee=r(M,F),te=t(a(D,I),ee),ne=n(a(O,sh(I)),ee),re={active:!0,reason:`active`,a:{force:th(I),torque:th(te)},b:{force:sh(I),torque:th(ne)},point:th(E),couple:th(ee),electrical:{aJ:w*T,bJ:w*T},metrics:{...C,powerFraction:T,fieldFraction:N,dampingPowerW:-P*p.dampingNspm*i(A,A)-F*p.angularDampingNms*i(x,x)}};return ih([...re.a.force,...re.a.torque,...re.b.force,...re.b.torque,re.electrical.aJ,re.metrics.dampingPowerW].every(Number.isFinite),`Nonfinite wrench`),re}catch(e){return f(`invalid`,{},e.message)}}function fh(t,n){let r=t.phase+Math.sqrt(b.mu/t.radius**3)*n;return{...t,frameId:`aster`,epoch:n,...S(t.radius,r),q:p([0,1,0],r+Math.PI/2),omega:e(0,Math.sqrt(b.mu/t.radius**3),0)}}function ph(e){let{plan:t,navigation:n,guidance:r,contents:i,...a}=e,o={...a,r:new Float64Array(e.r),v:new Float64Array(e.v),q:new Float64Array(e.q),omega:new Float64Array(e.omega),burn:null,targetQ:null,visual:null};return i&&(o.contents=structuredClone(i),le(o)),o}function mh(t,n,r){let i=ph(t),a=ae(i.design,{fuel:i.fuel,cargoCount:i.cargoCount}),o=a.isp*x,c=a.mass*(1-Math.exp(-Math.abs(r)/o));if(!a.thrust||c>i.fuel)throw Error(`Insufficient propellant for this maneuver`);let l=c*o/a.thrust;return i.q=g(n),i.targetQ=i.q,i.omega=e(),rp(i,l,{main:1}),{state:i,duration:l,consumed:t.fuel-i.fuel,direction:[...s(n)],deltaV:Math.abs(r)}}function hh(e,i,a,{radialTrim:c=0,tangentialTrim:l=0}={}){if(e.docked)throw Error(`Undock before planning`);let u=o(e.r),d=k(u,i.radius+325),f=A(Math.atan2(-e.r[2],e.r[0]),i.phase+Math.sqrt(b.mu/i.radius**3)*a,u,i.radius);f<90&&(f+=2*Math.PI/Math.abs(Math.sqrt(b.mu/i.radius**3)-Math.sqrt(b.mu/u**3)));let p=a+f,m={...ph(e),...D(e,f)},h=s(m.r),g=s(m.v),_=d.departure,v=0;function y(e,a){let c=t(r(g,e),r(h,a)),l=mh(m,c,o(c)),u=p+d.time-l.duration/2-3,f=u-p-l.duration;if(f<90)throw Error(`Transfer is too short for attitude preparation`);let _={...ph(l.state),...D(l.state,f)},v=n(fh(i,u).v,_.v),y=mh(_,v,o(v));for(let e=0;e<2;e++){let e=n(fh(i,u+y.duration).v,y.state.v);v=t(v,e),y=mh(_,v,o(v))}let b=u+y.duration,x=fh(i,b),S=t(x.r,r(s(x.r),325)),C=n(y.state.r,S);return{first:l,second:y,arrivalStart:u,endTime:b,error:C,aim:S,station:x,pre:_}}let x=y(_,v);for(let e=0;e<7&&o(x.error)>1;e++){let e=.005,t=y(_+e,v),n=y(_,v+e),r=(t.error[0]-x.error[0])/e,i=(t.error[2]-x.error[2])/e,a=(n.error[0]-x.error[0])/e,o=(n.error[2]-x.error[2])/e,s=r*o-a*i;if(Math.abs(s)<1e-5)break;let c=(-x.error[0]*o+a*x.error[2])/s,l=(-r*x.error[2]+x.error[0]*i)/s;_+=Math.max(-10,Math.min(10,c)),v+=Math.max(-10,Math.min(10,l)),x=y(_,v)}(c||l)&&(x=y(_+l,v+c));let S={name:`Departure`,start:p,duration:x.first.duration,direction:x.first.direction,deltaV:x.first.deltaV,consumed:x.first.consumed},C={name:`Rendezvous`,start:x.arrivalStart,duration:x.second.duration,direction:x.second.direction,deltaV:x.second.deltaV,consumed:x.second.consumed};return{shipId:e.id,targetId:i.id,createdAt:a,nodes:[S,C],wait:f,endTime:x.endTime,consumed:S.consumed+C.consumed,missDistance:o(x.error),relativeSpeed:o(n(x.second.state.v,x.station.v)),arrivalRange:o(n(x.second.state.r,x.station.r)),final:x.second.state,departureState:m,afterDeparture:x.first.state,coastDuration:x.arrivalStart-p-x.first.duration,radialTrim:c,tangentialTrim:l}}var gh={surfaceAltitudeM:150,closeRangeM:90,skinM:.01,maxStepS:60,maxChecks:16384,maxControlSteps:512},_h=b.mu/b.radius**2;function vh(e,t,n){return 2*e/(t+Math.sqrt(t*t+2*n*e))}function yh(e,t,s=0,c=200){let l=o(e.r),u=b.radius+c,d=l-u;if(d<=0)return!0;if(s===0){let t=a(e.r,e.v);if(i(t,t)/b.mu/(1+o(n(r(a(e.v,t),1/b.mu),r(e.r,1/l))))>u+.01)return!1}return o(e.v)*t+.5*(_h+s)*t*t>=d}function bh(e,t,n=0){let r=o(e.r)-b.radius-200;return r<=.01?0:yh(e,t,n)?Math.min(t,.8*vh(r,o(e.v),_h+n)):t}function xh(e,t,r,a,{firstStep:s=!1,accelerations:c={}}={}){if(!Number.isFinite(r)||!Number.isFinite(a)||a<r)throw Error(`Warp interval must be finite and forward`);let l=e.filter(e=>!e.docked&&!e.landed);if(!l.length||a===r)return{time:a};let u=0,d={shipId:l[0].id,reason:`Warp check limit`};for(let e=0;e<gh.maxChecks;e++){let e=a-r-u;if(e<=0)return{time:a};let f=Math.min(gh.maxStepS,e),p=null,m=l.map(e=>({ship:e,state:D(e,u),extra:c[e.id]||0})),h=(e,t,n,r,i,a)=>{if(e<=gh.skinM&&n<=1e-6){p??={shipId:i,reason:a};return}let o=.8*(e<=gh.skinM?n/r:vh(e,t,r));o<f&&(f=o,d={shipId:i,reason:a})};for(let{ship:e,state:a,extra:s}of m){h(o(a.r)-b.radius-gh.surfaceAltitudeM,o(a.v),i(a.r,a.v)/o(a.r),_h+s,e.id,`Surface approach`);for(let c of t){let t=fh(c,r+u),l=n(a.r,t.r),d=n(a.v,t.v),f=o(l);h(f-gh.closeRangeM,o(d),i(l,d)/(f||1),_h+s+b.mu/c.radius**2,e.id,`Close approach`)}}for(let e=0;e<m.length;e++)for(let t=e+1;t<m.length;t++){let r=m[e],a=m[t],s=n(r.state.r,a.state.r),c=n(r.state.v,a.state.v),l=o(s);h(l-gh.closeRangeM,o(c),i(s,c)/(l||1),2*_h+r.extra+a.extra,r.ship.id,`Player ship close approach`)}if(p)return{time:r+u,...p};if(!(f>0)||r+u+f===r+u)return{time:r+u,...d};if(u+=f,s)return{time:Math.min(a,r+u)}}return{time:Math.min(a,r+u),shipId:d.shipId,reason:`Warp check limit`}}var Sh=Object.freeze({...eh,normalSpringNm:12e4,rollSpringNm:2e4,angularDampingNms:4e4,maxCoupleNm:3e3});function Ch(e,t,n){let r=df(e,lf);return{bodyId:e.id,frameId:e.frameId,epoch:e.epoch,com:e.r,position:r.r,velocity:r.v,omega:m(e.q,e.omega),normal:r.normal,up:r.up,type:lf.type,radius:.85,enabled:t,available:n}}var wh=e=>e&&!e.debris&&!e.docked&&!e.joinedId&&!e.landed&&e.design.parts.some(e=>e.port===`dock`);function Th(e){for(let t of e){if(!t.releasePartnerId)continue;let r=e.find(e=>e.id===t.releasePartnerId);r&&t.epoch>=(t.captureInhibitUntil||0)&&r.epoch>=(r.captureInhibitUntil||0)&&o(n(df(t,lf).r,df(r,lf).r))>.55&&(t.releasePartnerId=null,r.releasePartnerId=null)}}function Eh(e,t,n,r,i){let a=new Map,o=e.find(e=>e.id===t),s=e.find(e=>e.id===n);if(!wh(o)||!wh(s)||o===s)return a;let c=o.latchArmed===s.id||s.latchArmed===o.id,l=!o.releasePartnerId&&!s.releasePartnerId&&o.epoch>=(o.captureInhibitUntil||0)&&s.epoch>=(s.captureInhibitUntil||0)&&fp(o,s),u=e=>bh(e,i,(L(e).thrust+24e3+Sh.maxForceN)/(L(e).dryMass+L(e).cargoMass))>=i,d=dh(Ch(o,c,l&&u(o)),Ch(s,c,l&&u(s)),Sh,{dt:i,power:{wattsPerPort:500,aAvailableJ:$f(o,i,r.get(o.id)),bAvailableJ:$f(s,i,r.get(s.id))}});for(let[e,t]of[[o,`a`],[s,`b`]])a.set(e.id,{...d[t],joules:d.electrical[t+`J`],active:d.active,reason:o.releasePartnerId||s.releasePartnerId?`release-clearance`:d.reason,metrics:d.metrics});return a}function Dh(e){for(let t of e){if(t.captureInhibitUntil!==void 0&&(!Number.isFinite(t.captureInhibitUntil)||t.captureInhibitUntil<0))throw Error(`Invalid release delay`);if(t.releasePartnerId!==void 0&&t.releasePartnerId!==null&&typeof t.releasePartnerId!=`string`||t.releasePartnerId&&(!Number.isFinite(t.captureInhibitUntil)||!e.some(e=>e.id===t.releasePartnerId&&e.id!==t.id&&!e.debris&&e.releasePartnerId===t.id)||t.debris||t.joinedId||t.docked))throw Error(`Invalid release partner`)}}function Oh(e){let t=s(e.v),n=s(a(e.r,e.v));if(o(n)<.9)throw Error(`A radial fall has no defined orbital maneuver frame`);return{prograde:t,normal:n,radial:s(a(t,n))}}function kh(e){if(e?.version!==1||!Number.isFinite(e.start)||e.start<0||!e.components||![`prograde`,`radial`,`normal`].every(t=>Number.isFinite(e.components[t])&&Math.abs(e.components[t])<=2e3))throw Error(`Invalid maneuver node`)}function Ah(e){return JSON.stringify([e.design,e.contents,e.fuel,e.cargoCount,e.engineEnabled,e.engineSwitches,e.rcsEnabled,e.wheelsEnabled,e.rateDamping])}function jh(n,i,a){if(kh(a),n.docked||n.landed||n.joinedId||n.debris||n.burn||n.throttle>0)throw Error(`Maneuvers require an independent coasting ship`);if(a.start<i+60)throw Error(`Place ignition at least 60 seconds ahead for manual pointing`);let c=ph(n),l=a.start-i;if(xh([n],[],i,a.start).time<a.start)throw Error(`Coast reaches a surface warning before this node`);if(c.omega=e(),rp(c,l),o(c.r)<b.radius+200)throw Error(`Choose an orbital burn above the surface region`);let u=Oh(c),d=t(t(r(u.prograde,a.components.prograde),r(u.radial,a.components.radial)),r(u.normal,a.components.normal)),f=o(d),p=L(c),m=p.isp*x;if(f<.001)throw Error(`Set a nonzero maneuver component`);if(n.engineEnabled===!1||Object.values(n.engineSwitches||{}).some(e=>e===!1)||!p.thrust)throw Error(`Enable all engines before previewing a maneuver`);let h=p.mass*(1-Math.exp(-f/m)),_=h*m/p.thrust;if(h>n.fuel)throw Error(`Insufficient propellant for this maneuver`);if(_>600)throw Error(`This orbital editor supports burns up to 600 seconds`);let v=ph(c);v.q=g(d),v.omega=e(),v.targetQ=null;let y=[[...v.r]];for(let e=0;e<_-1e-10;){let t=Math.min(.05,_-e);if(ep(v,t,{main:1}),e+=t,o(v.r)<b.radius+200)throw Error(`Finite burn enters the surface region; use manual flight`);(y.length===1||e>=y.length*_/60)&&y.push([...v.r])}y.push([...v.r]);let S=T(v),C=Math.min(Number.isFinite(S.period)?S.period:21600,86400),w=[[...v.r]],E=xh([v],[],a.start+_,a.start+_+C).time-a.start-_,O=E<C;for(let e=1;e<=240;e++){let t=D(v,e/240*E);if(o(t.r)<b.radius+200){O=!0;break}w.push([...t.r])}let k={name:`Maneuver`,start:a.start,duration:_,direction:[...s(d)],deltaV:f,consumed:n.fuel-v.fuel,maneuver:structuredClone(a)};return{kind:`maneuver`,version:1,shipId:n.id,targetId:n.targetId||`outer`,createdAt:i,signature:Ah(n),nodes:[k],wait:l,endTime:a.start+_,consumed:k.consumed,final:v,departureState:c,afterDeparture:v,coastDuration:C,burnPath:y,coastPath:w,surfaceLimited:O}}function Mh(e,t,n){let r=e?[e.navigation?.draft,e.plan?.kind===`maneuver`?e.plan:null].filter(Boolean):[];if((r.length||e?.navigation||t?.data?.maneuver)&&n<7)throw Error(`Maneuver nodes require checkpoint version 7`);if(e?.navigation&&(e.navigation.version!==1||!e.navigation.draft))throw Error(`Invalid maneuver preview`);for(let t of r){let n=t.nodes?.[0],r=e=>e&&e.length===3&&Array.from(e).every(Number.isFinite);if(t.kind!==`maneuver`||t.version!==1||t.shipId!==e.id||t.nodes?.length!==1||!Number.isFinite(t.createdAt)||!Number.isFinite(t.consumed)||t.consumed<0||!r(t.departureState?.r)||!r(t.final?.r)||!r(t.final?.v)||!Number.isFinite(t.final?.fuel)||!Array.isArray(t.coastPath)||t.coastPath.length>241||!t.coastPath.every(r)||!Array.isArray(t.burnPath)||t.burnPath.length>100||!t.burnPath.every(r))throw Error(`Invalid maneuver forecast`);i(n)}t?.data?.maneuver&&i(t.data);function i(e){if(kh(e?.maneuver),e.start!==e.maneuver.start||!Number.isFinite(e.duration)||e.duration<=0||e.duration>600||!Number.isFinite(e.deltaV)||e.deltaV<=0||!e.direction||e.direction.length!==3||!e.direction.every(Number.isFinite)||Math.abs(o(e.direction)-1)>1e-6)throw Error(`Invalid maneuver burn`)}}function Nh(){return{...Object.fromEntries(im.map(e=>[e.id,{id:e.id,name:e.name,frameId:`aster`,kind:`surface`,exchange:Dm(e.id),...Om(),stock:{"refined-alloy":5e5,"conductive-metals":1e5,"industrial-ceramics":1e5,propellant:5e4}}])),...Object.fromEntries(ue.map(e=>[e.id,{...e,frameId:`aster`,kind:`station`,stock:{"refined-alloy":e.id===`assembly`?12e3:e.id===`inner`?3e3:0},exchange:Dm(e.id),...Om()}]))}}function Ph(e,t){let n=[M.core,...e.parts.map(e=>M[e.part]),...Object.entries(P).filter(([t])=>e.systems?.[t]!==!1).map(([,e])=>e),...(e.couplers||[]).map(()=>M.decoupler)],r={propellant:t};for(let e of n)for(let t of e.recipe.inputs)r[t.resourceId]=(r[t.resourceId]||0)+t.quantity;return r}function Fh(e,t){for(let[n,r]of Object.entries(t))if(!Number.isFinite(r)||r<0||(e.stock[n]||0)+1e-8<r)throw Error(`Insufficient local `+n+` at `+e.id);for(let[n,r]of Object.entries(t))e.stock[n]=(e.stock[n]||0)-r}function Ih(e){for(let t of ue){let n=e[t.id];if(!n||n.id!==t.id)throw Error(`Missing station venue`);Object.assign(n,{exchange:Dm(t.id),...Om()})}}var Lh=class{constructor(e=0){this.time=e,this.events=[],this.serial=0}schedule({id:e=`event-`+ ++this.serial,shipId:t,time:n,kind:r=`burn`,data:i=null,automatic:a=!1}){if(!Number.isFinite(n)||n<this.time-1e-8)throw Error(`Cannot schedule an event in the past`);if(this.events.some(t=>t.id===e))throw Error(`Duplicate event identity`);let o={id:e,shipId:t,time:n,kind:r,data:i,automatic:a,status:`pending`,order:this.serial++};return this.events.push(o),o}pending(){return this.events.filter(e=>e.status===`pending`).sort((e,t)=>e.time-t.time||e.order-t.order)}due(){return this.pending().filter(e=>e.time<=this.time+1e-8)}next(){return this.pending()[0]||null}resolve(e){let t=this.events.find(t=>t.id===e);if(!t||t.status!==`pending`)throw Error(`Event is not pending`);if(t.time>this.time+1e-8)throw Error(`Event has not arrived`);return t.status=`done`,t}cancelShip(e){for(let t of this.events)t.shipId===e&&t.status===`pending`&&(t.status=`cancelled`)}advanceTo(e,t){if(!Number.isFinite(e)||e<this.time-1e-8)throw Error(`Shared time cannot go backwards`);let n=this.next(),r=n?Math.min(e,n.time):e,i=Math.max(0,r-this.time);return i>0&&(t(i,this.time),this.time=r),{time:this.time,advanced:i,due:this.due()}}snapshot(){return{time:this.time,serial:this.serial,events:this.events.map(e=>({...e,data:e.data?structuredClone(e.data):null}))}}},Rh=(e,t)=>{if(!Number.isFinite(e))throw Error(`Invalid `+t);return e},zh=(e,t,n)=>{if(!Array.isArray(e)||e.length!==t||!e.every(Number.isFinite))throw Error(`Invalid `+n);return new Float64Array(e)};function Bh(e){let t={version:7,pumps:e.pumps,assemblies:e.assemblies,time:e.time,frameConfig:e.frameConfig,selectedId:e.selectedId,targetId:e.targetId,practice:e.practice,paused:e.paused,credits:e.credits,sites:e.sites,ledger:e.ledger,deliveries:e.deliveries,serial:e.serial,history:e.history,ships:e.ships,timeline:e.timeline.snapshot()};return JSON.stringify(t,(e,t)=>ArrayBuffer.isView(t)?[...t]:t)}function Vh(e,t){if(typeof e!=`string`||e.length>4e6)throw Error(`Checkpoint is too large`);let n=JSON.parse(e);if(![1,2,3,4,7].includes(n.version))throw Error(`Unsupported checkpoint version `+n.version+`; supported versions are 1–4 and 7`);if(!Array.isArray(n.ships)||!n.ships.length||n.ships.length>100)throw Error(`Unsupported checkpoint`);for(let e of[`ledger`,`history`,`deliveries`])if(!Array.isArray(n[e])||n[e].some(e=>!e||typeof e!=`object`||Array.isArray(e)))throw Error(`Invalid `+e+` container`);if(!Number.isSafeInteger(n.credits)||n.credits<0)throw Error(`Invalid credits`);if(Rh(n.time,`shared epoch`),n.time<0||n.timeline?.time!==n.time)throw Error(`Checkpoint clocks disagree`);let r=new Set,i=new Set,a=n.ships.map(e=>{let t={...e,r:zh(e.r,3,`position`),v:zh(e.v,3,`velocity`),q:zh(e.q,4,`orientation`),omega:zh(e.omega,3,`angular velocity`)};if(typeof t.id!=`string`||r.has(t.id)||t.frameId!==`aster`||t.epoch!==n.time)throw Error(`Invalid vessel identity, frame or epoch`);if(r.add(t.id),Math.abs(o(t.q)-1)>1e-6)throw Error(`Invalid normalized attitude`);if(Rh(t.fuel,`fuel`),Rh(t.cargoCount,`cargo`),Rh(t.energy,`electrical storage`),t.debris){if(![`tank`,`rack`].includes(t.module?.part)||t.design||t.docked)throw Error(`Invalid separated module`)}else{if(ne(t.design),!t.contents||Object.keys(t.contents).some(e=>!t.design.parts.some(t=>t.id===e)))throw Error(`Invalid module inventory references`);if(Object.keys(t.contents).length!==t.design.parts.length)throw Error(`Missing module contents`);for(let[e,n]of Object.entries(t.contents)){let r=M[t.design.parts.find(t=>t.id===e).part];if(!Number.isFinite(n.fuel)||n.fuel<0||n.fuel>(r.fuelCapacity||0)+1e-7||![0,1].includes(n.cargo)||n.cargo&&r.kind!==`rack`||n.unit!==`kg`||n.resourceId!==(r.kind===`rack`?`refined-alloy`:null))throw Error(`Invalid module contents`)}let e=t.fuel,n=t.cargoCount;if(le(t),Math.abs(t.fuel-e)>1e-7||t.cargoCount!==n)throw Error(`Aggregate inventory disagrees with physical modules`);if(!Number.isInteger(t.stageIndex)||t.stageIndex<0||t.stageIndex>(t.design.stages||[]).length)throw Error(`Invalid stage progress`);let r=(t.design.stages||[]).slice(0,t.stageIndex).map(e=>e.id);if(JSON.stringify(r)!==JSON.stringify(t.activatedStages||[]))throw Error(`Stage activation history disagrees`);if(t.docked){if(i.has(t.docked.stationId))throw Error(`Two vessels occupy one docking collar`);i.add(t.docked.stationId)}}Mh(t,null,n.version);let a=L(t);if(t.energy<0||t.energy>a.batteryCapacity+1e-6||t.fuel<0||t.fuel>a.fuelCapacity+1e-7)throw Error(`Resource exceeds installed capacity`);if(!Number.isFinite(t.throttle)||t.throttle<0||t.throttle>1)throw Error(`Invalid throttle`);if(n.version<4&&(t.suspension=t.debris?null:nm(),t.landed&&(t.landed=null,t.status=`Suspension settling`)),Sm(t),t.landed&&(t.docked||!im.some(e=>e.id===t.landed.siteId)||!Number.isFinite(t.landed.stableTime)||t.landed.stableTime<0||!dm(t,t.landed.siteId).stable))throw Error(`Invalid landed support state`);return t});if(!r.has(n.selectedId)||![`assembly`,`outer`,`inner`,...im.map(e=>e.id),...r].includes(n.targetId))throw Error(`Invalid selected vessel or destination`);let s=n.version>=3?n.assemblies:[];if(!Array.isArray(s)||s.length>50)throw Error(`Invalid assembly collection`);let c=new Set,l=new Set,u=new Set;for(let e of a)for(let t of e.debris?[e.module.id]:[e.design.coreId,...e.design.parts.map(e=>e.id),...(e.design.couplers||[]).map(e=>e.id)]){if(u.has(t))throw Error(`Duplicate physical part identity`);u.add(t)}for(let e of s){if(c.has(e.id))throw Error(`Duplicate assembly identity`);c.add(e.id),xp(e,a,n.time);for(let t of e.components){if(l.has(t.id))throw Error(`Vessel joined twice`);l.add(t.id)}}for(let e of a){if(e.targetId&&![`assembly`,`outer`,`inner`,...im.map(e=>e.id),...r].includes(e.targetId))throw Error(`Invalid vessel target`);if(e.docked&&(![`assembly`,`outer`,`inner`].includes(e.docked.stationId)||e.docked.portId!==`forward`))throw Error(`Invalid prescribed berth`);if(e.joinedId&&!l.has(e.id))throw Error(`Missing assembly`);if(e.engineSwitches&&Object.entries(e.engineSwitches).some(([t,n])=>typeof n!=`boolean`||!ap(e).some(e=>e.id===t)))throw Error(`Invalid engine switch`);if(e.latchArmed&&!a.some(t=>t.id===e.latchArmed&&t.id!==e.id&&!t.debris))throw Error(`Invalid latch target`)}Dh(a);let d=n.timeline.events;if(!Array.isArray(d)||d.length>1e4)throw Error(`Invalid timeline`);let f=new Set;for(let e of d){if(f.has(e.id)||typeof e.id!=`string`||![`pending`,`done`,`cancelled`].includes(e.status)||!Number.isFinite(e.time)||!Number.isInteger(e.order))throw Error(`Invalid event identity or order`);if(f.add(e.id),e.status===`pending`&&e.time<n.time-1e-8)throw Error(`Pending event is before the shared epoch`);if(!r.has(e.shipId)&&e.kind!==`delivery`)throw Error(`Event refers to absent vessel`);if(![`prepare`,`burn`,`burn-end`,`delivery`].includes(e.kind))throw Error(`Invalid event kind`);Mh(null,e,n.version),e.kind===`delivery`&&(ne(e.data.design,{flight:!0}),Rh(e.data.fuel,`launch fuel`))}let p=new Set;for(let e of n.deliveries){if(typeof e.id!=`string`||p.has(e.id)||![`launching`,`delivered`].includes(e.status)||!Number.isFinite(e.arrival)||!Number.isFinite(e.cost)||e.cost<0)throw Error(`Invalid delivery manifest`);p.add(e.id);let t=d.filter(t=>t.kind===`delivery`&&t.shipId===e.id);if(t.length!==1||t[0].data.id!==e.id||t[0].time<e.arrival||e.status===`launching`&&(t[0].status!==`pending`||r.has(e.id))||e.status===`delivered`&&(t[0].status!==`done`||!r.has(e.id)))throw Error(`Delivery manifest and event disagree`)}for(let e of d.filter(e=>e.kind===`delivery`))if(!p.has(e.shipId)||e.data.id!==e.shipId)throw Error(`Delivery refers to absent paid manifest`);if(!n.sites||!n.sites[`aster-surface-yard`])throw Error(`Missing physical sites`);for(let e of Object.values(n.sites))if(!e.stock||Object.values(e.stock).some(e=>!Number.isFinite(e)||e<0))throw Error(`Invalid site stock`);if(n.version===1){let e=Nh();for(let t of im)n.sites[t.id]?Object.assign(n.sites[t.id],{exchange:e[t.id].exchange,market:e[t.id].market,warehouse:e[t.id].warehouse}):n.sites[t.id]=e[t.id]}n.version<5&&Ih(n.sites);for(let e of Cm){if(!n.sites[e.id]||n.sites[e.id].id!==e.id)throw Error(`Missing exchange venue`);km(n.sites[e.id])}if(zh(n.frameConfig?.parentOffset,3,`parent frame offset`),!Number.isInteger(n.serial)||!Number.isInteger(n.timeline.serial))throw Error(`Invalid identity sequence`);let m=Object.create(t.prototype);return Object.assign(m,{timeline:new Lh(n.time),frameConfig:n.frameConfig,frames:of(n.frameConfig),ships:a,assemblies:s,pumps:n.version===7?n.pumps:[],selectedId:n.selectedId,targetId:n.targetId,practice:!!n.practice,paused:!0,credits:Rh(n.credits,`credits`),sites:n.sites,ledger:n.ledger||[],deliveries:n.deliveries||[],serial:n.serial,history:n.history||[],message:`Checkpoint restored`,plan:a.find(e=>e.id===n.selectedId).navigation?.draft||a.find(e=>e.id===n.selectedId).plan||null}),m.timeline.serial=n.timeline.serial,m.timeline.events=d,Dp(m),Ap(m,0),m}var Hh=23e4,Uh=275e3,Wh=205e3,Gh=[{id:`assembly`,name:`Kepler Assembly`,radius:Hh,phase:0},{id:`outer`,name:`Faraday Depot`,radius:Uh,phase:k(Hh,Uh).phase-(Math.sqrt(b.mu/Uh**3)-Math.sqrt(b.mu/Hh**3))*240},{id:`inner`,name:`Lagrange Foundry`,radius:Wh,phase:k(Hh,Wh).phase-.25}];function Kh(e,t={}){return Yf(e,t)||Jf(t)&&!e.burn&&(e.debris||e.rcsEnabled===!1&&e.wheelsEnabled===!1)}function qh(e,t={}){if(Kh(e,t))return 0;let n=L(e);return(n.thrust+12*n.rcsThrust)/(n.dryMass+n.cargoMass)}function Jh(e,t,n){let r=0;for(;r<t-1e-10;){let i=bh(e,t-r,qh(e,n));if(i===0)return bm(e,t-r,n);rp(e,i,n),r+=i}return null}var Yh=class i{constructor({practice:i=!1,surfacePractice:a=!1,joinedPractice:o=!1}={}){this.timeline=new Lh,this.frames=of(),this.frameConfig={parentOffset:[0x6f05b59d3b200000,-0x29a2241af62c0000,0x4563918244f40000]},this.ships=[],this.assemblies=[],this.pumps=[],this.selectedId=`ship-01`,this.targetId=i?`assembly`:`outer`,this.practice=i,this.paused=!1,this.message=``,this.history=[],this.credits=18e4,this.sites=Nh(),this.ledger=[],this.deliveries=[],this.serial=1,this.plan=null;let c=te();if(this.addShip(c,800,`ship-01`),this.selected.targetId=this.targetId,i){this.selected.engineEnabled=!0;let n=this.selected,i=this.station(`assembly`);n.docked=null,n.r=t(n.r,r(s(i.r),65)),n.v=t(n.v,r(s(i.r),-.04)),n.captureInhibitUntil=0,n.q=f(n.q,f(p([0,1,0],.28),p([1,0,0],-.15))),n.omega=e(),this.message=`Docking practice · approach speed below 0.45 m/s`}else this.message=`Engine dormant · Space activates it · click the collar to undock`;if(a){let n=this.selected;n.engineEnabled=!0,this.practice=!0,this.targetId=n.targetId=am.id,n.docked=null,n.q=g([1,0,0],[0,1,0]),n.omega=e(),n.r=t(om().r,m(n.q,t(L(n).com,[0,0,-13.8]))),n.v=e(-.35,0,0),n.captureInhibitUntil=0,n.status=`descending`,this.message=`Surface descent practice · control thrust, then settle on the four support feet`}if(o){let r=this.selected;r.docked=null,r.r=e(24e4,0,0),r.v=S(24e4,0).v,r.q=u(),r.omega=e();let i=this.addShip(te(),800);r.engineEnabled=i.engineEnabled=!0,i.docked=null,i.q=p([0,1,0],Math.PI),i.omega=e();let a=df(r,{position:[0,0,-7.95],normal:[0,0,-1]}).r;i.r=t(t(a,[0,0,-3]),m(i.q,n(L(i).com,[0,0,-7.95]))),i.v=e(...r.v),r.latchArmed=i.id,r.targetId=i.id,i.targetId=r.id,this.targetId=i.id,this.practice=!0,this.message=`Docking enabled · use translation to approach · click a joined collar to undock`}}get time(){return this.timeline.time}get selected(){return this.ships.find(e=>e.id===this.selectedId)}station(e,t=this.time){return this.ships.find(t=>t.id===e)||(im.some(t=>t.id===e)?om(t,e):fh(Gh.find(t=>t.id===e),t))}addShip(t,n,r=`ship-`+String(++this.serial).padStart(2,`0`)){if(ne(t,{flight:!0,stages:!0}),this.ships.some(e=>e.id===r))throw Error(`Physical vessel identity already exists`);if(this.ships.some(e=>e.docked?.stationId===`assembly`))throw Error(`The assembly berth is occupied`);let i=structuredClone(t);i.coreId=r+`/`+i.coreId,i.parts=i.parts.map(e=>({...e,id:r+`/`+e.id})),i.couplers=(i.couplers||[]).map(e=>({...e,id:r+`/`+e.id})),i.stages=(i.stages||[]).map(e=>({...e,id:r+`/`+e.id,actions:e.actions.map(e=>({...e,partId:r+`/`+e.partId}))}));let a=this.station(`assembly`),o={id:r,name:t.name,design:i,fuel:n,cargoCount:0,r:e(),v:e(),q:u(),omega:e(),docked:{stationId:`assembly`,portId:`forward`},targetQ:null,burn:null,visual:{main:0,jets:{}},status:`docked`,damage:0,targetId:`outer`,frameId:`aster`,epoch:this.time,throttle:0,engineEnabled:!1,rcsEnabled:!0,wheelsEnabled:!0,rateDamping:!0,suspension:nm(),stageIndex:0,activatedStages:[]};return ce(o),o.energy=L(o).batteryCapacity,pf(o,a),this.ships.push(o),o}record(e,t){this.history.push({time:this.time,type:e,...t}),this.history.length>100&&this.history.shift()}occupied(e,t){return this.ships.find(n=>n.id!==t&&n.docked?.stationId===e)?.id||null}select(e){if(!this.ships.some(t=>t.id===e))throw Error(`Unknown ship`);this.selectedId=e,this.targetId=this.selected.targetId||`outer`,this.plan=this.selected.navigation?.draft||this.selected.plan||null}loadCargo(e){let t=this.selected;if(!t.docked)throw Error(`Cargo is exchanged only at the docked site`);ae(t.design,{fuel:t.fuel,cargoCount:e});let n=this.sites[t.docked.stationId],r=(e-t.cargoCount)*1e3;r>0?Fh(n,{"refined-alloy":r}):n.stock[`refined-alloy`]=(n.stock[`refined-alloy`]||0)-r,t.cargoCount=e,pf(t,this.station(t.docked.stationId)),this.record(`cargo`,{shipId:t.id,count:e,siteId:n.id,resourceId:`refined-alloy`,quantityKg:Math.abs(r)}),this.message=e+` t`}unload(){if(!this.selected.docked)throw Error(`Dock at a site before transferring cargo`);this.loadCargo(0)}release(e=this.selectedId){let t=this.ships.find(t=>t.id===e);if(!t)throw Error(`Unknown ship`);if(t.joinedId){let e=this.assemblies.find(e=>e.id===t.joinedId);vp(e,this.ships);for(let t of e.components){let n=this.ships.find(e=>e.id===t.id),r=e.components.find(e=>e.id!==t.id);n.releasePartnerId=r.id,n.latchArmed=r.id}this.assemblies=this.assemblies.filter(t=>t!==e),Ap(this,0),this.record(`ship-undock`,{ships:e.components.map(e=>e.id)}),this.message=`Joint opened · separate with translation thrusters`;return}if(!t.docked)throw Error(`Ship is already in free flight`);let n=t.docked.stationId;hf(t,this.station(n),this.time),t.targetQ=null,t.status=`coasting`,this.message=`Released · momentum persists when thrust stops`,this.record(`undock`,{shipId:t.id,stationId:n})}docking(){let e=this.selected,t=this.station(this.targetId);if(this.ships.includes(t)){let n=!e.releasePartnerId&&!t.releasePartnerId&&(e.latchArmed===t.id||t.latchArmed===e.id);return{...mp(e,t),latchEnabled:n,magnet:e.magnet,status:e.joinedId&&e.joinedId===t.joinedId?`joined`:n?`latch armed`:mp(e,t).status}}if(im.some(e=>e.id===this.targetId)){let n=dm(e,this.targetId);return{...n,alignment:n.tilt,roll:0,status:n.settled?`landed`:`surface approach`,shipPort:{r:e.r,v:e.v},depotPort:{r:t.r,v:t.v},surface:!0}}return e.debris?{range:o(n(e.r,t.r)),speed:o(n(e.v,t.v)),alignment:0,roll:0,status:`incompatible`,shipPort:{r:e.r,v:e.v},depotPort:{r:t.r,v:t.v}}:ff(e,t,{time:this.time,occupiedBy:this.occupied(t.id,e.id)})}trade(e){return Fm(this,e)}storeCargo(e){return Im(this,e)}sellStored(e){return Lm(this,e)}tryDock(){let e=this.selected;if(e.joinedId)return this.release(),{status:`released`};if(this.ships.some(e=>e.id===this.targetId)){let t=this.station(this.targetId);if(e===t||e.docked||t.docked||t.joinedId||e.landed||t.landed||e.debris||t.debris)throw Error(`Choose two independent free-flight ships`);let n=e.latchArmed===t.id||t.latchArmed===e.id;return n?(e.latchArmed===t.id&&(e.latchArmed=null),t.latchArmed===e.id&&(t.latchArmed=null)):e.latchArmed=t.id,this.message=n?`Docking disabled`:`Docking enabled · bring the faces into contact`,this.resolveShipContacts(),this.docking()}if(im.some(e=>e.id===this.targetId))throw Error(`Land on the support feet; the pad has no capture collar`);if(e.debris)throw Error(`Separated module has no docking collar`);let t=this.station(this.targetId),n=mf(e,t,{time:this.time,occupiedBy:this.occupied(t.id,e.id)});return n.status===`capture`?(e.burn=null,e.targetQ=null,e.dockAssist=!1,e.plan=null,e.navigation=null,e.guidance=null,this.plan=null,this.timeline.cancelShip(e.id),e.status=`docked`,this.message=`Docking collar captured · `+t.name,this.record(`dock`,{shipId:e.id,stationId:t.id})):this.message=n.status===`approach`?`Close the port gap to 0.65 m`:n.status===`too-fast`?`Relative speed must be below 0.45 m/s`:n.status===`misaligned`?`Align the two docking collars`:n.status,n}align(){throw Error(`Attitude is controlled manually`)}makePlan(e={}){if(this.pumps.some(e=>e.enabled))throw Error(`Stop pumps before forecasting`);let t=this.selected;if(t.joinedId||this.ships.some(e=>e.id===this.targetId)||ap(t).some(e=>!e.enabled))throw Error(`Transfer forecasts currently require one independent ship with all engines enabled`);if(im.some(e=>e.id===this.targetId)||t.landed)throw Error(`Surface flight uses manual thrust; depot transfer planning requires orbit`);if(t.debris)throw Error(`Separated module has no propulsion`);if(t.burn)throw Error(`Finish the active burn first`);let n=hh(t,Gh.find(e=>e.id===this.targetId),this.time,e);return t.navigation=null,this.plan=n,n}makeManeuver(e){if(this.pumps.some(e=>e.enabled))throw Error(`Stop pumps before forecasting`);let t=this.selected;if(t.burn)throw Error(`Finish or cancel the active burn before editing`);this.timeline.cancelShip(t.id),t.plan=null,t.guidance=null,this.plan=null,t.navigation=null;let n=jh(t,this.time,e);return t.navigation={version:1,draft:n},this.plan=n,this.message=`Maneuver preview · time paused`,n}commitPlan(){let e=this.selected,t=this.plan;if(!t||t.shipId!==e.id)throw Error(`Preview a transfer first`);if(Math.abs(t.createdAt-this.time)>.5)throw Error(`The orbit has advanced; preview again`);if(t.nodes.some(e=>e.start-60<this.time-1e-8))throw Error(`The pointing window has passed; move the node and preview again`);if(t.kind===`maneuver`&&t.signature!==Ah(e))throw Error(`Ship resources or hardware changed; preview again`);this.timeline.cancelShip(e.id),e.plan=t,e.navigation=null,e.dockAssist=!1;for(let[n,r]of t.nodes.entries())this.timeline.schedule({shipId:e.id,time:r.start-60,kind:`prepare`,automatic:!0,data:{...r,index:n,targetId:t.targetId}}),this.timeline.schedule({shipId:e.id,time:r.start,kind:`burn`,data:{...r,index:n,targetId:t.targetId}});this.record(`plan`,{shipId:e.id,targetId:t.targetId,fuel:t.consumed}),this.message=t.kind===`maneuver`?`Maneuver committed · warp to its manual pointing window`:`Two finite burns scheduled on world time`}execute(){let e=this.timeline.due().filter(e=>e.kind===`burn`).find(e=>e.shipId===this.selectedId);if(!e)throw Error(`No burn is due for this ship`);let t=this.selected,n=e.data;if(ap(t).some(e=>!e.enabled))throw Error(`Enable all engines before executing this planned burn`);if(o(y(t.q,g(n.direction)))>.015)throw Error(`Attitude is not aligned; cancel and replan this burn`);t.burn={throttle:1,startMass:L(t).mass,consumed:0,achieved:0,node:n},t.dockAssist=!1,this.timeline.resolve(e.id),this.timeline.schedule({shipId:t.id,time:this.time+n.duration,kind:`burn-end`,automatic:!0,data:n}),this.paused=!1,this.record(`ignition`,{shipId:t.id,name:n.name}),this.message=n.name+` burn · automatic cutoff at planned impulse`}cancel(){let e=this.selected;this.timeline.cancelShip(e.id),e.burn=null,e.plan=null,e.navigation=null,e.guidance=null,e.targetQ=null,e.dockAssist=!1,this.plan=null,this.message=`Maneuvers cancelled; present position and momentum retained`}automatic(){for(let e of this.timeline.due().filter(e=>e.automatic)){let t=this.ships.find(t=>t.id===e.shipId);if(e.kind===`prepare`)t.targetQ=null,t.dockAssist=!1,t.guidance=e.data,this.select(t.id),this.targetId=e.data.targetId,this.message=`Preparing `+t.name+` · `+e.data.name;else if(e.kind===`burn-end`){let n=t.burn;t.burn=null,t.visual={main:0,jets:{}},this.record(`cutoff`,{shipId:t.id,fuel:n?.consumed||0,name:e.data.name}),e.data.maneuver?(t.plan=null,t.navigation=null,t.guidance=null,t.targetQ=null,t.id===this.selectedId&&(this.plan=null),this.message=`Maneuver complete · coast or plan the next burn`):e.data.index===1?(this.targetId=e.data.targetId,t.targetId=e.data.targetId,t.dockAssist=!1,t.targetQ=null,t.guidance=null,this.message=`Rendezvous burn complete · close the remaining gap with translation thrusters`):this.message=`Coasting · the next burn is ready to warp to`}else if(e.kind===`delivery`){let t=this.deliveries.find(t=>t.id===e.data.id);if(!t||t.status!==`launching`||this.ships.some(t=>t.id===e.data.id))throw Error(`Delivery manifest is not an unfulfilled unique vessel`);if(this.occupied(`assembly`)){e.time=this.time+60,this.message=`Launch delivery holding for the assembly berth`;continue}this.addShip(e.data.design,e.data.fuel,e.data.id);let n=this.deliveries.find(t=>t.id===e.data.id);n.status=`delivered`,this.record(`launch-arrival`,{shipId:e.data.id}),this.message=`New ship delivered to Kepler Assembly`}this.timeline.resolve(e.id)}}propagateStep(n,r={},i=this.time+n){Th(this.ships);for(let e of this.ships)e.magnet=null;let a=new Map(this.ships.map(t=>{let n=t.id===this.selectedId?r:{};return t.burn&&(n.takeover||o(n.rotation||e())||o(n.translation||e()))&&this.takeover(t),[t.id,{...n,main:n.main??t.throttle??0}]})),s=Eh(this.ships,this.selectedId,this.targetId,a,n);for(let e of this.assemblies)bp(e,this.ships,n,this.selectedId,r);for(let c of this.ships){if(c.joinedId){c.epoch=i;continue}if(c.docked){pf(c,this.station(c.docked.stationId,i)),c.epoch=i;continue}let l=c.id===this.selectedId?r:{},u=a.get(c.id),d=s.get(c.id);c.magnet=d?{active:d.active,reason:d.reason,draw:d.joules/n,powerFraction:d.metrics.powerFraction||0}:null,d?.active&&(u.externalForce=t(u.externalForce||e(),d.force),u.externalTorqueWorld=d.torque,u.magneticJ=d.joules,(c.plan||c.navigation||c.burn)&&(u.main=c.burn?.throttle??u.main,this.takeover(c),this.message=`Magnetic contact changed the trajectory · planned burns cancelled`)),c.burn&&(l.takeover||o(l.rotation||e())||o(l.translation||e()))&&(this.takeover(c),u.main=l.main??c.throttle??0),(c.plan||c.navigation)&&!c.burn&&(u.main||o(u.translation||e()))&&(this.timeline.cancelShip(c.id),c.plan=null,c.navigation=null,c.guidance=null,c.targetQ=null,c.id===this.selectedId&&(this.plan=null),this.message=`Manual thrust changed the orbit; preview a new transfer`),o(u.rotation||e())>0&&(c.targetQ=null,c.dockAssist=!1),c.status=c.burn?`burning`:`coasting`;let f=Jh(c,n,u);if(c.epoch=i,f===`impact`&&(c.status=`surface impact`,c.damage=1,this.paused=!0,this.message=`Surface impact · load a checkpoint or start a new session`),!c.debris)for(let e of Gh){let t=ff(c,this.station(e.id,i),{time:i,occupiedBy:this.occupied(e.id,c.id)});if([`impact`,`misaligned`,`too-fast`].includes(t.status)){let e=gf(c,t);e===`damage`&&(c.damage=Math.min(1,c.damage+.25)),this.record(`contact`,{shipId:c.id,outcome:e,speed:t.speed}),this.message=e===`damage`?`Hard contact · reduce relative speed before approaching`:`Docking collar did not capture`}}}}setEngineGroup(e,t){let n=this.ships.find(t=>t.id===e),r=n&&ap(n)[0];if(!r||typeof t!=`boolean`)throw Error(`Unknown engine group`);n.engineEnabled=t,this.setEngine(e,r.id,n.engineSwitches?.[r.id]!==!1)}setEngine(e,t,n){let r=this.ships.find(t=>t.id===e);if(!r||typeof n!=`boolean`||!ap(r).some(e=>e.id===t))throw Error(`Unknown engine`);if(r.engineSwitches={...r.engineSwitches,[t]:n},this.takeover(r),r.joinedId)for(let e of this.assemblies.find(e=>e.id===r.joinedId).components){let t=this.ships.find(t=>t.id===e.id);this.takeover(t),e.engines.forEach(e=>e.enabled=ap(t).find(t=>t.id===e.id).enabled)}this.message=`Engine switch updated`}resolveShipContacts(){for(let e=0;e<this.ships.length;e++)for(let t=e+1;t<this.ships.length;t++){let n=this.ships[e],r=this.ships[t];if(n.debris||r.debris||n.docked||r.docked||n.joinedId||r.joinedId||n.landed||r.landed)continue;let i=mp(n,r);if(i.rim=pp(n,r),i.ok&&!n.releasePartnerId&&!r.releasePartnerId&&(n.latchArmed===r.id||r.latchArmed===n.id)&&n.epoch>=(n.captureInhibitUntil||0)&&r.epoch>=(r.captureInhibitUntil||0)){let e=gp(n,r,`assembly/`+n.id+`/`+r.id);for(let e of[n,r])this.takeover(e),e.latchArmed=null,e.magnet=null,e.throttle=0;this.assemblies.push(e),_p(e,this.ships),this.record(`ship-join`,{ships:[n.id,r.id],faceGap:i.faceGap,speed:i.speed}),this.message=`Faces joined · click the docking collar to undock · click engines for controls`}else if(i.range<1.8&&i.rim.overlap&&i.rim.closing>0&&i.rim.gap<=.001&&i.rim.gap>=-.02&&hp(n,r,i)){i.speed>.2&&(n.damage=Math.min(1,n.damage+.25),r.damage=Math.min(1,r.damage+.25));let e=n.latchArmed===r.id||r.latchArmed===n.id;this.message=i.ok&&!e?`Collars touching · docking is disabled`:i.ok?`Latch release delay · separate with translation`:i.reason===`misaligned`?`Collar contact · align the two faces`:i.reason===`too-fast`?`Collar contact · reduce relative speed`:i.reason===`separated`?`Collar contact · centre the two faces`:`Collar contact · hull clearance required`,this.record(`ship-contact`,{ships:[n.id,r.id],reason:i.reason,speed:i.speed})}}}propagate(e,t={}){let r=0;for(;r<e-1e-10;){let i=this.assemblies.length||this.pumps.some(e=>e.enabled)?Math.min(Sp,e-r):e-r;for(let e=0;e<this.ships.length;e++)for(let t=e+1;t<this.ships.length;t++){let r=this.ships[e],a=this.ships[t];if(r.debris||a.debris||r.docked||a.docked||r.joinedId||a.joinedId||o(n(r.r,a.r))>40)continue;i=Math.min(i,.02);let s=mp(r,a),c=pp(r,a);s.range<2&&c.overlap&&c.closing>0&&c.gap>0&&(i=Math.min(i,Math.max(5e-5,.7*c.gap/c.closing)))}this.propagateStep(i,t,this.time+r+i),this.pumps.some(e=>e.enabled)&&Ap(this,i),r+=i,this.resolveShipContacts()}for(let t of this.assemblies)t.epoch=this.time+e,_p(t,this.ships)}tick(e,t={}){if(this.paused)return;this.automatic();let n=this.timeline.advanceTo(this.time+e,e=>this.propagate(e,t));this.automatic();let r=this.timeline.due().find(e=>e.kind===`burn`);return r&&(this.select(r.shipId),this.targetId=r.data.targetId,this.message=r.data.name+` burn ready · execute when ready`),n}settleWarpControls(e){for(let t=0;t<gh.maxControlSteps;t++){let t=this.ships.filter(e=>!e.docked&&!e.landed);if(t.every(e=>Kh(e))||e.time<=this.time+1e-8)return!0;let n=xh(this.ships,Gh,this.time,Math.min(e.time,this.time+.05),{firstStep:!0,accelerations:Object.fromEntries(t.map(e=>[e.id,qh(e)]))});if(this.timeline.advanceTo(n.time,e=>this.propagate(e)),n.reason)return this.select(n.shipId),this.message=n.reason+` · 1×`,!1;if(this.paused)return!1}return this.message=`Rotation settling · 1×`,!1}startPump(e,t,n){return jp(this,e,t,n)}stopPump(e){return Mp(this,e)}nextBurn(){if(this.pumps.some(e=>e.enabled))throw Error(`Stop pumps before time warp`);if(this.assemblies.length)throw Error(`Time warp is unavailable while player ships are joined`);if(this.ships.some(e=>e.burn))throw Error(`Time warp is unavailable during finite thrust`);if(this.ships.some(e=>e.throttle>0))throw Error(`Cut main throttle before warping`);let e=this.timeline.next();if(!e)throw Error(`No maneuver is scheduled`);this.paused=!1;for(let t=0;t<5&&e;t++){if(!this.settleWarpControls(e))return;let t=xh(this.ships,Gh,this.time,e.time);if(t.reason){this.timeline.advanceTo(t.time,e=>this.propagate(e)),this.select(t.shipId),this.message=t.reason+` · 1×`;return}let n=e.kind===`prepare`;if(this.timeline.advanceTo(e.time,e=>this.propagate(e)),this.automatic(),n)return;let r=this.timeline.due().find(e=>!e.automatic);if(r){this.select(r.shipId),this.targetId=r.data.targetId,this.message=r.data.name+` ready on `+this.selected.name;return}e=this.timeline.next()}}orderShip(e,t){ne(e,{flight:!0,stages:!0});let n=ae(e,{fuel:t}),r=Math.ceil(n.cost+t*12+n.mass*5),i=`ship-`+String(this.serial+1).padStart(2,`0`);if(this.ships.some(e=>e.id===i)||this.deliveries.some(e=>e.id===i))throw Error(`Physical vessel identity already exists`);if(this.credits<r)throw Error(`Insufficient capital for parts, propellant and launch`);let a=Ph(e,t);Fh(this.sites[`aster-surface-yard`],a),this.serial++,this.credits-=r,this.ledger.push({time:this.time,amount:-r,label:`Ship parts, propellant and launch`});let o={id:i,cost:r,mass:n.mass,sourceSiteId:`aster-surface-yard`,destinationSiteId:`assembly`,requirements:a,units:`kg`,arrival:this.time+600,status:`launching`};return this.deliveries.push(o),this.timeline.schedule({shipId:i,time:o.arrival,kind:`delivery`,automatic:!0,data:{id:i,design:structuredClone(e),fuel:t}}),this.message=`Paid launch booked · delivery in 10 simulated minutes`,o}takeover(e=this.selected){this.timeline.cancelShip(e.id),e.burn=null,e.plan=null,e.navigation=null,e.guidance=null,e.targetQ=null,e.id===this.selectedId&&(this.plan=null),this.record(`manual-takeover`,{shipId:e.id})}cutoff(){let e=this.selected;e.throttle=0,this.takeover(e),this.message=`Throttle 0%`}stage(){let e=this.selected;if(e.joinedId)throw Error(`Open the ship joint before staging this initial component adapter`);let t=Hp(e);if(e.docked&&t.splits.length)throw Error(`Undock before separating hardware`);let n=!!e.burn||!!e.plan||this.timeline.pending().some(t=>t.shipId===e.id&&t.kind===`burn`),r=Up(e);this.timeline.cancelShip(e.id),this.plan=null,e.navigation=null,e.guidance=null,e.landed=null;for(let t of r.children)t.targetId=e.targetId,t.throttle=0,t.engineEnabled=!1,t.rcsEnabled=!1,t.wheelsEnabled=!1,t.rateDamping=!1,t.energy=0,this.ships.push(t);return Ap(this,0),this.record(`stage`,{shipId:e.id,group:t.id,children:r.children.map(e=>e.id)}),this.message=`Stage `+e.stageIndex+(n?` · planned burn cancelled`:``),r}save(){return Bh(this)}static restore(e){return Vh(e,i)}snapshot(){return{pumps:structuredClone(this.pumps),assemblies:structuredClone(this.assemblies),time:this.time,practice:this.practice,paused:this.paused,selectedId:this.selectedId,targetId:this.targetId,credits:this.credits,message:this.message,ships:this.ships.map(e=>({id:e.id,name:e.name,r:[...e.r],v:[...e.v],q:[...e.q],omega:[...e.omega],fuel:e.fuel,cargoCount:e.cargoCount,contents:e.contents,energy:e.energy,electrical:e.electrical,throttle:e.throttle,engineEnabled:e.engineEnabled,engineSwitches:e.engineSwitches,joinedId:e.joinedId,latchArmed:e.latchArmed,releasePartnerId:e.releasePartnerId,magnet:e.magnet,rcsEnabled:e.rcsEnabled,wheelsEnabled:e.wheelsEnabled,rateDamping:e.rateDamping,stageIndex:e.stageIndex,debris:!!e.debris,frameId:e.frameId,epoch:e.epoch,design:e.design,module:e.module,docked:e.docked,status:e.status,damage:e.damage,landed:e.landed||null,suspension:e.suspension||null,burn:e.burn?{consumed:e.burn.consumed,achieved:e.burn.achieved}:null,stats:L(e)})),events:this.timeline.pending(),history:this.history,deliveries:this.deliveries,ledger:this.ledger,sites:this.sites}}};function Xh(){let e,t,n,r,i=!0;return{async unlock(){if(!e){e=new AudioContext,t=e.createGain(),t.gain.value=0,t.connect(e.destination),n=e.createOscillator(),n.type=`sawtooth`,n.frequency.value=44;let i=e.createBiquadFilter();i.type=`lowpass`,i.frequency.value=180,r=e.createGain(),r.gain.value=0,n.connect(i).connect(r).connect(t),n.start()}await e.resume(),i=!1,t.gain.setTargetAtTime(.16,e.currentTime,.03)},toggle(){if(!e)return this.unlock();i=!i,t.gain.setTargetAtTime(i?0:.16,e.currentTime,.03)},get muted(){return i},update(t=0,i=0){e&&(r.gain.setTargetAtTime(t*.17+i*.04,e.currentTime,.07),n.frequency.setTargetAtTime(44+t*16+i*28,e.currentTime,.08))},event(n){if(!e||i)return;let r=e.createOscillator(),a=e.createGain(),o=e.currentTime;r.type=n===`dock`?`triangle`:`sine`,r.frequency.setValueAtTime(n===`dock`?170:500,o),r.frequency.exponentialRampToValueAtTime(n===`dock`?70:330,o+.12),a.gain.setValueAtTime(.1,o),a.gain.exponentialRampToValueAtTime(1e-4,o+.22),r.connect(a).connect(t),r.start(),r.stop(o+.24)}}}var Q=e=>document.querySelector(e),Zh=Q(`#scene`),Qh=new qd({canvas:Zh,antialias:!0,logarithmicDepthBuffer:!0,powerPreference:`high-performance`});Qh.setClearColor(198155),Qh.outputColorSpace=Nt,Qh.toneMapping=4,Qh.toneMappingExposure=1.05,Qh.shadowMap.enabled=!0,Qh.shadowMap.type=2;var $h=new kr,eg=new nc(48,innerWidth/innerHeight,.08,2e6),tg=new el(Qh),ng=new Hm;$h.environment=tg.fromScene(ng,.04).texture,$h.environmentIntensity=.16,ng.dispose(),tg.dispose();var rg=new sc(16773080,3.4);rg.castShadow=!0,rg.shadow.mapSize.set(2048,2048),rg.shadow.camera.left=-55,rg.shadow.camera.right=55,rg.shadow.camera.top=55,rg.shadow.camera.bottom=-55,rg.shadow.camera.near=1,rg.shadow.camera.far=220,rg.shadow.normalBias=.025,rg.shadow.bias=-6e-5,$h.add(rg,rg.target,new Ws(9222365,329741,.2));var ig=$m({bodyRadius:b.radius,starRadius:1e6});$h.add(ig.group);var ag=new xr,og=new xr,sg=new xr;$h.add(ag,og,sg);var cg=new Map,lg=new Map,ug=new Map,dg=new xr;sg.add(dg);var fg=[],pg=null,mg=te(),hg,gg=`flight`,$=new Yh,_g=!1,vg=.95,yg=.28,bg=48,xg=26,Sg=.35,Cg=.75,wg=880,Tg=null,Eg=0,Dg=performance.now(),Og=performance.now(),kg=0,Ag=0,jg=0,Mg=``,Ng=0,Pg=0,Fg=!0,Ig=`High`,Lg=!1,Rg=null,zg=`chase`,Bg=null,Vg=null,Hg=null,Ug=0,Wg=!1,Gg=null,Kg=new xr;$h.add(Kg);var qg=Xh(),Jg=new Set,Yg=new Map,Xg=new Tc,Zg=[...Gh,...im],Qg=new Map;for(let e of im){let t=Vm({id:e.id});ag.add(t.group),i_(t.group);let n=new Ki(new za(220,64),new Cs({color:5724503,roughness:1}));n.rotation.x=-Math.PI/2,n.position.y=-1,t.group.add(n),Qg.set(e.id,t);let r=document.createElement(`div`);r.className=`object-label`,r.textContent=e.name,Q(`#labels`).append(r),ug.set(e.id,r)}var $g=new Map;for(let e of Gh){let t=Qm({name:e.name}),n=Jd();t.group.add(n.group);let r=document.createElement(`div`);r.className=`object-label service-label`,r.textContent=`SERVICE · G`,Q(`#labels`).append(r),$g.set(e.id,{...n,label:r}),ag.add(t.group),lg.set(e.id,t);let i=document.createElement(`div`);i.className=`object-label`,i.textContent=e.name,Q(`#labels`).append(i),ug.set(e.id,i)}function e_(e){let t=Math.max(0,Math.floor(e));return[Math.floor(t/3600),Math.floor(t/60)%60,t%60].map(e=>String(e).padStart(2,`0`)).join(`:`)}function t_(e,t){return`<div><strong>${t}</strong><small>${e}</small></div>`}function n_(e){$.message=e,Mg=e,Q(`#toast`).textContent=e,jg=performance.now()+6500,Q(`#toast`).style.opacity=1}function r_(e){try{qg.event(`click`),e(),n_($.message),Fg=!0,R_()}catch(e){n_(e.message)}}function i_(e){e.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)})}function a_(e){return e.debris?e.module.id+`:`+e.cargoCount:JSON.stringify([e.design.parts.map(e=>e.id),e.design.systems,e.design.couplers])}function o_(e){let t=L(e),n=e.debris?Zm({kind:e.module.part===`rack`?`cargo`:`tank`,cargoLoaded:e.cargoCount>0}):Ym({layout:t.layout,engineCount:t.engineCount,docking:e.design.parts.some(e=>e.port===`dock`),rcs:e.design.systems?.rcs!==!1,wheel:e.design.systems?.wheels!==!1,decouplers:(e.design.couplers||[]).map(e=>Number(e.port.slice(4))),registration:e.id.toUpperCase()});e.debris||Rm(n,t);for(let t of e.design?.parts||[])if(t.part===`tank`){let r=n.group.getObjectByName(`TankModule`+t.port.slice(4));r&&(r.userData.tankId=t.id,r.userData.tankShipId=e.id)}return n.anchors?.dockMesh&&(n.anchors.dockMesh.userData.dockingShipId=e.id),n.anchors?.engineMesh&&(n.anchors.engineMesh.userData.engineShipId=e.id),i_(n.group),ag.add(n.group),n.key=a_(e),cg.set(e.id,n),n}var s_=new xr;$h.add(s_);var c_=Np({getFleet:()=>$,onAction:r_,onFocus:()=>Jg.clear(),onHighlight:e=>{for(;s_.children.length;){let e=s_.children[0];s_.remove(e),e.geometry.dispose(),e.material.dispose()}for(let[t,n]of cg){let r=$.ships.find(e=>e.id===t);for(let t of r?.design?.parts||[])if(t.part===`tank`&&e.includes(t.id)){let e=n.group.getObjectByName(`TankModule`+t.port.slice(4));if(e){let t=new kc(e,12114363);t.userData.target=e,t.renderOrder=79,s_.add(t)}}}}});function l_(){for(let e of $.ships){let t=cg.get(e.id);if((!t||t.key!==a_(e))&&(t?.dispose(),o_(e)),!ug.has(e.id)){let t=document.createElement(`div`);t.className=`object-label`,Q(`#labels`).append(t),ug.set(e.id,t)}}for(let[e,t]of cg)$.ships.some(t=>t.id===e)||(t.dispose(),cg.delete(e),ug.get(e)?.remove(),ug.delete(e))}function u_(){hg?.dispose();let e=ae(mg,{fuel:0}),t=Math.min(Number(Q(`#launch-fuel`).value),e.fuelCapacity);for(Q(`#launch-fuel`).max=e.fuelCapacity,Q(`#launch-fuel`).value=t,hg=Ym({layout:e.layout,engineCount:e.engineCount,docking:mg.parts.some(e=>e.port===`dock`),rcs:mg.systems?.rcs!==!1,wheel:mg.systems?.wheels!==!1,decouplers:(mg.couplers||[]).map(e=>Number(e.port.slice(4))),registration:`BLUEPRINT`}),Rm(hg,e),hg.updateVisuals({cargoCount:e.cargoCapacity/1e3,time:0}),sg.add(hg.group),i_(hg.group);dg.children.length;){let e=dg.children[0];dg.remove(e),e.geometry.dispose(),e.material.dispose()}for(let e of Object.values(j)){let t=new Pi({color:e.id===Q(`#port`).value?16112524:9420758,transparent:!0,opacity:.7,depthTest:!1}),n=new Ki(new ds(.24,12,8),t);n.position.fromArray(e.position),n.userData.port=e.id,n.renderOrder=50,dg.add(n)}Pg++,d_(),p_()}function d_(){for(let e of[`rcs`,`wheels`,`battery`])Q(`#system-`+e).checked=mg.systems?.[e]!==!1;Q(`#stage-list`).textContent=(mg.stages||[]).map((e,t)=>t+1+` · `+e.actions.map(e=>e.type===`engine`?e.enabled?`Enable engine`:`Disable engine`:`Separate module`).join(` + `)).join(` / `)}function f_(){let e=j[Q(`#port`).value];Q(`#part`).innerHTML=Object.entries(M).filter(([,t])=>e.accepts.includes(t.kind)).map(([e,t])=>`<option value="${e}">${t.name}</option>`).join(``);for(let t of dg.children)t.material.color.setHex(t.userData.port===e.id?16112524:9420758)}function p_(){let e=ae(mg,{fuel:Number(Q(`#launch-fuel`).value)}),t=Math.ceil(e.cost+e.fuel*12+e.mass*5);Q(`#yard-readout`).innerHTML=t_(`Dry / wet mass`,(e.dryMass/1e3).toFixed(2)+` / `+(e.mass/1e3).toFixed(2)+` t`)+t_(`Propellant`,e.fuel+` / `+e.fuelCapacity+` kg`)+t_(`Cargo capacity`,e.cargoCapacity/1e3+` t`)+t_(`Delta-v`,e.deltaV.toFixed(0)+` m/s`)+t_(`Thrust`,(e.thrust/1e3).toFixed(0)+` kN`)+t_(`Parts + launch`,t.toLocaleString()+` cr`),Q(`#launch`).disabled=!e.thrust||!mg.parts.some(e=>e.port===`dock`)||!e.fuelCapacity||t>$.credits}function m_(e){Jg.clear(),c_.closeAll(),Zh.focus({preventScroll:!0}),B_(),q_();let t=gg;t===`yard`&&e!==`yard`&&($.paused=Lg),t!==`yard`&&e===`yard`&&(Lg=$.paused),gg=e,document.body.dataset.view=gg,Q(`#controls`).textContent=gg===`yard`?`Click a mount · Drag orbit · Scroll zoom`:Rp.attitude+` attitude · `+Rp.translation+` translation · `+Rp.throttle+` throttle · `+Rp.stage+` stage`,document.querySelectorAll(`[data-view]`).forEach(e=>e.classList.toggle(`active`,e.dataset.view===gg)),Q(`#yard-panel`).hidden=gg!==`yard`,Q(`#flight-panel`).hidden=gg===`yard`,Q(`#relative`).hidden=gg===`yard`,Q(`#mode-label`).textContent=gg===`yard`?`ASSEMBLY BLUEPRINT`:gg===`map`?`ORBITAL NAVIGATION`:`FLIGHT CONTROL`,gg===`yard`&&($.paused=!0,u_()),Fg=!0,R_()}function h_(e,t=!1,n=!1){c_.closeAll(),$=new Yh({practice:e,surfacePractice:t,joinedPractice:n}),_g=!0,Q(`#welcome`).hidden=!0,Yg.clear(),l_(),vg=e?.12:.95,yg=e?.12:.28,bg=e?36:48,Rg=null,Bg=null,Vg=null,Hg=null,m_(`flight`),qg.unlock().then(()=>Q(`#sound`).textContent=`Sound on`).catch(()=>{}),n_($.message),Ng=0,kg=0,R_()}Q(`#start-joined`).onclick=()=>h_(!1,!1,!0),Q(`#start-company`).onclick=()=>h_(!1),Q(`#start-practice`).onclick=()=>h_(!0),Q(`#start-surface`).onclick=()=>h_(!1,!0),Q(`#restart`).onclick=()=>{Q(`#welcome`).hidden=!1,_g=!1,Jg.clear(),qg.update(0,0)},document.querySelectorAll(`[data-view]`).forEach(e=>e.onclick=()=>m_(e.dataset.view)),Q(`#ship-select`).onchange=e=>r_(()=>{k_(e.target.value)}),Q(`#target-select`).innerHTML=Zg.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``),Q(`#target-select`).onchange=e=>r_(()=>{$.targetId=e.target.value,$.selected.targetId=e.target.value,$.selected.dockAssist=!1,$.selected.targetQ=null,$.plan=null;let t=$.ships.find(t=>t.id===e.target.value);t&&!t.docked&&!t.joinedId&&!$.selected.docked&&!$.selected.joinedId&&($.selected.latchArmed=t.id),$.message=t?`Ship target selected · docking enabled`:`Target changed`,Fg=!0}),Q(`#pause`).onclick=()=>{$.paused=!$.paused,R_()},Q(`#sound`).onclick=async()=>{await qg.toggle(),Q(`#sound`).textContent=qg.muted?`Sound off`:`Sound on`},Q(`#align`).hidden=!0,Q(`#dock`).onclick=()=>r_(()=>{$.tryDock().status===`capture`&&qg.event(`dock`)}),Q(`#undock`).onclick=()=>r_(()=>{$.release(),$.paused=!1}),Q(`#load`).onclick=()=>r_(()=>$.loadCargo(Number(Q(`#cargo`).value))),Q(`#deliver`).onclick=()=>r_(()=>$.unload());function g_(){$.paused=!0,$.makePlan({radialTrim:Number(Q(`#radial`).value),tangentialTrim:Number(Q(`#tangential`).value)}),m_(`map`),$.message=`Prediction ready · inspect the two burns before scheduling`}Q(`#plan`).onclick=()=>r_(g_),Q(`#replan`).onclick=()=>r_(g_),Q(`#commit`).onclick=()=>r_(()=>{$.commitPlan(),$.paused=!1}),Q(`#next`).onclick=()=>r_(()=>{$.nextBurn(),Yg.clear()}),Q(`#execute`).onclick=()=>r_(()=>$.execute()),Q(`#cancel`).onclick=()=>r_(()=>{$.cancel(),__.reset()});var __=Yd(Q(`#left`),{getFleet:()=>$,onChange:()=>{Fg=!0,R_()},onError:n_});Q(`#port`).innerHTML=Object.keys(j).map(e=>`<option value="${e}">${e===`engine`?`Aft engine mount`:e===`dock`?`Nose docking mount`:`Rack `+(Number(e.slice(4))+1)}</option>`).join(``),Q(`#port`).onchange=f_,f_(),Q(`#attach`).onclick=()=>r_(()=>{mg=I(mg,Q(`#port`).value,Q(`#part`).value),u_(),$.message=`Part attached; mass and inertia recomputed`}),Q(`#detach`).onclick=()=>r_(()=>{let e=Q(`#port`).value,t=new Set([mg.parts.find(t=>t.port===e)?.id,...(mg.couplers||[]).filter(t=>t.port===e).map(e=>e.id)]);mg=ee(mg,e),mg.stages=mg.stages.map(e=>({...e,actions:e.actions.filter(e=>!t.has(e.partId))})).filter(e=>e.actions.length),u_(),$.message=`Mount cleared; its stage actions removed from the blueprint`}),Q(`#launch-fuel`).oninput=p_,Q(`#save-design`).onclick=()=>r_(()=>{localStorage.setItem(`orbital-freight-design-v1`,re(mg)),$.message=`Blueprint saved with attachment identities`}),Q(`#reload-design`).onclick=()=>r_(()=>{let e=localStorage.getItem(`orbital-freight-design-v1`);if(!e)throw Error(`No saved blueprint yet`);mg=ie(e),u_(),$.message=`Saved blueprint restored`}),Q(`#launch`).onclick=()=>r_(()=>$.orderShip(mg,Number(Q(`#launch-fuel`).value))),Q(`#fit-coupler`).onclick=()=>r_(()=>{mg=se(mg,Q(`#port`).value),u_(),$.message=`Decoupler fitted`});for(let e of[`rcs`,`wheels`,`battery`])Q(`#system-`+e).onchange=t=>r_(()=>{mg={...mg,revision:mg.revision+1,systems:{...mg.systems,[e]:t.target.checked}},u_(),$.message=`Hardware updated`});Q(`#key-guide`).innerHTML=[[`attitude`,`pitch / yaw / roll`],[`translation`,`down-up / left-right / forward-back`],[`throttle`,`throttle ramp`],[`cutoff`,`cutoff`],[`full`,`full throttle`],[`stage`,`next stage`],[`precision`,`15% precision`],[`rcs`,`RCS toggle`],[`damping`,`angular-rate damping`],[`map`,`map`],[`yard`,`shipyard`],[`ships`,`switch vessel`],[`camera`,`camera`],[`settings`,`settings and help`]].map(([e,t])=>`<span><b>`+Rp[e]+`</b> `+t+`</span>`).join(``),Q(`#help`).onclick=()=>{$.paused=!0,Q(`#help-dialog`).showModal()},Q(`#close-help`).onclick=()=>{Q(`#help-dialog`).close(),$.paused=!1};function v_(){let e=Ig===`High`?Math.min(devicePixelRatio,1.75):Ig===`Balanced`?Math.min(devicePixelRatio,1.25):1;Qh.setPixelRatio(e),Qh.setSize(innerWidth,innerHeight,!1),eg.aspect=innerWidth/innerHeight,eg.updateProjectionMatrix(),Qh.shadowMap.enabled=Ig!==`Low`}addEventListener(`resize`,v_),Q(`#quality`).onchange=e=>{Ig=e.target.value,v_()},v_();var y_=!1,b_=am.id;function x_(){Jg.clear(),y_=$.paused,$.paused=!0,b_=Cm.find(e=>wm($,e.id).available)?.id||(Cm.some(e=>e.id===$.targetId)?$.targetId:am.id),Q(`#exchange-site`).value=b_,C_(),Q(`#exchange-dialog`).showModal()}function S_(){Q(`#exchange-dialog`).close(),$.paused=y_}function C_(){let e=$.sites[b_],t=$.selected,n=L(t),r=e.exchange.revision,i=wm($,b_),a=i.available;Q(`#exchange-title`).textContent=a?`Local exchange`:`Warehouse account`,Q(`#exchange-access`).textContent=a?fe(b_)?`Station service ready · velocity matched · time paused`:`Ship within handling reach · whole cargo containers`:i.reason+` · Stored stock can be sold remotely`,Q(`#exchange-balance`).textContent=$.credits.toLocaleString()+` credits · `+t.fuel.toFixed(1)+` / `+n.fuelCapacity+` kg fuel · `+t.cargoCount+` / `+n.cargoCapacity/1e3+` containers`,Q(`#exchange-orders`).replaceChildren();for(let[t,n]of Object.entries(Tm).filter(([e])=>e===Q(`#exchange-resource`).value)){let i=e.exchange.orders[t],o=document.createElement(`section`);o.innerHTML=`<strong>${n.name}</strong><p>Buy ${i.ask} cr/kg · ${Math.min(i.sellRemaining,e.market.stock[t]).toLocaleString()} kg available<br>Sell ${i.bid} cr/kg · ${i.buyRemaining.toLocaleString()} kg wanted<br>Owned storage ${e.warehouse.stock[t].toLocaleString()} / ${n.storageCapacity.toLocaleString()} kg</p><label>Quantity, kg <input type="number" min="1" step="1" value="${t===`propellant`?100:n.lotKg}" aria-label="${n.name} quantity"></label><div class="button-grid"><button>Buy to ship</button><button>Sell from ship</button><button>Deposit</button><button>Withdraw</button><button>Sell stored</button></div>`;let s=o.querySelector(`input`);o.querySelectorAll(`button`).forEach((n,o)=>{n.disabled=o<4?!a:e.warehouse.stock[t]<=0||i.buyRemaining<=0,n.onclick=()=>r_(()=>{let e={siteId:b_,resourceId:t,quantityKg:Number(s.value),revision:r};o<2?$.trade({...e,side:o?`sell`:`buy`}):o<4?$.storeCargo({...e,direction:o===2?`deposit`:`withdraw`}):$.sellStored(e),C_()})}),Q(`#exchange-orders`).append(o)}}Q(`#exchange-resource`).innerHTML=Object.entries(Tm).map(([e,t])=>`<option value="${e}">${t.name}</option>`).join(``),Q(`#exchange-resource`).onchange=C_,Q(`#exchange-site`).innerHTML=Cm.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``),Q(`#exchange-site`).onchange=e=>{b_=e.target.value,C_()},Q(`#warehouse-manager`).onclick=()=>r_(x_),Q(`#exchange-close`).onclick=S_,Q(`#exchange-dialog`).oncancel=e=>{e.preventDefault(),S_()};function w_(){Jg.clear(),B_(),q_(),Q(`#settings-wheels`).checked=$.selected.wheelsEnabled,$.paused=!0,Q(`#settings-dialog`).showModal()}function T_(){Q(`#settings-dialog`).close(),$.paused=!1,Zh.focus({preventScroll:!0})}function E_(){Jg.clear(),$.paused=!0,Q(`#help-dialog`).showModal()}function D_(e){m_(gg===e?`flight`:e)}function O_(e){$.selected.throttle=c(e,0,1),$.takeover(),$.message=Math.round($.selected.throttle*100)+`%`}function k_(e){Jg.clear(),B_(),q_(),$.select(e)}addEventListener(`keydown`,e=>{if(!_g||document.querySelector(`dialog[open]`))return;if(e.code===`Escape`&&(c_.isOpen||!Q(`#engine-card`).hidden||!Q(`#stage-panel`).hidden)){e.preventDefault(),c_.closeAll(),B_(),q_();return}if(e.target.isContentEditable||[`INPUT`,`SELECT`,`TEXTAREA`].includes(e.target.tagName)||[`Space`,`Enter`].includes(e.code)&&e.target.closest(`button`))return;let t=Fp(e);if((t||zp.includes(e.code))&&e.preventDefault(),Jg.add(e.code),!t)return;if(t===`settings`){w_();return}if(t===`toggle-map`){D_(`map`);return}if(t===`toggle-yard`){D_(`yard`);return}if(t===`cycle-camera`){zg=zg===`chase`?`inspection`:`chase`,n_(`Camera `+zg);return}if(t===`previous-ship`||t===`next-ship`){r_(()=>k_($.ships[($.ships.findIndex(e=>e.id===$.selectedId)+(t===`next-ship`?1:$.ships.length-1))%$.ships.length].id));return}if(gg===`yard`)return;t===`stage`&&r_(()=>{$.stage(),Yg.clear(),K_.refresh()}),t===`cutoff`&&r_(()=>$.cutoff()),t===`full-throttle`&&r_(()=>O_(1)),t===`execute-planned-burn`&&Q(`#execute`).click(),t===`exchange`&&r_(x_),t===`toggle-precision`&&(Wg=!Wg,n_(`Precision `+(Wg?`15%`:`off`)));let n={"toggle-rcs":`rcsEnabled`,"toggle-damping":`rateDamping`};n[t]&&r_(()=>{let e=$.selected;e.debris||(e[n[t]]=!e[n[t]],e.burn&&$.takeover(),$.message=t===`toggle-rcs`?`RCS `+(e.rcsEnabled?`on`:`off`):`Rate damping `+(e.rateDamping?`on`:`off`))})}),addEventListener(`focusin`,e=>{e.target.closest(`input,select,textarea,button`)&&Jg.clear()}),addEventListener(`keyup`,e=>Jg.delete(e.code)),addEventListener(`blur`,()=>{Jg.clear(),$.paused=!0}),Q(`#settings-close`).onclick=T_,Q(`#help-dialog`).oncancel=e=>{e.preventDefault(),Q(`#help-dialog`).close(),$.paused=!1},Q(`#settings-dialog`).oncancel=e=>{e.preventDefault(),T_()},Q(`#settings-help`).onclick=()=>{Q(`#settings-dialog`).close(),E_()},Q(`#settings-sound`).onclick=()=>Q(`#sound`).click(),Q(`#settings-quality`).onchange=e=>{Q(`#quality`).value=e.target.value,Q(`#quality`).dispatchEvent(new Event(`change`))},Q(`#settings-restart`).onclick=()=>{Q(`#settings-dialog`).close(),Q(`#restart`).click()},Q(`#checkpoint-save`).onclick=()=>r_(()=>{localStorage.setItem(`orbital-checkpoint-v1`,$.save()),$.message=`Checkpoint saved`}),Q(`#checkpoint-load`).onclick=()=>r_(()=>{let e=localStorage.getItem(`orbital-checkpoint-v1`);if(!e)throw Error(`No checkpoint saved`);$=Yh.restore(e),Yg.clear(),kg=0,Ng=$.history.length,l_(),Fg=!0});var A_=document.createElement(`div`);A_.id=`part-action`,A_.hidden=!0,document.body.append(A_);var j_=null,M_=null;function N_(e,t){if(gg!==`flight`||!_g||document.querySelector(`dialog[open]`))return null;Xg.setFromCamera(new K(e/innerWidth*2-1,-t/innerHeight*2+1),eg);let n=Xg.intersectObjects(ag.children,!0).find(e=>{for(let t=e.object;t&&t!==ag;t=t.parent)if(!t.visible)return!1;return!0});if(!n)return null;for(let e=n.object;e&&e!==ag;e=e.parent){if(e.userData.tankId)return{shipId:e.userData.tankShipId,tankId:e.userData.tankId,group:e,type:`tank`};let t=e.userData.dockingShipId,n=$.ships.find(e=>e.id===t);if(n&&(n.joinedId||n.docked))return{shipId:t,group:e,type:`collar`};let r=e.userData.engineShipId;if(r)return{shipId:r,group:e,type:`engine`}}return null}function P_(){let e=j_&&!Tg?N_(j_.x,j_.y):null;M_?.group!==e?.group&&(M_?.group.traverse(e=>{e.isMesh&&e.userData.oldEmissive!==void 0&&(e.material.emissive.setHex(e.userData.oldEmissive),delete e.userData.oldEmissive)}),e?.group.traverse(e=>{e.isMesh&&e.material.emissive&&(e.userData.oldEmissive=e.material.emissive.getHex(),e.material.emissive.setHex(3496264))})),M_=e,Zh.style.cursor=e?`pointer`:Tg?`grabbing`:`grab`,A_.hidden=!e,e&&(A_.textContent=e.type===`tank`?`Click tank for fuel transfer`:e.type===`engine`?`Click engine for controls`:`Click collar to undock`,A_.style.left=Math.min(innerWidth-180,j_.x+16)+`px`,A_.style.top=Math.min(innerHeight-35,j_.y+16)+`px`)}Zh.addEventListener(`pointermove`,e=>{j_={x:e.clientX,y:e.clientY}}),Zh.addEventListener(`pointerleave`,()=>{j_=null,P_()}),Zh.addEventListener(`pointerdown`,e=>{Zh.setPointerCapture(e.pointerId),Rg=null,Tg={x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY}}),Zh.addEventListener(`pointermove`,e=>{if(!Tg)return;let t=e.clientX-Tg.x,n=e.clientY-Tg.y;gg===`map`?(Sg-=t*.006,Cg=c(Cg+n*.004,-1.4,1.4)):(vg-=t*.007,yg=c(yg+n*.005,-1.2,1.25)),Tg.x=e.clientX,Tg.y=e.clientY}),Zh.addEventListener(`pointerup`,e=>{if(Tg&&Math.hypot(e.clientX-Tg.startX,e.clientY-Tg.startY)<5&&gg===`yard`){Xg.setFromCamera(new K(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1),eg);let t=Xg.intersectObjects(dg.children)[0];t&&(Q(`#port`).value=t.object.userData.port,f_())}else if(Tg&&Math.hypot(e.clientX-Tg.startX,e.clientY-Tg.startY)<5&&gg===`map`)I_(e.clientX,e.clientY);else if(Tg&&Math.hypot(e.clientX-Tg.startX,e.clientY-Tg.startY)<5&&gg===`flight`){let t=N_(e.clientX,e.clientY);t?.type===`tank`?(Jg.clear(),B_(),c_.open(t.tankId,e.clientX,e.clientY)):t?.type===`collar`?r_(()=>$.release(t.shipId)):t?.type===`engine`?V_(t.shipId,e.clientX,e.clientY):B_()}Tg=null,P_()}),Zh.addEventListener(`wheel`,e=>{e.preventDefault(),gg===`map`?wg=c(wg*Math.exp(e.deltaY*.001),260,1800):gg===`yard`?xg=c(xg*Math.exp(e.deltaY*.001),15,70):bg=c(bg*Math.exp(e.deltaY*.001),8,180)},{passive:!1});function F_(){if($.paused||$.selected.debris)return{};let e=Ip(Jg,{precision:Wg,view:gg});if(e.throttleRate){let t=$.selected;(t.burn||t.plan||t.navigation||t.guidance)&&$.takeover(t),t.throttle=Lp(t.throttle||0,e.throttleRate,1/60)}return{...e,main:$.selected.throttle||0}}function I_(e,t){let n=$.plan;if(n?.kind===`maneuver`){let r=new q(...n.departureState.r).multiplyScalar(.001).project(eg);if(Math.hypot((r.x*.5+.5)*innerWidth-e,(-r.y*.5+.5)*innerHeight-t)<12)return}let r=null,i=14;for(let n of fg){let a=new q(...n.r).multiplyScalar(.001),o=a.clone().sub(eg.position),s=c(-eg.position.dot(o)/o.lengthSq(),0,1);if(eg.position.clone().addScaledVector(o,s).length()<b.radius*.001)continue;let l=a.project(eg);if(l.z<-1||l.z>1)continue;let u=Math.hypot((l.x*.5+.5)*innerWidth-e,(-l.y*.5+.5)*innerHeight-t);u<i&&(i=u,r=n)}if(r){let e=T($.selected).period,t=r.time;t<$.time+60&&Number.isFinite(e)&&(t+=Math.ceil(($.time+60-t)/e)*e),__.selectPoint(t)}}function L_(){for(;og.children.length;){let e=og.children[0];og.remove(e),e.geometry.dispose(),e.material.dispose()}fg=[];let e=(e,t,n=1,r=!1)=>{let i=new xa(new Ci().setFromPoints(e.map(e=>new q(...e).multiplyScalar(.001))),r?new Os({color:t,transparent:!0,opacity:n,dashSize:3,gapSize:2}):new pa({color:t,transparent:!0,opacity:n}));r&&i.computeLineDistances(),og.add(i)};for(let t of Gh)e(Array.from({length:181},(e,n)=>S(t.radius,n/180*Math.PI*2).r),t.id===$.targetId?10272130:3559522,.7);for(let t of $.ships){let n=T(t).period,r=Number.isFinite(n)?n:21600;if(!t.landed&&!t.docked)try{let n=Array.from({length:721},(e,n)=>({r:D(t,n/720*r).r,time:$.time+n/720*r}));e(n.map(e=>e.r),t.id===$.selectedId?11394282:6915476),t.id===$.selectedId&&(fg=n)}catch{}}let t=$.plan;if(t)try{if(t.kind===`maneuver`){e(t.burnPath,16772027),e(t.coastPath,15058565,1,$.selected.plan!==t);let n=new Ki(new cs(6),new Pi({color:$.selected.plan===t?11983037:15058565,depthTest:!1}));n.position.fromArray(t.departureState.r).multiplyScalar(.001),n.renderOrder=5,og.add(n)}else e(Array.from({length:181},(e,n)=>D(t.afterDeparture,n/180*t.coastDuration).r),15058565)}catch{}pg=t,Fg=!1}function R_(){l_(),c_.refresh();let e=$.selected,t=L(e),r=$.ships.map(e=>e.id).join();Q(`#ship-select`).dataset.ids!==r&&(Q(`#ship-select`).innerHTML=$.ships.map(e=>`<option value="${e.id}">${e.name} / ${e.id.slice(-2)}</option>`).join(``),Q(`#ship-select`).dataset.ids=r),Q(`#ship-select`).value=e.id;let i=[...Zg,...$.ships.filter(t=>t.id!==e.id&&!t.debris)],a=i.map(e=>e.id).join();Q(`#target-select`).dataset.ids!==a&&(Q(`#target-select`).innerHTML=i.map(e=>`<option value="${e.id}">${e.name} ${e.id.startsWith(`ship-`)?e.id:``}</option>`).join(``),Q(`#target-select`).dataset.ids=a),Q(`#target-select`).value=$.targetId,Q(`#ship-readout`).innerHTML=t_(`Wet mass`,(t.mass/1e3).toFixed(2)+` t`)+t_(`Propellant`,e.fuel.toFixed(1)+` kg`)+t_(`Delta-v`,t.deltaV.toFixed(0)+` m/s`)+t_(`Cargo`,e.cargoCount+` / `+t.cargoCapacity/1e3);let o=t.cargoCapacity/1e3;Q(`#cargo`).options.length!==o+1&&(Q(`#cargo`).innerHTML=Array.from({length:o+1},(e,t)=>`<option value="${t}">${t} container${t===1?``:`s`} · ${t} t</option>`).join(``)),Q(`#load`).disabled=!e.docked,Q(`#undock`).disabled=!e.docked&&!e.joinedId,Q(`#deliver`).disabled=!e.docked||e.docked.stationId===`assembly`||!e.cargoCount,Q(`#align`).disabled=!!e.docked,Q(`#dock`).disabled=!!e.docked||!!e.joinedId,Q(`#plan`).disabled=!!e.joinedId||$.ships.some(e=>e.id===$.targetId)||!!e.docked||!!e.burn||!!e.landed||im.some(e=>e.id===$.targetId),Q(`#pause`).textContent=$.paused?`Resume`:`Pause`,Q(`#clock`).textContent=e_($.time)+($.paused?` PAUSED`:``),Q(`#funds`).textContent=$.credits.toLocaleString()+` credits`,Q(`#deliveries`).textContent=$.deliveries.filter(e=>e.status!==`delivered`).map(e=>`Launch `+e.id.slice(-2)+` · `+e_(e.arrival-$.time)).join(` / `);let s=$.timeline.pending().filter(e=>e.kind!==`prepare`&&e.kind!==`burn-end`).slice(0,3);Q(`#schedule`).innerHTML=s.length?s.map(e=>`${e.shipId} · ${e.kind===`delivery`?`Launch arrival`:e.data.name}<br>T−${e_(e.time-$.time)}`).join(`<br>`):`No maneuvers scheduled`,Q(`#execute`).hidden=!$.timeline.due().some(t=>t.kind===`burn`&&t.shipId===e.id),Q(`#next`).disabled=!$.timeline.next()||$.ships.some(e=>e.burn);let l=$.plan,u=l&&l.kind!==`maneuver`;Q(`#plan-readout`).hidden=!u,Q(`#plan-actions`).hidden=!u||!!e.plan,u&&(Q(`#plan-readout`).innerHTML=`${l.consumed.toFixed(1)} kg propellant · ${e_(l.endTime-l.createdAt)} total<br>${l.nodes.map(e=>e.name+`: `+e.deltaV.toFixed(2)+` m/s / `+e.duration.toFixed(2)+` s`).join(`<br>`)}<br>Arrival ${l.arrivalRange.toFixed(0)} m from depot<br>Predicted relative speed ${l.relativeSpeed.toFixed(3)} m/s`);let d=$.docking(),f=h(e.q,n(d.depotPort.r,d.shipPort.r)),p=h(e.q,n(d.shipPort.v,d.depotPort.v));Q(`#relative-readout`).innerHTML=`<strong>${d.range<1e3?d.range.toFixed(1)+` m`:(d.range/1e3).toFixed(1)+` km`}</strong><br>${d.speed.toFixed(2)} m/s relative<br>${(d.alignment*180/Math.PI).toFixed(1)}° port alignment<br><span class="subtle">Local velocity ${p[0].toFixed(2)} / ${p[1].toFixed(2)} / ${p[2].toFixed(2)} m/s</span>`,Q(`#guide-dot`).setAttribute(`cx`,80+c(f[0]*2,-60,60)),Q(`#guide-dot`).setAttribute(`cy`,80-c(f[1]*2,-60,60)),Q(`#focus-label`).textContent=gg===`yard`?`BLUEPRINT · TIME PAUSED`:e.joinedId?`JOINED PLAYER SHIPS`:$.practice?`PRACTICE`:e.docked?`ATTACHED / `+$.station(e.docked.stationId).name.toUpperCase():e.burn?`FINITE BURN / `+e.burn.node.name.toUpperCase():`FREE FLIGHT / `+(gg===`map`?`3D ORBIT MAP`:`INERTIAL MOMENTUM`),$.message!==Mg&&n_($.message),gg===`yard`&&p_(),__.refresh()}function z_(){let e=$.ships.find(e=>e.id===Gg);if(!e){B_();return}let t=[e],n=Q(`#engine-list`);n.replaceChildren();for(let e of t){let t=document.createElement(`section`),r=document.createElement(`h3`);r.textContent=e.id.toUpperCase().replace(`-`,` `)+` · `+e.fuel.toFixed(1)+` kg`,t.append(r);let i=document.createElement(`label`),a=document.createElement(`input`);i.className=`system-field`,a.type=`checkbox`,a.checked=e.engineEnabled!==!1,a.dataset.group=e.id,a.onchange=()=>r_(()=>{$.setEngineGroup(e.id,a.checked),z_()}),i.append(a,document.createTextNode(`Enabled`)),t.append(i);let o=document.createElement(`label`);o.textContent=`Throttle % `;let s=document.createElement(`input`);s.type=`number`,s.min=0,s.max=100,s.step=5,s.value=Math.round((e.throttle||0)*100),s.dataset.ship=e.id,s.setAttribute(`aria-label`,e.id+` group throttle percent`),s.onchange=()=>r_(()=>{let t=Number(s.value);if(!Number.isFinite(t)||t<0||t>100)throw Error(`Throttle must be 0–100%`);$.takeover(e),e.throttle=t/100,$.message=`Group throttle set`}),o.append(s),t.append(o),ap(e).forEach((n,r)=>{let i=document.createElement(`label`);i.className=`system-field`;let a=document.createElement(`input`);a.type=`checkbox`,a.checked=e.engineSwitches?.[n.id]!==!1,a.dataset.engine=n.id,a.onchange=()=>r_(()=>$.setEngine(e.id,n.id,a.checked)),i.append(a,document.createTextNode(` Bell `+(r+1))),t.append(i)}),n.append(t)}}function B_(){Gg=null,Q(`#engine-card`).hidden=!0,Zh.focus({preventScroll:!0})}function V_(e,t=innerWidth-340,n=150){Jg.clear(),q_(),Gg=e,z_();let r=Q(`#engine-card`);r.hidden=!1,r.style.left=c(t+12,12,innerWidth-332)+`px`,r.style.top=c(n,70,innerHeight-420)+`px`}Q(`#engines-close`).onclick=B_,Q(`#engine-card`).addEventListener(`pointerdown`,()=>Jg.clear()),Q(`#settings-wheels`).onchange=e=>r_(()=>{$.selected.wheelsEnabled=e.target.checked,$.message=`Reaction wheels `+(e.target.checked?`on`:`off`)});var H_=null;function U_(){return H_===`blueprint`?{id:`blueprint`,design:mg,stageIndex:0,activatedStages:[]}:$.ships.find(e=>e.id===H_)||$.selected}function W_(){for(;Kg.children.length;){let e=Kg.children[0];Kg.remove(e),e.geometry.dispose(),e.material.dispose()}}function G_(e,t,n){if(W_(),!e)return;let r=U_(),i=H_===`blueprint`?hg:cg.get(r.id);for(let t of n)for(let n of new Set([t.actionPartId,t.affectedPartId])){let t=e.parts.find(e=>e.id===n),r=e.couplers?.find(e=>e.id===n),a;if(t?.port===`engine`?a=i?.anchors.engineMesh:t?a=i?.group.getObjectByName((t.part===`tank`?`TankModule`:`CargoSlot`)+t.port.slice(4)):r&&(a=i?.group.getObjectByName(`Decoupler`+r.port.slice(4))),a){let e=new kc(a,16111751);e.userData.target=a,e.material.depthTest=!1,e.renderOrder=80,Kg.add(e)}}}var K_=Yp(Q(`#stage-stack`),{getCurrent:U_,onCancel:q_,onError:n_,onPreview:G_,onApply:e=>{if(H_===`blueprint`)mg=e,d_();else{let t=U_();t.design=e,$.takeover(t)}n_(H_===`blueprint`?`Blueprint stage edits applied`:`Stage edits applied · planned burn cancelled`),Fg=!0,R_()}});function q_(){Q(`#stage-panel`).hidden||(Q(`#stage-panel`).hidden=!0,K_.close(),Zh.focus({preventScroll:!0})),W_()}function J_(e){Jg.clear(),B_(),H_=e,Q(`#stage-panel`).hidden=!1,Q(`#stage-heading`).textContent=e===`blueprint`?`Blueprint stages`:`Stages · `+e.toUpperCase().replace(`-`,` `),K_.reset()}Q(`#edit-blueprint-stages`).onclick=()=>J_(`blueprint`),Q(`#edit-flight-stages`).onclick=()=>{$.selected.debris||J_($.selected.id)},Q(`#stage-close`).onclick=q_;var Y_=document.createElement(`div`);Y_.className=`object-label target`,Y_.textContent=`PLANNED RENDEZVOUS`,Q(`#labels`).append(Y_);function X_(){let e=$.selected,t=L(e),r=$.docking(),i=$.timeline.pending().find(t=>t.shipId===e.id&&t.kind===`burn`),a=e.guidance||i?.data,o=a?a.direction:n(r.depotPort.r,r.shipPort.r),s=h(e.q,o),l=h(e.q,n(r.shipPort.v,r.depotPort.v)),u=Math.atan2(Math.hypot(s[0],s[1]),-s[2]),d=Math.min(67,u/(Math.PI/2)*67),f=Math.atan2(s[1],s[0]),p=90+Math.cos(f)*d,m=90-Math.sin(f)*d;Q(`#bearing-marker`).setAttribute(`transform`,`translate(${p} ${m}) rotate(${Math.atan2(s[0],-s[1])*180/Math.PI})`),Q(`#bearing-marker`).style.fill=a?`#dec891`:`#b5d6bd`,Q(`#velocity-marker`).setAttribute(`transform`,`translate(${90+c(l[0]*12,-65,65)} ${90-c(l[1]*12,-65,65)})`),Q(`#hud-vessel`).textContent=e.id.toUpperCase()+` / `+gg.toUpperCase(),Q(`#hud-resources`).textContent=`${e.fuel.toFixed(1)} kg${e.joinedId?` OWN`:``}   ${((e.joinedId?$.assemblies.find(t=>t.id===e.joinedId).components.reduce((e,t)=>e+t.mass,0):t.mass)/1e3).toFixed(2)} t${e.joinedId?` JOINED`:``}
${Math.round((e.burn?1:e.throttle||0)*100)}%   ${(e.energy/1e6).toFixed(2)} MJ
R ${e.rcsEnabled?`●`:`○`}   WHEEL ${e.wheelsEnabled?`●`:`○`}   T ${e.rateDamping?`●`:`○`}`,Q(`#hud-target`).textContent=e.joinedId?`JOINED · CLICK COLLAR TO UNDOCK
CLICK TANK FOR TRANSFER · ENGINE FOR CONTROLS`:r.lateral===void 0?e.landed?.stableTime>=2?`LANDED`+(xm(e)?` · G EXCHANGE`:``):e.docked?`DOCKED · CLICK COLLAR TO UNDOCK`:`${r.range<1e3?r.range.toFixed(2)+` m`:(r.range/1e3).toFixed(2)+` km`}
${r.speed.toFixed(2)} m/s   ${(r.alignment*180/Math.PI).toFixed(1)}°${r.surface?` TILT`:``}
ω ${e.omega.map(e=>(e*180/Math.PI).toFixed(1)).join(` / `)} °/s`:`${e.releasePartnerId?`SEPARATE PAST 0.55 m · `:r.magnet?.active?`MAGNETS `+Math.round(r.magnet.powerFraction*100)+`% · `:r.magnet?.reason===`unpowered`?`MAGNETS NEED POWER · `:r.latchEnabled?`DOCKING ENABLED · `:`DOCKING DISABLED · `}${r.range<1?(r.range*1e3).toFixed(1)+` mm`:r.range.toFixed(2)+` m`}  ${r.speed.toFixed(3)} m/s\n${(r.alignment*180/Math.PI).toFixed(3)}° AXIS  ${(r.roll*180/Math.PI).toFixed(3)}° ROLL\n${(r.lateral*1e3).toFixed(1)} mm LATERAL`,Q(`#hud-maneuver`).textContent=i?`${e_($.time)}   T−${e_(i.time-$.time)}
${i.data.deltaV.toFixed(2)} m/s   ${(u*180/Math.PI).toFixed(1)}°`:e_($.time);let g=``;if(!e.debris){let t=e.design.stages?.[e.stageIndex||0];t&&(g=Rp.stage+`  `+String((e.stageIndex||0)+1).padStart(2,`0`)+` / `+e.design.stages.length+`
`+t.actions.map(e=>e.type===`separate`?`SEPARATE`:e.enabled?`ENABLE`:`DISABLE`).join(` + `))}if(g)try{let n=Hp(e);n.splits.length&&(g+=`
`+(t.mass/1e3).toFixed(2)+` → `+(n.parent.mass/1e3).toFixed(2)+` + `+n.splits.map(e=>(e.mass/1e3).toFixed(2)).join(` + `)+` t`)}catch{}Q(`#hud-stage`).textContent=g,Q(`#hud-view`).textContent=Rp.map+` MAP · `+Rp.yard+` YARD · `+Rp.camera+` CAMERA · `+Rp.settings+` HELP`+(Wg?` · PRECISION 15%`:``),e.suspension?.feet.some(e=>e.contact)&&(Q(`#hud-target`).textContent+=`
GEAR `+e.suspension.feet.map(e=>(e.compression*100).toFixed(0)).join(` / `)+` cm`)}new wn,new q;var Z_=new q;function Q_(e,t,r){l_();let i=$.selected,a=gg===`map`,s=gg===`yard`;ag.visible=!s,og.visible=a,sg.visible=s,ig.planet.visible=!s,ig.stars.visible=!s,a&&(Fg||pg!==$.plan)&&L_();let c=Qp(i,$.ships,Bg),l=Yg.get(c.id),u=Xp(l?.epoch,$.time,e),d=Zp(l?.r,c.r,e);if(Ug=u,!a&&!s){let t=$.ships.find(e=>e.id===Hg?.anchorId),n=t?Zp(Yg.get(t.id)?.r,t.r,e):null;Hg=em(Hg,c.id,d,n,r)}else Hg=null;Z_.fromArray(a||s?[0,0,0]:Hg.target);let f=a?.001:1;ag.scale.setScalar(f),ig.planet.scale.setScalar(f),ig.planet.position.copy(Z_).negate().multiplyScalar(f);for(let n of $.ships){let r=cg.get(n.id),i=Yg.get(n.id),o=Zp(i?.r,n.r,e),s=i&&e<1?new wn(...i.q).slerp(new wn(...n.q),e):new wn(...n.q),c=new q(...L(n).com).applyQuaternion(s);r.group.position.set(o[0]-Z_.x-c.x,o[1]-Z_.y-c.y,o[2]-Z_.z-c.z),r.group.quaternion.copy(s),r.group.visible=!a,r.updateVisuals?.({main:n.visual?.main||0,suspension:i?.compression&&n.suspension&&e<1?{...n.suspension,feet:n.suspension.feet.map((t,n)=>({...t,compression:i.compression[n]+(t.compression-i.compression[n])*e}))}:n.suspension,bells:n.visual?.bells,jets:n.visual?.jets||{},cargoCount:n.cargoCount,docked:!!n.docked,time:t})}for(let e of im){let t=om(u,e.id),n=Qg.get(e.id);n.group.position.set(t.r[0]-Z_.x,t.r[1]-Z_.y,t.r[2]-Z_.z),n.group.quaternion.fromArray(t.q),n.group.visible=!a}for(let e of Gh){let t=$.station(e.id,u),n=lg.get(e.id);n.group.position.set(t.r[0]-Z_.x,t.r[1]-Z_.y,t.r[2]-Z_.z),n.group.quaternion.fromArray(t.q),n.group.visible=!a}if(eg.up.set(0,1,0),s)eg.position.set(Math.sin(vg)*Math.cos(yg)*xg,Math.sin(yg)*xg,Math.cos(vg)*Math.cos(yg)*xg),eg.lookAt(0,0,0);else if(a)eg.position.set(Math.sin(Sg)*Math.cos(Cg)*wg,Math.sin(Cg)*wg,Math.cos(Sg)*Math.cos(Cg)*wg),eg.lookAt(0,0,0);else{let e=cg.get(c.id),t=o(c.r)<b.radius+300?om(u,dm(c).siteId):null,n=zg===`inspection`?new wn:t?new wn(...t.q):e.group.quaternion;if(Bg&&Vg&&(Bg!==c.id||eg.userData.mode!==zg)){let e=$p(vg,yg,Vg,n.toArray());vg=e.yaw,yg=e.pitch,Rg=null}eg.userData.mode=zg,Bg=c.id,Vg=n.toArray();let r=new q(Math.sin(vg)*Math.cos(yg)*bg,Math.sin(yg)*bg,Math.cos(vg)*Math.cos(yg)*bg).applyQuaternion(n);if(t){eg.up.fromArray(t.normal);let e=Z_.clone().add(r);e.length()<b.radius+2.5&&r.copy(e.normalize().multiplyScalar(b.radius+2.5).sub(Z_))}eg.position.copy(r),eg.lookAt(0,0,0)}eg.near=a?.2:.08,eg.far=a?3e3:2e6,eg.updateProjectionMatrix(),ig.stars.position.copy(eg.position),ig.stars.scale.setScalar(a?.001:1),rg.position.set(70,95,45),rg.target.position.set(0,0,0),rg.castShadow=!a&&Ig!==`Low`,rg.shadow.camera.far=250,rg.shadow.camera.updateProjectionMatrix();for(let e of Gh){let t=$g.get(e.id),r=pe($.station(e.id,u)),c=o(n(i.r,r.r)),l=!a&&!s&&c<180;t.group.visible=l;let d=me($,e.id);t.setReady(d.available);let f=new q(...n(r.r,Z_.toArray())).project(eg);t.label.hidden=!l||f.z<-1||f.z>1||Math.abs(f.x)>.92||Math.abs(f.y)>.9,t.label.textContent=d.available?`SERVICE READY · G`:`SERVICE · `+d.speed.toFixed(2)+` m/s · G`,t.label.style.left=(f.x*.5+.5)*innerWidth+`px`,t.label.style.top=(-f.y*.5+.5)*innerHeight-32+`px`}for(let e of Zg){let t=ug.get(e.id),r=$.station(e.id,u),c=a?new q(...r.r).multiplyScalar(.001):new q(r.r[0]-Z_.x,r.r[1]-Z_.y,r.r[2]-Z_.z),l=o(n(r.r,i.r));c.project(eg),t.hidden=!(!s&&c.z<1&&c.z>-1&&Math.abs(c.x)<1&&Math.abs(c.y)<1&&(a||e.id===$.targetId&&l>120)),t.classList.toggle(`target`,e.id===$.targetId),t.style.left=(c.x*.5+.5)*innerWidth+`px`,t.style.top=(-c.y*.5+.5)*innerHeight+`px`}for(let t of $.ships){let n=ug.get(t.id),r=new q(...Zp(Yg.get(t.id)?.r,t.r,e)).multiplyScalar(.001).project(eg);n.hidden=!a||r.z>1,n.textContent=(t.id===i.id?`> `:``)+t.id.toUpperCase(),n.style.left=(r.x*.5+.5)*innerWidth+`px`,n.style.top=(-r.y*.5+.5)*innerHeight+`px`}let p=$.plan;if(a&&p){Y_.textContent=p.kind===`maneuver`?$.selected.plan===p?`COMMITTED MANEUVER`:`MANEUVER PREVIEW`:`PLANNED RENDEZVOUS`;let e=new q(...p.kind===`maneuver`?p.departureState.r:p.final.r).multiplyScalar(.001).project(eg);Y_.hidden=e.z>1,Y_.style.left=(e.x*.5+.5)*innerWidth+`px`,Y_.style.top=(-e.y*.5+.5)*innerHeight+22+`px`}else Y_.hidden=!0;for(let e of[...Kg.children,...s_.children])e.update();$_(a),P_(),Qh.render($h,eg)}function $_(e){let t=Q(`#map-leaders`);if(t.hidden=!e,!e){t.innerHTML=``;return}let n=[],r=[],i=[...ug.values(),Y_];for(let e of i){if(e.hidden)continue;let t=parseFloat(e.style.left),i=parseFloat(e.style.top),a=e.offsetWidth||120,o=e.offsetHeight||25,s=c(t,Math.min(300,innerWidth*.25)+a/2,innerWidth-Math.min(260,innerWidth*.24)-a/2),l=c(i,120,innerHeight-125);for(let e=0;e<12&&n.some(e=>Math.abs(s-e.x)<(a+e.w)/2+8&&Math.abs(l-e.y)<(o+e.h)/2+5);e++)l=c(i+(e%2?-1:1)*Math.ceil((e+1)/2)*32,120,innerHeight-125);n.push({x:s,y:l,w:a,h:o}),e.style.left=s+`px`,e.style.top=l+`px`,r.push(`<path d="M${t.toFixed(1)} ${i.toFixed(1)} L${s.toFixed(1)} ${l.toFixed(1)}"/><circle cx="${t.toFixed(1)}" cy="${i.toFixed(1)}" r="3"/>`)}t.innerHTML=r.join(``)}function ev(e){requestAnimationFrame(ev);let t=Math.min(.1,(e-Og)/1e3);if(Og=e,Rg){let e=1-Math.exp(-t*4);vg+=(Rg.yaw-vg)*e,yg+=(Rg.pitch-yg)*e,bg+=(Rg.zoom-bg)*e}let n=$.history.length;if(n!==Ng&&($.history.slice(Ng).some(e=>e.type===`cutoff`&&e.name===`Rendezvous`)&&m_(`flight`),Ng=n),_g&&gg!==`yard`){kg+=t;let e=0;for(;kg>=1/60&&e++<8;){for(let e of $.ships)Yg.set(e.id,{r:[...e.r],q:[...e.q],epoch:$.time,compression:e.suspension?.feet.map(e=>e.compression)});$.tick(1/60,F_()),kg-=1/60}}else kg=0;Q_($.paused?1:kg*60,e/1e3,t);let r=$.selected;qg.update(_g&&!$.paused&&r.visual?.main||0,_g&&!$.paused?Object.values(r.visual?.jets||{}).reduce((e,t)=>e+t,0):0),Ag+=t,Ag>.12&&(Ag=0,R_(),X_(),performance.now()>jg&&(Q(`#toast`).style.opacity=0)),Eg++,e-Dg>=750&&(Q(`#fps`).textContent=Math.round(Eg*1e3/(e-Dg))+` FPS`,Dg=e,Eg=0)}Object.defineProperty(window,"__orbital",{value:Object.freeze({get state(){return structuredClone({...$.snapshot(),view:gg,camera:{yaw:vg,pitch:yg,zoom:bg,mapYaw:Sg,mapPitch:Cg,mapZoom:wg,mode:zg,anchorId:Bg,worldPosition:eg.position.clone().add(Z_).toArray(),worldTarget:Z_.toArray(),followOffset:Array.from(Hg?.offset||[0,0,0]),worldQuaternion:eg.quaternion.toArray()},dock:$.docking(),surface:dm($.selected),exchangeAvailable:Cm.some(e=>wm($,e.id).available),stationService:fe($.targetId)?me($,$.targetId):null,blueprint:structuredClone(mg),render:{epoch:Ug,origin:Z_.toArray(),ships:Object.fromEntries([...cg].map(([e,t])=>[e,{position:t.group.position.toArray(),q:t.group.quaternion.toArray()}])),depots:Object.fromEntries([...lg].map(([e,t])=>[e,t.group.position.toArray()]))},renderer:{calls:Qh.info.render.calls,triangles:Qh.info.render.triangles,width:Zh.width,height:Zh.height,quality:Ig}})},get prediction(){let e=$.plan;return e?{missDistance:e.missDistance,consumed:e.consumed,nodes:structuredClone(e.nodes),final:{r:[...e.final.r],v:[...e.final.v],fuel:e.final.fuel}}:null}})}),l_(),u_(),R_(),requestAnimationFrame(ev);