import * as z from 'zod'
import passwordSchema from '../schemas/Passwords.schema'
import personalSchema from '../schemas/PersonalInfo.schema'

type registerTypes = z.infer<typeof personalSchema & typeof passwordSchema>

export default registerTypes
