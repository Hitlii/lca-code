import React, { useState } from 'react'
import usePropertyForm from '../../hooks/usePropertyForm'
import useImageState from '../../hooks/useImageState'

import GreenButton from './GreenButton'
import GreyButton from './GreyButton'
import ImageHandler from './ImageHandler'
import InputField from './InputField'
import Paper from '@material-ui/core/Paper'
import TextEditor from './Slate/TextEditor'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    padding: 10,
    textAlign: 'center'
  }
})

function propertyForm () {
  const classes = useStyles()

  const { onChange, onChangeDescription, onDeleteImage, onSubmit, property } = usePropertyForm()
  const { images, updateImages, orderImages, deleteImages, resetImages } = useImageState([])

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
                // values={property.images}
                // onChangeImages ={onChangeImages}
                // onDeleteImage={onDeleteImage}
                images={images}
                updateImages={updateImages}
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
