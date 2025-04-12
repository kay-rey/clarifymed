import * as dotenv from 'dotenv'
import path from 'path'
import { MongoClient } from 'mongodb'

async function verifyEnv() {
    console.log('🔍 Environment Verification')
    console.log('-------------------------')

    // 1. Load Environment File
    const envPath = path.join(process.cwd(), '.env.local')
    const result = dotenv.config({ path: envPath })
    
    console.log('\n1. Environment File Check:')
    if (result.error) {
        console.error('❌ Failed to load .env.local:', result.error.message)
        process.exit(1)
    }
    console.log('✅ .env.local loaded successfully')

    // 2. Verify Required Variables
    console.log('\n2. Required Variables:')
    const requiredVars = ['MONGODB_URI', 'MONGODB_DB']
    let missingVars = false

    for (const varName of requiredVars) {
        if (!process.env[varName]) {
            console.error(`❌ Missing ${varName}`)
            missingVars = true
            continue
        }
        
        // Mask sensitive data in logs
        const value = process.env[varName]
        const maskedValue = varName === 'MONGODB_URI' 
            ? value.replace(/\/\/.*@/, '//***:***@')
            : value
        console.log(`✅ ${varName}: ${maskedValue}`)
    }

    if (missingVars) {
        process.exit(1)
    }

    // 3. Validate MongoDB URI Format
    console.log('\n3. MongoDB URI Validation:')
    try {
        const uri = new URL(process.env.MONGODB_URI!)
        if (uri.protocol !== 'mongodb+srv:') {
            throw new Error('Invalid protocol - must use mongodb+srv://')
        }
        console.log('✅ URI format is valid')
        console.log(`📍 Cluster: ${uri.hostname}`)
        console.log(`👤 Username: ${uri.username}`)
    } catch (error) {
        console.error('❌ Invalid MongoDB URI format:', error instanceof Error ? error.message : 'Unknown error')
        process.exit(1)
    }

    // 4. Test Database Connection
    console.log('\n4. Connection Test:')
    const client = new MongoClient(process.env.MONGODB_URI!)
    try {
        console.log('Attempting connection...')
        await client.connect()
        console.log('✅ Successfully connected to MongoDB')
        
        const db = client.db(process.env.MONGODB_DB)
        await db.command({ ping: 1 })
        console.log('✅ Database ping successful')
    } catch (error) {
        console.error('❌ Connection failed:', error instanceof Error ? error.message : 'Unknown error')
        process.exit(1)
    } finally {
        await client.close()
    }

    console.log('\n✨ All environment checks passed!')
    process.exit(0)
}

verifyEnv().catch(error => {
    console.error('Verification failed:', error)
    process.exit(1)
})