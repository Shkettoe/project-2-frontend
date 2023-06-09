import Guess from './Guess.interface'
import User from './User.interface'

interface Location {
  id: number
  lattitude: string
  longitude: string
  image_url: string
  user: User
  guesses: Guess[]
}

export default Location
