/* === CONFIG : modifie ces liens === */
const INVITE_URL="https://discord.com/oauth2/authorize?client_id=1560898301459693679";
const SUPPORT_URL="mailto:snyzzoff@gmail.com";
document.querySelectorAll("[data-invite]").forEach(a=>a.href=INVITE_URL);
document.querySelectorAll("[data-support]").forEach(a=>a.href=SUPPORT_URL);
const still=matchMedia("(prefers-reduced-motion:reduce)").matches;
const touch=matchMedia("(hover:none)").matches;
/* nav + barre de progression */
const nav=document.querySelector("nav");
const prog=document.createElement("div");prog.id="prog";document.body.appendChild(prog);
function onScroll(){
  if(nav)nav.classList.toggle("sc",scrollY>20);
  const m=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform="scaleX("+(m>0?scrollY/m:0)+")";
}
addEventListener("scroll",onScroll,{passive:true});onScroll();
const burger=document.querySelector(".burger"),links=document.querySelector(".links");
if(burger&&links){burger.onclick=()=>links.classList.toggle("o");
links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("o")))}
/* lueur qui suit le curseur */
let mx=0,my=0,gx=innerWidth/2,gy=innerHeight/2,px=0,py=0;
const glow=document.createElement("div");glow.id="glow";document.body.appendChild(glow);
addEventListener("mousemove",e=>{px=e.clientX;py=e.clientY;mx=px/innerWidth-.5;my=py/innerHeight-.5;glow.classList.add("on")});
/* champ d'étoiles : parallaxe, liaisons près du curseur, étoiles filantes */
const c=document.getElementById("stars"),x=c&&c.getContext("2d");let W,H,S=[],SH=[];
function rs(){if(!c)return;W=c.width=innerWidth;H=c.height=innerHeight;
S=Array.from({length:Math.min(260,W/5)},()=>({x:Math.random()*W,y:Math.random()*H,z:Math.random()*.9+.1,t:Math.random()*6}))}
rs();addEventListener("resize",rs);
const orb=document.querySelector(".orb");
function frame(){
  gx+=(px-gx)*.08;gy+=(py-gy)*.08;glow.style.transform="translate3d("+gx+"px,"+gy+"px,0)";
  if(!x)return;
  x.clearRect(0,0,W,H);
  for(const s of S){
    s.t+=.02;s.y-=s.z*.12;if(s.y<0)s.y=H;
    const sx=s.x-mx*s.z*30,sy=s.y-my*s.z*30;
    x.globalAlpha=(.35+.65*Math.abs(Math.sin(s.t)))*s.z;x.fillStyle="#fff";
    x.fillRect(sx,sy,s.z*1.8,s.z*1.8);
    const dx=sx-px,dy=sy-py,d=Math.hypot(dx,dy);
    if(d<130&&s.z>.4){x.globalAlpha=(1-d/130)*.5;x.strokeStyle="#fff";x.lineWidth=.6;x.beginPath();x.moveTo(sx,sy);x.lineTo(px,py);x.stroke()}
  }
  if(Math.random()<.006&&SH.length<2)SH.push({x:Math.random()*W,y:Math.random()*H*.5,l:0,v:9+Math.random()*6});
  for(let i=SH.length-1;i>=0;i--){const q=SH[i];q.x+=q.v;q.y+=q.v*.5;q.l++;
    const g=x.createLinearGradient(q.x,q.y,q.x-90,q.y-45);g.addColorStop(0,"rgba(255,255,255,.9)");g.addColorStop(1,"rgba(255,255,255,0)");
    x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=1.6;x.beginPath();x.moveTo(q.x,q.y);x.lineTo(q.x-90,q.y-45);x.stroke();
    if(q.l>70)SH.splice(i,1)}
  x.globalAlpha=1;
  if(!still)requestAnimationFrame(frame);
}
frame();
/* révélation au scroll + compteurs */
document.querySelectorAll(".feat").forEach(g=>g.querySelectorAll(".f").forEach((f,i)=>{f.classList.add("rv");f.style.setProperty("--d",(i%3)*.12+"s")}));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("v");
const n=e.target.querySelectorAll("[data-n]");n.forEach(b=>{const t=+b.dataset.n,s=performance.now();
(function u(now){const p=Math.min((now-s)/1800,1);b.textContent=Math.floor(t*(1-Math.pow(1-p,3))).toLocaleString("fr-FR")+(b.dataset.s||"");if(p<1)requestAnimationFrame(u)})(s)});
io.unobserve(e.target)}),{threshold:0,rootMargin:"0px 0px -6% 0px"});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
/* cartes : projecteur + inclinaison 3D */
document.querySelectorAll(".f").forEach(el=>{
  el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),a=(e.clientX-r.left)/r.width-.5,b=(e.clientY-r.top)/r.height-.5;
    el.style.setProperty("--x",e.clientX-r.left+"px");el.style.setProperty("--y",e.clientY-r.top+"px");
    if(!still)el.style.transform="perspective(700px) rotateX("+(-b*7)+"deg) rotateY("+(a*7)+"deg) translateZ(4px)"});
  el.addEventListener("mouseleave",()=>el.style.transform="");
});
/* boutons magnétiques (nav, hero, bannière finale) */
if(!touch&&!still)document.querySelectorAll(".cta .btn,.end .btn,nav .btn").forEach(b=>{
  b.addEventListener("mousemove",e=>{const r=b.getBoundingClientRect();
    b.style.transform="translate("+((e.clientX-r.left-r.width/2)*.25)+"px,"+((e.clientY-r.top-r.height/2)*.35)+"px)"});
  b.addEventListener("mouseleave",()=>b.style.transform="");
});
/* onglets commandes */
document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{
document.querySelectorAll(".tabs button,.cmds").forEach(e=>e.classList.remove("on"));
b.classList.add("on");const t=document.getElementById(b.dataset.t);if(t)t.classList.add("on")});

/* sécurité : si un bloc reste caché, on l'affiche après 2,5 s */
setTimeout(()=>document.querySelectorAll(".rv:not(.v)").forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight)el.classList.add("v")}),2500);
addEventListener("load",()=>setTimeout(()=>document.querySelectorAll(".rv:not(.v)").forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*1.2)el.classList.add("v")}),300));

/* bannière finale : étincelles + entrée orchestrée */
(function(){
  const end=document.querySelector(".end");if(!end)return;
  const edge=document.createElement("i");edge.className="edge";end.appendChild(edge);
  if(!still){
    for(let i=0;i<26;i++){const s=document.createElement("i");s.className="spark";
      s.style.left=(8+Math.random()*84)+"%";s.style.top=(40+Math.random()*50)+"%";
      s.style.setProperty("--t",(7+Math.random()*7)+"s");s.style.setProperty("--w",(-Math.random()*12)+"s");
      end.appendChild(s)}
    end.classList.add("pre");
    const go=()=>{end.classList.add("go");end.classList.remove("pre");setTimeout(()=>end.classList.remove("go"),1800)};
    new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){go();o.disconnect()}},{threshold:.25}).observe(end);
    setTimeout(()=>{if(end.getBoundingClientRect().top<innerHeight*.6)go()},3000);
  }
})();
