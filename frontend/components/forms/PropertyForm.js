import React, { useState } from 'react'
import { useFormik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import Link from 'next/link'

// Material UI Imports --------------------------------
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SaveIcon from '@material-ui/icons/Save';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography'

// My Components --------------------------------
import TextField from '../inputs/TextField'
import SubmitButton from '../buttons/GreenButton'
import Map from '../map'
import SearchClient from '../SearchClient'
// import useImageState from '../../hooks/useImageState'
import useAlert from '../../hooks/useAlert'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// Validator ----------------------------------------------------------------
import {propertyValidationSchema} from '../../helper/propertyValidator'


const NEW_PROPERTY_TEXT_VALUE = `
# Titulo
## Subtitulo 

Venta de m² , ubicados en Loma Tova a 15 minutos de Tecate B.C

📍 Mira cómo llegar aquí 👉
📹 Mira los alrededores aquí👉

🔐 Aparta con sólo $100 USD
💳 En cómodos pagos a 5 o 6 años
⚡ Entrega rápida (1 mes después de firma)

### 📃 Documentos:
Polígono mayor escriturado 

### ⚙️ Servicios: 
Agua y luz a unos metros 


### Medidas y precio 
📐**Medida:** **400 m²** (_20x 20m_)
💰**Precio:**
Contado $00,000.00 USD.
En pago a **3** años: $00,000.00 USD
Enganche: $0,000.00 USD
Mensualidad: 00x $000.00 USD
Ultimo pago de: $000.00 USD

#LCABienesRaices #BienesRaices #RealState
`
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 320,
    margin: 'auto',
  }, 
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  title:{
    marginTop: '2em',
  }, 
  alert:{
    marginBottom: '1em'
  }

}))


/**
  @description Property Form
  @param {autoCompleteClients} Object All clients for the auto complete.
 */
