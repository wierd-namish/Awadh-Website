/**
 * ===================================================================
 * Plane-Banner Full-Width Animation Widget
 * 
 * The biplane flies across the entire viewport width, towing a banner,
 * performs U-turns at each edge, and loops infinitely.
 * ===================================================================
 */
(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────
  var CONFIG = {
    containerH: 180,
    planeW: 150,
    planeH: 103,
    bannerW: 280,
    bannerH: 200,
    towGap: -30,           // negative overlap to touch the actual tail of the plane
    bannerYOffset: 20,    // vertical nudge to align banner with the tail
    flyDuration: 15000,   // 15 seconds to cross the full screen
    turnDuration: 1200,   // smooth, graceful U-turn
    bobAmplitude: 5,
    bobPeriod: 1500,
    bannerLag: 0,         // no lag, banner follows plane exactly
    bannerWobbleAmp: 2.5,
    bannerWobblePeriod: 400,
    turnBankAngle: 15,
    turnScale: 0.9,
    planeFacesLeftByDefault: true
  };

  // ── State ──────────────────────────────────────────────────────
  var phase = 'flyRight';
  var phaseStartTime = 0;
  var facingRight = true;
  var planeX = 0;
  var planeY = 0;
  var planeRotation = 0;
  var planeScale = 1;
  var animFrameId = null;
  var paused = false;
  var pausedTimestamp = 0;
  var pausedElapsed = 0;

  // Dynamic edges based on viewport
  var leftEdge, rightEdge, centerY;

  function updateEdges() {
    var vw = window.innerWidth;
    leftEdge = 0;                    // nose touches left edge
    rightEdge = vw - CONFIG.planeW;  // nose touches right edge
    centerY = CONFIG.containerH / 2 - CONFIG.planeH / 2;
  }

  // Position history ring-buffer
  var HISTORY_SIZE = 30;
  var posHistory = [];
  var historyIndex = 0;

  // ── DOM References ─────────────────────────────────────────────
  var container, planeEl, bannerUnit, bannerImg, bannerFallback, bannerText, towline, brochureBtn;
  var useBannerImage = false;

  // ── Easing ─────────────────────────────────────────────────────
  function easeInOut(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // ── Remove white/light background from an image at runtime ─────
  function removeWhiteBg(imgEl, threshold) {
    threshold = threshold || 160;
    try {
      var c = document.createElement('canvas');
      c.width = imgEl.naturalWidth;
      c.height = imgEl.naturalHeight;
      var ctx = c.getContext('2d');
      ctx.drawImage(imgEl, 0, 0);
      var imageData = ctx.getImageData(0, 0, c.width, c.height);
      var d = imageData.data;
      for (var i = 0; i < d.length; i += 4) {
        var r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
        if (a === 0) continue; // already transparent

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var saturation = max > 0 ? (max - min) / max : 0;
        var brightness = (r + g + b) / 3;

        // Fully transparent: bright + low saturation (whites, greys)
        if (brightness > threshold && saturation < 0.30) {
          d[i + 3] = 0;
        }
        // Edge feathering: slightly less bright → partial transparency
        else if (brightness > (threshold - 40) && saturation < 0.20) {
          var fade = (brightness - (threshold - 40)) / 40;
          d[i + 3] = Math.round(a * (1 - fade));
        }
      }
      ctx.putImageData(imageData, 0, 0);
      imgEl.src = c.toDataURL('image/png');
    } catch (e) {
      console.warn('Could not remove background from image:', e.message);
    }
  }

  // ── Build DOM ──────────────────────────────────────────────────
  function buildWidget() {
    container = document.createElement('div');
    container.id = 'plane-widget';

    // Towline (hidden – banner is attached directly)
    towline = document.createElement('div');
    towline.className = 'pw-towline';
    towline.style.display = 'none';
    container.appendChild(towline);

    // Plane
    planeEl = document.createElement('img');
    planeEl.className = 'pw-plane';
    planeEl.alt = 'Biplane';
    planeEl.draggable = false;
    planeEl.crossOrigin = 'anonymous';
    var planeBgRemoved = false;
    planeEl.onload = function () {
      if (!planeBgRemoved) {
        planeBgRemoved = true;
        removeWhiteBg(planeEl);
      }
    };
    planeEl.onerror = function () {
      planeEl.style.display = 'none';
      var fb = document.createElement('div');
      fb.className = 'pw-plane';
      fb.style.fontSize = '50px';
      fb.style.lineHeight = CONFIG.planeH + 'px';
      fb.style.width = CONFIG.planeW + 'px';
      fb.style.textAlign = 'center';
      fb.innerHTML = '✈️';
      container.insertBefore(fb, planeEl);
      planeEl = fb;
    };
    planeEl.src = 'Assets/Images/plane.png';
    container.appendChild(planeEl);

    // Banner unit
    bannerUnit = document.createElement('div');
    bannerUnit.className = 'pw-banner-unit';

    // CSS fallback (shown by default)
    bannerFallback = document.createElement('div');
    bannerFallback.className = 'pw-banner-fallback';
    bannerUnit.appendChild(bannerFallback);

    // Banner image (hidden until loaded)
    bannerImg = document.createElement('img');
    bannerImg.className = 'pw-banner-img';
    bannerImg.alt = '';
    bannerImg.draggable = false;
    bannerImg.crossOrigin = 'anonymous';
    bannerImg.style.display = 'none';
    var bannerBgRemoved = false;
    bannerImg.onload = function () {
      if (!bannerBgRemoved) {
        bannerBgRemoved = true;
        removeWhiteBg(bannerImg);
        return; // onload fires again after src is replaced
      }
      useBannerImage = true;
      bannerFallback.style.display = 'none';
      bannerImg.style.display = 'block';
    };
    bannerImg.onerror = function () {
      useBannerImage = false;
      bannerImg.style.display = 'none';
      bannerFallback.style.display = 'block';
    };
    bannerImg.src = 'Assets/Images/banner.png';
    bannerUnit.appendChild(bannerImg);

    // Banner text
    bannerText = document.createElement('div');
    bannerText.className = 'pw-banner-text';
    bannerText.innerHTML = '<div style="display:flex; flex-direction:column; align-items:center; line-height:1.1;"><span style="font-weight: 900; font-size: 1.35em; letter-spacing: 0.5px;">Click here</span><span style="font-weight: 700; font-size: 0.85em; opacity: 0.85; margin-top: 3px;">Brochure (2026)</span></div>';
    bannerUnit.appendChild(bannerText);

    // "View Brochure" hover button
    brochureBtn = document.createElement('a');
    brochureBtn.href = 'Assets/Images/broschure/Awadh%20Aero%20DAC%20Aviation%20Academy.pdf.pdf';
    brochureBtn.target = '_blank';
    brochureBtn.className = 'pw-brochure-btn';
    brochureBtn.innerHTML = '<i class="fas fa-file-pdf"></i> View Brochure';
    brochureBtn.style.cssText = 'display:none; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); background:rgba(255,67,1,0.95); color:#fff; padding:8px 18px; border-radius:50px; font-weight:700; font-size:13px; text-decoration:none; z-index:50; box-shadow:0 4px 16px rgba(0,0,0,0.3); cursor:pointer; white-space:nowrap; transition:background 0.2s, transform 0.2s; pointer-events:auto;';
    brochureBtn.addEventListener('mouseenter', function() {
      brochureBtn.style.background = 'rgba(255,67,1,1)';
      brochureBtn.style.transform = 'translate(-50%,-50%) scale(1.08)';
    });
    brochureBtn.addEventListener('mouseleave', function() {
      brochureBtn.style.background = 'rgba(255,67,1,0.95)';
      brochureBtn.style.transform = 'translate(-50%,-50%) scale(1)';
    });
    bannerUnit.appendChild(brochureBtn);

    container.appendChild(bannerUnit);
    document.body.appendChild(container);

    // Hover events: pause animation + show button
    container.addEventListener('mouseenter', function () {
      if (!paused) {
        paused = true;
        pausedTimestamp = performance.now();
        brochureBtn.style.display = 'inline-flex';
        brochureBtn.style.alignItems = 'center';
        brochureBtn.style.gap = '6px';
      }
    });
    container.addEventListener('mouseleave', function () {
      if (paused) {
        var pauseDuration = performance.now() - pausedTimestamp;
        phaseStartTime += pauseDuration;  // offset so animation resumes seamlessly
        paused = false;
        brochureBtn.style.display = 'none';
      }
    });

    requestAnimationFrame(autoSizeText);
  }

  // ── Auto-size text ─────────────────────────────────────────────
  function autoSizeText() {
    var max = 20, min = 10;
    for (var s = max; s >= min; s -= 0.5) {
      bannerText.style.fontSize = s + 'px';
      if (bannerText.scrollWidth <= CONFIG.bannerW &&
          bannerText.scrollHeight <= CONFIG.bannerH) {
        break;
      }
    }
  }

  // ── Position history ───────────────────────────────────────────
  function recordPosition(time, x, y, rotation, flipX) {
    var entry = { time: time, x: x, y: y, rotation: rotation, flipX: flipX };
    if (posHistory.length < HISTORY_SIZE) {
      posHistory.push(entry);
    } else {
      posHistory[historyIndex] = entry;
    }
    historyIndex = (historyIndex + 1) % HISTORY_SIZE;
  }

  function getLaggedPosition(currentTime, lagMs) {
    var targetTime = currentTime - lagMs;
    if (posHistory.length === 0) return null;
    var best = posHistory[0];
    var bestDiff = Math.abs(best.time - targetTime);
    for (var i = 1; i < posHistory.length; i++) {
      var diff = Math.abs(posHistory[i].time - targetTime);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = posHistory[i];
      }
    }
    return best;
  }

  // ── Main animation loop ────────────────────────────────────────
  function animate(timestamp) {
    if (paused) {
      animFrameId = requestAnimationFrame(animate);
      return;
    }
    if (!phaseStartTime) phaseStartTime = timestamp;
    var elapsed = timestamp - phaseStartTime;
    var now = performance.now();

    switch (phase) {
      case 'flyRight':
        animateFly(elapsed, timestamp, true);
        if (elapsed >= CONFIG.flyDuration) {
          phase = 'turnRight';
          phaseStartTime = timestamp;
        }
        break;
      case 'turnRight':
        animateTurn(elapsed, timestamp, true);
        if (elapsed >= CONFIG.turnDuration) {
          facingRight = false;
          phase = 'flyLeft';
          phaseStartTime = timestamp;
        }
        break;
      case 'flyLeft':
        animateFly(elapsed, timestamp, false);
        if (elapsed >= CONFIG.flyDuration) {
          phase = 'turnLeft';
          phaseStartTime = timestamp;
        }
        break;
      case 'turnLeft':
        animateTurn(elapsed, timestamp, false);
        if (elapsed >= CONFIG.turnDuration) {
          facingRight = true;
          phase = 'flyRight';
          phaseStartTime = timestamp;
        }
        break;
    }

    recordPosition(now, planeX, planeY, planeRotation, facingRight);
    applyPlaneTransform();
    applyBannerTransform(now, timestamp);
    updateTowline();

    animFrameId = requestAnimationFrame(animate);
  }

  // ── Fly horizontally across full screen ────────────────────────
  function animateFly(elapsed, timestamp, goingRight) {
    var t = Math.min(elapsed / CONFIG.flyDuration, 1);
    var eased = easeInOut(t);

    planeX = goingRight
      ? lerp(leftEdge, rightEdge, eased)
      : lerp(rightEdge, leftEdge, eased);

    var bobT = (timestamp % CONFIG.bobPeriod) / CONFIG.bobPeriod;
    planeY = centerY + Math.sin(bobT * Math.PI * 2) * CONFIG.bobAmplitude;

    planeRotation = 0;
    planeScale = 1;
    facingRight = goingRight;
  }

  // ── U-Turn ─────────────────────────────────────────────────────
  function animateTurn(elapsed, timestamp, turningFromRight) {
    var t = Math.min(elapsed / CONFIG.turnDuration, 1);
    var bankT = Math.sin(t * Math.PI);
    var bankDir = turningFromRight ? -1 : 1;
    planeRotation = bankDir * CONFIG.turnBankAngle * bankT;
    planeScale = lerp(1, CONFIG.turnScale, bankT);
    facingRight = t >= 0.5 ? !turningFromRight : turningFromRight;

    var bobT = (timestamp % CONFIG.bobPeriod) / CONFIG.bobPeriod;
    planeY = centerY + Math.sin(bobT * Math.PI * 2) * CONFIG.bobAmplitude;

    planeX = turningFromRight ? rightEdge : leftEdge;
  }

  // ── Apply plane transform ──────────────────────────────────────
  function applyPlaneTransform() {
    var flipX = (CONFIG.planeFacesLeftByDefault && facingRight) ? -1 : 1;
    planeEl.style.transform =
      'translate(' + planeX + 'px, ' + planeY + 'px) ' +
      'rotate(' + planeRotation + 'deg) ' +
      'scale(' + (flipX * planeScale) + ', ' + planeScale + ')';
  }

  // ── Apply banner with lag ──────────────────────────────────────
  function applyBannerTransform(now, timestamp) {
    var lagged = getLaggedPosition(now, CONFIG.bannerLag);
    if (!lagged) return;

    var isFR = lagged.flipX;
    var bannerX, bannerY;

    if (isFR) {
      bannerX = lagged.x - CONFIG.bannerW - CONFIG.towGap;
    } else {
      bannerX = lagged.x + CONFIG.planeW + CONFIG.towGap;
    }

    bannerY = lagged.y + (CONFIG.planeH - CONFIG.bannerH) / 2 + (CONFIG.bannerYOffset || 0);

    var wobbleT = (timestamp % CONFIG.bannerWobblePeriod) / CONFIG.bannerWobblePeriod;
    var wobble = Math.sin(wobbleT * Math.PI * 2) * CONFIG.bannerWobbleAmp;
    var bannerRot = lagged.rotation * 0.6 + wobble;

    bannerUnit.style.transform =
      'translate(' + bannerX + 'px, ' + bannerY + 'px) ' +
      'rotate(' + bannerRot + 'deg)';

    var imgFlipVal = isFR ? -1 : 1;
    if (useBannerImage) {
      bannerImg.style.transform = 'scaleX(' + imgFlipVal + ')';
    } else {
      bannerFallback.style.transform = 'scaleX(' + imgFlipVal + ')';
    }

    bannerText.style.transform = 'scaleX(1)';
  }

  // ── Towline ────────────────────────────────────────────────────
  function updateTowline() {
    var tailX, tailY;
    if (facingRight) {
      tailX = planeX;
      tailY = planeY + CONFIG.planeH / 2;
    } else {
      tailX = planeX + CONFIG.planeW;
      tailY = planeY + CONFIG.planeH / 2;
    }

    var lagged = getLaggedPosition(performance.now(), CONFIG.bannerLag);
    if (!lagged) return;

    var bannerLeadX, bannerLeadY;
    if (lagged.flipX) {
      bannerLeadX = lagged.x - CONFIG.towGap;
      bannerLeadY = lagged.y + CONFIG.planeH / 2;
    } else {
      bannerLeadX = lagged.x + CONFIG.planeW + CONFIG.towGap;
      bannerLeadY = lagged.y + CONFIG.planeH / 2;
    }

    var dx = bannerLeadX - tailX;
    var dy = bannerLeadY - tailY;
    var length = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx) * (180 / Math.PI);

    towline.style.transform =
      'translate(' + tailX + 'px, ' + tailY + 'px) ' +
      'rotate(' + angle + 'deg)';
    towline.style.width = Math.max(0, length) + 'px';
  }

  // ── Initialize ─────────────────────────────────────────────────
  function init() {
    updateEdges();
    buildWidget();

    planeX = leftEdge;
    planeY = centerY;
    facingRight = true;
    phase = 'flyRight';
    phaseStartTime = 0;

    // Seed history
    var now = performance.now();
    for (var i = 0; i < HISTORY_SIZE; i++) {
      posHistory.push({
        time: now - (HISTORY_SIZE - i) * 16,
        x: leftEdge,
        y: centerY,
        rotation: 0,
        flipX: true
      });
    }

    // Recalculate edges on window resize
    window.addEventListener('resize', updateEdges);

    animFrameId = requestAnimationFrame(animate);
  }

  // ── Start ──────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('beforeunload', function () {
    if (animFrameId) cancelAnimationFrame(animFrameId);
  });
})();
