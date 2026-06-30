const roles=["Computer Science Student","Software Developer","UI/UX Designer","AI Enthusiast"];
let i=0,j=0,d=false;
function type(){
let w=roles[i];
typing.textContent=w.substring(0,j);
if(!d){j++; if(j>w.length){d=true;setTimeout(type,1200);return;}}
else{j--; if(j==0){d=false;i=(i+1)%roles.length;}}
setTimeout(type,d?60:110);
} type();

function count(id,target){
let n=0; let t=setInterval(()=>{n++;document.getElementById(id).innerText=n;if(n>=target)clearInterval(t)},40);
}
count('p',5); count('c',9); count('t',10);

const skills=["HTML","CSS","JavaScript","React","Python","Java","Dart","MongoDB","MySQL","Express","C++"];
const wrap=document.querySelector(".skills-wrap");
skills.forEach((s,k)=>{
let d=document.createElement("div");
d.className="skill skill-text"; d.innerText=s;
wrap.appendChild(d);
let ang=(360/skills.length)*k;
setInterval(()=>{
let r=Math.min(wrap.clientWidth,wrap.clientHeight)*0.39;
let cx=wrap.clientWidth/2;
let cy=wrap.clientHeight/2;
let a=(Date.now()/55+ang)*Math.PI/180;
d.style.left=(cx+r*Math.cos(a))+"px";
d.style.top=(cy+r*Math.sin(a))+"px";
},20);
});

const logoSkills=[
{icon:"fa-brands fa-html5",label:"HTML5"},
{icon:"fa-brands fa-css3-alt",label:"CSS3"},
{icon:"fa-brands fa-js",label:"JavaScript"},
{icon:"fa-brands fa-react",label:"React"},
{icon:"fa-brands fa-python",label:"Python"},
{icon:"fa-brands fa-java",label:"Java"},
{icon:"fa-brands fa-android",label:"Android"},
{icon:"fa-brands fa-github",label:"GitHub"},
{icon:"fa-solid fa-database",label:"MongoDB"},
{icon:"fa-solid fa-server",label:"Express"},
{icon:"fa-solid fa-code",label:"C++"}
];
logoSkills.forEach((skill,k)=>{
let d=document.createElement("div");
d.className="skill skill-logo";
d.setAttribute("aria-label",skill.label);
d.innerHTML=`<i class="${skill.icon}"></i>`;
wrap.appendChild(d);
let ang=(360/logoSkills.length)*k;
setInterval(()=>{
let r=Math.min(wrap.clientWidth,wrap.clientHeight)*0.25;
let cx=wrap.clientWidth/2;
let cy=wrap.clientHeight/2;
let a=(-Date.now()/65+ang)*Math.PI/180;
d.style.left=(cx+r*Math.cos(a))+"px";
d.style.top=(cy+r*Math.sin(a))+"px";
},20);
});

const projectDetails={
"EduByte":{
description:"An educational learning platform project designed to make digital lessons easier to access and organize. It focuses on student-friendly navigation, learning content, and a clean interface for academic use.",
image:"assets/asset1.jpg"
},
"FireGuard":{
description:"A fire safety and monitoring concept that supports faster awareness during emergency situations. The project highlights alert-driven design, safety information, and practical use of technology for prevention and response.",
image:"assets/asset2.png"
},
"SK Resident Information System":{
description:"A resident records management system for SK or barangay use. It helps organize resident profiles, improve record lookup, and support more efficient community information management.",
image:"assets/asset3.jpg"
},
"Door Locking System":{
description:"A smart door locking project focused on secure access control. It demonstrates how hardware and software can work together to improve safety, convenience, and controlled entry.",
image:"assets/asset2.jpg"
},
"Portfolio Website":{
description:"A creative portfolio project centered on the thing that interests me most: arts. It presents artistic inspiration, visual style, and personal expression through a polished web experience.",
image:"assets/asset5.jpg",
link:"https://thefolioproject-7lod.vercel.app/home"
}
};

