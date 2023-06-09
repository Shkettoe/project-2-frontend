import { GoogleMap } from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { eColours, eFontSizes, eLocationImageSizes } from '../assets/Vars'
import AppAutocomplete from '../components/AppAutocomplete'
import Error from '../components/Error'
import { InputA } from '../components/Input'
import Paragraph from '../components/Paragraph'
import Leaderboard from '../containers/Leaderboard'
import MapForm from '../containers/MapForm'
import useAPI from '../hooks/useAPI'
import useR from '../hooks/useR'
import Guess from '../interfaces/Guess.interface'
import Location from '../interfaces/Location.interface'
import { appendToUser } from '../store/reducers/User.reducer'

const LocationPage = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`

const Core = styled.div`
  min-width: 820px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  & img {
    max-width: ${eLocationImageSizes.widthUploadPreview};
    max-height: ${eLocationImageSizes.heightPreview};
    min-height: ${eLocationImageSizes.heightPreview};
    object-fit: cover;
  }
`

const Measure = styled.div`
  max-width: 860px;
  display: flex;
  flex-direction: row;
  gap: 29px;
  & div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`

const Locationer = () => {
  const id = useParams().id
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const [locationRes, locationError, fetchLocation] = useAPI<Location>()
  const [guessRes, guessError, postGuess] = useAPI<Guess>()
  const [user] = useR()
  const [location, setLocation] = useState<Location>()
  const [guesses, setGuesses] = useState<Guess[]>()
  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
  const mapRef = useRef<GoogleMap>(null)

  const setMark = (e: google.maps.MapMouseEvent) => {
    e.latLng?.lat() && setLat(e.latLng?.lat())
    e.latLng?.lng() && setLng(e.latLng?.lng())
  }

  const submit = () => {
    if (location?.user.id === user.id)
      setError("You can't guess your own locations")
    else {
      postGuess({
        method: 'post',
        url: `locations/guess/${location?.id}`,
        data: {
          lattitude: lat.toString(),
          longitude: lng.toString(),
        },
      })
    }
  }

  useEffect(() => {
    if (guessRes?.data.id) {
      dispatch(appendToUser({ guesses: [guessRes.data] }))
      setGuesses(prev => [...(prev ?? []), guessRes.data])
    }
  }, [guessRes])

  useEffect(() => {
    fetchLocation({
      method: 'get',
      url: `locations/${id}`,
    })
  }, [])

  useEffect(() => {
    if (locationRes?.data.id) {
      setLocation(locationRes.data)
      setGuesses(locationRes.data.guesses)
    }
  }, [locationRes])

  return locationError ? (
    <Error>{locationError}</Error>
  ) : (
    <LocationPage>
      <div>
        <Core>
          <Paragraph
            textAlign='left'
            color={eColours.black}
            fontSize={eFontSizes.headline4}>
            Take a <span style={{ color: eColours.primaryBlue }}>guess</span>!
          </Paragraph>
          <img src={location?.image_url} alt='' />
        </Core>
        <MapForm
          mapRef={mapRef}
          content='Guess'
          lat={lat || 0}
          lng={lng || 0}
          setMark={setMark}
          submit={submit}>
          <Measure>
            <div>
              <Paragraph textAlign={'left'}>Error distance</Paragraph>
              <InputA
                readOnly={true}
                width={'212px'}
                height={'50px'}
                value={guessRes?.data.error_distance || guessError}
                fgColour={guessError && 'red'}
              />
            </div>
            <div>
              <Paragraph textAlign={'left'}>Guessed location</Paragraph>
              <AppAutocomplete mapRef={mapRef}>
                <InputA width={'619px'} height={'50px'} />
              </AppAutocomplete>
            </div>
          </Measure>
        </MapForm>
        <Error>{error}</Error>
      </div>
      <Leaderboard userId={user.id} guesses={guesses || []} />
    </LocationPage>
  )
}

export default Locationer
