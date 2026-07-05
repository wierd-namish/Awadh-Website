document.addEventListener('DOMContentLoaded', () => {
  // --- CAROUSEL LOGIC ---
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const carouselSlides = carousel.querySelectorAll('.carousel-images > div');
    const carouselDots = carousel.querySelectorAll('.carousel-dots button');
    const carouselNextBtn = carousel.querySelector('.carousel-next');
    const carouselPrevBtn = carousel.querySelector('.carousel-prev');
    let currentCarouselSlide = 0;
    const totalCarouselSlides = carouselSlides.length;

    function updateCarousel() {
      carouselSlides.forEach((slide, index) => {
        slide.classList.remove('opacity-100');
        slide.classList.add('opacity-0', 'pointer-events-none');
        
        if (carouselDots[index]) {
          carouselDots[index].classList.remove('bg-[#ff4301]');
          carouselDots[index].classList.add('bg-white/60');
        }
      });
      
      carouselSlides[currentCarouselSlide].classList.remove('opacity-0', 'pointer-events-none');
      carouselSlides[currentCarouselSlide].classList.add('opacity-100');
      
      if (carouselDots[currentCarouselSlide]) {
        carouselDots[currentCarouselSlide].classList.remove('bg-white/60');
        carouselDots[currentCarouselSlide].classList.add('bg-[#ff4301]');
      }
    }

    if (carouselNextBtn) {
      carouselNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCarouselSlide = (currentCarouselSlide + 1) % totalCarouselSlides;
        updateCarousel();
      });
    }

    if (carouselPrevBtn) {
      carouselPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCarouselSlide = (currentCarouselSlide - 1 + totalCarouselSlides) % totalCarouselSlides;
        updateCarousel();
      });
    }

    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        currentCarouselSlide = index;
        updateCarousel();
      });
    });
  });

  // --- LIGHTBOX LOGIC ---
  const triggers = document.querySelectorAll('.lightbox-trigger');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const nextBtn = document.getElementById('lightbox-next');
  const prevBtn = document.getElementById('lightbox-prev');

  if (!lightbox) return;

  // Collect all image sources in order
  const images = Array.from(triggers).map(trigger => {
    return trigger.querySelector('img').src;
  });

  let currentLightboxIndex = 0;

  function openLightbox(index) {
    currentLightboxIndex = index;
    lightboxImg.src = images[currentLightboxIndex];
    
    // Show lightbox
    lightbox.classList.remove('hidden');
    // Small delay to allow CSS transition
    setTimeout(() => {
      lightbox.classList.remove('opacity-0');
      lightboxImg.classList.remove('scale-95');
      lightboxImg.classList.add('scale-100');
    }, 10);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.add('opacity-0');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
      lightbox.classList.add('hidden');
      lightboxImg.src = ''; // Clear source
      document.body.style.overflow = '';
    }, 300); // Matches CSS duration-300
  }

  function showLightboxNext(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % images.length;
    
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = images[currentLightboxIndex];
      lightboxImg.style.opacity = 1;
    }, 150);
  }

  function showLightboxPrev(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + images.length) % images.length;
    
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = images[currentLightboxIndex];
      lightboxImg.style.opacity = 1;
    }, 150);
  }

  // Event Listeners
  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', (e) => {
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showLightboxNext);
  prevBtn.addEventListener('click', showLightboxPrev);

  // Close when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.closest('.w-full.max-w-5xl') === null) {
      if (e.target.tagName !== 'IMG' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'I') {
         closeLightbox();
      }
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showLightboxNext();
    } else if (e.key === 'ArrowLeft') {
      showLightboxPrev();
    }
  });
});
