import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/dbConnect'

export async function GET() {
    try {
        const collections = await getDb()
        
        // Use estimatedDocumentCount() instead of stats()
        await collections.users.estimatedDocumentCount()
        
        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            collections: {
                users: true,
                medicalTerms: true,
                medicalQueries: true
            }
        })
    } catch (error) {
        console.error('Database health check failed:', error)
        return NextResponse.json({
            status: 'unhealthy',
            error: 'Database connection failed',
            timestamp: new Date().toISOString()
        }, { status: 503 })
    }
}