import { Route, Routes } from 'react-router-dom'
import './App.css'
import { eColours, eProfileImageSizes } from './assets/Vars'
import Button from './components/Button'
import { InputB } from './components/Input'
import Place from './components/Place'
import ProfileImage from './components/ProfileImage'
import LoginForm from './containers/LoginForm'
import RegisterForm from './containers/RegisterForm'
import Wrap from './layouts/Wrap'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Wrap>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Wrap>
  )
}

export default App
