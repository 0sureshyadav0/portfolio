// Modern JavaScript for Portfolio Website
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupFormHandling();
    this.setupLottieAnimation();
  }

  // Navigation Setup
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Active link highlighting
    this.setupActiveLinkHighlighting();
  }

  // Active Link Highlighting
  setupActiveLinkHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // Scroll Effects
  setupScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('#parrot');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px) rotateY(180deg)`;
      }
    });

    // Reveal animations on scroll
    this.setupRevealAnimations();
  }

  // Reveal Animations
  setupRevealAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe cards and sections
    const elementsToAnimate = document.querySelectorAll('.card, .section-header');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // GSAP Animations
  setupAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.timeline()
      .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
      .from('.hero-role', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
      .from('.hero-description', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3')
      .from('.hero-quote', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3')
      .from('.hero-actions', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3');

    // Parrot animation with scroll trigger
    gsap.to('#parrot', {
      scrollTrigger: {
        trigger: '#parrot',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
      scale: 1.1,
      rotation: 5,
      ease: 'none'
    });

    // Card hover animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { duration: 0.3, scale: 1.05, ease: 'power2.out' });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { duration: 0.3, scale: 1, ease: 'power2.out' });
      });
    });

    // Button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { duration: 0.2, scale: 1.05, ease: 'power2.out' });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { duration: 0.2, scale: 1, ease: 'power2.out' });
      });
    });
  }

  // Form Handling
  setupFormHandling() {
    const form = document.getElementById('email-form');
    if (!form) return;

    // Form validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });
      
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  // Field Validation
  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Remove existing error styling
    field.classList.remove('error');
    this.removeErrorMessage(field);

    // Validation rules
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }

    if (!isValid) {
      field.classList.add('error');
      this.showErrorMessage(field, errorMessage);
    }

    return isValid;
  }

  // Show Error Message
  showErrorMessage(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--danger-color)';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorDiv);
  }

  // Remove Error Message
  removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
  }

  // Form Submission Handler
  async handleFormSubmission(form) {
    const sendButton = document.getElementById('sendButton');
    const originalText = sendButton.innerHTML;
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification('Please fix the errors before submitting', 'error');
      return;
    }

    // Show loading state
    sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    sendButton.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        this.showNotification('Message sent successfully!', 'success');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      this.showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      sendButton.innerHTML = originalText;
      sendButton.disabled = false;
    }
  }

  // Notification System
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? 'var(--accent-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-lg);
      z-index: 3000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  // Lottie Animation Setup
  setupLottieAnimation() {
    const parrot = document.getElementById('parrot');
    if (parrot) {
      // Add hover effect to parrot
      parrot.addEventListener('mouseenter', () => {
        parrot.setAttribute('speed', '1.5');
      });
      
      parrot.addEventListener('mouseleave', () => {
        parrot.setAttribute('speed', '1');
      });
    }
  }

  // Utility Methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Enhanced Build Functions
const buildPersonalProjects = (personalProjects) => {
  const projectsContainer = document.getElementById('projects');
  if (!projectsContainer) return;

  let html = '';
  personalProjects.forEach((project, index) => {
    const { name, description, icon, downloadUrl, readMoreUrl } = project;
    
    html += `
      <div class="card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <img src="${icon}" alt="${name} App Icon" loading="lazy" />
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-button">
            <a href="${index === 0 ? downloadUrl : `./assets/apps/${name}.apk`}" 
               download="${name}.apk" 
               class="download-btn">
              <i class="fas fa-download"></i>
              Download
            </a>
            <a href="../projestDescription/personlaProjectDesc.html?product=${index + 1}" 
               class="read-more-btn">
              <i class="fas fa-info-circle"></i>
              Read More
            </a>
          </div>
        </div>
      </div>
    `;
  });
  
  projectsContainer.innerHTML = html;
};

const buildUpcomingProjects = (upcomingProjects) => {
  const upcomingContainer = document.getElementById('upcomingProjects');
  if (!upcomingContainer) return;

  let html = '';
  upcomingProjects.forEach((project, index) => {
    const { name, description, icon, downloadUrl } = project;
    
    html += `
      <div class="card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <img src="${icon}" alt="${name} App Icon" loading="lazy" />
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-button">
            <a href="${downloadUrl}" class="coming-soon-btn" disabled>
              <i class="fas fa-clock"></i>
              Coming Soon
            </a>
            <a href="#" class="read-more-btn" disabled>
              <i class="fas fa-info-circle"></i>
              Read More
            </a>
          </div>
        </div>
      </div>
    `;
  });
  
  upcomingContainer.innerHTML = html;
};

const buildPackages = (packages) => {
  const packagesContainer = document.getElementById('packages');
  if (!packagesContainer) return;

  let html = '';
  packages.forEach((pkg, index) => {
    const { name, description, icon, readMoreUrl } = pkg;
    
    html += `
      <div class="card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <img src="${icon}" alt="${name} Package Icon" loading="lazy" />
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-button">
            <a href="../projestDescription/packagesDesc.html?product=${index + 1}" 
               class="read-more-btn">
              <i class="fas fa-info-circle"></i>
              Read More
            </a>
          </div>
        </div>
      </div>
    `;
  });
  
  packagesContainer.innerHTML = html;
};

// Popup Functions (Enhanced)
function openPopup(topic, subtopic, btn) {
  const popupTopic = document.getElementById('popupTopic');
  const popupSubTopic = document.getElementById('popupSubTopic');
  const closeBtn = document.getElementById('close-btn');
  const overlay = document.getElementById('popup-overlay');
  const popupBox = document.getElementById('popup-box');

  if (popupTopic) popupTopic.textContent = topic;
  if (popupSubTopic) popupSubTopic.textContent = subtopic;
  if (closeBtn) closeBtn.textContent = btn;
  
  if (overlay) overlay.style.display = 'block';
  if (popupBox) popupBox.style.display = 'block';

  // Animate popup
  setTimeout(() => {
    if (popupBox) {
      popupBox.style.transform = 'translate(-50%, -50%) scale(1)';
      popupBox.style.opacity = '1';
    }
  }, 10);

  return true;
}

function closePopup() {
  const overlay = document.getElementById('popup-overlay');
  const popupBox = document.getElementById('popup-box');

  if (popupBox) {
    popupBox.style.transform = 'translate(-50%, -50%) scale(0.8)';
    popupBox.style.opacity = '0';
  }

  setTimeout(() => {
    if (overlay) overlay.style.display = 'none';
    if (popupBox) popupBox.style.display = 'none';
  }, 300);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
