// === PAGE SWITCHER (CLICK, NO SCROLL) ===
function scrollToPage(id) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.style.display = (page.id === id) ? 'flex' : 'none';
  });
}

// === MODALS + PRESTART MUSIC ===
document.addEventListener('DOMContentLoaded', () => {
  // Start on the prestart page
  scrollToPage('prestart');

  // ===== MODALS =====
  const modalButtons = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('[data-close]');

  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal');
      const modal = document.getElementById(`modal-${targetId}`);
      if (modal) modal.classList.add('active');
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.classList.remove('active');
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modals.forEach(m => m.classList.remove('active'));
  });

  // ===== MUSIC + VIDEO (starts when user taps continue) =====
  const bgm = document.getElementById('bgm');
  const slider = document.getElementById('volumeSlider');
  const startBtn = document.getElementById('startBtn');
  const bgVideo = document.getElementById('bgVideo');

  // volume slider
  if (bgm && slider) {
    bgm.volume = Number(slider.value) / 100;
    slider.addEventListener('input', () => {
      bgm.volume = Number(slider.value) / 100;
    });
  }

  // ===== FORCE VIDEO LOOP (kalau loop attribute bandel) =====
  if (bgVideo) {
    bgVideo.loop = true;

    bgVideo.addEventListener('ended', async () => {
      try {
        bgVideo.currentTime = 0;
        await bgVideo.play();
      } catch (e) {}
    });

    // fallback ekstra biar looping mulus di beberapa browser
    bgVideo.addEventListener('timeupdate', () => {
      if (bgVideo.duration && bgVideo.currentTime >= bgVideo.duration - 0.05) {
        bgVideo.currentTime = 0;
      }
    });
  }

  // start button = user gesture
  if (startBtn) {
    startBtn.addEventListener('click', async () => {
      // play music
      if (bgm) {
        try { await bgm.play(); } catch (e) {}
      }

      // play video (some browsers still require gesture even if muted)
      if (bgVideo) {
        try {
          bgVideo.muted = true;
          await bgVideo.play();
        } catch (e) {}
      }

      scrollToPage('cover');
    });
  }
});
