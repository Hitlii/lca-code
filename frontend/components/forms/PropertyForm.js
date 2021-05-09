import React, { useState } from 'react'
import useImageState from '../../hooks/useImageState'
import useGeneralInfo from '../../hooks/useGeneralInfo'
import priceAreaValidation from '../../hooks/priceAreaValidation'
import useLocation from '../../hooks/useLocation'
import useDescription from '../../hooks/useDescription'
import useURL from '../../hooks/useURL'
import useMetaInfo from '../../hooks/useMetaInfo'
import { useFormik } from 'formik'

import { gql, useMutation } from '@apollo/client'

import {
  Divider,
  Grid,
  Typography
} from '@material-ui/core'

// MaterialUI Imports --------------------------------
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';

// My Components --------------------------------
import TextField from '../inputs/TextField'
import SubmitButton from '../buttons/GreenButton'
import ImageHandler from '../inputs/ImageHandler'
import InputSelect from '../inputs/InputSelect'
import InputText from '../inputs/InputText'
import Map from '../map'
import MultipleChoice from '../inputs/MultipleChoice'
import SearchClient from '../SearchClient'
import TextEditor from '../inputs/TextEditor'

// Validator ----------------------------------------------------------------
import {propertyValidationSchema} from '../../helper/propertyValidator'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 320,
    margin: 'auto',
  },
  gridItem: {
    textAlign: 'center'
  },
  map: {
    display: 'float'
  },
  headers: {
    marginLeft: '10%',
    fontSize: '18px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '30%'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '40%'
    }
  },
  divider: {
    width: 340,
    color: '#f2f2f2',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },
  multiline: {
    width: 320,
    marginBottom: 20
  }
}))

function PropertyForm ({ autoCompleteClients }) {
  const classes = useStyles()
  const [errors, setErrors] = useState({})
  // Vendors
  const [vendors, setVendors] = useState([])
  const { generalInfo, status, zones, types } = useGeneralInfo()
  const { priceArea, currencies } = priceAreaValidation()
  const { description } = useDescription()
  const { location, cities } = useLocation()
  const { URL } = useURL()

  const { metaInfo } = useMetaInfo()
  const { images, updateImages, orderImages, deleteImage, getPathImages, imagesPath } = useImageState([])
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const [slateEditor, setSlateEditor] = useState([
    {
      type: 'paragraph',
      children: [
        { text: '' }
      ]
    }
  ])
  
  const initialValues ={
    code:'',
    status:' ',
    zone:' ',
    type:' ',
    currency:' ',
    price:'',
    specialPrice:'',
    paymentPrice:'',
    area:'',
    state:'',
    city:'',
    address:'',
    title: '',
    description: '',

  }
    // Formik.
 const formikInput = useFormik({
        initialValues: initialValues,
        validationSchema: propertyValidationSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    });
  function handleChangeVendors (updatedVendors) {
    setVendors(updatedVendors)
  }
  const onChangeSlateEditor = (newDesc) => {
    setSlateEditor(newDesc)
  }


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
      status: formikInput.values.status,
      type: formikInput.values.type,
      zone: formikInput.values.zone,
      code: formikInput.values.code,
      price: formikInput.values.price,
      specialPrice: formikInput.values.specialPrice,
      onPayments: formikInput.values.paymentPrice,
      currency: formikInput.values.currency,
      area: formikInput.values.area,
      title: formikInput.values.title,
      description: slateEditor.toString(),
      state: formikInput.values.state,
      city: formikInput.values.city,
      address: formikInput.values.address,
      lat: coordinates.lat,
      lng: coordinates.lng,
      images: imagesPath.current,
      video: URL.values.URL,
      metaTitle: formikInput.values.title,
      metaDescription: formikInput.values.description,
      metaURL: formikInput.values.URL,
      clients: vendors
    }
  })

  async function postProperty (event) {
    event.preventDefault();
    formikInput.handleSubmit();
    if( formikInput.errors)
    return 

    await getPathImages(images);

    
    //createProperty()
  }

