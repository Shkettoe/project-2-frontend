import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import User from '../../interfaces/User.interface'
import { RootState } from '../store'

const initialState: { value: User } = {
  value: {} as User,
}

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload
    },
    unsetUser: state => {
      state.value = initialState.value
    },
  },
})

export const selectUser = (state: RootState) => state.user.value
export const { setUser, unsetUser } = userSlice.actions
export default userSlice
