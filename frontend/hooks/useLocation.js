import { useState } from 'react'

const useLocation = () => {
    const [location, setLocation] = useState({
        city: '',
        address: '',
        marker: {
            lat: 0,
            lng: 0
        }
    })

    const cities = ['Tijuana', 'Tecate', 'San Quintin', 'Ensenada', 'Mexicali', 'Rosarito']

    const onChangeLocation = (e) => {
        setLocation({...location, [e.target.name]: e.target.value})
    }

    const handleLocationChange = (e) => {
        setLocation({
            ...location, 
            lat: e.latLng.lat(), 
            lng: e.latLng.lng()
        })
    }

    return {
        location,
        onChangeLocation,
        handleLocationChange,
        cities
    }
}

export default useLocation