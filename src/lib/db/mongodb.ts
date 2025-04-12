/**
 * MongoDB Connection Configuration
 * @module mongodb
 * 
 * This file establishes and manages the MongoDB connection using a singleton pattern.
 * It handles both development and production environments differently:
 * - In development: Uses a global variable to preserve connection across hot reloads
 * - In production: Creates new connections as needed
 */

import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Development environment handling
if (process.env.NODE_ENV === 'development') {
    // Use global variable to preserve connection across module reloads (HMR)
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options)
        globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
} else {
    // Production environment: new connection for each instance
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}

export default clientPromise