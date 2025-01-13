// src/api/v1/routes/auth.routes.ts
import { Router } from 'express'
import { googleOAuth } from '@auth/auth.controllers'

const route = Router()

export default (app: Router): void => {
  app.use('/auth', route)
  route.get('/g-oauth', googleOAuth)
}
