/* =========================================================
WITH STUDIO — MASTER SCRIPT
========================================================= */


/* ---------- SKY GENERATOR ---------- */

const sky = document.getElementById("sky");

if(sky){

for(let i=0;i<110;i++){

let s = document.createElement("div");

let d = Math.random();

let layer;

if(d > 0.85){
layer = "sky-star near";
}else if(d > 0.6){
layer = "sky-star mid";
}else{
layer = "sky-star far";
}

s.className = layer;

s.style.left = Math.random()*100 + "%";
s.style.top = Math.random()*100 + "%";

let size;

if(d > 0.92){
size = 3;
}else if(d > 0.7){
size = 2;
}else{
size = 1;
}

s.style.width = size + "px";
s.style.height = size + "px";

/* depth */

let depth;

if(layer.includes("near")){
depth = 0.25;
}else if(layer.includes("mid")){
depth = 0.12;
}else{
depth = 0.04;
}

s.dataset.depth = depth;

sky.appendChild(s);

}

}

/* ---------- SKY CONSTELLATIONS ---------- */

const skyLines = document.getElementById("sky-lines");

function createSkyConstellations(){

if(!skyLines) return;

const stars = document.querySelectorAll(".sky-star");

stars.forEach(star=>{

if(Math.random()<0.03){

const rect1 = star.getBoundingClientRect();

const x1 = rect1.left + rect1.width/2;
const y1 = rect1.top + rect1.height/2;

const other = stars[Math.floor(Math.random()*stars.length)];

const rect2 = other.getBoundingClientRect();

const x2 = rect2.left + rect2.width/2;
const y2 = rect2.top + rect2.height/2;

const dist = Math.hypot(x2-x1,y2-y1);

if(dist < 250){

const line = document.createElementNS(
"http://www.w3.org/2000/svg","line"
);

line.setAttribute("x1",x1);
line.setAttribute("y1",y1);
line.setAttribute("x2",x2);
line.setAttribute("y2",y2);

skyLines.appendChild(line);

setTimeout(()=>line.remove(),8000);

}

}

});

}

setInterval(createSkyConstellations,6000);


/* ---------- SKY PARALLAX ---------- */

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

let smoothX = mouseX;
let smoothY = mouseY;

document.addEventListener("mousemove",(e)=>{

mouseX = e.clientX;
mouseY = e.clientY;

});

function moveSky(){

smoothX += (mouseX-smoothX)*0.03;
smoothY += (mouseY-smoothY)*0.03;

document.querySelectorAll(".sky-star").forEach(star=>{

const depth = star.dataset.depth;

const moveX = (smoothX-window.innerWidth/2)*depth*0.08;
const moveY = (smoothY-window.innerHeight/2)*depth*0.01;

star.style.transform =
`translate(${moveX}px, ${moveY}px)`;

});

requestAnimationFrame(moveSky);

}

moveSky();

/* =========================================================
HOME CONSTELLATION
========================================================= */

const orbitStars = document.querySelectorAll(".star");

const lines = {

practice: document.getElementById("l1"),
projects: document.getElementById("l2"),
constellation: document.getElementById("l3"),
lab: document.getElementById("l4"),
about: document.getElementById("l5")

};


/* ---------- MARK VISITED ---------- */

orbitStars.forEach(star=>{

const page = star.dataset.page;

if(sessionStorage.getItem("visited-"+page)){

star.classList.add("visited");

if(lines[page]){
lines[page].classList.add("line-visible");
}

}

});

orbitStars.forEach(star=>{

const page = star.dataset.page;

star.addEventListener("click",()=>{

sessionStorage.setItem("visited-"+page,"true");

});

});


/* ---------- RETURN VISIT ---------- */

window.addEventListener("pageshow",()=>{

orbitStars.forEach(star=>{

const page = star.dataset.page;

if(sessionStorage.getItem("visited-"+page)){

star.classList.add("visited");

if(lines[page]){
lines[page].classList.add("line-visible");
}

}

});

});


