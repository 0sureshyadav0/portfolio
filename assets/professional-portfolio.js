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
            <div class="service-price">${service.price}</div>
            <div class="service-duration">${service.duration}</div>
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
