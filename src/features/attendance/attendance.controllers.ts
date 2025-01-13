import { type Request, type Response } from 'express'
import * as attendanceServices from './attendance.services'

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
