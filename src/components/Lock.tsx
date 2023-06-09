import styled from 'styled-components'

const ST = styled.img`
  object-fit: scale-down !important;
  z-index: 3 !important;
`

const Lock = () => <ST src='/lock.png' />

export default Lock
