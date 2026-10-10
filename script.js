const WA_NUMBER = "6285188906264";

const GROSIR_MIN = 50;

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");
const waLink = (t) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* abaikan */ } },
};

/* ---------- Data Produk Terverifikasi ---------- */
/* sizes: [label, harga ecer, harga grosir]; null = hubungi tim pengadaan */
const PRODUCTS = [
  {
    nama: "Piring Anyaman Bambu",
    cat: "Piring & Nampan",
    tag: "Food-Grade Higienis",
    hue: 34,
    img: "img/piring.png",
    fallback: "image.png",
    desc: "Anyaman rapat, presisi, dan kokoh dari bilah bambu pilihan dengan perlakuan natural food-grade. Solusi penyajian hidangan lauk, nasi liwet, dan jamuan prasmanan hotel serta restoran modern.",
    sizes: [["Diameter 20 cm", 8500, 6500], ["Diameter 25 cm", 12000, 9500], ["Diameter 30 cm", 15000, 12000]]
  },
  {
    nama: "Bakul Nasi Bambu",
    cat: "Wadah & Tutup",
    tag: "Wadah Saji Tradisional",
    hue: 30,
    img: "img/bakul.png",
    fallback: "image copy.png",
    desc: "Wadah saji nasi tradisional berpori mikro alami yang menjaga kehangatan nasi tetap pulen, tidak lembek, dan tahan basi. Tampilan estetik khas Nusantara untuk meja saji resto dan perhotelan.",
    sizes: [["Kecil 20 cm", 25000, 20000], ["Sedang 25 cm", 38000, 30000], ["Besar 30 cm", 50000, 42000]]
  },
  {
    nama: "Nampan / Tampah Bambu",
    cat: "Piring & Nampan",
    tag: "Spesial Tumpeng & Saji",
    hue: 38,
    img: "img/nampan.png",
    fallback: "image copy 2.png",
    desc: "Nampan anyaman lebar untuk sajian tumpeng, jajanan pasar, dan prasmanan hidangan besar. Anyaman dasar rata dengan lingkar penguat tali sintetis rapi untuk durabilitas intensif.",
    sizes: [["Diameter 40 cm", 30000, 25000], ["Diameter 50 cm", 45000, 38000], ["Diameter 60 cm", 60000, 50000]]
  },
  {
    nama: "Wadah Saji Berpenutup",
    cat: "Wadah & Tutup",
    tag: "Set Nampan & Cloche",
    hue: 28,
    img: "img/wadah.png",
    fallback: "image copy 4.png",
    desc: "Set nampan saji dengan penutup kubah anyaman berestetika tinggi. Melindungi sajian makanan dari debu dan serangga dengan sirkulasi udara alami untuk kafe, hotel, dan katering eksklusif.",
    sizes: [["Dimensi 15 × 15 cm", 15000, 12000], ["Dimensi 20 × 20 cm", 25000, 20000], ["Dimensi 25 × 25 cm", 38000, 29000]]
  },
  {
    nama: "Tutup Saji Bambu",
    cat: "Wadah & Tutup",
    tag: "Tudung Saji Higienis",
    hue: 36,
    img: "img/tutup-saji.png",
    fallback: "image copy 3.png",
    desc: "Tudung saji kubah anyaman bambu alami berpenutup rapat dengan pegangan atas kokoh. Menjaga higienitas makanan di atas meja saji dengan nuansa alami dan sirkulasi udara lancar.",
    sizes: [["Diameter 30 cm", 22000, 18000], ["Diameter 40 cm", 32000, 26000], ["Custom Ukuran B2B", null, null]]
  },
  {
    nama: "Sendok & Centong Bambu",
    cat: "Alat Masak",
    tag: "Cutlery Ramah Teflon",
    hue: 32,
    img: "img/sendok.png",
    fallback: "image copy 5.png",
    desc: "Set cutlery dan centong nasi bambu alami berpenyelesaian halus. Tidak menggores lapisan wajan antilengket, tahan panas tinggi, aman bebas zat kimia, dan mudah dibersihkan.",
    sizes: [["Sendok Makan Bambu", 8000, 6500], ["Centong Nasi Standar", 12000, 9500], ["Centong Sayur Kuah", 15000, 12000]]
  },
];

