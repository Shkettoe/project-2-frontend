import styled from 'styled-components'
import { eColours } from '../assets/Vars'

const Grid = styled.div`
  min-height: 60vh;
  min-width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
    & section {
      margin-top: 20px;
      min-width: 92%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & p {
        color: ${eColours.black};
      }
    }
  }
`

export default Grid
