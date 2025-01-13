// src/app.ts
import express from 'express'
import config from './config/index'
import loaders from './loaders/index'

async function startServer(): Promise<void> {
  const app = express()
  await loaders(app)
  app.listen(config.port, () => {
    console.log(`Server is now running on http://localhost:${config.port}/`)
  })
}

void startServer()
