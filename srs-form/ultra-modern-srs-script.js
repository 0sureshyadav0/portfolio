// Ultra Modern SRS Form JavaScript

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100
});

// Form state management
let currentStep = 1;
const totalSteps = SRS_FORM_DATA.totalSteps;

// Dynamic form generation
function generateFormSteps() {
    const formStepsContainer = document.getElementById('formSteps');
    if (!formStepsContainer) return;

    let formHTML = '';
    
    SRS_FORM_DATA.steps.forEach((step, index) => {
        const isActive = index === 0 ? 'active' : '';
        const stepNumber = String(step.stepNumber).padStart(2, '0');
        
        formHTML += `
            <div class="form-step ${isActive}" data-step="${step.stepNumber}">
                <div class="step-header">
                    <div class="step-number">${stepNumber}</div>
                    <div class="step-info">
                        <h3 class="step-title">${step.title}</h3>
                        <p class="step-description">${step.description}</p>
                    </div>
                </div>
                
                <div class="form-grid">
        `;
        
        step.fields.forEach(field => {
            const required = field.required ? '<span class="label-required">*</span>' : '';
            const help = field.help ? `<span class="label-help">${field.help}</span>` : '';
            
            if (field.type === 'checkbox_group') {
                formHTML += `
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-text">${field.label}</span>
                            ${required}
                            ${help}
                        </label>
                        <div class="checkbox-group main-features">
                `;
                field.options.forEach(option => {
                    formHTML += `
                        <label class="checkbox-item">
                            <input type="checkbox" name="${field.name}[]" value="${option.value}" data-sub-features="${option.subFeatures}">
                            <span class="checkmark"></span>
                            <span class="checkbox-text">${option.text}</span>
                        </label>
                    `;
                });
                formHTML += `
                        </div>
                    </div>
                    
                    <!-- Dynamic Sub-Features Container -->
                    <div id="subFeaturesContainer" class="sub-features-container" style="display: none;">
                        <h4 class="sub-features-title">Detailed Feature Options</h4>
                        <div id="subFeaturesContent"></div>
                    </div>
                `;
            } else if (field.type === 'textarea') {
                formHTML += `
                    <div class="form-group ${field.name.includes('Description') || field.name.includes('Features') || field.name.includes('Notes') || field.name.includes('Workflow') ? 'full-width' : ''}">
                        <label class="form-label">
                            <span class="label-text">${field.label}</span>
                            ${required}
                            ${help}
                        </label>
                        <div class="textarea-container">
                            <textarea name="${field.name}" class="form-textarea" placeholder="${field.placeholder}" rows="${field.rows || 3}" ${field.required ? 'required' : ''}></textarea>
                            <div class="textarea-border"></div>
                        </div>
                    </div>
                `;
            } else if (field.type === 'select') {
                formHTML += `
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-text">${field.label}</span>
                            ${required}
                            ${help}
                        </label>
                        <div class="select-container">
                            <select name="${field.name}" class="form-select" ${field.required ? 'required' : ''}>
                `;
                field.options.forEach(option => {
                    formHTML += `<option value="${option.value}">${option.text}</option>`;
                });
                formHTML += `
                            </select>
                            <div class="select-arrow">
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>
                    </div>
                `;
            } else if (field.type === 'ai_estimation') {
                formHTML += `
                    <div class="form-group full-width">
                        <label class="form-label">
                            <span class="label-text">${field.label}</span>
                            ${required}
                            ${help}
                        </label>
                        <div class="estimation-section">
                            <div class="estimation-header">
                                <h3>AI-Powered Project Estimation</h3>
                                <p>Get instant cost and timeline estimates based on your selected features</p>
                            </div>
                            <div class="estimation-controls">
                                <button type="button" id="estimateBtn" class="estimate-btn">
                                    <span class="btn-icon">🤖</span>
                                    <span class="btn-text">Generate AI Estimation</span>
                                </button>
                                <button type="button" id="roadmapBtn" class="roadmap-btn" style="display: none;">
                                    <span class="btn-icon">🗺️</span>
                                    <span class="btn-text">Generate Developer Roadmap</span>
                                </button>
                            </div>
                            <div id="estimationResults" class="estimation-results" style="display: none;">
                                <div class="estimation-card cost-estimation">
                                    <h4>💰 Cost Estimation</h4>
                                    <div class="cost-summary">
                                        <div class="total-cost">
                                            <span class="cost-label">Total Project Cost:</span>
                                            <span class="cost-amount" id="totalCost">$0</span>
                                        </div>
                                        <div class="cost-breakdown">
                                            <div class="breakdown-item">
                                                <span>Development:</span>
                                                <span id="devCost">$0</span>
                                            </div>
                                            <div class="breakdown-item">
                                                <span>Design:</span>
                                                <span id="designCost">$0</span>
                                            </div>
                                            <div class="breakdown-item">
                                                <span>Testing:</span>
                                                <span id="testingCost">$0</span>
                                            </div>
                                            <div class="breakdown-item">
                                                <span>Project Management:</span>
                                                <span id="pmCost">$0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="estimation-card timeline-estimation">
                                    <h4>⏰ Timeline Estimation</h4>
                                    <div class="timeline-summary">
                                        <div class="total-timeline">
                                            <span class="timeline-label">Total Duration:</span>
                                            <span class="timeline-amount" id="totalTimeline">0 weeks</span>
                                        </div>
                                        <div class="timeline-phases" id="timelinePhases">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="roadmapResults" class="roadmap-results" style="display: none;">
                                <h4>🗺️ Developer Roadmap</h4>
                                <div id="roadmapContent"></div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                formHTML += `
                    <div class="form-group">
                        <label class="form-label">
                            <span class="label-text">${field.label}</span>
                            ${required}
                            ${help}
                        </label>
                        <div class="input-container">
                            <input type="${field.type}" name="${field.name}" class="form-input" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}>
                            <div class="input-border"></div>
                        </div>
                    </div>
                `;
            }
        });
        
        formHTML += `
                </div>
            </div>
        `;
    });
    
    formStepsContainer.innerHTML = formHTML;
}

// Mode switching
function switchToHackerMode() {
    localStorage.setItem('portfolioMode', 'hacker');
    window.location.href = './index.html';
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    }
}

// Progress management
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const navProgress = document.querySelector('.progress-text');
    const progressRing = document.querySelector('.progress-ring-circle:last-child');
    
    const percentage = (currentStep / totalSteps) * 100;
    
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressPercentage) {
        progressPercentage.textContent = `${Math.round(percentage)}%`;
    }
    
    if (navProgress) {
        navProgress.textContent = `${currentStep}/${totalSteps}`;
    }
    
    if (progressRing) {
        const circumference = 2 * Math.PI * 18;
        const offset = circumference - (percentage / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
}

// Step management
function showStep(step) {
    // Hide all steps with animation
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
    });
    
    // Show current step with animation
    setTimeout(() => {
        const currentStepElement = document.querySelector(`[data-step="${step}"]`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            currentStepElement.style.opacity = '1';
            currentStepElement.style.transform = 'translateY(0)';
        }
    }, 150);
    
    // Update step indicators
    updateStepIndicators();
    updateNavigationButtons();
}

function updateStepIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 <= currentStep) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const previewBtn = document.getElementById('previewBtn');
    const generateSRSBtn = document.getElementById('generateSRSBtn');
    
    if (prevBtn) {
        prevBtn.disabled = currentStep === 1;
    }
    
    // Check if documents have been generated
    const documentsSection = document.getElementById('documentsSection');
    const documentsGenerated = documentsSection && documentsSection.style.display !== 'none';
    
    // Show appropriate buttons based on current step and document status
    if (currentStep === totalSteps) {
        if (documentsGenerated) {
            // Documents generated - show submit button
            if (nextBtn) nextBtn.style.display = 'none';
            if (previewBtn) previewBtn.style.display = 'none';
            if (generateSRSBtn) generateSRSBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'flex';
        } else {
            // Last step but no documents - show preview and generate buttons
            if (nextBtn) nextBtn.style.display = 'none';
            if (previewBtn) previewBtn.style.display = 'flex';
            if (generateSRSBtn) generateSRSBtn.style.display = 'flex';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    } else {
        // Not last step - show next button
        if (nextBtn) nextBtn.style.display = 'flex';
        if (previewBtn) previewBtn.style.display = 'none';
        if (generateSRSBtn) generateSRSBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'none';
    }
}

function nextStep() {
    if (currentStep < totalSteps && validateCurrentStep()) {
        currentStep++;
        showStep(currentStep);
        updateProgress();
        scrollToTop();
        playStepTransition();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
        scrollToTop();
        playStepTransition();
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function playStepTransition() {
    // Add visual feedback for step transition
    const formContainer = document.querySelector('.form-container');
    formContainer.style.transform = 'scale(0.98)';
    setTimeout(() => {
        formContainer.style.transform = 'scale(1)';
    }, 200);
}

// Form validation
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            showFieldError(field, 'This field is required');
        } else {
            field.classList.remove('error');
            hideFieldError(field);
        }
    });
    
    return isValid;
}

function validateAllSteps() {
    let allValid = true;
    
    // Validate all steps
    for (let step = 1; step <= totalSteps; step++) {
        const stepElement = document.querySelector(`[data-step="${step}"]`);
        if (!stepElement) continue;
        
        const requiredFields = stepElement.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allValid = false;
                field.classList.add('error');
                showFieldError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                hideFieldError(field);
            }
        });
    }
    
    return allValid;
}

function showFieldError(field, message) {
    hideFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--error);
        font-size: 0.75rem;
        margin-top: 0.25rem;
        animation: slideIn 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    if (toast && toastIcon && toastMessage) {
        toastMessage.textContent = message;
        
        // Set icon based on type
        switch (type) {
            case 'success':
                toastIcon.className = 'toast-icon fas fa-check-circle';
                toast.className = 'toast success';
                break;
            case 'error':
                toastIcon.className = 'toast-icon fas fa-exclamation-circle';
                toast.className = 'toast error';
                break;
            default:
                toastIcon.className = 'toast-icon fas fa-info-circle';
                toast.className = 'toast info';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Validate all steps, not just current step
    if (!validateAllSteps()) {
        showToast('Please complete all required fields before submitting', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Submitting...</span>';
        submitBtn.disabled = true;
        
        // Get form data
        const form = document.getElementById('srsForm');
        const formData = new FormData(form);
        
        // Add additional data for better form submission
        formData.append('submission_type', 'professional_srs');
        formData.append('timestamp', new Date().toISOString());
        
        // Submit form using fetch for better error handling
        fetch(form.action, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                showToast('Form submitted successfully! You will receive a confirmation email shortly.', 'success');
                
                // Update button to show success
                submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Submitted Successfully</span>';
                submitBtn.style.background = 'var(--gradient-secondary)';
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '../professional.html?submitted=true';
                }, 2000);
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(error => {
            console.error('Submission error:', error);
            showToast('Submission failed. Please try again or contact support.', 'error');
            
            // Reset button
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        });
    }
}

// Input animations and effects
function setupInputAnimations() {
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
                showFieldError(this, 'This field is required');
            } else {
                this.classList.remove('error');
                hideFieldError(this);
            }
        });
        
        // Input validation on change
        input.addEventListener('input', function() {
            this.classList.remove('error');
            hideFieldError(this);
            
            // Add typing effect
            this.parentNode.classList.add('typing');
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => {
                this.parentNode.classList.remove('typing');
            }, 1000);
        });
    });
}

// Floating animation for orbs
function animateOrbs() {
    const orbs = document.querySelectorAll('.orb');
    
    orbs.forEach((orb, index) => {
        const delay = index * 2;
        const duration = 15 + (index * 5);
        
        orb.style.animationDelay = `${delay}s`;
        orb.style.animationDuration = `${duration}s`;
    });
}

// Parallax effect for background elements
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.mesh-gradient, .orb');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
            event.preventDefault();
            if (currentStep < totalSteps) {
                nextStep();
            } else {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        }
        
        if (event.key === 'Escape') {
            const navToggle = document.querySelector('.nav-toggle');
            const navLinks = document.querySelector('.nav-links');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
}

// Sub-features functionality
function setupSubFeatures() {
    // Add event listeners for main feature checkboxes
    document.addEventListener('change', function(event) {
        if (event.target.name === 'main_features[]') {
            handleMainFeatureChange();
        }
    });
}

function handleMainFeatureChange() {
    const checkedFeatures = Array.from(document.querySelectorAll('input[name="main_features[]"]:checked'))
        .map(cb => cb.dataset.subFeatures);
    
    const container = document.getElementById('subFeaturesContainer');
    const content = document.getElementById('subFeaturesContent');
    
    if (checkedFeatures.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    
    // Generate sub-features HTML
    let html = '';
    checkedFeatures.forEach(featureKey => {
        const feature = SUB_FEATURES_DATA[featureKey];
        if (feature) {
            html += `<div class="sub-feature-group">`;
            html += `<h5>${feature.title}</h5>`;
            
            feature.groups.forEach(group => {
                html += `<div class="sub-feature-subgroup">`;
                html += `<h6>${group.title}</h6>`;
                html += `<div class="checkbox-group sub-features">`;
                
                group.features.forEach(subFeature => {
                    html += `
                        <label class="checkbox-item">
                            <input type="checkbox" name="sub_features[]" value="${subFeature.value}">
                            <span class="checkmark"></span>
                            <span class="checkbox-text">${subFeature.text}</span>
                        </label>
                    `;
                });
                
                html += `</div></div>`;
            });
            html += `</div>`;
        }
    });
    
    content.innerHTML = html;
}

// Document generation functionality
function generateDocuments() {
    if (!validateCurrentStep()) {
        showToast('Please complete all required fields before generating documents.', 'error');
        return;
    }

    // Show loading state
    const generateBtn = document.getElementById('generateSRSBtn');
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Generating...</span>';
    }

    try {
        // Get form data
        const formData = new FormData(document.getElementById('srsForm'));
        const data = formatFormDataForGeneration(formData);

        // Generate documents
        generateSRSDocument(data);
        generateContractDocument(data);
        generateSummaryDocument(data);
        generatePricingDocument(data);
        generateTermsDocument(data);
        generatePrivacyDocument(data);

        // Show documents section
        const documentsSection = document.getElementById('documentsSection');
        if (documentsSection) {
            documentsSection.style.display = 'block';
            documentsSection.scrollIntoView({ behavior: 'smooth' });
        }

        // Update button
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-check"></i><span>Documents Generated</span>';
        }

        // Update navigation buttons to show submit button
        updateNavigationButtons();

        showToast('Documents generated successfully! Review and proceed with submission.', 'success');
    } catch (error) {
        console.error('Error generating documents:', error);
        
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-file-alt"></i><span>Generate SRS</span>';
        }
        
        showToast(`Error: ${error.message}`, 'error');
    }
}

function formatFormDataForGeneration(formData) {
    const data = {};
    for (let [key, value] of formData.entries()) {
        if (data[key]) {
            if (Array.isArray(data[key])) {
                data[key].push(value);
            } else {
                data[key] = [data[key], value];
            }
        } else {
            data[key] = value;
        }
    }
    return data;
}

function generateSRSDocument(data) {
    const srsContent = `
        <h1>Software Requirements Specification</h1>
        <div class="document-meta">
            <p><strong>Project:</strong> ${data.projectName || 'N/A'}</p>
            <p><strong>Client:</strong> ${data.clientName || 'N/A'}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <h2>1. Introduction</h2>
        <h3>1.1 Purpose</h3>
        <p>This document provides a comprehensive specification for the ${data.projectName || 'project'} application.</p>
        
        <h3>1.2 Scope</h3>
        <p>${data.projectDescription || 'Project scope to be defined.'}</p>
        
        <h2>2. Overall Description</h2>
        <h3>2.1 Product Perspective</h3>
        <p>This is a ${data.projectType || 'mobile application'} designed for ${data.targetAudience || 'end users'}.</p>
        
        <h3>2.2 Product Functions</h3>
        <ul>
            ${generateFeatureList(data)}
        </ul>
        
        <h2>3. Specific Requirements</h2>
        <h3>3.1 Functional Requirements</h3>
        ${generateFunctionalRequirements(data)}
        
        <h3>3.2 Non-Functional Requirements</h3>
        <p>Performance, security, and usability requirements will be detailed based on project specifications.</p>
    `;
    
    const srsContentElement = document.getElementById('srsContent');
    if (srsContentElement) {
        srsContentElement.innerHTML = srsContent;
    }
}

function generateContractDocument(data) {
    const contractContent = `
        <h1>PROJECT DEVELOPMENT AGREEMENT</h1>
        
        <div class="contract-meta">
            <p><strong>Project:</strong> ${data.projectName || 'N/A'}</p>
            <p><strong>Client:</strong> ${data.clientName || 'N/A'}</p>
            <p><strong>Developer:</strong> Suresh Yadav</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        
        <h2>1. PROJECT SCOPE</h2>
        <p>This agreement covers the development of ${data.projectName || 'the project'} as specified in the attached SRS document.</p>
        
        <h2>2. DELIVERABLES</h2>
        <ul>
            <li>Complete mobile application</li>
            <li>Source code and documentation</li>
            <li>Testing and quality assurance</li>
            <li>Deployment and launch support</li>
        </ul>
        
        <h2>3. TIMELINE</h2>
        <p>Project timeline: ${data.projectTimeline || 'To be determined'}</p>
        
        <h2>4. PAYMENT TERMS</h2>
        <p>Payment structure: ${data.pricingModel || 'To be discussed'}</p>
        
        <h2>5. INTELLECTUAL PROPERTY</h2>
        <p>All intellectual property rights will be transferred to the client upon final payment.</p>
    `;
    
    const contractContentElement = document.getElementById('contractContent');
    if (contractContentElement) {
        contractContentElement.innerHTML = contractContent;
    }
}

function generateSummaryDocument(data) {
    const summaryContent = `
        <h1>Project Summary & Next Steps</h1>
        
        <h2>Project Overview</h2>
        <p><strong>Project Name:</strong> ${data.projectName || 'N/A'}</p>
        <p><strong>Client:</strong> ${data.clientName || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${data.projectType || 'N/A'}</p>
        
        <h2>Key Features</h2>
        <ul>
            ${generateFeatureList(data)}
        </ul>
        
        <h2>Next Steps</h2>
        <ol>
            <li>Review and approve the SRS document</li>
            <li>Sign the project agreement</li>
            <li>Make initial payment</li>
            <li>Begin development phase</li>
            <li>Regular progress updates</li>
        </ol>
        
        <h2>Contact Information</h2>
        <p><strong>Developer:</strong> Suresh Yadav</p>
        <p><strong>Email:</strong> suresh@example.com</p>
        <p><strong>Phone:</strong> +977-XXXXXXXX</p>
    `;
    
    const summaryContentElement = document.getElementById('summaryContent');
    if (summaryContentElement) {
        summaryContentElement.innerHTML = summaryContent;
    }
}

function generatePricingDocument(data) {
    const pricingContent = `
        <h1>Project Pricing & Estimation</h1>
        
        <h2>Cost Breakdown</h2>
        <div class="pricing-table">
            <table>
                <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Cost</th>
                </tr>
                <tr>
                    <td>Development</td>
                    <td>Core application development</td>
                    <td>$X,XXX</td>
                </tr>
                <tr>
                    <td>Design</td>
                    <td>UI/UX design and branding</td>
                    <td>$X,XXX</td>
                </tr>
                <tr>
                    <td>Testing</td>
                    <td>Quality assurance and testing</td>
                    <td>$X,XXX</td>
                </tr>
                <tr>
                    <td>Deployment</td>
                    <td>App store deployment and launch</td>
                    <td>$X,XXX</td>
                </tr>
                <tr class="total-row">
                    <td colspan="2"><strong>Total Project Cost</strong></td>
                    <td><strong>$XX,XXX</strong></td>
                </tr>
            </table>
        </div>
        
        <h2>Payment Schedule</h2>
        <ul>
            <li>30% upfront payment</li>
            <li>40% at milestone completion</li>
            <li>30% upon final delivery</li>
        </ul>
    `;
    
    const pricingContentElement = document.getElementById('pricingContent');
    if (pricingContentElement) {
        pricingContentElement.innerHTML = pricingContent;
    }
}

function generateTermsDocument(data) {
    const termsContent = `
        <h1>Terms & Conditions</h1>
        
        <h2>1. GENERAL TERMS</h2>
        <p>These terms and conditions govern the development services provided by Suresh Yadav.</p>
        
        <h2>2. PROJECT SCOPE</h2>
        <p>The project scope is defined in the attached SRS document and project agreement.</p>
        
        <h2>3. PAYMENT TERMS</h2>
        <p>Payment terms are as specified in the project agreement.</p>
        
        <h2>4. INTELLECTUAL PROPERTY</h2>
        <p>All intellectual property rights transfer to the client upon final payment.</p>
        
        <h2>5. WARRANTIES</h2>
        <p>The developer provides a 90-day warranty for bug fixes and minor adjustments.</p>
        
        <h2>6. LIMITATION OF LIABILITY</h2>
        <p>Liability is limited to the total project cost.</p>
    `;
    
    const termsContentElement = document.getElementById('termsContent');
    if (termsContentElement) {
        termsContentElement.innerHTML = termsContent;
    }
}

function generatePrivacyDocument(data) {
    const privacyContent = `
        <h1>Privacy Policy</h1>
        
        <h2>1. INFORMATION COLLECTION</h2>
        <p>We collect information necessary for project development and communication.</p>
        
        <h2>2. INFORMATION USE</h2>
        <p>Information is used solely for project development and client communication.</p>
        
        <h2>3. INFORMATION SHARING</h2>
        <p>We do not share client information with third parties without consent.</p>
        
        <h2>4. DATA SECURITY</h2>
        <p>We implement appropriate security measures to protect client data.</p>
        
        <h2>5. CONTACT INFORMATION</h2>
        <p>For privacy concerns, contact: suresh@example.com</p>
    `;
    
    const privacyContentElement = document.getElementById('privacyContent');
    if (privacyContentElement) {
        privacyContentElement.innerHTML = privacyContent;
    }
}

function generateFeatureList(data) {
    const mainFeatures = data.main_features || [];
    const subFeatures = data.sub_features || [];
    
    if (mainFeatures.length === 0) return '<li>Features to be determined during detailed planning</li>';
    
    const mainFeatureMap = {
        'authentication': 'User Authentication & Login',
        'user_management': 'User Profile Management',
        'search_filter': 'Search & Filter System',
        'payment_system': 'Payment & E-commerce',
        'notifications': 'Push Notifications',
        'messaging': 'In-App Messaging & Chat',
        'location_services': 'Location & GPS Services',
        'media_handling': 'Media & Content Handling',
        'social_integration': 'Social Media Integration',
        'analytics': 'Analytics & Reporting',
        'offline_mode': 'Offline Functionality',
        'admin_panel': 'Admin Panel & Dashboard'
    };
    
    let html = '';
    mainFeatures.forEach(mainFeature => {
        const mainFeatureName = mainFeatureMap[mainFeature] || mainFeature;
        html += `<li><strong>${mainFeatureName}</strong>`;
        
        // Find related sub-features
        const relatedSubFeatures = subFeatures.filter(subFeature => {
            return isSubFeatureOfMain(subFeature, mainFeature);
        });
        
        if (relatedSubFeatures.length > 0) {
            html += '<ul>';
            relatedSubFeatures.forEach(subFeature => {
                html += `<li>${subFeature}</li>`;
            });
            html += '</ul>';
        }
        html += '</li>';
    });
    
    return html;
}

function generateFunctionalRequirements(data) {
    const requirements = [];
    
    const mainFeatures = data.main_features || [];
    const subFeatures = data.sub_features || [];
    
    if (mainFeatures.length > 0) {
        mainFeatures.forEach((mainFeature, index) => {
            const reqId = `FR-${index + 1}`;
            const mainFeatureMap = {
                'authentication': 'User Authentication & Login',
                'user_management': 'User Profile Management',
                'search_filter': 'Search & Filter System',
                'payment_system': 'Payment & E-commerce',
                'notifications': 'Push Notifications',
                'messaging': 'In-App Messaging & Chat',
                'location_services': 'Location & GPS Services',
                'media_handling': 'Media & Content Handling',
                'social_integration': 'Social Media Integration',
                'analytics': 'Analytics & Reporting',
                'offline_mode': 'Offline Functionality',
                'admin_panel': 'Admin Panel & Dashboard'
            };
            
            const mainFeatureName = mainFeatureMap[mainFeature] || mainFeature;
            requirements.push(`<h4>${reqId}: ${mainFeatureName}</h4><p>The system shall provide ${mainFeatureName} functionality as specified in the requirements.</p>`);
            
            // Add sub-features if any
            const relatedSubFeatures = subFeatures.filter(subFeature => {
                return isSubFeatureOfMain(subFeature, mainFeature);
            });
            
            if (relatedSubFeatures.length > 0) {
                requirements.push('<ul>');
                relatedSubFeatures.forEach(subFeature => {
                    requirements.push(`<li>${subFeature}</li>`);
                });
                requirements.push('</ul>');
            }
        });
    }
    
    return requirements.join('');
}

function isSubFeatureOfMain(subFeature, mainFeature) {
    // This is a simplified mapping - in a real implementation, you'd have a proper mapping
    return true; // For now, assume all sub-features belong to all main features
}

// AI Estimation functionality
function initializeEstimation() {
    const estimateBtn = document.getElementById('estimateBtn');
    const roadmapBtn = document.getElementById('roadmapBtn');
    
    if (estimateBtn) {
        estimateBtn.addEventListener('click', generateEstimation);
    }
    
    if (roadmapBtn) {
        roadmapBtn.addEventListener('click', generateRoadmap);
    }
}

function generateEstimation() {
    if (!validateCurrentStep()) {
        showToast('Please complete all required fields before generating estimation.', 'error');
        return;
    }

    try {
        const estimateBtn = document.getElementById('estimateBtn');
        if (estimateBtn) {
            estimateBtn.disabled = true;
            estimateBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Generating...</span>';
        }

        const formData = new FormData(document.getElementById('srsForm'));
        const data = formatFormDataForGeneration(formData);

        // Generate estimation (simplified version)
        const estimation = calculateEstimation(data);
        displayEstimation(estimation);

        if (estimateBtn) {
            estimateBtn.disabled = false;
            estimateBtn.innerHTML = '<span class="btn-icon">🤖</span><span class="btn-text">Generate AI Estimation</span>';
        }

        const roadmapBtn = document.getElementById('roadmapBtn');
        if (roadmapBtn) {
            roadmapBtn.style.display = 'flex';
        }

        showToast('AI estimation generated successfully!', 'success');
    } catch (error) {
        console.error('Error generating estimation:', error);
        showToast(`Estimation error: ${error.message}`, 'error');
        
        const estimateBtn = document.getElementById('estimateBtn');
        if (estimateBtn) {
            estimateBtn.disabled = false;
            estimateBtn.innerHTML = '<span class="btn-icon">🤖</span><span class="btn-text">Generate AI Estimation</span>';
        }
    }
}

function calculateEstimation(data) {
    const mainFeatures = data.main_features || [];
    const subFeatures = data.sub_features || [];
    
    // Base costs
    let baseCost = 5000;
    let baseWeeks = 8;
    
    // Feature multipliers
    const featureCosts = {
        'authentication': 2000,
        'user_management': 1500,
        'search_filter': 1000,
        'payment_system': 3000,
        'notifications': 800,
        'messaging': 2500,
        'location_services': 1200,
        'media_handling': 1800,
        'social_integration': 1500,
        'analytics': 1000,
        'offline_mode': 2000,
        'admin_panel': 2500
    };
    
    const featureWeeks = {
        'authentication': 2,
        'user_management': 1.5,
        'search_filter': 1,
        'payment_system': 3,
        'notifications': 0.5,
        'messaging': 2.5,
        'location_services': 1,
        'media_handling': 1.5,
        'social_integration': 1.5,
        'analytics': 1,
        'offline_mode': 2,
        'admin_panel': 2.5
    };
    
    let totalCost = baseCost;
    let totalWeeks = baseWeeks;
    
    mainFeatures.forEach(feature => {
        totalCost += featureCosts[feature] || 0;
        totalWeeks += featureWeeks[feature] || 0;
    });
    
    // Sub-features add 20% more cost and time
    if (subFeatures.length > 0) {
        totalCost *= 1.2;
        totalWeeks *= 1.2;
    }
    
    return {
        totalCost: Math.round(totalCost),
        totalWeeks: Math.round(totalWeeks),
        breakdown: {
            development: Math.round(totalCost * 0.6),
            design: Math.round(totalCost * 0.2),
            testing: Math.round(totalCost * 0.15),
            projectManagement: Math.round(totalCost * 0.05)
        },
        timeline: {
            planning: Math.round(totalWeeks * 0.1),
            development: Math.round(totalWeeks * 0.7),
            testing: Math.round(totalWeeks * 0.15),
            deployment: Math.round(totalWeeks * 0.05)
        }
    };
}

function displayEstimation(estimation) {
    const resultsContainer = document.getElementById('estimationResults');
    if (!resultsContainer) return;
    
    // Update cost elements
    const totalCostElement = document.getElementById('totalCost');
    const devCostElement = document.getElementById('devCost');
    const designCostElement = document.getElementById('designCost');
    const testingCostElement = document.getElementById('testingCost');
    const pmCostElement = document.getElementById('pmCost');
    
    if (totalCostElement) totalCostElement.textContent = `$${estimation.totalCost.toLocaleString()}`;
    if (devCostElement) devCostElement.textContent = `$${estimation.breakdown.development.toLocaleString()}`;
    if (designCostElement) designCostElement.textContent = `$${estimation.breakdown.design.toLocaleString()}`;
    if (testingCostElement) testingCostElement.textContent = `$${estimation.breakdown.testing.toLocaleString()}`;
    if (pmCostElement) pmCostElement.textContent = `$${estimation.breakdown.projectManagement.toLocaleString()}`;
    
    // Update timeline elements
    const totalTimelineElement = document.getElementById('totalTimeline');
    const timelinePhasesElement = document.getElementById('timelinePhases');
    
    if (totalTimelineElement) totalTimelineElement.textContent = `${estimation.totalWeeks} weeks`;
    
    if (timelinePhasesElement) {
        timelinePhasesElement.innerHTML = `
            <div class="timeline-phase">
                <span class="phase-name">Planning:</span>
                <span class="phase-duration">${estimation.timeline.planning} weeks</span>
            </div>
            <div class="timeline-phase">
                <span class="phase-name">Development:</span>
                <span class="phase-duration">${estimation.timeline.development} weeks</span>
            </div>
            <div class="timeline-phase">
                <span class="phase-name">Testing:</span>
                <span class="phase-duration">${estimation.timeline.testing} weeks</span>
            </div>
            <div class="timeline-phase">
                <span class="phase-name">Deployment:</span>
                <span class="phase-duration">${estimation.timeline.deployment} weeks</span>
            </div>
        `;
    }
    
    resultsContainer.style.display = 'block';
}

function generateRoadmap() {
    // Placeholder for roadmap generation
    showToast('Roadmap generation feature coming soon!', 'info');
}

// Document utility functions
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activeContent = document.getElementById(`${tabName}-tab`);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function downloadDocument(documentType) {
    const contentElement = document.getElementById(`${documentType}Content`);
    if (!contentElement) return;
    
    const content = contentElement.innerHTML;
    const title = document.querySelector(`#${documentType}-tab h3`)?.textContent || 'Document';
    
    // Create a temporary element to get clean HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Create downloadable content
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1, h2, h3 { color: #333; }
                table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .total-row { font-weight: bold; background-color: #f9f9f9; }
            </style>
        </head>
        <body>
            ${tempDiv.innerHTML}
        </body>
        </html>
    `;
    
    // Create and trigger download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`${title} downloaded successfully!`, 'success');
}

function printDocument(documentType) {
    const contentElement = document.getElementById(`${documentType}Content`);
    if (!contentElement) return;
    
    const title = document.querySelector(`#${documentType}-tab h3`)?.textContent || 'Document';
    
    // Create print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                h1, h2, h3 { color: #333; }
                table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .total-row { font-weight: bold; background-color: #f9f9f9; }
                @media print {
                    body { margin: 0; }
                }
            </style>
        </head>
        <body>
            ${contentElement.innerHTML}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    
    showToast(`${title} sent to printer!`, 'success');
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Generate form steps dynamically
    generateFormSteps();
    
    // Setup sub-features functionality
    setupSubFeatures();
    
    // Initialize AI estimation
    initializeEstimation();
    
    // Initialize form
    showStep(currentStep);
    updateProgress();
    updateNavigationButtons();
    
    // Setup event listeners
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const previewBtn = document.getElementById('previewBtn');
    const generateSRSBtn = document.getElementById('generateSRSBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', handleFormSubmit);
    }

    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            if (!validateCurrentStep()) {
                showToast('Please complete all required fields before previewing documents.', 'error');
                return;
            }
            // For now, just generate documents
            generateDocuments();
        });
    }

    if (generateSRSBtn) {
        generateSRSBtn.addEventListener('click', generateDocuments);
    }

    // Document tab switching
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-btn')) {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        }
    });

    // Document actions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.download-btn')) {
            const btn = e.target.closest('.download-btn');
            const documentType = btn.id.replace('download', '').toLowerCase();
            downloadDocument(documentType);
        }
        
        if (e.target.closest('.print-btn')) {
            const btn = e.target.closest('.print-btn');
            const documentType = btn.id.replace('print', '').toLowerCase();
            printDocument(documentType);
        }
    });

    // Modify form button
    const modifyFormBtn = document.getElementById('modifyForm');
    if (modifyFormBtn) {
        modifyFormBtn.addEventListener('click', function() {
            const documentsSection = document.getElementById('documentsSection');
            if (documentsSection) {
                documentsSection.style.display = 'none';
            }
            
            // Update navigation buttons to hide submit button
            updateNavigationButtons();
            
            document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Setup additional features
    setupInputAnimations();
    animateOrbs();
    setupParallax();
    setupSmoothScroll();
    setupKeyboardNavigation();
    
    // Mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('.ultra-nav');
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (nav && !nav.contains(event.target) && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-input.error,
        .form-select.error,
        .form-textarea.error {
            border-color: var(--error);
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        .input-container.focused .input-border,
        .textarea-container.focused .textarea-border {
            width: 100%;
        }
        
        .input-container.typing {
            transform: scale(1.02);
        }
        
        .form-container {
            transition: transform 0.3s ease;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
    
    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to the Ultra Modern SRS Form!', 'success');
    }, 1000);
});
