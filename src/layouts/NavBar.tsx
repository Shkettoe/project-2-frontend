import { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import ProfileImage from '../components/ProfileImage'
import useDimensions from '../hooks/useDimensions'
import useEvents from '../hooks/useEvents'
import useR from '../hooks/useR'
import User from '../interfaces/User.interface'
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

const NarrowBone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100vw;
  margin: 12px;
  & div {
    min-width: 80vw;
    display: flex;
    justify-content: space-between;
    & img {
      margin: 0px;
      object-fit: scale-down;
    }
    & a {
      display: flex;
      flex-direction: row;
      font-size: 24px;
      color: ${eColours.black};
    }
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 720px) {
    background-color: #fff;
    position: absolute;
    left: 0px;
    top: 0px;
    flex-direction: column-reverse;
    min-width: 100vw;
    justify-content: center;
    & a button {
      min-width: 80vw;
      min-height: 40px;
      margin: 12px;
    }
  }
`

const AuthedButton = styled(NavLink)`
  color: ${eColours.black};
  font-size: ${eFontSizes.body};
  font-weight: ${eFontWeights.light};
  margin: 24px;
`

const Plus = styled(NavLink)`,
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 40px;
  height: 40px;
  background: ${eColours.primaryBlue};
  border-radius: 60px;
  color: #fff;
  margin-bottom: -4px;
`

const Btns = (
  u: User,
  logout: () => void,
  openProfile: boolean,
  setOpenProfile: (state: boolean) => void,
  ww: number,
  setBtns: (btns: boolean) => void,
) => {
  const BtnsAuthWide = () => (
    <ButtonsContainer>
      <AuthedButton to={'/'}>Home</AuthedButton>
      <AuthedButton to={'#'} onClick={() => setOpenProfile(true)}>
        Profile Settings
      </AuthedButton>
      <AuthedButton onClick={logout} to={'/login'}>
        Logout
      </AuthedButton>
      <NavLink to={'profile'}>
        <ProfileImage src={u.avatar || 'default.png'} marginBtm={'0px'} />
      </NavLink>
      <Plus to={'location'}>+</Plus>
      {openProfile && <ProfileSettings />}
    </ButtonsContainer>
  )

  const BtnsAuthNarrow = () => (
    <ButtonsContainer>
      <NarrowBone>
        <div>
          <AuthedButton to={'/'}>Home</AuthedButton>
          <img src='/arrow.png' />
        </div>
      </NarrowBone>
      <NarrowBone>
        <div>
          <AuthedButton to={'#'} onClick={() => setOpenProfile(true)}>
            Profile Settings
          </AuthedButton>
          <img src='/arrow.png' />
        </div>
      </NarrowBone>
      <NarrowBone>
        <div>
          {' '}
          <AuthedButton onClick={logout} to={'/login'}>
            Logout
          </AuthedButton>
          <img src='/arrow.png' />
        </div>
      </NarrowBone>
      <NarrowBone>
        <div>
          <NavLink to={'profile'}>
            <ProfileImage src={u.avatar || 'default.png'} marginBtm={'0px'} />
            <Paragraph>{u.first_name + ' ' + u.last_name}</Paragraph>
          </NavLink>
        </div>
      </NarrowBone>
      <NarrowBone>
        <div>
          <section></section>
          <ProfileImage
            style={{ marginRight: '-18px' }}
            src='/close.png'
            onClick={() => setBtns(false)}
          />
        </div>
      </NarrowBone>
    </ButtonsContainer>
  )

  if (u?.id) return ww < 720 ? BtnsAuthNarrow() : BtnsAuthWide()
  return (
    <ButtonsContainer>
      <NavLink
        to={'login'}
        style={{
          color: eColours.dark,
          fontSize: eFontSizes.body,
          fontWeight: eFontWeights.medium,
        }}>
        {ww > 720 ? (
          <>Sign in</>
        ) : (
          <Button
            onClick={() => setBtns(false)}
            bgColour='#ffffff'
            fgColour={eColours.primaryBlue}
            borderColour={eColours.primaryBlue}
            borderWidth='2px'
            width={'137px'}
            height={'31px'}>
            Sign in
          </Button>
        )}
      </NavLink>
      <span
        style={{
          fontSize: eFontSizes.body,
          margin: '0px 16px',
          fontWeight: eFontWeights.light,
        }}>
        {ww > 720 && <>or</>}
      </span>
      <NavLink to={'register'}>
        <Button
          width={'137px'}
          height={'31px'}
          onClick={() => setBtns(ww > 720)}>
          Sign up
        </Button>
      </NavLink>
      {ww < 720 && (
        <NarrowBone>
          <div>
            <section></section>
            <ProfileImage
              style={{ marginRight: '-18px' }}
              src='/close.png'
              onClick={() => setBtns(false)}
            />
          </div>
          <div>
            <NavLink to={'/'}>Home</NavLink>
            <img src='/arrow.png' />
          </div>
        </NarrowBone>
      )}
    </ButtonsContainer>
  )
}

const NavBar = ({ auth = false }: { auth: boolean }) => {
  const [user, terminateSession] = useR()
  const { openProfile, setOpenProfile } = useContext(ProfileSettingsContext)
  const [, uploadEvents] = useEvents()
  const location = useLocation()

  const [btns, setBtns] = useState(false)
  const { windowWidth } = useDimensions()

  const logout = () => {
    uploadEvents()
    terminateSession()
  }

  return (
    <StyledNavBar>
      <div>
        <NavLink
          style={{
            fontWeight: eFontWeights.medium,
            display: 'flex',
            flexDirection: 'row',
          }}
          to={'/'}>
          <img src='/logo.png' alt='' /> <span className='light'>Geo</span>
          <span className='dark'>tagger</span>
        </NavLink>
      </div>
      {(windowWidth > 720 || btns) && (
        <div>
          {!auth &&
            Btns(
              user,
              logout,
              openProfile,
              setOpenProfile,
              windowWidth,
              setBtns,
            )}
        </div>
      )}
      {windowWidth < 720 &&
        !btns &&
        location.pathname != '/register' &&
        location.pathname != '/login' && (
          <ProfileImage
            style={{ marginRight: '80px' }}
            src='/menu.png'
            onClick={() => setBtns(true)}
          />
        )}
    </StyledNavBar>
  )
}

export default NavBar
