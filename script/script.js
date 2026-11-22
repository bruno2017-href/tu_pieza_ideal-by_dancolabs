document.addEventListener("DOMContentLoaded", () => {
  // --- 1. NAVBAR Y MENÚ MÓVIL ---
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(17, 17, 17, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.6)";
    } else {
      navbar.style.background = "rgba(17, 17, 17, 0.8)";
      navbar.style.boxShadow = "none";
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- 2. SMOOTH SCROLL (ENLACES INTERNOS) ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// --- 3. CARRUSELES DE PRODUCTOS ---
document.querySelectorAll(".card-carousel").forEach((carousel) => {
  const inner = carousel.querySelector(".carousel-inner");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const images = carousel.querySelectorAll(".carousel-inner img");
  let currentIndex = 0;

  const updateCarousel = () => {
    inner.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    updateCarousel();
  });
});

// --- 4. LIGHTBOX DE LA GALERÍA ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".lightbox-trigger").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

const closeLightbox = () => {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
};

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) closeLightbox();
  });
}

// --- 5. MODAL DE PROMOCIÓN ---
const promoModal = document.getElementById("promoModal");
const closePromoBtn = document.querySelector(".close-promo");

if (promoModal && !sessionStorage.getItem("promoCerrada")) {
  setTimeout(() => {
    promoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }, 1500);
}

const cerrarPromo = () => {
  if (promoModal) promoModal.classList.remove("active");
  document.body.style.overflow = "auto";
  sessionStorage.setItem("promoCerrada", "true");
};

if (closePromoBtn) closePromoBtn.addEventListener("click", cerrarPromo);
if (promoModal) {
  promoModal.addEventListener("click", (e) => {
    if (e.target === promoModal) cerrarPromo();
  });
}
