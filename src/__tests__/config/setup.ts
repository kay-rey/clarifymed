import * as dotenv from 'dotenv'
import path from 'path'

// Load test environment variables
const envPath = path.join(process.cwd(), '.env.test')
const result = dotenv.config({ path: envPath })

if (result.error) {
    console.warn('Warning: .env.test file not found. Using .env.local for tests')
    // Fallback to .env.local if .env.test doesn't exist
    dotenv.config({ path: path.join(process.cwd(), '.env.local') })
}

// Verify required test environment variables
const requiredVars = ['MONGODB_URI', 'MONGODB_DB']
const missing = requiredVars.filter(varName => !process.env[varName])

if (missing.length > 0) {
    throw new Error(`Missing required test environment variables: ${missing.join(', ')}`)
}