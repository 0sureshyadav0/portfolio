// Professional Portfolio JavaScript

// Mobile Navigation Toggle
function toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle && navLinks) {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    }
}

// Style Switcher - Redirect to Hacker Mode
function switchToHacker() {
    // Save current mode preference
    localStorage.setItem('portfolio-mode', 'hacker');
    // Redirect to hacker mode
    window.location.href = './hacker.html';
}

// Initialize Style from localStorage
function initStyle() {
    const savedMode = localStorage.getItem('portfolio-mode');
    // Don't redirect on page load - let user stay on current page
    // Only redirect when they explicitly click the toggle button
    localStorage.setItem('portfolio-mode', 'professional');
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
                
                // Close mobile menu if open
                const navToggle = document.getElementById('nav-toggle');
                const navLinks = document.getElementById('nav-links');
                if (navToggle && navLinks) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Update Active Navigation Link
function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Load Projects Dynamically
function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    const projects = PortfolioData.projects;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card animate-fade-in-up" data-category="${project.category}">
            <img src="${project.image}" alt="${project.name}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.name}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-actions">
                    <button class="project-btn" onclick="openReadmePage('${project.id}', '${project.readme}')">
                        <i class="fas fa-book"></i> README
                    </button>
                    <a href="${project.demo}" class="project-btn primary" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Load Services Dynamically
function loadServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;
    
    const services = PortfolioData.packages;
    
    servicesGrid.innerHTML = services.map((service, index) => `
        <div class="service-card ${index === 1 ? 'featured' : ''} animate-fade-in-up">
            ${index === 1 ? '<div class="service-badge">Most Popular</div>' : ''}
            <h3 class="service-title">${service.name}</h3>
            <div class="service-price" style="color: ${service.id === 'standard' ? 'white !important' : 'var(--primary)'}">${service.price}</div>
            <div class="service-duration" style="color: ${service.id === 'standard' ? 'white !important' : 'var(--gray-600)'}">${service.duration}</div>
            <p class="service-description">${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `<li class="service-feature">${feature}</li>`).join('')}
            </ul>
            <button class="service-btn" onclick="contactForService('${service.name}')">
                Get Started
            </button>
        </div>
    `).join('');
}

