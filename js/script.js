/* ==========================================================
   NAVODYA — site behaviour
   Pages, story grids, filters, article view, search, forms
   ========================================================== */

/* ---------- Story cards ---------- */
function card(a) {
  return `<article class="story-card" onclick="article('${a.id}')">
    <div class="thumb"><img src="${a.img}" alt="" loading="lazy"></div>
    <div class="category">${a.cat}</div>
    <h3>${a.title}</h3>
    <p>${a.desc}</p>
    <div class="byline">${a.author} · ${a.read}</div>
  </article>`;
}

function fill(id, arr) {
  document.getElementById(id).innerHTML = arr.map(card).join('');
}

// Which stories appear on each section page
fill('homeGrid',    [articles[1], articles[2], articles[5]]);
fill('beatGrid',    [articles[3], articles[4], articles[6]]);
fill('founderGrid', [articles[0], articles[1], articles[3], articles[4], articles[8]]);
fill('startupGrid', [articles[6], articles[7], articles[8]]);
fill('fundingGrid', [articles[2], articles[7]]);
fill('smallGrid',   [articles[5], articles[6]]);
fill('womenGrid',   [articles[3]]);

/* ---------- Latest page: filters, search, sort ---------- */
let chosen = 'All';
const beats = [
  'All', 'Founder stories', 'Startup news', 'Failure & comebacks', 'Young entrepreneurs',
  'Women in business', 'Funding & finance', 'Small business', 'Startups & innovation'
];

function initFilters() {
  document.getElementById('filters').innerHTML = beats
    .map(b => `<button class="filter ${b === chosen ? 'active' : ''}" onclick="choose('${b}')">${b}</button>`)
    .join('');
}

function choose(b) {
  chosen = b;
  initFilters();
  renderList();
}

function renderList() {
  const q = (document.getElementById('listSearch')?.value || '').toLowerCase();
  const sort = document.getElementById('sort')?.value;

  const arr = articles.filter(a =>
    (chosen === 'All' || a.cat.toLowerCase() === chosen.toLowerCase()) &&
    (a.title + ' ' + a.desc + ' ' + a.cat).toLowerCase().includes(q)
  );
  if (sort === 'az') arr.sort((a, b) => a.title.localeCompare(b.title));

  document.getElementById('allGrid').innerHTML = arr.map(card).join('');
  document.getElementById('empty').style.display = arr.length ? 'none' : 'block';
}

initFilters();
renderList();

/* ---------- Article view ---------- */
function article(id) {
  const a = articles.find(x => x.id === id);
  if (!a) return;

  document.getElementById('articleBody').innerHTML = `
    <div class="category">${a.cat}</div>
    <h1 class="article-title">${a.title}</h1>
    <p class="standfirst">${a.desc}</p>
    <div class="article-meta">
      <span>By ${a.author}</span><span>${a.read}</span><span>Navodya Journal</span>
    </div>
    <div class="demo-note">DEMONSTRATION ARTICLE — This is sample editorial copy created to demonstrate the publication layout. It is not a reported news story. Replace it with original, researched and fact-checked reporting before publication.</div>
    <img class="article-hero" src="${a.img}" alt="Illustrative editorial photograph">
    <div class="caption">Illustrative photograph · Image source: Unsplash</div>
    <div class="article-body">
      ${a.body.map(p => `<h2>${p[0]}</h2><p>${p[1]}</p>`).join('')}
      <blockquote>Good business stories are not only about what happened. They explain why it mattered, what was learned and what remains uncertain.</blockquote>
      <p><b>Editorial note:</b> A published report should include named authorship, source links, image credits and any required disclosures.</p>
    </div>
    <a class="text-link" href="#latest">← Back to the newsroom</a>`;

  go('article');
}

/* ---------- Page routing (hash based) ---------- */
function go(p) {
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));

  let el = document.getElementById('page-' + p);
  if (!el) {
    p = 'home';
    el = document.getElementById('page-home');
  }
  el.classList.add('active');

  document.querySelectorAll('[data-page]').forEach(x => x.classList.toggle('active', x.dataset.page === p));
  document.getElementById('navlinks').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (location.hash !== '#' + p) history.pushState({ p }, '', '#' + p);
}

window.addEventListener('popstate', () => go(location.hash.slice(1) || 'home'));
window.addEventListener('hashchange', () => go(location.hash.slice(1) || 'home'));

/* ---------- Search overlay ---------- */
function openSearch() {
  document.getElementById('searchOverlay').classList.add('show');
  document.getElementById('searchInput').focus();
}

function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('show');
}

function searchModal() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const arr = articles.filter(a => (a.title + ' ' + a.cat + ' ' + a.desc).toLowerCase().includes(q));

  document.getElementById('searchResults').innerHTML =
    arr.map(a => `<div class="search-result" onclick="closeSearch();article('${a.id}')"><span>${a.cat}</span><b>${a.title}</b></div>`).join('') ||
    '<p style="color:#999">No matching stories.</p>';
}

/* ---------- Forms (demo only: nothing is sent) ---------- */
function newsletter(e) {
  e.preventDefault();
  document.getElementById('newsSuccess').style.display = 'block';
  e.target.reset();
}

function pitch(e) {
  e.preventDefault();
  document.getElementById('pitchSuccess').style.display = 'block';
  e.target.reset();
}

/* ---------- Init ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });

// Open the section named in the URL (e.g. index.html#about)
{
  const h = location.hash.slice(1);
  if (h && h !== 'article' && document.getElementById('page-' + h)) go(h);
}
