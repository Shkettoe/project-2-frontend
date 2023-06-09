import * as z from 'zod'
import { Errors } from '../Errors'

const passwordSchema = z.object({
  current_password: z.string().optional(),
  password: z.string().min(8, Errors.PASS_MIN).max(32, Errors.PASS_MAX),
  confirm_password: z.string().min(8, Errors.PASS_MIN).max(32, Errors.PASS_MAX),
})

export default passwordSchema
