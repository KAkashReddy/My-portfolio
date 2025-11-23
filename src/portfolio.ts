// DOM Elements
const header = document.querySelector('.header') as HTMLElement;
const menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
const nav = document.querySelector('.nav') as HTMLElement;
const skillLevels = document.querySelectorAll('.skill-level') as NodeListOf<HTMLElement>;
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

// Interactive Elements
let cursorDot: HTMLElement;
let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// Function to handle header styling on scroll
function handleScroll() {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Function to handle mobile menu toggle
function toggleMenu() {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
}

// Function to animate skill bars when in viewport
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const bar = entry.target as HTMLElement;
        const width = bar.getAttribute('data-width') || '0%';
        // Add a small delay
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
        observer.unobserve(bar);
      }
    }
  }, { threshold: 0.2 });

  for (const level of skillLevels) {
    // Store original width
    const originalWidth = level.style.width;
    level.setAttribute('data-width', originalWidth);
    level.style.width = '0%';

    observer.observe(level);
  }
}

// Function to handle form submission
function handleFormSubmit(e: Event) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Here you would typically send the form data to a server
  // For now, we'll just log it and show a success message
  console.log({ name, email, message });

  // Show success message
  const successMessage = document.createElement('div');
  successMessage.className = 'form-success';
  successMessage.textContent = 'Your message has been sent successfully!';

  contactForm.innerHTML = '';
  contactForm.appendChild(successMessage);
}

// Event listeners
window.addEventListener('scroll', handleScroll);
menuToggle?.addEventListener('click', toggleMenu);
contactForm?.addEventListener('submit', handleFormSubmit);

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('a[href^="#"]');
for (const link of navLinks) {
  link.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
    e.preventDefault();

    const href = this.getAttribute('href');
    if (!href) return;

    const targetElement = document.querySelector(href);
    if (!targetElement) return;

    window.scrollTo({
      top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    if (nav.classList.contains('active')) {
      toggleMenu();
    }
  });
}

import Lenis from 'lenis';

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  setupLenis(); // Initialize smooth scrolling
  handleScroll(); // Check initial scroll position
  animateSkillBars(); // Set up skill bar animations
  setupScrollReveal(); // Set up scroll reveal animations
  setupRippleEffect(); // Set up Material ripple effect
  setupThemeToggle(); // Set up theme toggle
  setupCursorEffects(); // Set up cursor trail
  createFloatingParticles(); // Create floating particles
  setupMagneticButtons(); // Set up magnetic button effects
  setup3DTiltEffect(); // Set up 3D tilt on cards
  setupScrollProgress(); // Set up scroll progress bar
  setupParallaxEffect(); // Set up parallax scrolling
  // setupTypingAnimation(); // Disabled - was clearing hero title
});

// Theme Toggle
function setupThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn?.querySelector('i');
  const html = document.documentElement;

  // Check for saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Default to dark if system preference is dark
    html.setAttribute('data-theme', 'dark');
    updateIcon('dark');
  }

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme: string) {
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
  }
}

// Smooth Scrolling with Lenis
function setupLenis() {
  const lenis = new Lenis({
    duration: 0.4, // Very fast/snappy
    easing: (t) => 1 - Math.pow(1 - t, 4), // Aggressive ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.8, // Much faster scroll speed
    touchMultiplier: 2.5, // High touch sensitivity
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// Scroll Reveal Animation
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    }
  }, { threshold: 0.15 });

  for (const reveal of reveals) {
    revealObserver.observe(reveal);
  }
}

// Material Ripple Effect
function setupRippleEffect() {
  const buttons = document.querySelectorAll('.btn, .nav a, .card, .interest-item, .certificate-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e: any) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Simple Elegant Cursor Effect
function setupCursorEffects() {
  cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);

  // Smooth cursor follow
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    const dx = mouseX - outlineX;
    const dy = mouseY - outlineY;
    outlineX += dx * 0.2;
    outlineY += dy * 0.2;

    cursorDot.style.left = `${outlineX - 5}px`;
    cursorDot.style.top = `${outlineY - 5}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Simple hover effect
  const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .skill-category, .certificate-item, .interest-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '0.7';
  });
}

// Floating Particles
function createFloatingParticles() {
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
    document.body.appendChild(particle);
  }
}

// Magnetic Button Effect
function setupMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e: any) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      (button as HTMLElement).style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    button.addEventListener('mouseleave', () => {
      (button as HTMLElement).style.transform = 'translate(0, 0)';
    });
  });
}

// 3D Tilt Effect
function setup3DTiltEffect() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e: any) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      (card as HTMLElement).style.setProperty('--rotate-x', `${rotateX}deg`);
      (card as HTMLElement).style.setProperty('--rotate-y', `${rotateY}deg`);
    });

    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.setProperty('--rotate-x', '0deg');
      (card as HTMLElement).style.setProperty('--rotate-y', '0deg');
    });
  });
}

// Scroll Progress Bar
function setupScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

// Parallax Scrolling Effect
function setupParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.hero-jp-deco, .section-bg-text');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxElements.forEach((el, index) => {
      const speed = 0.5 + (index * 0.1);
      (el as HTMLElement).style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}
