// SRS Form JavaScript - Hacker Theme
class SRSForm {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 8;
        this.form = document.getElementById('srsForm');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.previewBtn = document.getElementById('previewBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.generateSRSBtn = document.getElementById('generateSRSBtn');
        this.steps = document.querySelectorAll('.form-step');
        
        // Document elements
        this.documentsSection = document.getElementById('documentsSection');
        this.srsContent = document.getElementById('srsContent');
        this.contractContent = document.getElementById('contractContent');
        this.summaryContent = document.getElementById('summaryContent');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateProgress();
        this.updateNavigation();
        this.validateCurrentStep();
        
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    setupEventListeners() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousStep());
        this.nextBtn.addEventListener('click', () => this.nextStep());
        this.previewBtn.addEventListener('click', () => this.previewDocuments());
        this.generateSRSBtn.addEventListener('click', () => this.generateDocuments());
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Document actions
        this.setupDocumentActions();
        
        // Real-time validation
        this.form.addEventListener('input', () => this.validateCurrentStep());
        this.form.addEventListener('change', () => this.validateCurrentStep());
        
        // Dynamic sub-features
        this.setupSubFeatures();
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Auto-save form data
        this.form.addEventListener('input', () => this.autoSave());
        this.form.addEventListener('change', () => this.autoSave());
        
