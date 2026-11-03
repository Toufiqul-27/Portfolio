(function(){
  'use strict';
  const root=document.documentElement;
  root.classList.add('js');
  const toggle=document.getElementById('themeSwitch');
  const icon=document.getElementById('themeIcon');
  const menu=document.getElementById('menuToggle');
  const nav=document.getElementById('siteNav');
  const year=document.getElementById('year');
  if(year)year.textContent=String(new Date().getFullYear());
  try{const saved=localStorage.getItem('portfolio-theme');if(saved==='dark'||saved==='light')root.dataset.theme=saved;}catch(_e){}
  function syncTheme(){if(toggle)toggle.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme');if(icon)icon.textContent=root.dataset.theme==='dark'?'☼':'☾';}
  syncTheme();
  if(toggle)toggle.addEventListener('click',function(){root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('portfolio-theme',root.dataset.theme);}catch(_e){}syncTheme();});
  function closeMenu(){if(!menu||!nav)return;nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');}
  if(menu&&nav){
    menu.addEventListener('click',function(){const open=!nav.classList.contains('open');nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');});
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',closeMenu);});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});
    document.addEventListener('click',function(e){if(!nav.contains(e.target)&&!menu.contains(e.target))closeMenu();});
  }
  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px 80px 0px'});
    reveals.forEach(function(el){observer.observe(el);});
  } else {reveals.forEach(function(el){el.classList.add('is-visible');});}
})();
