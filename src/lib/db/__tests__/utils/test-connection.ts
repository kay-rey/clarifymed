import { getDb } from '@/lib/db/dbConnect'

async function testMyConnection() {
    try {
        const collections = await getDb()
        const result = await collections.users.findOne({})
        console.log('✅ My connection works!')
        console.log('Database:', process.env.MONGODB_DB)
        console.log('Connected as:', new URL(process.env.MONGODB_URI!).username)
        process.exit(0)
    } catch (error) {
        console.error('❌ Connection failed:', error)
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
        process.exit(1)
    }
}

testMyConnection()