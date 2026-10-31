(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const progress = document.getElementById('pageProgress');
  const ambient = document.getElementById('cursorAmbient');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();
  const savedTheme = (() => { try { return localStorage.getItem('ti-portfolio-theme'); } catch { return null; } })();
  function setTheme(theme) {
    const isLight = theme === 'light';
    root.classList.toggle('light-theme', isLight);
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    toggle.setAttribute('aria-pressed', String(isLight));
    toggle.innerHTML = isLight
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 14.1A8.5 8.5 0 0 1 9.9 3.4 8.7 8.7 0 1 0 20.6 14.1Z"/></svg>';
  }
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  toggle.addEventListener('click', () => {
    const next = root.classList.contains('light-theme') ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('ti-portfolio-theme', next); } catch { /* no storage available */ }
  });
  function closeMenu() {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
    menuBtn.setAttribute('aria-label','Open navigation');
  }
  menuBtn.addEventListener('click', () => {
    const shouldOpen = !nav.classList.contains('open');
    nav.classList.toggle('open',shouldOpen);
    menuBtn.setAttribute('aria-expanded',String(shouldOpen));
    menuBtn.setAttribute('aria-label',shouldOpen?'Close navigation':'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => { if (!nav.contains(e.target) && !menuBtn.contains(e.target)) closeMenu(); });
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px 35px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.toggle('active',link.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, {rootMargin:'-22% 0px -68% 0px'});
    document.querySelectorAll('main section[id]').forEach(el => sectionObserver.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  let scrollPending = false;
  function updateProgress(){
    const doc = document.documentElement;
    const scrolled = Math.max(0, window.scrollY);
    const available = Math.max(1, doc.scrollHeight - window.innerHeight);
    progress.style.width = Math.min(100,100 * scrolled / available) + '%';
    scrollPending = false;
  }
  window.addEventListener('scroll',() => { if (!scrollPending) {scrollPending = true;requestAnimationFrame(updateProgress);} }, {passive:true});
  window.addEventListener('resize', updateProgress);
  updateProgress();
  if (matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
    window.addEventListener('pointermove', e => {ambient.style.left = e.clientX + 'px'; ambient.style.top = e.clientY + 'px';}, {passive:true});
  }
})();