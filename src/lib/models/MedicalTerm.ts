/**
 * Medical Term Model Definition
 * @module models/MedicalTerm
 * 
 * Defines the structure for medical terminology storage.
 * Acts as a cache to reduce API calls and provides quick access to common medical terms.
 * Includes usage tracking and verification status management.
 */

import { BaseModel } from '../types/base'
import { ObjectId } from 'mongodb'

export interface MedicalTerm extends BaseModel {
    /** The medical term/phrase */
    term: string
    /** Simplified explanation for non-medical professionals */
    definition: string
    /** Detailed medical/technical explanation */
    technicalDefinition?: string
    /** Categories for organization (e.g., ['cardiology', 'anatomy']) */
    category?: string[]
    /** Alternative names or spellings */
    synonyms?: string[]
    /** References to related medical terms */
    relatedTerms?: ObjectId[]
    /** Origin of the definition */
    source?: string
    /** Last verification timestamp */
    lastVerified?: Date
    /** Usage statistics */
    usage?: {
        /** Number of times this term was queried */
        searchCount: number
        /** Last access timestamp */
        lastAccessed: Date
    }
    /** Additional term metadata */
    metadata?: {
        /** Indicates the term's complexity level */
        complexity: 'basic' | 'intermediate' | 'advanced'
        /** Definition language (e.g., 'en' for English) */
        language: string
        /** Professional verification status */
        verified: boolean
    }
}

/** Type for creating new medical terms, excluding auto-generated fields */
export type CreateMedicalTermInput = Omit<MedicalTerm, '_id' | 'createdAt' | 'updatedAt'>