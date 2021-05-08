import React, { useState } from 'react'
import useImageState from '../../hooks/useImageState'
import useGeneralInfo from '../../hooks/useGeneralInfo'
import usePriceAndArea from '../../hooks/usePriceAndArea'
import useLocation from '../../hooks/useLocation'
import useDescription from '../../hooks/useDescription'
import useURL from '../../hooks/useURL'
import useMetaInfo from '../../hooks/useMetaInfo'

import { gql, useMutation } from '@apollo/client'

import {
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'

import GreenButton from '../buttons/GreenButton'
import ImageHandler from '../inputs/ImageHandler'
import InputSelect from '../inputs/InputSelect'
import InputText from '../inputs/InputText'
import Map from '../map'
import MultipleChoice from '../inputs/MultipleChoice'
import SearchClient from '../SearchClient'
import TextEditor from '../inputs/TextEditor'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
    marginLeft: '10%',
    fontSize: '18px',
    [theme.breakpoints.up('sm')]:{
      marginLeft:'30%'
    },
    [theme.breakpoints.up('md')]:{
      marginLeft:'40%'
    },
  },
  divider: {
    width: 340,
    color: '#f2f2f2',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  multiline: {
    width: 320,
    marginBottom: 20
  }
}))

function PropertyForm (props) {
  const {autoCompleteClients} = props;
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  // Vendors
  const [vendors, setVendors] = useState([]);
  const { generalInfo, status, zones, types } = useGeneralInfo()
  const { priceAndArea, currencies } = usePriceAndArea()
  const { description } = useDescription()
  const { location, cities} = useLocation()
  const { URL } = useURL()

  const { metaInfo } = useMetaInfo()
  const { images, updateImages, orderImages, deleteImage,getPathImages,imagesPath} = useImageState([])


  function handleChangeVendors(updatedVendors){ 
    setVendors(updatedVendors);
    console.log(updatedVendors);
  }
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

  const [createProperty] = useMutation(CREATE_PROPERTY, {
    update (
      _, 
      { data }
    ) {
      console.log(data)
    },
    OnError (err) {
      setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
      console.log(errors)
    },
    variables: {
      status: generalInfo.values.status,
      type: generalInfo.values.type,
      zone: generalInfo.values.zone,
      code: generalInfo.values.code,
      price: priceAndArea.values.price,
      specialPrice: priceAndArea.values.specialPrice,
      onPayments: priceAndArea.values.paymentPrice,
      currency: priceAndArea.values.currency,
      area: priceAndArea.values.area,
      title: description.values.title,
      description: slateEditor.toString(),
      state: location.values.state,
      city: location.values.city,
      address: location.values.address,
      lat: coordinates.lat,
      lng: coordinates.lng,
      images: imagesPath.current,
      video: URL.values.URL,
      metaTitle: metaInfo.values.title,
      metaDescription: metaInfo.values.description,
      metaURL: metaInfo.values.URL,
      clients: vendors
    }
  })

  function addPropertyCallback(){
    getPathImages(images).then(()=>{
      console.log(imagesPath.current)
    })
    generalInfo.handleSubmit()
    priceAndArea.handleSubmit()
    description.handleSubmit()
    console.log(slateEditor)
    location.handleSubmit()
    console.log(coordinates)
    URL.handleSubmit()
    metaInfo.handleSubmit()
    createProperty()
  }

  return (
        <Grid container>
            <Grid item xs={12} >
              <Typography className={classes.headers}>
                Información General
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
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
                object={status}
                value={generalInfo.values.status}
                name='status'
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
                type='number'
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
                type='number'
                placeholder='Área (m²)*'
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
            </Grid>
            <Grid item xs={12} className={classes.gridItem}> 
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
            <Grid item xs={12} className={classes.gridItem}>
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
                  Meta
                </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Meta-Título'
                value={metaInfo.values.title}
                name='title'
                onChange={metaInfo.handleChange}
                error={metaInfo.touched.title && metaInfo.errors.title}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <TextField
                className={classes.multiline}
                type='text'
                multiline
                placeholder='Meta-Descripción'
                value={metaInfo.values.description}
                name='description'
                onChange={metaInfo.handleChange}
                error={metaInfo.touched.description && Boolean(metaInfo.errors.description)}
                helperText={metaInfo.touched.description && metaInfo.errors.description}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <InputText
                type='text'
                placeholder='Meta-URL'
                value={metaInfo.values.URL}
                name='URL'
                onChange={metaInfo.handleChange}
                error={metaInfo.touched.URL && metaInfo.errors.URL}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.headers}>
                Cliente
              </Typography>
              <Divider className={classes.divider}/>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <SearchClient 
                  clients = {autoCompleteClients}
                  handleChangeVendors = {handleChangeVendors}
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

const CREATE_PROPERTY = gql 
`
  mutation createProperty(
    $status: String!
    $type: String!
    $zone: String!
    $code: String!
    $price: Float!
    $specialPrice: String
    $onPayments: String
    $currency: String!
    $area: Float!
    $title: String!
    $description: String!
    $state: String!
    $city: String!
    $address: String!
    $lat: Float!
    $lng: Float!
    $images: [String!]
    $video: String
    $metaTitle: String!
    $metaDescription: String!
    $metaURL: String
    $clients: [ClientInput!]!
  ) {
    createProperty(
      property: {
        status: $status
        type: $type
        zone: $zone  
        code: $code  
        price: $price  
        specialPrice: $specialPrice
        onPayments: $onPayments
        currency: $currency 
        area: $area 
        title: $title  
        description: {
          text: $description
        }
        location: {
          state: $state  
          city: $city  
          address: $address
          coordinates: {
            lat: $lat  
            lng: $lng  
          }
        }
        media: {
          images: $images   
          video: $video  
        }
        meta: {
          title: $metaTitle
          description: $metaDescription
          url: $metaURL
        }
      }
      clients: $clients
    ) {
      success
    }
  }

`

export default PropertyForm
