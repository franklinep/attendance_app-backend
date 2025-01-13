// src/loaders/mongoose.ts
import mongoose from 'mongoose'
import config from 'src/config/index'

async function dbConnect(): Promise<void> {
  const DB_URI = config.databaseURL

  if (DB_URI === undefined) {
    throw new Error('Please set the DATABASE_URI environment variable')
  }

  await mongoose.connect(DB_URI)
}

export default dbConnect
