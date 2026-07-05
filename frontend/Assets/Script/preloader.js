// Preloader module - ensures preloader runs and hides under all loading conditions
let preloaderInitialized = false;

function startPreloader() {
  if (preloaderInitialized) return true;

  const preloader = document.getElementById("preloader");
  const cifra = document.querySelector(".cifra");
  const chars = document.querySelectorAll(".char");
  
  if (!preloader) return false; // Element not ready yet

  preloaderInitialized = true;
  let count = 0;
  
  const interval = setInterval(() => {
    count += 5;
    if (cifra) cifra.textContent = count;
    
    // Fade in characters progressively
    const charIndex = Math.floor((count / 100) * chars.length);
    for (let i = 0; i < charIndex; i++) {
      if (chars[i]) chars[i].style.opacity = "1";
    }

    if (count >= 100) {
      clearInterval(interval);
      // Fade out
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.classList.add("hidden");
        preloader.style.display = "none";
        document.body.classList.remove("no-scroll");
        // Trigger hero slide-in animations after preloader finishes
        document.querySelectorAll(".hero-slide-from-right, .hero-slide-from-left").forEach(el => {
          el.classList.add("animate");
        });
      }, 500);
    }
  }, 35);

  return true;
}

function initPreloader() {
  if (!startPreloader()) {
    // Retry on DOMContentLoaded or custom componentsLoaded
    document.addEventListener("DOMContentLoaded", startPreloader);
    window.addEventListener("componentsLoaded", startPreloader);
  }
}

// Run immediately if readyState is interactive/complete, otherwise wait for load
if (document.readyState === "complete" || document.readyState === "interactive") {
  initPreloader();
} else {
  window.addEventListener("load", initPreloader);
}
