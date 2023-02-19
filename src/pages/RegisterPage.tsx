import Background from '../assets/Background'
import { eColours, eFontSizes, eFontWeights, eProfileImageSizes } from '../assets/Vars'
import ProfileImage from '../components/ProfileImage'
import RegisterForm from '../containers/RegisterForm'
import Grid from '../containers/TwoContainerGrid'

const RegisterPage = () => {
  return (
    <Grid>
      <div>
        <p style={{ color: eColours.black, fontSize: eFontSizes.headline3, fontWeight: eFontWeights.medium }}>Sign up</p>
        <p style={{ color: eColours.black, fontSize: eFontSizes.body, margin: '16px', width: '90%' }}>Your name will appear on posts and your public profle.</p>
        <ProfileImage src='default.png' width={eProfileImageSizes.big} />
        <RegisterForm />
        <p style={{ color: eColours.black, fontSize: eFontSizes.body, display: 'flex', justifyContent: 'space-between', minWidth: '92%' }}>
          Do you want to create an account?
          <a href='/register' style={{ color: eColours.primaryBlue }}>
            Sign up
          </a>
        </p>
      </div>
      <div>
        <Background />
      </div>
    </Grid>
  )
}

export default RegisterPage
