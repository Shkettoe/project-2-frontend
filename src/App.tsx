import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import useR from './hooks/useR'
import Wrap from './layouts/Wrap'
import ConfirmEmail from './pages/ConfirmEmail'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import FrontPage from './pages/FrontPage'
import Loading from './layouts/Loading'
import HomePage from './pages/HomePage'
import AddLocation from './pages/AddLocation'
import Locationer from './pages/Location'
import ProfilePage from './pages/ProfileChamber'
import LocationEdit from './pages/LocationEdit'
import Paragraph from './components/Paragraph'
import styled from 'styled-components'
import { eColours, eFontSizes } from './assets/Vars'
import useEvents from './hooks/useEvents'
import Events from './containers/Events'
import EventsContextProvider from './store/context/EventsContext'
import RecoverPassword from './pages/RecoverPassword'
import SendPasswordRecovery from './pages/SendPasswordRecovery'

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
`

function App() {
  const [listen] = useEvents()
  const [user, , startSession, , , loading, noConn] = useR()

  useEffect(() => {
    listen()
    startSession()
  }, [])

  if (loading) return <Loading />

  return noConn ? (
    <Flex>
      <Paragraph fontSize={eFontSizes.headline2}>
        No <span style={{ color: eColours.primaryOrange }}>connection </span>to
        the <span style={{ color: eColours.primaryBlue }}>server</span>....
      </Paragraph>
    </Flex>
  ) : (
    <Wrap>
      <Routes>
        <Route path='loading' element={<Loading />} />
        {!user?.id ? (
          <>
            <Route path='*' element={<FrontPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='forgot' element={<SendPasswordRecovery />} />
          </>
        ) : (
          <>
            <Route path='*' element={<HomePage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='profile/:id' element={<ProfilePage />} />
            <Route path='auth'>
              <Route path='confirm' element={<ConfirmEmail />} />
              <Route path='change-password' element={<RecoverPassword />} />
            </Route>
            <Route path='location' element={<AddLocation />} />
            <Route path='location/:id' element={<Locationer />} />
            <Route path='location/:id/edit' element={<LocationEdit />} />
            {user.role == 'admin' && (
              <Route path='admin' element={<Events />} />
            )}
          </>
        )}
      </Routes>
    </Wrap>
  )
}

export default App
