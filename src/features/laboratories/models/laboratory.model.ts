import { Schema, model } from 'mongoose'
import { type Laboratory } from './laboratory.interface'

const LaboratorySchema = new Schema<Laboratory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, required: true, unique: true },
    location: { type: String },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

// Índice compuesto para optimizar búsquedas por userId y estado activo
LaboratorySchema.index({ userId: 1, isActive: 1 })

export const LaboratoryModel = model('Laboratory', LaboratorySchema)
