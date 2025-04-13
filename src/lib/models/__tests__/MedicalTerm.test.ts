import { ObjectId } from 'mongodb'
import { setupTestDb, clearTestDb, closeTestDb } from '../../db/__tests__/testDb'
import { Collections } from '../../db/schema'

describe('MedicalTerm Model', () => {
    let db: Collections

    beforeAll(async () => {
        db = await setupTestDb()
    })

    afterEach(async () => {
        await clearTestDb()
    })

    afterAll(async () => {
        await closeTestDb()
    })

    test('should create a medical term', async () => {
        const term = {
            term: 'Hypertension',
            definition: 'High blood pressure',
            technicalDefinition: 'Persistent elevation of systemic arterial blood pressure',
            category: ['cardiology', 'chronic conditions'],
            synonyms: ['high blood pressure', 'HTN'],
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: {
                complexity: 'basic' as const,
                language: 'en',
                verified: true
            }
        }

        const result = await db.medicalTerms.insertOne(term)
        expect(result.insertedId).toBeDefined()

        const savedTerm = await db.medicalTerms.findOne({ _id: result.insertedId })
        expect(savedTerm).toMatchObject(term)
    })

    test('should find term by text search', async () => {
        const term = {
            term: 'Tachycardia',
            definition: 'Fast heart rate',
            synonyms: ['rapid heartbeat', 'racing heart'],
            createdAt: new Date(),
            updatedAt: new Date(),
            metadata: {
                complexity: 'basic' as const,
                language: 'en',
                verified: true
            }
        }

        await db.medicalTerms.insertOne(term)

        const result = await db.medicalTerms
            .find({ $text: { $search: 'racing heart' } })
            .toArray()

        expect(result).toHaveLength(1)
        expect(result[0].term).toBe('Tachycardia')
    })

    test('should update usage statistics', async () => {
        const term = {
            term: 'Bradycardia',
            definition: 'Slow heart rate',
            createdAt: new Date(),
            updatedAt: new Date(),
            usage: {
                searchCount: 0,
                lastAccessed: new Date()
            }
        }

        const { insertedId } = await db.medicalTerms.insertOne(term)

        await db.medicalTerms.updateOne(
            { _id: insertedId },
            {
                $inc: { 'usage.searchCount': 1 },
                $set: { 'usage.lastAccessed': new Date() }
            }
        )

        const updatedTerm = await db.medicalTerms.findOne({ _id: insertedId })
        expect(updatedTerm?.usage?.searchCount).toBe(1)
    })

    test('should enforce unique term constraint', async () => {
        const term = {
            term: 'Dyspnea',
            definition: 'Shortness of breath',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await db.medicalTerms.insertOne(term)

        await expect(db.medicalTerms.insertOne(term))
            .rejects
            .toThrow(/duplicate key error/)
    })
})