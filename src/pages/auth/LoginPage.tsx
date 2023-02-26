import Background from '../../assets/Background'
import { eColours, eFontSizes, eFontWeights } from '../../assets/Vars'
import Paragraph from '../../components/Paragraph'
import LoginForm from '../../containers/LoginForm'
import Grid from '../../containers/TwoContainerGrid'

const LoginPage = () => {
  return (
    <Grid>
      <div>
        <Paragraph fontSize={eFontSizes.headline3} fontWeight={eFontWeights.medium}>
          Sign in
        </Paragraph>
        <Paragraph width={'90%'} style={{ margin: '16px' }} color={eColours.dark}>
          Welcome back to Geotagger. We are glad that you are back.
        </Paragraph>
        <LoginForm />
        <div
          style={{
            color: eColours.black,
            fontSize: eFontSizes.body,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            minWidth: '92%',
          }}>
          <p>Do you want to create an account?</p>
          <a href='/register' style={{ color: eColours.primaryBlue }}>
            Sign up
          </a>
        </div>
      </div>
      <div>
        <Background />
      </div>
    </Grid>
  )
}

export default LoginPage
