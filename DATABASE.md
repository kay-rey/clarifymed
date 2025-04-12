# Database Documentation

## Models

### Users
- Store user information and preferences
- Indexed by email and auth0Id
- See `src/lib/models/User.ts`

### Medical Terms
- Cache for medical terminology
- Full-text search enabled
- Usage tracking included
- See `src/lib/models/MedicalTerm.ts`

### Medical Queries
- Store user queries for medical text clarification
- Tracks processing status
- See `src/lib/models/MedicalQuery.ts`

## Environment Setup

1. Create `.env.local`:
```
MONGODB_URI=your_mongodb_uri
MONGODB_DB=clarifymed
```

2. Create `.env.test` for testing:
```
MONGODB_URI=your_test_mongodb_uri
MONGODB_DB=clarifymed_test
```

## API Routes

- `/api/users` - User management
- `/api/medical-terms` - Medical terminology
- `/api/medical-queries` - Query processing
- `/api/health` - Database health check

## Indexes
See `src/lib/db/schema.ts` for index configurations.