import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import iCommonSt from '../interfaces/props/Common.props.interface'

const Label = styled.label<iCommonSt>`
  font-size: ${props => props.fontSize || eFontSizes.caption};
  font-weight: ${props => props.fontWeight || eFontWeights.medium};
  color: ${props => props.fgColour || eColours.black};
  margin: 8px 0px;
`

export default Label
