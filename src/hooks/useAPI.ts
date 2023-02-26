import { AxiosInstance, AxiosResponse } from 'axios'
import { useState } from 'react'

const useAPI = () => {
  const [response, setResponse] = useState<AxiosResponse>()
  const [error, setError] = useState('')

  const apiFetch = async ({ apiInstance, method, url, data }: { apiInstance: AxiosInstance; method: string; url: string; data?: {} }) => {
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
