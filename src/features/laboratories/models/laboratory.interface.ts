import { type Types } from 'mongoose'

export interface Laboratory {
  name: string
  description?: string
  userId: Types.ObjectId
  location?: string
  isActive: boolean
}
