import styled from 'styled-components'

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
  }
`

export default Grid