/* ---------- FAQ Perusahaan ---------- */
const FAQ = [
  [
    "Apa profil dan legalitas operasional PT Bambu Kita?",
    "PT Bambu Kita (BambuKita) adalah entitas manufaktur dan agregator pasokan anyaman bambu legal berbadan hukum Indonesia. Kami beroperasi sebagai mitra langsung sentra pengrajin binaan untuk mendistribusikan produk alat saji food-grade berkualitas ke jaringan hotel, restoran, katering, dan ritel modern berskala nasional."
  ],
  [
    "Bagaimana jaminan kualitas mutu food-grade dan kebersihan produk?",
    "Setiap produk melewati 3 tahap kendali mutu (Quality Control): pengasapan alami untuk sterilisasi serat, pengeringan kadar air optimal guna mencegah pembentukan jamur, serta pembersihan akhir tanpa zat pewarna kimia sintetis berbahaya. Produk aman bersentuhan langsung dengan makanan panas."
  ],
  [
    "Apakah melayani pesanan partai besar (B2B) dan penerbitan faktur/invoice?",
    "Ya, kami mengkhususkan diri dalam pengadaan B2B untuk industri Horeka. Kami melayani kapasitas pesanan hingga puluhan ribu unit per bulan dengan dukungan invoice resmi, tanda terima korporat, serta perjanjian kerja sama pengadaan berkala."
  ],
  [
    "Apakah tersedia layanan kustomisasi logo (cap bakar / laser engraving)?",
    "Ya, untuk pesanan minimal 100 unit per item, kami menyediakan fasilitas pembuatan logo bakar atau laser engraving identitas merek restoran Anda pada lis tepi piring, nampan, maupun centong dengan biaya ramah anggaran Rp 2.000–Rp 5.000 per unit."
  ],
  [
    "Berapa minimal pemesanan (MOQ) dan bagaimana skema harga grosir dihitung?",
    "Pemesanan sampel eceran dapat dilakukan mulai dari 1 unit. Skema harga grosir pabrik otomatis aktif saat pemesanan mencapai minimal 50 unit per produk (potongan hemat 15% hingga 20%), dan sistem kalkulator katalog kami akan menghitung totalnya secara langsung."
  ],
  [
    "Bagaimana prosedur pengiriman kargo dan garansi keamanan barang?",
    "Untuk pesanan satuan/sampel kami menggunakan ekspedisi reguler (JNE, SiCepat, J&T). Untuk pengadaan partai besar B2B, kami bermitra dengan penyedia kargo darat dan laut terverifikasi (Indah Kargo, Baraka, Dakota) yang berbiaya efisien dengan perlindungan garansi penggantian unit baru apabila terjadi kerusakan saat transit logistik."
  ],
  [
    "Bagaimana kelompok pengrajin desa dapat bergabung menjadi mitra pemasok?",
    "Kelompok pengrajin atau UMKM desa dapat mengisi formulir kemitraan pada bagian tab Pengrajin. Tim kemitraan lapangan kami akan meninjau kapasitas produksi, mengirimkan standar spesifikasi cetakan, dan memfasilitasi kurasi sampel agar produk dapat masuk ke dalam katalog korporasi resmi."
  ],
  [
    "Bagaimana panduan perawatan alat saji bambu agar awet bertahun-tahun?",
    "Cukup cuci dengan air dan sabun lembut menggunakan spons halus, lalu segera tiriskan dan angin-anginkan hingga kering sempurna sebelum disimpan. Hindari merendam peralatan bambu di dalam air dalam waktu lama atau menyimpannya di tempat lembap tanpa sirkulasi udara."
  ],
];

/* ==========================================================
   Toast Notification
   ========================================================== */
const toastEl = $("#toast");
let toastTimer;
function toast(msg, icon = "bi-check-circle-fill", showCheckout = false) {
  const cta = showCheckout ? `<button type="button" class="toast__cta" data-toast-cart>Checkout <i class="bi bi-arrow-right" aria-hidden="true"></i></button>` : "";
  toastEl.innerHTML = `<i class="bi ${icon}" aria-hidden="true"></i><span>${esc(msg)}</span>${cta}`;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3200);
}
toastEl.addEventListener("click", (e) => {
  if (e.target.closest("[data-toast-cart]")) openCart();
});

