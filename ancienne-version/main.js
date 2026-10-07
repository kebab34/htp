(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Maison : murs en briques qui s'empilent ---------- */
  const bricks = document.getElementById('bricks');
  if (bricks) {
    const NS = 'http://www.w3.org/2000/svg';
    const rowH = 15, brickW = 40;
    const left = 70, right = 350, ground = 320, eaves = 170, apexY = 70, apexX = 210;
    let row = 0;
    for (let y = ground - rowH; y > apexY + 25; y -= rowH, row++) {
      // Au-dessus des murs : le pignon se rétrécit vers le faîtage
      let x0 = left, x1 = right;
      if (y < eaves) {
        const half = (right - apexX) * (y + rowH - apexY) / (eaves - apexY);
        x0 = apexX - half; x1 = apexX + half;
      }
      const offset = row % 2 ? brickW / 2 : 0;
      let col = 0;
      for (let x = x0 - offset; x < x1; x += brickW, col++) {
        const bx = Math.max(x, x0), bw = Math.min(x + brickW, x1) - bx;
        if (bw < 6) continue;
        const r = document.createElementNS(NS, 'rect');
        r.setAttribute('x', bx); r.setAttribute('y', y);
        r.setAttribute('width', bw); r.setAttribute('height', rowH);
        r.setAttribute('class', (row + col) % 3 === 0 ? 'brick alt' : 'brick');
        r.style.animationDelay = (0.5 + row * 0.2 + col * 0.03).toFixed(2) + 's';
        bricks.appendChild(r);
      }
    }
  }

  /* ---------- Navigation ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const burger = document.getElementById('burger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Apparitions au défilement + compteurs ---------- */
  const countUp = el => {
    const target = +el.dataset.count;
    if (reduceMotion) { el.textContent = target; return; }
    const start = performance.now(), dur = 1800;
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      // Décalage en cascade pour les éléments d'une même grille
      const siblings = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      el.style.transitionDelay = (Math.max(siblings.indexOf(el), 0) * 0.08) + 's';
      el.classList.add('in');
      el.addEventListener('transitionend', () => { el.style.transitionDelay = ''; }, { once: true });
      el.querySelectorAll('[data-count]').forEach(countUp);
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- Ligne de progression des étapes ---------- */
  const steps = document.getElementById('steps');
  if (steps) {
    const update = () => {
      const r = steps.getBoundingClientRect();
      const p = (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.3);
      steps.style.setProperty('--progress', Math.min(Math.max(p, 0), 1).toFixed(3));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------- Filtres des réalisations ---------- */
  document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll('.ref').forEach(ref => {
      const show = f === 'all' || ref.dataset.type === f;
      ref.classList.toggle('hide', !show);
      if (show) ref.classList.add('in');
    });
  }));

  /* ---------- Formulaire : ouvre l'email du visiteur ---------- */
  // À REMPLACER plus tard par un service d'envoi (Formspree, hébergeur…) pour recevoir les demandes directement
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const body = `Nom : ${d.get('nom')}\nTéléphone : ${d.get('tel')}\nEmail : ${d.get('email')}\nProjet : ${d.get('projet')}\nVille : ${d.get('ville')}\n\n${d.get('message')}`;
    window.location.href = 'mailto:contact@htp-construction.fr?subject=' +
      encodeURIComponent('Demande de devis – ' + d.get('projet')) + '&body=' + encodeURIComponent(body);
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
