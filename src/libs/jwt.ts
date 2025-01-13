// src/libs/jwt.ts
import { CustomError } from '@utils/errors'
import jwt from 'jsonwebtoken'
import config from 'src/config'

export async function createAccessToken(payload: string | object | Buffer): Promise<any> {
  const secretToken = config.secretToken

  if (typeof secretToken !== 'string') throw new CustomError({ message: 'Secret Token no es una cadena', status: 500 })

  return await new Promise((resolve, reject) => {
    jwt.sign(payload, secretToken, (err: any, token: any) => {
      if (err !== null) reject(err)
      resolve(token)
    })
  })
}
