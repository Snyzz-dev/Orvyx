/* === CONFIG : modifie ces liens === */
const INVITE_URL="https://discord.com/oauth2/authorize?client_id=1560898301459693679";
const SUPPORT_URL="mailto:snyzzoff@gmail.com";
document.querySelectorAll("[data-invite]").forEach(a=>a.href=INVITE_URL);
document.querySelectorAll("[data-support]").forEach(a=>a.href=SUPPORT_URL);
/* nav */
const nav=document.querySelector("nav");
addEventListener("scroll",()=>nav.classList.toggle("sc",scrollY>20),{passive:true});
document.querySelector(".burger").onclick=()=>document.querySelector(".links").classList.toggle("o");
document.querySelectorAll(".links a").forEach(a=>a.addEventListener("click",()=>document.querySelector(".links").classList.remove("o")));
/* champ d'étoiles */
const c=document.getElementById("stars"),x=c.getContext("2d");let W,H,S=[],mx=0,my=0;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;S=Array.from({length:Math.min(220,W/6)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,t:Math.random()*6}))}
rs();addEventListener("resize",rs);addEventListener("mousemove",e=>{mx=e.clientX/W-.5;my=e.clientY/H-.5});
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
(function f(){x.clearRect(0,0,W,H);for(const s of S){s.t+=.02;s.y-=s.z*.12;if(s.y<0)s.y=H;
x.globalAlpha=(.35+.65*Math.abs(Math.sin(s.t)))*s.z;x.fillStyle="#fff";
x.fillRect(s.x-mx*s.z*30,s.y-my*s.z*30,s.z*1.8,s.z*1.8)}
if(!still)requestAnimationFrame(f)})();
/* révélation au scroll + compteurs */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("v");
const n=e.target.querySelectorAll("[data-n]");n.forEach(b=>{const t=+b.dataset.n,s=performance.now();
(function u(now){const p=Math.min((now-s)/1800,1);b.textContent=Math.floor(t*(1-Math.pow(1-p,3))).toLocaleString("fr-FR")+(b.dataset.s||"");if(p<1)requestAnimationFrame(u)})(s)});
io.unobserve(e.target)}),{threshold:.2});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
/* spotlight cartes */
document.querySelectorAll(".f").forEach(el=>el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect();
el.style.setProperty("--x",e.clientX-r.left+"px");el.style.setProperty("--y",e.clientY-r.top+"px")}));
/* onglets commandes */
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
document.querySelectorAll(".tabs button,.cmds").forEach(e=>e.classList.remove("on"));
b.classList.add("on");document.getElementById(b.dataset.t).classList.add("on")});
