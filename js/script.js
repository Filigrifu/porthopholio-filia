/**
 * Cosmic Aurora Portfolio - JavaScript
 * Features:
 * - Dynamic Twinkling Canvas Starfield
 * - Active Navigation Glow & ScrollSpy
 * - Transparent-to-Glass Header on Scroll
 * - Mobile Menu Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const canvas = document.getElementById('starfield-canvas');

  // ==========================================================================
  // 2. Dynamic Starfield Canvas (Twinkling Cosmic Stars)
  // ==========================================================================
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    });

    const starCount = Math.floor((width * height) / 4500);
    let stars = [];

    function initStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleFactor: Math.random() * Math.PI,
          isFlare: Math.random() < 0.03 // Rare glowing flare star
        });
      }
    }

    initStars();

    let animationFrameId;
    function animateStars() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.twinkleFactor += star.twinkleSpeed;
        const currentAlpha = star.baseAlpha + Math.sin(star.twinkleFactor) * 0.3;
        const safeAlpha = Math.max(0.1, Math.min(1, currentAlpha));

        ctx.fillStyle = `rgba(255, 255, 255, ${safeAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // 4-point lens flare for special stars
        if (star.isFlare) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${safeAlpha * 0.6})`;
          ctx.lineWidth = 0.6;
          const flareLen = star.radius * 7;
          ctx.beginPath();
          ctx.moveTo(star.x - flareLen, star.y);
          ctx.lineTo(star.x + flareLen, star.y);
          ctx.moveTo(star.x, star.y - flareLen);
          ctx.lineTo(star.x, star.y + flareLen);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animateStars);
    }

    animateStars();
  }

  // ==========================================================================
  // 2b. Subtle Artistic Mouse Parallax on Aurora Ribbons Container
  // ==========================================================================
  const auroraContainer = document.querySelector('.aurora-ribbons-container');
  if (auroraContainer && window.matchMedia('(pointer: fine)').matches) {
    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 26;
      targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    }, { passive: true });

    function updateAuroraParallax() {
      currX += (targetX - currX) * 0.04;
      currY += (targetY - currY) * 0.04;
      auroraContainer.style.transform = `translate3d(${currX}px, ${currY}px, 0)`;
      requestAnimationFrame(updateAuroraParallax);
    }

    updateAuroraParallax();
  }

  // ==========================================================================
  // 3. Header Scroll Effect & ScrollSpy (Active Glow Sync)
  // ==========================================================================
  function handleScroll() {
    const scrollY = window.scrollY;

    // Header transparency to glassmorphism
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy to update active menu link
    let currentId = '';
    const scrollBuffer = scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollBuffer >= top && scrollBuffer < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================================================
  // 4. Navigation Click Interaction
  // ==========================================================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Close mobile drawer if open
      if (navMenu && navMenu.classList.contains('nav-open')) {
        navMenu.classList.remove('nav-open');
        mobileToggle.classList.remove('open');
      }
    });
  });

  // ==========================================================================
  // 5. Mobile Menu Toggle
  // ==========================================================================
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('nav-open');
      mobileToggle.classList.toggle('open', isOpen);
    });
  }

  // ==========================================================================
  // 6. Projects Cards Carousel
  // ==========================================================================
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('projects-prev');
  const nextBtn = document.getElementById('projects-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (carousel) {
    const cards = carousel.querySelectorAll('.project-card');

    // Create pagination dots
    if (dotsContainer && cards.length > 0) {
      dotsContainer.innerHTML = '';
      cards.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to project ${idx + 1}`);
        dot.addEventListener('click', () => {
          const card = cards[idx];
          if (card) {
            carousel.scrollTo({
              left: card.offsetLeft - carousel.offsetLeft,
              behavior: 'smooth'
            });
          }
        });
        dotsContainer.appendChild(dot);
      });
    }

    // Scroll step based on card width + gap
    const getScrollStep = () => {
      const firstCard = cards[0];
      if (firstCard) {
        const gap = parseInt(window.getComputedStyle(carousel).gap || '32', 10);
        return firstCard.offsetWidth + gap;
      }
      return 300;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }

    // Update active pagination dot
    const updateActiveDot = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      const scrollLeft = carousel.scrollLeft;

      let activeIndex = 0;
      let minDiff = Infinity;

      cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - carousel.offsetLeft - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          activeIndex = idx;
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    };

    carousel.addEventListener('scroll', updateActiveDot, { passive: true });

    // Drag-to-scroll support for mouse
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollStart = carousel.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        carousel.style.cursor = 'pointer';
      }
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollStart - walk;
    });
  }

  // ==========================================================================
  // 7. Contact Form Interaction
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('user-email');
      const messageInput = document.getElementById('user-message');

      const userEmail = emailInput ? emailInput.value.trim() : '';
      const userMessage = messageInput ? messageInput.value.trim() : '';

      if (!userEmail || !userMessage) return;

      // Provide visual button feedback
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'OPENING EMAIL...';
      submitBtn.style.background = '#00f2fe';
      submitBtn.style.color = '#07021b';
      submitBtn.style.borderColor = '#00f2fe';
      submitBtn.style.boxShadow = '0 0 20px #00f2fe';

      const subject = encodeURIComponent(`Portfolio Inquiry from ${userEmail}`);
      const body = encodeURIComponent(`From: ${userEmail}\n\nMessage:\n${userMessage}`);
      window.location.href = `mailto:Frifurareany@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        submitBtn.textContent = 'SENT!';
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = 'transparent';
          submitBtn.style.color = '#ffffff';
          submitBtn.style.borderColor = 'rgba(255, 255, 255, 0.85)';
          submitBtn.style.boxShadow = 'none';
          contactForm.reset();
        }, 2500);
      }, 800);
    });
  }
});
