# Environment Setup Guide

## Required Environment Variables

```bash
# Auth0 Configuration
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret

# MongoDB Configuration
MONGODB_URI=mongodb+srv://...

# Gemini AI Configuration
GEMINI_API_KEY=your-api-key
```

## Development Environment

1. **Node.js Setup**
   - Required version: 18.x or higher
   - Use nvm for version management

2. **MongoDB Setup**
   - Local development using MongoDB Compass
   - Database name: clarifymed
   - Required collections: users, medicalQueries, savedResponses

3. **Auth0 Setup**
   - Application type: Regular Web Application
   - Allowed Callbacks: http://localhost:3000/api/auth/callback