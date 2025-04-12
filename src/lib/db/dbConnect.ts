/**
 * Database Connection Helper
 * @module db/dbConnect
 * 
 * Provides a cached connection to MongoDB and manages collection access.
 * Implements connection pooling to optimize database performance.
 */

import clientPromise from './mongodb'
import { getCollections, Collections } from './schema'

// Cache the database connection
let cachedCollections: Collections | null = null

/**
 * Gets a database connection and collection references
 * Uses caching to prevent multiple connection instances
 */
export async function getDb(): Promise<Collections> {
    if (cachedCollections) {
        return cachedCollections
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'clarifymed')

    cachedCollections = await getCollections(db)
    return cachedCollections
}