/**
  @description Checks errors on Formik #handleSubmit
  @param {key} String Key of the formik Schema
  @returns {boolean} True if erros occurred, falsy if not
 */
 function isInputError(key){
   return formikInput.touched[key] && formikInput.errors[key]
 }
  
  const defaultInputProps = {
    fullWidth: true,
    size: 'medium',
    margin: 'dense',
    variant: 'filled',
    
  }

  const defaultTypoProps = {
    align: 'left',
    display: 'block',
    gutterBottom: true,
    variant: 'h5'
  }

  const requiredInputs ={
    required: true,
    title: 'Por favor, llene este campo.'
  }
  return (
    <div className={classes.root}>

      <Typography variant='h3' display='block' gutterBottom align='left'> Agregar propiedad </Typography>
      <Typography {...defaultTypoProps}>Caracteristicas generales</Typography>
      <Divider/>
        <form onSubmit={postProperty}>
            {/* Status */}
            <FormControl component="fieldset" {...defaultInputProps} {...requiredInputs} error={ isInputError('status')}>
              <FormLabel component="legend">Estado</FormLabel>
              <RadioGroup aria-label="quiz" name="status" value={formikInput.values.status} onChange={formikInput.handleChange}>
                <FormControlLabel value="Venta" control={<Radio />} label="Venta" />
                <FormControlLabel value="Renta" control={<Radio />} label="Renta" />
              </RadioGroup>
              <FormHelperText>Hola</FormHelperText>
            </FormControl>

            {/* Zone */}
            <FormControl component="fieldset" {...defaultInputProps}  {...requiredInputs}  error={ isInputError('zone')}>
            <FormLabel component="legend">Zona</FormLabel>
            <RadioGroup aria-label="quiz" name="zone" onChange={formikInput.handleChange} value ={formikInput.values.zone}>
              <FormControlLabel value="Campestre" control={<Radio />} label="Campestre" />
              <FormControlLabel value="Urbana" control={<Radio />} label="Urbana" />
              <FormControlLabel value="Comercial" control={<Radio />} label="Comercial" />
            </RadioGroup>
            <FormHelperText>Hola</FormHelperText>
          </FormControl>

           {/* Type */}
            <FormControl component="fieldset" {...defaultInputProps}  {...requiredInputs}  error={ isInputError('type')}>
            <FormLabel component="legend">Tipo</FormLabel>
            <RadioGroup aria-label="quiz" name="type" value={formikInput.values.type} onChange={formikInput.handleChange}>
              <FormControlLabel value="Casa" control={<Radio />} label="Casa" />
              <FormControlLabel value="Terreno" control={<Radio />} label="Terreno" />
              <FormControlLabel value="Rancho" control={<Radio />} label="Rancho" />
            </RadioGroup>
             { isInputError('status')&&<FormHelperText>Hola</FormHelperText>}
          </FormControl>

           {/* Code */}
            <TextField 
              {...defaultInputProps}
              {...requiredInputs}
              id="code"
              name="code"
              label="Codigo"
              helperText="Máx: 15 caracteres"
              title = "Por favor, llene este campo"
              placeholder='0000VT-00'
              onChange={formikInput.handleChange}
              value={formikInput.values.code}
              error={ isInputError('code')}
             />
          
{/* PRICE AREA */}
          <Typography {...defaultTypoProps}>Precio y Área</Typography>
          <Divider/>

          {/* Currency */}
            <FormControl component="fieldset" {...defaultInputProps}  {...requiredInputs} error={ isInputError('currency')}>
            <FormLabel component="legend">Divisa</FormLabel>
            <RadioGroup aria-label="quiz" name="currency" value={formikInput.values.currency} onChange={formikInput.handleChange}>
              <FormControlLabel value="USD" control={<Radio />} label="USD" />
              <FormControlLabel value="MXN" control={<Radio />} label="MXN" />
            </RadioGroup>
            <FormHelperText>Seleccione divisa</FormHelperText>
          </FormControl>

          {/* Price */}
           <TextField 
              {...requiredInputs}
              {...defaultInputProps}
              id="price"
              name="price"
              label="Precio"
              type="number"
              placeholder='$ 0.0'
               onChange={formikInput.handleChange}
              value={formikInput.values.price}
              error={ isInputError('price')}
             />

            {/* Area */}
            <TextField 
              {...requiredInputs}
              {...defaultInputProps}
              id="area"
              name="area"
              label="Área (m²)"
              type="number"
              placeholder='0 m²'
              onChange={formikInput.handleChange}
              value={formikInput.values.area}
              error={ isInputError('area')}
             />

            {/* Special Price */}
             <TextField 
              {...defaultInputProps}
              id="specialPrice"
              name="specialPrice"
              label="Precio especial (como tú)"
              placeholder='$ 00 USD|MXN/m²'
              helperText= 'Precio por m², ha. Max: 20'
              onChange={formikInput.handleChange}
              value={formikInput.values.specialPrice}
              error={ isInputError('specialPrice')}
             />

             {/* Payment Price */}
              <TextField 
                {...defaultInputProps}
                id="paymentPrice"
                name="paymentPrice"
                label="Precio en pagos"
                placeholder='(meses)x $ (mensualidad) 12x $100'
                helperText= 'Ingrese la los meses y la mensualidad'
                onChange={formikInput.handleChange}
                value={formikInput.values.paymentPrice}
                error={ isInputError('paymentPrice')}
             />

            
            
{/* Description */}
          <Typography {...defaultTypoProps}>Descripción</Typography>
          <Divider/>
          
          <TextField 
                {...requiredInputs}
                {...defaultInputProps}
                id="title"
                name="title"
                label="Título"
                placeholder='Ingrese un título'
                helperText= 'Para mejor SEO ingrese un título corto. Máx: 70'
                onChange={formikInput.handleChange}
                value={formikInput.values.title}
                error={ isInputError('title')}
          />

          <TextEditor
                value={slateEditor}
                onChange={onChangeSlateEditor}
          />
        
{/* Location */}
          <Typography {...defaultTypoProps}>Ubicación</Typography>
          <Divider/>

          {/* State */}
          <TextField 
                {...defaultInputProps}
                disabled
                id="state"
                name="state"
                label="Estado"
                value= "B.C"


              
          />

          {/* City */}
          <FormControl className={classes.formControl} {...defaultInputProps} {...requiredInputs}>
            <InputLabel id="citySelect">Ciudad</InputLabel>
            <Select
              labelId="citySelect"
              id="city"
              name="city"
              value= 'Tecate'
              error={ isInputError('city')}
            >
              <MenuItem value={'Tecate'}>Tecate</MenuItem>
              <MenuItem value={'Tijuana'}>Tijuana</MenuItem>
              <MenuItem value={'Mexicali'}>Mexicali</MenuItem>
              <MenuItem value={'San Quintín'}>San Quintín</MenuItem>
              <MenuItem value={'Rosarito'}>Rosarito</MenuItem>
              <MenuItem value={'Ensenada'}>Tecate</MenuItem>
            </Select>
          </FormControl>

           {/* Address */}
          <TextField 
                {...defaultInputProps}
                {...requiredInputs}
                id="address"
                name="address"
                label="Dirección"
                placeholder='Ingrese la dirección de la propiedad'
                helperText= 'Ingrese una direccion corta. Máx: 20'
                onChange={formikInput.handleChange}
                value={formikInput.values.address}
                error={ isInputError('address')}
          />

          <Typography {...defaultTypoProps}>Ubicación en el mapa</Typography>
         {/* Coordinates */}
               <Map
                  className={classes.map }
                  marker={coordinates}
                  handleChange={onChangeCoordinates}
              />
{/* Images */}
          <Typography {...defaultTypoProps}>Imagenes</Typography>
          <Divider/>

          {/* Images */}
          <ImageHandler
                  images={images}
                  updateImages={updateImages}
                  deleteImage={deleteImage}
                  orderImages={orderImages}
          />

{/* Meta */}
          <Typography {...defaultTypoProps}>Meta</Typography>
          <Divider/>

          {/* Title */}
          <TextField 
                {...defaultInputProps}
                {...requiredInputs}
                id="meta.title"
                name="meta.title"
                label="Titulo"
                placeholder='Ingrese el titulo meta de la propiedad'
                helperText= 'Ingrese un titulo corto. Máx: 55'
          />
          {/* Description */}
             <TextField 
                {...defaultInputProps}
                {...requiredInputs}
                multiline
                rows ={4}
                id="description"
                name="description"
                label="Descripción"
                placeholder='Ingrese la descripción meta de la propiedad'
                helperText= 'Ingrese una descripción corto. Máx: 160'
                onChange={formikInput.handleChange}
                value={formikInput.values.description}
                error={ isInputError('description')}
          />

{/* Meta */}
          <Typography {...defaultTypoProps}>Dueños</Typography>
          <Divider/>

          <SearchClient
            clients = {autoCompleteClients}
            handleChangeVendors = {handleChangeVendors}
          />

         
         
        <SubmitButton 
          type="submit" 
          size="large"
          fullWidth
          startIcon ={<SaveIcon/>}  
        >
        Crear Propiedad
        </SubmitButton>

        </form>
    </div>
  )
}

const CREATE_PROPERTY = gql`
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
