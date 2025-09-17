// Ultra Modern Portfolio JavaScript - Advanced Interactions

class UltraModernPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupCursor();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupWorkFilter();
    this.setupFormHandling();
    this.setupLottieAnimation();
    this.setupParticles();
  }

  // Custom Cursor
  setupCursor() {
    const cursor = document.querySelector('.cursor-follower');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .card, .nav-link');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'rgba(0, 255, 136, 0.8)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'var(--gradient-primary)';
      });
    });
  }

  // Navigation
  setupNavigation() {
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinkElements.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
      } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
        nav.style.backdropFilter = 'blur(20px)';
      }

      lastScrollTop = scrollTop;
    });

    // Smooth scrolling
    navLinkElements.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 80;
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
      const heroParticles = document.querySelector('.hero-particles');
      
      if (heroParticles) {
        const speed = scrolled * 0.5;
        heroParticles.style.transform = `translateY(${speed}px)`;
      }
    });

    // Reveal animations
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

    const elementsToAnimate = document.querySelectorAll('.project-card, .package-card, .upcoming-card, .section-header');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // GSAP Animations
  setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.timeline()
      .from('.hero-title .title-line', { 
        duration: 1, 
        y: 50, 
        opacity: 0, 
        ease: 'power3.out',
        stagger: 0.2
      })
      .from('.hero-description', { 
        duration: 0.8, 
        y: 30, 
        opacity: 0, 
        ease: 'power3.out' 
      }, '-=0.5')
      .from('.hero-stats', { 
        duration: 0.8, 
        y: 30, 
        opacity: 0, 
        ease: 'power3.out' 
      }, '-=0.3')
      .from('.hero-actions', { 
        duration: 0.8, 
        y: 30, 
        opacity: 0, 
        ease: 'power3.out' 
      }, '-=0.3');

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
    const cards = document.querySelectorAll('.project-card, .package-card, .upcoming-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          duration: 0.3, 
          scale: 1.02, 
          ease: 'power2.out' 
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          duration: 0.3, 
          scale: 1, 
          ease: 'power2.out' 
        });
      });
    });

    // Button animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { 
          duration: 0.2, 
          scale: 1.05, 
          ease: 'power2.out' 
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { 
          duration: 0.2, 
          scale: 1, 
          ease: 'power2.out' 
        });
      });
    });
  }

  // Work Filter
  setupWorkFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCategories = document.querySelectorAll('.work-category');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show/hide categories
        workCategories.forEach(category => {
          const categoryType = category.getAttribute('data-category');
          
          if (filter === 'all' || categoryType === filter) {
            category.style.display = 'block';
            gsap.fromTo(category, 
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
          } else {
            gsap.to(category, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              ease: 'power2.out',
              onComplete: () => {
                category.style.display = 'none';
              }
            });
          }
        });
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
    errorDiv.style.color = 'var(--secondary)';
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
      this.showToast('Please fix the errors before submitting', 'error');
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
        this.showToast('Message sent successfully!', 'success');
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      this.showToast('Failed to send message. Please try again.', 'error');
    } finally {
      sendButton.innerHTML = originalText;
      sendButton.disabled = false;
    }
  }

  // Toast Notification
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.style.display = 'block';
    
    // Animate in
    gsap.fromTo(toast, 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    setTimeout(() => {
      gsap.to(toast, {
        x: 100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          toast.style.display = 'none';
        }
      });
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

  // Particles Effect
  setupParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary);
        border-radius: 50%;
        opacity: 0.6;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${5 + Math.random() * 10}s infinite linear;
      `;
      particlesContainer.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
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
    const { name, description, icon, downloadUrl } = project;
    
    html += `
      <div class="project-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card-image">
          <img src="${icon}" alt="${name} App Icon" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-actions">
            <a href="${index === 0 ? downloadUrl : `./assets/apps/${name}.apk`}" 
               download="${name}.apk" 
               class="card-btn card-btn-primary">
              <i class="fas fa-download"></i>
              Download
            </a>
            <a href="../projestDescription/personlaProjectDesc.html?product=${index + 1}" 
               class="card-btn card-btn-secondary">
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
      <div class="upcoming-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card-image">
          <img src="${icon}" alt="${name} App Icon" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-actions">
            <a href="${downloadUrl}" class="card-btn card-btn-disabled">
              <i class="fas fa-clock"></i>
              Coming Soon
            </a>
            <a href="#" class="card-btn card-btn-disabled">
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
      <div class="package-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="card-image">
          <img src="${icon}" alt="${name} Package Icon" loading="lazy" />
        </div>
        <div class="card-content">
          <h3 class="card-title">${name}</h3>
          <p class="card-description">${description}</p>
          <div class="card-actions">
            <a href="../projestDescription/packagesDesc.html?product=${index + 1}" 
               class="card-btn card-btn-primary">
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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new UltraModernPortfolio();
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

// Service Worker Registration
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