/* ==========================================================
   Tema Terang / Gelap
   ========================================================== */
const root = document.documentElement;
const themeBtn = $("#themeBtn");
function setTheme(t) {
  root.dataset.theme = t;
  store.set("bk-theme", t);
  themeBtn.setAttribute("aria-pressed", t === "dark");
  $('meta[name="theme-color"]').content = t === "dark" ? "#0e1812" : "#faf8f2";
}
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
setTheme(root.dataset.theme || "light");

/* ==========================================================
   Navbar: Menu Mobile, Scroll State, Progress, Spy
   ========================================================== */
const nav = $("#nav");
const menu = $("#menu");
const navToggle = $("#navToggle");
function closeMenu() {
  menu.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.firstElementChild.className = "bi bi-list";
}
navToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", open);
  navToggle.setAttribute("aria-label", open ? "Tutup menu navigasi" : "Buka menu navigasi");
  navToggle.firstElementChild.className = open ? "bi bi-x-lg" : "bi bi-list";
});
$$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => { if (!nav.contains(e.target)) closeMenu(); });

const progress = $("#progress");
let ticking = false;
function onScroll() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.transform = `scaleX(${max > 0 ? h.scrollTop / max : 0})`;
  nav.classList.toggle("is-scrolled", h.scrollTop > 12);
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

const links = $$(":scope > a:not(.btn)", menu);
const linkMap = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting && linkMap.has(en.target.id)) {
      links.forEach((l) => l.classList.remove("is-active"));
      linkMap.get(en.target.id).classList.add("is-active");
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
linkMap.forEach((_, id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

/* ==========================================================
   Reveal Scroll Animations
   ========================================================== */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); } });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
const watchReveal = (scope = document) => $$(".reveal:not(.in)", scope).forEach((el) => revealIO.observe(el));
watchReveal();

/* ==========================================================
   Corporate Stats Counter Animation
   ========================================================== */
const statsEl = $(".stats");
if (statsEl && !reduceMotion) {
  const nums = $$("[data-count]", statsEl);
  nums.forEach((n) => (n.textContent = "0" + n.dataset.suffix));
  new IntersectionObserver((en, io) => {
    if (!en[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      nums.forEach((n) => {
        const target = +n.dataset.count;
        if (target >= 1000) {
          n.textContent = Math.round(target * e).toLocaleString("id-ID") + n.dataset.suffix;
        } else {
          n.textContent = Math.round(target * e) + n.dataset.suffix;
        }
      });
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, { threshold: 0.4 }).observe(statsEl);
}

/* ==========================================================
   Parallax Halus pada Hero Visual
   ========================================================== */
const visual = $(".hero__visual");
if (visual && !reduceMotion && matchMedia("(pointer: fine)").matches) {
  const hero = $(".hero");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    visual.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    visual.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  });
}

/* ==========================================================
   Katalog Produk: Filter, Cari, Urutkan
   ========================================================== */
const grid = $("#productGrid");
const chipsEl = $("#chips");
const qEl = $("#q");
const sortEl = $("#sort");
const emptyEl = $("#empty");
const resultEl = $("#result");
const state = { cat: "Semua", q: "", sort: "rec" };
const CATS = ["Semua", ...new Set(PRODUCTS.map((p) => p.cat))];

const minPrice = (p) => Math.min(...p.sizes.filter((s) => s[1] != null).map((s) => s[1]));
const unitFor = (s, qty) => (qty >= GROSIR_MIN ? s[2] : s[1]);

function renderChips() {
  chipsEl.innerHTML = CATS.map((c) => {
    const n = c === "Semua" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c).length;
    return `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${state.cat === c}">${esc(c)}<small>${n}</small></button>`;
  }).join("");
}

