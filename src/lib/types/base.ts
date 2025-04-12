import { ObjectId } from 'mongodb'

export interface BaseModel {
  _id: ObjectId
  createdAt: Date
  updatedAt: Date
}