/* TAMÁ — interacciones (sin dependencias) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Menú móvil ---------- */
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  /* ---------- Sombra del header al hacer scroll ---------- */
  const header = $('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Skeleton de imágenes ---------- */
  $$('.media img').forEach((img) => {
    const media = img.closest('.media');
    const done = () => media.classList.add('is-loaded');
    if (img.complete && img.naturalWidth) done();
    else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
  });

  /* ---------- Galería: filtros + lightbox ---------- */
  const grid = $('#project-grid');
  if (grid) {
    const items = $$('.project', grid);
    const status = $('#filter-status');
    $$('[data-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const f = btn.dataset.filter;
        $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        let n = 0;
        items.forEach((it) => { const show = f === 'all' || it.dataset.cat === f; it.hidden = !show; if (show) n++; });
        if (status) status.textContent = `${n} ${n === 1 ? 'proyecto mostrado' : 'proyectos mostrados'}`;
      });
    });

    const dlg = $('#lightbox');
    if (dlg && typeof dlg.showModal === 'function') {
      let current = 0;
      const visible = () => items.filter((it) => !it.hidden);
      const show = (idx) => {
        const list = visible();
        current = (idx + list.length) % list.length;
        const d = $('.project-open', list[current]).dataset;
        const img = $('#lb-img');
        img.closest('.media').classList.remove('is-loaded');
        img.src = d.src; img.alt = `Imagen referencial: ${d.title}`;
        $('#lb-title').textContent = d.title;
        $('#lb-cat').textContent = d.cat;
        $('#lb-desc').textContent = d.desc;
      };
      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('.project-open');
        if (!btn) return;
        show(visible().indexOf(btn.closest('.project')));
        dlg.showModal();
      });
      dlg.addEventListener('click', (e) => {
        const act = e.target.closest('[data-lb]')?.dataset.lb;
        if (act === 'close' || e.target === dlg) dlg.close();
        if (act === 'next') show(current + 1);
        if (act === 'prev') show(current - 1);
      });
      dlg.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'ArrowLeft') show(current - 1);
      });
      $('#lb-img').addEventListener('load', (e) => e.target.closest('.media').classList.add('is-loaded'));
    }
  }

  /* ---------- Formulario de presupuesto ---------- */
  const form = $('#quote-form');
  if (form) {
    const rules = {
      nombre: (v) => v.trim().length >= 3 || 'Ingresa tu nombre completo.',
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Ingresa un correo válido, por ejemplo nombre@dominio.cl.',
      telefono: (v) => /^(56)?[2-9]\d{8}$/.test(v.replace(/\D/g, '')) || 'Ingresa un teléfono chileno válido, por ejemplo +56 9 1234 5678.',
      comuna: (v) => v.trim().length >= 2 || 'Indica tu comuna o ciudad.',
      servicio: (v) => v !== '' || 'Selecciona un servicio.',
      mensaje: (v) => v.trim().length >= 20 || 'Describe tu proyecto con al menos 20 caracteres.',
      acepto: (_v, el) => el.checked || 'Debes aceptar la política de privacidad y los términos.',
    };
    const touched = new Set();
    const validate = (el) => {
      const rule = rules[el.name];
      if (!rule) return true;
      const res = rule(el.value, el);
      const ok = res === true;
      el.setAttribute('aria-invalid', String(!ok));
      const out = $(`#err-${el.name}`);
      if (out) out.textContent = ok ? '' : res;
      return ok;
    };
    const fields = Object.keys(rules).map((n) => form.elements[n]);
    fields.forEach((el) => {
      el.addEventListener('blur', () => { touched.add(el.name); validate(el); });
      const ev = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input';
      el.addEventListener(ev, () => { if (touched.has(el.name) || ev === 'change') { touched.add(el.name); validate(el); } });
    });

    const pre = new URLSearchParams(location.search).get('servicio');
    if (pre && [...form.servicio.options].some((o) => o.value === pre)) form.servicio.value = pre;

    const alertBox = $('#form-alert');
    const result = $('#form-result');
    const btn = $('#submit-btn');
    const serviceLabel = () => form.servicio.options[form.servicio.selectedIndex].text;
    const summary = () => {
      const opt = (label, v) => (v ? [`${label}: ${v}`] : []);
      return [
        'Hola, quisiera solicitar un presupuesto.', '',
        `Nombre: ${form.nombre.value.trim()}`,
        `Correo: ${form.email.value.trim()}`,
        `Teléfono: ${form.telefono.value.trim()}`,
        `Comuna/ciudad: ${form.comuna.value.trim()}`,
        `Servicio: ${serviceLabel()}`,
        ...opt('Inmueble', form.inmueble.value),
        ...opt('Plazo', form.plazo.value),
        '', 'Proyecto:', form.mensaje.value.trim(),
      ].join('\n');
    };

    const showResult = (title, text, actions) => {
      form.hidden = true;
      $('#result-title').textContent = title;
      $('#result-text').textContent = text;
      $('#result-actions').innerHTML = actions;
      result.hidden = false;
      result.focus();
      result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    const fallbackActions = () => {
      const msg = summary();
      const wa = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(msg)}`;
      const mail = `mailto:${form.dataset.mail}?subject=${encodeURIComponent('Solicitud de presupuesto')}&body=${encodeURIComponent(msg)}`;
      return `<a class="btn btn-whatsapp" href="${wa}" target="_blank" rel="noopener noreferrer">Enviar por WhatsApp</a>
        <a class="btn btn-outline" href="${mail}">Enviar por correo</a>
        <button type="button" class="btn btn-outline" id="edit-request">Editar solicitud</button>`;
    };
    const bindEdit = () => {
      const b = $('#edit-request');
      if (b) b.addEventListener('click', () => { result.hidden = true; form.hidden = false; form.nombre.focus(); });
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      alertBox.hidden = true;
      fields.forEach((el) => touched.add(el.name));
      const invalid = fields.filter((el) => !validate(el));
      if (invalid.length) { invalid[0].focus(); return; }
      if (form.website.value) { showResult('¡Gracias!', 'Recibimos tu mensaje.', ''); return; }

      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        showResult('Tu solicitud está lista', 'Para enviarla, elige cómo quieres contactarnos: se abrirá WhatsApp o tu correo con todos los datos ya escritos.', fallbackActions());
        bindEdit();
        return;
      }
      btn.disabled = true; btn.classList.add('is-loading');
      try {
        const data = Object.fromEntries(new FormData(form));
        delete data.website;
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error(String(res.status));
        showResult('¡Solicitud enviada!', 'Gracias. Revisaremos tu proyecto y te contactaremos a la brevedad.', '');
        form.reset();
      } catch {
        alertBox.hidden = false;
        alertBox.textContent = 'No pudimos enviar la solicitud. Revisa tu conexión e inténtalo nuevamente, o escríbenos por WhatsApp.';
      } finally {
        btn.disabled = false; btn.classList.remove('is-loading');
      }
    });
  }

  /* ---------- Carrusel de portada ---------- */
  $$('[data-carousel]').forEach((root) => {
    const slides = $$('.slide', root);
    const stage = $('.carousel-stage', root);
    const caption = $('.carousel-caption', root);
    const capCat = $('b', caption);
    const capTxt = $('span', caption);
    const current = $('[data-current]', root);
    const toggle = $('[data-carousel-toggle]', root);
    const DELAY = 5000;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    root.style.setProperty('--carousel-ms', `${DELAY}ms`);
    let index = 0;
    let timer = null;
    let userPaused = reduce;
    let hoverPaused = false;

    const load = (slide) => {
      if (!slide) return;
      $$('img[data-src]', slide).forEach((img) => {
        img.addEventListener('load', () => stage.classList.add('is-loaded'), { once: true });
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    };
    const first = $('.slide-img', slides[0]);
    if (first.complete && first.naturalWidth) stage.classList.add('is-loaded');
    else { first.addEventListener('load', () => stage.classList.add('is-loaded'), { once: true }); first.addEventListener('error', () => stage.classList.add('is-loaded'), { once: true }); }

    const restartProgress = () => {
      root.classList.remove('is-playing');
      void root.offsetWidth; // reinicia la animación de la barra
      if (timer) root.classList.add('is-playing');
    };
    const go = (n) => {
      const next = (n + slides.length) % slides.length;
      load(slides[next]); load(slides[(next + 1) % slides.length]);
      slides[index].classList.remove('is-active');
      index = next;
      slides[index].classList.add('is-active');
      capCat.textContent = slides[index].dataset.cat;
      capTxt.textContent = slides[index].dataset.caption;
      current.textContent = String(index + 1);
      restartProgress();
    };
    const stop = () => { clearInterval(timer); timer = null; root.classList.remove('is-playing'); };
    const start = () => {
      stop();
      if (userPaused || hoverPaused || document.hidden || slides.length < 2) return;
      timer = setInterval(() => go(index + 1), DELAY);
      restartProgress();
    };
    const syncToggle = () => {
      toggle.setAttribute('aria-pressed', String(userPaused));
      toggle.setAttribute('aria-label', userPaused ? 'Reanudar animación' : 'Pausar animación');
      caption.setAttribute('aria-live', userPaused ? 'polite' : 'off');
    };

    $('[data-carousel-prev]', root).addEventListener('click', () => { go(index - 1); start(); });
    $('[data-carousel-next]', root).addEventListener('click', () => { go(index + 1); start(); });
    toggle.addEventListener('click', () => { userPaused = !userPaused; syncToggle(); start(); });
    root.addEventListener('mouseenter', () => { hoverPaused = true; stop(); });
    root.addEventListener('mouseleave', () => { hoverPaused = false; start(); });
    root.addEventListener('focusin', () => { hoverPaused = true; stop(); });
    root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) { hoverPaused = false; start(); } });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { go(index + 1); start(); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(index - 1); start(); e.preventDefault(); }
    });
    let x0 = null;
    stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    stage.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); start(); }
    });
    document.addEventListener('visibilitychange', start);

    load(slides[1]);
    syncToggle();
    start();
  });
})();
