/* ======================================
COSMOS ENGINE
shared by portfolio / WITH / room
====================================== */


/* ---------- SKY GENERATOR ---------- */

function createSky(){

const sky = document.getElementById("sky");
if(!sky) return;

for(let i=0;i<110;i++){

let star=document.createElement("div");

let d=Math.random();

let layer="far";

if(d>0.85) layer="near";
else if(d>0.6) layer="mid";

star.className="sky-star "+layer;

star.style.left=Math.random()*100+"%";
star.style.top=Math.random()*100+"%";

let size=1;

if(d>0.92) size=3;
else if(d>0.7) size=2;

star.style.width=size+"px";
star.style.height=size+"px";

let depth=.04;

if(layer==="mid") depth=.12;
if(layer==="near") depth=.25;

star.dataset.depth=depth;

sky.appendChild(star);

}

}


/* ---------- SKY PARALLAX ---------- */

let mouseX=window.innerWidth/2;
let mouseY=window.innerHeight/2;

let smoothX=mouseX;
let smoothY=mouseY;

document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;
mouseY=e.clientY;

});


function moveSky(){

smoothX+=(mouseX-smoothX)*0.03;
smoothY+=(mouseY-smoothY)*0.03;

document.querySelectorAll(".sky-star").forEach(star=>{

const depth=star.dataset.depth;

const moveX=(smoothX-window.innerWidth/2)*depth*0.08;
const moveY=(smoothY-window.innerHeight/2)*depth*0.01;

star.style.transform=
`translate(${moveX}px,${moveY}px)`;

});

requestAnimationFrame(moveSky);

}


/* ---------- MICRO GRAVITY ---------- */

function applyGravity(selector=".orbit-star"){

const stars=document.querySelectorAll(selector);

function update(){

stars.forEach(star=>{

const rect=star.getBoundingClientRect();

const sx=rect.left+rect.width/2;
const sy=rect.top+rect.height/2;

const dx=mouseX-sx;
const dy=mouseY-sy;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<180){

const force=(180-dist)/180;

const offsetX=dx*force*0.08;
const offsetY=dy*force*0.08;

star.style.transform=
`translate(${offsetX}px,${offsetY}px)`;

}else{

star.style.transform="translate(0,0)";

}

});

requestAnimationFrame(update);

}

update();

}


/* ---------- DYNAMIC CONNECTIONS ---------- */

function dynamicConnections(){

const svg=document.querySelector(".dynamic-lines");
if(!svg) return;

const stars=document.querySelectorAll(".orbit-star");

function update(){

svg.innerHTML="";

stars.forEach(star=>{

const rect=star.getBoundingClientRect();

const sx=rect.left+rect.width/2;
const sy=rect.top+rect.height/2;

const dx=mouseX-sx;
const dy=mouseY-sy;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<140){

stars.forEach(other=>{

if(other===star) return;

const r=other.getBoundingClientRect();

const ox=r.left+r.width/2;
const oy=r.top+r.height/2;

const d2=Math.sqrt((ox-sx)**2+(oy-sy)**2);

if(d2<220){

const line=document.createElementNS(
"http://www.w3.org/2000/svg","line"
);

line.setAttribute("x1",sx);
line.setAttribute("y1",sy);
line.setAttribute("x2",ox);
line.setAttribute("y2",oy);

line.style.opacity=.25;

svg.appendChild(line);

}

});

}

});

requestAnimationFrame(update);

}

update();

}


/* ---------- INIT ---------- */

function initCosmos(){

createSky();
moveSky();

}


/* expose */

window.Cosmos={
init:initCosmos,
gravity:applyGravity,
connections:dynamicConnections
};