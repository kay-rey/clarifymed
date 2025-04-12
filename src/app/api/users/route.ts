import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db/dbConnect'
import type { CreateUserInput } from '@/lib/models/User'
import { ObjectId } from 'mongodb'

export async function POST(request: Request) {
  try {
    const body: CreateUserInput = await request.json()
    const collections = await getDb()
    
    const result = await collections.users.insertOne({
      _id: new ObjectId(),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    return NextResponse.json({ id: result.insertedId })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}