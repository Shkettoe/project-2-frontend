import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/Api'
import User from '../interfaces/User.interface'
import { selectUser, setUser, unsetUser } from '../store/reducers/User.reducer'
import { useAppDispatch } from './store-hook'
import useAPI from './useAPI'

const useR = () => {
  const dispatch = useAppDispatch()
  const [response, error, apiFetch] = useAPI()
  const user = useSelector(selectUser)

  const terminateSession = () => {
    dispatch(unsetUser())
    apiFetch({
      method: 'post',
      url: 'auth/logout',
      apiInstance: api,
    })
  }

  const startSession = () => {
    if (!user?.id) {
      apiFetch({
        method: 'get',
        apiInstance: api,
        url: 'auth/me',
      })
    }
  }

  useEffect(() => {
    if (response?.data?.id) dispatch(setUser(response?.data))
    else error.length && console.log(error)
  }, [response])

  return [user, terminateSession, startSession, error] as const
}

export default useR
