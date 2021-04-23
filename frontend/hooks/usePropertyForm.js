import { useState } from 'react'
const { v4: uuidv4 } = require('uuid');

const usePropertyForm = (callback) => {

    const [auxImages, setAuxImages] = useState([])

    const [property, setProperty] = useState(
        {
            title: '',
            description: [
                {
                    type: 'paragraph',
                    children: [
                        {text: ''}
                    ]
                }
            ],
            
        }
    )

    const onChange = (e) => {
        setProperty({...property, [e.target.name]: e.target.value})
    }

    const onChangeDescription = (newDesc) => {
        setProperty({...property, description: newDesc})
    }



    const onDeleteImage = (e) => {
        setProperty({...property, images: property.images.filter((image) => image.key !== e.target.getAttribute('data-index'))})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        //setProperty({...property,images:Array.from(auxImages)})
        console.log(auxImages)
        callback()
    }

    return {
        onChange,
        onChangeDescription,
        onChangeImages,
        onDeleteImage,
        onSubmit,
        property,
        auxImages,
        setAuxImages,
    }
}

export default usePropertyForm