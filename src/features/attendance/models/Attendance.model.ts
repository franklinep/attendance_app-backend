import { Schema, model } from 'mongoose'
import { type Attendance } from './Attendance.interfaces'
import { ATTENDANCE_TYPE, ATTENDANCE_METHOD, ATTENDANCE_STATUS } from '@utils/attendance'

const AttendanceSchema = new Schema<Attendance>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    laboratoryId: { type: Schema.Types.ObjectId, ref: 'Laboratory', required: true },
    type: { type: String, enum: Object.values(ATTENDANCE_TYPE), required: true, },
    method: { type: String, enum: Object.values(ATTENDANCE_METHOD), required: true, },
    registeredAt: { type: Date, required: true },
    status: { type: String, enum: Object.values(ATTENDANCE_STATUS), default: ATTENDANCE_STATUS.valid, },
    comments: { type: String },
  },
  {
    timestamps: true,
  },
)

// Índice compuesto para prevenir múltiples registros del mismo tipo en el mismo día
AttendanceSchema.index(
  { userId: 1, type: 1, registeredAt: 1, },
  {
    unique: true,
    partialFilterExpression: {
      status: ATTENDANCE_STATUS.valid,
    },
  },
)

export default model('Attendance', AttendanceSchema)
