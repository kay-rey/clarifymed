import { NextRequest } from 'next/server'
import { GET, POST } from '../medical-terms/route'
import { setupTestDb, clearTestDb, closeTestDb } from '@/lib/db/__tests__/testDb'

describe('Medical Terms API', () => {
    beforeAll(async () => {
        await setupTestDb()
    })

    afterEach(async () => {
        await clearTestDb()
    })

    afterAll(async () => {
        await closeTestDb()
        await new Promise(resolve => setTimeout(resolve, 500))
    })

    test('should create a medical term', async () => {
        const request = new NextRequest('http://localhost:3000/api/medical-terms', {
            method: 'POST',
            body: JSON.stringify({
                term: 'Hypertension',
                definition: 'High blood pressure',
                metadata: {
                    complexity: 'basic',
                    language: 'en',
                    verified: true
                }
            })
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(201)
        expect(data.id).toBeDefined()
    })

    test('should retrieve medical terms', async () => {
        const response = await GET(new NextRequest('http://localhost:3000/api/medical-terms'))
        const data = await response.json()

        expect(response.status).toBe(200)
        expect(Array.isArray(data)).toBe(true)
    })
})