function cardHTML(p, pi) {
  const sizes = p.sizes.map((s, si) => `<button class="sz" type="button" data-si="${si}" aria-pressed="${si === 0}">${esc(s[0])}</button>`).join("");
  return `
  <article class="card pcard reveal" data-pi="${pi}" data-si="0" style="--d:${(pi % 3) * 0.08}s">
    <div class="pcard__img">
      <span class="pcard__tag"><i class="bi bi-patch-check" aria-hidden="true"></i> ${esc(p.tag)}</span>
      <div class="ph" style="--h:${p.hue}">
        <img src="${p.img}" alt="${esc(p.nama)}" loading="lazy" onerror="this.onerror=null; this.src='${p.fallback}'">
      </div>
    </div>
    <div class="pcard__body">
      <div class="pcard__title-row">
        <h3>${esc(p.nama)}</h3>
        <span class="pcard__cat-badge">${esc(p.cat)}</span>
      </div>
      <p>${esc(p.desc)}</p>
      <div class="szs" role="group" aria-label="Pilih ukuran ${esc(p.nama)}">${sizes}</div>
      <div class="pbox" data-pbox></div>
      <div class="pcard__row" data-row>
        <div class="qty">
          <button type="button" data-q="-1" aria-label="Kurangi jumlah pesanan"><i class="bi bi-dash-lg" aria-hidden="true"></i></button>
          <input type="number" min="1" max="9999" value="1" inputmode="numeric" aria-label="Jumlah pesanan (pcs)">
          <button type="button" data-q="1" aria-label="Tambah jumlah pesanan"><i class="bi bi-plus-lg" aria-hidden="true"></i></button>
        </div>
        <div class="sub" data-sub></div>
      </div>
      <div class="pcard__act">
        <button class="btn btn--primary" type="button" data-add><i class="bi bi-bag-plus" aria-hidden="true"></i><span>Tambah ke Keranjang</span></button>
        <a class="iconbtn" data-wacard target="_blank" rel="noopener" href="#" aria-label="Inquiry Pengadaan Produk via WhatsApp"><i class="bi bi-whatsapp" aria-hidden="true"></i></a>
      </div>
    </div>
  </article>`;
}

function updateCard(card) {
  const p = PRODUCTS[+card.dataset.pi];
  const si = +card.dataset.si;
  const s = p.sizes[si];
  const input = $(".qty input", card);
  const qty = Math.max(1, Math.min(9999, parseInt(input.value, 10) || 1));
  const pbox = $("[data-pbox]", card);
  const row = $("[data-row]", card);
  const addBtn = $("[data-add]", card);
  const wa = $("[data-wacard]", card);

  if (s[1] == null) {
    pbox.className = "pbox pbox--cs";
    pbox.innerHTML = `<span><i class="bi bi-chat-left-dots-fill" aria-hidden="true"></i> Kustomisasi Spesifikasi Khusus B2B</span>`;
    row.hidden = true;
    addBtn.querySelector("span").textContent = "Inquiry Ukuran Custom";
    addBtn.firstElementChild.className = "bi bi-whatsapp";
    wa.href = waLink(`Halo PT Bambu  Kita, saya ingin mengajukan penawaran custom untuk: ${p.nama} (${s[0]}).`);
    return;
  }
  const gro = qty >= GROSIR_MIN;
  pbox.className = "pbox";
  pbox.innerHTML = `
    <div><small>Eceran / Sampel</small><strong>${rupiah(s[1])}</strong></div>
    <div class="gro"><small>Grosir B2B (&ge; ${GROSIR_MIN} pcs)</small><b>${rupiah(s[2])}</b></div>`;
  row.hidden = false;
  $(".sub", row).innerHTML = `Subtotal: <b>${rupiah(unitFor(s, qty) * qty)}</b>${gro ? ' <span class="tier">&middot; Tarif Grosir B2B</span>' : ""}`;
  addBtn.querySelector("span").textContent = "Tambah ke Keranjang";
  addBtn.firstElementChild.className = "bi bi-bag-plus";
  wa.href = waLink(`Halo PT Bambu Kita, saya ingin memesan produk: ${p.nama} (${s[0]}) sebanyak ${qty} pcs.`);
}

