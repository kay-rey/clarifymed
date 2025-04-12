/**
 * Users API Routes
 * Handles user creation and retrieval operations.
 * Integrates with MongoDB for data persistence.
 */

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/dbConnect'
import type { CreateUserInput } from '@/lib/models/User'
import { ObjectId } from 'mongodb'

/**
 * Creates a new user in the database
 * @param request Request containing user data in the body
 * @returns Created user's ID or error response
 */
export async function POST(request: Request) {
    try {
        // Parse request body as CreateUserInput type
        const body: CreateUserInput = await request.json()
        const collections = await getDb()

        // Insert new user with timestamps
        const result = await collections.users.insertOne({
            ...body,
            _id: new ObjectId(),
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return NextResponse.json({ id: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error('Failed to create user:', error)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
    }
}

/**
 * Retrieves user(s) from the database
 * @param request Request with optional email query parameter
 * @returns Single user if email provided, all users otherwise
 */
export async function GET(request: Request) {
    try {
        // Extract query parameters
        const { searchParams } = new URL(request.url)
        const email = searchParams.get('email')
        const collections = await getDb()

        // If email provided, return specific user
        if (email) {
            const user = await collections.users.findOne({ email })
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 })
            }
            return NextResponse.json(user)
        }

        // Otherwise return all users
        const users = await collections.users.find().toArray()
        return NextResponse.json(users)
    } catch (error) {
        console.error('Failed to fetch users:', error)
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
}