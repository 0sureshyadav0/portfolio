// Centralized SRS Form Data
// This file contains all form steps, fields, and configurations
// Used by both hacker and professional modes

const SRS_FORM_DATA = {
    totalSteps: 9,
    steps: [
        {
            stepNumber: 1,
            title: "Basic Project Information",
            description: "Provide essential details about your project",
            fields: [
                {
                    name: "projectName",
                    label: "Project Name",
                    type: "text",
                    placeholder: "Enter your project name",
                    required: true
                },
                {
                    name: "clientName",
                    label: "Client/Company Name",
                    type: "text",
                    placeholder: "Your name or company",
                    required: true
                },
                {
                    name: "clientEmail",
                    label: "Email Address",
                    type: "email",
                    placeholder: "your@email.com",
                    required: true
                },
                {
                    name: "clientPhone",
                    label: "Phone Number",
                    type: "tel",
                    placeholder: "+1 (555) 123-4567",
                    required: false
                },
                {
                    name: "projectType",
                    label: "Project Type",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", text: "Choose project type" },
                        { value: "mobile_app", text: "Mobile App (iOS & Android)" },
                        { value: "ios_only", text: "iOS App Only" },
                        { value: "android_only", text: "Android App Only" },
                        { value: "web_app", text: "Web Application" },
                        { value: "desktop_app", text: "Desktop Application" },
                        { value: "cross_platform", text: "Cross-Platform Solution" },
                        { value: "mvp_prototype", text: "MVP/Prototype" },
                        { value: "app_redesign", text: "App Redesign/Update" },
                        { value: "other", text: "Other" }
                    ]
                },
                {
                    name: "projectDescription",
                    label: "Project Description",
                    type: "textarea",
                    placeholder: "Describe your project idea in detail...",
                    rows: 4,
                    required: true
                }
            ]
        },
        {
            stepNumber: 2,
            title: "Target Audience & Market",
            description: "Define your target users and market",
            fields: [
                {
                    name: "targetAudience",
                    label: "Target Audience",
                    type: "textarea",
                    placeholder: "Describe your target audience and user personas",
                    rows: 4,
                    required: true
                },
                {
                    name: "ageGroup",
                    label: "Primary Age Group",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select age group" },
                        { value: "children", text: "Children (0-12)" },
                        { value: "teens", text: "Teens (13-17)" },
                        { value: "young_adults", text: "Young Adults (18-25)" },
                        { value: "adults", text: "Adults (26-40)" },
                        { value: "middle_aged", text: "Middle-aged (41-60)" },
                        { value: "seniors", text: "Seniors (60+)" },
                        { value: "all_ages", text: "All Ages" }
                    ]
                },
                {
                    name: "marketResearch",
                    label: "Market Research",
                    type: "textarea",
                    placeholder: "Any market research or competitor analysis you've done",
                    rows: 3,
                    required: false
                }
            ]
        },
        {
            stepNumber: 3,
            title: "Core Features & Functionality",
            description: "Define the main features of your application",
            fields: [
                {
                    name: "main_features",
                    label: "Essential Features",
                    type: "checkbox_group",
                    required: true,
                    help: "Select main features - sub-options will appear below",
                    options: [
                        { value: "authentication", text: "User Authentication & Login", subFeatures: "auth" },
                        { value: "user_management", text: "User Profile Management", subFeatures: "user" },
                        { value: "search_filter", text: "Search & Filter System", subFeatures: "search" },
                        { value: "payment_system", text: "Payment & E-commerce", subFeatures: "payment" },
                        { value: "notifications", text: "Push Notifications", subFeatures: "notif" },
                        { value: "messaging", text: "In-App Messaging & Chat", subFeatures: "msg" },
                        { value: "location_services", text: "Location & GPS Services", subFeatures: "location" },
                        { value: "media_handling", text: "Media & Content Handling", subFeatures: "media" },
                        { value: "social_integration", text: "Social Media Integration", subFeatures: "social" },
                        { value: "analytics", text: "Analytics & Reporting", subFeatures: "analytics" },
                        { value: "offline_mode", text: "Offline Functionality", subFeatures: "offline" },
                        { value: "admin_panel", text: "Admin Panel & Dashboard", subFeatures: "admin" }
                    ]
                },
                {
                    name: "additionalFeatures",
                    label: "Additional Features",
                    type: "textarea",
                    placeholder: "Any other specific features you need?",
                    rows: 3,
                    required: false,
                    help: "Any other specific features you need?"
                },
                {
                    name: "userWorkflow",
                    label: "User Workflow",
                    type: "textarea",
                    placeholder: "How will users interact with your app?",
                    rows: 4,
                    required: false,
                    help: "How will users interact with your app?"
                }
            ]
        },
        {
            stepNumber: 4,
            title: "Design & User Experience",
            description: "Specify your design preferences and UX requirements",
            fields: [
                {
                    name: "designStyle",
                    label: "Design Style Preference",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select design style" },
                        { value: "modern", text: "Modern & Clean" },
                        { value: "minimalist", text: "Minimalist" },
                        { value: "corporate", text: "Corporate/Professional" },
                        { value: "creative", text: "Creative/Artistic" },
                        { value: "playful", text: "Playful/Fun" },
                        { value: "luxury", text: "Luxury/Premium" }
                    ]
                },
                {
                    name: "colorPreferences",
                    label: "Color Preferences",
                    type: "text",
                    placeholder: "e.g., Blue and white, Dark theme, etc.",
                    required: false
                },
                {
                    name: "designReferences",
                    label: "Design References",
                    type: "textarea",
                    placeholder: "Any apps or websites you like the design of? Any specific design elements you want?",
                    rows: 3,
                    required: false
                },
                {
                    name: "accessibilityRequirements",
                    label: "Accessibility Requirements",
                    type: "textarea",
                    placeholder: "Any specific accessibility requirements or considerations",
                    rows: 2,
                    required: false
                }
            ]
        },
        {
            stepNumber: 5,
            title: "Technical Requirements",
            description: "Specify technical needs and platform requirements",
            fields: [
                {
                    name: "platformPriority",
                    label: "Platform Priority",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", text: "Select platform priority" },
                        { value: "ios_first", text: "iOS First" },
                        { value: "android_first", text: "Android First" },
                        { value: "both_equal", text: "Both Platforms Equally" },
                        { value: "web_first", text: "Web First" }
                    ]
                },
                {
                    name: "backendRequirements",
                    label: "Backend Requirements",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select backend needs" },
                        { value: "simple_api", text: "Simple API" },
                        { value: "database", text: "Database Integration" },
                        { value: "user_auth", text: "User Authentication" },
                        { value: "payment", text: "Payment Processing" },
                        { value: "real_time", text: "Real-time Features" },
                        { value: "complex_backend", text: "Complex Backend System" }
                    ]
                },
                {
                    name: "thirdPartyIntegrations",
                    label: "Third-Party Integrations",
                    type: "textarea",
                    placeholder: "Any third-party services, APIs, or integrations needed",
                    rows: 3,
                    required: false
                },
                {
                    name: "specialRequirements",
                    label: "Special Technical Requirements",
                    type: "textarea",
                    placeholder: "Any specific technical requirements, integrations, or constraints",
                    rows: 3,
                    required: false
                }
            ]
        },
        {
            stepNumber: 6,
            title: "Performance & Security",
            description: "Define performance expectations and security requirements",
            fields: [
                {
                    name: "performanceRequirements",
                    label: "Performance Requirements",
                    type: "textarea",
                    placeholder: "Any specific performance requirements (loading times, responsiveness, etc.)",
                    rows: 3,
                    required: false
                },
                {
                    name: "securityRequirements",
                    label: "Security Requirements",
                    type: "textarea",
                    placeholder: "Any specific security requirements or data protection needs",
                    rows: 3,
                    required: false
                },
                {
                    name: "dataHandling",
                    label: "Data Handling",
                    type: "textarea",
                    placeholder: "How will user data be handled, stored, and protected?",
                    rows: 3,
                    required: false
                }
            ]
        },
        {
            stepNumber: 7,
            title: "Timeline & Budget",
            description: "Specify project timeline and budget constraints",
            fields: [
                {
                    name: "projectTimeline",
                    label: "Project Timeline",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", text: "Select timeline" },
                        { value: "1_month", text: "1 Month" },
                        { value: "2_months", text: "2 Months" },
                        { value: "3_months", text: "3 Months" },
                        { value: "6_months", text: "6 Months" },
                        { value: "1_year", text: "1 Year" },
                        { value: "flexible", text: "Flexible" }
                    ]
                },
                {
                    name: "budgetRange",
                    label: "Budget Range",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select budget range" },
                        { value: "under_5k", text: "Under $5,000" },
                        { value: "5k_10k", text: "$5,000 - $10,000" },
                        { value: "10k_25k", text: "$10,000 - $25,000" },
                        { value: "25k_50k", text: "$25,000 - $50,000" },
                        { value: "50k_100k", text: "$50,000 - $100,000" },
                        { value: "over_100k", text: "Over $100,000" },
                        { value: "discuss", text: "Let's Discuss" }
                    ]
                },
                {
                    name: "projectDeadline",
                    label: "Project Deadline",
                    type: "date",
                    required: false
                },
                {
                    name: "milestones",
                    label: "Key Milestones",
                    type: "textarea",
                    placeholder: "Any specific milestones or delivery dates",
                    rows: 3,
                    required: false
                }
            ]
        },
        {
            stepNumber: 8,
            title: "Project Estimation & Pricing",
            description: "AI-powered project estimation and pricing",
            fields: [
                {
                    name: "aiEstimation",
                    label: "AI-Powered Project Estimation",
                    type: "ai_estimation",
                    required: false,
                    help: "Get instant cost and timeline estimates based on your selected features"
                },
                {
                    name: "projectComplexity",
                    label: "Project Complexity",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select complexity level" },
                        { value: "simple", text: "Simple (Basic features)" },
                        { value: "moderate", text: "Moderate (Standard features)" },
                        { value: "complex", text: "Complex (Advanced features)" },
                        { value: "enterprise", text: "Enterprise (Large-scale solution)" }
                    ]
                },
                {
                    name: "maintenanceRequirements",
                    label: "Maintenance & Support",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select maintenance needs" },
                        { value: "none", text: "No ongoing maintenance needed" },
                        { value: "basic", text: "Basic maintenance and updates" },
                        { value: "full", text: "Full maintenance and support" },
                        { value: "enterprise", text: "Enterprise-level support" }
                    ]
                },
                {
                    name: "pricingModel",
                    label: "Preferred Pricing Model",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select pricing model" },
                        { value: "fixed", text: "Fixed Price Project" },
                        { value: "hourly", text: "Hourly Rate" },
                        { value: "milestone", text: "Milestone-based" },
                        { value: "retainer", text: "Monthly Retainer" }
                    ]
                }
            ]
        },
        {
            stepNumber: 9,
            title: "Additional Information",
            description: "Any other details or special requirements",
            fields: [
                {
                    name: "competitors",
                    label: "Competitors or Similar Apps",
                    type: "textarea",
                    placeholder: "Any apps or websites that are similar to what you want to build?",
                    rows: 3,
                    required: false
                },
                {
                    name: "contactMethod",
                    label: "Preferred Contact Method",
                    type: "select",
                    required: true,
                    options: [
                        { value: "", text: "Select contact method" },
                        { value: "email", text: "Email" },
                        { value: "phone", text: "Phone Call" },
                        { value: "whatsapp", text: "WhatsApp" },
                        { value: "video_call", text: "Video Call" },
                        { value: "in_person", text: "In Person Meeting" }
                    ]
                },
                {
                    name: "contactTime",
                    label: "Best Time to Contact",
                    type: "select",
                    required: false,
                    options: [
                        { value: "", text: "Select best time" },
                        { value: "morning", text: "Morning (9 AM - 12 PM)" },
                        { value: "afternoon", text: "Afternoon (12 PM - 5 PM)" },
                        { value: "evening", text: "Evening (5 PM - 8 PM)" },
                        { value: "weekend", text: "Weekend" },
                        { value: "anytime", text: "Anytime" }
                    ]
                },
                {
                    name: "timezone",
                    label: "Timezone",
                    type: "text",
                    placeholder: "e.g., EST, PST, GMT+5:30",
                    required: false
                },
                {
                    name: "additionalNotes",
                    label: "Additional Notes",
                    type: "textarea",
                    placeholder: "Any other information, concerns, or special requirements",
                    rows: 4,
                    required: false
                }
            ]
        }
    ]
};

// Sub-features data structure (same as hacker mode)
const SUB_FEATURES_DATA = {
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
                    { value: 'business_analytics', text: 'Business Intelligence Analytics' },
                    { value: 'custom_analytics', text: 'Custom Analytics Events' }
                ]
            },
            {
                title: 'Reporting Features',
                features: [
                    { value: 'dashboard_reports', text: 'Dashboard Reports' },
                    { value: 'scheduled_reports', text: 'Scheduled Reports' },
                    { value: 'export_reports', text: 'Export Reports (PDF/Excel)' },
                    { value: 'real_time_analytics', text: 'Real-time Analytics' }
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
                    { value: 'offline_data_sync', text: 'Offline Data Synchronization' },
                    { value: 'offline_storage', text: 'Local Data Storage' },
                    { value: 'offline_mode', text: 'Offline Mode Operation' },
                    { value: 'background_sync', text: 'Background Synchronization' }
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
                    { value: 'system_settings', text: 'System Settings' },
                    { value: 'analytics_dashboard', text: 'Analytics Dashboard' },
                    { value: 'moderation_tools', text: 'Moderation Tools' }
                ]
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SRS_FORM_DATA, SUB_FEATURES_DATA };
}
