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

function triggerTossAnimation() {
  const coin = document.getElementById('tossCoin');
  const ripple = document.getElementById('tossRipple');
  if (!coin || !ripple) return;

  coin.style.left = '50%';
  coin.style.top = '30%';
  ripple.style.left = '50%';
  ripple.style.top = '65%';

  coin.classList.remove('active');
  ripple.classList.remove('active');
  void coin.offsetWidth;

  coin.classList.add('active');
  setTimeout(() => ripple.classList.add('active'), 500);

  setTimeout(() => {
    coin.classList.remove('active');
    ripple.classList.remove('active');
  }, 1200);
}

function showToast() {
  const toast = document.getElementById('wishToast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

let lastFocusedElement = null;

function openModal(el) {
  if (!el) return;
  lastFocusedElement = document.activeElement;
  el.classList.add('backdrop-visible');
  const firstFocusable = el.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (firstFocusable) firstFocusable.focus();
}

function closeModal(el) {
  if (!el) return;
  el.classList.remove('backdrop-visible');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') {
    closeModal(wishModal);
    closeModal(discoverModal);
    return;
  }
  if (event.key !== 'Tab') return;
  const modal = document.querySelector('.backdrop-visible .modal');
  if (!modal) return;
  const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
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

  triggerTossAnimation();
  showToast();

  wishForm.reset();
updateWishCount();
document.addEventListener('keydown', handleModalKeydown);
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
