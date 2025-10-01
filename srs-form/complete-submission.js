// Complete Document Submission System
class CompleteSubmissionService {
    constructor(srsPreview) {
        this.srsPreview = srsPreview;
    }

    async submitCompletePackage() {
        try {
            console.log('Starting complete package submission...');
            
            // Prepare the complete document package
            const packageData = await this.prepareCompleteDocumentPackage();
            
            // Create comprehensive email content
            const emailContent = this.createCompleteEmailContent(packageData);
            
            // Submit to Web3Forms
            await this.submitToWeb3Forms(emailContent, packageData);
            
        } catch (error) {
            console.error('Error in complete submission:', error);
            throw error;
        }
    }

    async prepareCompleteDocumentPackage() {
        console.log('Preparing complete document package...');
        
        // Get all document contents
        const srsContent = this.srsPreview.srsDocument.innerHTML;
        const contractContent = this.srsPreview.contractDocument.innerHTML;
        const pricingContent = this.srsPreview.pricingDocument.innerHTML;
        const roadmapContent = this.srsPreview.roadmapDocument.innerHTML;
        const summaryContent = this.srsPreview.summaryDocument.innerHTML;
        const termsContent = this.srsPreview.termsDocument.innerHTML;
        const privacyContent = this.srsPreview.privacyDocument.innerHTML;
        
        // Create comprehensive package
        const packageData = {
            projectInfo: {
                projectName: this.srsPreview.formData.projectName || 'Not specified',
                clientName: this.srsPreview.formData.clientName || 'Not specified',
                clientEmail: this.srsPreview.formData.clientEmail || 'Not specified',
                clientPhone: this.srsPreview.formData.clientPhone || 'Not specified',
                projectType: this.srsPreview.formData.projectType || 'Not specified',
                projectDescription: this.srsPreview.formData.projectDescription || 'Not specified',
                targetAudience: this.srsPreview.formData.targetAudience || 'Not specified',
                primaryMarkets: this.srsPreview.formData.primaryMarkets || 'Not specified',
                platforms: Array.isArray(this.srsPreview.formData.platforms) ? 
                    this.srsPreview.formData.platforms.join(', ') : 
                    this.srsPreview.formData.platforms || 'Not specified',
                mainFeatures: this.srsPreview.formData.main_features || [],
                subFeatures: this.srsPreview.formData.sub_features || [],
                projectTimeline: this.srsPreview.formData.projectTimeline || 'Not specified',
                budgetRange: this.srsPreview.formData.budgetRange || 'Not specified',
                developmentPhase: this.srsPreview.formData.developmentPhase || 'Not specified',
                additionalNotes: this.srsPreview.formData.additionalNotes || 'None',
                submissionDate: new Date().toLocaleString()
            },
            documents: {
                srsDocument: {
                    title: 'Software Requirements Specification',
                    content: srsContent,
                    wordCount: this.getWordCount(srsContent)
                },
                projectAgreement: {
                    title: 'Project Agreement & Contract',
                    content: contractContent,
                    wordCount: this.getWordCount(contractContent)
                },
                pricingTimeline: {
                    title: 'Pricing & Timeline Estimation',
                    content: pricingContent,
                    wordCount: this.getWordCount(pricingContent)
                },
                developerRoadmap: {
                    title: 'Developer Roadmap & Implementation Guide',
                    content: roadmapContent,
                    wordCount: this.getWordCount(roadmapContent)
                },
                projectSummary: {
                    title: 'Project Summary & Overview',
                    content: summaryContent,
                    wordCount: this.getWordCount(summaryContent)
                },
                termsConditions: {
                    title: 'Terms and Conditions',
                    content: termsContent,
                    wordCount: this.getWordCount(termsContent)
                },
                privacyPolicy: {
                    title: 'Privacy Policy',
                    content: privacyContent,
                    wordCount: this.getWordCount(privacyContent)
                }
            },
            statistics: {
                totalDocuments: 7,
                totalWordCount: this.getWordCount(srsContent) + this.getWordCount(contractContent) + 
                              this.getWordCount(pricingContent) + this.getWordCount(roadmapContent) + 
                              this.getWordCount(summaryContent) + this.getWordCount(termsContent) + 
                              this.getWordCount(privacyContent),
                featuresCount: this.srsPreview.formData.main_features ? this.srsPreview.formData.main_features.length : 0,
                subFeaturesCount: this.srsPreview.formData.sub_features ? this.srsPreview.formData.sub_features.length : 0
            }
        };
        
        console.log('Complete package prepared:', packageData);
        return packageData;
    }

