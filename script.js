(function(){
  'use strict';
  document.documentElement.classList.add('js');
  const root=document.documentElement;
  const toggle=document.getElementById('themeSwitch');
  const menu=document.getElementById('menuToggle');
  const nav=document.getElementById('siteNav');
  const year=document.getElementById('year');
  if(year) year.textContent=String(new Date().getFullYear());
  try {
    const saved=window.localStorage.getItem('portfolio-theme');
    if(saved==='dark'||saved==='light') root.dataset.theme=saved;
  } catch(e) {}
  function syncTheme(){if(toggle)toggle.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme');}
  syncTheme();
  if(toggle)toggle.addEventListener('click',function(){
    root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
    try{window.localStorage.setItem('portfolio-theme',root.dataset.theme)}catch(e){}
    syncTheme();
  });
  function closeNav(){
    if(!nav||!menu)return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Open navigation');
  }
  if(menu&&nav){
    menu.addEventListener('click',function(){
      const open=!nav.classList.contains('open');
      nav.classList.toggle('open',open);
      menu.setAttribute('aria-expanded',String(open));
      menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeNav)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeNav()});
    document.addEventListener('click',function(e){if(!nav.contains(e.target)&&!menu.contains(e.target))closeNav()});
  }
  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
      });
    },{threshold:0.1,rootMargin:'0px 0px 40px 0px'});
    reveals.forEach(function(el){observer.observe(el)});
  }else{reveals.forEach(function(el){el.classList.add('is-visible')})}
})();