// script.js (module)
const LANG_CN = 'cn';
const LANG_EN = 'en';

const defaultLang = document.documentElement.getAttribute('data-lang') || LANG_CN;

// Helpers
function qs(param) {
  return new URLSearchParams(location.search).get(param);
}

function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  // update text nodes with [data-i18n]
  const map = {
    hero_title: {cn: '极简 · 中性 · 插画作品', en: 'Minimal · Neutral · Illustration'},
    hero_sub: {cn: '点击作品查看详情 — 支持中/英双语', en: 'Click any work to view details — CN/EN supported'},
    tag: {cn: '插画 · Illustration', en: 'Illustration'},
    back: {cn: '← 返回画廊', en: '← Back to gallery'},
    copyright: {cn: '© 2025 YourName. All rights reserved.', en: '© 2025 YourName. All rights reserved.'},
    page_title: {cn: '作品详情 — Artwork', en: 'Artwork Detail — 作品详情'}
  };
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(map[key]) el.textContent = map[key][lang];
  });
  // adjust lang toggle text and aria
  document.querySelectorAll('.lang-toggle').forEach(btn=>{
    btn.textContent = lang === LANG_CN ? 'EN' : '中文';
    btn.setAttribute('aria-pressed', String(lang !== LANG_CN));
  });
  // update gallery/artwork text rendering
  if (window.renderGallery) window.renderGallery(lang);
  if (window.renderArtwork) window.renderArtwork(lang);
}

// Load artworks JSON (used both on index and detail)
async function loadArtworks(){
  const res = await fetch('artworks.json');
  const data = await res.json();
  return data;
}

/* ---------- Index gallery rendering ---------- */
window.renderGallery = async function(lang = defaultLang){
  const grid = document.getElementById('galleryGrid');
  if(!grid) return;
  const artworks = await loadArtworks();
  grid.innerHTML = '';
  artworks.forEach(a=>{
    const card = document.createElement('a');
    card.className = 'card';
    card.href = `artwork.html?id=${a.id}`;
    card.setAttribute('aria-label', (lang === 'cn' ? a.title_cn : a.title_en));
    card.innerHTML = `
      <div class="card-image" style="background-image:url('${a.image}')"></div>
      <div class="card-body">
        <h3 class="card-title">${lang === 'cn' ? a.title_cn : a.title_en}</h3>
        <p class="card-sub">${lang === 'cn' ? a.short_cn : a.short_en}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ---------- Artwork detail rendering ---------- */
window.renderArtwork = async function(lang = defaultLang){
  const id = qs('id');
  if(!id) return;
  const artworks = await loadArtworks();
  const a = artworks.find(it=>String(it.id) === String(id));
  const container = document.getElementById('artwork');
  if(!a || !container){
    if(container) container.innerHTML = `<p data-i18n="not_found">作品未找到。</p>`;
    return;
  }
  container.innerHTML = `
    <div class="artwork-media">
      <img src="${a.image}" alt="${lang === 'cn' ? a.title_cn : a.title_en}" />
    </div>
    <div class="artwork-meta">
      <h2>${lang === 'cn' ? a.title_cn : a.title_en}</h2>
      <p class="card-sub">${lang === 'cn' ? a.short_cn : a.short_en}</p>
      <div class="long-desc">
        <p>${lang === 'cn' ? a.desc_cn : a.desc_en}</p>
      </div>
    </div>
  `;
}

/* ---------- Language toggle wiring ---------- */
document.addEventListener('DOMContentLoaded', async ()=>{
  let lang = defaultLang;

  // attach toggles
  document.querySelectorAll('.lang-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      lang = (document.documentElement.getAttribute('data-lang') === LANG_CN) ? LANG_EN : LANG_CN;
      setLang(lang);
    });
  });

  // initial render depending on page
  if(document.getElementById('galleryGrid')){
    await window.renderGallery(lang);
  }
  if(document.getElementById('artwork')){
    await window.renderArtwork(lang);
  }

  // initialize star cursor
  initStarCursor();
});

/* ---------- STAR CURSOR ---------- */
function initStarCursor(){
  const star = document.getElementById('starCursor');
  if(!star) return;

  // insert SVG star into element
  star.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#FFD966" d="M12 2.5l2.35 4.76 5.26.77-3.81 3.72.9 5.24L12 15.9l-4.7 2.8.9-5.24L4.4 8.03l5.26-.77L12 2.5z"/>
    </svg>
  `;

  let mouseX = -100, mouseY = -100;
  let scale = 1;
  let isDown = false;

  // follow pointer
  document.addEventListener('pointermove', e=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateStar();
  }, {passive:true});

  document.addEventListener('pointerdown', ()=>{
    scale = 0.8;
    isDown = true;
    updateStar(true);
  });
  document.addEventListener('pointerup', ()=>{
    scale = 1;
    isDown = false;
    updateStar();
  });

  function updateStar(instant=false){
    star.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%) scale(${scale})`;
    // small pop when clicked
    if(instant) star.style.transition = 'transform .06s linear';
    else star.style.transition = 'transform .12s cubic-bezier(.2,.9,.3,1)';
  }

  // hide on leaving window
  document.addEventListener('pointerleave', ()=>{
    star.style.opacity = '0';
  });
  document.addEventListener('pointerenter', ()=>{
    star.style.opacity = '1';
  });
}
