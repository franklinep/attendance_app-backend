import { type Types } from 'mongoose'
import { type AttendanceType, type AttendanceMethod, type AttendanceStatus } from '@utils/attendance'

// Interfaz para la base de datos
export interface Attendance {
  userId: Types.ObjectId
  laboratoryId: Types.ObjectId
  type: AttendanceType
  method: AttendanceMethod
  registeredAt: Date
  status: AttendanceStatus
  comments?: string
}

// Interfaz para los datos que vienen del cliente
export interface RegisterAttendanceDTO {
  userId: string
  laboratoryId: string
  type: string
  method?: string
  comments?: string
}

// Interfaz para la respuesta al cliente
export interface AttendanceResponse {
  id: string
  userId: string
  laboratoryId: string
  type: AttendanceType
  method: AttendanceMethod
  registeredAt: string
  status: AttendanceStatus
  comments?: string
}
