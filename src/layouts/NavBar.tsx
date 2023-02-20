import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import Button from '../components/Button'

const StyledNavBar = styled.nav`
  width: 90%;
  padding: 40px 80px;
  display: flex;
  justify-content: space-between;
  font-size: ${eFontSizes.headline4};
  & div .light {
    color: ${eColours.primaryBlue};
  }
  & div .dark {
    color: ${eColours.black};
  }
`

const btns = (u: boolean) => {
  if (u) return <div>logged in</div>
  return (
    <>
      <Link to={'login'} style={{ color: eColours.dark, fontSize: eFontSizes.body, fontWeight: eFontWeights.medium }}>
        Sign in
      </Link>
      <span style={{ fontSize: eFontSizes.body, margin: '0px 16px', fontWeight: eFontWeights.light }}> or </span>
      <Link to={'register'}>
        <Button width={'137px'} height={'31px'}>
          Sign up
        </Button>
      </Link>
    </>
  )
}

const NavBar = ({ auth = false }: { auth: boolean }) => {
  return (
    <StyledNavBar>
      <div>
        <Link to={'/'}>
          <img src='/logo.png' alt='' /> <span className='light'>Geo</span>
          <span className='dark'>tagger</span>
        </Link>
      </div>
      <div>{!auth && btns(false)}</div>
    </StyledNavBar>
  )
}

export default NavBar
