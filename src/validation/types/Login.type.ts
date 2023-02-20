import * as z from 'zod'
import loginSchema from '../schemas/Login.schema'

type loginTypes = z.infer<typeof loginSchema>

export default loginTypes
