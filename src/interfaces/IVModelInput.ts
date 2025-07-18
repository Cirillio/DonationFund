import { z } from 'zod'

interface IModelInput {
  label?: string
  placeholder?: string
  name: string
  type?: string
  icon?: string
  mask?: string | undefined
  schema: z.ZodTypeAny
  initialValue?: any
}

export type { IModelInput }
