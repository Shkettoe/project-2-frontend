import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileSettingsContextProvider from '../store/context/ProfileSettingsContext'
import Container from './Container'
import Footer from './Footer'
import NavBar from './NavBar'

const Wrap = ({ children }: { children: React.ReactNode }) => {
  const authlessUrls = ['/register', '/login']
  const location = useLocation()

  return (
    <>
      <ProfileSettingsContextProvider>
        <NavBar auth={authlessUrls.includes(location.pathname)} />
      </ProfileSettingsContextProvider>
      <Container>{children}</Container>
      {!authlessUrls.includes(location.pathname) && <Footer />}
    </>
  )
}

export default Wrap
