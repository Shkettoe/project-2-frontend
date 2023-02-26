import Error from '../components/Error'
import { eColours } from '../assets/Vars'
import Button from '../components/Button'
import InputContainer from '../containers/InputContainer'
import PersonalDataForm from './PersonalDataForm'
import { zodResolver } from '@hookform/resolvers/zod'
import personalSchema from '../validation/schemas/PersonalInfo.schema'
import passwordSchema from '../validation/schemas/Passwords.schema'
import Matchify from '../validation/Matchify.util'
import { useForm } from 'react-hook-form'
import registerTypes from '../validation/types/Register.type'
import useAPI from '../hooks/useAPI'
import api from '../api/Api'
import { useEffect } from 'react'
import { useAppDispatch } from '../hooks/store-hook'
import { setUser } from '../store/reducers/User.reducer'
import { Navigate } from 'react-router-dom'
import PasswordsForm from './PasswordsForm'

const RegisterForm = () => {
  const dispatch = useAppDispatch()
  const [response, error, apiFetch] = useAPI()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerTypes>({
    resolver: zodResolver(Matchify(personalSchema.merge(passwordSchema))),
  })

  const submit = (data: registerTypes) => {
    apiFetch({
      method: 'post',
      apiInstance: api,
      data,
      url: 'auth/register',
    })
  }

  useEffect(() => {
    response?.data && dispatch(setUser(response.data))
  }, [response])

  return !response?.data ? (
    <form style={{ marginTop: '16px' }} onSubmit={handleSubmit(submit)}>
      <Error>{error}</Error>
      <PersonalDataForm errors={errors} width={420} register={register} />
      <PasswordsForm errors={errors} width={420} register={register} />
      <InputContainer>
        <Button type='submit' height={'39px'} width={'420px'} fgColour='#ffffff' bgColour={eColours.primaryBlue}>
          Sign up
        </Button>
      </InputContainer>
    </form>
  ) : (
    <Navigate to={'/'} />
  )
}

export default RegisterForm
