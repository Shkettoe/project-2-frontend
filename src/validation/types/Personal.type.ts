import * as z from 'zod'
import personalSchema from '../schemas/PersonalInfo.schema'

type personalTypes = z.infer<typeof personalSchema>

export default personalTypes
