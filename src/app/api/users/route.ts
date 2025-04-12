import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/dbConnect'
import type { CreateUserInput } from '@/lib/models/User'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
    try {
        const body: CreateUserInput = await request.json()
        const collections = await getDb()
        
        const result = await collections.users.insertOne({
            ...body,
            _id: new (ObjectId)(),
            createdAt: new Date(),
            updatedAt: new Date()
        })
        
        return NextResponse.json({ id: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error('Failed to create user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
        const collections = await getDb()

        if (email) {
            const user = await collections.users.findOne({ email })
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 })
            }
            return NextResponse.json(user)
        }

        const users = await collections.users.find().toArray()
        return NextResponse.json(users)
    } catch (error) {
        console.error('Failed to fetch users:', error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}