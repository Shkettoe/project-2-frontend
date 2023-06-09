import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import Error from '../components/Error'
import InputContainer from '../containers/InputContainer'
import PasswordsForm from '../containers/PasswordsForm'
import useAPI from '../hooks/useAPI'
import Matchify from '../validation/Matchify.util'
import passwordSchema from '../validation/schemas/Passwords.schema'
import loginTypes from '../validation/types/Login.type'

const RecoverPassword = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')
  //   if (token) navigate('/')

  const [response, error, fetch, setError] = useAPI()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string; confirm_password: string }>({
    resolver: zodResolver(Matchify(passwordSchema)),
  })

  const submit = (data: { password: string; confirm_password: string }) => {
    fetch({
      method: 'patch',
      url: `auth/forgor/${token}`,
      data: { password: data.password },
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputContainer>
        <PasswordsForm width={420} register={register} errors={errors} />
        <Button>Submit</Button>
        <Error>{error}</Error>
      </InputContainer>
    </form>
  )
}

export default RecoverPassword
