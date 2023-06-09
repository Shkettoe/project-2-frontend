import styled from 'styled-components'

const Overlay = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.4);
  animation: overlay 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  @keyframes overlay {
    100% {
      background-color: rgba(0, 0, 0, 0.4);
    }
    0% {
      background-color: rgba(0, 0, 0, 0);
    }
  }
`

export default Overlay
