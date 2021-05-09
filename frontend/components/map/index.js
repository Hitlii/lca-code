import { React, useState, useCallback, useRef, useEffect } from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api'

import mapStyles from './mapStyles'
// Google Maps Style
const mapContainerStyle = {
  width: '100%',
  maxHeight: 600,
  minHeight: 300,
  borderRadius: 15

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

export default function Map ({ marker, handleChange }) {
  

   const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: process.env.googleMapsAPIKey
    })

 

  if (loadError) return 'Error Loading maps'
  if(!isLoaded) return 'Loading...'

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
