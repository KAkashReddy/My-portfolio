// DOM Elements
const header = document.querySelector('.header') as HTMLElement;
const menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
const nav = document.querySelector('.nav') as HTMLElement;
const skillLevels = document.querySelectorAll('.skill-level') as NodeListOf<HTMLElement>;
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

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
