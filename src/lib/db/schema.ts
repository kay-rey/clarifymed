import { Collection, Db } from 'mongodb'
import { User } from '../models/User'
import { MedicalTerm } from '../models/MedicalTerm'
import { MedicalQuery } from '../models/MedicalQuery'

export interface Collections {
    users: Collection<User>
    medicalTerms: Collection<MedicalTerm>
    medicalQueries: Collection<MedicalQuery>
    db: Db  // Add this to access raw database operations
}

export async function getCollections(db: Db): Promise<Collections> {
    const users = db.collection<User>('users')
    const medicalTerms = db.collection<MedicalTerm>('medicalTerms')
    const medicalQueries = db.collection<MedicalQuery>('medicalQueries')
    
    // User collection indexes
    await users.createIndex({ email: 1 }, { unique: true })
    await users.createIndex({ auth0Id: 1 }, { unique: true })
    
    // Medical Terms indexes
    await medicalTerms.createIndex({ term: 1 }, { unique: true })
    await medicalTerms.createIndex({ term: 'text', synonyms: 'text' }) // Enable full-text search
    await medicalTerms.createIndex({ category: 1 }) // For category filtering
    await medicalTerms.createIndex({ 'usage.searchCount': -1 }) // For popularity-based sorting
    await medicalTerms.createIndex({ 'metadata.complexity': 1 }) // For complexity filtering
    await medicalTerms.createIndex({ 'metadata.language': 1 }) // For language-based queries
    
    // Medical Queries indexes
    await medicalQueries.createIndex({ userId: 1 }) // For user's queries lookup
    await medicalQueries.createIndex({ status: 1 }) // For status-based filtering
    await medicalQueries.createIndex({ createdAt: -1 }) // For time-based sorting
    await medicalQueries.createIndex({ 'metadata.processedAt': 1 }) // For processing time queries
    
    return { users, medicalTerms, medicalQueries, db }
}