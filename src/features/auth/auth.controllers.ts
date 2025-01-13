// src/features/auth/auth.controllers.ts
import { type Request, type Response } from 'express'
import * as authServices from './auth.services'

export const googleOAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.headers
    console.log('🚀 ~ googleOAuth ~ token:', token)

    // valido el token
    if (token === undefined) {
      res.status(400).send({ success: false, error: { message: 'no hay token' } })
    } else {
      const userInfo = await authServices.googleOAuth(token)
      console.log('🚀 ~ googleOAuth ~ userInfo:', userInfo)

      res.status(200).send({ success: true, data: userInfo })
    }
  } catch (error: any) {
    const errorStatus = error?.status === undefined ? 500 : error.status
    res.status(errorStatus as number).json({ success: false, data: { message: error?.message } })
  }
}
