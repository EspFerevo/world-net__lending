// DOM Elements
const body = document.body;
const modal = document.getElementById('connection-modal');
const burgerButton = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const headerButtons = document.querySelectorAll('.button.header__button, .button.hero__button');
const modalClose = document.querySelector('.modal__close');
const connectionForm = document.getElementById('connection-form');
const modalForm = document.getElementById('modal-form');
const tariffButtons = document.querySelectorAll('.tariff__button');

// Testimonials Slider
const testimonialSlider = document.querySelector('.testimonials__slider');
const testimonials = document.querySelectorAll('.testimonial');
const prevArrow = document.querySelector('.testimonials__arrow--prev');
const nextArrow = document.querySelector('.testimonials__arrow--next');

let currentSlide = 0;
let slideWidth = 0;

// Initialize the page
function init() {
  // Add animation classes to elements when they enter the viewport
  animateOnScroll();

  // Add event listeners
  addEventListeners();

  // Setup testimonials slider
  setupTestimonialsSlider();
}

// Add event listeners to interactive elements
function addEventListeners() {
  // Mobile menu toggle
  if (burgerButton) {
    burgerButton.addEventListener('click', toggleMobileMenu);
  }

  // Modal open buttons (header and hero)
  headerButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  // Modal close button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close modal on outside click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Form submission
  if (connectionForm) {
    connectionForm.addEventListener('submit', handleFormSubmit);
  }

  if (modalForm) {
    modalForm.addEventListener('submit', handleFormSubmit);
  }

  // Tariff buttons
  tariffButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  anchorLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  if (burgerButton && nav) {
    burgerButton.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  }
}

// Open connection modal
function openModal() {
  if (modal) {
    modal.classList.add('active');
    body.style.overflow = 'hidden';
  }
}

// Close connection modal
function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    body.style.overflow = '';
  }
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Simulate form submission (would be replaced with actual API call)
  console.log('Form submitted with data:', Object.fromEntries(formData));

  // Show success message (for demonstration purposes)
  const formElements = form.querySelectorAll('input, select, button');
  formElements.forEach(el => {
    el.style.pointerEvents = 'none';
    el.style.opacity = '0.7';
  });

  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Заявку успішно відправлено! Наш менеджер зв\'яжеться з вами найближчим часом.';
  successMessage.style.color = 'var(--success)';
  successMessage.style.marginTop = '15px';
  successMessage.style.fontWeight = '500';

  form.appendChild(successMessage);

  // Reset form after timeout
  setTimeout(() => {
    form.reset();
    formElements.forEach(el => {
      el.style.pointerEvents = '';
      el.style.opacity = '';
    });
    form.removeChild(successMessage);

    // Close modal if submission was from modal form
    if (form.id === 'modal-form') {
      closeModal();
    }
  }, 3000);
}

// Setup testimonials slider
function setupTestimonialsSlider() {
  if (!testimonialSlider || !testimonials.length || !prevArrow || !nextArrow) return;

  // Update slide width on window resize
  const updateSlideWidth = () => {
    if (testimonials[0]) {
      slideWidth = testimonials[0].offsetWidth + parseInt(window.getComputedStyle(testimonials[0]).marginRight);
    }
  };

  updateSlideWidth();
  window.addEventListener('resize', updateSlideWidth);

  // Add click events to navigation arrows
  prevArrow.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSliderPosition();
    }
  });

  nextArrow.addEventListener('click', () => {
    if (currentSlide < testimonials.length - 1) {
      currentSlide++;
      updateSliderPosition();
    }
  });

  // Update slider position
  function updateSliderPosition() {
    testimonialSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Update arrows visibility
    prevArrow.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextArrow.style.opacity = currentSlide === testimonials.length - 1 ? '0.5' : '1';

    // Add smooth transition
    testimonialSlider.style.transition = 'transform 0.3s ease';
  }

  // Initialize arrow states
  updateSliderPosition();
}

// Smooth scroll for anchor links
function smoothScroll(e) {
  e.preventDefault();

  const link = e.currentTarget;
  const targetId = link.getAttribute('href');
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    // Close mobile menu if open
    if (burgerButton && burgerButton.classList.contains('active')) {
      toggleMobileMenu();
    }

    // Scroll to target
    window.scrollTo({
      top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80, // Offset for header
      behavior: 'smooth'
    });
  }
}

// Animate elements when they enter the viewport
function animateOnScroll() {
  const animatedElements = document.querySelectorAll('.hero__title, .hero__description, .hero__button, .feature, .tariff, .about__text, .about__stat, .testimonial, .cta__title, .cta__text, .cta__form');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(element => {
    // Add initial hidden state
    element.classList.add('opacity-0');
    observer.observe(element);
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS class to enable transitions after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// Add scroll event for header styling
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }
});
