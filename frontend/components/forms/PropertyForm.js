import React, { useState } from 'react'
import useImageState from '../../hooks/useImageState'
import useGeneralInfo from '../../hooks/useGeneralInfo'
import usePriceAndArea from '../../hooks/usePriceAndArea'
import useLocation from '../../hooks/useLocation'
import useDescription from '../../hooks/useDescription'

import {
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'

import GreenButton from '../buttons/GreenButton'
import ImageHandler from '../ImageHandler'
import InputSelect from '../inputs/InputSelect'
import InputText from '../inputs/InputText'
import Map from '../map'
import MultipleChoice from '../inputs/MultipleChoice'
import TextEditor from '../TextEditor'


import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles({
  root: {
    padding: 10,
    textAlign: 'center'
  },
  gridItem: {
    textAlign: 'center'
  },
  map: {
    marginBottom: 20
  },
  headers: {
    marginLeft: 10,
    fontSize: '18px'
  },
  divider: {
    width: 340,
    color: '#f2f2f2',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  }
})

function PropertyForm () {

  const classes = useStyles()

  const { generalInfo, onChangeGeneralInfo, states, zones, types } = useGeneralInfo()
  const { priceAndArea, onChangePriceAndArea, currencies} = usePriceAndArea()
  const { location, onChangeLocation, handleLocationChange, cities} = useLocation()
  const { description, onChangeDescription, onChangeSlateEditor} = useDescription()
  const { images, updateImages, orderImages, deleteImage } = useImageState([])

  function addPropertyCallback(){
    console.log(generalInfo)
    console.log(location)
    console.log(priceAndArea)
    console.log(description)
    console.log(images)
  }

  return (
        <Grid container >
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Información General
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Estado*'
                object={states}
                value={generalInfo.state}
                name='state'
                onChange={onChangeGeneralInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Zona*'
                object={zones}
                value={generalInfo.zone}
                name='zone'
                onChange={onChangeGeneralInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Tipo*'
                object={types}
                value={generalInfo.type}
                name='type'
                onChange={onChangeGeneralInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Precio y Área
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Divisa*'
                object={currencies}
                value={priceAndArea.currency}
                name='currency'
                onChange={onChangePriceAndArea}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Precio'
                value={priceAndArea.price}
                name='price'
                onChange={onChangePriceAndArea}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Precio Especial'
                value={priceAndArea.specialPrice}
                name='specialPrice'
                onChange={onChangePriceAndArea}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Precio en Pagos'
                value={priceAndArea.paymentPrice}
                name='paymentPrice'
                onChange={onChangePriceAndArea}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Área(m^2)'
                value={priceAndArea.area}
                name='area'
                onChange={onChangePriceAndArea}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Descripción
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Título de la propiedad'
                value={description.title}
                name='title'
                onChange={onChangeDescription}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <TextEditor
                value={description.slateEditor}
                onChange={onChangeSlateEditor}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Ubicación
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputSelect
                object={cities}  
                placeholder='Ciudad'
                value={location.city}
                name='city'
                onChange={onChangeLocation}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Dirección'
                value={location.address}
                name='address'
                onChange={onChangeLocation}
              />
            </Grid>
            <Grid item xs={12} className={classes.map}>
              <Map 
                  marker={location.marker}
                  handleChange={handleLocationChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Imágenes
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12}>
              <ImageHandler
                  images={images}
                  updateImages={updateImages}
                  deleteImage={deleteImage}
                  orderImages={orderImages}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <GreenButton
                  onClick={addPropertyCallback}
                  text='Crear Propiedad'
              />
            </Grid>
        </Grid>
  )
}

export default PropertyForm
