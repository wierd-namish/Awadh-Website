let videoInitialized = false;

function initVideoShowcase() {
  if (videoInitialized) return;

  const video = document.getElementById("myVideo");
  const playBtn = document.getElementById("playBtn");
  const playIcon = document.getElementById("playIcon");

  if (!video || !playBtn) return;
  
  videoInitialized = true;

  playBtn.addEventListener("click", () => {
    // If it's a placeholder (no video source or video is hidden), toggle visual UI state only
    if (!video.src || video.classList.contains("hidden") || video.getAttribute("src") === "") {
      const isCurrentlyPlaying = playBtn.getAttribute("data-playing") === "true";
      if (!isCurrentlyPlaying) {
        playBtn.setAttribute("data-playing", "true");
        playIcon.innerHTML = `
          <rect x="6" y="4" width="4" height="16" fill="white"></rect>
          <rect x="14" y="4" width="4" height="16" fill="white"></rect>
        `;
        playBtn.style.opacity = "0.2";
      } else {
        playBtn.setAttribute("data-playing", "false");
        playIcon.innerHTML = `<polygon points="8,5 19,12 8,19" fill="white"></polygon>`;
        playBtn.style.opacity = "1";
      }
      return;
    }

    // Standard video tag controls
    if (video.paused) {
      video.play();
      playIcon.innerHTML = `
        <rect x="6" y="4" width="4" height="16" fill="white"></rect>
        <rect x="14" y="4" width="4" height="16" fill="white"></rect>
      `;
      playBtn.style.opacity = "0.2";
    } else {
      video.pause();
      playIcon.innerHTML = `<polygon points="8,5 19,12 8,19" fill="white"></polygon>`;
      playBtn.style.opacity = "1";
    }
  });

  video.addEventListener("ended", () => {
    playIcon.innerHTML = `<polygon points="8,5 19,12 8,19" fill="white"></polygon>`;
    playBtn.style.opacity = "1";
  });
}

if (window.componentsLoaded || document.readyState === "interactive" || document.readyState === "complete") {
  initVideoShowcase();
} else {
  window.addEventListener("componentsLoaded", initVideoShowcase);
  document.addEventListener("DOMContentLoaded", initVideoShowcase);
}
