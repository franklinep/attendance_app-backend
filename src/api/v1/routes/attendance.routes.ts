// src/api/v1/routes/attendance.routes.ts
import { Router } from 'express'
import { registerAttendance, generateQRToken } from '@attendance/attendance.controllers'
import { authenticateToken } from '@middlewares/auth.middleware'

const route = Router()

export default (app: Router): void => {
  app.use('/attendance', route)
  route.post('/register',
    authenticateToken,
    registerAttendance
  )

  route.get('/qr/:laboratoryId',
    authenticateToken,
    generateQRToken
  )
}
