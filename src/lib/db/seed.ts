import { getDb } from '@/lib/db/dbConnect'
import { ObjectId } from 'mongodb'
import type { MedicalTerm } from '@/lib/models/MedicalTerm'
import type { MedicalQuery } from '@/lib/models/MedicalQuery'

// ...rest of seed.ts code...

const users = [
    {
        _id: new ObjectId(),
        email: 'test1@example.com',
        name: 'Test User 1',
        auth0Id: 'auth0|123',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: new ObjectId(),
        email: 'test2@example.com',
        name: 'Test User 2',
        auth0Id: 'auth0|456',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

const medicalTerms: MedicalTerm[] = [
    {
        _id: new ObjectId(),
        term: 'Hypertension',
        definition: 'High blood pressure',
        technicalDefinition: 'Persistent elevation of systemic arterial blood pressure',
        category: ['cardiology', 'chronic conditions'],
        synonyms: ['high blood pressure', 'HTN'],
        metadata: {
            complexity: 'basic' as const, // Add type assertion
            language: 'en',
            verified: true
        },
        usage: {
            searchCount: 0,
            lastAccessed: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: new ObjectId(),
        term: 'Tachycardia',
        definition: 'Abnormally rapid heart rate',
        category: ['cardiology'],
        metadata: {
            complexity: 'intermediate' as const, // Add type assertion
            language: 'en',
            verified: true
        },
        usage: {
            searchCount: 0,
            lastAccessed: new Date()
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
]


const medicalQueries: MedicalQuery[] = [
    {
        _id: new ObjectId(),
        userId: users[0]._id,
        originalText: "What does hypertension mean in simple terms?",
        clarifiedText: "",
        status: 'pending',
        metadata: {
            model: 'gemini-2.0-flash',
            geminiConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 2048
            }
        },
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: new ObjectId(),
        userId: users[1]._id,
        originalText: "Explain tachycardia symptoms",
        clarifiedText: "",
        status: 'pending',
        metadata: {
            model: 'gemini-2.0-flash',
            geminiConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 2048
            }
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

async function seed() {
    try {
        const collections = await getDb()

        // Clear existing data
        await collections.users.deleteMany({})
        await collections.medicalTerms.deleteMany({})
        await collections.medicalQueries.deleteMany({})

        // Insert test data
        await collections.users.insertMany(users)
        await collections.medicalTerms.insertMany(medicalTerms)
        await collections.medicalQueries.insertMany(medicalQueries)

        console.log('Database seeded successfully!')
        process.exit(0)
    } catch (error) {
        console.error('Error seeding database:', error)
        process.exit(1)
    }
}

// Run seeder
seed()