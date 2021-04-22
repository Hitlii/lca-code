import { useState } from 'react'

const usePropertyForm = (callback) => {

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
    
    const onChangeImages = (newImages) = {
        //setProperty({...property, images: newImages})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(property)
        callback()
    }

    return {
        onChange,
        onChangeDescription,
        onSubmit,
        property,
    }
}

export default usePropertyForm