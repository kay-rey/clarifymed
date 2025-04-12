import { MongoClient } from 'mongodb'
import { Collections } from '../schema'
import { getDb } from '../dbConnect'

let client: MongoClient

/**
 * Sets up a test database connection
 * @returns Promise<Collections> - Database collections for testing
 */
export async function setupTestDb(): Promise<Collections> {
    // Ensure we have test database configuration
    if (!process.env.MONGODB_URI || !process.env.MONGODB_DB) {
        throw new Error('Missing test database configuration in .env.test')
    }

    try {
        client = new MongoClient(process.env.MONGODB_URI)
        await client.connect()
        return getDb()
    } catch (error) {
        console.error('Failed to setup test database:', error)
        throw error
    }
}

/**
 * Clears all test data from collections
 */
export async function clearTestDb(): Promise<void> {
    try {
        const db = client.db(process.env.MONGODB_DB)
        const collections = await db.collections()
        
        // Clear all collections in parallel
        await Promise.all(
            collections.map(collection => collection.deleteMany({}))
        )
    } catch (error) {
        console.error('Failed to clear test database:', error)
        throw error
    }
}

/**
 * Closes the test database connection
 */
export async function closeTestDb(): Promise<void> {
    try {
        await client.close()
    } catch (error) {
        console.error('Failed to close test database connection:', error)
        throw error
    }
}