function visibleProducts() {
  const q = state.q.trim().toLowerCase();
  let list = PRODUCTS.map((p, pi) => ({ p, pi })).filter(({ p }) =>
    (state.cat === "Semua" || p.cat === state.cat) &&
    (!q || `${p.nama} ${p.tag} ${p.cat} ${p.desc}`.toLowerCase().includes(q)));
  if (state.sort === "asc") list.sort((a, b) => minPrice(a.p) - minPrice(b.p));
  if (state.sort === "desc") list.sort((a, b) => minPrice(b.p) - minPrice(a.p));
  if (state.sort === "az") list.sort((a, b) => a.p.nama.localeCompare(b.p.nama, "id"));
  return list;
}

function renderProducts() {
  const list = visibleProducts();
  grid.innerHTML = list.map(({ p, pi }) => cardHTML(p, pi)).join("");
  $$(".pcard", grid).forEach(updateCard);
  watchReveal(grid);
  emptyEl.hidden = list.length > 0;
  grid.hidden = list.length === 0;
  resultEl.textContent = `Menampilkan ${list.length} dari ${PRODUCTS.length} lini produk terkurasi`;
}

chipsEl.addEventListener("click", (e) => {
  const b = e.target.closest(".chip");
  if (!b) return;
  state.cat = b.dataset.cat;
  renderChips();
  renderProducts();
});
let qTimer;
qEl.addEventListener("input", () => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = qEl.value; renderProducts(); }, 160); });
sortEl.addEventListener("change", () => { state.sort = sortEl.value; renderProducts(); });
$("#resetFilter").addEventListener("click", () => {
  Object.assign(state, { cat: "Semua", q: "", sort: "rec" });
  qEl.value = ""; sortEl.value = "rec";
  renderChips(); renderProducts();
});

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".pcard");
  if (!card) return;
  const sz = e.target.closest(".sz");
  if (sz) {
    $$(".sz", card).forEach((b) => b.setAttribute("aria-pressed", b === sz));
    card.dataset.si = sz.dataset.si;
    updateCard(card);
    return;
  }
  const qb = e.target.closest("[data-q]");
  if (qb) {
    const input = $(".qty input", card);
    input.value = Math.max(1, (parseInt(input.value, 10) || 1) + +qb.dataset.q);
    updateCard(card);
    return;
  }
  if (e.target.closest("[data-add]")) {
    const addBtn = e.target.closest("[data-add]");
    const pi = +card.dataset.pi, si = +card.dataset.si;
    const p = PRODUCTS[pi], s = p.sizes[si];
    if (s[1] == null) {
      window.open(waLink(`Halo PT Bambu Kita, saya ingin mengajukan penawaran custom: ${p.nama} (${s[0]}).`), "_blank", "noopener");
      return;
    }
    const qty = Math.max(1, parseInt($(".qty input", card).value, 10) || 1);
    flyToCart(addBtn);
    addToCart(pi, si, qty);
    toast(`${p.nama} (${s[0]}) dimasukkan ke keranjang`, "bi-check-circle-fill", true);
  }
});
grid.addEventListener("input", (e) => { if (e.target.matches(".qty input")) updateCard(e.target.closest(".pcard")); });

/* ==========================================================
   Keranjang Pesanan B2B (Drawer & Floating Engine)
   ========================================================== */
const drawer = $("#drawer");
const overlay = $("#overlay");
const cartBtn = $("#cartBtn");
const cartBadge = $("#cartBadge");
const cartBody = $("#cartBody");
const cartFoot = $("#cartFoot");

let cart = store.get("bk-cart", []).filter((it) => PRODUCTS[it.pi]?.sizes[it.si]?.[1] != null && it.qty > 0);
let lastFocus = null;

const saveCart = () => store.set("bk-cart", cart);

function flyToCart(fromEl) {
  if (reduceMotion || !fromEl || !cartBtn) return;
  const fromRect = fromEl.getBoundingClientRect();
  const toRect = cartBtn.getBoundingClientRect();

  const flyer = document.createElement("div");
  flyer.className = "cart-flyer";
  flyer.innerHTML = '<i class="bi bi-bag-plus-fill" aria-hidden="true"></i>';
  flyer.style.left = `${fromRect.left + fromRect.width / 2}px`;
  flyer.style.top = `${fromRect.top + fromRect.height / 2}px`;
  document.body.appendChild(flyer);

  requestAnimationFrame(() => {
    flyer.style.left = `${toRect.left + toRect.width / 2}px`;
    flyer.style.top = `${toRect.top + toRect.height / 2}px`;
    flyer.style.transform = "translate(-50%, -50%) scale(0.35)";
    flyer.style.opacity = "0.2";
  });

  setTimeout(() => {
    flyer.remove();
    cartBtn.classList.remove("bump");
    void cartBtn.offsetWidth;
    cartBtn.classList.add("bump");
  }, 560);
}

