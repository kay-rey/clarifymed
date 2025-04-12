/**
 * Base Model Types
 * Defines foundational types used across all database models.
 * These types ensure consistent structure for all documents in MongoDB.
 */

import { ObjectId } from 'mongodb'

/** Base interface that all database models should extend */
export interface BaseModel {
    /** MongoDB document unique identifier */
    _id: ObjectId
    createdAt: Date
    updatedAt: Date
}

/** Base type for creating new documents, excluding auto-generated fields */
export type CreateBaseInput = Omit<BaseModel, '_id' | 'createdAt' | 'updatedAt'>

/** Shared metadata interface for tracking AI processing */
export interface AIProcessingMetadata {
    /** When the content was processed */
    processedAt?: Date
    /** Which model version was used */
    model: string
    /** Confidence score of the processing (0-1) */
    confidence?: number
    /** Gemini-specific configuration */
    geminiConfig?: {
        temperature?: number
        topK?: number
        topP?: number
        maxOutputTokens?: number
    }
    /** Safety ratings from AI processing */
    safetyRatings?: {
        category: string
        probability: string
    }[]
}

/** Shared error tracking interface */
export interface ProcessingError {
    code: string
    message: string
    timestamp: Date
}