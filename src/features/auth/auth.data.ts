// src/features/auth/auth.data.ts
import { type Types } from 'mongoose'

import { type User } from 'src/features/users/models/User.interfaces'
import { type GUserSignUp } from '@auth/models/auth.interfaces'

import UserModel from '@users/models/User.model'
import { CustomError } from '@utils/errors'

export const userGoogleSignUp = async function ({
  fullName,
  email,
  pictureURL,
}: GUserSignUp): Promise<User & { _id: Types.ObjectId }> {
  const newUser = new UserModel({
    fullName,
    email,
    pictureURL,
  })

  const createdUser = await newUser.save().catch((err: any) => {
    throw new CustomError({ message: err.message, name: err.name, status: 500 })
  })

  return createdUser
}
