import { BaseModel } from '../types/base'

export interface User extends BaseModel {
  email: string
  name: string
  auth0Id: string
  preferences?: {
    language?: string
    notifications?: boolean
  }
}

export type CreateUserInput = Omit<User, '_id' | 'createdAt' | 'updatedAt'>