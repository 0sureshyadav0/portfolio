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
            
            const [srsDocument, projectAgreement, pricingTimeline, developerRoadmap, projectSummary, termsConditions, privacyPolicy] = await Promise.all([
                this.generateSRSDocument(formData),
                this.generateProjectAgreement(formData),
                this.generatePricingTimeline(formData),
                this.generateDeveloperRoadmap(formData),
                this.generateProjectSummary(formData),
                this.generateTermsConditions(formData),
                this.generatePrivacyPolicy(formData)
            ]);

            return {
                srsDocument,
                projectAgreement,
                pricingTimeline,
                developerRoadmap,
                projectSummary,
                termsConditions,
                privacyPolicy
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

    // Generate Project Agreement
    async generateProjectAgreement(formData) {
        try {
            const prompt = this.createAgreementPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parseAgreementResponse(response);
        } catch (error) {
            console.error('Error generating Project Agreement:', error);
            return this.getFallbackAgreement(formData);
        }
    }

    // Generate Pricing Timeline
    async generatePricingTimeline(formData) {
        try {
            const prompt = this.createPricingPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parsePricingResponse(response);
        } catch (error) {
            console.error('Error generating Pricing Timeline:', error);
            return this.getFallbackPricing(formData);
        }
    }

    // Generate Project Summary
    async generateProjectSummary(formData) {
        try {
            const prompt = this.createSummaryPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parseSummaryResponse(response);
        } catch (error) {
            console.error('Error generating Project Summary:', error);
            return this.getFallbackSummary(formData);
        }
    }

    createAgreementPrompt(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        const projectType = formData.projectType || 'mobile_app';
        const features = formData.main_features || [];
        
        return `
You are a legal expert specializing in software development contracts. Create a comprehensive Project Agreement for a software development project.

PROJECT DETAILS:
- Project Name: ${projectName}
- Client: ${clientName}
- Project Type: ${projectType}
- Features: ${features.join(', ')}

Create a detailed Project Agreement in HTML format. Return ONLY the HTML content starting with <h1> and ending with </div>.

The HTML should include:
1. Agreement header with project information
2. Project scope and deliverables
3. Client responsibilities and obligations
4. Developer responsibilities and commitments
5. Payment terms and schedule
6. Intellectual property rights
7. Confidentiality and non-disclosure
8. Project timeline and milestones
9. Warranty and support terms
10. Termination conditions
11. Limitation of liability
12. Governing law and dispute resolution
13. Contact information and signatures

Make the content specific to Flutter development and Nepal market context.
Use proper HTML formatting with headings, lists, and structured content.
        `;
    }

    createPricingPrompt(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const features = formData.main_features || [];
        const projectType = formData.projectType || 'mobile_app';
        const complexity = this.assessComplexity(formData);
        
        return `
You are a Flutter development expert in Nepal. Create comprehensive pricing and timeline estimation for a software development project.

PROJECT DETAILS:
- Project Name: ${projectName}
- Project Type: ${projectType}
- Features: ${features.join(', ')}
- Complexity Level: ${complexity}

Create detailed pricing and timeline in HTML format. Return ONLY the HTML content starting with <h1> and ending with </div>.

The HTML should include:
1. Pricing overview and total cost breakdown
2. Feature-wise cost analysis
3. Development phases and timeline
4. Resource allocation and team structure
5. Payment schedule and milestones
6. Additional costs and considerations
7. Nepal market pricing context
8. Cost optimization recommendations
9. Timeline dependencies and risks
10. Quality assurance and testing costs

Make the pricing realistic for Nepal market and specific to the selected features.
Use proper HTML formatting with tables, lists, and structured content.
        `;
    }

    createSummaryPrompt(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        const features = formData.main_features || [];
        const projectType = formData.projectType || 'mobile_app';
        
        return `
You are a project management expert. Create a comprehensive project summary for a software development project.

PROJECT DETAILS:
- Project Name: ${projectName}
- Client: ${clientName}
- Project Type: ${projectType}
- Features: ${features.join(', ')}

Create a detailed project summary in HTML format. Return ONLY the HTML content starting with <h1> and ending with </div>.

The HTML should include:
1. Executive summary and project overview
2. Key objectives and goals
3. Scope and deliverables summary
4. Technology stack and architecture
5. Key features and functionality
6. Timeline and milestones
7. Budget and resource requirements
8. Risk assessment and mitigation
9. Success metrics and KPIs
10. Next steps and recommendations

Make the summary comprehensive yet concise, suitable for stakeholders and decision makers.
Use proper HTML formatting with headings, lists, and structured content.
        `;
    }

    parseAgreementResponse(response) {
        try {
            const htmlMatch = response.match(/<h1>[\s\S]*<\/div>/);
            if (htmlMatch) {
                return htmlMatch[0];
            }
        } catch (error) {
            console.error('Error parsing Agreement response:', error);
        }
        return this.getFallbackAgreement({});
    }

    parsePricingResponse(response) {
        try {
            const htmlMatch = response.match(/<h1>[\s\S]*<\/div>/);
            if (htmlMatch) {
                return htmlMatch[0];
            }
        } catch (error) {
            console.error('Error parsing Pricing response:', error);
        }
        return this.getFallbackPricing({});
    }

    parseSummaryResponse(response) {
        try {
            const htmlMatch = response.match(/<h1>[\s\S]*<\/div>/);
            if (htmlMatch) {
                return htmlMatch[0];
            }
        } catch (error) {
            console.error('Error parsing Summary response:', error);
        }
        return this.getFallbackSummary({});
    }

    getFallbackAgreement(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        
        return `
            <h1>Project Development Agreement</h1>
            
            <div class="document-info">
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Client:</strong> ${clientName}</p>
                <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <h2>1. Project Scope</h2>
            <p>Development of ${projectName} using Flutter framework.</p>
            
            <h2>2. Payment Terms</h2>
            <p>30% initial, 40% milestone, 30% final payment.</p>
            
            <h2>3. Intellectual Property</h2>
            <p>Client owns all developed code upon full payment.</p>
            
            <div class="footer-note">
                <p><em>This is a fallback agreement. AI generation failed.</em></p>
            </div>
        `;
    }

    getFallbackPricing(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const features = formData.main_features || [];
        
        return `
            <h1>Project Pricing & Timeline</h1>
            
            <div class="document-info">
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <h2>1. Cost Summary</h2>
            <p>Total estimated cost: $5,000 - $15,000</p>
            
            <h2>2. Timeline</h2>
            <p>Estimated duration: 8-16 weeks</p>
            
            <h2>3. Features Included</h2>
            <ul>
                ${features.map(feature => `<li>${this.getFeatureDisplayName(feature)}</li>`).join('')}
            </ul>
            
            <div class="footer-note">
                <p><em>This is a fallback pricing. AI generation failed.</em></p>
            </div>
        `;
    }

    getFallbackSummary(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const features = formData.main_features || [];
        
        return `
            <h1>Project Summary</h1>
            
            <div class="document-info">
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <h2>1. Project Overview</h2>
            <p>Development of ${projectName} using Flutter framework.</p>
            
            <h2>2. Key Features</h2>
            <ul>
                ${features.map(feature => `<li>${this.getFeatureDisplayName(feature)}</li>`).join('')}
            </ul>
            
            <h2>3. Technology Stack</h2>
            <p>Flutter, Dart, Firebase, REST APIs</p>
            
            <div class="footer-note">
                <p><em>This is a fallback summary. AI generation failed.</em></p>
            </div>
        `;
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
            // Extract HTML content from response
            const htmlMatch = response.match(/<h1>[\s\S]*<\/div>/);
            if (htmlMatch) {
                return htmlMatch[0];
            }
            // If no HTML found, try to extract any content between HTML tags
            const contentMatch = response.match(/<[^>]*>[\s\S]*<\/[^>]*>/);
            if (contentMatch) {
                return contentMatch[0];
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
        const projectName = formData.projectName || 'Flutter Project';
        const features = formData.main_features || [];
        
        return `
            <h1>Software Requirements Specification</h1>
            
            <div class="document-info">
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <h2>1. Introduction</h2>
            <p>This document outlines the software requirements for ${projectName}, a Flutter-based application.</p>
            
            <h2>2. Project Overview</h2>
            <p>The project involves developing a comprehensive mobile/web application using Flutter framework.</p>
            
            <h2>3. Functional Requirements</h2>
            <ul>
                ${features.map(feature => `<li><strong>${this.getFeatureDisplayName(feature)}:</strong> ${this.getFeatureDescription(feature)}</li>`).join('')}
            </ul>
            
            <h2>4. Non-Functional Requirements</h2>
            <ul>
                <li>Performance: Application should respond within 2 seconds</li>
                <li>Security: Secure data handling and user authentication</li>
                <li>Compatibility: Support for Android and iOS platforms</li>
                <li>Usability: Intuitive user interface design</li>
            </ul>
            
            <div class="footer-note">
                <p><em>This is a fallback SRS document. AI generation failed.</em></p>
            </div>
        `;
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

    // Generate Terms and Conditions
    async generateTermsConditions(formData) {
        try {
            const prompt = this.createTermsPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parseTermsResponse(response);
        } catch (error) {
            console.error('Error generating Terms and Conditions:', error);
            return this.getFallbackTerms(formData);
        }
    }

    // Generate Privacy Policy
    async generatePrivacyPolicy(formData) {
        try {
            const prompt = this.createPrivacyPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parsePrivacyResponse(response);
        } catch (error) {
            console.error('Error generating Privacy Policy:', error);
            return this.getFallbackPrivacy(formData);
        }
    }

    createTermsPrompt(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        const projectType = formData.projectType || 'mobile_app';
        const features = formData.main_features || [];
        
        return `
You are a legal expert specializing in software development contracts. Create comprehensive Terms and Conditions for a software development project.

PROJECT DETAILS:
- Project Name: ${projectName}
- Client: ${clientName}
- Project Type: ${projectType}
- Features: ${features.join(', ')}

Create detailed Terms and Conditions covering:

1. Service Agreement - Define the scope of software development services
2. Project Scope - Detail what's included (SRS, development, testing, deployment)
3. Client Responsibilities - Requirements, feedback, payments, approvals
4. Developer Responsibilities - Quality standards, timelines, support
5. Payment Terms - Milestone payments, late fees, payment methods
6. Intellectual Property - Ownership rights, licensing, retained rights
7. Confidentiality - Non-disclosure, proprietary information protection
8. Project Timeline - Development phases, dependencies, extensions
9. Warranty and Support - Bug fixes, technical support, limitations
10. Termination - Conditions, notice periods, deliverables
11. Limitation of Liability - Damage limitations, exclusions
12. Governing Law - Nepal law, dispute resolution
13. Amendments - How terms can be modified
14. Contact Information - Developer details

Format as professional legal document with clear sections and bullet points.
Include signature sections for both parties.
Make it specific to Flutter development and Nepal market.
        `;
    }

    createPrivacyPrompt(formData) {
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        const projectType = formData.projectType || 'mobile_app';
        const features = formData.main_features || [];
        
        return `
You are a privacy law expert. Create a comprehensive Privacy Policy for software development services.

PROJECT DETAILS:
- Project Name: ${projectName}
- Client: ${clientName}
- Project Type: ${projectType}
- Features: ${features.join(', ')}

Create detailed Privacy Policy covering:

1. Introduction - Purpose and scope of privacy policy
2. Information Collection - Project info, contact details, technical data
3. Information Usage - Development, support, communication purposes
4. Information Sharing - Third-party services, legal requirements
5. Data Security - Encryption, access controls, security measures
6. Data Retention - Retention periods, deletion policies
7. User Rights - Access, correction, deletion, portability rights
8. Cookies and Tracking - Types of cookies, user controls
9. Third-Party Services - Hosting, tools, payment processors
10. International Transfers - Cross-border data protection
11. Children's Privacy - Age restrictions, parental controls
12. Policy Changes - Update procedures, notifications
13. Compliance - GDPR, Nepal regulations, industry standards
14. Contact Information - Data controller details
15. Questions and Concerns - Support contact information

Format as professional privacy policy with clear sections.
Include specific details about Flutter development and Nepal context.
Ensure compliance with international privacy standards.
        `;
    }

    parseTermsResponse(response) {
        try {
            // Extract HTML content from response
            const htmlMatch = response.match(/<h1>[\s\S]*<\/div>/);
            if (htmlMatch) {
                return htmlMatch[0];
            }
        } catch (error) {
            console.error('Error parsing Terms response:', error);
        }
        return this.getFallbackTerms({});
    }

    parsePrivacyResponse(response) {
        try {
            // Extract HTML content from response
            const htmlMatch = response.match(/<h1>[\s\S]*<\/div>/);
            if (htmlMatch) {
                return htmlMatch[0];
            }
        } catch (error) {
            console.error('Error parsing Privacy response:', error);
        }
        return this.getFallbackPrivacy({});
    }

    getFallbackTerms(formData) {
        const currentDate = new Date().toLocaleDateString();
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        
        return `
            <h1>Terms and Conditions</h1>
            
            <div class="document-info">
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Client:</strong> ${clientName}</p>
                <p><strong>Effective Date:</strong> ${currentDate}</p>
            </div>
            
            <h2>1. Service Agreement</h2>
            <p>These Terms and Conditions govern the software development services provided by Suresh Yadav to ${clientName} for the development of ${projectName}.</p>
            
            <h2>2. Project Scope</h2>
            <p>The project includes software development, testing, and deployment services using Flutter framework.</p>
            
            <h2>3. Payment Terms</h2>
            <p>Payment schedule: 30% initial, 40% milestone, 30% final payment.</p>
            
            <h2>4. Intellectual Property</h2>
            <p>Upon full payment, client owns all developed code and documentation.</p>
            
            <h2>5. Confidentiality</h2>
            <p>Both parties agree to maintain confidentiality of project information.</p>
            
            <div class="footer-note">
                <p><em>By proceeding with the project, both parties agree to these terms.</em></p>
            </div>
        `;
    }

    getFallbackPrivacy(formData) {
        const currentDate = new Date().toLocaleDateString();
        const projectName = formData.projectName || 'Flutter Project';
        const clientName = formData.clientName || 'Client';
        
        return `
            <h1>Privacy Policy</h1>
            
            <div class="document-info">
                <p><strong>Project:</strong> ${projectName}</p>
                <p><strong>Client:</strong> ${clientName}</p>
                <p><strong>Effective Date:</strong> ${currentDate}</p>
            </div>
            
            <h2>1. Introduction</h2>
            <p>This Privacy Policy describes how we collect, use, and protect information during the development of ${projectName}.</p>
            
            <h2>2. Information Collection</h2>
            <p>We collect project requirements, contact information, and technical specifications necessary for development.</p>
            
            <h2>3. Information Usage</h2>
            <p>Information is used solely for project development, support, and communication purposes.</p>
            
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your information.</p>
            
            <h2>5. Contact Information</h2>
            <p>For privacy questions, contact us at sureshyadav.info.np</p>
            
            <div class="footer-note">
                <p><em>This Privacy Policy is effective as of ${currentDate}.</em></p>
            </div>
        `;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedGeminiService;
} else {
    window.EnhancedGeminiService = EnhancedGeminiService;
}
