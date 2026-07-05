let scrollInitialized = false;

function initScrollBtn() {
  if (scrollInitialized) return;

  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;
  
  scrollInitialized = true;

  // Toggle button visibility based on vertical scroll offset
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  });

  // Smooth scroll back to top of page
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

if (window.componentsLoaded || document.readyState === "interactive" || document.readyState === "complete") {
  initScrollBtn();
} else {
  window.addEventListener("componentsLoaded", initScrollBtn);
  document.addEventListener("DOMContentLoaded", initScrollBtn);
}
