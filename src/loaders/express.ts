// src/loaders/express.ts
import express from 'express'
import type { Request, Response, Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from 'src/config/index'
import routes from 'src/api/index'

export default async (app: Express): Promise<Express> => {
  app.use(
    cors({
      credentials: true,
      origin: config.frontendURL,
    }),
  )

  app.use(morgan('dev'))

  // Transforms the raw string of req.body into json
  app.use(express.json())

  // mdiddleware for parsing URL-encoded data sent from HTML forms.
  app.use(express.urlencoded({ extended: false }))

  app.get('/ping', (_req: Request, res: Response) => {
    res.send('pong')
  })

  app.use(config.api.prefix, routes())

  app.get('*', (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      data: { message: 'Not Found' },
    })
  })

  return app
}
