let sliderInitialized = false;

function initSlider() {
  if (sliderInitialized) return;

  const slider = document.getElementById("slider");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (!slider) return;
  
  sliderInitialized = true;

  const slides = slider.children;
  const totalSlides = slides.length;
  let currentSlide = 0;

  // Set container width
  slider.style.width = `${totalSlides * 100}%`;
  
  // Set each slide width to be 100% of container divided by slide count
  Array.from(slides).forEach(slide => {
    slide.style.width = `${100 / totalSlides}%`;
    slide.style.flex = `0 0 ${100 / totalSlides}%`;
  });

  function showSlide(index) {
    if (index >= totalSlides) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = totalSlides - 1;
    } else {
      currentSlide = index;
    }
    
    // Shift container
    slider.style.transform = `translateX(-${(currentSlide * 100) / totalSlides}%)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide(currentSlide + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlide - 1);
    });
  }
}

// Synchronous check to run immediately if events have already fired
if (window.componentsLoaded || document.readyState === "interactive" || document.readyState === "complete") {
  initSlider();
} else {
  window.addEventListener("componentsLoaded", initSlider);
  document.addEventListener("DOMContentLoaded", initSlider);
}

// Slide cards scroll utility
window.scrollCards = function (direction) {
  const cardSlider = document.getElementById("cardSlider");
  if (!cardSlider) return;
  const scrollAmount = 320; 
  cardSlider.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
};

// 1. Scroll Reveal (Intersection Observer)
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -60px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stagger-reveal")) {
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 120}ms`;
          });
        }
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(".scroll-reveal, .stagger-reveal");
  elementsToReveal.forEach(el => revealObserver.observe(el));
}

// 2. Floating Navbar Scroll State Handler
function initNavbarScroll() {
  const header = document.querySelector("header");
  if (!header) return;

  function updateNavbar() {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNavbar);
  updateNavbar(); // Run initially
}

// Initialize animations and handlers
function initMotionSystem() {
  initScrollReveal();
  initNavbarScroll();
}

if (window.componentsLoaded) {
  initMotionSystem();
} else {
  window.addEventListener("componentsLoaded", initMotionSystem);
}
