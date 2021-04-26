import { useState } from 'react'

const useDescription = () => {
    const [description, setDescription] = useState({
        title: '',
        slateEditor: [
          {
            type: 'paragraph',
            children: [
              { text: '' }
            ]
          }
        ]
    })
    
    const onChangeDescription = (e) => {
        setDescription({ ...description, [e.target.name]: e.target.value })
    }
    
    const onChangeSlateEditor = (newDesc) => {
        setDescription({ ...description, slateEditor: newDesc })
    }

    return {
        description,
        onChangeDescription,
        onChangeSlateEditor
    }
}

export default useDescription