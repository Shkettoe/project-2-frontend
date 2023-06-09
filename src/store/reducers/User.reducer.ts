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
    appendToUser: (state: { value: User }, action: PayloadAction<any>) => {
      for (const key in action.payload) {
        //@ts-ignore
        state.value[key] = [
          //@ts-ignore
          ...state.value[key],
          //@ts-ignore
          ...action.payload[key],
          //@ts-ignore
        ] as User[key]
      }
    },
    unsetUser: state => {
      state.value = initialState.value
    },
  },
})

export const selectUser = (state: RootState) => state.user.value
export const { setUser, appendToUser, unsetUser } = userSlice.actions
export default userSlice
