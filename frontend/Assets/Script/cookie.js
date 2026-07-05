// Cookie Banner Module - robust initialization
let cookieInitialized = false;

function initCookieBanner() {
  if (cookieInitialized) return true;

  const cookieBanner = document.getElementById("cookieBanner");
  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  if (!cookieBanner) return false; // Banner element not rendered yet

  cookieInitialized = true;
  const cookieConsent = localStorage.getItem("cookieConsent");

  // Show banner if choice is not yet made
  if (!cookieConsent) {
    cookieBanner.classList.remove("hidden");
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 100);
  }

  function hideBanner() {
    cookieBanner.classList.remove("show");
    setTimeout(() => {
      cookieBanner.classList.add("hidden");
      cookieBanner.style.display = "none";
    }, 500);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      hideBanner();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      hideBanner();
    });
  }

  return true;
}

function startCookie() {
  if (!initCookieBanner()) {
    // Retry on DOMContentLoaded or custom componentsLoaded
    document.addEventListener("DOMContentLoaded", initCookieBanner);
    window.addEventListener("componentsLoaded", initCookieBanner);
  }
}

// Run immediately if readyState is interactive/complete, otherwise wait for load
if (document.readyState === "complete" || document.readyState === "interactive") {
  startCookie();
} else {
  window.addEventListener("load", startCookie);
}
