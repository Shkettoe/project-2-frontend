import * as z from 'zod'
import { Errors } from '../Errors'

const personalSchema = z.object({
  first_name: z.string().refine(fn => fn, { message: `First name ${Errors.IDENTIFY}` }),
  last_name: z.string().refine(fn => fn, { message: `Last name ${Errors.IDENTIFY}` }),
  email: z.string().email(),
})

export default personalSchema
