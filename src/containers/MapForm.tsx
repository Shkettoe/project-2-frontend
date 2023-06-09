import { useState } from 'react'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import LoadingScreen from '../layouts/Loading'
import styled from 'styled-components'
import useLandmark from '../hooks/useLandmark'
import Error from '../components/Error'
import Button from '../components/Button'

const FormContainer = styled.div`
  max-width: 860px;
  display: flex;
  flex-direction: column;
  margin-top: 23px;
  gap: 23px;
  & div {
    display: flex;
    justify-content: space-between;
  }
`

const libraries = ['places'] as (
  | 'places'
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'visualization'
)[]

const MapForm = ({
  lat,
  lng,
  setMark,
  submit,
  children,
  content,
  mapRef,
}: {
  lat: number
  lng: number
  setMark: (e: google.maps.MapMouseEvent) => void
  submit: () => void
  children?: React.ReactNode
  content?: string
  mapRef: React.RefObject<GoogleMap>
}) => {
  const [googleMapsApiKey] = useState(process.env.REACT_APP_MAPS_KEY)
  const [landmark, zoom] = useLandmark()
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey || '',
    libraries,
  })

  if (!isLoaded) return <LoadingScreen />
  if (loadError) return <Error>Something went wrong</Error>
  return googleMapsApiKey ? (
    <FormContainer>
      <GoogleMap
        ref={mapRef}
        options={{
          mapTypeControl: true,
          disableDefaultUI: true,
          clickableIcons: false,
          mapTypeId: google.maps.MapTypeId.HYBRID,
        }}
        zoom={zoom}
        center={landmark}
        onClick={setMark}
        mapContainerStyle={{
          minWidth: '860px',
          maxWidth: '860px',
          height: '324px',
        }}>
        {lat && lng && <MarkerF position={{ lat, lng }} />}
      </GoogleMap>
      {children}
      <div>
        <div></div>
        <Button onClick={() => submit()} width={'137px'}>
          {content || 'Add new'}
        </Button>
      </div>
    </FormContainer>
  ) : (
    <LoadingScreen />
  )
}

export default MapForm
