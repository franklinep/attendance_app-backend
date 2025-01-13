// src/middleware/auth.ts
import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from 'src/config'
import { CustomError } from '@utils/errors'

interface JWTPayload {
  id: string
  role: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JWTPayload
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.headers
    if (token == null) {
      res.status(401).json({
        success: false,
        error: {
          message: 'No se proporcionó token de autenticación'
        }
      })
      return
    }

    const secretToken = config.secretToken
    if (typeof secretToken !== 'string') {
      throw new CustomError({
        message: 'Error de configuración del servidor',
        status: 500
      })
    }

    jwt.verify(token as string, secretToken, (err: any, decoded: any) => {
      if (err != null) {
        res.status(403).json({
          success: false,
          error: {
            message: 'Token inválido o expirado'
          }
        })
        return
      }

      req.user = decoded as JWTPayload
      next()
    })
  } catch (error: any) {
    const status = error?.status ?? 500
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.status(status).json({
      success: false,
      error: {
        message: error?.message ?? 'Error al verificar la autenticación'
      }
    })
  }
}
