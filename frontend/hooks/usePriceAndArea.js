import { useState } from 'react'

const usePriceAndArea = () => {
    const [priceAndArea, setPriceAndArea] = useState({
        currency: '',
        price: '',
        specialPrice: '',
        paymentPrice: '',
        area: '',
    })

    const currencies = ['USD','MXN']

    const onChangePriceAndArea = (e) => {
    setPriceAndArea({...priceAndArea, [e.target.name]: e.target.value})
  }

    return { 
        priceAndArea,
        onChangePriceAndArea,
        currencies
    }
}

export default usePriceAndArea