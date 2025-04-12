/**
 * User Model Definition
 * @module models/User
 * 
 * Defines the structure and types for user documents in the database.
 * Handles user authentication and preference management.
 */

import { BaseModel } from '../types/base'

export interface User extends BaseModel {
    email: string
    name: string
    /** Auth0 unique identifier for authentication */
    auth0Id: string
    /** User preferences and settings */
    preferences?: {
        /** Preferred interface language */
        language?: string
        notifications?: boolean
    }
}

/** Type for creating new users, excluding auto-generated fields */
export type CreateUserInput = Omit<User, '_id' | 'createdAt' | 'updatedAt'>