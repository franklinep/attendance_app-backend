import { type Attendance, type AttendanceResponse } from './models/Attendance.interfaces'
import AttendanceModel from './models/Attendance.model'
import { CustomError } from '@utils/errors'

// Función para crear un nuevo registro de asistencia
export const createAttendance = async (attendanceData: Attendance): Promise<AttendanceResponse> => {
  try {
    const attendance = new AttendanceModel(attendanceData)
    const savedAttendance = await attendance.save()
    return {
      id: savedAttendance._id.toString(),
      userId: savedAttendance.userId.toString(),
      laboratoryId: savedAttendance.laboratoryId.toString(),
      type: savedAttendance.type,
      method: savedAttendance.method,
      registeredAt: savedAttendance.registeredAt.toISOString(),
      status: savedAttendance.status,
      comments: savedAttendance.comments,
    }
  } catch (error: any) {
    if (error.code === 11000) {
      throw new CustomError({
        message: 'Ya existe un registro de este tipo para el día de hoy',
        status: 400,
      })
    }
    throw new CustomError({
      message: error.message,
      status: 500,
      name: error.name,
    })
  }
}