    createCompleteEmailContent(packageData) {
        const { projectInfo, documents, statistics } = packageData;
        
        let content = `🎯 COMPLETE SRS PROJECT PACKAGE SUBMISSION\n`;
        content += `==========================================\n\n`;
        
        // Project Overview
        content += `📋 PROJECT OVERVIEW\n`;
        content += `-------------------\n`;
        content += `Project Name: ${projectInfo.projectName}\n`;
        content += `Client: ${projectInfo.clientName}\n`;
        content += `Email: ${projectInfo.clientEmail}\n`;
        content += `Phone: ${projectInfo.clientPhone}\n`;
        content += `Project Type: ${projectInfo.projectType}\n`;
        content += `Description: ${projectInfo.projectDescription}\n`;
        content += `Target Audience: ${projectInfo.targetAudience}\n`;
        content += `Primary Markets: ${projectInfo.primaryMarkets}\n`;
        content += `Platforms: ${projectInfo.platforms}\n`;
        content += `Timeline: ${projectInfo.projectTimeline}\n`;
        content += `Budget Range: ${projectInfo.budgetRange}\n`;
        content += `Development Phase: ${projectInfo.developmentPhase}\n`;
        content += `Submission Date: ${projectInfo.submissionDate}\n\n`;
        
        // Features Summary
        content += `🔧 SELECTED FEATURES (${statistics.featuresCount} main features)\n`;
        content += `----------------------------------------\n`;
        if (projectInfo.mainFeatures && projectInfo.mainFeatures.length > 0) {
            projectInfo.mainFeatures.forEach(feature => {
                content += `• ${this.getFeatureDisplayName(feature)}\n`;
            });
        } else {
            content += `• No features selected\n`;
        }
        content += `\n`;
        
        // Document Statistics
        content += `📊 DOCUMENT PACKAGE STATISTICS\n`;
        content += `-----------------------------\n`;
        content += `Total Documents: ${statistics.totalDocuments}\n`;
        content += `Total Word Count: ${statistics.totalWordCount.toLocaleString()} words\n`;
        content += `Main Features: ${statistics.featuresCount}\n`;
        content += `Sub Features: ${statistics.subFeaturesCount}\n\n`;
        
        // Document Contents
        content += `📄 COMPLETE DOCUMENT PACKAGE\n`;
        content += `============================\n\n`;
        
        // SRS Document
        content += `1️⃣ SOFTWARE REQUIREMENTS SPECIFICATION\n`;
        content += `----------------------------------------\n`;
        content += `Word Count: ${documents.srsDocument.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.srsDocument.content);
        content += `\n\n`;
        
        // Project Agreement
        content += `2️⃣ PROJECT AGREEMENT & CONTRACT\n`;
        content += `--------------------------------\n`;
        content += `Word Count: ${documents.projectAgreement.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.projectAgreement.content);
        content += `\n\n`;
        
        // Pricing & Timeline
        content += `3️⃣ PRICING & TIMELINE ESTIMATION\n`;
        content += `---------------------------------\n`;
        content += `Word Count: ${documents.pricingTimeline.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.pricingTimeline.content);
        content += `\n\n`;
        
        // Developer Roadmap
        content += `4️⃣ DEVELOPER ROADMAP & IMPLEMENTATION GUIDE\n`;
        content += `--------------------------------------------\n`;
        content += `Word Count: ${documents.developerRoadmap.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.developerRoadmap.content);
        content += `\n\n`;
        
        // Project Summary
        content += `5️⃣ PROJECT SUMMARY & OVERVIEW\n`;
        content += `-----------------------------\n`;
        content += `Word Count: ${documents.projectSummary.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.projectSummary.content);
        content += `\n\n`;
        
        // Terms and Conditions
        content += `6️⃣ TERMS AND CONDITIONS\n`;
        content += `------------------------\n`;
        content += `Word Count: ${documents.termsConditions.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.termsConditions.content);
        content += `\n\n`;
        
        // Privacy Policy
        content += `7️⃣ PRIVACY POLICY\n`;
        content += `-----------------\n`;
        content += `Word Count: ${documents.privacyPolicy.wordCount} words\n`;
        content += `Content:\n`;
        content += this.stripHtmlTags(documents.privacyPolicy.content);
        content += `\n\n`;
        
        // Footer
        content += `==========================================\n`;
        content += `✅ COMPLETE PACKAGE SUBMITTED SUCCESSFULLY\n`;
        content += `This comprehensive package includes all AI-generated documents\n`;
        content += `tailored specifically for this project requirements.\n`;
        content += `Generated on: ${new Date().toLocaleString()}\n`;
        
        return content;
    }

