// src/features/users/models/User.interfaces.ts
import { type ROLES } from '@utils/roles'

export type role = (typeof ROLES)[keyof typeof ROLES]

export interface User {
  email: string
  fullName: string
  pictureURL: string
  phone?: string
  isActive?: boolean
  role: role
}
