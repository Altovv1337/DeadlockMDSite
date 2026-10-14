"use strict";
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
// Мобильное меню
const burger=$(".burger"),nav=$("#nav");
burger.addEventListener("click",()=>{const o=nav.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
// Угольки (частицы)
const cv=$("#fx"),cx=cv.getContext("2d"),still=matchMedia("(prefers-reduced-motion:reduce)").matches;let P=[];
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener("resize",size);
const mk=()=>({x:Math.random()*cv.width,y:cv.height+10,r:Math.random()*1.8+.6,v:Math.random()*.5+.2,d:Math.random()*2-1,a:Math.random()*.5+.2,c:Math.random()>.7?"63,143,134":"226,180,95"});
for(let i=0;i<40;i++){const p=mk();p.y=Math.random()*cv.height;P.push(p)}
(function loop(){cx.clearRect(0,0,cv.width,cv.height);for(const p of P){p.y-=p.v;p.x+=Math.sin(p.y/60)*.3+p.d*.1;if(p.y<-10)Object.assign(p,mk());cx.fillStyle=`rgba(${p.c},${p.a})`;cx.beginPath();cx.arc(p.x,p.y,p.r,0,6.3);cx.fill()}if(!still)requestAnimationFrame(loop)})();
// Демо-переключатели в макете
const tgs=$$(".tg");if(tgs.length&&!still)setInterval(()=>tgs[Math.floor(Math.random()*tgs.length)].classList.toggle("on"),1800);
// Фильтр блога
$$(".chip").forEach(b=>b.addEventListener("click",()=>{$$(".chip").forEach(c=>c.classList.toggle("on",c===b));$$(".post").forEach(p=>p.classList.toggle("hide",b.dataset.f!=="all"&&p.dataset.tag!==b.dataset.f))}));
// Форма обратной связи (сообщения сохраняются в localStorage)
const form=$("#form");
if(form)form.addEventListener("submit",e=>{e.preventDefault();let ok=true;
const rules={name:v=>v.trim().length>=2||"Введите имя (минимум 2 символа).",email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||"Введите корректный email.",msg:v=>v.trim().length>=10||"Сообщение должно быть не короче 10 символов."};
for(const k in rules){const f=form.elements[k],r=rules[k](f.value),m=f.parentElement.querySelector(".err");m.textContent=r===true?"":r;f.setAttribute("aria-invalid",r!==true);if(r!==true)ok=false}
if(!ok)return;
const list=JSON.parse(localStorage.getItem("dmm_messages")||"[]");
list.push({...Object.fromEntries(new FormData(form)),date:new Date().toISOString()});
localStorage.setItem("dmm_messages",JSON.stringify(list));
form.reset();$("#ok").hidden=false});
