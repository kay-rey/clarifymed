# ClarifyMed Database Documentation

## Overview
ClarifyMed uses MongoDB Atlas for data persistence. Each developer should use their own MongoDB Atlas account for development.

## Environment Setup

### 1. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Set up database access user
5. Configure network access (IP whitelist)

### 2. Local Configuration
Create `.env.local` in project root:
```plaintext
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/clarifymed?retryWrites=true&w=majority
MONGODB_DB=clarifymed
```

### 3. Verify Setup
Run environment verification:
```bash
npm run verify-env
```

## Database Models

### Users Collection
```typescript
interface User {
    _id: ObjectId
    email: string
    name: string
    auth0Id: string
    createdAt: Date
    updatedAt: Date
}
```

### Medical Terms Collection
```typescript
interface MedicalTerm {
    _id: ObjectId
    term: string
    definition: string
    technicalDefinition?: string
    category?: string[]
    synonyms?: string[]
    metadata: {
        complexity: 'basic' | 'intermediate' | 'advanced'
        language: string
        verified: boolean
    }
    usage: {
        searchCount: number
        lastAccessed: Date
    }
}
```

### Medical Queries Collection
```typescript
interface MedicalQuery {
    _id: ObjectId
    userId: ObjectId
    originalText: string
    clarifiedText: string
    status: 'pending' | 'completed' | 'failed'
    metadata: {
        model: 'gemini-2.0-flash'
        geminiConfig: {
            temperature: number
            topP: number
            topK: number
            maxOutputTokens: number
        }
    }
}
```

## API Routes

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get users
- `GET /api/users?email=` - Get user by email

### Medical Terms
- `POST /api/medical-terms` - Create term
- `GET /api/medical-terms` - List terms
- `GET /api/medical-terms?term=` - Search terms

### Medical Queries
- `POST /api/medical-queries` - Create query
- `GET /api/medical-queries` - List queries
- `GET /api/medical-queries?userId=` - Get user's queries

## Development Scripts

### Test Database Connection
```bash
npm run test:db
```

### Verify Environment
```bash
npm run verify-env
```

### Seed Test Data
```bash
npm run seed
```

## Important Notes
- Never commit `.env.local` or credentials
- Use your own MongoDB Atlas account
- Keep database name as `clarifymed`
- Run tests before committing changes

## Database Indexes

### Users Collection
```javascript
users.createIndex({ email: 1 }, { unique: true })
users.createIndex({ auth0Id: 1 }, { unique: true })
```

### Medical Terms Collection
```javascript
medicalTerms.createIndex({ term: 1 }, { unique: true })
medicalTerms.createIndex({ term: 'text', synonyms: 'text' })
medicalTerms.createIndex({ category: 1 })
medicalTerms.createIndex({ 'usage.searchCount': -1 })
```

### Medical Queries Collection
```javascript
medicalQueries.createIndex({ userId: 1 })
medicalQueries.createIndex({ status: 1 })
medicalQueries.createIndex({ createdAt: -1 })
```