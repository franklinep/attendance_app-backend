// src/utils/errors.ts
interface CustomErrorParams {
  message: string
  status: number
  name?: string
}

export class CustomError extends Error {
  status: number

  constructor({ message, status, name }: CustomErrorParams) {
    super(message)
    this.name = name ?? 'CustomError'
    this.status = status
  }
}
