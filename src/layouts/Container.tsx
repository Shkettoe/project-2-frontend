import styled from 'styled-components'

const ContainerST = styled.div`
  margin-top: 80px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 130px;
`

const Container = ({ children }: { children: React.ReactNode }) => {
  return <ContainerST className='Container'>{children}</ContainerST>
}
export default Container
