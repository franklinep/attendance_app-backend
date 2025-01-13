import { Types } from 'mongoose'
import * as attendanceData from './attendance.data'
import { type RegisterAttendanceDTO, type AttendanceResponse } from './models/Attendance.interfaces'
import { ATTENDANCE_METHOD, ATTENDANCE_TYPE, ATTENDANCE_STATUS } from '@utils/attendance'
import { CustomError } from '@utils/errors'

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
