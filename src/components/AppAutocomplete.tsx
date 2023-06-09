import { Autocomplete, GoogleMap } from '@react-google-maps/api'
import React, { JSXElementConstructor, ReactElement, useRef } from 'react'

const AppAutocomplete = ({
  children,
  mapRef,
}: {
  children:
    | string
    | number
    | ReactElement<any, string | JSXElementConstructor<any>>
  mapRef: React.RefObject<GoogleMap>
}) => {
  const acRef = useRef<Autocomplete>(null)
  const pan = () => {
    const location =
      acRef.current?.state.autocomplete?.getPlace().geometry?.location
    if (location?.lat() && location?.lng())
      mapRef.current?.state.map?.panTo({
        lat: location.lat(),
        lng: location.lng(),
      })
  }

  return (
    <Autocomplete ref={acRef} onPlaceChanged={pan}>
      {children}
    </Autocomplete>
  )
}

export default AppAutocomplete
