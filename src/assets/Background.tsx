import styled from 'styled-components'

const BackgroundContainer = styled.div`
  background: url('image 1.png');
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  width: 40.5vw;
`

const Background = () => {
  return <BackgroundContainer />
}

export default Background
