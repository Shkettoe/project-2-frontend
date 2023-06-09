import Location from './Location.interface'
import User from './User.interface'

interface Guess {
  id: number
  created_at: string
  updated_at: string
  longitude: string
  lattitude: string
  error_distance: string
  user: User
  location: Location
}

export default Guess