// Project Filter Functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('animate-fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Create email content
        const emailContent = `
            Name: ${data.name}
            Email: ${data.email}
            Subject: ${data.subject}
            Message: ${data.message}
        `;
        
        // Create mailto link
        const mailtoLink = `mailto:sureshyadav2004@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailContent)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Email client opened! Please send your message.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Contact for Service
function contactForService(serviceName) {
    const subject = `Inquiry about ${serviceName}`;
    const body = `Hello Suresh,\n\nI'm interested in the ${serviceName} package. Could you please provide more details about:\n\n- Timeline\n- Requirements\n- Pricing\n- Next steps\n\nThank you!`;
    
    const mailtoLink = `mailto:sureshyadav2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Intersection Observer for Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Update Active Nav Link on Scroll
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
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

// Initialize Everything
function init() {
    initStyle();
    initSmoothScrolling();
    loadProjects();
    loadServices();
    initProjectFilters();
    initContactForm();
    initNavbarScroll();
    initScrollAnimations();
    initScrollSpy();
    
    // Add click outside to close mobile menu
    document.addEventListener('click', function(e) {
        const navToggle = document.getElementById('nav-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (navToggle && navLinks && !navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Add escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const navToggle = document.getElementById('nav-toggle');
            const navLinks = document.getElementById('nav-links');
            
            if (navToggle && navLinks) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;
document.head.appendChild(style);

// README Page Functionality
function openReadmePage(projectId, readmeUrl) {
    // Store project data in localStorage for the README page
    const projectData = {
        id: projectId,
        readmeUrl: readmeUrl,
        timestamp: Date.now()
    };
    
    localStorage.setItem('readme-project', JSON.stringify(projectData));
    
    // Open README page in new tab
    window.open('./readme-viewer.html', '_blank');
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeReadmeModal();
    }
});

// Professional Music Player
class ProfessionalMusicPlayer {
    constructor() {
        this.audio = document.getElementById('musicAudio');
        this.playBtn = document.getElementById('musicPlayBtn');
        this.playIcon = document.getElementById('playIcon');
        this.progressBar = document.getElementById('musicProgressBar');
        this.progressContainer = document.getElementById('musicProgress');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeBar = document.getElementById('volumeBar');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.musicStatus = document.getElementById('musicStatus');
        this.musicContent = document.getElementById('musicContent');
        this.musicToggleBtn = document.getElementById('musicToggleBtn');
        
        this.isPlaying = false;
        this.isExpanded = false;
        this.userInteracted = false;
        
        this.init();
    }
    
    init() {
        if (!this.audio || !this.playBtn) {
            console.log('Music player elements not found');
            return;
        }
        
        this.setupEventListeners();
        this.setupAudioProperties();
        this.updateUI();
    }
    
    setupEventListeners() {
        // Toggle music content visibility
        this.musicToggleBtn.addEventListener('click', () => {
            this.toggleMusicContent();
        });
        
        // Play/Pause button
        this.playBtn.addEventListener('click', () => {
            this.togglePlayPause();
        });
        
        // Progress bar click to seek
        this.progressContainer.addEventListener('click', (e) => {
            this.seekToPosition(e);
        });
        
        // Volume slider
        this.volumeSlider.addEventListener('click', (e) => {
            this.setVolume(e);
        });
        
        // Audio events
        this.audio.addEventListener('loadedmetadata', () => {
            this.updateDuration();
        });
        
        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        
        this.audio.addEventListener('ended', () => {
            this.handleAudioEnded();
        });
        
        this.audio.addEventListener('error', (e) => {
            this.handleAudioError(e);
        });
        
        // Enable audio on first user interaction
        document.addEventListener('click', () => {
            if (!this.userInteracted) {
                this.userInteracted = true;
                this.musicStatus.textContent = 'Ready to play';
            }
        });
    }
    
    setupAudioProperties() {
        this.audio.preload = 'metadata';
        this.audio.volume = 0.7;
        this.audio.crossOrigin = 'anonymous';
    }
    
    toggleMusicContent() {
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            this.musicContent.style.display = 'block';
            this.musicToggleBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            this.musicContent.style.display = 'none';
            this.musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }
    
    async togglePlayPause() {
        if (!this.userInteracted) {
            this.musicStatus.textContent = 'Click anywhere first to enable audio';
            return;
        }
        
        try {
            if (this.audio.paused) {
                await this.audio.play();
                this.isPlaying = true;
                this.playIcon.className = 'fas fa-pause';
                this.playBtn.classList.add('playing');
                this.musicStatus.textContent = 'Playing...';
            } else {
                this.audio.pause();
                this.isPlaying = false;
                this.playIcon.className = 'fas fa-play';
                this.playBtn.classList.remove('playing');
                this.musicStatus.textContent = 'Paused';
            }
        } catch (error) {
            console.error('Error playing audio:', error);
            this.musicStatus.textContent = 'Error: ' + error.message;
        }
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const progress = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressBar.style.width = `${progress}%`;
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateDuration() {
        if (this.audio.duration) {
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        }
    }
    
    seekToPosition(e) {
        if (!this.audio.duration) return;
        
        const rect = this.progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        const newTime = percentage * this.audio.duration;
        
        this.audio.currentTime = newTime;
    }
    
    setVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = Math.max(0, Math.min(1, clickX / width));
        
        this.audio.volume = percentage;
        this.volumeBar.style.width = `${percentage * 100}%`;
    }
    
    handleAudioEnded() {
        this.isPlaying = false;
        this.playIcon.className = 'fas fa-play';
        this.playBtn.classList.remove('playing');
        this.musicStatus.textContent = 'Finished';
        this.progressBar.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
    }
    
    handleAudioError(e) {
        console.error('Audio error:', e);
        this.musicStatus.textContent = 'Error loading audio';
    }
    
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateUI() {
        // Set initial volume bar width
        this.volumeBar.style.width = '70%';
        
        // Set initial status
        this.musicStatus.textContent = 'Ready to play';
    }
}

// Initialize music player when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize music player
    new ProfessionalMusicPlayer();
});
