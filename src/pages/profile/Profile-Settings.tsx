import Error from '../../components/Error'
import ReactDOM from 'react-dom'
import Overlay from '../../assets/DarkOverlay'
import STProfile from '../../assets/Profile.styles'
import { eColours, eFontSizes } from '../../assets/Vars'
import Paragraph from '../../components/Paragraph'
import { useContext, useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import api from '../../api/Api'
import { useAppDispatch } from '../../hooks/store-hook'
import useAPI from '../../hooks/useAPI'
import useR from '../../hooks/useR'
import { ProfileSettingsContext } from '../../store/context/ProfileSettingsContext'
import { setUser } from '../../store/reducers/User.reducer'
import personalSchema from '../../validation/schemas/PersonalInfo.schema'
import PersonalDataForm, { FlexRow } from '../../containers/PersonalDataForm'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import PasswordsForm from '../../containers/PasswordsForm'
import { InputB } from '../../components/Input'
import Label from '../../components/Label'
import InputContainer from '../../containers/InputContainer'
import registerTypes from '../../validation/types/Register.type'
import passwordSchema from '../../validation/schemas/Passwords.schema'
import Matchify from '../../validation/Matchify.util'
import ProfileImage from '../../components/ProfileImage'
import User from '../../interfaces/User.interface'

const ProfileSettings = () => {
  const [image, setImage] = useState<File>()

  enum eProfileTexts {
    profile = 'Change your information.',
    password = 'Change your password.',
    avatar = 'Change your profile photo.',
  }

  enum eRoutes {
    profile = 'auth/me',
    password = 'auth/me/update-password',
    avatar = 'users/uploads',
  }

  const eProfileRenders = {
    profile: () => (
      <PersonalDataForm
        user={user}
        errors={errors}
        width={529}
        register={register}
      />
    ),
    password: () => (
      <>
        <InputContainer>
          <Label htmlFor='password'>Current Password</Label>
          <InputB
            type={'password'}
            {...register('current_password')}
            width={'529px'}
            height={'46px'}
          />
          <Error>{errors.current_password?.message}</Error>
        </InputContainer>
        <PasswordsForm errors={errors} register={register} width={529} />
      </>
    ),
    avatar: () => (
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '529px',
            alignItems: 'center',
          }}>
          <Label htmlFor='image'>
            <InputB
              type='file'
              accept='.jpeg, .jpg, .png'
              multiple={false}
              id='image'
              hidden
              onChange={(e: React.ChangeEvent<any>) =>
                e.target.files && setImage(e.target.files[0])
              }
            />
            <ProfileImage
              src={image ? URL.createObjectURL(image) : user.avatar}
              width={'64px'}
            />
            <Button
              type='button'
              width={'529px'}
              height={'39px'}
              style={{ marginTop: '42px' }}>
              <label htmlFor='image'>Upload new image</label>
            </Button>
          </Label>
        </div>
      </>
    ),
  }

  const eResolvers = {
    profile: () => personalSchema,
    password: () => Matchify(passwordSchema),
    avatar: () => personalSchema,
  }

  const [user, ,] = useR()
  const dispatch = useAppDispatch()
  const [response, error, apiFetch] = useAPI<User>()
  const { setOpenProfile } = useContext(ProfileSettingsContext)
  const [page, setPage] = useState<'profile' | 'password' | 'avatar'>('profile')
  const [saved, setSaved] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerTypes>({
    resolver: zodResolver(eResolvers[page]()),
  })

  const submit = (data: any) => {
    const formData = new FormData()
    if (page == 'avatar' && image) {
      formData.append('file', image)
    }
    apiFetch({
      method: 'patch',
      apiInstance: api,
      url: eRoutes[page],
      data: page == 'avatar' ? formData : data,
    })
  }

  useEffect(() => {
    if (response?.data) {
      setTimeout(() => {
        dispatch(setUser(response.data))
        setSaved(true)
      }, 300)
    }
  }, [response])

  const btn = useRef<HTMLAnchorElement>(null)
  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => btn.current?.click()} />
      {!saved ? (
        <STProfile animation='fadein'>
          <Paragraph fontSize={eFontSizes.headline3}>
            Profile{' '}
            <span style={{ color: eColours.primaryBlue }}>settings.</span>
          </Paragraph>
          <Paragraph color={eColours.dark}>{eProfileTexts[page]}</Paragraph>
          <form
            onSubmit={handleSubmit(submit)}
            encType={page == 'avatar' ? 'multipart/form-data' : ''}>
            <>
              <Error>{error}</Error>
              {eProfileRenders[page]()}
              {page === 'profile' && (
                <FlexRow>
                  <Button
                    type='button'
                    onClick={() => setPage('password')}
                    textTransform={'none'}
                    bgColour={eColours.black}
                    width={'255.5px'}
                    height={'39px'}>
                    Change password
                  </Button>
                  <Button
                    type='button'
                    onClick={() => setPage('avatar')}
                    textTransform={'none'}
                    bgColour={eColours.primaryBlue}
                    width={'255.5px'}
                    height={'39px'}>
                    Change profile picture
                  </Button>
                </FlexRow>
              )}
              <FlexRow gap={'30px'} style={{ paddingTop: '32px' }}>
                <Button
                  type='submit'
                  bgColour={eColours.primaryBlue}
                  width={'121px'}
                  height={'39px'}>
                  Submit
                </Button>
                <section>
                  {user.role === 'admin' && (
                    <Link to={'/admin'}>Admin Panel</Link>
                  )}
                  <Link
                    ref={btn}
                    style={{ color: eColours.black }}
                    onClick={() => setOpenProfile(false)}
                    to={'#'}>
                    Cancel
                  </Link>
                </section>
              </FlexRow>
            </>
          </form>
        </STProfile>
      ) : (
        <STProfile animation='fadeout'>
          <Paragraph fontSize={eFontSizes.headline3}>
            Information changed
          </Paragraph>
          <Paragraph color={eColours.dark}>Your settings are saved</Paragraph>
          <FlexRow gap={'30px'}>
            <Button
              onClick={() => setOpenProfile(false)}
              type='submit'
              bgColour={eColours.primaryBlue}
              width={'121px'}
              height={'39px'}>
              Close
            </Button>
          </FlexRow>
        </STProfile>
      )}
    </>,
    document.getElementById('profile') as HTMLElement,
  )
}

export default ProfileSettings