function PropertyForm ({ autoCompleteClients }) {
   const CREATE_PROPERTY = gql`
    mutation createProperty($property: CreatePropertyInput!, $vendors: [ClientInput!]!) {
      createProperty( property: $property, vendors: $vendors) 
        {
          message
          code
          success
          url
        }
    }
  `
  //Constants 
  const initialValues ={
    code:'',
    status:' ',
    zone:' ',
    type:' ',
    currency:' ',
    price:'',
    specialPrice:'',
    onPayments:'',
    area:'',
    city:'Tecate',
    address:'',
    title: '',
    description: '',
    video: '',
    images:''

  }
  // State ----------------------------------------------------------------
  const [isAlertOpen, alert, openAlert, closeAlert, handleAlert] = useAlert();
  const [isFeatured, setFeatured] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [errors, setErrors] = useState({})
  const [isDeeded, setIsDeeded] = useState(false);
  const [hasAllServices, setHasAllServices] = useState(false)
  const [vendors, setVendors] = useState([])
  const [text, setText] = useState(NEW_PROPERTY_TEXT_VALUE)

  // const { images, updateImages, orderImages, deleteImage, getPathImages, imagesPath } = useImageState([])
  const [createProperty, { loading: mutationLoading, error: mutationError}] = useMutation(CREATE_PROPERTY)  
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const classes = useStyles()
  const [slateEditor, setSlateEditor] = useState([
    {
      type: 'paragraph',
      children: [
        { text: '' }
      ]
    }
  ])

 

  function handleTextChange(event){
    setText(event.target.value)
  }
  // const serialize = nodes => {
  //   return  nodes.map(n => Node.string(n)).join('\n');
  // }
  // Formik.
  const formikInput = useFormik({
        initialValues: initialValues,
        validationSchema: propertyValidationSchema,
        onSubmit : async(values)=>{
          
    setBackdrop(true)
    let alert;
    if(coordinates.lat === 0 && coordinates.lng === 0) {
      
        setBackdrop(false);
         alert = {
          severity: 'error', 
          title: 'Ingrese las coordenadas',
          message: 'Las coordenadas son requeridas',
          success: false
        }
        handleAlert(alert);
    
    }
    if(vendors.length === 0){
       alert = {
          severity: 'error', 
          title: 'Debe de ingresar a los dueños',
          message: 'Ingrese a los dueños de la propiedad',
          success: false
        }
        setBackdrop(false);
        handleAlert(alert);
        return;
    }
    let {
      status,
      type,
      zone,
      code,
      price,
      specialPrice,
      onPayments,
      currency,
      area,
      title,
      city,
      address,
      video,
      description,
      images,
      } = values;

    const {
      lat, 
      lng,
      } = coordinates;

    
    try {
      
        //Removing Line breaks and white spaces
        images = images.replace(/\r?\n|\r/g,"")
        images = images.replace(/ +/g,"").split(',')
        // If there was a comma on the last link
        if(images[images.length-1] === "") images.pop()
       
        
        const variables = {
          property:{
            code,
            status,
            type,
            zone,
            isFeatured,
            area,
            price,
            currency,
            onPayments,
            specialPrice,
            
            title,
            description:{
              hasAllServices,
              isDeeded,
              text
            }, 

            location: {
              state: 'B.C',
              city,
              address,
              coordinates:{
                lat,
                lng,
              }
            }, 
            media:{
              images,
              video,
            }, 

            meta: {
              description
            }
          }, 
          vendors
        }  
        const response =  await createProperty({variables});
        const data = response.data.createProperty;
     
        if(data){
          setBackdrop(false);
          alert = {
            severity: 'success', 
            title: data.message,
            solution: '', 
            message: data.url,
            success: data.success
          }
          handleAlert(alert);
        }
    } catch (error) {
      setBackdrop(false);
         alert = {
          severity: 'error', 
          title: error.message,
          message: error.solution,
          success: false
        }
        handleAlert(alert);
    }

        }
    });
    
  function handleChangeVendors (updatedVendors) {
    setVendors(updatedVendors)
  }
  function onChangeSlateEditor(newDesc) {
    setSlateEditor(newDesc)
  }
   function handleChangeIsDeeded(){
    setIsDeeded(!isDeeded)
  }

  function handleChangeHasAllServices(){
    setHasAllServices(!hasAllServices)
  }
  function handleChangeIsFeatured(){
    setFeatured(!isFeatured)
  }
  function handleBackdrop(){
    setBackdrop(!backdrop)
  }

  function onChangeCoordinates(e) {
    setCoordinates({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    })
  }

  async function postProperty (event) {
    event.preventDefault();
    formikInput.handleSubmit();
  }

  
/**
  @description Checks errors on Formik #handleSubmit
  @param {key} String Key of the formik Schema
  @returns {boolean} True if erros occurred, falsy if not
 */
 function isInputError(key){
   return formikInput.touched[key] && formikInput.errors[key] ? true : false;
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
    variant: 'h5',
    className: classes.title,
  }

  const requiredInputs ={
    required: false,
    title: 'Por favor, llene este campo.'
  }
  return (
    <div className={classes.root}>
      <Typography {...defaultTypoProps}>Características generales</Typography>
      <Divider/>
        <form onSubmit={postProperty}>
            {/* Status */}
            <FormControl component="fieldset" {...defaultInputProps} {...requiredInputs} error={ isInputError('status')}>
              <FormLabel component="legend">Estado</FormLabel>
              <RadioGroup aria-label="quiz" name="status" value={formikInput.values.status} onChange={formikInput.handleChange}>
                <FormControlLabel value="Venta" control={<Radio />} label="Venta" />
                <FormControlLabel value="Renta" control={<Radio />} label="Renta" />
              </RadioGroup>
            </FormControl>

            {/* Zone */}
            <FormControl component="fieldset" {...defaultInputProps}  {...requiredInputs}  error={ isInputError('zone')}>
            <FormLabel component="legend">Zona</FormLabel>
            <RadioGroup aria-label="quiz" name="zone" onChange={formikInput.handleChange} value ={formikInput.values.zone}>
              <FormControlLabel value="Campestre" control={<Radio />} label="Campestre" />
              <FormControlLabel value="Urbana" control={<Radio />} label="Urbana" />
              <FormControlLabel value="Comercial" control={<Radio />} label="Comercial" />
            </RadioGroup>
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
              helperText="0000VT-00 | Máx: 15"
              placeholder='Codigo de la propiedad'
              onChange={formikInput.handleChange}
              value={formikInput.values.code}
              error={ isInputError('code')}
             />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={isDeeded} onChange={handleChangeIsDeeded} name="isDeeded" />}
                label="Escriturado"
              />
              <FormControlLabel
                control={<Checkbox checked={hasAllServices} onChange={handleChangeHasAllServices} name="hasAllServices" />}
                label="Todos los servicios"
              />
               <FormControlLabel
                control={<Checkbox checked={isFeatured} onChange={handleChangeIsFeatured} name="isFeatured" />}
                label="Propiedad destacada"
              />
            </FormGroup>
          
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
              placeholder='Precio por m², ha.'
              helperText= '$ 00 USD|MXN/m² | Máx: 20 '
              onChange={formikInput.handleChange}
              value={formikInput.values.specialPrice}
              error={ isInputError('specialPrice')}
             />

             {/* Payment Price */}
              <TextField 
                {...defaultInputProps}
                id="onPayments"
                name="onPayments"
                label="Precio en pagos"
                placeholder='Ingrese mensualidad'
                helperText= '(meses)x $ (mensualidad) | Max: 20'
                onChange={formikInput.handleChange}
                value={formikInput.values.onPayments}
                error={ isInputError('onPayments')}
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
             <TextField 
                {...requiredInputs}
                {...defaultInputProps}
                id="descriptin.text"
                name="description.text"
                label="Descripcion"
                placeholder='Ingrese descripcion'
                multiline
                helperText= 'Escriba la descripcion con formato MD'
                onChange={handleTextChange}
                value={text}
                
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
              value={formikInput.values.city}
              onChange={formikInput.handleChange}
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

          {/* <ImageHandler
                  images={images}
                  updateImages={updateImages}
                  deleteImage={deleteImage}
                  orderImages={orderImages}
          /> */}

          {/* Images */}
          <TextField
          {...defaultInputProps}
          {...requiredInputs}
            id="images"
            name="images"
            label="Imagenes"
            placeholder="Ingrese links(separados por comas)"
            multiline
            onChange={formikInput.handleChange}
            value={formikInput.values.images}
            
          />

           {/* Description */}
             <TextField 
                {...defaultInputProps}
                {...requiredInputs}
                id="video"
                name="video"
                label="Video de Youtube"
                placeholder='Ingrese URL del video de Youtube'
                helperText= 'https://youtu.be/dQw4w9WgXcQ'
                onChange={formikInput.handleChange}
                value={formikInput.values.video}
                error={ isInputError('video')}
          />

{/* Meta */}
          <Typography {...defaultTypoProps}>Meta</Typography>
          <Divider/>


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
                helperText= 'Ingrese una descripción corta. Máx: 160'
                onChange={formikInput.handleChange}
                value={formikInput.values.description}
                error={ isInputError('description')}
          />

        {/* Meta */}
        <Typography {...defaultTypoProps}>Dueños</Typography>
        <Divider/>

        <SearchClient
            selectedClients={null}
            clients = {autoCompleteClients}
            handleChangeVendors = {handleChangeVendors}
        />
        
        <SubmitButton 
          type="submit" 
          text="Crear Propiedad"
          size="large"
          fullWidth
          startIcon ={<SaveIcon/>}  
        >
        Crear Propiedad
        </SubmitButton>
        <Backdrop className={classes.backdrop} open={backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
        </form>


      {isAlertOpen && 
      <Alert severity={alert.severity} className={classes.alert }>
          <AlertTitle>{alert.title}</AlertTitle>
          {!alert.success && alert.message}
      </Alert> } 

      {alert.success && <Link href={`/propiedad/${alert.message}`}><a>Ingrese al siguiente URL</a></Link> }

     
    </div>
  )
}

export default PropertyForm
