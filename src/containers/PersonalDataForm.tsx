import Error from '../components/Error'
import styled from 'styled-components'
import { eFontWeights } from '../assets/Vars'
import { InputB } from '../components/Input'
import InputContainer from '../containers/InputContainer'
import Label from '../components/Label'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { iCommonSt } from '../interfaces/props/Common.props.interface'
import User from '../interfaces/User.interface'
import personalTypes from '../validation/types/Personal.type'

export const FlexRow = styled.div<iCommonSt>`
  display: flex;
  align-items: center;
  flex-direction: row !important;
  gap: ${props => props.gap || '16px'};
`

const Personal = ({
  width = 420,
  register,
  errors,
  user,
}: {
  width: number
  register: UseFormRegister<any>
  errors: FieldErrors<personalTypes>
  user?: User
}) => {
  return (
    <>
      <InputContainer>
        <Label fontWeight={eFontWeights.medium} htmlFor='email'>
          Email
        </Label>
        <InputB defaultValue={user?.email} {...register('email')} height={'38px'} width={`${width}px`} />
        <Error>{errors.email?.message}</Error>
      </InputContainer>
      <FlexRow>
        <InputContainer>
          <Label fontWeight={eFontWeights.medium} htmlFor='first_name'>
            First Name
          </Label>
          <InputB defaultValue={user?.first_name} {...register('first_name')} height={'38px'} width={`${(width - 16) / 2}px`} />
          <Error>{errors.first_name?.message}</Error>
        </InputContainer>
        <InputContainer>
          <Label fontWeight={eFontWeights.medium} htmlFor='last_name'>
            Last Name
          </Label>
          <InputB defaultValue={user?.last_name} {...register('last_name')} height={'38px'} width={`${(width - 16) / 2}px`} />
          <Error>{errors.last_name?.message}</Error>
        </InputContainer>
      </FlexRow>
    </>
  )
}

export default Personal
