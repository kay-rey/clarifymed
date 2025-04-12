import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/dbConnect'
import type { CreateMedicalQueryInput } from '@/lib/models/MedicalQuery'
import { ObjectId } from 'mongodb'


export async function POST(request: Request) {
    try {
        const body: CreateMedicalQueryInput = await request.json()
        const collections = await getDb()
        
        const result = await collections.medicalQueries.insertOne({
            ...body,
            status: 'pending',
            _id: new (ObjectId)(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
        
        return NextResponse.json({ id: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error('Failed to create medical query:', error)
        return NextResponse.json({ error: 'Failed to create medical query' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const status = searchParams.get('status')
        const collections = await getDb()

        const query: { userId?: string; status?: string } = {}
        if (userId) query.userId = userId
        if (status) query.status = status

        const queries = await collections.medicalQueries
            .find(query)
            .sort({ createdAt: -1 })
            .toArray()
            
        return NextResponse.json(queries)
    } catch (error) {
        console.error('Failed to fetch medical queries:', error)
        return NextResponse.json({ error: 'Failed to fetch medical queries' }, { status: 500 })
    }
}