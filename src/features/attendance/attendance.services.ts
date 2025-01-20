import { Types } from 'mongoose'
import * as attendanceData from './attendance.data'
import { type RegisterAttendanceDTO, type AttendanceResponse } from './models/Attendance.interfaces'
import { ATTENDANCE_METHOD, ATTENDANCE_TYPE, ATTENDANCE_STATUS } from '@utils/attendance'
import { CustomError } from '@utils/errors'
import { ROLES } from '@utils/roles'
import UserModel from '@users/models/User.model'
import { LaboratoryModel } from '@laboratories/models/laboratory.model'
import { createAccessToken } from '@libs/jwt'

export const registerAttendance = async (registerData: RegisterAttendanceDTO): Promise<AttendanceResponse> => {
  try {
    // Validar tipo de asistencia
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!Object.values(ATTENDANCE_TYPE).includes(registerData.type as any)) {
      throw new CustomError({
        message: 'Tipo de asistencia inválido',
        status: 400
      })
    }

    // Validar método de registro
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (!Object.values(ATTENDANCE_METHOD).includes(registerData.method as any)) {
      throw new CustomError({
        message: 'Método de registro inválido',
        status: 400
      })
    }

    // Crear el registro de asistencia
    const attendance = await attendanceData.createAttendance({
      userId: new Types.ObjectId(registerData.userId),
      laboratoryId: new Types.ObjectId(registerData.laboratoryId),
      type: registerData.type as any,
      method: registerData.method as any,
      registeredAt: new Date(),
      status: ATTENDANCE_STATUS.valid,
      comments: registerData.comments,
    })

    return attendance
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    }
    throw new CustomError({
      message: 'Error al registrar la asistencia',
      status: 500
    })
  }
}

export const canUserGenerateQR = async (userId: string, laboratoryId: string): Promise<boolean> => {
  try {
    // Verificar si el usuario existe
    const user = await UserModel.findById(userId)
    if (user == null) {
      throw new CustomError({
        message: 'Usuario no encontrado',
        status: 404
      })
    }

    // Si es administrador, tiene acceso a todos los laboratorios
    if (user.role === ROLES.admin) {
      return true
    }

    // Si es coordinador, verificar si está asignado al laboratorio
    if (user.role === ROLES.coordinator) {
      const laboratory = await LaboratoryModel.findOne({
        _id: new Types.ObjectId(laboratoryId),
        userId: new Types.ObjectId(userId),
        isActive: true
      })

      return laboratory !== null
    }

    return false
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    }
    throw new CustomError({
      message: 'Error al verificar permisos',
      status: 500
    })
  }
}

export const generateQRToken = async (laboratoryId: string): Promise<string> => {
  try {
    // Validar que el laboratorio existe y está activo
    const laboratory = await LaboratoryModel.findOne({
      _id: laboratoryId,
      isActive: true
    })

    if (laboratory == null) {
      throw new CustomError({
        message: 'Laboratorio no encontrado o inactivo',
        status: 404
      })
    }

    // Crear payload del token
    const payload = {
      laboratoryId,
      type: 'qr-auth',
      exp: Math.floor(Date.now() / 1000) + (60 * 5) // 5 minutos de expiración
    }

    // Generar token
    const token = await createAccessToken(payload)
    return token
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    }
    throw new CustomError({
      message: 'Error al generar el token QR',
      status: 500
    })
  }
}
