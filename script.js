const STORAGE_KEY = "wishing-well:wishes";

const form = document.getElementById("wish-form");
const wishInput = document.getElementById("wish-input");
const status = document.getElementById("status");
const wishList = document.getElementById("wish-list");

const loadWishes = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveWishes = (wishes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
};

const render = (wishes) => {
  wishList.innerHTML = "";
  wishes.forEach((wish) => {
    const item = document.createElement("li");
    item.textContent = `🪙 ${wish}`;
    wishList.append(item);
  });
};

const wishes = loadWishes();
render(wishes);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = wishInput.value.trim();
  if (!text) {
    status.textContent = "Write a wish before tossing a coin.";
    return;
  }

  wishes.unshift(text);
  saveWishes(wishes);
  render(wishes);
  form.reset();
  wishInput.focus();

  status.textContent = "Your coin splashes into the well ✨";
});
