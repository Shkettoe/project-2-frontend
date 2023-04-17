import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { eColours } from '../assets/Vars'
import useR from '../hooks/useR'
import iCommonSt from '../interfaces/props/Common.props.interface'

const FooterStyles = styled.footer<iCommonSt>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 60px;

  /* Orange */
  background: ${eColours.primaryBlue};

  /* Shadow */
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.15);
  border-radius: 0px;
  & div {
    gap: 82px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 72px;

    justify-content: space-between;
    /* width: 1440px; */
    height: 25px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;

    & div {
      max-width: 450px;
      flex: none;
      order: 1;
      flex-grow: 1;
      color: #fff;
      justify-content: end;
      & a {
        text-decoration: underline;
        color: #fff;
        &:hover {
          color: #ddd;
        }
      }
    }

    & img {
      flex: none;
      order: 0;
      flex-grow: 0;
    }
  }
`

const Footer = ({}: iCommonSt) => {
  const [user] = useR()

  return (
    <>
      <FooterStyles>
        <div>
          <img src='/Logo.png' alt='' />
          <div>
            {user.role == 'admin' && (
              <NavLink to={'admin'}>Admin Panel</NavLink>
            )}
            All rights reserved | skillupmentor.com
          </div>
        </div>
      </FooterStyles>
    </>
  )
}
export default Footer
