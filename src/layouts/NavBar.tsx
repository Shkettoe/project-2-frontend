import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { eColours, eFontSizes } from '../assets/Vars'
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

const NavBar = ({ auth = false }: { auth: boolean }) => {
  const location = useLocation()
  return (
    <StyledNavBar>
      <div>
        <img src='/logo.png' alt='' /> <span className='light'>Geo</span>
        <span className='dark'>tagger</span>
      </div>
      <div>{!auth && <Button>bksjfksl</Button>}</div>
    </StyledNavBar>
  )
}

export default NavBar
