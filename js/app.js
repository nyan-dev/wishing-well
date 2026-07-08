const wishModal = document.getElementById('wishModal');
const discoverModal = document.getElementById('discoverModal');
const openWishModalBtn = document.getElementById('openWishModal');
const closeWishModalBtn = document.getElementById('closeWishModal');
const closeDiscoverModalBtn = document.getElementById('closeDiscoverModal');
const wishForm = document.getElementById('wishForm');
const wishText = document.getElementById('wishText');
const wishCount = document.getElementById('wishCount');

const palette = ['#e07a7a', '#e8c46a', '#6dcde0', '#8be3c6', '#b39cff'];
window.wishingWellPalette = palette;

const localWishStore = [];

function addLocalWish({ text, color, createdAt }) {
  localWishStore.push({ text, color, createdAt });
}

function openModal(el) {
  if (!el) return;
  el.classList.add('backdrop-visible');
}

function closeModal(el) {
  if (!el) return;
  el.classList.remove('backdrop-visible');
}

function updateWishCount() {
  if (!wishText || !wishCount) return;
  wishCount.textContent = `${wishText.value.length} / 200`;
}

openWishModalBtn?.addEventListener('click', () => openModal(wishModal));
closeWishModalBtn?.addEventListener('click', () => closeModal(wishModal));
closeDiscoverModalBtn?.addEventListener('click', () => closeModal(discoverModal));
wishText?.addEventListener('input', updateWishCount);

wishForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const text = wishText?.value.trim();
  if (!text) return;

  const color = palette[Math.floor(Math.random() * palette.length)];
  const api = window.wishingWellApi;

  if (api?.submitWish) {
    const result = await api.submitWish({ text, color });
    if (result && !result.ok && result.reason === 'missing-config') {
      addLocalWish({ text, color, createdAt: new Date().toISOString() });
    }
  } else {
    addLocalWish({ text, color, createdAt: new Date().toISOString() });
  }

  if (window.wishingWellScene?.addBoat) {
    window.wishingWellScene.addBoat(color);
  }

  wishForm.reset();
  updateWishCount();
  closeModal(wishModal);
});

document.addEventListener('boat-click', async () => {
  const content = document.getElementById('discoverContent');
  content.textContent = 'Discovering...';
  openModal(discoverModal);

  const api = window.wishingWellApi;
  let wish = null;

  if (api?.fetchRandomWish) {
    wish = await api.fetchRandomWish();
  }

  if (!wish && localWishStore.length > 0) {
    const rand = localWishStore[Math.floor(Math.random() * localWishStore.length)];
    wish = { text: rand.text, color: rand.color };
  }

  content.textContent = wish ? `"${wish.text}"` : 'No wishes have surfaced yet.';
});

updateWishCount();
