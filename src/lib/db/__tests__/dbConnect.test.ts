import { getDb } from '../dbConnect'
import { setupTestDb, closeTestDb } from './testDb'

describe('Database Connection', () => {
    afterAll(async () => {
        await closeTestDb()
    })

    test('should connect to database', async () => {
        const db = await setupTestDb()
        expect(db).toBeDefined()
        expect(db.users).toBeDefined()
        expect(db.medicalQueries).toBeDefined()
    })

    test('should cache database connection', async () => {
        const db1 = await getDb()
        const db2 = await getDb()
        expect(db1).toBe(db2)
    })
})