function addToCart(pi, si, qty) {
  const it = cart.find((c) => c.pi === pi && c.si === si);
  if (it) it.qty = Math.min(9999, it.qty + qty); else cart.push({ pi, si, qty });
  saveCart(); renderCart();
  cartBtn.classList.remove("bump"); void cartBtn.offsetWidth; cartBtn.classList.add("bump");
}

function totals() {
  let total = 0, ecerTotal = 0, count = 0;
  cart.forEach((it) => {
    const s = PRODUCTS[it.pi].sizes[it.si];
    total += unitFor(s, it.qty) * it.qty; ecerTotal += s[1] * it.qty; count += it.qty;
  });
  return { total, saved: ecerTotal - total, count };
}

function renderCart() {
  const { total, saved, count } = totals();
  const itemCount = cart.length; // Jumlah baris/item barang yang masuk keranjang: 1, 2, 3, dst

  if (itemCount > 0) {
    cartBadge.removeAttribute("hidden");
    cartBadge.style.display = "inline-grid";
    cartBadge.textContent = itemCount > 99 ? "99+" : itemCount;
    cartBtn.classList.add("has-items");
  } else {
    cartBadge.setAttribute("hidden", "");
    cartBadge.style.display = "none";
    cartBadge.textContent = "0";
    cartBtn.classList.remove("has-items");
  }

  if (!cart.length) {
    cartBody.innerHTML = `
      <div class="cempty">
        <i class="bi bi-bag-x" aria-hidden="true"></i>
        <h4>Keranjang Pesanan Kosong</h4>
        <p>Silakan eksplorasi lini produk pada katalog resmi dan tambahkan item pengadaan Anda.</p>
        <button class="btn btn--primary" type="button" data-close-go>Buka Katalog Produk</button>
      </div>`;
    cartFoot.hidden = true;
    return;
  }
  cartFoot.hidden = false;
  cartBody.innerHTML = cart.map((it, i) => {
    const p = PRODUCTS[it.pi], s = p.sizes[it.si], gro = it.qty >= GROSIR_MIN;
    const need = GROSIR_MIN - it.qty;
    const hint = gro ? "" : `
      <div class="hint">
        <span>Tambah <b>${need} pcs</b> lagi untuk membuka tarif grosir B2B (hemat ${rupiah((s[1] - s[2]) * GROSIR_MIN)} per ${GROSIR_MIN} unit)</span>
        <div class="bar"><i style="width:${(it.qty / GROSIR_MIN) * 100}%"></i></div>
        <button type="button" data-act="set" data-i="${i}">Optimalkan ke ${GROSIR_MIN} pcs</button>
      </div>`;
    return `
      <div class="citem">
        <div class="citem__top">
          <div><b>${esc(p.nama)}</b><small>Ukuran: ${esc(s[0])}</small></div>
          <button class="citem__rm" type="button" data-act="rm" data-i="${i}" aria-label="Hapus ${esc(p.nama)} dari keranjang"><i class="bi bi-trash3" aria-hidden="true"></i></button>
        </div>
        <div class="citem__row">
          <div class="qty">
            <button type="button" data-act="dec" data-i="${i}" aria-label="Kurangi jumlah unit"><i class="bi bi-dash-lg"></i></button>
            <input type="number" min="1" max="9999" value="${it.qty}" data-i="${i}" aria-label="Jumlah unit ${esc(p.nama)}">
            <button type="button" data-act="inc" data-i="${i}" aria-label="Tambah jumlah unit"><i class="bi bi-plus-lg"></i></button>
          </div>
          <div class="citem__price">
            ${rupiah(unitFor(s, it.qty))} &times; ${it.qty}${gro ? '<span class="gtag">Grosir B2B</span>' : ""}
            <strong>${rupiah(unitFor(s, it.qty) * it.qty)}</strong>
          </div>
        </div>
        ${hint}
      </div>`;
  }).join("");

  cartFoot.innerHTML = `
    <div class="tot">
      <div><span>Subtotal Volume (${count} pcs)</span><span>${rupiah(total)}</span></div>
      ${saved > 0 ? `<div class="save"><span>Potongan Subsidi Grosir B2B</span><span>&minus; ${rupiah(saved)}</span></div>` : ""}
      <div class="grand"><span>Estimasi Total</span><span>${rupiah(total)}</span></div>
      <small class="muted">Belum termasuk ongkos kargo ekspedisi. Admin pengadaan akan mengalkulasi penawaran logistik terhemat.</small>
    </div>
    <button class="btn btn--wa btn--block btn--lg" type="button" data-checkout><i class="bi bi-whatsapp" aria-hidden="true"></i>Checkout Pesanan ke WhatsApp Procurement</button>
    <button class="clear" type="button" data-clear>Kosongkan Daftar Pesanan</button>`;
}

