# SRS Form with AI Pricing & Roadmap Generation

A comprehensive Software Requirements Specification (SRS) form with AI-powered cost estimation and developer roadmap generation using Google Gemini API.

## Features

- 📝 **Multi-step SRS Form**: Comprehensive project requirements collection
- 🤖 **AI Cost Estimation**: Dynamic pricing based on features and complexity
- 🗺️ **Developer Roadmap**: Detailed implementation guide with daily schedules
- 📊 **Project Timeline**: Accurate time estimation for development phases
- 💰 **Nepal Market Pricing**: Localized pricing for Nepal development market
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

### 3. Access the Application
Open your browser and go to: `http://localhost:3000`

## Production Deployment

### For sureshyadav.info.np

1. **Upload Files**: Upload all files to your web server
2. **Install Node.js**: Ensure Node.js is installed on your server
3. **Install Dependencies**: Run `npm install` on your server
4. **Start Server**: Run `npm start` or use PM2 for process management
5. **Configure Domain**: Point your domain to the server port (3000 or configure reverse proxy)

### Using PM2 (Recommended for Production)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "srs-form"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### Nginx Reverse Proxy Configuration
```nginx
server {
    listen 80;
    server_name sureshyadav.info.np;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## API Configuration

The application uses Google Gemini API for AI-powered estimations. The API key is configured in `server.js`:

```javascript
const apiKey = "AIzaSyBG-2d7HZZ8vwoz-bqF3JpischbYz29jTA";
```

**Security Note**: In production, consider moving the API key to environment variables:

```javascript
const apiKey = process.env.GEMINI_API_KEY || "your-api-key";
```

## File Structure

```
srs-form/
├── index.html              # Main SRS form page
├── srs-preview.html        # SRS document preview
├── srs-script.js          # Frontend JavaScript logic
├── srs-style.css          # Styling for the application
├── gemini-pricing.js      # AI pricing service
├── server.js              # Backend server with API proxy
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## Features Breakdown

### SRS Form Steps
1. **Client Information**: Name, email, phone
2. **Project Details**: Name, type, description
3. **Main Features**: Core functionality selection
4. **Sub Features**: Detailed feature breakdown
5. **Technical Requirements**: Platform, database, integrations
6. **Design Preferences**: UI/UX requirements
7. **Timeline & Budget**: Project constraints
8. **AI Estimation**: Cost and timeline generation
9. **Additional Information**: Extra requirements

### AI-Powered Features
- **Cost Estimation**: Based on selected features and complexity
- **Timeline Calculation**: Realistic development timeframes
- **Developer Roadmap**: Daily implementation schedules
- **Feature Pricing**: Individual feature cost breakdown
- **Market Analysis**: Nepal-specific pricing considerations

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure you're using the backend server, not opening HTML files directly
2. **API Errors**: Check if the Gemini API key is valid and has sufficient quota
3. **Port Conflicts**: Change the port in `server.js` if port 3000 is occupied

### Debug Mode
Enable detailed logging by checking browser console for:
- API request/response logs
- Error messages
- Fallback estimation usage

## Support

For issues or questions, check the browser console for error messages and ensure all dependencies are properly installed.

## License

This project is for personal/portfolio use. Ensure compliance with Google Gemini API terms of service.
