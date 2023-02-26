import Error from '../components/Error'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { eFontWeights } from '../assets/Vars'
import { InputB } from '../components/Input'
import Label from '../components/Label'
import registerTypes from '../validation/types/Register.type'
import InputContainer from './InputContainer'

const PasswordsForm = ({ width = 420, register, errors }: { width: number; register: UseFormRegister<any>; errors: FieldErrors<registerTypes> }) => {
  return (
    <>
      <InputContainer>
        <Label fontWeight={eFontWeights.medium} htmlFor='password'>
          Password
        </Label>
        <InputB type={'password'} {...register('password')} height={'38px'} width={`${width}px`} />
        <Error>{errors.password?.message}</Error>
      </InputContainer>
      <InputContainer>
        <Label fontWeight={eFontWeights.medium} htmlFor='confirm_password'>
          Confirm Password
        </Label>
        <InputB type={'password'} {...register('confirm_password')} height={'37px'} width={`${width}px`} />
        <Error>{errors.confirm_password?.message}</Error>
      </InputContainer>
    </>
  )
}

export default PasswordsForm
