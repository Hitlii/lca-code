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
            images: [],
        }
    )

    const onChange = (e) => {
        setProperty({...property, [e.target.name]: e.target.value})
    }

    const onChangeDescription = (newDesc) => {
        setProperty({...property, description: newDesc})
    }

    //const onChangeImages = (newImage) => {
    //    setProperty({...property, images: [...property.images,newImage]})
    //}

    const onChangeImages = (files) => {
        if(files) {
            const fileArray = Array.from(files)
            fileArray.map((file) => {
                const reader = new FileReader()
                reader.onload = () => {
                    const newImage = {
                        key: uuidv4(),
                        url: reader.result
                    }
                    setProperty({...property, images: (oldImages) => [...oldImages, newImage]})
                    console.log(property.images)
                    //setAuxImages(oldImages => [...oldImages, newImage])
                    //console.log(auxImages)
                }
                reader.readAsDataURL(file)
            })
        }
    }

    const onDeleteImage = (e) => {
        setProperty({...property, images: property.images.filter((image) => image.key !== e.target.getAttribute('data-index'))})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(property)
        callback()
    }

    return {
        onChange,
        onChangeDescription,
        onChangeImages,
        onDeleteImage,
        onSubmit,
        property,
    }
}

export default usePropertyForm