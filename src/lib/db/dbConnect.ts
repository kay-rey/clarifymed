import clientPromise from './mongodb'
import { getCollections, Collections } from './schema'

let cachedCollections: Collections | null = null

export async function getDb(): Promise<Collections> {
  if (cachedCollections) {
    return cachedCollections
  }

  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || 'clarifymed')
  
  cachedCollections = await getCollections(db)
  return cachedCollections
}