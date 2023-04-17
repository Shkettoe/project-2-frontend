import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/Api'
import { eFontSizes } from '../assets/Vars'
import useAPI from '../hooks/useAPI'

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams()
  const [response, error, apiFetch] = useAPI<{ msg: string }>()

  useEffect(() => {
    apiFetch({
      method: 'get',
      url: `auth/confirm?token=${searchParams.get('token')}`,
      apiInstance: api,
    })
  }, [searchParams])

  useEffect(() => {
    console.log(response, error)
  }, [response])

  return (
    <div style={{ fontSize: eFontSizes.headline4 }}>
      {response?.data.msg || error}
    </div>
  )
}

export default ConfirmEmail
