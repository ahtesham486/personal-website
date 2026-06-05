(function () {
  'use strict';

  const cfg = window.PORTFOLIO_CONFIG || {};

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const cursorGlow = document.querySelector('.cursor-glow');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  const yearEl = document.getElementById('year');

  // Year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initWhatsAppLinks();
  initBookingWidget();
  initPremiumCursor();
  initWorkCardGlow();
  initSmoothWheelScroll();

  function waUrl(text) {
    const num = (cfg.whatsappNumber || '923040880677').replace(/\D/g, '');
    const q = text ? `?text=${encodeURIComponent(text)}` : '';
    return `https://wa.me/${num}${q}`;
  }

  function initWhatsAppLinks() {
    const general = waUrl('Hi Ahtasham, I have a question about your services.');
    const float = document.getElementById('whatsappFloat');
    const contactWa = document.getElementById('whatsappContact');
    if (float) float.href = general;
    if (contactWa) contactWa.href = general;

    document.querySelectorAll('a[href*="wa.me/923040880677"]').forEach((a) => {
      try {
        const u = new URL(a.href);
        const text = u.searchParams.get('text');
        a.href = waUrl(text || undefined);
      } catch {
        /* keep */
      }
    });
  }

  function resolveBookingEmbedUrl(raw, embedRaw) {
    const prefer = (embedRaw || '').trim() || (raw || '').trim();
    if (!prefer) return '';

    try {
      const u = new URL(prefer);

      if (u.hostname.includes('calendar.app.google')) {
        return '';
      }

      if (u.hostname.includes('calendar.google.com') && u.pathname.includes('/appointments/')) {
        u.searchParams.set('gv', 'true');
        return u.toString();
      }

      if (u.hostname.includes('calendly.com')) {
        return prefer.includes('?') ? `${prefer}&embed_type=Inline` : `${prefer}?embed_type=Inline`;
      }

      return prefer;
    } catch {
      return '';
    }
  }

  function initBookingWidget() {
    const frame = document.getElementById('bookingFrame');
    const placeholder = document.getElementById('bookingPlaceholder');
    const openLink = document.getElementById('bookingOpenLink');
    const raw = (cfg.googleBookingUrl || '').trim();
    const embedRaw = (cfg.googleBookingEmbedUrl || '').trim();
    if (!raw && !embedRaw) return;

    const pageUrl = raw || embedRaw;
    const embedUrl = resolveBookingEmbedUrl(raw, embedRaw);

    if (openLink) {
      openLink.href = pageUrl;
      openLink.classList.remove('hidden');
    }
    if (!frame) return;

    if (!embedUrl) {
      if (placeholder) {
        placeholder.classList.remove('hidden');
        placeholder.innerHTML =
          '<p class="booking-placeholder-title">Add embed URL in config</p>' +
          '<p>Set <code>googleBookingEmbedUrl</code> in <code>js/config.js</code> to your full ' +
          '<code>calendar.google.com/calendar/appointments/schedules/…</code> link (required for Safari).</p>';
      }
      frame.classList.add('hidden');
      return;
    }

    if (placeholder) placeholder.classList.add('hidden');

    frame.src = embedUrl;
    frame.classList.remove('hidden');
  }

  // Header scroll effect
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Cursor glow (desktop only)
  if (cursorGlow && window.matchMedia('(min-width: 769px)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  function initPremiumCursor() {
    if (!cursorDot || !cursorRing) return;
    if (!window.matchMedia('(min-width: 769px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    let isActive = false;

    function setVisible(v) {
      cursorDot.style.opacity = v ? '1' : '0';
      cursorRing.style.opacity = v ? '1' : '0';
    }

    function activateOnce() {
      if (isActive) return;
      isActive = true;
      setVisible(true);
    }

    document.addEventListener(
      'mousemove',
      (e) => {
        activateOnce();
        mouseX = e.clientX;
        mouseY = e.clientY;
      },
      { passive: true }
    );

    document.addEventListener(
      'mouseleave',
      () => {
        setVisible(false);
      },
      { passive: true }
    );

    // Hover states
    const focusSelectors = ['a', 'button', '.btn', '.service-card', '.work-card', '.product-showcase'];
    document.querySelectorAll(focusSelectors.join(',')).forEach((el) => {
      el.addEventListener(
        'mouseenter',
        () => cursorRing.classList.add('is-focus'),
        { passive: true }
      );
      el.addEventListener(
        'mouseleave',
        () => cursorRing.classList.remove('is-focus'),
        { passive: true }
      );
    });

    function animate() {
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';

      requestAnimationFrame(animate);
    }

    animate();
  }

  function initWorkCardGlow() {
    const cards = document.querySelectorAll('.work-card');
    if (!cards.length) return;

    cards.forEach((card) => {
      card.addEventListener(
        'mousemove',
        (e) => {
          const r = card.getBoundingClientRect();
          const x = ((e.clientX - r.left) / r.width) * 100;
          const y = ((e.clientY - r.top) / r.height) * 100;
          card.style.setProperty('--mx', `${x}%`);
          card.style.setProperty('--my', `${y}%`);
        },
        { passive: true }
      );
    });
  }

  function initSmoothWheelScroll() {
    // A lightweight wheel smoothing for desktop only. Avoids heavy libs.
    if (!window.matchMedia('(min-width: 1025px)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let isLocked = false;

    function clampTarget() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target, max));
    }

    function onWheel(e) {
      // Let the user zoom normally.
      if (e.ctrlKey) return;
      // If user is interacting with an iframe (calendar), don't steal scroll.
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') return;

      // Prevent default for smooth behavior.
      e.preventDefault();

      const delta = e.deltaY;
      const speed = 1.15;
      target += delta * speed;
      clampTarget();

      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      raf = 0;
      if (isLocked) return;

      // Ease current toward target.
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.35) current = target;

      window.scrollTo(0, current);

      if (current !== target) raf = requestAnimationFrame(tick);
    }

    // If user jumps via hash links, sync targets.
    window.addEventListener(
      'scroll',
      () => {
        if (raf) return;
        target = window.scrollY;
        current = window.scrollY;
      },
      { passive: true }
    );

    // Temporarily disable smooth wheel while mobile nav open.
    const observer = new MutationObserver(() => {
      isLocked = navLinks?.classList?.contains('open') || false;
    });
    if (navLinks) observer.observe(navLinks, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('wheel', onWheel, { passive: false });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Counter animation
  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const statNums = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNums.forEach((el) => counterObserver.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const id = section.getAttribute('id');
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach((a) => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--text)';
          }
        });
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });

  // Chat demo loop animation
  const chatDemo = document.getElementById('chatDemo');
  if (chatDemo) {
    const messages = chatDemo.innerHTML;
    setInterval(() => {
      chatDemo.style.opacity = '0';
      setTimeout(() => {
        chatDemo.innerHTML = messages;
        chatDemo.style.opacity = '1';
        chatDemo.querySelectorAll('.msg').forEach((msg, i) => {
          msg.style.animation = 'none';
          msg.offsetHeight;
          msg.style.animation = `msg-in 0.5s ease ${0.3 + i * 0.7}s forwards`;
        });
      }, 400);
    }, 8000);
  }

})();
