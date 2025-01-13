// src/libs/googleOAuth.ts
import { type GUserInfo } from '@auth/models/auth.interfaces'
import { CustomError } from '@utils/errors'

export const getUserInfoByGToken = async function (token: any): Promise<GUserInfo> {
  const url = 'https://www.googleapis.com/userinfo/v2/me'

  try {
    const userInfoResponse = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    console.log('🚀 ~ file: auth.service.ts:18 ~ getUserInfoByGToken ~ userInfoResponse:', userInfoResponse)

    if (userInfoResponse.status !== 200) {
      const { error: errorJson } = await userInfoResponse.json()
      console.log(errorJson)

      throw new CustomError({ message: errorJson.message, status: errorJson.code })
    }

    const userInfoJson = await userInfoResponse.json()
    console.log('🚀 ~ file: auth.service.ts:31 ~ getUserInfoByGToken ~ userInfoJson:', userInfoJson)

    const { name, email, picture } = userInfoJson

    return { name, email, picture }
  } catch (error: any) {
    console.log('error in data', error)

    const message = error?.message !== undefined ? error?.message : 'No se pudo obtener los datos'
    const status = typeof error.status === 'number' ? error.status : 500

    throw new CustomError({ message, status })
  }
}
