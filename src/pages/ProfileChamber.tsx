import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Overlay from '../assets/DarkOverlay'
import STProfile from '../assets/Profile.styles'
import { eColours, eFontSizes, eProfileImageSizes } from '../assets/Vars'
import Button from '../components/Button'
import Error from '../components/Error'
import Paragraph from '../components/Paragraph'
import Polaroid from '../components/Polaroid'
import ProfileImage from '../components/ProfileImage'
import { FlexRow } from '../containers/PersonalDataForm'
import { useAppDispatch } from '../hooks/store-hook'
import useAPI from '../hooks/useAPI'
import useR from '../hooks/useR'
import Guess from '../interfaces/Guess.interface'
import Location from '../interfaces/Location.interface'
import User from '../interfaces/User.interface'
import { setUser } from '../store/reducers/User.reducer'

const Profile = styled.div`
  padding: 16px;
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: flex-start;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    & img {
      margin: 0px;
    }
  }
`

const Quadrinity = styled.div`
  min-width: 1280px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 19px;
`

const DeletionPrompt = ({
  id,
  setIndex,
  setAlertion,
  locations,
  setLocations,
}: {
  id: number | null
  setIndex: (i: number | null) => void
  setAlertion: (set: boolean) => void
  locations: Location[]
  setLocations: (locations: Location[]) => void
}) => {
  const btn = useRef<HTMLParagraphElement>(null)
  const [response, error, apiFetch] = useAPI()

  const deleteLocation = () => {
    apiFetch({
      method: 'delete',
      url: `locations/${id}`,
    })
  }

  useEffect(() => {
    if (response?.data) {
      for (const i of locations) {
        if (i.id == id) {
          var locs = locations
          locs = locs.filter(j => j !== i)
          setLocations(locs)
          break
        }
      }
      btn.current?.click()
      setIndex(null)
    }
  }, [response])

  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => btn.current?.click()} />
      <STProfile animation='fadeout'>
        <Paragraph fontSize={eFontSizes.headline3}>Are you sure?</Paragraph>
        <Paragraph color={eColours.dark}>
          This location will be deleted. There is no undo of this action.
        </Paragraph>
        <Error>{error}</Error>
        <FlexRow gap={'30px'}>
          <Button
            onClick={() => deleteLocation()}
            type='submit'
            bgColour={eColours.primaryBlue}
            width={'121px'}
            height={'39px'}>
            Submit
          </Button>
          <Paragraph
            ref={btn}
            style={{ cursor: 'pointer' }}
            onClick={() => setAlertion(false)}>
            Cancel
          </Paragraph>
        </FlexRow>
      </STProfile>
    </>,
    document.getElementById('profile') as HTMLElement,
  )
}

const ProfilePage = () => {
  const [current] = useR()
  const [userRes, userError, fetchUser] = useAPI<User>()
  const id = useParams().id
  const dispatch = useAppDispatch()
  const [limit, setLimit] = useState(3)
  const [limit2, setLimit2] = useState(3)
  const [alertion, setAlertion] = useState(false)
  const [user, setUserState] = useState<User>({} as User)
  const [index, setIndex] = useState<number | null>(null)
  const [locations, setLocations] = useState<Location[]>()

  const remove = (id: number) => {
    setIndex(id)
    setAlertion(true)
  }

  useEffect(() => {
    if (!id) {
      setUserState(current)
      setLocations(current.locations)
    } else {
      fetchUser({
        method: 'get',
        url: `users/${id}`,
      })
    }
  }, [id])

  useEffect(() => {
    if (userRes?.data) {
      setUserState(userRes?.data)
      setLocations(userRes?.data.locations)
    }
  }, [userRes])

  useEffect(() => {
    if (
      user.id === current.id &&
      user.locations?.length &&
      user.locations !== locations
    ) {
      let u = JSON.parse(JSON.stringify(user)) as User
      u.locations = locations || []
      dispatch(setUser(u))
    }
  }, [locations])

  return user.id ? (
    <>
      <Profile>
        <div>
          <ProfileImage src={user.avatar} width={eProfileImageSizes.big} />
          <Paragraph fontSize={eFontSizes.headline4}>
            {user.first_name} {user.last_name}
          </Paragraph>
        </div>
        <div></div>
        <Paragraph fontSize={eFontSizes.headline4}>
          {current.id === user.id ? 'My' : `${user.first_name}'s`} best guesses
        </Paragraph>
        {!user.guesses || !user.guesses.length ? (
          <Paragraph color={eColours.orange}>
            {current.id === user.id
              ? "You haven't"
              : `${user.first_name} hasn't`}{' '}
            guessed anything yet.
          </Paragraph>
        ) : (
          <>
            <Quadrinity>
              {user.guesses.slice(0, limit).map((g: Guess) => (
                <Polaroid
                  width={'310px'}
                  height={'175px'}
                  id={g.location.id}
                  src={g.location.image_url}
                  filter={1}
                  content={g.error_distance}
                  key={g.id}
                />
              ))}
            </Quadrinity>

            {limit < user.guesses.length && (
              <Button
                width={'132px'}
                height={'43px'}
                fgColour={eColours.primaryBlue}
                bgColour={'#ffffff'}
                borderColour={eColours.primaryBlue}
                borderWidth={'1px'}
                onClick={() => setLimit(prev => prev + 3)}>
                Load more
              </Button>
            )}
          </>
        )}
        <Paragraph fontSize={eFontSizes.headline4}>
          {current.id === user.id ? 'My' : `${user.first_name}'s`} uploads
        </Paragraph>
        {!locations?.length ? (
          <Paragraph color={eColours.orange}>
            {current.id === user.id
              ? "You haven't"
              : `${user.first_name} hasn't`}{' '}
            posted anything yet.
          </Paragraph>
        ) : (
          <>
            <Quadrinity>
              {locations.slice(0, limit2).map((l: Location) => (
                <Polaroid
                  interactable={user.id === current.id ? 1 : 0}
                  deleteLoc={remove}
                  width={'310px'}
                  height={'175px'}
                  id={l.id}
                  key={l.id}
                  src={l.image_url}
                />
              ))}
            </Quadrinity>
            {limit2 < locations.length && (
              <Button
                width={'132px'}
                height={'43px'}
                fgColour={eColours.primaryBlue}
                bgColour={'#ffffff'}
                borderColour={eColours.primaryBlue}
                borderWidth={'1px'}
                onClick={() => setLimit2(prev => prev + 3)}>
                Load more
              </Button>
            )}
          </>
        )}
      </Profile>
      {alertion && (
        <DeletionPrompt
          id={index}
          setIndex={setIndex}
          setAlertion={setAlertion}
          locations={locations || []}
          setLocations={setLocations}
        />
      )}
    </>
  ) : (
    <Error>{userError}</Error>
  )
}

export default ProfilePage
