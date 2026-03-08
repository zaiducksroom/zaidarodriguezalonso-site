/* ---------- SKY ---------- */

const sky = document.getElementById("sky");

for (let i = 0; i < 110; i++) {

let s = document.createElement("div");

s.className = "sky-star";

let d = Math.random();

s.style.left = Math.random() * 100 + "%";
s.style.top = Math.random() * 100 + "%";
s.style.animationDelay = Math.random()*6 + "s";

let size;

if(d > 0.85){
size = 3;
}else if(d > 0.6){
size = 2;
}else{
size = 1;
}

s.style.width = size + "px";
s.style.height = size + "px";

s.style.opacity = d * 0.8 + 0.2;

s.dataset.depth = Math.random();

sky.appendChild(s);

}


/* ---------- CENTER STAR BREATH ---------- */

const center = document.querySelector(".center");

if(center){

let scale = 1;
let direction = 1;
let glow = 0;

function pulse(){

scale += direction * 0.001;
glow += 0.015;

const light = 0.8 + Math.sin(glow) * 0.2;

center.style.textShadow = `
0 0 6px rgba(255,255,255,${light}),
0 0 18px rgba(235,230,255,${light}),
0 0 40px rgba(210,200,255,${light})
`;

if(scale > 1.1 || scale < 0.9){
direction *= -1;
}

center.style.transform =
`translate(-50%,-50%) scale(${scale})`;

requestAnimationFrame(pulse);

}

pulse();

}


/* ---------- SKY PARALLAX ---------- */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let smoothX = mouseX;
let smoothY = mouseY;

document.addEventListener("mousemove", (e) => {

mouseX = e.clientX;
mouseY = e.clientY;

});

function moveSky(){

smoothX += (mouseX - smoothX) * 0.03;
smoothY += (mouseY - smoothY) * 0.03;

const stars = document.querySelectorAll(".sky-star");

stars.forEach((star)=>{

const depth = star.dataset.depth;

const moveX = (smoothX - window.innerWidth/2) * depth * 0.01;
const moveY = (smoothY - window.innerHeight/2) * depth * 0.01;

star.style.transform =
`translate(${moveX}px, ${moveY}px)`;

});

requestAnimationFrame(moveSky);

}

moveSky();


/* ---------- CONSTELLATION ---------- */

const orbitStars = document.querySelectorAll(".star");

const lines = {

practice: document.getElementById("l1"),
projects: document.getElementById("l2"),
constellation: document.getElementById("l3"),
lab: document.getElementById("l4"),
about: document.getElementById("l5")

};


/* ---------- MICRO GRAVITY ---------- */

function applyGravity(){

orbitStars.forEach((star)=>{

const rect = star.getBoundingClientRect();

const sx = rect.left + rect.width/2;
const sy = rect.top + rect.height/2;

const dx = mouseX - sx;
const dy = mouseY - sy;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 180){

const force = (180 - dist) / 180;

const offsetX = dx * force * 0.05;
const offsetY = dy * force * 0.05;

star.style.transform =
`translate(-50%,-50%) translate(${offsetX}px, ${offsetY}px)`;

}else{

star.style.transform = "translate(-50%,-50%)";

}

});

requestAnimationFrame(applyGravity);

}

applyGravity();


/* ---------- VISITED STARS ---------- */

orbitStars.forEach(star => {

const page = star.dataset.page;

if(localStorage.getItem("visited-"+page)){

star.classList.add("visited");

if(lines[page]){
lines[page].classList.add("line-visible");
}

}

star.addEventListener("click", ()=>{

localStorage.setItem("visited-"+page,true);

});

});


/* ---------- REFRESH WHEN RETURN ---------- */

window.addEventListener("pageshow", () => {

orbitStars.forEach(star => {

const page = star.dataset.page;

if(localStorage.getItem("visited-"+page)){

star.classList.add("visited");

if(lines[page]){
lines[page].classList.add("line-visible");
}

}

});

});


/* ---------- CONSTELLATION COMPLETE ---------- */

function checkConstellation(){

let visitedCount = 0;

orbitStars.forEach(star=>{

const page = star.dataset.page;

if(localStorage.getItem("visited-"+page)){
visitedCount++;
}

});

if(visitedCount === orbitStars.length){

document.querySelector(".constellation")
.classList.add("complete");

}

}

checkConstellation();


/* ---------- LIVE CONNECTIONS ---------- */

const dynamicSVG = document.querySelector(".dynamic-lines");

function updateDynamicLines(){

if(!dynamicSVG) return;

dynamicSVG.innerHTML = "";

orbitStars.forEach(star=>{

const rect = star.getBoundingClientRect();

const sx = rect.left + rect.width/2;
const sy = rect.top + rect.height/2;

const dx = mouseX - sx;
const dy = mouseY - sy;

const dist = Math.sqrt(dx*dx + dy*dy);

if(dist < 120){

orbitStars.forEach(other=>{

if(other === star) return;

const r = other.getBoundingClientRect();

const ox = r.left + r.width/2;
const oy = r.top + r.height/2;

const d2 = Math.sqrt((ox-sx)**2 + (oy-sy)**2);

if(d2 < 200){

const line = document.createElementNS(
"http://www.w3.org/2000/svg",
"line"
);

line.setAttribute("x1",sx);
line.setAttribute("y1",sy);
line.setAttribute("x2",ox);
line.setAttribute("y2",oy);

line.style.opacity = .25;

dynamicSVG.appendChild(line);

}

});

}

});

requestAnimationFrame(updateDynamicLines);

}

updateDynamicLines();


/* ---------- STAR WAVE ---------- */

orbitStars.forEach(star=>{

star.addEventListener("mouseenter",()=>{

const rect = star.getBoundingClientRect();

const wave = document.createElement("div");

wave.className = "star-wave";

wave.style.left = rect.left + rect.width/2 + "px";
wave.style.top = rect.top + rect.height/2 + "px";

document.body.appendChild(wave);

setTimeout(()=>wave.remove(),1600);

});

});


/* ---------- COSMIC PORTAL ---------- */

const portal = document.querySelector(".center");

if(portal){

portal.addEventListener("click",(e)=>{

e.preventDefault();

document.body.classList.add("cosmic-collapse");

setTimeout(()=>{
window.location.href = "about.html";
},800);

});

}


/* ---------- TITLE STARLIGHT ---------- */

const title = document.querySelector("h1");

if(title){

document.addEventListener("mousemove",(e)=>{

const rect = title.getBoundingClientRect();

const dx = e.clientX - (rect.left + rect.width/2);
const dy = e.clientY - (rect.top + rect.height/2);

const dist = Math.sqrt(dx*dx + dy*dy);

const intensity = Math.max(0, 120 - dist) / 120;

const glow = 10 + intensity * 40;

title.style.textShadow = `
0 0 ${glow*0.4}px rgba(255,255,255,.8),
0 0 ${glow}px rgba(210,200,255,.6),
0 0 ${glow*2}px rgba(170,150,255,.4)
`;

});

}


/* ---------- SCROLL REVEAL ---------- */

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.classList.add("visible");
}

});

},{threshold:0.2});

reveals.forEach(el=>observer.observe(el));