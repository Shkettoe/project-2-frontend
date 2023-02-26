import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import Button from '../components/Button'
import ProfileImage from '../components/ProfileImage'
import useR from '../hooks/useR'
import ProfileSettings from '../pages/profile/Profile-Settings'
import { ProfileSettingsContext } from '../store/context/ProfileSettingsContext'

const StyledNavBar = styled.nav`
  width: 90%;
  padding: 22px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${eFontSizes.headline4};
  & div .light {
    color: ${eColours.primaryBlue};
  }
  & div .dark {
    color: ${eColours.black};
  }
`

const AuthedButton = styled(NavLink)`
  color: ${eColours.black};
  font-size: ${eFontSizes.body};
  font-weight: ${eFontWeights.light};
  margin: 24px;
`

const Plus = styled(NavLink)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 40px;
  height: 40px;
  background: #619b8a;
  border-radius: 60px;
  color: #fff;
  margin-bottom: -4px;
`

const Btns = (u: boolean, logout: () => void, openProfile: boolean, setOpenProfile: (state: boolean) => void) => {
  if (u)
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <AuthedButton to={'/'}>Home</AuthedButton>
        <AuthedButton to={'auth'} onClick={() => setOpenProfile(true)}>
          Profile Settings
        </AuthedButton>
        <AuthedButton onClick={logout} to={'/login'}>
          Logout
        </AuthedButton>
        <NavLink to={'profile'}>
          <ProfileImage src='/default.png' />
        </NavLink>
        <Plus to={'location'}>+</Plus>
        {openProfile && <ProfileSettings />}
      </div>
    )
  return (
    <>
      <NavLink to={'login'} style={{ color: eColours.dark, fontSize: eFontSizes.body, fontWeight: eFontWeights.medium }}>
        Sign in
      </NavLink>
      <span style={{ fontSize: eFontSizes.body, margin: '0px 16px', fontWeight: eFontWeights.light }}> or </span>
      <NavLink to={'register'}>
        <Button width={'137px'} height={'31px'}>
          Sign up
        </Button>
      </NavLink>
    </>
  )
}

const NavBar = ({ auth = false }: { auth: boolean }) => {
  const [user, terminateSession] = useR()
  const { openProfile, setOpenProfile } = useContext(ProfileSettingsContext)

  return (
    <StyledNavBar>
      <div>
        <NavLink style={{ fontWeight: eFontWeights.medium }} to={'/'}>
          <img src='/logo.png' alt='' /> <span className='light'>Geo</span>
          <span className='dark'>tagger</span>
        </NavLink>
      </div>
      <div>{!auth && Btns(Boolean(user?.id), terminateSession, openProfile, setOpenProfile)}</div>
    </StyledNavBar>
  )
}

export default NavBar