function openCart() {
  lastFocus = document.activeElement;
  overlay.hidden = false;
  drawer.removeAttribute("inert");
  drawer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => drawer.classList.add("open"));
  cartBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  document.body.classList.add("cart-open");
  $("#drawerClose").focus();
}
function closeCart() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  drawer.setAttribute("inert", "");
  overlay.hidden = true;
  cartBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
  document.body.classList.remove("cart-open");
  if (lastFocus) lastFocus.focus();
}
cartBtn.addEventListener("click", openCart);
$("#drawerClose").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { if (drawer.classList.contains("open")) closeCart(); closeMenu(); } });

cartBody.addEventListener("click", (e) => {
  if (e.target.closest("[data-close-go]")) { closeCart(); location.hash = "#produk"; return; }
  const b = e.target.closest("[data-act]");
  if (!b) return;
  const i = +b.dataset.i, it = cart[i];
  if (!it) return;
  if (b.dataset.act === "inc") it.qty = Math.min(9999, it.qty + 1);
  if (b.dataset.act === "dec") it.qty = Math.max(1, it.qty - 1);
  if (b.dataset.act === "set") it.qty = GROSIR_MIN;
  if (b.dataset.act === "rm") cart.splice(i, 1);
  saveCart(); renderCart();
});
cartBody.addEventListener("change", (e) => {
  if (!e.target.matches("input[data-i]")) return;
  const it = cart[+e.target.dataset.i];
  if (it) it.qty = Math.max(1, Math.min(9999, parseInt(e.target.value, 10) || 1));
  saveCart(); renderCart();
});
cartFoot.addEventListener("click", (e) => {
  if (e.target.closest("[data-clear]")) { cart = []; saveCart(); renderCart(); toast("Daftar pesanan telah dikosongkan", "bi-trash3"); return; }
  if (e.target.closest("[data-checkout]")) {
    const { total, saved, count } = totals();
    const lines = cart.map((it, n) => {
      const p = PRODUCTS[it.pi], s = p.sizes[it.si], gro = it.qty >= GROSIR_MIN;
      return `${n + 1}. ${p.nama} (${s[0]}) — ${it.qty} pcs @ ${rupiah(unitFor(s, it.qty))}${gro ? " [Tarif Grosir B2B]" : ""} = ${rupiah(unitFor(s, it.qty) * it.qty)}`;
    });
    const msg = [
      "Halo Tim Procurement PT Bambu Nusantara Kita,",
      "Saya ingin mengajukan purchase order / rincian pesanan berikut:",
      "",
      ...lines,
      "",
      `Total Volume: ${count} unit`,
      `Estimasi Nilai Barang: ${rupiah(total)}`,
      saved > 0 ? `Subtotal Penghematan B2B: ${rupiah(saved)}` : null,
      "",
      "Mohon konfirmasi ketersediaan stok, opsi kargo terhemat, dan estimasi waktu pengerjaan.",
      "Terima kasih."
    ].filter((l) => l !== null);
    window.open(waLink(msg.join("\n")), "_blank", "noopener");
  }
});

/* ==========================================================
   FAQ Accordion
   ========================================================== */