function openModal(t){
let project=projectDetails[t]||{};
mt.innerText=t;
md.innerText=project.description||"Project details will be added soon.";
mi.onerror=()=>{mi.style.display="none"};
mi.src=project.image||"";
mi.alt=t+" screenshot";
mi.style.display=project.image?"block":"none";
ml.href=project.link||"#";
ml.style.display=project.link?"inline-block":"none";
modal.style.display='flex';
}
function closeModal(){modal.style.display='none'}

const floatText=document.querySelector('.scroll-float-text');
function updateFloatText(){
if(!floatText) return;
const offset=window.scrollY*0.18;
floatText.style.transform=`translateY(calc(-50% + ${offset}px)) rotate(180deg)`;
}
window.addEventListener('scroll',updateFloatText,{passive:true});
updateFloatText();

// Section reveal on scroll
const revealObserver=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add('is-visible');
revealObserver.unobserve(entry.target);
}
});
},{threshold:0.15});
document.querySelectorAll('.reveal-section').forEach(section=>revealObserver.observe(section));

// Project filtering
const filterButtons=document.querySelectorAll('.filter-pill');
const projectFolders=document.querySelectorAll('.project-folder');
filterButtons.forEach(button=>{
button.addEventListener('click',()=>{
const filter=button.dataset.filter;
filterButtons.forEach(item=>item.classList.toggle('active', item===button));
projectFolders.forEach(folder=>{
const categories=(folder.dataset.categories||'').split(',').map(value=>value.trim()).filter(Boolean);
const shouldShow=filter==='all' || categories.includes(filter);
folder.classList.toggle('is-hidden', !shouldShow);
});
});
});

// Pill nav active state on scroll
const navLinks=document.querySelectorAll('#pillnav a');
const sections=[...navLinks].map(a=>document.querySelector(a.getAttribute('href')));
function updateActive(){
let pos=window.scrollY+window.innerHeight*0.35;
let current=sections[0];
sections.forEach(s=>{ if(s && s.offsetTop<=pos) current=s; });
navLinks.forEach(a=>{
a.classList.toggle('active', document.querySelector(a.getAttribute('href'))===current);
});
}
window.addEventListener('scroll',updateActive);
updateActive();

navLinks.forEach(a=>{
a.addEventListener('click',e=>{
e.preventDefault();
document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
});
});

const canvas=document.getElementById("bg"),ctx=canvas.getContext("2d");
function resize(){canvas.width=innerWidth;canvas.height=innerHeight} resize(); onresize=resize;

const mouse={x:innerWidth/2,y:innerHeight/2,active:false};
document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;mouse.active=true});
document.addEventListener('mouseleave',()=>mouse.active=false);

const COUNT=Math.min(110,Math.floor(innerWidth*innerHeight/14000));
let pts=[...Array(COUNT)].map(()=>({
x:Math.random()*innerWidth,
y:Math.random()*innerHeight,
vx:(Math.random()-0.5)*0.4,
vy:(Math.random()-0.5)*0.4,
r:Math.random()*1.8+1
}));

(function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

pts.forEach(p=>{
p.x+=p.vx; p.y+=p.vy;
if(p.x<0||p.x>innerWidth)p.vx*=-1;
if(p.y<0||p.y>innerHeight)p.vy*=-1;

// gentle repulsion from cursor
if(mouse.active){
let dx=p.x-mouse.x, dy=p.y-mouse.y;
let dist=Math.sqrt(dx*dx+dy*dy);
if(dist<140){
let f=(140-dist)/140;
p.x+=(dx/dist)*f*2.5;
p.y+=(dy/dist)*f*2.5;
}
}

ctx.beginPath();
ctx.fillStyle="rgba(180,151,207,.85)";
ctx.arc(p.x,p.y,p.r,0,7);
ctx.fill();
});

// connecting lines between nearby particles
for(let i=0;i<pts.length;i++){
for(let j=i+1;j<pts.length;j++){
let dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);
if(dist<120){
ctx.strokeStyle=`rgba(255,159,252,${(1-dist/120)*0.25})`;
ctx.lineWidth=1;
ctx.beginPath();
ctx.moveTo(pts[i].x,pts[i].y);
ctx.lineTo(pts[j].x,pts[j].y);
ctx.stroke();
}
}
// link to cursor too
if(mouse.active){
let dx=pts[i].x-mouse.x, dy=pts[i].y-mouse.y;
let dist=Math.sqrt(dx*dx+dy*dy);
if(dist<160){
ctx.strokeStyle=`rgba(255,255,255,${(1-dist/160)*0.35})`;
ctx.lineWidth=1;
ctx.beginPath();
ctx.moveTo(pts[i].x,pts[i].y);
ctx.lineTo(mouse.x,mouse.y);
ctx.stroke();
}
}
}

