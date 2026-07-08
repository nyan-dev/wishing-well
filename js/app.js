const wishModal = document.getElementById('wishModal');
const discoverModal = document.getElementById('discoverModal');
const openWishModalBtn = document.getElementById('openWishModal');
const closeWishModalBtn = document.getElementById('closeWishModal');
const closeDiscoverModalBtn = document.getElementById('closeDiscoverModal');
const wishForm = document.getElementById('wishForm');
const wishText = document.getElementById('wishText');
const wishCount = document.getElementById('wishCount');

const palette = ['#e07a7a', '#e8c46a', '#6dcde0', '#8be3c6', '#b39cff'];

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
    await api.submitWish({ text, color });
  }

  wishForm.reset();
  updateWishCount();
  closeModal(wishModal);
});

updateWishCount();
