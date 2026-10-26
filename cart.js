const CART_KEY = "cart";

function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      description: product.description || "",
      brand: "",
      weight: 0,
      quantity: 1,
    });
  }
  saveCart(cart);
}

function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0);
  badge.classList.toggle("flex", count > 0);
}

function flashAdded(btn) {
  if (!btn.dataset.label) btn.dataset.label = btn.textContent.trim();
  btn.textContent = "Added ✓";
  clearTimeout(btn._timer);
  btn._timer = setTimeout(() => {
    btn.textContent = btn.dataset.label;
  }, 1000);
}


function readProductFromButton(btn) {
  const card = btn.closest(".group")?.parentElement;
  if (!card) return null;

  const title = card.querySelector("h3")?.textContent.trim();
  const img = card.querySelector("img");
  const priceEl = card.querySelector(".price") || [...card.querySelectorAll("p")].pop();
  const match = priceEl?.textContent.replace(/,/g, "").match(/\d+(\.\d+)?/);

  if (!title || !img || !match) return null; 

  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title,
    price: parseFloat(match[0]),
    thumbnail: img.src,
    description: card.querySelector(".dec, .desc")?.textContent.trim() || "",
  };
}


document.addEventListener("click", (e) => {
  const btn = e.target.closest(".group button");
  if (!btn) return;
  if (!/add to cart/i.test(btn.dataset.label || btn.textContent)) return;

  const product = readProductFromButton(btn);
  if (!product) return;

  addToCart(product);
  flashAdded(btn);
});

document.addEventListener("DOMContentLoaded", updateCartCount);