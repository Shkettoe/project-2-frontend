import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import { iCommonSt } from '../interfaces/props/Common.props.interface'

export const InputA = styled.input<iCommonSt>`
  box-sizing: border-box;
  color: ${eColours.dark};
  width: ${props => props.width};
  height: ${props => props.height};
  padding: 0px 12px;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  font-size: ${eFontSizes.caption};
  font-weight: ${eFontWeights.medium};
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.42);
  }
`

export const InputB = styled(InputA)`
  padding: 0px;
  border: 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: 0px;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.84);
  }
`
