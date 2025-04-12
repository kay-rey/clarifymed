import { getDb } from '../dbConnect'
import { ObjectId } from 'mongodb'
import { MongoClient } from 'mongodb'
import clientPromise from '../mongodb'

describe('MongoDB Connection', () => {
  let db: Awaited<ReturnType<typeof getDb>>
  let mongoClient: MongoClient

  beforeAll(async () => {
    mongoClient = await clientPromise
    db = await getDb()
  })

  afterAll(async () => {
    await mongoClient.close()
  })

  test('should connect to database', async () => {
    expect(db).toBeDefined()
    expect(db.users).toBeDefined()
  })

  test('should create and retrieve a user', async () => {
    const testUser = {
      email: 'test@example.com',
      name: 'Test User',
      auth0Id: 'auth0|' + new ObjectId().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    try {
      // Create user
      const insertResult = await db.users.insertOne(testUser)
      expect(insertResult.insertedId).toBeDefined()

      // Retrieve user
      const foundUser = await db.users.findOne({ _id: insertResult.insertedId })
      expect(foundUser).toBeDefined()
      expect(foundUser?.email).toBe(testUser.email)

      // Clean up
      await db.users.deleteOne({ _id: insertResult.insertedId })
    } catch (error) {
      console.error('Test failed:', error)
      throw error
    }
  })
})