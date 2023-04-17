import { AxiosInstance, AxiosResponse } from 'axios'
import { useState } from 'react'
import api from '../api/Api'

const useAPI = <T>() => {
  const [response, setResponse] = useState<AxiosResponse<T>>()
  const [error, setError] = useState('')

  const apiFetch = async ({
    apiInstance = api,
    method,
    url,
    data,
  }: {
    apiInstance?: AxiosInstance
    method: string
    url: string
    data?: {}
  }) => {
    try {
      setResponse(
        await apiInstance(url, {
          method,
          data,
        }),
      )
    } catch (err: any) {
      setError(err.response?.data.message)
    }
  }

  return [response, error, apiFetch, setError] as const
}

export default useAPI
