import { ZodObject } from 'zod'

const Matchify = (object: ZodObject<any>) => {
  return object.superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must match',
        path: ['confirm_password'],
      })
    }
  })
}

export default Matchify
