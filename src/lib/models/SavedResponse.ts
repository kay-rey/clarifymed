/**
 * Saved Response Model Definition
 * @module models/SavedResponse
 * 
 * Defines the structure for AI responses saved by users.
 * Tracks the original question, response, and associated metadata.
 */

import { BaseModel } from '../types/base'
import { ObjectId } from 'mongodb'

export interface SavedResponse extends BaseModel {
    /** Reference to the user who saved the response */
    userId: ObjectId
    /** Original question asked by the user */
    question: string
    /** AI-generated response */
    response: string
}

/** Type for creating new saved responses, excluding auto-generated fields */
export type CreateSavedResponseInput = Omit<SavedResponse, '_id' | 'createdAt' | 'updatedAt'>