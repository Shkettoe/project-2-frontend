import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../api/Api'
import User from '../interfaces/User.interface'
import { selectUser, setUser, unsetUser } from '../store/reducers/User.reducer'
import { useAppDispatch } from './store-hook'
import useAPI from './useAPI'

const useR = () => {
  const dispatch = useAppDispatch()
  const [response, error, apiFetch] = useAPI<User>()
  const user = useSelector(selectUser)
  const [loading, setLoading] = useState(true)
  const [noConn, setNoConn] = useState(false)

  const terminateSession = () => {
    dispatch(unsetUser())
    apiFetch({
      method: 'post',
      url: 'auth/logout',
      apiInstance: api,
    })
  }

  const fetchUser = () => {
    apiFetch({
      method: 'get',
      apiInstance: api,
      url: 'auth/me',
    })
  }

  const startSession = () => {
    if (!user?.id) {
      fetchUser()
    }
  }

  useEffect(() => {
    if (user || error) setTimeout(() => setLoading(false), 500)
  }, [user])

  useEffect(() => {
    response?.data?.id && dispatch(setUser(response?.data))
  }, [response])

  useEffect(() => {
    setNoConn(!user.id && !error && !loading)
  }, [response, error])

  return [
    user,
    terminateSession,
    startSession,
    error,
    fetchUser,
    loading,
    noConn,
  ] as const
}

export default useR