        // Load saved data
        this.loadSavedData();
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateProgress();
                this.updateNavigation();
                this.scrollToTop();
            }
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateProgress();
            this.updateNavigation();
            this.scrollToTop();
        }
    }

    showStep(stepNumber) {
        // Hide all steps
        this.steps.forEach(step => {
            step.classList.remove('active', 'fade-in');
            step.classList.add('fade-out');
        });
        
        // Show current step
        setTimeout(() => {
            this.steps.forEach(step => {
                step.classList.remove('fade-out');
            });
            
            const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
            if (currentStepElement) {
                currentStepElement.classList.add('active', 'fade-in');
            }
        }, 150);
    }

    updateProgress() {
        const progressPercentage = (this.currentStep / this.totalSteps) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        this.progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;
    }

    updateNavigation() {
        // Previous button
        this.prevBtn.disabled = this.currentStep === 1;
        
        // Next/Generate/Submit button
        if (this.currentStep === this.totalSteps) {
            this.nextBtn.style.display = 'none';
            this.previewBtn.style.display = 'flex';
            this.generateSRSBtn.style.display = 'none';
            this.submitBtn.style.display = 'none';
        } else {
            this.nextBtn.style.display = 'flex';
            this.previewBtn.style.display = 'none';
            this.generateSRSBtn.style.display = 'none';
            this.submitBtn.style.display = 'none';
        }
        
        // Update button states
        this.validateCurrentStep();
    }

    validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
        if (!currentStepElement) return false;
        
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Special validation for checkboxes
        const checkboxGroups = currentStepElement.querySelectorAll('.checkbox-group');
        checkboxGroups.forEach(group => {
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const hasChecked = Array.from(checkboxes).some(cb => cb.checked);
            
            // If it's a required checkbox group and none are checked
            if (group.closest('.form-group').querySelector('.label-text').textContent.includes('*') && !hasChecked) {
                isValid = false;
            }
        });
        
        // Update next button state
        this.nextBtn.disabled = !isValid;
        this.submitBtn.disabled = !isValid;
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        
        // Remove previous validation classes
        field.classList.remove('form-error', 'form-success');
        
        if (field.hasAttribute('required') && !value) {
            field.classList.add('form-error');
            return false;
        }
        
        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.classList.add('form-error');
                return false;
            }
        }
        
        // Phone validation (basic)
        if (type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                field.classList.add('form-error');
                return false;
            }
        }
        
        if (value) {
            field.classList.add('form-success');
        }
        
        return true;
    }

    handleKeyboard(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            if (this.currentStep < this.totalSteps) {
                this.nextStep();
            } else {
                this.form.submit();
            }
        }
        
        if (e.key === 'ArrowLeft' && e.ctrlKey) {
            e.preventDefault();
            this.previousStep();
        }
        
        if (e.key === 'ArrowRight' && e.ctrlKey) {
            e.preventDefault();
            this.nextStep();
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        this.form.classList.add('form-loading');
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Submitting...</span>';
        
        try {
            // Prepare form data
            const formData = new FormData(this.form);
            console.log('Form data entries:', Array.from(formData.entries()));
            
            // Format the data for better readability
            const formattedData = this.formatFormData(formData);
            console.log('Formatted data:', formattedData);
            
            // Create a new FormData with formatted content
            const emailFormData = new FormData();
            emailFormData.append('access_key', formData.get('access_key'));
            emailFormData.append('subject', 'New SRS Form Submission - Flutter Project');
            emailFormData.append('from_name', formData.get('clientName') || 'SRS Form');
            emailFormData.append('message', formattedData);
            emailFormData.append('redirect', 'true');
            emailFormData.append('redirect_url', '../index.html?submitted=true');
            
            // Submit to Web3Forms (using same approach as main portfolio)
            console.log('Submitting to Web3Forms...');
            console.log('Email form data entries:', Array.from(emailFormData.entries()));
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: emailFormData
            });
            
            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);
            
            if (response.ok) {
                this.showToast('SRS form submitted successfully! I\'ll review your requirements and get back to you soon.', 'success');
                
                // Clear saved data
                this.clearSavedData();
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '../index.html?submitted=true';
                }, 3000);
            } else {
                const errorText = await response.text();
                console.error('Form submission failed:', response.status, errorText);
                throw new Error(`Failed to submit form: ${response.status} - ${errorText}`);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            
            // If it's a CORS error, try native form submission
            if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
                console.log('CORS/fetch error detected, using alternative submission method...');
                
                // Create a temporary form for native submission
                const tempForm = document.createElement('form');
                tempForm.method = 'POST';
                tempForm.action = 'https://api.web3forms.com/submit';
                tempForm.target = '_blank';
                
                // Add all form data
                for (let [key, value] of emailFormData.entries()) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = value;
                    tempForm.appendChild(input);
                }
                
                document.body.appendChild(tempForm);
                tempForm.submit();
                document.body.removeChild(tempForm);
                
                // Show success message immediately
                this.showToast('SRS form submitted successfully! I\'ll review your requirements and get back to you soon.', 'success');
                
                // Clear saved data
                this.clearSavedData();
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = '../index.html?submitted=true';
                }, 3000);
                
                return;
            }
            
            this.showToast(`Submission failed: ${error.message}`, 'error');
        } finally {
            // Reset form state
            this.form.classList.remove('form-loading');
            this.submitBtn.disabled = false;
            this.submitBtn.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">Submit SRS</span>';
        }
    }

    formatFormData(formData) {
        const data = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (key === 'access_key' || key === 'subject' || key === 'from_name' || key === 'redirect' || key === 'redirect_url') {
                continue;
            }
            
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
        
        // Format for email
        let formattedMessage = `
🚀 NEW SRS FORM SUBMISSION - FLUTTER PROJECT

═══════════════════════════════════════════════════════════════

📋 BASIC INFORMATION
═══════════════════════════════════════════════════════════════
Client/Company: ${data.clientName || 'Not provided'}
Email: ${data.clientEmail || 'Not provided'}
Phone: ${data.clientPhone || 'Not provided'}
Project Name: ${data.projectName || 'Not provided'}
Project Type: ${data.projectType || 'Not provided'}

Project Description:
${data.projectDescription || 'Not provided'}

═══════════════════════════════════════════════════════════════

🎯 TARGET AUDIENCE & MARKET
═══════════════════════════════════════════════════════════════
Target Audience:
${data.targetAudience || 'Not provided'}

Primary Markets: ${data.primaryMarkets || 'Not provided'}
Competitors: ${data.competitors || 'Not provided'}

Unique Value Proposition:
${data.uniqueValue || 'Not provided'}

═══════════════════════════════════════════════════════════════

⚡ CORE FEATURES & FUNCTIONALITY
═══════════════════════════════════════════════════════════════
Essential Features: ${Array.isArray(data.features) ? data.features.join(', ') : data.features || 'Not specified'}

Additional Features:
${data.additionalFeatures || 'Not provided'}

User Workflow:
${data.userWorkflow || 'Not provided'}

═══════════════════════════════════════════════════════════════

🎨 DESIGN & USER EXPERIENCE
═══════════════════════════════════════════════════════════════
Design Style: ${data.designStyle || 'Not specified'}
Color Scheme: ${data.colorScheme || 'Not specified'}
Brand Assets: ${data.brandAssets || 'Not specified'}
Reference Apps: ${data.referenceApps || 'Not provided'}

Accessibility Requirements: ${Array.isArray(data.accessibility) ? data.accessibility.join(', ') : data.accessibility || 'Not specified'}

═══════════════════════════════════════════════════════════════

🔧 TECHNICAL REQUIREMENTS
═══════════════════════════════════════════════════════════════
Target Platforms: ${Array.isArray(data.platforms) ? data.platforms.join(', ') : data.platforms || 'Not specified'}
Minimum Android Version: ${data.androidVersion || 'Not specified'}
Minimum iOS Version: ${data.iosVersion || 'Not specified'}
Backend Requirements: ${data.backendRequirements || 'Not specified'}

Database Requirements:
${data.databaseRequirements || 'Not provided'}

Third-Party Integrations: ${Array.isArray(data.integrations) ? data.integrations.join(', ') : data.integrations || 'Not specified'}

═══════════════════════════════════════════════════════════════

⚡ PERFORMANCE & SECURITY
═══════════════════════════════════════════════════════════════
Expected User Base: ${data.expectedUsers || 'Not specified'}
Performance Requirements: ${Array.isArray(data.performance) ? data.performance.join(', ') : data.performance || 'Not specified'}
Security Requirements: ${Array.isArray(data.security) ? data.security.join(', ') : data.security || 'Not specified'}
Compliance Requirements: ${data.complianceRequirements || 'Not specified'}

═══════════════════════════════════════════════════════════════

⏰ TIMELINE & BUDGET
═══════════════════════════════════════════════════════════════
Project Timeline: ${data.projectTimeline || 'Not specified'}
Budget Range: ${data.budgetRange || 'Not specified'}
Development Approach: ${data.developmentPhase || 'Not specified'}
Maintenance & Support: ${data.maintenanceSupport || 'Not specified'}

Additional Services: ${Array.isArray(data.additionalServices) ? data.additionalServices.join(', ') : data.additionalServices || 'Not specified'}

═══════════════════════════════════════════════════════════════

📝 ADDITIONAL INFORMATION
═══════════════════════════════════════════════════════════════
Existing Assets:
${data.existingAssets || 'Not provided'}

Team Structure:
${data.teamStructure || 'Not provided'}

Communication Preferences: ${Array.isArray(data.communication) ? data.communication.join(', ') : data.communication || 'Not specified'}

Success Metrics:
${data.successMetrics || 'Not provided'}

Additional Notes:
${data.additionalNotes || 'Not provided'}

═══════════════════════════════════════════════════════════════

📧 NEXT STEPS
═══════════════════════════════════════════════════════════════
1. Review the requirements thoroughly
2. Prepare a detailed project proposal
3. Schedule a call to discuss technical details
4. Provide timeline and cost estimation
5. Begin development process

═══════════════════════════════════════════════════════════════

Submitted on: ${new Date().toLocaleString()}
Form completed in: ${this.getFormCompletionTime()} steps

═══════════════════════════════════════════════════════════════
        `;
        
        return formattedMessage;
    }

    getFormCompletionTime() {
        return this.currentStep;
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast toast-${type}`;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.display = 'none';
        }, 4000); // Set to 4 seconds
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    autoSave() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'access_key' || key === 'subject' || key === 'from_name' || key === 'redirect' || key === 'redirect_url') {
                continue;
            }
            
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
        
        localStorage.setItem('srs_form_data', JSON.stringify(data));
        localStorage.setItem('srs_form_step', this.currentStep.toString());
    }

    loadSavedData() {
        try {
            const savedData = localStorage.getItem('srs_form_data');
            const savedStep = localStorage.getItem('srs_form_step');
            
            if (savedData && savedStep) {
                const data = JSON.parse(savedData);
                const step = parseInt(savedStep);
                
                // Restore form data
                Object.keys(data).forEach(key => {
                    const element = this.form.querySelector(`[name="${key}"]`);
                    if (element) {
                        if (element.type === 'checkbox') {
                            if (Array.isArray(data[key])) {
                                data[key].forEach(value => {
                                    const checkbox = this.form.querySelector(`[name="${key}"][value="${value}"]`);
                                    if (checkbox) checkbox.checked = true;
                                });
                            } else {
                                const checkbox = this.form.querySelector(`[name="${key}"][value="${data[key]}"]`);
                                if (checkbox) checkbox.checked = true;
                            }
                        } else {
                            element.value = Array.isArray(data[key]) ? data[key].join(', ') : data[key];
                        }
                    }
                });
                
                // Restore step
                if (step > 1 && step <= this.totalSteps) {
                    this.currentStep = step;
                    this.showStep(this.currentStep);
                    this.updateProgress();
                    this.updateNavigation();
                }
                
                this.showToast('Previous form data restored. You can continue where you left off.', 'info');
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }

    clearSavedData() {
        localStorage.removeItem('srs_form_data');
        localStorage.removeItem('srs_form_step');
    }

    setupSubFeatures() {
        // Define comprehensive sub-features for each main feature
        this.subFeatures = {
            auth: {
                title: 'Authentication & Login Options',
                groups: [
                    {
                        title: 'Login Methods',
                        features: [
                            { value: 'email_password', text: 'Email & Password Login' },
                            { value: 'phone_password', text: 'Phone & Password Login' },
                            { value: 'username_password', text: 'Username & Password Login' },
                            { value: 'social_google', text: 'Google Sign-In' },
                            { value: 'social_facebook', text: 'Facebook Login' },
                            { value: 'social_apple', text: 'Apple Sign-In' },
                            { value: 'social_twitter', text: 'Twitter Login' },
                            { value: 'social_linkedin', text: 'LinkedIn Login' }
                        ]
                    },
                    {
                        title: 'Security Features',
                        features: [
                            { value: 'otp_verification', text: 'OTP Verification (SMS/Email)' },
                            { value: 'two_factor_auth', text: 'Two-Factor Authentication (2FA)' },
                            { value: 'biometric_auth', text: 'Biometric Authentication (Fingerprint/Face)' },
                            { value: 'password_reset', text: 'Password Reset via Email/SMS' },
                            { value: 'account_locking', text: 'Account Lockout after Failed Attempts' },
                            { value: 'session_management', text: 'Session Management & Timeout' }
                        ]
                    },
                    {
                        title: 'Registration Options',
                        features: [
                            { value: 'email_registration', text: 'Email Registration' },
                            { value: 'phone_registration', text: 'Phone Number Registration' },
                            { value: 'social_registration', text: 'Social Media Registration' },
                            { value: 'invite_only', text: 'Invite-Only Registration' },
                            { value: 'admin_approval', text: 'Admin Approval Required' }
                        ]
                    }
                ]
            },
            user: {
                title: 'User Profile Management',
                groups: [
                    {
                        title: 'Profile Features',
                        features: [
                            { value: 'profile_creation', text: 'Profile Creation & Setup' },
                            { value: 'profile_editing', text: 'Profile Editing & Updates' },
                            { value: 'profile_picture', text: 'Profile Picture Upload' },
                            { value: 'profile_verification', text: 'Profile Verification (Email/Phone)' },
                            { value: 'profile_privacy', text: 'Privacy Settings' },
                            { value: 'profile_deletion', text: 'Account Deletion' }
                        ]
                    },
                    {
                        title: 'User Data',
                        features: [
                            { value: 'personal_info', text: 'Personal Information (Name, DOB, etc.)' },
                            { value: 'contact_info', text: 'Contact Information' },
                            { value: 'preferences', text: 'User Preferences & Settings' },
                            { value: 'activity_history', text: 'Activity History' },
                            { value: 'achievements', text: 'Achievements & Badges' },
                            { value: 'user_statistics', text: 'User Statistics & Analytics' }
                        ]
                    }
                ]
            },
            search: {
                title: 'Search & Filter System',
                groups: [
                    {
                        title: 'Search Types',
                        features: [
                            { value: 'keyword_search', text: 'Keyword Search' },
                            { value: 'voice_search', text: 'Voice Search' },
                            { value: 'image_search', text: 'Image Search (Visual Search)' },
                            { value: 'barcode_search', text: 'Barcode/QR Code Search' },
                            { value: 'location_search', text: 'Location-based Search' },
                            { value: 'advanced_search', text: 'Advanced Search with Multiple Criteria' }
                        ]
                    },
                    {
                        title: 'Filter Options',
                        features: [
                            { value: 'category_filter', text: 'Category Filtering' },
                            { value: 'price_filter', text: 'Price Range Filter' },
                            { value: 'date_filter', text: 'Date Range Filter' },
                            { value: 'rating_filter', text: 'Rating Filter' },
                            { value: 'location_filter', text: 'Location Filter' },
                            { value: 'custom_filters', text: 'Custom Filter Options' }
                        ]
                    },
                    {
                        title: 'Search Features',
                        features: [
                            { value: 'search_suggestions', text: 'Search Suggestions & Autocomplete' },
                            { value: 'search_history', text: 'Search History' },
                            { value: 'saved_searches', text: 'Saved Searches' },
                            { value: 'search_analytics', text: 'Search Analytics' }
                        ]
                    }
                ]
            },
            payment: {
                title: 'Payment & E-commerce System',
                groups: [
                    {
                        title: 'Payment Methods',
                        features: [
                            { value: 'credit_debit', text: 'Credit/Debit Cards' },
                            { value: 'paypal', text: 'PayPal Integration' },
                            { value: 'apple_pay', text: 'Apple Pay' },
                            { value: 'google_pay', text: 'Google Pay' },
                            { value: 'stripe', text: 'Stripe Payment Gateway' },
                            { value: 'razorpay', text: 'Razorpay Integration' },
                            { value: 'bank_transfer', text: 'Bank Transfer' },
                            { value: 'crypto_payment', text: 'Cryptocurrency Payment' }
                        ]
                    },
                    {
                        title: 'E-commerce Features',
                        features: [
                            { value: 'product_catalog', text: 'Product Catalog Management' },
                            { value: 'shopping_cart', text: 'Shopping Cart Functionality' },
                            { value: 'wishlist', text: 'Wishlist/Favorites' },
                            { value: 'order_management', text: 'Order Management System' },
                            { value: 'inventory_tracking', text: 'Inventory Tracking' },
                            { value: 'coupon_system', text: 'Coupon & Discount System' }
                        ]
                    },
                    {
                        title: 'Payment Security',
                        features: [
                            { value: 'pci_compliance', text: 'PCI DSS Compliance' },
                            { value: 'payment_encryption', text: 'Payment Data Encryption' },
                            { value: 'fraud_detection', text: 'Fraud Detection' },
                            { value: 'refund_system', text: 'Refund Management' }
                        ]
                    }
                ]
            },
            notif: {
                title: 'Push Notifications System',
                groups: [
                    {
                        title: 'Notification Types',
                        features: [
                            { value: 'push_notifications', text: 'Push Notifications' },
                            { value: 'email_notifications', text: 'Email Notifications' },
                            { value: 'sms_notifications', text: 'SMS Notifications' },
                            { value: 'in_app_notifications', text: 'In-App Notifications' },
                            { value: 'browser_notifications', text: 'Browser Notifications' }
                        ]
                    },
                    {
                        title: 'Notification Features',
                        features: [
                            { value: 'personalized_notifications', text: 'Personalized Notifications' },
                            { value: 'scheduled_notifications', text: 'Scheduled Notifications' },
                            { value: 'actionable_notifications', text: 'Actionable Notifications' },
                            { value: 'notification_preferences', text: 'Notification Preferences' },
                            { value: 'notification_analytics', text: 'Notification Analytics' }
                        ]
                    }
                ]
            },
            msg: {
                title: 'In-App Messaging & Chat',
                groups: [
                    {
                        title: 'Chat Types',
                        features: [
                            { value: 'one_on_one_chat', text: 'One-on-One Chat' },
                            { value: 'group_chat', text: 'Group Chat' },
                            { value: 'broadcast_messages', text: 'Broadcast Messages' },
                            { value: 'chat_rooms', text: 'Chat Rooms' },
                            { value: 'live_chat_support', text: 'Live Chat Support' }
                        ]
                    },
                    {
                        title: 'Messaging Features',
                        features: [
                            { value: 'text_messages', text: 'Text Messages' },
                            { value: 'media_sharing', text: 'Media Sharing (Images, Videos)' },
                            { value: 'file_sharing', text: 'File Sharing' },
                            { value: 'voice_messages', text: 'Voice Messages' },
                            { value: 'video_calls', text: 'Video Calls' },
                            { value: 'read_receipts', text: 'Read Receipts' },
                            { value: 'message_status', text: 'Message Status Indicators' }
                        ]
                    },
                    {
                        title: 'Chat Management',
                        features: [
                            { value: 'message_history', text: 'Message History' },
                            { value: 'message_search', text: 'Message Search' },
                            { value: 'message_moderation', text: 'Message Moderation' },
                            { value: 'chat_analytics', text: 'Chat Analytics' }
                        ]
                    }
                ]
            },
            location: {
                title: 'Location & GPS Services',
                groups: [
                    {
                        title: 'Location Features',
                        features: [
                            { value: 'gps_tracking', text: 'GPS Location Tracking' },
                            { value: 'maps_integration', text: 'Maps Integration (Google Maps)' },
                            { value: 'navigation', text: 'Turn-by-Turn Navigation' },
                            { value: 'location_sharing', text: 'Location Sharing' },
                            { value: 'nearby_search', text: 'Nearby Places Search' },
                            { value: 'geofencing', text: 'Geofencing' }
                        ]
                    },
                    {
                        title: 'Location Services',
                        features: [
                            { value: 'location_history', text: 'Location History' },
                            { value: 'location_analytics', text: 'Location Analytics' },
                            { value: 'location_privacy', text: 'Location Privacy Controls' },
                            { value: 'offline_maps', text: 'Offline Maps Support' }
                        ]
                    }
                ]
            },
            media: {
                title: 'Media & Content Handling',
                groups: [
                    {
                        title: 'Media Upload',
                        features: [
                            { value: 'image_upload', text: 'Image Upload' },
                            { value: 'video_upload', text: 'Video Upload' },
                            { value: 'audio_upload', text: 'Audio Upload' },
                            { value: 'document_upload', text: 'Document Upload' },
                            { value: 'camera_integration', text: 'Camera Integration' },
                            { value: 'gallery_access', text: 'Gallery Access' }
                        ]
                    },
                    {
                        title: 'Media Processing',
                        features: [
                            { value: 'image_editing', text: 'Image Editing Tools' },
                            { value: 'video_editing', text: 'Video Editing Tools' },
                            { value: 'media_compression', text: 'Media Compression' },
                            { value: 'media_conversion', text: 'Media Format Conversion' },
                            { value: 'thumbnail_generation', text: 'Thumbnail Generation' }
                        ]
                    },
                    {
                        title: 'Media Features',
                        features: [
                            { value: 'media_streaming', text: 'Media Streaming' },
                            { value: 'media_download', text: 'Media Download' },
                            { value: 'media_sharing', text: 'Media Sharing' },
                            { value: 'media_cloud_storage', text: 'Cloud Storage Integration' }
                        ]
                    }
                ]
            },
            social: {
                title: 'Social Media Integration',
                groups: [
                    {
                        title: 'Social Features',
                        features: [
                            { value: 'social_login', text: 'Social Media Login' },
                            { value: 'social_sharing', text: 'Content Sharing to Social Media' },
                            { value: 'social_feeds', text: 'Social Media Feeds Integration' },
                            { value: 'social_following', text: 'Follow/Unfollow System' },
                            { value: 'social_likes', text: 'Like/Comment System' },
                            { value: 'social_invites', text: 'Social Media Invites' }
                        ]
                    },
                    {
                        title: 'Social Platforms',
                        features: [
                            { value: 'facebook_integration', text: 'Facebook Integration' },
                            { value: 'instagram_integration', text: 'Instagram Integration' },
                            { value: 'twitter_integration', text: 'Twitter Integration' },
                            { value: 'linkedin_integration', text: 'LinkedIn Integration' },
                            { value: 'youtube_integration', text: 'YouTube Integration' },
                            { value: 'tiktok_integration', text: 'TikTok Integration' }
                        ]
                    }
                ]
            },
            analytics: {
                title: 'Analytics & Reporting',
                groups: [
                    {
                        title: 'Analytics Types',
                        features: [
                            { value: 'user_analytics', text: 'User Behavior Analytics' },
                            { value: 'app_analytics', text: 'App Performance Analytics' },
                            { value: 'business_analytics', text: 'Business Metrics Analytics' },
                            { value: 'crash_analytics', text: 'Crash Reporting & Analytics' },
                            { value: 'custom_analytics', text: 'Custom Event Tracking' }
                        ]
                    },
                    {
                        title: 'Reporting Features',
                        features: [
                            { value: 'real_time_dashboard', text: 'Real-time Dashboard' },
                            { value: 'scheduled_reports', text: 'Scheduled Reports' },
                            { value: 'export_reports', text: 'Export Reports (PDF/Excel)' },
                            { value: 'analytics_api', text: 'Analytics API Access' }
                        ]
                    }
                ]
            },
            offline: {
                title: 'Offline Functionality',
                groups: [
                    {
                        title: 'Offline Features',
                        features: [
                            { value: 'data_caching', text: 'Data Caching' },
                            { value: 'offline_mode', text: 'Offline Mode Support' },
                            { value: 'sync_when_online', text: 'Sync When Online' },
                            { value: 'offline_storage', text: 'Local Data Storage' },
                            { value: 'offline_notifications', text: 'Offline Notifications' }
                        ]
                    }
                ]
            },
            admin: {
                title: 'Admin Panel & Dashboard',
                groups: [
                    {
                        title: 'Admin Features',
                        features: [
                            { value: 'user_management', text: 'User Management' },
                            { value: 'content_management', text: 'Content Management' },
                            { value: 'analytics_dashboard', text: 'Analytics Dashboard' },
                            { value: 'system_settings', text: 'System Settings' },
                            { value: 'moderation_tools', text: 'Moderation Tools' },
                            { value: 'admin_notifications', text: 'Admin Notifications' }
                        ]
                    },
                    {
                        title: 'Admin Controls',
                        features: [
                            { value: 'role_based_access', text: 'Role-based Access Control' },
                            { value: 'admin_audit_log', text: 'Admin Audit Log' },
                            { value: 'backup_restore', text: 'Backup & Restore' },
                            { value: 'admin_api', text: 'Admin API Access' }
                        ]
                    }
                ]
            }
        };

        // Add event listeners to main feature checkboxes
        document.querySelectorAll('input[name="main_features[]"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleMainFeatureChange());
        });
    }

    handleMainFeatureChange() {
        const checkedFeatures = Array.from(document.querySelectorAll('input[name="main_features[]"]:checked'))
            .map(cb => cb.dataset.subFeatures);
        
        const container = document.getElementById('subFeaturesContainer');
        const content = document.getElementById('subFeaturesContent');
        
        if (checkedFeatures.length === 0) {
            container.style.display = 'none';
            return;
        }
        
        // Show container
        container.style.display = 'block';
        
        // Generate sub-features HTML
        let html = '';
        checkedFeatures.forEach(featureKey => {
            const feature = this.subFeatures[featureKey];
            if (feature) {
                html += `<div class="sub-feature-group">`;
                html += `<h5>${feature.title}</h5>`;
                
                feature.groups.forEach(group => {
                    html += `<div class="sub-feature-checkboxes">`;
                    group.features.forEach(subFeature => {
                        html += `
                            <label class="checkbox-item">
                                <input type="checkbox" name="sub_features[]" value="${subFeature.value}">
                                <span class="checkmark"></span>
                                <span class="checkbox-text">${subFeature.text}</span>
                            </label>
                        `;
                    });
                    html += `</div>`;
                });
                
                html += `</div>`;
            }
        });
        
        content.innerHTML = html;
        
        // Add event listeners to new checkboxes
        content.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.validateCurrentStep());
        });
    }

    previewDocuments() {
        console.log('=== REDIRECTING TO SRS PREVIEW ===');
        
        if (!this.validateCurrentStep()) {
            this.showToast('Please complete all required fields before previewing documents.', 'error');
            return;
        }

        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = this.formatFormDataForGeneration(formData);

            console.log('Form data prepared for preview:', data);

            // Always use localStorage method for reliability
            const dataKey = 'srs_preview_data_' + Date.now();
            localStorage.setItem(dataKey, JSON.stringify(data));
            console.log('Data stored in localStorage with key:', dataKey);

            // Redirect to preview page with localStorage key
            const previewUrl = `srs-preview.html?key=${dataKey}`;
            console.log('Redirecting to:', previewUrl);
            
            this.showToast('Redirecting to SRS preview...', 'info');
            
            // Redirect immediately
            window.location.href = previewUrl;
            
        } catch (error) {
            console.error('Error preparing preview:', error);
            this.showToast(`Preview error: ${error.message}`, 'error');
        }
    }

    generateSimpleSRSDocument(data) {
        console.log('=== GENERATING SIMPLE SRS DOCUMENT ===');
        console.log('Data received:', data);
        console.log('SRS content element:', this.srsContent);
        
        let content = '<h1>Software Requirements Specification</h1>';
        content += '<h2>1. Introduction</h2>';
        content += '<h3>1.1 Project Title</h3>';
        content += `<p><strong>${data.projectName || 'Not specified'}</strong></p>`;
        content += '<h3>1.2 Document Version</h3>';
        content += `<p>Version 1.0 - ${new Date().toLocaleDateString()}</p>`;
        content += '<h3>1.3 Purpose</h3>';
        content += `<p>This document specifies the requirements for the development of <strong>${data.projectName || 'the application'}</strong>, a ${data.projectType || 'mobile application'} designed to ${data.projectDescription || 'meet specific business needs'}.</p>`;
        
        content += '<h2>2. Overall Description</h2>';
        content += '<h3>2.1 Product Perspective</h3>';
        content += `<p>This is a ${data.projectType || 'new application'} that will serve ${data.targetAudience || 'target users'} in the ${data.primaryMarkets || 'target market'}.</p>`;
        
        content += '<h3>2.2 Product Functions</h3>';
        content += '<ul>';
        if (data.main_features && data.main_features.length > 0) {
            data.main_features.forEach(feature => {
                content += `<li><strong>${this.getFeatureDisplayName(feature)}</strong></li>`;
            });
        } else {
            content += '<li>Features to be determined during detailed planning</li>';
        }
        content += '</ul>';
        
        content += '<h2>3. Specific Requirements</h2>';
        content += '<h3>3.1 Functional Requirements</h3>';
        content += '<p>The application shall provide the following functionality:</p>';
        content += '<ul>';
        if (data.main_features && data.main_features.length > 0) {
            data.main_features.forEach(feature => {
                content += `<li><strong>${this.getFeatureDisplayName(feature)}:</strong> The system shall allow users to ${this.getFeatureDescription(feature)}</li>`;
            });
        }
        content += '</ul>';
        
        content += '<h3>3.2 Non-Functional Requirements</h3>';
        content += '<h4>3.2.1 Performance Requirements</h4>';
        content += '<ul><li>App startup time: Less than 3 seconds</li><li>Screen transition: Less than 1 second</li></ul>';
        
        content += '<h4>3.2.2 Security Requirements</h4>';
        content += '<ul><li>All data transmission must be encrypted</li><li>User authentication required</li></ul>';
        
        console.log('SRS content generated, length:', content.length);
        
        // Set content directly
        this.srsContent.innerHTML = content;
        
        // Force visibility
        this.srsContent.style.display = 'block';
        this.srsContent.style.visibility = 'visible';
        this.srsContent.style.opacity = '1';
        
        console.log('SRS content set successfully, final length:', this.srsContent.innerHTML.length);
        console.log('=== SIMPLE SRS DOCUMENT GENERATION COMPLETE ===');
    }

    generateSimpleContractDocument(data) {
        console.log('=== GENERATING SIMPLE CONTRACT DOCUMENT ===');
        
        let content = '<h1>PROJECT DEVELOPMENT AGREEMENT</h1>';
        content += `<p><strong>THIS AGREEMENT</strong> is made on ${new Date().toLocaleDateString()}, between:</p>`;
        content += '<p><strong>Developer:</strong> Suresh Yadav (Flutter Developer)</p>';
        content += `<p><strong>Client:</strong> ${data.clientName || 'Client Name'}</p>`;
        
        content += '<h2>1. Scope of Work</h2>';
        content += `<p>Development of <strong>${data.projectName || 'the application'}</strong>, a ${data.projectType || 'mobile application'} with the following features:</p>`;
        content += '<ul>';
        if (data.main_features && data.main_features.length > 0) {
            data.main_features.forEach(feature => {
                content += `<li>${this.getFeatureDisplayName(feature)}</li>`;
            });
        }
        content += '</ul>';
        
        content += '<h2>2. Project Phases & Deliverables</h2>';
        content += '<ul>';
        content += '<li><strong>Phase 1:</strong> UI/UX Design and Wireframes</li>';
        content += '<li><strong>Phase 2:</strong> MVP Development</li>';
        content += '<li><strong>Phase 3:</strong> Final Release and Testing</li>';
        content += '</ul>';
        
        content += '<h2>3. Timeline</h2>';
        content += `<p><strong>Estimated Duration:</strong> ${data.projectTimeline || 'To be determined'}</p>`;
        content += '<p><strong>Start Date:</strong> Upon agreement signing</p>';
        
        content += '<h2>4. Payment Terms</h2>';
        content += `<p><strong>Total Cost:</strong> ${data.budgetRange || 'To be discussed'}</p>`;
        content += '<ul>';
        content += '<li>30% on project initiation</li>';
        content += '<li>40% after MVP completion</li>';
        content += '<li>30% on final delivery</li>';
        content += '</ul>';
        
        content += '<h2>5. Intellectual Property</h2>';
        content += '<p>Client owns final code, assets, and designs after full payment. Developer may reuse open-source components.</p>';
        
        content += '<h2>6. Warranty & Support</h2>';
        content += '<p>3 months bug-fixing warranty post-deployment. Optional maintenance can be discussed separately.</p>';
        
        console.log('Contract content generated, length:', content.length);
        
        // Set content directly
        this.contractContent.innerHTML = content;
        
        // Force visibility
        this.contractContent.style.display = 'block';
        this.contractContent.style.visibility = 'visible';
        this.contractContent.style.opacity = '1';
        
        console.log('Contract content set successfully, final length:', this.contractContent.innerHTML.length);
        console.log('=== SIMPLE CONTRACT DOCUMENT GENERATION COMPLETE ===');
    }

    generateSimpleSummaryDocument(data) {
        console.log('=== GENERATING SIMPLE SUMMARY DOCUMENT ===');
        
        let content = '<h1>Project Summary & Next Steps</h1>';
        
        content += '<h2>Project Overview</h2>';
        content += '<div style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">';
        content += `<p><strong>Project Name:</strong> ${data.projectName || 'Not specified'}</p>`;
        content += `<p><strong>Client:</strong> ${data.clientName || 'Not specified'}</p>`;
        content += `<p><strong>Project Type:</strong> ${data.projectType || 'Not specified'}</p>`;
        content += `<p><strong>Target Platforms:</strong> ${Array.isArray(data.platforms) ? data.platforms.join(', ') : data.platforms || 'Not specified'}</p>`;
        content += '</div>';
        
        content += '<h2>Key Features Summary</h2>';
        content += '<ul>';
        if (data.main_features && data.main_features.length > 0) {
            data.main_features.forEach(feature => {
                content += `<li><strong>${this.getFeatureDisplayName(feature)}</strong></li>`;
            });
        } else {
            content += '<li>Features to be determined during detailed planning</li>';
        }
        content += '</ul>';
        
        content += '<h2>Technical Requirements</h2>';
        content += '<ul>';
        content += `<li><strong>Backend:</strong> ${data.backendRequirements || 'To be determined'}</li>`;
        content += `<li><strong>Integrations:</strong> ${Array.isArray(data.integrations) ? data.integrations.join(', ') : data.integrations || 'None specified'}</li>`;
        content += `<li><strong>Security:</strong> ${Array.isArray(data.security) ? data.security.join(', ') : data.security || 'Standard security measures'}</li>`;
        content += '</ul>';
        
        content += '<h2>Timeline & Budget</h2>';
        content += '<ul>';
        content += `<li><strong>Timeline:</strong> ${data.projectTimeline || 'To be determined'}</li>`;
        content += `<li><strong>Budget Range:</strong> ${data.budgetRange || 'To be discussed'}</li>`;
        content += `<li><strong>Development Approach:</strong> ${data.developmentPhase || 'To be determined'}</li>`;
        content += '</ul>';
        
        content += '<h2>Next Steps</h2>';
        content += '<ol>';
        content += '<li><strong>Review Documents:</strong> Carefully review the SRS and contract</li>';
        content += '<li><strong>Sign Contract:</strong> Sign the project agreement to proceed</li>';
        content += '<li><strong>Initial Payment:</strong> Make the initial payment (30%)</li>';
        content += '<li><strong>Project Kickoff:</strong> Schedule project kickoff meeting</li>';
        content += '<li><strong>Development Begins:</strong> Start the development process</li>';
        content += '</ol>';
        
        content += '<h2>Contact Information</h2>';
        content += '<div style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem;">';
        content += '<p><strong>Developer:</strong> Suresh Yadav</p>';
        content += '<p><strong>Email:</strong> Available through contact form</p>';
        content += '<p><strong>Specialization:</strong> Flutter Development, Full-Stack Development</p>';
        content += '</div>';
        
        console.log('Summary content generated, length:', content.length);
        
        // Set content directly
        this.summaryContent.innerHTML = content;
        
        // Force visibility
        this.summaryContent.style.display = 'block';
        this.summaryContent.style.visibility = 'visible';
        this.summaryContent.style.opacity = '1';
        
        console.log('Summary content set successfully, final length:', this.summaryContent.innerHTML.length);
        console.log('=== SIMPLE SUMMARY DOCUMENT GENERATION COMPLETE ===');
    }

    getFeatureDisplayName(feature) {
        const featureMap = {
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
        return featureMap[feature] || feature;
    }

    getFeatureDescription(feature) {
        const descriptionMap = {
            'authentication': 'authenticate and manage user accounts',
            'user_management': 'manage user profiles and preferences',
            'search_filter': 'search and filter content effectively',
            'payment_system': 'process payments and manage transactions',
            'notifications': 'receive push notifications',
            'messaging': 'communicate with other users',
            'location_services': 'access location-based features',
            'media_handling': 'upload and manage media files',
            'social_integration': 'integrate with social media platforms',
            'analytics': 'view usage analytics and reports',
            'offline_mode': 'use core features without internet',
            'admin_panel': 'access administrative functions'
        };
        return descriptionMap[feature] || 'use this feature';
    }

    generateDocuments() {
        if (!this.validateCurrentStep()) {
            this.showToast('Please complete all required fields before generating documents.', 'error');
            return;
        }

        // Show loading state
        this.generateSRSBtn.disabled = true;
        this.generateSRSBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Generating...</span>';

        try {
            // Get form data
            const formData = new FormData(this.form);
            const data = this.formatFormDataForGeneration(formData);

            console.log('Form data:', data); // Debug log
            console.log('Documents section exists:', !!this.documentsSection); // Debug log

            // Check if required elements exist
            if (!this.documentsSection) {
                throw new Error('Documents section not found in DOM');
            }

            // Generate documents one by one with individual error handling
            try {
                this.generateSRSDocument(data);
                console.log('SRS document generated successfully');
            } catch (srsError) {
                console.error('Error generating SRS:', srsError);
                throw new Error('Failed to generate SRS document: ' + srsError.message);
            }

            try {
                this.generateContractDocument(data);
                console.log('Contract document generated successfully');
            } catch (contractError) {
                console.error('Error generating Contract:', contractError);
                throw new Error('Failed to generate Contract document: ' + contractError.message);
            }

            try {
                this.generateSummaryDocument(data);
                console.log('Summary document generated successfully');
            } catch (summaryError) {
                console.error('Error generating Summary:', summaryError);
                throw new Error('Failed to generate Summary document: ' + summaryError.message);
            }

            // Show documents section
            console.log('Showing documents section...');
            this.documentsSection.style.display = 'block';
            this.documentsSection.scrollIntoView({ behavior: 'smooth' });
            
            // Force show the first tab content
            console.log('Forcing first tab to be active...');
            this.switchTab('srs');

            // Update button
            this.generateSRSBtn.disabled = false;
            this.generateSRSBtn.innerHTML = '<span class="btn-icon">✓</span><span class="btn-text">Documents Generated</span>';
            this.submitBtn.style.display = 'flex';

            this.showToast('Documents generated successfully! Review and proceed with submission.', 'success');
        } catch (error) {
            console.error('Error generating documents:', error);
            
            // Reset button on error
            this.generateSRSBtn.disabled = false;
            this.generateSRSBtn.innerHTML = '<span class="btn-icon">📄</span><span class="btn-text">Generate SRS</span>';
            
            this.showToast(`Error: ${error.message}`, 'error');
        }
    }

    formatFormDataForGeneration(formData) {
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'access_key' || key === 'subject' || key === 'from_name' || key === 'redirect' || key === 'redirect_url') {
                continue;
            }
            
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

    generateSRSDocument(data) {
        console.log('Generating SRS document with data:', data);
        console.log('SRS content element:', this.srsContent);
        
        const srsContent = `
            <h1>Software Requirements Specification</h1>
            
            <h2>1. Introduction</h2>
            
            <h3>1.1 Project Title</h3>
            <p><strong>${data.projectName || 'Not specified'}</strong></p>
            
            <h3>1.2 Document Version</h3>
            <p>Version 1.0 - ${new Date().toLocaleDateString()}</p>
            
            <h3>1.3 Purpose</h3>
            <p>This document specifies the requirements for the development of <strong>${data.projectName || 'the application'}</strong>, a ${data.projectType || 'mobile application'} designed to ${data.projectDescription || 'meet specific business needs'}.</p>
            
            <h3>1.4 Scope</h3>
            <p>The application will provide the following main functions:</p>
            <ul>
                ${this.generateFeatureList(data)}
            </ul>
            
            <h2>2. Overall Description</h2>
            
            <h3>2.1 Product Perspective</h3>
            <p>This is a ${data.projectType || 'new application'} that will serve ${data.targetAudience || 'target users'} in the ${data.primaryMarkets || 'target market'}.</p>
            
            <h3>2.2 Product Functions</h3>
            <ul>
                ${this.generateFeatureList(data)}
            </ul>
            
            <h3>2.3 User Classes and Characteristics</h3>
            <p><strong>Primary Users:</strong> ${data.targetAudience || 'End users'}</p>
            ${data.adminPanel ? '<p><strong>Administrators:</strong> System administrators for backend management</p>' : ''}
            
            <h3>2.4 Operating Environment</h3>
            <p><strong>Target Platforms:</strong> ${Array.isArray(data.platforms) ? data.platforms.join(', ') : data.platforms || 'Not specified'}</p>
            <p><strong>Minimum Android Version:</strong> ${data.androidVersion || 'Not specified'}</p>
            <p><strong>Minimum iOS Version:</strong> ${data.iosVersion || 'Not specified'}</p>
            
            <h3>2.5 Design and Implementation Constraints</h3>
            <ul>
                <li>Built using Flutter framework for cross-platform compatibility</li>
                <li>Must comply with platform-specific guidelines (Material Design/iOS HIG)</li>
                <li>Backend requirements: ${data.backendRequirements || 'To be determined'}</li>
            </ul>
            
            <h2>3. Specific Requirements</h2>
            
            <h3>3.1 Functional Requirements</h3>
            ${this.generateFunctionalRequirements(data)}
            
            <h3>3.2 Non-Functional Requirements</h3>
            <h4>Performance Requirements</h4>
            <ul>
                ${this.generatePerformanceRequirements(data.performance)}
            </ul>
            
            <h4>Security Requirements</h4>
            <ul>
                ${this.generateSecurityRequirements(data.security)}
            </ul>
            
            <h3>3.3 External Interfaces</h3>
            <h4>APIs and Integrations</h4>
            <ul>
                ${this.generateIntegrationList(data.integrations)}
            </ul>
            
            <h3>3.4 Data Requirements</h3>
            <p>${data.databaseRequirements || 'Data requirements to be specified during detailed design phase.'}</p>
            
            <h2>4. Appendices</h2>
            
            <h3>4.1 Glossary</h3>
            <ul>
                <li><strong>MVP:</strong> Minimum Viable Product</li>
                <li><strong>API:</strong> Application Programming Interface</li>
                <li><strong>UI/UX:</strong> User Interface/User Experience</li>
            </ul>
            
            <h3>4.2 References</h3>
            <ul>
                <li>Flutter Documentation</li>
                <li>Platform-specific design guidelines</li>
                <li>Security best practices</li>
            </ul>
        `;
        
        console.log('Setting SRS content to element:', this.srsContent);
        console.log('SRS content length:', srsContent.length);
        this.srsContent.innerHTML = srsContent;
        console.log('SRS content set successfully');
        
        // Force visibility check
        setTimeout(() => {
            console.log('SRS content after timeout:', this.srsContent.innerHTML.length);
            console.log('SRS content element:', this.srsContent);
            console.log('SRS content parent:', this.srsContent.parentElement);
            
            if (this.srsContent.innerHTML.length < 100) {
                console.error('SRS content seems too short, regenerating...');
                this.srsContent.innerHTML = '<p>Error: Content not generated properly. Please try again.</p>';
            } else {
                console.log('SRS content generated successfully, length:', this.srsContent.innerHTML.length);
                // Force display
                this.srsContent.style.display = 'block';
                this.srsContent.style.visibility = 'visible';
                this.srsContent.style.opacity = '1';
            }
        }, 100);
    }

    generateContractDocument(data) {
        const contractContent = `
            <h1>PROJECT DEVELOPMENT AGREEMENT</h1>
            
            <p><strong>THIS AGREEMENT</strong> is made on ${new Date().toLocaleDateString()}, between:</p>
            
            <p><strong>Developer:</strong> Suresh Yadav (Flutter Developer)<br>
            <strong>Client:</strong> ${data.clientName || '[Client Name]'}</p>
            
            <h2>1. Scope of Work</h2>
            <p>Based on the attached Software Requirements Specification (SRS), the Developer agrees to develop:</p>
            <ul>
                <li><strong>Project Name:</strong> ${data.projectName || '[Project Name]'}</li>
                <li><strong>Platforms:</strong> ${Array.isArray(data.platforms) ? data.platforms.join(', ') : data.platforms || 'To be determined'}</li>
                <li><strong>Key Features:</strong> As specified in the SRS document</li>
                <li><strong>Design Style:</strong> ${data.designStyle || 'To be determined'}</li>
            </ul>
            
            <h2>2. Project Phases & Deliverables</h2>
            <ol>
                <li><strong>Phase 1 - Planning & Design:</strong> Wireframes, UI/UX design, technical architecture</li>
                <li><strong>Phase 2 - Development:</strong> Core functionality implementation</li>
                <li><strong>Phase 3 - Testing & Deployment:</strong> Quality assurance, testing, and app store deployment</li>
            </ol>
            
            <h2>3. Timeline</h2>
            <ul>
                <li><strong>Estimated Start:</strong> Upon contract signing and initial payment</li>
                <li><strong>Estimated Completion:</strong> ${this.calculateTimeline(data.projectTimeline)}</li>
                <li><strong>Note:</strong> Delays due to client unavailability or change requests will extend the timeline accordingly</li>
            </ul>
            
            <h2>4. Payment Terms</h2>
            <ul>
                <li><strong>Total Project Cost:</strong> To be quoted based on final requirements</li>
                <li><strong>Payment Structure:</strong>
                    <ul>
                        <li>30% upon contract signing</li>
                        <li>40% after MVP completion</li>
                        <li>30% upon final delivery and acceptance</li>
                    </ul>
                </li>
                <li><strong>Payment Method:</strong> Bank transfer or digital payment</li>
            </ul>
            
            <h2>5. Change Requests</h2>
            <ul>
                <li>Minor UI/UX adjustments are included in the base price</li>
                <li>New features or significant scope changes will be quoted separately</li>
                <li>All change requests must be approved in writing</li>
            </ul>
            
            <h2>6. Intellectual Property</h2>
            <ul>
                <li>Client owns the final application code, assets, and designs upon full payment</li>
                <li>Developer retains rights to reusable components and libraries</li>
                <li>Third-party libraries remain under their respective licenses</li>
            </ul>
            
            <h2>7. Confidentiality</h2>
            <p>Both parties agree to maintain confidentiality of project details, business information, and proprietary data shared during development.</p>
            
            <h2>8. Termination</h2>
            <ul>
                <li>Either party may terminate this agreement with 7 days written notice</li>
                <li>Work completed up to termination date must be paid for</li>
                <li>Client receives all completed work upon payment</li>
            </ul>
            
            <h2>9. Warranty & Support</h2>
            <ul>
                <li>3 months bug-fixing warranty post-deployment</li>
                <li>Support for critical bugs during warranty period</li>
                <li>Additional maintenance and updates can be discussed separately</li>
            </ul>
            
            <h2>10. Governing Law</h2>
            <p>This contract is governed by the laws of Nepal and any disputes will be resolved through mutual discussion.</p>
            
            <h2>11. Signatures</h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
                <div>
                    <p><strong>Developer:</strong></p>
                    <p>Name: Suresh Yadav</p>
                    <p>Signature: _________________</p>
                    <p>Date: _________________</p>
                </div>
                <div>
                    <p><strong>Client:</strong></p>
                    <p>Name: ${data.clientName || '[Client Name]'}</p>
                    <p>Signature: _________________</p>
                    <p>Date: _________________</p>
                </div>
            </div>
        `;
        
        this.contractContent.innerHTML = contractContent;
        console.log('Contract content set successfully, length:', contractContent.length);
    }

    generateSummaryDocument(data) {
        const summaryContent = `
            <h1>Project Summary & Next Steps</h1>
            
            <h2>Project Overview</h2>
            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <p><strong>Project Name:</strong> ${data.projectName || 'Not specified'}</p>
                <p><strong>Client:</strong> ${data.clientName || 'Not specified'}</p>
                <p><strong>Project Type:</strong> ${data.projectType || 'Not specified'}</p>
                <p><strong>Target Platforms:</strong> ${Array.isArray(data.platforms) ? data.platforms.join(', ') : data.platforms || 'Not specified'}</p>
            </div>
            
            <h2>Key Features Summary</h2>
            <ul>
                ${this.generateFeatureList(data)}
            </ul>
            
            <h2>Technical Requirements</h2>
            <ul>
                <li><strong>Backend:</strong> ${data.backendRequirements || 'To be determined'}</li>
                <li><strong>Integrations:</strong> ${Array.isArray(data.integrations) ? data.integrations.join(', ') : data.integrations || 'None specified'}</li>
                <li><strong>Security:</strong> ${Array.isArray(data.security) ? data.security.join(', ') : data.security || 'Standard security measures'}</li>
            </ul>
            
            <h2>Timeline & Budget</h2>
            <ul>
                <li><strong>Timeline:</strong> ${data.projectTimeline || 'To be determined'}</li>
                <li><strong>Budget Range:</strong> ${data.budgetRange || 'To be discussed'}</li>
                <li><strong>Development Approach:</strong> ${data.developmentPhase || 'To be determined'}</li>
            </ul>
            
            <h2>Next Steps</h2>
            <ol>
                <li><strong>Review Documents:</strong> Carefully review the SRS and contract</li>
                <li><strong>Sign Contract:</strong> Sign the project agreement to proceed</li>
                <li><strong>Initial Payment:</strong> Make the initial payment (30%)</li>
                <li><strong>Project Kickoff:</strong> Schedule project kickoff meeting</li>
                <li><strong>Development Begins:</strong> Start the development process</li>
            </ol>
            
            <h2>Contact Information</h2>
            <div style="background: var(--bg-secondary); padding: 1rem; border-radius: 0.5rem;">
                <p><strong>Developer:</strong> Suresh Yadav</p>
                <p><strong>Email:</strong> Available through contact form</p>
                <p><strong>Specialization:</strong> Flutter Development, Full-Stack Development</p>
            </div>
        `;
        
        this.summaryContent.innerHTML = summaryContent;
        console.log('Summary content set successfully, length:', summaryContent.length);
    }

    generateFeatureList(data) {
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
                // This is a simplified mapping - in a real implementation, you'd have a proper mapping
                return this.isSubFeatureOfMain(subFeature, mainFeature);
            });
            
            if (relatedSubFeatures.length > 0) {
                html += '<ul>';
                relatedSubFeatures.forEach(subFeature => {
                    html += `<li>${this.getSubFeatureName(subFeature)}</li>`;
                });
                html += '</ul>';
            }
            
            html += '</li>';
        });
        
        return html;
    }

    isSubFeatureOfMain(subFeature, mainFeature) {
        // Map sub-features to their main features
        const subToMainMap = {
            // Authentication sub-features
            'email_password': 'authentication', 'phone_password': 'authentication', 'username_password': 'authentication',
            'social_google': 'authentication', 'social_facebook': 'authentication', 'social_apple': 'authentication',
            'otp_verification': 'authentication', 'two_factor_auth': 'authentication', 'biometric_auth': 'authentication',
            // User management sub-features
            'profile_creation': 'user_management', 'profile_editing': 'user_management', 'profile_picture': 'user_management',
            'personal_info': 'user_management', 'contact_info': 'user_management', 'preferences': 'user_management',
            // Search sub-features
            'keyword_search': 'search_filter', 'voice_search': 'search_filter', 'image_search': 'search_filter',
            'category_filter': 'search_filter', 'price_filter': 'search_filter', 'date_filter': 'search_filter',
            // Payment sub-features
            'credit_debit': 'payment_system', 'paypal': 'payment_system', 'apple_pay': 'payment_system',
            'product_catalog': 'payment_system', 'shopping_cart': 'payment_system', 'order_management': 'payment_system',
            // Notification sub-features
            'push_notifications': 'notifications', 'email_notifications': 'notifications', 'sms_notifications': 'notifications',
            'personalized_notifications': 'notifications', 'scheduled_notifications': 'notifications',
            // Messaging sub-features
            'one_on_one_chat': 'messaging', 'group_chat': 'messaging', 'text_messages': 'messaging',
            'media_sharing': 'messaging', 'voice_messages': 'messaging', 'video_calls': 'messaging',
            // Location sub-features
            'gps_tracking': 'location_services', 'maps_integration': 'location_services', 'navigation': 'location_services',
            'location_sharing': 'location_services', 'nearby_search': 'location_services', 'geofencing': 'location_services',
            // Media sub-features
            'image_upload': 'media_handling', 'video_upload': 'media_handling', 'audio_upload': 'media_handling',
            'camera_integration': 'media_handling', 'gallery_access': 'media_handling', 'image_editing': 'media_handling',
            // Social sub-features
            'social_login': 'social_integration', 'social_sharing': 'social_integration', 'social_feeds': 'social_integration',
            'facebook_integration': 'social_integration', 'instagram_integration': 'social_integration',
            // Analytics sub-features
            'user_analytics': 'analytics', 'app_analytics': 'analytics', 'business_analytics': 'analytics',
            'crash_analytics': 'analytics', 'real_time_dashboard': 'analytics', 'scheduled_reports': 'analytics',
            // Offline sub-features
            'data_caching': 'offline_mode', 'offline_mode': 'offline_mode', 'sync_when_online': 'offline_mode',
            'offline_storage': 'offline_mode', 'offline_notifications': 'offline_mode',
            // Admin sub-features
            'user_management': 'admin_panel', 'content_management': 'admin_panel', 'analytics_dashboard': 'admin_panel',
            'system_settings': 'admin_panel', 'moderation_tools': 'admin_panel', 'role_based_access': 'admin_panel'
        };
        
        return subToMainMap[subFeature] === mainFeature;
    }

    getSubFeatureName(subFeature) {
        const subFeatureMap = {
            // Authentication
            'email_password': 'Email & Password Login',
            'phone_password': 'Phone & Password Login',
            'username_password': 'Username & Password Login',
            'social_google': 'Google Sign-In',
            'social_facebook': 'Facebook Login',
            'social_apple': 'Apple Sign-In',
            'social_twitter': 'Twitter Login',
            'social_linkedin': 'LinkedIn Login',
            'otp_verification': 'OTP Verification (SMS/Email)',
            'two_factor_auth': 'Two-Factor Authentication (2FA)',
            'biometric_auth': 'Biometric Authentication',
            'password_reset': 'Password Reset',
            'account_locking': 'Account Lockout',
            'session_management': 'Session Management',
            'email_registration': 'Email Registration',
            'phone_registration': 'Phone Registration',
            'social_registration': 'Social Registration',
            'invite_only': 'Invite-Only Registration',
            'admin_approval': 'Admin Approval Required',
            
            // User Management
            'profile_creation': 'Profile Creation & Setup',
            'profile_editing': 'Profile Editing',
            'profile_picture': 'Profile Picture Upload',
            'profile_verification': 'Profile Verification',
            'profile_privacy': 'Privacy Settings',
            'profile_deletion': 'Account Deletion',
            'personal_info': 'Personal Information',
            'contact_info': 'Contact Information',
            'preferences': 'User Preferences',
            'activity_history': 'Activity History',
            'achievements': 'Achievements & Badges',
            'user_statistics': 'User Statistics',
            
            // Search & Filter
            'keyword_search': 'Keyword Search',
            'voice_search': 'Voice Search',
            'image_search': 'Image Search',
            'barcode_search': 'Barcode/QR Search',
            'location_search': 'Location-based Search',
            'advanced_search': 'Advanced Search',
            'category_filter': 'Category Filtering',
            'price_filter': 'Price Range Filter',
            'date_filter': 'Date Range Filter',
            'rating_filter': 'Rating Filter',
            'location_filter': 'Location Filter',
            'custom_filters': 'Custom Filters',
            'search_suggestions': 'Search Suggestions',
            'search_history': 'Search History',
            'saved_searches': 'Saved Searches',
            'search_analytics': 'Search Analytics',
            
            // Payment & E-commerce
            'credit_debit': 'Credit/Debit Cards',
            'paypal': 'PayPal Integration',
            'apple_pay': 'Apple Pay',
            'google_pay': 'Google Pay',
            'stripe': 'Stripe Gateway',
            'razorpay': 'Razorpay Integration',
            'bank_transfer': 'Bank Transfer',
            'crypto_payment': 'Cryptocurrency Payment',
            'product_catalog': 'Product Catalog',
            'shopping_cart': 'Shopping Cart',
            'wishlist': 'Wishlist/Favorites',
            'order_management': 'Order Management',
            'inventory_tracking': 'Inventory Tracking',
            'coupon_system': 'Coupon System',
            'pci_compliance': 'PCI Compliance',
            'payment_encryption': 'Payment Encryption',
            'fraud_detection': 'Fraud Detection',
            'refund_system': 'Refund Management',
            
            // Notifications
            'push_notifications': 'Push Notifications',
            'email_notifications': 'Email Notifications',
            'sms_notifications': 'SMS Notifications',
            'in_app_notifications': 'In-App Notifications',
            'browser_notifications': 'Browser Notifications',
            'personalized_notifications': 'Personalized Notifications',
            'scheduled_notifications': 'Scheduled Notifications',
            'actionable_notifications': 'Actionable Notifications',
            'notification_preferences': 'Notification Preferences',
            'notification_analytics': 'Notification Analytics',
            
            // Messaging
            'one_on_one_chat': 'One-on-One Chat',
            'group_chat': 'Group Chat',
            'broadcast_messages': 'Broadcast Messages',
            'chat_rooms': 'Chat Rooms',
            'live_chat_support': 'Live Chat Support',
            'text_messages': 'Text Messages',
            'media_sharing': 'Media Sharing',
            'file_sharing': 'File Sharing',
            'voice_messages': 'Voice Messages',
            'video_calls': 'Video Calls',
            'read_receipts': 'Read Receipts',
            'message_status': 'Message Status',
            'message_history': 'Message History',
            'message_search': 'Message Search',
            'message_moderation': 'Message Moderation',
            'chat_analytics': 'Chat Analytics',
            
            // Location
            'gps_tracking': 'GPS Tracking',
            'maps_integration': 'Maps Integration',
            'navigation': 'Turn-by-Turn Navigation',
            'location_sharing': 'Location Sharing',
            'nearby_search': 'Nearby Search',
            'geofencing': 'Geofencing',
            'location_history': 'Location History',
            'location_analytics': 'Location Analytics',
            'location_privacy': 'Location Privacy',
            'offline_maps': 'Offline Maps',
            
            // Media
            'image_upload': 'Image Upload',
            'video_upload': 'Video Upload',
            'audio_upload': 'Audio Upload',
            'document_upload': 'Document Upload',
            'camera_integration': 'Camera Integration',
            'gallery_access': 'Gallery Access',
            'image_editing': 'Image Editing',
            'video_editing': 'Video Editing',
            'media_compression': 'Media Compression',
            'media_conversion': 'Media Conversion',
            'thumbnail_generation': 'Thumbnail Generation',
            'media_streaming': 'Media Streaming',
            'media_download': 'Media Download',
            'media_sharing': 'Media Sharing',
            'media_cloud_storage': 'Cloud Storage',
            
            // Social
            'social_login': 'Social Login',
            'social_sharing': 'Social Sharing',
            'social_feeds': 'Social Feeds',
            'social_following': 'Follow System',
            'social_likes': 'Like/Comment System',
            'social_invites': 'Social Invites',
            'facebook_integration': 'Facebook Integration',
            'instagram_integration': 'Instagram Integration',
            'twitter_integration': 'Twitter Integration',
            'linkedin_integration': 'LinkedIn Integration',
            'youtube_integration': 'YouTube Integration',
            'tiktok_integration': 'TikTok Integration',
            
            // Analytics
            'user_analytics': 'User Analytics',
            'app_analytics': 'App Analytics',
            'business_analytics': 'Business Analytics',
            'crash_analytics': 'Crash Analytics',
            'custom_analytics': 'Custom Analytics',
            'real_time_dashboard': 'Real-time Dashboard',
            'scheduled_reports': 'Scheduled Reports',
            'export_reports': 'Export Reports',
            'analytics_api': 'Analytics API',
            
            // Offline
            'data_caching': 'Data Caching',
            'offline_mode': 'Offline Mode',
            'sync_when_online': 'Sync When Online',
            'offline_storage': 'Offline Storage',
            'offline_notifications': 'Offline Notifications',
            
            // Admin
            'user_management': 'User Management',
            'content_management': 'Content Management',
            'analytics_dashboard': 'Analytics Dashboard',
            'system_settings': 'System Settings',
            'moderation_tools': 'Moderation Tools',
            'admin_notifications': 'Admin Notifications',
            'role_based_access': 'Role-based Access',
            'admin_audit_log': 'Admin Audit Log',
            'backup_restore': 'Backup & Restore',
            'admin_api': 'Admin API'
        };
        
        return subFeatureMap[subFeature] || subFeature;
    }

    generateFunctionalRequirements(data) {
        const requirements = [];
        
        const mainFeatures = data.main_features || [];
        const subFeatures = data.sub_features || [];
        
        if (mainFeatures.length > 0) {
            mainFeatures.forEach((mainFeature, index) => {
                const reqId = `FR-${index + 1}`;
                const mainFeatureMap = {
                    'authentication': 'User Authentication & Login System',
                    'user_management': 'User Profile Management',
                    'search_filter': 'Search & Filter System',
                    'payment_system': 'Payment & E-commerce System',
                    'notifications': 'Push Notifications System',
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
                    return this.isSubFeatureOfMain(subFeature, mainFeature);
                });
                
                if (relatedSubFeatures.length > 0) {
                    requirements.push('<ul>');
                    relatedSubFeatures.forEach(subFeature => {
                        requirements.push(`<li>${this.getSubFeatureName(subFeature)}</li>`);
                    });
                    requirements.push('</ul>');
                }
            });
        }
        
        return requirements.length > 0 ? requirements.join('') : '<p>Functional requirements to be detailed during the design phase.</p>';
    }

    generatePerformanceRequirements(performance) {
        if (!performance || performance.length === 0) {
            return '<li>Standard performance requirements apply</li>';
        }
        
        const performanceMap = {
            'fast_loading': 'App shall load within 3 seconds',
            'offline_support': 'App shall function offline where applicable',
            'low_data_usage': 'App shall minimize data usage',
            'battery_optimized': 'App shall be optimized for battery life',
            'high_availability': 'System shall maintain 99.9% uptime'
        };
        
        const performanceArray = Array.isArray(performance) ? performance : [performance];
        return performanceArray.map(perf => `<li>${performanceMap[perf] || perf}</li>`).join('');
    }

    generateSecurityRequirements(security) {
        if (!security || security.length === 0) {
            return '<li>Standard security measures will be implemented</li>';
        }
        
        const securityMap = {
            'data_encryption': 'All data shall be encrypted in transit and at rest',
            'secure_auth': 'Secure authentication mechanisms shall be implemented',
            'gdpr_compliance': 'GDPR compliance requirements shall be met',
            'pci_compliance': 'PCI DSS compliance for payment processing',
            'two_factor_auth': 'Two-factor authentication shall be available',
            'biometric_auth': 'Biometric authentication shall be supported'
        };
        
        const securityArray = Array.isArray(security) ? security : [security];
        return securityArray.map(sec => `<li>${securityMap[sec] || sec}</li>`).join('');
    }

    generateIntegrationList(integrations) {
        if (!integrations || integrations.length === 0) {
            return '<li>No specific integrations required</li>';
        }
        
        const integrationMap = {
            'payment_stripe': 'Stripe Payment Gateway',
            'payment_paypal': 'PayPal Integration',
            'google_maps': 'Google Maps API',
            'firebase_auth': 'Firebase Authentication',
            'social_media': 'Social Media APIs',
            'email_service': 'Email Service (SendGrid, etc.)',
            'sms_service': 'SMS Service',
            'analytics_google': 'Google Analytics',
            'cloud_storage': 'Cloud Storage (AWS S3, etc.)'
        };
        
        const integrationArray = Array.isArray(integrations) ? integrations : [integrations];
        return integrationArray.map(int => `<li>${integrationMap[int] || int}</li>`).join('');
    }

    calculateTimeline(timeline) {
        const timelineMap = {
            'asap': '2-4 weeks (Rush job)',
            '1_month': '3-4 weeks',
            '2_months': '6-8 weeks',
            '3_months': '10-12 weeks',
            '6_months': '16-20 weeks',
            'flexible': 'To be determined based on complexity',
            'not_sure': 'To be determined'
        };
        
        return timelineMap[timeline] || 'To be determined';
    }

    setupDocumentActions() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Download buttons
        document.getElementById('downloadSRS')?.addEventListener('click', () => this.downloadDocument('srs'));
        document.getElementById('downloadContract')?.addEventListener('click', () => this.downloadDocument('contract'));

        // Print buttons
        document.getElementById('printSRS')?.addEventListener('click', () => this.printDocument('srs'));
        document.getElementById('printContract')?.addEventListener('click', () => this.printDocument('contract'));

        // Modify form button
        document.getElementById('modifyForm')?.addEventListener('click', () => {
            this.documentsSection.style.display = 'none';
            document.querySelector('.srs-form-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('active');
            console.log('Tab button activated:', activeTabBtn);
        } else {
            console.error('Tab button not found:', tabName);
            console.log('Available tab buttons:', document.querySelectorAll('.tab-btn'));
        }

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            console.log('Removing active from:', content.id);
        });
        const activeTabContent = document.getElementById(`${tabName}-tab`);
        if (activeTabContent) {
            activeTabContent.classList.add('active');
            console.log('Tab content activated:', activeTabContent);
            console.log('Tab content innerHTML length:', activeTabContent.innerHTML.length);
            
            // Force visibility
            activeTabContent.style.display = 'block';
            activeTabContent.style.visibility = 'visible';
            activeTabContent.style.opacity = '1';
        } else {
            console.error('Tab content not found:', `${tabName}-tab`);
            console.log('Available tab contents:', document.querySelectorAll('.tab-content'));
        }
    }

    downloadDocument(type) {
        const content = type === 'srs' ? this.srsContent.innerHTML : this.contractContent.innerHTML;
        const title = type === 'srs' ? 'SRS_Document' : 'Project_Contract';
        
        // Create a temporary element to get the text content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        
        // Create and download file
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        this.showToast(`${type.toUpperCase()} document downloaded successfully!`, 'success');
    }

    printDocument(type) {
        const content = type === 'srs' ? this.srsContent : this.contractContent;
        
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${type.toUpperCase()} Document</title>
                    <style>
                        body { font-family: monospace; line-height: 1.6; margin: 20px; }
                        h1, h2, h3, h4 { color: #333; }
                        h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
                        h2 { border-bottom: 1px solid #333; padding-bottom: 5px; }
                        ul, ol { margin-bottom: 15px; }
                        li { margin-bottom: 5px; }
                    </style>
                </head>
                <body>
                    ${content.innerHTML}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize the SRS Form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing SRS Form...');
    new SRSForm();
});

// Handle page unload to save data
window.addEventListener('beforeunload', () => {
    const form = document.getElementById('srsForm');
    if (form) {
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'access_key' || key === 'subject' || key === 'from_name' || key === 'redirect' || key === 'redirect_url') {
                continue;
            }
            
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
        
        localStorage.setItem('srs_form_data', JSON.stringify(data));
        localStorage.setItem('srs_form_step', document.querySelector('.form-step.active').dataset.step);
    }
});
