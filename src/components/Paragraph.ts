import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import iCommonSt from '../interfaces/props/Common.props.interface'

const Paragraph = styled.p<iCommonSt & { textAlign?: string }>`
  text-align: ${props => props.textAlign || 'center'};
  font-size: ${props => props.fontSize || eFontSizes.body};
  font-weight: ${props => props.fontWeight || eFontWeights.light};
  color: ${props => props.color || eColours.black};
  width: ${props => props.width};
`

export default Paragraph
