import { Collection, Db } from 'mongodb'
import { User } from '../models/User'

export interface Collections {
  users: Collection<User>
}

export async function getCollections(db: Db): Promise<Collections> {
  const users = db.collection<User>('users')
  
  // Create indexes
  await users.createIndex({ email: 1 }, { unique: true })
  await users.createIndex({ auth0Id: 1 }, { unique: true })
  
  return { users }
}