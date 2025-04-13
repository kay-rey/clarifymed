# ClarifyMed API Documentation

## Endpoints

### Medical Queries

#### POST /api/medical-queries
Create a new medical query.

**Request Body:**
```typescript
{
  userId: string;
  question: string;
}
```

**Response:**
```typescript
{
  id: string;
  status: "pending" | "completed" | "failed";
}
```

#### GET /api/medical-queries
Retrieve medical queries for a user.

**Query Parameters:**
- `userId`: string (required)
- `status`: string (optional)

### Saved Responses

#### POST /api/saved-responses
Save an AI response.

#### GET /api/saved-responses
Retrieve saved responses for a user.