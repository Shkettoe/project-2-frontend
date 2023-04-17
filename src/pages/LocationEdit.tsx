import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { eColours } from '../assets/Vars'
import Button from '../components/Button'
import Error from '../components/Error'
import LocationImageForm, { UploadImage } from '../containers/LocationImageForm'
import useAPI from '../hooks/useAPI'
import useR from '../hooks/useR'
import Location from '../interfaces/Location.interface'
import LoadingScreen from '../layouts/Loading'

const LocationEdit = () => {
  const navigate = useNavigate()
  const id = useParams().id
  const [locationData, locationError, fetchLocation] = useAPI<Location>()
  const [response, error, apiFetch, setError] = useAPI<Location>()

  const [imageUrl, setImageUrl] = useState(locationData?.data.image_url)
  const [image, setImage] = useState<File | null>()

  const resetImage = () => {
    setImageUrl('placeholder.png')
    setImage(null)
  }

  useEffect(() => {
    fetchLocation({
      method: 'get',
      url: `locations/edit/${id}`,
    })
  }, [id])

  useEffect(() => {
    locationData?.data && setImageUrl(locationData.data.image_url)
  }, [locationData])

  useEffect(() => {
    image && setImageUrl(URL.createObjectURL(image))
  }, [image])

  useEffect(() => {
    response?.data && setInterval(() => navigate('/'), 300)
  }, [response])

  const submit = () => {
    const formData = new FormData()
    image && formData.append('file', image)
    apiFetch({
      method: 'patch',
      url: `locations/${id}`,
      data: formData,
    })
  }

  if (locationError) return <Error>{locationError}</Error>
  if (!locationData?.data || locationError) return <LoadingScreen />

  return (
    <div>
      <LocationImageForm content='Edit' src={imageUrl || 'placeholder.png'}>
        <Error>{error}</Error>
        <div>
          <UploadImage setImage={setImage} />
          <div>
            <Button width={'137px'} onClick={() => submit()}>
              Save
            </Button>
            <Link to={'/profile'}>Cancel</Link>
          </div>
        </div>
      </LocationImageForm>
    </div>
  )
}

export default LocationEdit
