import * as z from 'zod'

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .refine(e => e, { message: 'Required field' }),
  password: z.string().refine(p => p, { message: 'Required field' }),
})

export default loginSchema
