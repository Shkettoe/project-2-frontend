import Error from '../components/Error'
import { eColours, eFontWeights } from '../assets/Vars'
import Button from '../components/Button'
import { InputB } from '../components/Input'
import InputContainer from '../containers/InputContainer'
import Label from '../components/Label'
import PersonalDataForm from './PersonalDataForm'
import { zodResolver } from '@hookform/resolvers/zod'
import personalSchema from '../validation/schemas/PersonalInfo.schema'
import passwordSchema from '../validation/schemas/Passwords.schema'
import Matchify from '../validation/Matchify.util'
import { useForm } from 'react-hook-form'
import registerTypes from '../validation/types/Register.type'

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerTypes>({
    resolver: zodResolver(Matchify(personalSchema.merge(passwordSchema))),
  })

  const submit = (data: registerTypes) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <PersonalDataForm errors={errors} width={420} register={register} />
      <InputContainer>
        <Label fontWeight={eFontWeights.medium} htmlFor='password'>
          Password
        </Label>
        <InputB type={'password'} {...register('password')} height={'38px'} width={'420px'} />
        <Error>{errors.password?.message}</Error>
      </InputContainer>
      <InputContainer>
        <Label fontWeight={eFontWeights.medium} htmlFor='confirm_password'>
          Confirm Password
        </Label>
        <InputB type={'password'} {...register('confirm_password')} height={'38px'} width={'420px'} />
        <Error>{errors.confirm_password?.message}</Error>
      </InputContainer>
      <InputContainer>
        <Button type='submit' height={'39px'} width={'420px'} fgColour='#ffffff' bgColour={eColours.primaryBlue}>
          Sign up
        </Button>
      </InputContainer>
    </form>
  )
}

export default RegisterForm
