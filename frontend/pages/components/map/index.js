import { React, useState, useCallback, useRef } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'

import mapStyles from './mapStyles'
// Google Maps Style
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'

}

// Location where the map will start
const center = {
  lat: 32.5662492,
  lng: -116.5888347
}

// Options
const options = {
  styles: mapStyles
}

export default function Map () {
  const [marker, setMarker] = useState({ lat: '', lng: '' })
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.googleMapsAPIKey
  })

  function handleChange (event) {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }

  if (loadError) return 'Error Loading maps'

  if (!isLoaded) return 'Loading...'

  return <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick ={handleChange}
            >
                <Marker
                    position={{ lat: marker.lat, lng: marker.lng }}
                />
            </GoogleMap>
}

// The majority of the code was taken from https://www.youtube.com/watch?v=WZcxJGmLbSo
