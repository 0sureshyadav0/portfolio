// Gemini AI Pricing and Time Estimation Service
class GeminiPricingService {
    constructor() {
        this.apiKey = "AIzaSyBG-2d7HZZ8vwoz-bqF3JpischbYz29jTA";
        this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
    }

    async estimateProjectCost(formData) {
        try {
            console.log('Starting cost estimation with data:', formData);
            const prompt = this.createCostEstimationPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            const result = this.parseCostResponse(response);
            console.log('Gemini API cost estimation result:', result);
            return result;
        } catch (error) {
            console.error('Error estimating project cost:', error);
            console.log('Using fallback cost estimation');
            const fallbackResult = this.getFallbackCostEstimate(formData);
            console.log('Fallback cost estimation result:', fallbackResult);
            return fallbackResult;
        }
    }

    async estimateProjectTimeline(formData) {
        try {
            const prompt = this.createTimelineEstimationPrompt(formData);
            const response = await this.callGeminiAPI(prompt);
            return this.parseTimelineResponse(response);
        } catch (error) {
            console.error('Error estimating project timeline:', error);
            return this.getFallbackTimelineEstimate(formData);
        }
    }

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

    createCostEstimationPrompt(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const projectType = formData.projectType || 'mobile_app';
        const platforms = formData.platforms || ['android', 'ios'];
        const complexity = this.assessComplexity(formData);

        console.log('Creating cost estimation prompt with data:');
        console.log('- Features:', features);
        console.log('- Sub Features:', subFeatures);
        console.log('- Project Type:', projectType);
        console.log('- Platforms:', platforms);
        console.log('- Complexity:', complexity);

        return `
You are a Flutter development expert in Nepal. Estimate the cost for developing a ${projectType} with the following specifications:

PROJECT DETAILS:
- Project Type: ${projectType}
- Platforms: ${platforms.join(', ')}
- Main Features: ${features.join(', ')}
- Sub Features: ${subFeatures.join(', ')}
- Complexity Level: ${complexity}
- Target Audience: ${formData.targetAudience || 'General users'}
- Expected Users: ${formData.expectedUsers || 'Not specified'}

NEPAL MARKET CONTEXT:
- Average Flutter developer rate: $15-25/hour
- Junior developer: $10-15/hour
- Senior developer: $20-35/hour
- Project manager: $12-20/hour
- UI/UX designer: $8-15/hour

Please provide a detailed cost breakdown in JSON format:
{
  "totalCost": {
    "usd": number,
    "npr": number,
    "currency": "USD"
  },
  "breakdown": {
    "development": {
      "hours": number,
      "rate": number,
      "cost": number
    },
    "design": {
      "hours": number,
      "rate": number,
      "cost": number
    },
    "testing": {
      "hours": number,
      "rate": number,
      "cost": number
    },
    "projectManagement": {
      "hours": number,
      "rate": number,
      "cost": number
    }
  },
  "featureCosts": [
    {
      "feature": "string",
      "complexity": "low|medium|high",
      "hours": number,
      "cost": number,
      "description": "string"
    }
  ],
  "recommendations": [
    "string"
  ]
}

FEATURE-SPECIFIC CONSIDERATIONS:
${this.getFeatureSpecificCosts(features)}

IMPORTANT: Base your estimation on the ACTUAL features selected. Each feature has different complexity and cost implications:
- Authentication: Requires backend integration, security considerations, OAuth implementation
- Payment System: Requires payment gateway integration, PCI compliance, transaction handling
- Location Services: Requires GPS integration, maps API, location permissions
- Messaging: Requires real-time communication, WebSocket implementation, chat UI
- Media Handling: Requires file upload, compression, storage, image/video processing
- Analytics: Requires tracking implementation, dashboard creation, data visualization
- User Management: Requires profile management, role-based access, user settings
- Search & Filter: Requires database optimization, search algorithms, filtering logic
- Notifications: Requires push notification setup, scheduling, user preferences
- Social Integration: Requires API integration, social login, sharing functionality
- Offline Mode: Requires local storage, sync mechanisms, offline-first architecture
- Admin Panel: Requires dashboard development, user management, analytics views

Consider:
1. Feature complexity and integration requirements
2. Platform-specific development needs
3. Backend requirements
4. Third-party integrations
5. Testing and quality assurance
6. Project management overhead
7. Nepal market rates and cost of living
        `;
    }

