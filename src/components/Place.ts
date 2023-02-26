import styled from 'styled-components'
import { eColours, eLeaderboardGradients } from '../assets/Vars'
import { iCommonSt } from '../interfaces/props/Common.props.interface'

interface Place extends iCommonSt {
  index: number
}

const Place = styled.div<Place>`
  border-radius: 100%;
  width: ${props => props.width || '27px'};
  height: ${props => props.height || '27px'};
  padding: 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => Object.values(eLeaderboardGradients)[props.index] || eColours.black};
`

export default Place
