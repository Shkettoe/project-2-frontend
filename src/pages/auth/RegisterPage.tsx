import { Link } from 'react-router-dom'
import Background from '../../assets/Background'
import {
  eColours,
  eFontSizes,
  eFontWeights,
  eProfileImageSizes,
} from '../../assets/Vars'
import Paragraph from '../../components/Paragraph'
import ProfileImage from '../../components/ProfileImage'
import RegisterForm from '../../containers/RegisterForm'
import Grid from '../../containers/TwoContainerGrid'
import useDimensions from '../../hooks/useDimensions'

const RegisterPage = () => {
  const { windowWidth } = useDimensions()

  return (
    <Grid>
      <div>
        <Paragraph
          fontSize={eFontSizes.headline3}
          fontWeight={eFontWeights.medium}>
          Sign up
        </Paragraph>
        <Paragraph
          width={'90%'}
          style={{ margin: '16px' }}
          color={eColours.dark}>
          Your name will appear on posts and your public profle.
        </Paragraph>
        <ProfileImage src='default.png' width={eProfileImageSizes.big} />
        <RegisterForm />
        <div
          style={{
            color: eColours.black,
            fontSize: eFontSizes.body,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: windowWidth > 1280 ? '100%' : '90%',
            flexDirection: 'row',
          }}>
          <p>Already have an account?</p>
          <Link to='/login' style={{ color: eColours.primaryBlue }}>
            Sign in
          </Link>
        </div>
      </div>
      {windowWidth > 1280 && (
        <div>
          <Background />
        </div>
      )}
    </Grid>
  )
}

export default RegisterPage
