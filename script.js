// NAV SCROLL
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// MOBILE MENU
function openMobileMenu() { document.getElementById('mobileMenu').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// REVEAL ON SCROLL
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => observer.observe(el));

// HERO ANIMATE IN
window.addEventListener('load', () => {
  const els = ['heroBadge', 'heroEyebrow', 'heroTitle', 'heroSub', 'heroCtas'];
  els.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) { el.style.transition = 'opacity 1s ease, transform 1s ease'; el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }
    }, 400 + i * 200);
  });
});


// ===== FLOOR PLAN HOTSPOTS =====
(function () {
  const detail = document.getElementById('fp-detail');
  const rooms = {
    kitchen: "Kitchen — 10'0\" × 8'0\"",
    bed1: "Bedroom 1 — 10'0\" × 8'0\"",
    hall: "Hall — 16'0\" × 10'0\"",
    bed2: "Bedroom 2 — 10'0\" × 10'0\"",
    toilet1: "Attached Toilet — 4'0\" × 6'5\"",
    toilet2: "Other Toilet — 4'0\" × 4'0\"",
    toilet3: "Attached Toilet — 6'0\" × 4'0\"",
    portico: "Portico — 9'0\" × 15'1.5\""
  };
  document.querySelectorAll('.fp-room').forEach(spot => {
    spot.addEventListener('click', () => {
      document.querySelectorAll('.fp-room').forEach(s => s.classList.remove('active'));
      spot.classList.add('active');
      if (detail) detail.textContent = rooms[spot.dataset.room] || '';
    });
  });
})();

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '', duration = 2000) {
  if (!el) return;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(document.getElementById('stat1'), 12, '%');
      animateCounter(document.getElementById('stat2'), 4.5, '%');
      animateCounter(document.getElementById('stat3'), 8, '+');
      animateCounter(document.getElementById('stat4'), 65, '%');
      animateCounter(document.getElementById('tc1'), 15, '+');
      animateCounter(document.getElementById('tc2'), 50, '+');
      animateCounter(document.getElementById('tc3'), 120, '+');
      counterObs.disconnect();
    }
  });
}, { threshold: 0.3 });
const invSection = document.getElementById('investment');
if (invSection) counterObs.observe(invSection);

// ===== FORM SUBMIT =====
// ===== FORM SUBMIT =====
function submitForm() {
  const name = document.getElementById('fname').value;
  const phone = document.getElementById('fphone').value;
  const email = document.getElementById('femail').value || 'Not provided';
  const date = document.getElementById('fdate').value || 'Not specified';
  const source = document.getElementById('fsource').value || 'Not specified';
  const message = document.getElementById('fmessage').value || 'No message';

  if (!name || !phone) { alert('Please enter your name and mobile number.'); return; }
  if (!name) { alert('Please enter your full name.'); return; }
  if (!phone || !/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) { alert('Please enter a valid 10-digit mobile number.'); return; }
  if (!document.getElementById('fdate').value) { alert('Please select a preferred visit date.'); return; }

const text = `🏡 New Enquiry — Divine Homes \n\n👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n📅 Visit Date: ${date}\n📣 Source: ${source}\n💬 Message: ${message}`;

const waMessage = encodeURIComponent(text);
window.open(`https://wa.me/919384947996?text=${waMessage}`, '_blank');

  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// ===== PARALLAX =====
window.addEventListener('load', () => {
  const dateInput = document.getElementById('fdate');
  if(dateInput) dateInput.min = new Date().toISOString().split('T')[0];
});
