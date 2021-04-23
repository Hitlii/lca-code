import React, { useState } from 'react'
import usePropertyForm from '../../hooks/usePropertyForm'

import GreenButton from './GreenButton'
import GreyButton from './GreyButton'
import ImageHandler from './ImageHandler'
import InputField from './InputField'
import Paper from '@material-ui/core/Paper'
import TextEditor from './Slate/TextEditor'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles ({
    root: {
        padding: 10,
        textAlign: 'center'
    }
})

function propertyForm() {

    const classes = useStyles()

    const { onChange, onChangeDescription, onChangeImages, onDeleteImage, onSubmit, property,auxImages,setAuxImages } = usePropertyForm(addPropertyCallback)

    function addPropertyCallback() {

    }

    return (
        <Paper className={classes.root} variant='outlined' elevation={0}>
            <InputField
                    placeholder='Titulo de la propiedad'
                    type='text'
                    value={property.title}
                    name='title'
                    onChange={onChange}
            />
            <TextEditor 
                value={property.description}
                onChange={onChangeDescription}
            />
            <ImageHandler 
                //values={property.images}
                // onChangeImages ={onChangeImages}
                // onDeleteImage={onDeleteImage}
                auxImages={auxImages}
                setAuxImages={setAuxImages}
            />
            <GreenButton 
                onClick={onSubmit}
                text='Aceptar'
            />
            <GreyButton 
                text='Cancelar'
            />
        </Paper>
    )
}

export default propertyForm
