import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import useR from './hooks/useR'
import Wrap from './layouts/Wrap'
import ConfirmEmail from './pages/ConfirmEmail'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import FrontPage from './pages/FrontPage'
import Loading from './layouts/Loading'

function App() {
  const [user, , startSession, error] = useR()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    startSession()
  }, [])

  useEffect(() => {
    if (user || error) setTimeout(() => setLoading(false), 500)
  }, [user])

  return loading ? (
    <Loading />
  ) : (
    <Wrap>
      <Routes>
        <Route path='loading' element={<Loading />} />
        {!user?.id ? (
          <>
            <Route path='*' element={<FrontPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </>
        ) : (
          <>
            <Route path='auth/confirm' element={<ConfirmEmail />} />
            <Route path='location' element={<>teehee</>}>
              <Route path='location/:id' element={<>someone's post</>} />
            </Route>
          </>
        )}
      </Routes>
    </Wrap>
  )
}

export default App