    getFeatureSpecificCosts(features) {
        const featureCosts = {
            'authentication': 'High complexity - Backend integration, security protocols, OAuth implementation (40-60 hours)',
            'user_management': 'Medium complexity - Profile management, role-based access, user settings (25-40 hours)',
            'search_filter': 'Medium complexity - Database optimization, search algorithms, filtering logic (20-35 hours)',
            'payment_system': 'High complexity - Payment gateway integration, PCI compliance, transaction handling (50-80 hours)',
            'notifications': 'Medium complexity - Push notification setup, scheduling, user preferences (15-25 hours)',
            'messaging': 'High complexity - Real-time communication, WebSocket implementation, chat UI (45-70 hours)',
            'location_services': 'Medium complexity - GPS integration, maps API, location permissions (25-40 hours)',
            'media_handling': 'High complexity - File upload, compression, storage, image/video processing (40-65 hours)',
            'social_integration': 'Medium complexity - API integration, social login, sharing functionality (20-35 hours)',
            'analytics': 'Medium complexity - Tracking implementation, dashboard creation, data visualization (30-50 hours)',
            'offline_mode': 'High complexity - Local storage, sync mechanisms, offline-first architecture (50-80 hours)',
            'admin_panel': 'High complexity - Dashboard development, user management, analytics views (60-100 hours)'
        };

        return features.map(feature => {
            const cost = featureCosts[feature] || 'Medium complexity - Standard feature implementation (20-30 hours)';
            return `- ${this.getFeatureDisplayName(feature)}: ${cost}`;
        }).join('\n');
    }

    createTimelineEstimationPrompt(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const projectType = formData.projectType || 'mobile_app';
        const platforms = formData.platforms || ['android', 'ios'];
        const complexity = this.assessComplexity(formData);

        console.log('Creating timeline estimation prompt with data:');
        console.log('- Features:', features);
        console.log('- Sub Features:', subFeatures);
        console.log('- Project Type:', projectType);
        console.log('- Platforms:', platforms);
        console.log('- Complexity:', complexity);

        return `
You are a Flutter development expert in Nepal. Estimate the timeline for developing a ${projectType} with the following specifications:

PROJECT DETAILS:
- Project Type: ${projectType}
- Platforms: ${platforms.join(', ')}
- Main Features: ${features.join(', ')}
- Sub Features: ${subFeatures.join(', ')}
- Complexity Level: ${complexity}
- Development Approach: ${formData.developmentPhase || 'Full Development'}
- Team Size: ${this.estimateTeamSize(formData)}

Please provide a detailed timeline breakdown in JSON format:
{
  "totalDuration": {
    "weeks": number,
    "days": number,
    "workingDays": number
  },
  "phases": [
    {
      "phase": "string",
      "duration": {
        "weeks": number,
        "days": number
      },
      "description": "string",
      "deliverables": ["string"]
    }
  ],
  "featureTimelines": [
    {
      "feature": "string",
      "complexity": "low|medium|high",
      "duration": {
        "days": number,
        "hours": number
      },
      "dependencies": ["string"],
      "description": "string"
    }
  ],
  "milestones": [
    {
      "milestone": "string",
      "week": number,
      "description": "string"
    }
  ],
  "riskFactors": [
    {
      "risk": "string",
      "impact": "low|medium|high",
      "mitigation": "string"
    }
  ]
}

Consider:
1. Feature complexity and development time
2. Integration requirements
3. Testing and debugging time
4. Platform-specific development
5. Team coordination overhead
6. Client feedback cycles
7. Nepal working conditions and holidays
        `;
    }

