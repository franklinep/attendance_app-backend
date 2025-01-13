// src/loaders/index.ts
import type { Express } from 'express'
import expressLoader from './express'
import mongooseLoader from './mongoose'

export default async (expressApp: Express): Promise<void> => {
  await mongooseLoader().then(() => {
    console.log('MongoDB Initialized')
  })

  await expressLoader(expressApp).then(() => {
    console.log('Express Initialized')
  })
}