requestAnimationFrame(animate);
})();

document.onmousemove=e=>{
glow.style.left=(e.clientX-150)+'px';
glow.style.top=(e.clientY-150)+'px';
}

// Spotlight effect on cards
document.querySelectorAll('.card').forEach(c=>{
c.addEventListener('mousemove',e=>{
let r=c.getBoundingClientRect();
c.style.setProperty('--mx',(e.clientX-r.left)+'px');
c.style.setProperty('--my',(e.clientY-r.top)+'px');
});
});

// 3D tilt on cards and project folders
document.querySelectorAll('.card, .project-folder').forEach(item=>{
item.addEventListener('mousemove',e=>{
const rect=item.getBoundingClientRect();
const px=(e.clientX-rect.left)/rect.width-0.5;
const py=(e.clientY-rect.top)/rect.height-0.5;
item.style.setProperty('--ry',(px*10)+'deg');
item.style.setProperty('--rx',(-py*10)+'deg');
item.style.setProperty('--mx',(e.clientX-rect.left)+'px');
item.style.setProperty('--my',(e.clientY-rect.top)+'px');
});
item.addEventListener('mouseleave',()=>{
item.style.setProperty('--ry','0deg');
item.style.setProperty('--rx','0deg');
});
});

document.querySelectorAll('.project-folder').forEach(folder=>{
folder.addEventListener('mousemove',e=>{
const rect=folder.getBoundingClientRect();
folder.style.transform=`translateY(-8px) rotateX(${-((e.clientY-rect.top)/rect.height-0.5)*8}deg) rotateY(${((e.clientX-rect.left)/rect.width-0.5)*8}deg)`;
});
folder.addEventListener('mouseleave',()=>{
folder.style.transform='translateY(0) rotateX(0deg) rotateY(0deg)';
});
});

// Magnetic button
document.querySelectorAll('.btn').forEach(b=>{
b.addEventListener('mousemove',e=>{
let r=b.getBoundingClientRect();
let mx=(e.clientX-r.left-r.width/2)*0.3;
let my=(e.clientY-r.top-r.height/2)*0.3;
b.style.transform=`translate(${mx}px, ${my}px)`;
});
b.addEventListener('mouseleave',()=>{b.style.transform='translate(0,0)'});
});

// Subtle float for hero card accent motion
const heroCard=document.querySelector('.hero .card');

// About: education toggle
const eduBtn=document.querySelector('.edu-toggle');
const eduDetails=eduBtn ? document.getElementById('edu-details') : null;
if(eduBtn && eduDetails){
  eduBtn.addEventListener('click',()=>{
    const isHidden = eduDetails.hasAttribute('hidden');
    if(isHidden){
      eduDetails.removeAttribute('hidden');
      eduBtn.setAttribute('aria-expanded','true');
    } else {
      eduDetails.setAttribute('hidden','');
      eduBtn.setAttribute('aria-expanded','false');
    }
  });
}

const messageBox=document.getElementById('message');
const messageCount=document.getElementById('message-count');
if(messageBox && messageCount){
  const updateMessageCount=()=>{
    messageCount.textContent=`${messageBox.value.length} / ${messageBox.maxLength || 5000}`;
  };
  messageBox.addEventListener('input',updateMessageCount);
  updateMessageCount();
}

if(heroCard){
heroCard.addEventListener('mousemove',e=>{
const rect=heroCard.getBoundingClientRect();
const x=(e.clientX-rect.left)/rect.width-0.5;
const y=(e.clientY-rect.top)/rect.height-0.5;
heroCard.style.transform=`translateY(0) perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
});
heroCard.addEventListener('mouseleave',()=>{
heroCard.style.transform='translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)';
});
}
