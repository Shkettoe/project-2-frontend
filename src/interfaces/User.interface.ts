interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  password: string
  avatar: string
  emailVerified: boolean

  //   role: 'admin' | 'user'

  //   locations: Location[]

  //   guesses: Guess[]

  //   event_logs: EventLog[]
}

export default User
