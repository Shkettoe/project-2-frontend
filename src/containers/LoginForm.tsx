import Error from '../components/Error'
import { eColours } from '../assets/Vars'
import Button from '../components/Button'
import { InputA } from '../components/Input'
import InputContainer from '../containers/InputContainer'
import Label from '../components/Label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import loginSchema from '../validation/schemas/Login.schema'
import loginTypes from '../validation/types/Login.type'
import api from '../api/Api'
import useAPI from '../hooks/useAPI'
import { useEffect } from 'react'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginTypes>({ resolver: zodResolver(loginSchema) })

  const [response, error, apiFetch] = useAPI()

  const submit = (data: loginTypes) => {
    apiFetch({
      url: 'auth/login',
      apiInstance: api,
      data,
      method: 'post',
    })
  }

  useEffect(() => {
    console.log(response)
  }, [response])

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputContainer>
        <Label htmlFor='email'>Email</Label>
        <InputA {...register('email')} width={'420px'} height={'46px'} />
        <Error>{errors.email?.message || error}</Error>
      </InputContainer>
      <InputContainer>
        <Label htmlFor='password'>Password</Label>
        <InputA type={'password'} {...register('password')} width={'420px'} height={'46px'} />
        <Error>{errors.password?.message}</Error>
      </InputContainer>
      <InputContainer>
        <Button type='submit' height={'39px'} width={'420px'} fgColour='#ffffff' bgColour={eColours.primaryBlue}>
          Sign In
        </Button>
      </InputContainer>
    </form>
  )
}

export default LoginForm
