import ComponentTypes from './enums/CompontentTypes.enum'
import User from './User.interface'

interface EventLog {
  id?: number
  action: string
  compotent_type: ComponentTypes
  new_value: string
  location: string
  date: Date | string
  user?: User
}

export default EventLog
