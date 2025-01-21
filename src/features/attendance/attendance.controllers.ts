import { type Request, type Response } from 'express'
import * as attendanceServices from './attendance.services'
import { CustomError } from 'src/utils/errors'

export const registerAttendance = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, laboratoryId, type, method, comments } = req.body

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!userId || !laboratoryId || !type) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Faltan campos requeridos'
        }
      })
      return
    }

    const attendance = await attendanceServices.registerAttendance({ userId, laboratoryId, type, method, comments })

    res.status(201).json({
      success: true,
      data: attendance
    })
  } catch (error: any) {
    const status = error?.status ?? 500
    res.status(status as number).json({
      success: false,
      error: {
        message: error?.message ?? 'Error interno del servidor'
      }
    })
  }
}

export const generateQRToken = async (req: Request, res: Response): Promise<void> => {
  try {
    // destructuring de request
    const { laboratoryId } = req.params
    const { user } = req

    if (user == null) {
      throw new CustomError({
        message: 'Usuario no autenticado',
        status: 401
      })
    }

    // Verificar si el usuario tiene permisos
    const hasPermission = await attendanceServices.canUserGenerateQR(user.id, laboratoryId)

    if (!hasPermission) {
      throw new CustomError({
        message: 'No tiene permisos para generar QR en este laboratorio',
        status: 403
      })
    }

    // Generar token
    const token = await attendanceServices.generateQRToken(laboratoryId)

    res.status(200).json({
      success: true,
      data: { token }
    })
  } catch (error: any) {
    const status = error?.status ?? 500
    res.status(status as number).json({
      success: false,
      error: {
        message: error?.message ?? 'Error al generar el token QR'
      }
    })
  }
}
