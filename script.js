(function(){
  "use strict";
  var root=document.documentElement;
  var themeButton=document.getElementById("themeSwitch");
  var menuButton=document.getElementById("menuToggle");
  var nav=document.getElementById("siteNav");
  var progress=document.getElementById("topProgress");
  var filterButtons=Array.from(document.querySelectorAll("[data-filter]"));
  var cards=Array.from(document.querySelectorAll(".project-card[data-categories]"));
  var projectCount=document.getElementById("projectCount");
  var copyButton=document.getElementById("copyEmail");
  var copyFeedback=document.getElementById("copyFeedback");
  var year=document.getElementById("year");
  if(year)year.textContent=String(new Date().getFullYear());
  try{
    var saved=window.localStorage.getItem("toufiqul-portfolio-theme");
    if(saved==="dark"||saved==="light")root.dataset.theme=saved;
  }catch(_err){}
  function syncTheme(){
    if(!themeButton)return;
    var light=root.dataset.theme==="light";
    themeButton.setAttribute("aria-label",light?"Switch to dark theme":"Switch to light theme");
    themeButton.setAttribute("title",light?"Switch to dark theme":"Switch to light theme");
    themeButton.querySelector("svg").innerHTML=light?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>':'<path d="M20 15.4A8.5 8.5 0 0 1 8.6 4 8.5 8.5 0 1 0 20 15.4Z"/>';
  }
  syncTheme();
  if(themeButton)themeButton.addEventListener("click",function(){
    root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";
    try{window.localStorage.setItem("toufiqul-portfolio-theme",root.dataset.theme);}catch(_err){}
    syncTheme();
  });
  function closeNav(){if(!menuButton||!nav)return;nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");menuButton.setAttribute("aria-label","Open navigation");}
  if(menuButton&&nav){
    menuButton.addEventListener("click",function(){
      var open=!nav.classList.contains("open");
      nav.classList.toggle("open",open);
      menuButton.setAttribute("aria-expanded",String(open));
      menuButton.setAttribute("aria-label",open?"Close navigation":"Open navigation");
    });
    nav.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeNav);});
    document.addEventListener("click",function(e){if(!nav.contains(e.target)&&!menuButton.contains(e.target))closeNav();});
    document.addEventListener("keydown",function(e){if(e.key==="Escape")closeNav();});
  }
  function applyFilter(key){
    var shown=0;
    cards.forEach(function(card){
      var categories=(card.dataset.categories||"").split(/\s+/);
      var match=key==="all"||categories.includes(key);
      card.hidden=!match;
      if(match)shown+=1;
    });
    filterButtons.forEach(function(button){
      var active=button.dataset.filter===key;
      button.classList.toggle("is-active",active);
      button.setAttribute("aria-pressed",String(active));
    });
    if(projectCount)projectCount.textContent="Showing "+shown+" project"+(shown===1?"":"s");
  }
  filterButtons.forEach(function(button){button.addEventListener("click",function(){applyFilter(button.dataset.filter);});});
  if(copyButton)copyButton.addEventListener("click",async function(){
    try{
      if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error("Copy unavailable");
      await navigator.clipboard.writeText("toufiqulislam228@gmail.com");
      if(copyFeedback)copyFeedback.textContent="Email copied to clipboard.";
    }catch(_err){
      if(copyFeedback)copyFeedback.textContent="Copy unavailable. Use the email link instead.";
    }
  });
  if(progress){
    var scheduled=false;
    function updateProgress(){
      var max=document.documentElement.scrollHeight-window.innerHeight;
      progress.style.width=(max>0?Math.max(0,Math.min(100,window.scrollY/max*100)):0)+"%";
      scheduled=false;
    }
    window.addEventListener("scroll",function(){if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}}, {passive:true});
    window.addEventListener("resize",updateProgress);
    updateProgress();
  }
  var sections=Array.from(document.querySelectorAll("main section[id]"));
  if("IntersectionObserver" in window){
    var navLinks=Array.from(document.querySelectorAll(".site-nav a"));
    var activeObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting)navLinks.forEach(function(link){link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id);});
      });
    },{rootMargin:"-18% 0px -67% 0px",threshold:0});
    sections.forEach(function(el){activeObserver.observe(el);});
  }
  var reveals=Array.from(document.querySelectorAll(".reveal"));
  if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    root.classList.add("js");
    var revealObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },{rootMargin:"0px 0px 75px 0px",threshold:0.05});
    reveals.forEach(function(el){revealObserver.observe(el);});
  }
})();