    createRoadmapPrompt(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const projectType = formData.projectType || 'mobile_app';

        return `
You are a Flutter development expert in Nepal. Create a detailed developer roadmap for a ${projectType} with the following features:

PROJECT DETAILS:
- Main Features: ${features.join(', ')}
- Sub Features: ${subFeatures.join(', ')}
- Project Type: ${projectType}
- Platforms: ${formData.platforms?.join(', ') || 'Android, iOS'}

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
        "tasks": [
          {
            "task": "string",
            "duration": {
              "days": number,
              "hours": number
            },
            "priority": "high|medium|low",
            "dependencies": ["string"],
            "deliverables": ["string"],
            "dailySchedule": [
              {
                "day": number,
                "date": "string",
                "timeSlots": [
                  {
                    "time": "string",
                    "duration": "string",
                    "task": "string",
                    "description": "string",
                    "deliverable": "string"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "algorithms": [
      {
        "feature": "string",
        "algorithm": "string",
        "steps": [
          {
            "step": number,
            "description": "string",
            "timeEstimate": "string",
            "tools": ["string"],
            "output": "string"
          }
        ],
        "flowchart": "string",
        "codeStructure": "string"
      }
    ],
    "techStack": {
      "frontend": ["string"],
      "backend": ["string"],
      "database": ["string"],
      "tools": ["string"],
      "libraries": ["string"]
    },
    "bestPractices": [
      "string"
    ],
    "commonChallenges": [
      {
        "challenge": "string",
        "solution": "string",
        "prevention": "string"
      }
    ]
  }
}

Provide very specific daily schedules with exact time slots (9:00 AM - 12:00 PM format) and detailed task descriptions.
        `;
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
            // Use backend proxy to avoid CORS issues
            const response = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            
            if (!data.text) {
                console.error('Unexpected API response structure:', data);
                throw new Error('Invalid API response structure');
            }
            
            return data.text;
        } catch (error) {
            console.error('Network or API error:', error);
            throw error;
        }
    }

    parseCostResponse(response) {
        console.log('Parsing Gemini cost response:');
        console.log('Raw response:', response);
        console.log('Response type:', typeof response);
        console.log('Response length:', response ? response.length : 'undefined');
        
        try {
            // Extract JSON from response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                console.log('Found JSON match:', jsonMatch[0]);
                const parsed = JSON.parse(jsonMatch[0]);
                console.log('Parsed JSON:', parsed);
                return parsed;
            } else {
                console.log('No JSON found in response, using fallback');
            }
        } catch (error) {
            console.error('Error parsing cost response:', error);
            console.log('Response that caused error:', response);
        }
        
        console.log('Using fallback cost estimation');
        return this.getFallbackCostEstimate({});
    }

    parseTimelineResponse(response) {
        console.log('Parsing Gemini timeline response:');
        console.log('Raw response:', response);
        console.log('Response type:', typeof response);
        console.log('Response length:', response ? response.length : 'undefined');
        
        try {
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                console.log('Found JSON match:', jsonMatch[0]);
                const parsed = JSON.parse(jsonMatch[0]);
                console.log('Parsed JSON:', parsed);
                return parsed;
            } else {
                console.log('No JSON found in timeline response, using fallback');
            }
        } catch (error) {
            console.error('Error parsing timeline response:', error);
            console.log('Response that caused error:', response);
        }
        
        console.log('Using fallback timeline estimation');
        return this.getFallbackTimelineEstimate({});
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

    assessComplexity(formData) {
        const features = formData.main_features || [];
        const subFeatures = formData.sub_features || [];
        const platforms = formData.platforms || [];
        
        let complexityScore = 0;
        
        // Base complexity
        complexityScore += features.length * 2;
        complexityScore += subFeatures.length * 1;
        complexityScore += platforms.length * 1;
        
        // Feature-specific complexity
        if (features.includes('payment_system')) complexityScore += 3;
        if (features.includes('messaging')) complexityScore += 2;
        if (features.includes('location_services')) complexityScore += 2;
        if (features.includes('analytics')) complexityScore += 1;
        if (features.includes('admin_panel')) complexityScore += 2;
        
        // Backend complexity
        if (formData.backendRequirements === 'need_backend') complexityScore += 3;
        if (formData.integrations && formData.integrations.length > 0) complexityScore += formData.integrations.length;
        
        if (complexityScore <= 10) return 'low';
        if (complexityScore <= 20) return 'medium';
        return 'high';
    }

    estimateTeamSize(formData) {
        const complexity = this.assessComplexity(formData);
        const features = formData.main_features || [];
        
        if (complexity === 'low') return 2; // 1 developer + 1 designer
        if (complexity === 'medium') return 3; // 2 developers + 1 designer
        return 4; // 2 developers + 1 designer + 1 project manager
    }

    getFallbackCostEstimate(formData) {
        console.log('Using fallback cost estimation');
        const features = formData.main_features || [];
        const complexity = this.assessComplexity(formData);
        
        let baseCost = 0;
        const featureCosts = [];
        
        // Base pricing for Nepal market
        const rates = {
            low: { hourly: 15, multiplier: 1 },
            medium: { hourly: 20, multiplier: 1.5 },
            high: { hourly: 25, multiplier: 2 }
        };
        
        const rate = rates[complexity];
        
        // Calculate feature costs
        features.forEach(feature => {
            const cost = this.getFeatureCost(feature, rate);
            featureCosts.push({
                feature: this.getFeatureDisplayName(feature),
                complexity: complexity,
                hours: cost.hours,
                cost: cost.cost,
                description: this.getFeatureDescription(feature)
            });
            baseCost += cost.cost;
        });
        
        // If no features selected, provide minimum cost
        if (baseCost === 0) {
            baseCost = 800; // Minimum project cost for basic app
        }
        
        // Calculate breakdown costs
        const developmentCost = baseCost * 0.7;
        const designCost = 240;
        const testingCost = 225;
        const pmCost = 150;
        const totalCost = developmentCost + designCost + testingCost + pmCost;
        
        return {
            totalCost: {
                usd: totalCost,
                npr: totalCost * 133, // Approximate USD to NPR conversion
                currency: "USD"
            },
            breakdown: {
                development: { hours: featureCosts.reduce((sum, f) => sum + f.hours, 0) || 40, rate: rate.hourly, cost: developmentCost },
                design: { hours: 20, rate: 12, cost: designCost },
                testing: { hours: 15, rate: 15, cost: testingCost },
                projectManagement: { hours: 10, rate: 15, cost: pmCost }
            },
            featureCosts: featureCosts.length > 0 ? featureCosts : [
                {
                    feature: "Basic App Development",
                    complexity: complexity,
                    hours: 40,
                    cost: developmentCost,
                    description: "Core application development"
                }
            ],
            recommendations: [
                "Consider starting with MVP features first",
                "Plan for 20% buffer in timeline and budget",
                "Regular client feedback sessions recommended"
            ]
        };
    }

    getFallbackTimelineEstimate(formData) {
        const features = formData.main_features || [];
        const complexity = this.assessComplexity(formData);
        
        const baseWeeks = {
            low: 4,
            medium: 8,
            high: 12
        };
        
        const weeks = baseWeeks[complexity] + Math.ceil(features.length / 2);
        
        return {
            totalDuration: {
                weeks: weeks,
                days: weeks * 7,
                workingDays: weeks * 5
            },
            phases: [
                {
                    phase: "Planning & Design",
                    duration: { weeks: 1, days: 7 },
                    description: "Project setup, UI/UX design, architecture planning",
                    deliverables: ["Wireframes", "Design mockups", "Technical architecture"]
                },
                {
                    phase: "Development",
                    duration: { weeks: weeks - 2, days: (weeks - 2) * 7 },
                    description: "Core feature development and integration",
                    deliverables: ["Working app", "Feature implementations"]
                },
                {
                    phase: "Testing & Deployment",
                    duration: { weeks: 1, days: 7 },
                    description: "Quality assurance, testing, and app store deployment",
                    deliverables: ["Tested app", "App store submission"]
                }
            ],
            featureTimelines: features.map(feature => ({
                feature: this.getFeatureDisplayName(feature),
                complexity: complexity,
                duration: { days: this.getFeatureDays(feature), hours: this.getFeatureDays(feature) * 8 },
                dependencies: [],
                description: this.getFeatureDescription(feature)
            })),
            milestones: [
                { milestone: "Project Kickoff", week: 1, description: "Team alignment and project setup" },
                { milestone: "Design Approval", week: 2, description: "Client approves UI/UX designs" },
                { milestone: "MVP Ready", week: Math.ceil(weeks * 0.6), description: "Minimum viable product completed" },
                { milestone: "Final Delivery", week: weeks, description: "Project completion and handover" }
            ],
            riskFactors: [
                { risk: "Scope creep", impact: "medium", mitigation: "Clear requirements documentation" },
                { risk: "Technical challenges", impact: "high", mitigation: "Proof of concept for complex features" },
                { risk: "Client feedback delays", impact: "medium", mitigation: "Scheduled review meetings" }
            ]
        };
    }

    getFallbackRoadmap(formData) {
        const features = formData.main_features || [];
        
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
                                duration: { days: 2, hours: 16 },
                                priority: "high",
                                dependencies: [],
                                deliverables: ["Project structure", "Git repository"],
                                dailySchedule: [
                                    {
                                        day: 1,
                                        date: "Day 1",
                                        timeSlots: [
                                            { time: "9:00 AM - 12:00 PM", duration: "3 hours", task: "Initialize Flutter project", description: "Create new Flutter project with proper structure", deliverable: "Project skeleton" },
                                            { time: "1:00 PM - 5:00 PM", duration: "4 hours", task: "Set up Git repository", description: "Initialize Git, create branches, set up CI/CD", deliverable: "Version control setup" }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                algorithms: features.map(feature => ({
                    feature: this.getFeatureDisplayName(feature),
                    algorithm: `Algorithm for ${this.getFeatureDisplayName(feature)}`,
                    steps: [
                        { step: 1, description: "Analyze requirements", timeEstimate: "2 hours", tools: ["Documentation"], output: "Requirements document" },
                        { step: 2, description: "Design architecture", timeEstimate: "4 hours", tools: ["Figma", "Draw.io"], output: "Architecture diagram" },
                        { step: 3, description: "Implement feature", timeEstimate: "16 hours", tools: ["Flutter", "VS Code"], output: "Working feature" }
                    ],
                    flowchart: "Detailed flowchart for feature implementation",
                    codeStructure: "Recommended code structure and patterns"
                })),
                techStack: {
                    frontend: ["Flutter", "Dart", "Material Design"],
                    backend: ["Node.js", "Express", "MongoDB"],
                    database: ["MongoDB", "Firebase"],
                    tools: ["VS Code", "Android Studio", "Git"],
                    libraries: ["Provider", "HTTP", "Shared Preferences"]
                },
                bestPractices: [
                    "Follow Flutter best practices and conventions",
                    "Implement proper error handling",
                    "Write unit tests for critical functions",
                    "Use state management solutions",
                    "Optimize for performance"
                ],
                commonChallenges: [
                    {
                        challenge: "State management complexity",
                        solution: "Use Provider or Bloc pattern",
                        prevention: "Plan state structure early"
                    }
                ]
            }
        };
    }

    getFeatureCost(feature, rate) {
        const featureCosts = {
            'authentication': { hours: 16, baseCost: 200 },
            'user_management': { hours: 12, baseCost: 150 },
            'search_filter': { hours: 8, baseCost: 100 },
            'payment_system': { hours: 24, baseCost: 400 },
            'notifications': { hours: 10, baseCost: 125 },
            'messaging': { hours: 20, baseCost: 300 },
            'location_services': { hours: 12, baseCost: 150 },
            'media_handling': { hours: 16, baseCost: 200 },
            'social_integration': { hours: 14, baseCost: 175 },
            'analytics': { hours: 8, baseCost: 100 },
            'offline_mode': { hours: 18, baseCost: 225 },
            'admin_panel': { hours: 20, baseCost: 300 }
        };
        
        const featureData = featureCosts[feature] || { hours: 10, baseCost: 125 };
        const calculatedCost = featureData.baseCost * rate.multiplier;
        
        return {
            hours: featureData.hours,
            cost: Math.max(calculatedCost, 100) // Ensure minimum cost of $100
        };
    }

    getFeatureDays(feature) {
        const featureDays = {
            'authentication': 3,
            'user_management': 2,
            'search_filter': 1,
            'payment_system': 5,
            'notifications': 2,
            'messaging': 4,
            'location_services': 3,
            'media_handling': 3,
            'social_integration': 3,
            'analytics': 2,
            'offline_mode': 4,
            'admin_panel': 4
        };
        
        return featureDays[feature] || 2;
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
            'authentication': 'Secure user login and registration system',
            'user_management': 'User profile creation and management',
            'search_filter': 'Content search and filtering capabilities',
            'payment_system': 'Payment processing and e-commerce features',
            'notifications': 'Push notification system',
            'messaging': 'Real-time messaging and chat functionality',
            'location_services': 'GPS and location-based features',
            'media_handling': 'Image, video, and file upload/management',
            'social_integration': 'Social media platform integration',
            'analytics': 'User behavior and app performance analytics',
            'offline_mode': 'Offline functionality and data sync',
            'admin_panel': 'Administrative dashboard and controls'
        };
        return descriptionMap[feature] || 'Feature implementation';
    }
}

// Export for use in other files
window.GeminiPricingService = GeminiPricingService;
