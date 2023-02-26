import styled from 'styled-components'
import { eColours } from './Vars'

const STProfile = styled.div<{ animation: string }>`
  position: fixed;
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  & p {
    padding-bottom: 32px;
  }
  overflow: hidden;
  animation: ${props => props.animation} 0.5s ease-in forwards;
  @keyframes fadein {
    100% {
      width: 529px;
      height: 465px;
      padding: 16px 32px;
      border: 0px;
    }
    0% {
      width: 0px;
      height: 0px;
      padding: 4px;
      border: 2px solid ${eColours.primaryOrange};
    }
    30% {
      width: 529px;
      height: 0px;
      padding: 4px 32px;
      border: 1px solid ${eColours.primaryOrange};
    }
  }
  @keyframes fadeout {
    100% {
      width: 529px;
      height: 197px;
      padding: 16px 32px;
      border: 0px;
    }
    0% {
      width: 0px;
      height: 0px;
      padding: 4px;
      border: 2px solid ${eColours.primaryOrange};
    }
    30% {
      width: 529px;
      height: 0px;
      padding: 4px 32px;
      border: 1px solid ${eColours.primaryOrange};
    }
  }
`

export default STProfile
