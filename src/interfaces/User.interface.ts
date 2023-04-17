import Location from './Location.interface'
import Guess from './Guess.interface'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  password: string
  avatar: string
  emailVerified: boolean
  role: 'admin' | 'user'
  locations: Location[]
  guesses: Guess[]
}

export default User
