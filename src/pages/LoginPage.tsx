import Background from '../assets/Background'
import { eColours, eFontSizes, eFontWeights } from '../assets/Vars'
import LoginForm from '../containers/LoginForm'
import Grid from '../containers/TwoContainerGrid'

const LoginPage = () => {
  return (
    <Grid>
      <div>
        <p style={{ color: eColours.black, fontSize: eFontSizes.headline3, fontWeight: eFontWeights.medium }}>Sign in</p>
        <p style={{ color: eColours.black, fontSize: eFontSizes.body, margin: '16px', width: '90%' }}>
          Welcome back to Geotagger. We are glad that you are back.
        </p>
        <LoginForm />
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

export default LoginPage
