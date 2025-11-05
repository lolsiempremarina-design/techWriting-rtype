import { Game } from './game.js';

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas');
  const overlay = document.getElementById('overlay');
  const game = new Game(canvas);
  game.start();

  // --- Fullscreen support ---
  // Create a small button in the overlay to toggle fullscreen
  const fsBtn = document.createElement('button');
  fsBtn.id = 'fullscreenBtn';
  fsBtn.textContent = 'Schermo intero (F)';
  // simple inline styles so it looks OK without touching CSS files
  fsBtn.style.padding = '6px 10px';
  fsBtn.style.fontSize = '12px';
  fsBtn.style.background = '#111';
  fsBtn.style.color = '#fff';
  fsBtn.style.border = '1px solid #444';
  fsBtn.style.cursor = 'pointer';
  overlay.appendChild(fsBtn);

  // store original canvas buffer size so we can restore on exit
  const original = { width: canvas.width, height: canvas.height };

  function enterFullscreen() {
    if (canvas.requestFullscreen) return canvas.requestFullscreen();
    if (canvas.webkitRequestFullscreen) return canvas.webkitRequestFullscreen();
    if (canvas.msRequestFullscreen) return canvas.msRequestFullscreen();
    return Promise.reject(new Error('Fullscreen API non disponibile'));
  }

  function exitFullscreen() {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
    return Promise.reject(new Error('Fullscreen API non disponibile'));
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      enterFullscreen().catch(err => console.warn('Impossibile entrare in fullscreen:', err));
    } else {
      exitFullscreen().catch(err => console.warn('Impossibile uscire da fullscreen:', err));
    }
  }

  // Adjust canvas resolution to fill the screen while in fullscreen
  function resizeInFullscreen() {
    if (document.fullscreenElement === canvas) {
      // use device pixels to set buffer to window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
  }

  // Restore original canvas resolution when exiting fullscreen
  function restoreCanvasSize() {
    canvas.width = original.width;
    canvas.height = original.height;
    canvas.style.width = '';
    canvas.style.height = '';
  }

  fsBtn.addEventListener('click', toggleFullscreen);

  // keyboard shortcut: KeyF toggles fullscreen
  window.addEventListener('keydown', (e) => {
    // avoid catching input if user is typing in an input element
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.ctrlKey || e.metaKey) return;
    if (e.code === 'KeyF') {
      e.preventDefault();
      toggleFullscreen();
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === canvas) {
      // entered fullscreen
      resizeInFullscreen();
      // when in fullscreen, also listen to resize to adapt
      window.addEventListener('resize', resizeInFullscreen);
      fsBtn.textContent = 'Esci schermo intero (F)';
    } else {
      // exited fullscreen
      window.removeEventListener('resize', resizeInFullscreen);
      restoreCanvasSize();
      fsBtn.textContent = 'Schermo intero (F)';
    }
  });
});
