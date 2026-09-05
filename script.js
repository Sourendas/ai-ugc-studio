const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
const navLinks = nav ? nav.querySelectorAll('nav a') : [];

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menu.textContent = open ? 'Close' : 'Menu';
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-label', 'Open menu');
      menu.textContent = 'Menu';
    }
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Replace this with the studio's WhatsApp number in international format, without + or spaces.
const studioNumber = '918240139489';

const form = document.getElementById('brief-form');
const statusEl = document.querySelector('.form-status');
const fallbackEl = document.getElementById('brief-fallback');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const fields = {
    name: (data.get('name') || '').toString().trim(),
    brand: (data.get('brand') || '').toString().trim(),
    contact: (data.get('contact') || '').toString().trim(),
    package: (data.get('package') || '').toString().trim(),
    face: (data.get('face') || '').toString().trim(),
    details: (data.get('details') || '').toString().trim(),
  };
  if (!fields.name || !fields.brand || !fields.contact) {
    statusEl.textContent = 'Please fill in your name, brand and contact before sending.';
    return;
  }
  const message =
    'Hi Ayra Studio!%0A%0A' +
    `Name: ${encodeURIComponent(fields.name)}%0A` +
    `Brand: ${encodeURIComponent(fields.brand)}%0A` +
    `Contact: ${encodeURIComponent(fields.contact)}%0A` +
    `Package: ${encodeURIComponent(fields.package)}%0A` +
    `Preferred face: ${encodeURIComponent(fields.face || '— recommend one —')}%0A` +
    `Product details: ${encodeURIComponent(fields.details)}`;
  const url = `https://wa.me/${studioNumber}?text=${message}`;

  // Always expose a manual fallback link in case the popup is blocked.
  fallbackEl.href = url;
  fallbackEl.hidden = false;

  const popup = window.open(url, '_blank', 'noopener,noreferrer');
  if (!popup) {
    statusEl.textContent = 'Popup blocked. Use the link below to open WhatsApp.';
  } else {
    statusEl.textContent = 'Your brief is ready. Opening WhatsApp…';
  }
});

// Face cards: clicking preselects the face in the brief form's face select.
document.querySelectorAll('.face-card').forEach((card) => {
  card.addEventListener('click', () => {
    const face = card.dataset.face;
    const select = document.getElementById('face-select');
    if (select && face) {
      const proper = face.charAt(0).toUpperCase() + face.slice(1);
      select.value = proper;
    }
  });
});

// Hero video preview — autoplay muted, tap to unmute.
const heroVideo = document.querySelector('.hero-video');
const heroMute = document.querySelector('.hero-mute');
if (heroVideo && heroMute) {
  // Try to autoplay (muted). Some browsers reject it without a user gesture; this no-ops silently.
  const tryPlay = () => heroVideo.play().catch(() => {});
  tryPlay();
  heroMute.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted;
    const unmuted = !heroVideo.muted;
    heroMute.dataset.state = unmuted ? 'unmuted' : 'muted';
    heroMute.setAttribute('aria-label', unmuted ? 'Mute preview' : 'Unmute preview');
    heroMute.textContent = unmuted ? '🔊' : '♪';
    if (unmuted) tryPlay();
  });
  // Pause when the video scrolls out of view to save battery and bandwidth.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) tryPlay(); else heroVideo.pause();
      });
    }, { threshold: 0.25 });
    io.observe(heroVideo);
  }
}
