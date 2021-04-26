import { useState } from 'react'

const useGeneralInfo = () => {
    const [generalInfo, setGeneralInfo] = useState({
        state: '',
        zone: '',
        type: '',
    })

    const states = ['Venta', 'Renta']
    const zones = ['Campestre', 'Urbana', 'Comercial']
    const types = ['Casa', 'Terreno', 'Rancho']

    const onChangeGeneralInfo = (e) => {
        setGeneralInfo({...generalInfo, [e.target.name]: e.target.value})
    }

    return { 
        generalInfo, 
        onChangeGeneralInfo, 
        states, 
        zones, 
        types
    }
}

export default useGeneralInfo