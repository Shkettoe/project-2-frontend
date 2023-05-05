import { GoogleMap } from '@react-google-maps/api'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/Api'
import { eColours } from '../assets/Vars'
import AppAutocomplete from '../components/AppAutocomplete'
import Button from '../components/Button'
import Error from '../components/Error'
import { InputA } from '../components/Input'
import Paragraph from '../components/Paragraph'
import LocationImageForm, { UploadImage } from '../containers/LocationImageForm'
import MapForm from '../containers/MapForm'
import { useAppDispatch } from '../hooks/store-hook'
import useAPI from '../hooks/useAPI'
import Location from '../interfaces/Location.interface'
import { appendToUser } from '../store/reducers/User.reducer'

const AddLocation = () => {
  const [response, error, apiFetch, setError] = useAPI<Location>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [lat, setLat] = useState<number>(0)
  const [lng, setLng] = useState<number>(0)
  const mapRef = useRef<GoogleMap>(null)

  const [imageUrl, setImageUrl] = useState('placeholder.png')
  const [image, setImage] = useState<File | null>()

  const resetImage = () => {
    setImageUrl('placeholder.png')
    setImage(null)
  }

  const setMark = (e: google.maps.MapMouseEvent) => {
    e.latLng?.lat() && setLat(e.latLng?.lat())
    e.latLng?.lng() && setLng(e.latLng?.lng())
  }

  useEffect(() => {
    image && setImageUrl(URL.createObjectURL(image))
  }, [image])

  const submit = () => {
    const formData = new FormData()
    image && formData.append('file', image)
    lat && formData.append('lattitude', lat.toString())
    lng && formData.append('longitude', lng.toString())
    apiFetch({
      apiInstance: api,
      method: 'post',
      url: 'locations',
      data: formData,
    })
  }

  useEffect(() => {
    console.log(error)
    error.length &&
      setError(error)
  }, [error])

  useEffect(() => {
    if (response?.data) {
      dispatch(appendToUser({ locations: [response.data] }))
      setInterval(() => navigate('/'), 300)
    }
  }, [response])

  return (
    <div>
      <LocationImageForm
        content='Add a new'
        src={imageUrl || 'placeholder.png'}>
        <div>
          <Error>{error}</Error>
          <div>
            <UploadImage setImage={setImage} />
            <Button onClick={resetImage} bgColour={eColours.red} width={'39px'}>
              <img src='Delete.png' alt='' />
            </Button>
          </div>
        </div>
      </LocationImageForm>
      <MapForm
        mapRef={mapRef}
        submit={submit}
        lat={lat || 0}
        lng={lng || 0}
        setMark={setMark}>
        <Paragraph textAlign={'left'}>Location</Paragraph>
        <AppAutocomplete mapRef={mapRef}>
          <InputA height={'50px'} width={'860px'} />
        </AppAutocomplete>
      </MapForm>
    </div>
  )
}

export default AddLocation
