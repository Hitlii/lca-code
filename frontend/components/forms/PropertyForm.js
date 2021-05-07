import React, { useState } from 'react'
import useImageState from '../../hooks/useImageState'
import useGeneralInfo from '../../hooks/useGeneralInfo'
import usePriceAndArea from '../../hooks/usePriceAndArea'
import useLocation from '../../hooks/useLocation'
import useDescription from '../../hooks/useDescription'
import useURL from '../../hooks/useURL'

import { gql, useQuery } from '@apollo/client'

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

  const { generalInfo, states, zones, types } = useGeneralInfo()
  const { priceAndArea, currencies } = usePriceAndArea()
  const { description } = useDescription()
  const { location, cities} = useLocation()
  const { URL } = useURL()
  const { images, updateImages, orderImages, deleteImage,getPathImages,imagesPath} = useImageState([])

  const [slateEditor, setSlateEditor] = useState([
    {
      type: 'paragraph',
      children: [
        { text: '' }
      ]
    }
  ])
  const onChangeSlateEditor = (newDesc) => {
    setSlateEditor(newDesc)
  }

  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0
  })

  const onChangeCoordinates = (e) => {
    setCoordinates({
      lat: e.latLng.lat(), 
      lng: e.latLng.lng()
    })
  }

  function addPropertyCallback(){
    getPathImages(images).then(()=>{
      console.log(imagesPath.current)
    })
    generalInfo.handleSubmit()
    priceAndArea.handleSubmit()
    description.handleSubmit()
    location.handleSubmit()
    console.log(slateEditor)
    console.log(coordinates)
    URL.handleSubmit()
    console.log(images)
  }

  return (
        <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Información General
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <InputText
                type='text'
                placeholder='Código*'
                value={generalInfo.values.code}
                name='code'
                onChange={generalInfo.handleChange}
                error={generalInfo.touched.code && generalInfo.errors.code}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Estado*'
                object={states}
                value={generalInfo.values.status}
                name='state'
                onChange={generalInfo.handleChange}
                error={generalInfo.touched.status && generalInfo.errors.status}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Zona*'
                object={zones}
                value={generalInfo.values.zone}
                name='zone'
                onChange={generalInfo.handleChange}
                error={generalInfo.touched.zone && generalInfo.errors.zone}
              />
            </Grid>
            <Grid item xs={12}>
              <MultipleChoice
                label='Tipo*'
                object={types}
                value={generalInfo.values.type}
                name='type'
                onChange={generalInfo.handleChange}
                error={generalInfo.touched.type && generalInfo.errors.type}
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
                value={priceAndArea.values.currency}
                name='currency'
                onChange={priceAndArea.handleChange}
                error={priceAndArea.touched.currency && priceAndArea.errors.currency}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Precio*'
                value={priceAndArea.values.price}
                name='price'
                onChange={priceAndArea.handleChange}
                error={priceAndArea.touched.price && priceAndArea.errors.price}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Precio Especial'
                value={priceAndArea.values.specialPrice}
                name='specialPrice'
                onChange={priceAndArea.handleChange}
                error={priceAndArea.touched.specialPrice && priceAndArea.errors.specialPrice}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Precio en Pagos'
                value={priceAndArea.values.paymentPrice}
                name='paymentPrice'
                onChange={priceAndArea.handleChange}
                error={priceAndArea.touched.paymentPrice && priceAndArea.errors.paymentPrice}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Área(m^2)*'
                value={priceAndArea.values.area}
                name='area'
                onChange={priceAndArea.handleChange}
                error={priceAndArea.touched.area && priceAndArea.errors.area}
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
                value={description.values.title}
                name='title'
                onChange={description.handleChange}
                error={description.touched.title && description.errors.title}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <TextEditor
                value={slateEditor}
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
              <InputText
                type='text'
                placeholder='Estado'
                value='Baja California'
                name='state'
                onChange={location.handleChange}
                error={location.touched.state && location.errors.state}
              />
              <InputSelect
                object={cities}  
                label='Ciudad'
                placeholder='Ciudad'
                value={location.values.city}
                name='city'
                onChange={location.handleChange}
                error={location.touched.city && location.errors.city}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Dirección'
                value={location.values.address}
                name='address'
                onChange={location.handleChange}
                error={location.touched.address && location.errors.address}
              />
            </Grid>
            <Grid item xs={12} className={classes.map}>
              <Map 
                  marker={coordinates}
                  handleChange={onChangeCoordinates}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Media
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              <InputText
                type='text'
                placeholder='URL'
                value={URL.values.URL}
                name='URL'
                onChange={URL.handleChange}
                error={URL.touched.URL && URL.errors.URL}
              />
            </Grid>
            <Grid item xs={12}>
              <ImageHandler
                  images={images}
                  updateImages={updateImages}
                  deleteImage={deleteImage}
                  orderImages={orderImages}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Cliente
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item className={classes.gridItem} xs={12}>
              
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

const GET_CLIENTS = gql 
`
query getClient($name: String!)  {
  getClient(name: $name) {
    id
    name
    contact {
      email
      phone
    }
  }
}

`

export default PropertyForm
