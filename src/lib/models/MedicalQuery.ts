/**
 * Medical Query Model Definition
 * @module models/MedicalQuery
 * 
 * Defines the structure for medical queries submitted by users.
 * Tracks the processing status and results of medical text clarification requests.
 */

import { BaseModel } from '../types/base'
import { ObjectId } from 'mongodb'

export interface MedicalQuery extends BaseModel {
    /** Reference to the user who created the query */
    userId: ObjectId
    /** Original medical text submitted by the user */
    originalText: string
    /** Clarified version of the medical text */
    clarifiedText: string
    /** Current status of the query processing */
    status: 'pending' | 'completed' | 'failed'
    /** Additional processing metadata */
    metadata?: {
        /** When the query was processed */
        processedAt?: Date
        /** AI model used for clarification */
        aiModel?: string
        /** Confidence score of the clarification */
        confidence?: number
    }
}

/** Type for creating new medical queries, excluding auto-generated fields */
export type CreateMedicalQueryInput = Omit<MedicalQuery, '_id' | 'createdAt' | 'updatedAt'>