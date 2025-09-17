// Hacker Portfolio JavaScript - Terminal Style Interactions

class HackerPortfolio {
  constructor() {
    this.init();
  }

  init() {
    this.setupTerminalCursor();
    this.setupNavigation();
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupWorkFilter();
    this.setupFormHandling();
    this.setupLottieAnimation();
    this.setupMatrixEffect();
    this.setupTypingEffect();
    this.setupMatrixRain();
    this.setupTerminalSounds();
    this.setupGlitchEffects();
    this.setupInteractiveTerminal();
    this.setupScanlines();
    this.setupQuantumParticles();
    this.setupNeuralNetwork();
    this.setupCyberGrid();
    this.setupHolographicEffects();
    this.setupAIInteractions();
    this.setup3DCyberpunk();
    this.setupAdvancedAudio();
    this.setupSmartAnimations();
  }

  // Terminal Cursor
  setupTerminalCursor() {
    const cursor = document.querySelector('.terminal-cursor');
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
    const interactiveElements = document.querySelectorAll('a, button, .terminal-window, .nav-link');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'var(--secondary)';
        cursor.style.boxShadow = 'var(--shadow-glow-cyan)';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'var(--primary)';
        cursor.style.boxShadow = 'var(--shadow-glow)';
      });
    });
  }

  // Navigation
  setupNavigation() {
    const nav = document.getElementById('hacker-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
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

    // Smooth scrolling
    navLinkElements.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 90;
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
    // Parallax effect for matrix background
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const matrixBg = document.querySelector('.matrix-bg');
      
      if (matrixBg) {
        const speed = scrolled * 0.5;
        matrixBg.style.transform = `translateY(${speed}px)`;
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

    const elementsToAnimate = document.querySelectorAll('.project-card, .package-card, .upcoming-card, .terminal-output');
    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // GSAP Animations
  setupAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Terminal animations
    gsap.timeline()
      .from('.terminal-line', { 
        duration: 0.8, 
        x: -50, 
        opacity: 0, 
        ease: 'power3.out',
        stagger: 0.2
      })
      .from('.terminal-output', { 
        duration: 0.6, 
        y: 20, 
        opacity: 0, 
        ease: 'power3.out' 
      }, '-=0.4');

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
    const buttons = document.querySelectorAll('.hacker-btn');
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
    errorDiv.style.color = 'var(--danger)';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '4px';
    errorDiv.style.fontFamily = 'var(--font-mono)';
    
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
    sendButton.innerHTML = '<span class="btn-icon">></span><span class="btn-text">sending...</span>';
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

  // Matrix Effect
  setupMatrixEffect() {
    const matrixColumns = document.querySelectorAll('.matrix-column');
    
    matrixColumns.forEach(column => {
      const chars = column.querySelectorAll('.matrix-char');
      chars.forEach((char, index) => {
        char.style.animationDelay = `${index * 0.1}s`;
      });
    });
  }

  // Typing Effect
  setupTypingEffect() {
    const typingElements = document.querySelectorAll('.typing');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing after a delay
      setTimeout(typeWriter, 1000);
    });
  }

  // Matrix Digital Rain Effect
  setupMatrixRain() {
    const matrixRain = document.createElement('div');
    matrixRain.className = 'matrix-rain';
    document.body.appendChild(matrixRain);

    const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = i * 20 + 'px';
      column.style.animationDuration = (Math.random() * 3 + 2) + 's';
      column.style.animationDelay = Math.random() * 2 + 's';

      let text = '';
      for (let j = 0; j < 20; j++) {
        text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
      }
      column.innerHTML = text;

      matrixRain.appendChild(column);
    }
  }

  // Terminal Sounds
  setupTerminalSounds() {
    // Create audio context for terminal sounds
    this.audioContext = null;
    this.soundEnabled = false;

    // Enable sounds on first user interaction
    document.addEventListener('click', () => {
      if (!this.soundEnabled) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.soundEnabled = true;
      }
    });

    // Add sound effects to buttons and links
    const interactiveElements = document.querySelectorAll('a, button, .nav-link');
    interactiveElements.forEach(el => {
      el.addEventListener('click', () => {
        this.playTerminalSound();
      });
    });
  }

  // Play Terminal Sound
  playTerminalSound() {
    if (!this.soundEnabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  // Glitch Effects
  setupGlitchEffects() {
    const glitchElements = document.querySelectorAll('.terminal-title, .brand-text');
    
    glitchElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('glitch');
        setTimeout(() => {
          element.classList.remove('glitch');
        }, 2000);
      });
    });

    // Random glitch effect
    setInterval(() => {
      const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      if (randomElement && Math.random() < 0.1) {
        randomElement.classList.add('glitch');
        setTimeout(() => {
          randomElement.classList.remove('glitch');
        }, 1000);
      }
    }, 5000);
  }

  // Interactive Terminal
  setupInteractiveTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach(line => {
      line.addEventListener('click', () => {
        this.playTerminalSound();
        line.style.background = 'rgba(0, 255, 65, 0.1)';
        setTimeout(() => {
          line.style.background = 'transparent';
        }, 200);
      });
    });

    // Add command history simulation
    this.commandHistory = [
      'whoami',
      'cat experience.txt',
      'ls -la projects/',
      'cat about.txt',
      'contact --help'
    ];

    // Add autocomplete simulation
    const commandElements = document.querySelectorAll('.command');
    commandElements.forEach(cmd => {
      cmd.addEventListener('mouseenter', () => {
        cmd.title = 'Click to execute command';
        cmd.style.cursor = 'pointer';
      });
    });
  }

  // Scanlines Effect
  setupScanlines() {
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);

    // Add CRT monitor effect
    document.body.style.background = `
      radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%),
      linear-gradient(90deg, transparent 0%, rgba(0, 255, 65, 0.02) 50%, transparent 100%)
    `;
  }

  // Quantum Particles System
  setupQuantumParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'quantum-particles';
    document.body.appendChild(particleContainer);

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particleContainer.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 8000);
    };

    // Create particles continuously
    setInterval(createParticle, 200);
  }

  // Neural Network Visualization
  setupNeuralNetwork() {
    const neuralContainer = document.createElement('div');
    neuralContainer.className = 'neural-network';
    document.body.appendChild(neuralContainer);

    const nodes = [];
    const connections = [];

    // Create neural nodes
    for (let i = 0; i < 15; i++) {
      const node = document.createElement('div');
      node.className = 'neural-node';
      node.style.left = Math.random() * window.innerWidth + 'px';
      node.style.top = Math.random() * window.innerHeight + 'px';
      node.style.animationDelay = Math.random() * 2 + 's';
      neuralContainer.appendChild(node);
      nodes.push(node);
    }

    // Create connections between nodes
    nodes.forEach((node, index) => {
      if (index < nodes.length - 1) {
        const connection = document.createElement('div');
        connection.className = 'neural-connection';
        const rect1 = node.getBoundingClientRect();
        const rect2 = nodes[index + 1].getBoundingClientRect();
        
        const length = Math.sqrt(
          Math.pow(rect2.left - rect1.left, 2) + 
          Math.pow(rect2.top - rect1.top, 2)
        );
        
        connection.style.width = length + 'px';
        connection.style.left = rect1.left + 'px';
        connection.style.top = rect1.top + 'px';
        connection.style.transformOrigin = '0 0';
        connection.style.transform = `rotate(${Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left)}rad)`;
        
        neuralContainer.appendChild(connection);
        connections.push(connection);
      }
    });
  }

  // Cyberpunk Grid
  setupCyberGrid() {
    const grid = document.createElement('div');
    grid.className = 'cyber-grid';
    document.body.appendChild(grid);
  }

  // Holographic Effects
  setupHolographicEffects() {
    const cards = document.querySelectorAll('.project-card, .package-card, .upcoming-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hologram');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hologram');
      });
    });

    // Add holographic effect to terminal windows
    const terminals = document.querySelectorAll('.terminal-window');
    terminals.forEach(terminal => {
      terminal.addEventListener('mouseenter', () => {
        terminal.classList.add('quantum-tunnel');
      });
      
      terminal.addEventListener('mouseleave', () => {
        terminal.classList.remove('quantum-tunnel');
      });
    });
  }

  // AI-Powered Interactions
  setupAIInteractions() {
    // Smart hover effects based on user behavior
    let hoverCount = 0;
    const elements = document.querySelectorAll('.nav-link, .hacker-btn, .card-btn');
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        hoverCount++;
        
        // AI learns user preferences
        if (hoverCount > 5) {
          element.style.transition = 'all 0.1s ease';
          element.style.transform = 'scale(1.05)';
        }
        
        // Predictive highlighting
        if (hoverCount > 10) {
          const siblings = element.parentNode.children;
          Array.from(siblings).forEach(sibling => {
            if (sibling !== element) {
              sibling.style.opacity = '0.7';
            }
          });
        }
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'scale(1)';
        const siblings = element.parentNode.children;
        Array.from(siblings).forEach(sibling => {
          sibling.style.opacity = '1';
        });
      });
    });

    // Smart scroll behavior
    let scrollDirection = 'down';
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
      
      // AI adjusts animations based on scroll direction
      const animatedElements = document.querySelectorAll('[data-aos]');
      animatedElements.forEach(el => {
        if (scrollDirection === 'up') {
          el.style.animationDirection = 'reverse';
        } else {
          el.style.animationDirection = 'normal';
        }
      });
    });
  }

  // 3D Cyberpunk Elements
  setup3DCyberpunk() {
    // Create 3D cyber cubes
    const heroSection = document.querySelector('.hero-terminal');
    if (heroSection) {
      const cubeContainer = document.createElement('div');
      cubeContainer.className = 'cyber-cube';
      cubeContainer.style.position = 'absolute';
      cubeContainer.style.top = '20%';
      cubeContainer.style.right = '10%';
      cubeContainer.style.zIndex = '-1';
      
      for (let i = 0; i < 6; i++) {
        const face = document.createElement('div');
        face.className = 'cube-face';
        cubeContainer.appendChild(face);
      }
      
      heroSection.appendChild(cubeContainer);
    }

    // Add 3D perspective to cards
    const cards = document.querySelectorAll('.project-card, .package-card, .upcoming-card');
    cards.forEach(card => {
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 0.3s ease';
      
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(5deg) rotateX(5deg) translateZ(10px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
      });
    });
  }

  // Advanced Audio System
  setupAdvancedAudio() {
    if (!this.audioContext) return;

    // Create spatial audio effects
    this.createSpatialSound = (frequency, duration, x, y) => {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const pannerNode = this.audioContext.createPanner();
      
      oscillator.connect(gainNode);
      gainNode.connect(pannerNode);
      pannerNode.connect(this.audioContext.destination);
      
      // Set 3D position
      pannerNode.positionX.value = x;
      pannerNode.positionY.value = y;
      pannerNode.positionZ.value = 0;
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
      
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);
    };

    // Add spatial sound to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
      link.addEventListener('click', () => {
        const x = (index - 2) * 0.5; // Spread sounds horizontally
        this.createSpatialSound(600 + index * 100, 0.2, x, 0);
      });
    });
  }

  // Smart Animations
  setupSmartAnimations() {
    // Performance-based animation adjustments
    const adjustAnimationsForPerformance = () => {
      const isLowEndDevice = navigator.hardwareConcurrency < 4;
      
      if (isLowEndDevice) {
        // Reduce animation complexity for low-end devices
        document.documentElement.style.setProperty('--transition-fast', '0.1s ease');
        document.documentElement.style.setProperty('--transition-normal', '0.2s ease');
        document.documentElement.style.setProperty('--transition-slow', '0.3s ease');
        
        // Disable heavy effects
        const heavyEffects = document.querySelectorAll('.quantum-particles, .neural-network');
        heavyEffects.forEach(effect => {
          effect.style.display = 'none';
        });
      }
    };

    adjustAnimationsForPerformance();

    // Adaptive animation based on user interaction
    let interactionCount = 0;
    document.addEventListener('click', () => {
      interactionCount++;
      
      if (interactionCount > 10) {
        // User is highly interactive, increase animation intensity
        document.documentElement.style.setProperty('--transition-fast', '0.05s ease');
        document.documentElement.style.setProperty('--transition-normal', '0.1s ease');
        document.documentElement.style.setProperty('--transition-slow', '0.2s ease');
      }
    });

    // Battery-aware animations
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        if (battery.level < 0.2) {
          // Low battery, reduce animations
          document.documentElement.style.setProperty('--transition-fast', '0.2s ease');
          document.documentElement.style.setProperty('--transition-normal', '0.4s ease');
          document.documentElement.style.setProperty('--transition-slow', '0.6s ease');
        }
      });
    }
  }

  // Custom Music Player
  setupCustomMusicPlayer() {
    const audio = document.getElementById('musicAudio');
    const playBtn = document.getElementById('musicPlayBtn');
    const playIcon = document.getElementById('playIcon');
    const progressBar = document.getElementById('musicProgressBar');
    const progressContainer = document.getElementById('musicProgress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const volumeBar = document.getElementById('volumeBar');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicStatus = document.querySelector('.music-status');

    if (!audio || !playBtn) {
      console.log('Music player elements not found, showing fallback player');
      const fallbackPlayer = document.getElementById('fallbackPlayer');
      if (fallbackPlayer) {
        fallbackPlayer.style.display = 'block';
        // Hide custom controls
        const customControls = document.querySelector('.music-controls');
        const progressBar = document.getElementById('musicProgress');
        const timeDisplay = document.querySelector('.music-time');
        const volumeControl = document.querySelector('.music-volume');
        
        if (customControls) customControls.style.display = 'none';
        if (progressBar) progressBar.style.display = 'none';
        if (timeDisplay) timeDisplay.style.display = 'none';
        if (volumeControl) volumeControl.style.display = 'none';
      }
      return;
    }

    // Debug audio loading
    console.log('Audio element found:', audio);
    console.log('Audio src:', audio.src);
    console.log('Audio readyState:', audio.readyState);
    console.log('Audio networkState:', audio.networkState);
    console.log('Audio error:', audio.error);

    // Set audio properties for better compatibility
    audio.preload = 'metadata';
    audio.crossOrigin = 'anonymous';
    
    // Force load the audio
    audio.load();

    // Format time helper
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Update duration when metadata loads
    audio.addEventListener('loadedmetadata', () => {
      console.log('Audio metadata loaded, duration:', audio.duration);
      durationEl.textContent = formatTime(audio.duration);
      musicStatus.textContent = 'Ready to play';
    });

    // Handle audio loading
    audio.addEventListener('loadstart', () => {
      console.log('Audio loading started');
      musicStatus.textContent = 'Loading...';
    });

    audio.addEventListener('canplay', () => {
      console.log('Audio can play');
      musicStatus.textContent = 'Ready to play';
    });

    audio.addEventListener('canplaythrough', () => {
      console.log('Audio can play through');
      musicStatus.textContent = 'Ready to play';
    });

    // Play/Pause functionality
    playBtn.addEventListener('click', async () => {
      try {
        if (!userInteracted) {
          musicStatus.textContent = 'Click anywhere first to enable audio';
          return;
        }

        if (audio.paused) {
          console.log('Attempting to play audio...');
          
          // Check if audio is ready
          if (audio.readyState < 2) {
            musicStatus.textContent = 'Loading audio...';
            await new Promise(resolve => {
              audio.addEventListener('canplay', resolve, { once: true });
              audio.addEventListener('error', resolve, { once: true });
            });
          }
          
          await audio.play();
          playIcon.textContent = '⏸';
          playBtn.classList.add('playing');
          musicStatus.textContent = 'Playing...';
          this.playTerminalSound();
          console.log('Audio playing successfully');
        } else {
          audio.pause();
          playIcon.textContent = '▶';
          playBtn.classList.remove('playing');
          musicStatus.textContent = 'Paused';
          console.log('Audio paused');
        }
      } catch (error) {
        console.error('Error playing audio:', error);
        musicStatus.textContent = 'Error: ' + error.message;
        
        // Try to load the audio again
        audio.load();
      }
    });

    // Update progress bar
    audio.addEventListener('timeupdate', () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${progress}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // Click on progress bar to seek
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      audio.currentTime = percentage * audio.duration;
    });

    // Volume control
    volumeSlider.addEventListener('click', (e) => {
      const rect = volumeSlider.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      audio.volume = percentage;
      volumeBar.style.width = `${percentage * 100}%`;
    });

    // Set initial volume
    audio.volume = 0.7;
    volumeBar.style.width = '70%';

    // Handle user interaction requirement for audio
    let userInteracted = false;
    
    const enableAudio = () => {
      userInteracted = true;
      musicStatus.textContent = 'Ready to play';
      console.log('User interaction detected, audio enabled');
    };

    // Listen for any user interaction
    document.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });
    document.addEventListener('touchstart', enableAudio, { once: true });

    // Test button for debugging
    const testBtn = document.getElementById('testBtn');
    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        try {
          console.log('Test button clicked');
          console.log('Audio src:', audio.src);
          console.log('Audio readyState:', audio.readyState);
          console.log('Audio networkState:', audio.networkState);
          console.log('Audio error:', audio.error);
          
          // Try to play a simple beep
          if (this.audioContext) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
            console.log('Test beep played');
          }
        } catch (error) {
          console.error('Test button error:', error);
        }
      });
    }

    // Audio events
    audio.addEventListener('play', () => {
      musicStatus.textContent = 'Playing...';
      playIcon.textContent = '⏸';
      playBtn.classList.add('playing');
    });

    audio.addEventListener('pause', () => {
      musicStatus.textContent = 'Paused';
      playIcon.textContent = '▶';
      playBtn.classList.remove('playing');
    });

    audio.addEventListener('ended', () => {
      musicStatus.textContent = 'Finished';
      playIcon.textContent = '▶';
      playBtn.classList.remove('playing');
    });

    audio.addEventListener('error', () => {
      musicStatus.textContent = 'Error loading audio';
      playIcon.textContent = '▶';
      playBtn.classList.remove('playing');
    });

    // Add hover effects
    playBtn.addEventListener('mouseenter', () => {
      if (this.soundEnabled) {
        this.createSpatialSound(400, 0.1, 0, 0);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        playBtn.click();
      }
    });
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

// Enhanced Build Functions - Terminal Style
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
               class="card-btn">
              <span class="btn-icon">></span>
              <span class="btn-text">download</span>
            </a>
            <a href="../projestDescription/personlaProjectDesc.html?product=${index + 1}" 
               class="card-btn">
              <span class="btn-icon">></span>
              <span class="btn-text">read_more</span>
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
              <span class="btn-icon">></span>
              <span class="btn-text">coming_soon</span>
            </a>
            <a href="#" class="card-btn card-btn-disabled">
              <span class="btn-icon">></span>
              <span class="btn-text">read_more</span>
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
               class="card-btn">
              <span class="btn-icon">></span>
              <span class="btn-text">read_more</span>
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
  console.log('DOM loaded, initializing HackerPortfolio...');
  new HackerPortfolio();
});

// Also initialize when window loads (fallback)
window.addEventListener('load', () => {
  console.log('Window loaded, checking if HackerPortfolio initialized...');
  if (!window.hackerPortfolio) {
    console.log('Initializing HackerPortfolio from window load...');
    window.hackerPortfolio = new HackerPortfolio();
  }
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
