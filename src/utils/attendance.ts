export const ATTENDANCE_TYPE = { checkIn: 'check-in', checkOut: 'check-out', } as const
export const ATTENDANCE_METHOD = { qr: 'qr', manual: 'manual', } as const
export const ATTENDANCE_STATUS = { valid: 'valid', pending: 'pending', rejected: 'rejected', } as const
export type AttendanceType = (typeof ATTENDANCE_TYPE)[keyof typeof ATTENDANCE_TYPE]
export type AttendanceMethod = (typeof ATTENDANCE_METHOD)[keyof typeof ATTENDANCE_METHOD]
export type AttendanceStatus = (typeof ATTENDANCE_STATUS)[keyof typeof ATTENDANCE_STATUS]
