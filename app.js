/* VroomHub — a local-first car marketplace demo. No server, no keys, no tracking. */
const KEY = 'vroomhub:v1';
const cars = [
  { id: 1, make: 'Toyota', name: 'Corolla XLi', year: 2019, km: 62000, fuel: 'Petrol', price: 1450000, emoji: '🚗', location: 'Westlands' },
  { id: 2, make: 'Honda', name: 'Fit RS', year: 2020, km: 41000, fuel: 'Petrol', price: 1780000, emoji: '🚙', location: 'Kilimani' },
  { id: 3, make: 'Nissan', name: 'Note', year: 2018, km: 88000, fuel: 'Petrol', price: 980000, emoji: '🚘', location: 'Thika' },
  { id: 4, make: 'Toyota', name: 'Vitz RS', year: 2017, km: 74000, fuel: 'Petrol', price: 890000, emoji: '🚗', location: 'Kasarani' },
  { id: 5, make: 'Mazda', name: 'Demio', year: 2021, km: 29000, fuel: 'Diesel', price: 2150000, emoji: '🚙', location: 'Lavington' },
  { id: 6, make: 'Tesla', name: 'Model 3 SR+', year: 2022, km: 18000, fuel: 'Electric', price: 4900000, emoji: '⚡', location: 'Ruai' },
  { id: 7, make: 'Toyota', name: 'Prius', year: 2019, km: 56000, fuel: 'Hybrid', price: 2050000, emoji: '🚗', location: 'Kikuyu' },
  { id: 8, make: 'Subaru', name: 'Impreza XV', year: 2018, km: 92000, fuel: 'Petrol', price: 1680000, emoji: '🚙', location: 'Ngong' },
];

let favourites = new Set(load());
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (_) { return []; } }
function save() { try { localStorage.setItem(KEY, JSON.stringify([...favourites])); } catch (_) {} }
function money(n) { return 'KES ' + n.toLocaleString('en-KE'); }
function esc(v) { return String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function toast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2200); }

function visibleCars() {
  const q = (document.getElementById('search').value || '').toLowerCase();
  const make = document.getElementById('make').value;
  const fuel = document.getElementById('fuel').value;
  const max = document.getElementById('maxPrice').value;
  const onlyFav = document.getElementById('favToggle').classList.contains('active');
  return cars.filter(c =>
    (!q || `${c.make} ${c.name}`.toLowerCase().includes(q)) &&
    (make === 'all' || c.make === make) &&
    (fuel === 'all' || c.fuel === fuel) &&
    (max === 'all' || c.price <= Number(max)) &&
    (!onlyFav || favourites.has(c.id)));
}

function render() {
  const list = visibleCars();
  document.getElementById('resultCount').textContent = `${list.length} of ${cars.length} cars`;
  document.getElementById('grid').innerHTML = list.length ? list.map(c => `
    <article class="car">
      <div class="car-art-big">${c.emoji}</div>
      <div class="car-body">
        <h3>${esc(c.make)} ${esc(c.name)}</h3>
        <p class="meta">${c.year} · ${c.km.toLocaleString()} km · ${c.fuel} · ${esc(c.location)}</p>
        <div class="price">${money(c.price)}</div>
        <div class="car-actions">
          <button class="view-btn" data-view="${c.id}">View details</button>
          <button class="fav-btn ${favourites.has(c.id) ? 'on' : ''}" data-fav="${c.id}">${favourites.has(c.id) ? '♥ Saved' : '♡ Save'}</button>
        </div>
      </div>
    </article>`).join('') : '<div class="empty">No cars match these filters. Try widening your budget.</div>';
}

function openCar(id) {
  const c = cars.find(x => x.id === id); if (!c) return;
  const w = c.fuel === 'Electric' ? '~450 km' : '~600 km';
  document.getElementById('modalBody').innerHTML = `
    <p class="eyebrow">${esc(c.location)} · verified listing</p>
    <h2>${esc(c.make)} ${esc(c.name)}</h2>
    <div class="price">${money(c.price)}</div>
    <p class="muted">${c.year} · ${c.km.toLocaleString()} km · ${c.fuel} · Range ${w}</p>
    <p>Well-maintained, clean history and ready for a test drive. Price is negotiable for a serious buyer.</p>
    <form id="driveForm">
      <label>Your name<input required placeholder="Full name" /></label>
      <label>Phone number<input required placeholder="0712 345 678" /></label>
      <label>Preferred day<input type="date" required min="${new Date().toISOString().slice(0, 10)}" /></label>
      <button class="primary-btn" type="submit">Request a test drive</button>
    </form>`;
  document.getElementById('modal').classList.add('open');
  document.getElementById('driveForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    localStorage.setItem('vroomhub:requests:' + Date.now(), JSON.stringify({ car: c.name, ...data }));
    closeModal(); toast(`Test drive requested for the ${c.name}`);
  });
}
function closeModal() { document.getElementById('modal').classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('vroomhub:dark') === 'true') document.body.classList.add('dark');
  document.getElementById('make').innerHTML += [...new Set(cars.map(c => c.make))].sort().map(m => `<option>${m}</option>`).join('');
  const hero = cars[0];
  document.getElementById('heroName').textContent = `${hero.make} ${hero.name}`;
  document.getElementById('heroMeta').textContent = `${hero.year} · ${hero.km.toLocaleString()} km · ${hero.fuel}`;
  document.getElementById('heroPrice').textContent = money(hero.price);

  ['search', 'make', 'fuel', 'maxPrice'].forEach(id => document.getElementById(id).addEventListener('input', render));
  document.getElementById('favToggle').addEventListener('click', e => {
    e.currentTarget.classList.toggle('active'); render();
  });
  document.getElementById('grid').addEventListener('click', e => {
    const fav = e.target.closest('[data-fav]');
    if (fav) {
      const id = Number(fav.dataset.fav);
      favourites.has(id) ? favourites.delete(id) : favourites.add(id);
      save(); render(); toast(favourites.has(id) ? 'Added to favourites' : 'Removed from favourites'); return;
    }
    const view = e.target.closest('[data-view]'); if (view) openCar(Number(view.dataset.view));
  });
  document.getElementById('themeBtn').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('vroomhub:dark', document.body.classList.contains('dark'));
  });
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  render();
});
