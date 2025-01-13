// src/features/auth/models/auth.interfaces.ts
import { type User } from '@users/models/User.interfaces'

export type GUserSignUp = Omit<User, 'role'>

export interface GUserInfo {
  email: string
  name: string
  picture: string
}
