'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}



/**
 * add active class on header when scrolled 200px from top
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 200 ? header.classList.add("active")
    : header.classList.remove("active");
})

let totalPrice = 0; 
const maxProducts = 12;

function addToCart(button) {
  const product = button.closest('.product-card'); 
  const price = parseFloat(product.getAttribute('data-price')); 
  const imageSrc = product.querySelector('img').src; 

  const boxContent = document.getElementById("box-content");
  const cartBox = document.querySelector(".cart-box");
  const productCount = boxContent.childElementCount;

  if (productCount >= maxProducts) {
    cartBox.classList.add("full"); 
    alert("La caja está llena. No puedes agregar más productos.");
    return;
  }

  const img = document.createElement("img");
  img.src = imageSrc;
  img.alt = "Producto";
  boxContent.appendChild(img);

  totalPrice += price;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);

  button.disabled = true;
  button.textContent = "Agregado";
}

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.querySelector(".products-container-circulo");
  const selectedProduct = document.querySelector(".selected-product");
  const productImages = document.querySelectorAll(".productos_circulo img");

  let currentIndex = 0;

  const updateSelectedProduct = () => {
    const currentProduct = productImages[currentIndex];
    const { src, dataset } = currentProduct;

    // Actualizar producto seleccionado
    selectedProduct.querySelector("img").src = src;
    selectedProduct.querySelector("h3").textContent = dataset.name;
    selectedProduct.querySelector("p").textContent = dataset.price;
  };

  const rotateWheel = () => {
    const angle = (360 / productImages.length) * currentIndex;

    productsContainer.style.transform = `rotate(-${angle}deg)`;

    updateSelectedProduct();
    currentIndex = (currentIndex + 1) % productImages.length;
  };

  setInterval(rotateWheel, 3000);

  updateSelectedProduct();
});


const backgrounds = [
  { 
    image: './assets/images/Fondo/fondo1.webp', 
    text: 'SONAJEROS AMIGURUMI', 
    link: './sonajeros.html' 
  },
  { 
    image: './assets/images/Fondo/fondo2.webp', 
    text: 'COMPAÑERO AMIGURUMI', 
    link: './companero.html' 
  },
  { 
    image: './assets/images/Fondo/fondo3.jpg', 
    text: 'DENTI AMIGOS', 
    link: './denti.html' 
  }
];

const heroSection = document.getElementById('hero');
let currentIndex = 0;
let isTransitioning = false;

// Mostrar el primer fondo al cargar la página
function setBackground(index) {
  const bg = backgrounds[index];
  heroSection.style.backgroundImage = `url('${bg.image}')`;
  heroSection.querySelector('span').innerHTML = `<a href="${bg.link}" style="color: #fff; text-decoration: none;">${bg.text}</a>`;
}

// Cambiar fondo con animación y control de transición
function changeBackground(nextIndex) {
  if (isTransitioning || nextIndex < 0 || nextIndex >= backgrounds.length) return;

  isTransitioning = true;
  heroSection.style.opacity = 0; // Ocultar antes de cambiar

  setTimeout(() => {
    currentIndex = nextIndex;
    setBackground(currentIndex);
    heroSection.style.opacity = 1; // Mostrar el nuevo fondo
    isTransitioning = false;
  }, 1000); // Duración de la transición
}

// Detectar scroll y teclas
window.addEventListener('wheel', (event) => {
  if (event.deltaY > 0) {
    changeBackground(currentIndex + 1); // Scroll hacia abajo
  } else {
    changeBackground(currentIndex - 1); // Scroll hacia arriba
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    changeBackground(currentIndex + 1); // Flecha abajo
  } else if (event.key === 'ArrowUp') {
    changeBackground(currentIndex - 1); // Flecha arriba
  }
});

// Inicializar el fondo al cargar la página
setBackground(currentIndex);

