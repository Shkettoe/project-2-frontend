import { useLocation } from 'react-router-dom'
import Container from './Container'
import Footer from './Footer'
import NavBar from './NavBar'

const Wrap = ({ children }: { children: React.ReactNode }) => {
  const authlessUrls = ['/register', '/login']
  const location = useLocation()

  return (
    <>
      <NavBar auth={authlessUrls.includes(location.pathname)} />
      <Container>{children}</Container>
      {!authlessUrls.includes(location.pathname) && <Footer />}
    </>
  )
}

export default Wrap
