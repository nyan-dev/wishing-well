const wishModal = document.getElementById('wishModal');
const discoverModal = document.getElementById('discoverModal');
const openWishModalBtn = document.getElementById('openWishModal');
const closeWishModalBtn = document.getElementById('closeWishModal');
const closeDiscoverModalBtn = document.getElementById('closeDiscoverModal');
const wishForm = document.getElementById('wishForm');
const wishText = document.getElementById('wishText');
const wishCount = document.getElementById('wishCount');
const boatOverlay = document.getElementById('boatOverlay');
const discoverContent = document.getElementById('discoverContent');

const palette = ['#e07a7a', '#e8c46a', '#6dcde0', '#8be3c6', '#b39cff'];
const boatPositions = [
  { x: 22, y: 60, r: -9 },
  { x: 35, y: 42, r: 7 },
  { x: 48, y: 66, r: -4 },
  { x: 62, y: 49, r: 8 },
  { x: 74, y: 61, r: -8 },
  { x: 56, y: 35, r: 5 },
];

function openModal(el) {
  if (!el) return;
  el.hidden = false;
}

function closeModal(el) {
  if (!el) return;
  el.hidden = true;
}

function updateWishCount() {
  if (!wishText || !wishCount) return;
  wishCount.textContent = `${wishText.value.length} / 200`;
}

async function showRandomWish() {
  const api = window.wishingWellApi;
  let wish = null;

  if (api?.fetchRandomWish) {
    try {
      wish = await api.fetchRandomWish();
    } catch (error) {
      wish = null;
    }
  }

  if (!discoverContent) return;

  discoverContent.textContent = wish?.text
    ? wish.text
    : 'No wishes have surfaced yet. Add one and tap again.';
}

function createBoats() {
  if (!boatOverlay) return;

  boatOverlay.innerHTML = '';
  boatOverlay.setAttribute('aria-hidden', 'false');

  boatPositions.forEach((position, index) => {
    const boat = document.createElement('button');
    boat.type = 'button';
    boat.className = 'wish-boat';
    boat.setAttribute('aria-label', 'Discover a wish');
    boat.style.setProperty('--x', position.x);
    boat.style.setProperty('--y', position.y);
    boat.style.setProperty('--rot', `${position.r}deg`);
    boat.style.setProperty('--boat-color', palette[index % palette.length]);
    boat.style.setProperty('--float-delay', `${index * 0.4}s`);
    boat.style.setProperty('--float-duration', `${3.4 + (index % 3) * 0.6}s`);

    boat.addEventListener('click', async () => {
      await showRandomWish();
      openModal(discoverModal);
    });

    boatOverlay.append(boat);
  });
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
createBoats();
