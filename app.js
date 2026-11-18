(function(){
var d=document,b=d.body;
d.getElementById('yr').textContent=new Date().getFullYear();
// menu mobilne
var bg=d.querySelector('.burger');
function closeMenu(){b.classList.remove('menu-open');bg.setAttribute('aria-expanded','false')}
bg.addEventListener('click',function(){var o=b.classList.toggle('menu-open');bg.setAttribute('aria-expanded',o?'true':'false')});
d.querySelectorAll('.mnav a').forEach(function(a){a.addEventListener('click',closeMenu)});
d.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});
// język EN / PL
var titles={en:d.title,pl:'Linie technologiczne, zbiorniki i rurociągi ze stali nierdzewnej | Niropunkt'};
function setLang(l){
 d.documentElement.lang=l;d.title=titles[l];
 d.querySelectorAll('[data-pl]').forEach(function(el){
  if(!el.hasAttribute('data-en'))el.setAttribute('data-en',el.innerHTML);
  el.innerHTML=el.getAttribute(l==='pl'?'data-pl':'data-en');
 });
 d.querySelectorAll('[data-pl-alt]').forEach(function(el){
  if(!el.hasAttribute('data-en-alt'))el.setAttribute('data-en-alt',el.alt);
  el.alt=el.getAttribute(l==='pl'?'data-pl-alt':'data-en-alt');
 });
 d.querySelectorAll('.lang button').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.lang===l?'true':'false')});
 try{history.replaceState(null,'',l==='pl'?'#pl':location.pathname)}catch(e){}
}
d.querySelectorAll('.lang button').forEach(function(x){x.addEventListener('click',function(){setLang(x.dataset.lang)})});
if(location.hash==='#pl')setLang('pl');
// aktywna pozycja menu
var links=[].slice.call(d.querySelectorAll('.nav a'));
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
 links.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
}
// karuzele: palec (natywnie), mysz (przeciąganie), strzałki
d.querySelectorAll('.rail').forEach(function(r){
 var down=false,sx=0,sl=0,moved=false;
 r.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=r.scrollLeft});
 r.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;r.classList.add('drag')}r.scrollLeft=sl-dx});
 function up(){if(!down)return;down=false;r.classList.remove('drag');var c=r.firstElementChild;if(c){var w=c.getBoundingClientRect().width+parseFloat(getComputedStyle(r).columnGap||0);r.scrollTo({left:Math.round(r.scrollLeft/w)*w,behavior:'smooth'})}}
 r.addEventListener('pointerup',up);r.addEventListener('pointerleave',up);
 r.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
 r.addEventListener('dragstart',function(e){e.preventDefault()});
});
d.querySelectorAll('.arrows button').forEach(function(x){x.addEventListener('click',function(){
 var r=d.getElementById(x.dataset.rail),c=r.firstElementChild,w=c.getBoundingClientRect().width+parseFloat(getComputedStyle(r).columnGap||0);
 r.scrollBy({left:w*Number(x.dataset.dir),behavior:'smooth'});
})});
// lightbox
var lb=d.getElementById('lb'),li=lb.querySelector('img'),items=[].slice.call(d.querySelectorAll('[data-full]')),cur=0;
function show(i){cur=(i+items.length)%items.length;li.src=items[cur].dataset.full;li.alt=items[cur].querySelector('img').alt}
items.forEach(function(x,i){x.addEventListener('click',function(){show(i);lb.showModal()})});
lb.querySelector('.x').addEventListener('click',function(){lb.close()});
lb.querySelector('.pv').addEventListener('click',function(){show(cur-1)});
lb.querySelector('.nx').addEventListener('click',function(){show(cur+1)});
lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});
lb.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
// formularz pokazowy
d.getElementById('f').addEventListener('submit',function(e){e.preventDefault();d.getElementById('fnote').hidden=false});
})();
