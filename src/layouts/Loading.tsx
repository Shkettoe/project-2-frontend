import styled from 'styled-components'
import { eColours } from '../assets/Vars'

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;

  & p {
    margin: 50px;
    font-size: 22px;
    font-weight: 500;
    color: ${eColours.orange};
  }

  & div {
    width: 67px;
    height: 67px;
    border: 5px solid ${eColours.polishedPine};
    border-radius: 50%;
    border-top-color: ${eColours.dark};
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingScreen = () => {
  return (
    <Loading>
      <div></div>
      <p>Loading....</p>
    </Loading>
  )
}
export default LoadingScreen
