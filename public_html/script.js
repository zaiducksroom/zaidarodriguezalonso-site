/* ---------- SKY BACKGROUND ---------- */

const sky = document.getElementById("sky");

for (let i = 0; i < 170; i++) {

let s = document.createElement("div");
s.className = "sky-star";

let d = Math.random();

s.style.left = Math.random() * 100 + "%";
s.style.top = Math.random() * 100 + "%";

let size = d * 2 + 0.6;

s.style.width = size + "px";
s.style.height = size + "px";
s.style.opacity = d * 0.8 + .2;

sky.appendChild(s);

}

setTimeout(()=>{
document.body.classList.add("ready")
},300);



/* ---------- LANGUAGE ---------- */

let lang = localStorage.getItem("lang");

if(!lang){

const browserLang = navigator.language;
lang = browserLang.startsWith("es") ? "es" : "en";
localStorage.setItem("lang",lang);

}

document.querySelectorAll(".lang span").forEach(b=>{

if(b.dataset.lang===lang) b.classList.add("active");

b.onclick=()=>{
localStorage.setItem("lang",b.dataset.lang);
location.reload();
};

});



/* ---------- TEXT ---------- */

const txt = {

en:{
headline:"Exploring how humans experience digital spaces.",
role:"UX / Product Designer",
availability:"Designing calm digital systems, cultural interfaces and experimental UX environments.",
scroll1:"view UX projects ↓",
scroll2:"about the studio ↓",
constellationNote:"UX projects orbiting a practice of calm digital systems.",

aboutTitle:"About",

about1:"I design digital experiences that explore how humans perceive and inhabit digital spaces.",

about2:"My work focuses on calm digital systems, cultural interfaces and experimental UX environments.",

about3:"Through projects like The Quiet Museum, FARRA and Zaiduck’s Room I investigate how interaction design can shape perception, emotion and presence in digital environments."
},

es:{
headline:"Explorando cómo las personas experimentan los espacios digitales.",
role:"Diseñadora UX / Product Designer",
availability:"Diseñando sistemas digitales calmados, interfaces culturales y experiencias UX experimentales.",
scroll1:"ver proyectos UX ↓",
scroll2:"sobre el estudio ↓",
constellationNote:"Proyectos UX orbitando una práctica de sistemas digitales calmados.",

aboutTitle:"Sobre el estudio",

about1:"Diseño experiencias digitales que exploran cómo las personas perciben y habitan los espacios digitales.",

about2:"Mi trabajo se centra en sistemas digitales calmados, interfaces culturales y entornos UX experimentales.",

about3:"A través de proyectos como The Quiet Museum, FARRA y Zaiduck’s Room investigo cómo el diseño de interacción puede moldear la percepción, la emoción y la presencia en entornos digitales."
}

};

document.getElementById("headline").textContent = txt[lang].headline;
document.getElementById("role").textContent = txt[lang].role;
document.getElementById("availability").textContent = txt[lang].availability;
document.getElementById("scroll1").textContent = txt[lang].scroll1;
document.getElementById("scroll2").textContent = txt[lang].scroll2;
document.getElementById("constellation-note").textContent = txt[lang].constellationNote;

document.getElementById("aboutTitle").textContent = txt[lang].aboutTitle;
document.getElementById("about1").textContent = txt[lang].about1;
document.getElementById("about2").textContent = txt[lang].about2;
document.getElementById("about3").textContent = txt[lang].about3;



/* ---------- NAVIGATION ---------- */