/* ---------- CONSTELLATION COMPLETE ---------- */

function checkConstellation(){

if(!orbitStars.length) return;

let visited = 0;

orbitStars.forEach(star=>{

const page = star.dataset.page;

if(sessionStorage.getItem("visited-"+page)){
visited++;
}

});

if(visited === orbitStars.length){

const c = document.querySelector(".constellation");

if(c) c.classList.add("complete");

}

}

checkConstellation();


/* =========================================================
MICRO GRAVITY
========================================================= */

function applyGravity(){

orbitStars.forEach(star=>{

const rect = star.getBoundingClientRect();

const sx = rect.left + rect.width/2;
const sy = rect.top + rect.height/2;

const dx = mouseX - sx;
const dy = mouseY - sy;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 180){

const force = (180-dist)/180;


const offsetX = dx*force*0.08;
const offsetY = dy*force*0.08;


star.style.transform =
`translate(-50%,-50%) translate(${offsetX}px,${offsetY}px)`;

}else{

star.style.transform="translate(-50%,-50%)";

}

});

requestAnimationFrame(applyGravity);

}

applyGravity();


/* =========================================================
DYNAMIC STAR CONNECTIONS
========================================================= */

const dynamicSVG = document.querySelector(".dynamic-lines");

function updateDynamicLines(){

if(!dynamicSVG) return;

dynamicSVG.innerHTML="";

orbitStars.forEach(star=>{

const rect = star.getBoundingClientRect();

const sx = rect.left + rect.width/2;
const sy = rect.top + rect.height/2;

const dx = mouseX - sx;
const dy = mouseY - sy;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist<120){

orbitStars.forEach(other=>{

if(other===star) return;

const r = other.getBoundingClientRect();

const ox = r.left + r.width/2;
const oy = r.top + r.height/2;

const d2 = Math.sqrt((ox-sx)**2 + (oy-sy)**2);

if(d2<200){

const line = document.createElementNS(
"http://www.w3.org/2000/svg","line"
);

line.setAttribute("x1",sx);
line.setAttribute("y1",sy);
line.setAttribute("x2",ox);
line.setAttribute("y2",oy);

line.style.opacity=.25;

dynamicSVG.appendChild(line);

}

});

}

});

requestAnimationFrame(updateDynamicLines);

}

updateDynamicLines();


/* =========================================================
CENTER STAR PORTAL
========================================================= */

const portal = document.querySelector(".center");

if(portal){

portal.addEventListener("click",(e)=>{

e.preventDefault();

document.body.classList.add("cosmic-collapse");

setTimeout(()=>{

window.location.href="about.html";

},800);

});

}


/* =========================================================
SCROLL REVEAL
========================================================= */

const reveals = document.querySelectorAll(".reveal");

if(reveals.length){

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.classList.add("visible");
}

});

},{threshold:0.2});

reveals.forEach(el=>observer.observe(el));

}


/* =========================================================
PROJECT CONSTELLATION COMPLETE
========================================================= */

function checkProjectsComplete(){

const quiet = localStorage.getItem("visited_quietmuseum");
const farra = localStorage.getItem("visited_farra");
const withside = localStorage.getItem("visited_withside");
const zaiduck = localStorage.getItem("visited_zaiducksroom");

if(
quiet==="true" &&
farra==="true" &&
withside==="true" &&
zaiduck==="true"
){

document.body.classList.add("constellation-complete");

const msg = document.getElementById("constellation-message");

if(msg){
msg.style.opacity = ".8";
}

}

}

checkProjectsComplete();

/* ---------- PROJECT STARS VISITED ---------- */

const projectStars = document.querySelectorAll(".project-star");

projectStars.forEach(star => {

const href = star.getAttribute("href");

if(localStorage.getItem("visited_"+href)){

star.classList.add("visited");

}

star.addEventListener("click", () => {

localStorage.setItem("visited_"+href, "true");

});

});