const faqList = $("#faqList");
faqList.innerHTML = FAQ.map(([q, a], i) => `
  <div class="qa${i === 0 ? " open" : ""}">
    <h3><button class="qa__q" type="button" id="qb-${i}" aria-expanded="${i === 0}" aria-controls="qa-${i}"><span>${i + 1}. ${esc(q)}</span><i class="bi bi-plus-lg" aria-hidden="true"></i></button></h3>
    <div class="qa__a" id="qa-${i}" role="region" aria-labelledby="qb-${i}"><div><p>${esc(a)}</p></div></div>
  </div>`).join("");
faqList.addEventListener("click", (e) => {
  const btn = e.target.closest(".qa__q");
  if (!btn) return;
  const item = btn.closest(".qa");
  const willOpen = !item.classList.contains("open");
  $$(".qa", faqList).forEach((x) => { x.classList.remove("open"); $(".qa__q", x).setAttribute("aria-expanded", "false"); });
  if (willOpen) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
});

/* ==========================================================
   Tab Konsultasi (Peran Kemitraan)
   ========================================================== */
const tabs = { seller: ["tab-seller", "panel-seller"], buyer: ["tab-buyer", "panel-buyer"] };
function selectTab(key) {
  Object.entries(tabs).forEach(([k, [t, p]]) => {
    const on = k === key, tab = document.getElementById(t);
    tab.setAttribute("aria-selected", on);
    tab.tabIndex = on ? 0 : -1;
    document.getElementById(p).hidden = !on;
  });
}
Object.entries(tabs).forEach(([k, [t]]) => {
  const el = document.getElementById(t);
  el.addEventListener("click", () => selectTab(k));
  el.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const next = k === "seller" ? "buyer" : "seller";
      selectTab(next);
      document.getElementById(tabs[next][0]).focus();
    }
  });
});
$$("[data-tab]").forEach((a) => a.addEventListener("click", () => selectTab(a.dataset.tab)));

/* ==========================================================
   Formulir Konsultasi -> WhatsApp Generator
   ========================================================== */
$$("form.form").forEach((form) => {
  form.addEventListener("input", (e) => e.target.classList.remove("invalid"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bad = $$("input,textarea", form).filter((el) => !el.checkValidity());
    $$("input,textarea", form).forEach((el) => el.classList.toggle("invalid", bad.includes(el)));
    if (bad.length) { bad[0].focus(); toast("Harap lengkapi kolom yang ditandai", "bi-exclamation-circle-fill"); return; }
    const d = Object.fromEntries(new FormData(form).entries());
    const peran = form.dataset.role;
    const lines = [
      `Halo PT Bambu Nusantara Kita, saya ingin berkonsultasi mengenai kemitraan sebagai ${peran === "Pengerajin" ? "Mitra Pengrajin Desa" : "Klien Pembeli / Industri Horeka"}.`,
      "",
      `Nama Pemohon/PIC: ${d.nama}`,
      d.kelompok ? `Kelompok Anyam / UMKM: ${d.kelompok}` : null,
      d.usaha ? `Perusahaan / Restoran: ${d.usaha}` : null,
      `Kota Asal / Tujuan: ${d.asal}`,
      `Kebutuhan Produk: ${d.produk}`,
      d.kapasitas ? (peran === "Pengerajin" ? `Kapasitas Produksi: ${d.kapasitas}` : `Perkiraan Volume Unit: ${d.kapasitas}`) : null,
      `Nomor WhatsApp: ${d.wa}`,
      d.cerita ? `Catatan Tambahan: ${d.cerita}` : null,
      "",
      "Mohon arahan dan informasi penawaran lebih lanjut. Terima kasih."
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    toast("Membuka WhatsApp Procurement…", "bi-whatsapp");
  });
});

/* ==========================================================
   Tautan WhatsApp Umum & Tahun Hak Cipta
   ========================================================== */
$$("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.msg || "Halo PT Bambu Kita, saya ingin berkonsultasi mengenai pengadaan peralatan dapur anyaman bambu.");
  a.target = "_blank"; a.rel = "noopener";
});
$("#year").textContent = new Date().getFullYear();

/* ---------- Inisialisasi Tampilan ---------- */
renderChips();
renderProducts();
renderCart();