    async submitToWeb3Forms(emailContent, packageData) {
        try {
            const formData = new FormData();
            formData.append('access_key', '7f6edf0a-47e0-49a4-bebf-2a8be167a68b');
            formData.append('subject', `Complete SRS Package - ${this.srsPreview.formData.projectName || 'Flutter Project'}`);
            formData.append('from_name', this.srsPreview.formData.clientName || 'SRS Form');
            formData.append('message', emailContent);
            formData.append('redirect', 'true');
            formData.append('redirect_url', '../index.html?submitted=true');

            // Add package data as additional fields
            if (packageData) {
                formData.append('project_name', packageData.projectInfo.projectName);
                formData.append('client_email', packageData.projectInfo.clientEmail);
                formData.append('total_documents', packageData.statistics.totalDocuments.toString());
                formData.append('total_word_count', packageData.statistics.totalWordCount.toString());
                formData.append('features_count', packageData.statistics.featuresCount.toString());
            }

            console.log('Submitting complete package to Web3Forms...');
            console.log('Email content length:', emailContent.length);
            console.log('Package data:', packageData ? 'Included' : 'Not included');

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Submission successful:', result);
                
                this.srsPreview.showToast('🎉 Complete SRS Package submitted successfully! All 5 documents have been sent. I\'ll review your comprehensive requirements and get back to you soon.', 'success');
                
                // Reset button after successful submission
                setTimeout(() => {
                    this.srsPreview.submitBtn.disabled = false;
                    this.srsPreview.submitBtn.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text">Package Submitted Successfully</span>';
                }, 3000);
                
            } else {
                throw new Error(`Submission failed: ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error submitting to Web3Forms:', error);
            this.srsPreview.showToast(`Submission failed: ${error.message}. Please try again.`, 'error');
            
            // Reset button on error
            this.srsPreview.submitBtn.disabled = false;
            this.srsPreview.submitBtn.innerHTML = '<span class="btn-icon">📤</span><span class="btn-text">Submit Complete Package</span>';
        }
    }

    getWordCount(htmlContent) {
        // Remove HTML tags and count words
        const textContent = htmlContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return textContent.split(' ').length;
    }

    stripHtmlTags(htmlContent) {
        // Convert HTML to plain text while preserving structure
        let text = htmlContent
            .replace(/<h[1-6][^>]*>/g, '\n\n')
            .replace(/<\/h[1-6]>/g, '\n')
            .replace(/<p[^>]*>/g, '\n')
            .replace(/<\/p>/g, '\n')
            .replace(/<br[^>]*>/g, '\n')
            .replace(/<li[^>]*>/g, '\n• ')
            .replace(/<\/li>/g, '')
            .replace(/<ul[^>]*>/g, '\n')
            .replace(/<\/ul>/g, '\n')
            .replace(/<ol[^>]*>/g, '\n')
            .replace(/<\/ol>/g, '\n')
            .replace(/<div[^>]*>/g, '\n')
            .replace(/<\/div>/g, '\n')
            .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
            .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple newlines
            .replace(/^\s+|\s+$/g, '') // Trim
            .substring(0, 5000); // Limit length for email
        
        return text;
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
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompleteSubmissionService;
} else {
    window.CompleteSubmissionService = CompleteSubmissionService;
}
