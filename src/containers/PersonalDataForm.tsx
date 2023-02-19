import Error from '../components/Error'
import styled from 'styled-components'
import { eFontWeights } from '../assets/Vars'
import { InputB } from '../components/Input'
import InputContainer from '../containers/InputContainer'
import Label from '../components/Label'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import registerTypes from '../validation/types/Register.type'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row !important;
  gap: 16px;
`

const Personal = ({ width = 420, register, errors }: { width: number; register: UseFormRegister<registerTypes>; errors: FieldErrors<registerTypes> }) => {
  return (
    <>
      <InputContainer>
        <Label fontWeight={eFontWeights.medium} htmlFor='email'>
          Email
        </Label>
        <InputB {...register('email')} height={'38px'} width={`${width}px`} />
        <Error>{errors.email?.message}</Error>
      </InputContainer>
      <FlexRow>
        <InputContainer>
          <Label fontWeight={eFontWeights.medium} htmlFor='first_name'>
            First Name
          </Label>
          <InputB {...register('first_name')} height={'38px'} width={`${(width - 16) / 2}px`} />
          <Error>{errors.first_name?.message}</Error>
        </InputContainer>
        <InputContainer>
          <Label fontWeight={eFontWeights.medium} htmlFor='last_name'>
            Last Name
          </Label>
          <InputB {...register('last_name')} height={'38px'} width={`${(width - 16) / 2}px`} />
          <Error>{errors.last_name?.message}</Error>
        </InputContainer>
      </FlexRow>
    </>
  )
}

export default Personal