function go(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

scroll1.onclick=()=>go("constellation");
scroll2.onclick=()=>go("about");



/* ---------- STAR REFERENCES ---------- */

const star=document.getElementById("star");

const quiet=document.getElementById("quiet");
const farra=document.getElementById("farra");
const room=document.getElementById("room");
const withStar=document.getElementById("with");

const first=document.getElementById("first");
const waiting=document.getElementById("waiting");

const withNode=document.getElementById("withnode");



/* ---------- LABEL REFERENCES ---------- */

const labelQuiet=document.getElementById("label-quiet");
const labelFarra=document.getElementById("label-farra");
const labelRoom=document.getElementById("label-room");
const labelWith=document.getElementById("label-with");

const labelFirst=document.getElementById("label-first");
const labelWaiting=document.getElementById("label-waiting");
const labelWithNode=document.getElementById("label-withnode");



/* ---------- STAR NAVIGATION ---------- */

star.onclick=()=>{
window.location.href="projects.html#projects";
};

quiet.onclick=()=>{
window.location.href="projects.html#quiet";
};

farra.onclick=()=>{
window.location.href="projects.html#farra";
};

room.onclick=()=>{
window.location.href="projects.html#room";
};

withStar.onclick=()=>{
window.location.href="projects.html#with";
};

first.onclick=()=>{
window.location.href="projects.html#first";
};

waiting.onclick=()=>{
window.location.href="projects.html#waiting";
};



/* ---------- LABEL NAVIGATION ---------- */

labelQuiet.onclick=quiet.onclick;
labelFarra.onclick=farra.onclick;
labelRoom.onclick=room.onclick;
labelWith.onclick=withStar.onclick;

labelFirst.onclick=first.onclick;
labelWaiting.onclick=waiting.onclick;



/* ---------- LABEL POSITIONING ---------- */

function updateLabels(){

function follow(star,label){

const r=star.getBoundingClientRect();
const c=document.getElementById("constellation").getBoundingClientRect();

label.style.left=(r.left-c.left-label.offsetWidth/2)+"px";
label.style.top=(r.top-c.top-14)+"px";

}

follow(quiet,labelQuiet);
follow(farra,labelFarra);
follow(room,labelRoom);
follow(withStar,labelWith);

follow(first,labelFirst);
follow(waiting,labelWaiting);

follow(withNode,labelWithNode);

}



/* ---------- CONSTELLATION LINES ---------- */

function connectStars(lineId,starA,starB){

const line=document.getElementById(lineId);

const a=document.getElementById(starA).getBoundingClientRect();
const b=document.getElementById(starB).getBoundingClientRect();

const c=document.getElementById("constellation").getBoundingClientRect();

const ax=a.left+a.width/2-c.left;
const ay=a.top+a.height/2-c.top;

const bx=b.left+b.width/2-c.left;
const by=b.top+b.height/2-c.top;

const dx=bx-ax;
const dy=by-ay;

const dist=Math.sqrt(dx*dx+dy*dy);
const angle=Math.atan2(dy,dx)*180/Math.PI;

line.style.width=dist+"px";
line.style.left=ax+"px";
line.style.top=ay+"px";
line.style.transform=`rotate(${angle}deg)`;

}

function drawConstellation(){

connectStars("line1","star","quiet");
connectStars("line2","star","farra");
connectStars("line3","star","room");
connectStars("line4","star","with");

connectStars("line5","star","first");
connectStars("line6","star","waiting");

}



/* ---------- CURSOR MICRO GRAVITY ---------- */

let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;

document.addEventListener("mousemove",(e)=>{
mouseX=e.clientX;
mouseY=e.clientY;
});

function applyGravity(star,x,y){

const rect=star.getBoundingClientRect();

const sx=rect.left+rect.width/2;
const sy=rect.top+rect.height/2;

const dx=mouseX-sx;
const dy=mouseY-sy;

const dist=Math.sqrt(dx*dx+dy*dy);

if(dist<200){

const force=(200-dist)/200;

x+=dx*force*0.03;
y+=dy*force*0.03;

}

return{x,y};

}



/* ---------- ORBIT SYSTEM ---------- */

const orbitStars = [
{el: quiet, r: 12, speed:1},
{el: farra, r: 15, speed:1},
{el: room, r: 18, speed:1},
{el: withStar, r: 16, speed:0.7},
{el: first, r: 14, speed:1},
{el: waiting, r: 16, speed:1}
];

let orbitAngle=0;

function orbitMotion(){

orbitAngle += 0.0006;

orbitStars.forEach((s,i)=>{

const angle = orbitAngle * s.speed + i;

let x = Math.cos(angle) * s.r;
let y = Math.sin(angle) * s.r;

const g = applyGravity(s.el,x,y);

x = g.x;
y = g.y;

s.el.style.transform=`translate(${x}px, ${y}px)`;

});

updateLabels();
drawConstellation();

requestAnimationFrame(orbitMotion);

}

orbitMotion();



/* ---------- MINI STARS APPEAR ---------- */

setTimeout(()=>{

first.style.opacity=1;
waiting.style.opacity=1;
withNode.style.opacity=.7;

},1200);



/* ---------- WITH MINI ORBIT ---------- */

let withOrbitAngle=0;

function withMiniOrbit(){

withOrbitAngle+=0.002;

const r=8;

const x=Math.cos(withOrbitAngle)*r;
const y=Math.sin(withOrbitAngle)*r;

withNode.style.transform=`translate(${x}px, ${y}px)`;

requestAnimationFrame(withMiniOrbit);

}

withMiniOrbit();



/* ---------- TOP BUTTON ---------- */

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>600){
topBtn.style.display="block";
}else{
topBtn.style.display="none";
}

});

topBtn.onclick=()=>{
document.getElementById("hero").scrollIntoView({behavior:"smooth"});
};



/* ---------- ACTIVATE LINES ---------- */

window.addEventListener("load",()=>{

setTimeout(()=>{
document.querySelectorAll(".constellation-line")
.forEach(line=>line.classList.add("active"));
},600);

});