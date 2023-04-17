import styled from 'styled-components'
import iCommonSt from '../interfaces/props/Common.props.interface'

const ProfileImage = styled.img<iCommonSt & { marginBtm?: string }>`
  object-fit: cover;
  border-radius: 100%;
  width: ${props => props.width || props.height || '40px'};
  height: ${props => props.height || props.width || '40px'};
  margin: 16px;
  margin-bottom: ${props => props.marginBtm};
`
export default ProfileImage
