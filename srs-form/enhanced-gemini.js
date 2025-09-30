// Enhanced Gemini AI Service with Dynamic Document Generation
class EnhancedGeminiService {
    constructor() {
        this.apiKey = "AIzaSyBG-2d7HZZ8vwoz-bqF3JpischbYz29jTA";
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
    }

    async callGeminiAPI(prompt) {
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 8192,
            }
        };

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid API response structure');
            }
            
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Network or API error:', error);
            throw error;
        }
    }

    // Generate all documents dynamically
    async generateAllDocuments(formData) {
        try {
            console.log('Generating all documents with data:', formData);
            
            const [srsDocument, projectAgreement, pricingTimeline, developerRoadmap, projectSummary] = await Promise.all([
                this.generateSRSDocument(formData),
                this.generateProjectAgreement(formData),
                this.generatePricingTimeline(formData),
                this.generateDeveloperRoadmap(formData),
                this.generateProjectSummary(formData)
            ]);

            return {
                srsDocument,
                projectAgreement,
                pricingTimeline,
                developerRoadmap,
                projectSummary
            };
        } catch (error) {
            console.error('Error generating documents:', error);
            throw error;
        }
    }

    // Enhanced SRS Document Generation
    async generateSRSDocument(formData) {
        try {
            const prompt = this.createSRSPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parseSRSResponse(response);
        } catch (error) {
            console.error('Error generating SRS document:', error);
            return this.getFallbackSRS(formData);
        }
    }

    createSRSPrompt(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const projectType = formData.projectType || 'mobile_app';
        const complexity = this.assessComplexity(formData);

        return `
You are a software requirements specification expert. Create a comprehensive SRS document for a ${projectType} with the following specifications:

PROJECT DETAILS:
- Project Name: ${formData.projectName || 'Not specified'}
- Project Type: ${projectType}
- Project Description: ${formData.projectDescription || 'Not specified'}
- Main Features: ${features.join(', ')}
- Sub Features: ${subFeatures.join(', ')}
- Platforms: ${Array.isArray(formData.platforms) ? formData.platforms.join(', ') : formData.platforms || 'Android, iOS'}
- Target Audience: ${formData.targetAudience || 'General users'}
- Primary Markets: ${formData.primaryMarkets || 'Not specified'}
- Expected Users: ${formData.expectedUsers || 'Not specified'}
- Complexity Level: ${complexity}

FEATURE-SPECIFIC REQUIREMENTS:
${this.getFeatureSpecificRequirements(features)}

Create a comprehensive SRS document in HTML format with the following structure:
- Executive Summary
- Project Overview
- Functional Requirements (detailed for each feature)
- Non-Functional Requirements
- Technical Specifications
- User Interface Requirements
- System Architecture
- Testing Requirements
- Deployment Requirements

Make the document specific to this project, not generic templates.`;
    }

    // Enhanced Developer Roadmap Generation
    async generateDeveloperRoadmap(formData) {
        try {
            const prompt = this.createRoadmapPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parseRoadmapResponse(response);
        } catch (error) {
            console.error('Error generating developer roadmap:', error);
            return this.getFallbackRoadmap(formData);
        }
    }

    createRoadmapPrompt(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const projectType = formData.projectType || 'mobile_app';
        const complexity = this.assessComplexity(formData);

        return `
You are a Flutter development expert in Nepal. Create a detailed developer roadmap for a ${projectType} with the following specifications:

PROJECT DETAILS:
- Project Name: ${formData.projectName || 'Not specified'}
- Project Type: ${projectType}
- Project Description: ${formData.projectDescription || 'Not specified'}
- Main Features: ${features.join(', ')}
- Sub Features: ${subFeatures.join(', ')}
- Platforms: ${Array.isArray(formData.platforms) ? formData.platforms.join(', ') : formData.platforms || 'Android, iOS'}
- Target Audience: ${formData.targetAudience || 'General users'}
- Complexity Level: ${complexity}

FEATURE-SPECIFIC DEVELOPMENT REQUIREMENTS:
${this.getFeatureSpecificRoadmap(features)}

IMPORTANT INSTRUCTIONS:
1. Create DYNAMIC time slots based on feature complexity - don't use generic 9:00 AM - 12:00 PM for everything
2. Break down each feature into detailed sub-tasks with specific deliverables
3. Provide realistic time estimates based on actual development complexity
4. Include specific technical implementation details
5. Add testing and quality assurance steps for each feature
6. Consider dependencies between features
7. Provide daily schedules with varying time slots based on task complexity

Create a comprehensive developer roadmap in JSON format:
{
  "roadmap": {
    "totalDuration": {
      "weeks": number,
      "days": number
    },
    "phases": [
      {
        "phase": "string",
        "duration": {
          "weeks": number,
          "days": number
        },
        "description": "string",
        "features": ["string"],
        "tasks": [
          {
            "task": "string",
            "feature": "string",
            "duration": {
              "days": number,
              "hours": number
            },
            "complexity": "low|medium|high",
            "priority": "high|medium|low",
            "dependencies": ["string"],
            "deliverables": ["string"],
            "subTasks": [
              {
                "subTask": "string",
                "description": "string",
                "hours": number,
                "deliverable": "string"
              }
            ],
            "dailySchedule": [
              {
                "day": number,
                "date": "string",
                "timeSlots": [
                  {
                    "time": "string (e.g., 9:00 AM - 11:30 AM)",
                    "duration": "string (e.g., 2.5 hours)",
                    "task": "string",
                    "description": "string",
                    "deliverable": "string",
                    "notes": "string"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "technologyStack": {
      "frontend": ["string"],
      "backend": ["string"],
      "database": ["string"],
      "thirdParty": ["string"]
    },
    "testingStrategy": {
      "unitTesting": "string",
      "integrationTesting": "string",
      "userTesting": "string",
      "performanceTesting": "string"
    },
    "deploymentStrategy": {
      "staging": "string",
      "production": "string",
      "rollback": "string"
    }
  }
}

Make sure each feature gets appropriate time allocation based on its complexity. Simple features should have shorter time slots, complex features should have longer, more detailed schedules.`;
    }

    // Feature-specific roadmap details
    getFeatureSpecificRoadmap(features) {
        const featureRoadmaps = {
            'authentication': `
Authentication System Development:
- Day 1 (9:00 AM - 12:00 PM): Design authentication UI/UX mockups
- Day 1 (1:00 PM - 5:00 PM): Set up Firebase Authentication
- Day 2 (9:00 AM - 11:00 AM): Implement login screen
- Day 2 (11:00 AM - 1:00 PM): Implement registration screen
- Day 2 (2:00 PM - 4:00 PM): Implement password reset functionality
- Day 3 (9:00 AM - 12:00 PM): Implement OAuth integration (Google, Facebook)
- Day 3 (1:00 PM - 3:00 PM): Add biometric authentication
- Day 3 (3:00 PM - 5:00 PM): Testing and bug fixes`,
            
            'payment_system': `
Payment System Development:
- Day 1 (9:00 AM - 11:00 AM): Research and select payment gateway
- Day 1 (11:00 AM - 1:00 PM): Design payment flow UI
- Day 1 (2:00 PM - 5:00 PM): Set up payment gateway SDK
- Day 2 (9:00 AM - 12:00 PM): Implement payment processing logic
- Day 2 (1:00 PM - 3:00 PM): Add payment validation and error handling
- Day 2 (3:00 PM - 5:00 PM): Implement transaction history
- Day 3 (9:00 AM - 11:00 AM): Add refund functionality
- Day 3 (11:00 AM - 1:00 PM): Implement payment security measures
- Day 3 (2:00 PM - 5:00 PM): Testing with sandbox environment`,
            
            'messaging': `
Messaging System Development:
- Day 1 (9:00 AM - 12:00 PM): Set up WebSocket connection
- Day 1 (1:00 PM - 4:00 PM): Design chat UI components
- Day 2 (9:00 AM - 11:00 AM): Implement message sending functionality
- Day 2 (11:00 AM - 1:00 PM): Implement message receiving and display
- Day 2 (2:00 PM - 4:00 PM): Add message status indicators
- Day 3 (9:00 AM - 12:00 PM): Implement file sharing in chat
- Day 3 (1:00 PM - 3:00 PM): Add emoji and reactions
- Day 3 (3:00 PM - 5:00 PM): Implement push notifications for messages`,
            
            'location_services': `
Location Services Development:
- Day 1 (9:00 AM - 11:00 AM): Set up location permissions
- Day 1 (11:00 AM - 1:00 PM): Implement GPS location tracking
- Day 1 (2:00 PM - 4:00 PM): Add maps integration
- Day 2 (9:00 AM - 12:00 PM): Implement location-based search
- Day 2 (1:00 PM - 3:00 PM): Add geofencing functionality
- Day 2 (3:00 PM - 5:00 PM): Implement location history`,
            
            'analytics': `
Analytics System Development:
- Day 1 (9:00 AM - 12:00 PM): Set up analytics SDK (Firebase Analytics)
- Day 1 (1:00 PM - 4:00 PM): Implement user behavior tracking
- Day 2 (9:00 AM - 11:00 AM): Add custom event tracking
- Day 2 (11:00 AM - 1:00 PM): Implement dashboard UI
- Day 2 (2:00 PM - 4:00 PM): Add data visualization components
- Day 3 (9:00 AM - 12:00 PM): Implement report generation`,
            
            'admin_panel': `
Admin Panel Development:
- Day 1 (9:00 AM - 12:00 PM): Design admin dashboard layout
- Day 1 (1:00 PM - 4:00 PM): Implement user management interface
- Day 2 (9:00 AM - 11:00 AM): Add content management features
- Day 2 (11:00 AM - 1:00 PM): Implement analytics dashboard
- Day 2 (2:00 PM - 4:00 PM): Add system settings panel
- Day 3 (9:00 AM - 12:00 PM): Implement role-based access control
- Day 3 (1:00 PM - 3:00 PM): Add audit logging
- Day 3 (3:00 PM - 5:00 PM): Testing and security review`
        };

        return features.map(feature => {
            const roadmap = featureRoadmaps[feature] || `
${this.getFeatureDisplayName(feature)} Development:
- Day 1 (9:00 AM - 12:00 PM): Planning and design
- Day 1 (1:00 PM - 5:00 PM): Core implementation
- Day 2 (9:00 AM - 12:00 PM): Feature development
- Day 2 (1:00 PM - 4:00 PM): Testing and refinement`;
            return roadmap;
        }).join('\n\n');
    }

    // Feature-specific requirements
    getFeatureSpecificRequirements(features) {
        const featureRequirements = {
            'authentication': `
Authentication Requirements:
- User registration with email verification
- Secure login with password encryption
- Password reset functionality
- OAuth integration (Google, Facebook)
- Biometric authentication support
- Session management and timeout
- Multi-factor authentication option`,
            
            'payment_system': `
Payment System Requirements:
- Multiple payment methods (credit card, digital wallet)
- Secure payment processing with PCI compliance
- Transaction history and receipts
- Refund and cancellation functionality
- Payment validation and error handling
- Integration with local payment gateways
- Currency conversion support`,
            
            'messaging': `
Messaging Requirements:
- Real-time chat functionality
- Message delivery confirmation
- File and media sharing
- Emoji and reaction support
- Message history and search
- Push notifications for new messages
- Group chat capabilities`,
            
            'location_services': `
Location Services Requirements:
- GPS location tracking
- Maps integration with navigation
- Location-based search and filtering
- Geofencing capabilities
- Location history and analytics
- Privacy controls for location sharing
- Offline map support`,
            
            'analytics': `
Analytics Requirements:
- User behavior tracking
- Custom event analytics
- Real-time dashboard
- Data visualization and reports
- Export functionality for reports
- Privacy-compliant data collection
- Performance metrics tracking`,
            
            'admin_panel': `
Admin Panel Requirements:
- User management and roles
- Content management system
- Analytics and reporting dashboard
- System configuration settings
- Audit logging and monitoring
- Role-based access control
- Data export and backup functionality`
        };

        return features.map(feature => {
            const requirements = featureRequirements[feature] || `
${this.getFeatureDisplayName(feature)} Requirements:
- Core functionality implementation
- User interface design
- Data validation and error handling
- Testing and quality assurance
- Documentation and user guides`;
            return requirements;
        }).join('\n\n');
    }

    // Helper methods
    assessComplexity(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const platforms = formData.platforms || [];
        
        let complexityScore = 0;
        
        complexityScore += features.length * 2;
        complexityScore += subFeatures.length * 1;
        complexityScore += platforms.length * 1;
        
        if (features.includes('payment_system')) complexityScore += 3;
        if (features.includes('messaging')) complexityScore += 3;
        if (features.includes('admin_panel')) complexityScore += 2;
        if (features.includes('offline_mode')) complexityScore += 2;
        
        if (complexityScore <= 5) return 'low';
        if (complexityScore <= 10) return 'medium';
        return 'high';
    }

    getFeatureDisplayName(feature) {
        const featureNames = {
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
        return featureNames[feature] || feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Response parsing methods
    parseSRSResponse(response) {
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Error parsing SRS response:', error);
        }
        return this.getFallbackSRS({});
    }

    parseRoadmapResponse(response) {
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Error parsing roadmap response:', error);
        }
        return this.getFallbackRoadmap({});
    }

    // Fallback methods
    getFallbackSRS(formData) {
        return {
            title: 'Software Requirements Specification',
            content: 'SRS document generation failed. Please try again.',
            features: formData.main_features || []
        };
    }

    getFallbackRoadmap(formData) {
        return {
            roadmap: {
                totalDuration: { weeks: 8, days: 56 },
                phases: [
                    {
                        phase: "Project Setup & Planning",
                        duration: { weeks: 1, days: 7 },
                        description: "Initialize project, set up development environment",
                        tasks: [
                            {
                                task: "Project Setup",
                                duration: { days: 3, hours: 24 },
                                complexity: "low",
                                priority: "high",
                                deliverables: ["Project structure", "Development environment"],
                                dailySchedule: [
                                    {
                                        day: 1,
                                        date: "Day 1",
                                        timeSlots: [
                                            {
                                                time: "9:00 AM - 12:00 PM",
                                                duration: "3 hours",
                                                task: "Project initialization",
                                                description: "Set up Flutter project structure",
                                                deliverable: "Basic project setup"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedGeminiService;
} else {
    window.EnhancedGeminiService = EnhancedGeminiService;
}
