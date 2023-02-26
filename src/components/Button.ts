import styled from 'styled-components'
import { eColours, eFontSizes } from '../assets/Vars'
import { iCommonSt } from '../interfaces/props/Common.props.interface'

const Button = styled.button<iCommonSt>`
  padding: 6px 16px;
  font-size: ${eFontSizes.body};
  height: ${props => props.height};
  width: ${props => props.width};
  background-color: ${props => props.bgColour || eColours.primaryBlue};
  color: ${props => props.fgColour || '#ffffff'};
  border-radius: 4px;
  font-size: ${props => props.fontSize || '16px'};
  border: solid ${props => props.borderWidth || '0px'} ${props => props.borderColour || props.fgColour};
  text-transform: ${props => props.textTransform || 'uppercase'};
  @media (max-width: 720px) {
    width: ${props =>
      `${parseInt(props.width?.toString().substring(0, props.width?.toString().length - 2) || '420px') / 1.3}px` ||
      `${parseInt(props.style?.width?.toString().substring(0, props.style?.width?.toString().length - 2) || '420px') / 1.3}px`};
  }
  &:hover {
    background-color: ${props => props.bgColour && `#${(parseInt(props.bgColour.substring(1), 16) - parseInt('070707', 16)).toString(16)}`};
    text-decoration: underline;
    cursor: pointer;
  }
  & * {
    color: ${props => props.fgColour || '#ffffff'};
  }
`
export default Button
