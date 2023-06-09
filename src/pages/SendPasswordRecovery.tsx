import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Error from '../components/Error'
import { InputA } from '../components/Input'
import Label from '../components/Label'
import InputContainer from '../containers/InputContainer'
import useAPI from '../hooks/useAPI'

const SendPasswordRecovery = () => {
  const [response, error, fetch] = useAPI()
  const fieldRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const submit = () => {
    fetch({
      method: 'post',
      url: 'auth/forgor-password',
      data: { email: fieldRef.current?.value },
    })
  }

  useEffect(() => {
    if (response?.status == 201) navigate('/')
  }, [response])

  return (
    <InputContainer>
      <Label htmlFor='email'>Email</Label>
      <InputA
        ref={fieldRef}
        name='email'
        id='email'
        width='420px'
        height='40px'
      />
      <Label></Label>
      <Button onClick={submit}>send recovery code</Button>
      <Error>{error}</Error>
    </InputContainer>
  )
}

export default SendPasswordRecovery
