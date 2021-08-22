import React from 'react'
import { useRouter } from 'next/router'
import { gql, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { clientValidationSchema } from '../../helper/clientValidator'

import {
    Divider,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'

import SubmitButton from '../GreenLgButton'

import { useStyles, defaultInputProps ,defaultTypoProps, requiredInputs } from './styles'

function ClientForm ({ editClient }) {
    const classes = useStyles()
    const router = useRouter()
    
    let initialValues 

    if(editClient !== null) {
        initialValues = {
            id: editClient._id,
            name: editClient.name,
            gender: editClient.gender,
            birthday: new Date(new Number(editClient.birthday)).toISOString().slice(0,10),
            email: editClient.contact.email,
            phone: editClient.contact.phone,
            city: editClient.location.city,
            state: editClient.location.state,
            address: editClient.location.address
        }
    } else {
        initialValues = {
            name: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            city: '',
            state: '',
            address: ''
        }
    }

    const formikInput = useFormik({
        initialValues: initialValues,
        validationSchema: clientValidationSchema,
        onSubmit: (values) => {
            console.log(values)
            if(editClient!==null) {
                updateClient()
            } else { 
                createClient()
            }
        }
    })

    const [createClient] = useMutation(CREATE_CLIENT, {
        update (
        _,
        { data }
        ) {
            console.log(data)
            router.push('/admin1/clientes')
        },
        variables: {
            name: formikInput.values.name,
            gender: formikInput.values.gender,
            birthday: formikInput.values.birthday,
            email: formikInput.values.email,
            phone: formikInput.values.phone,
            city: formikInput.values.city,
            state: formikInput.values.state,
            address: formikInput.values.address,
        }
    })

    const [updateClient] = useMutation(UPDATE_CLIENT, {
        update (
        _,
        { data }
        ) {
            console.log(data)
            router.push('/admin1/clientes')
        },
        variables: formikInput.values
    })

    return (
        <div className={classes.root}>
            <Typography {...defaultTypoProps}>Información del cliente</Typography>
            <Divider/>
            <form onSubmit={formikInput.handleSubmit}>
                {/* Informacion del cliente */}
                {/* Nombre */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="name"
                    name="name"
                    label="Nombre Completo"
                    placeholder='John Doe'
                    title = "Por favor, llene este campo"
                    value={formikInput.values.name}
                    onChange={formikInput.handleChange}
                    error={formikInput.touched.name && Boolean(formikInput.errors.name)}
                    helperText={formikInput.touched.name && formikInput.errors.name}
                />
                {/* Gender */}
                <FormControl className={classes.formControl} {...defaultInputProps} {...requiredInputs}>
                    <InputLabel id="genderSelect">Género</InputLabel>
                    <Select
                        labelId="genderSelect"
                        id="gender"
                        name="gender"
                        title = "Por favor, llene este campo"
                        value={formikInput.values.gender}
                        onChange={formikInput.handleChange}
                        error={formikInput.touched.gender && Boolean(formikInput.errors.gender)}
                    >
                        <MenuItem value={'Hombre'}>Hombre</MenuItem>
                        <MenuItem value={'Mujer'}>Mujer</MenuItem>
                        <MenuItem value={'Otro'}>Otro</MenuItem>
                    </Select>
                    <FormHelperText>{formikInput.touched.gender && formikInput.errors.gender}</FormHelperText>
                </FormControl>
                {/* Birthday */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="birthday"
                    name="birthday"
                    type='date'
                    helperText="Fecha de nacimiento"
                    title = "Por favor, llene este campo"
                    value={formikInput.values.birthday}
                    onChange={formikInput.handleChange}
                    error={formikInput.touched.birthday && Boolean(formikInput.errors.birthday)}
                    helperText={formikInput.touched.birthday && formikInput.errors.birthday}
                />
                {/* Contacto */}
                <Typography {...defaultTypoProps}>Contacto</Typography>
                <Divider/>
                {/* Email */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="email"
                    name="email"
                    type='email'
                    label="Correo Electrónico"
                    placeholder='cliente@gmail.com'
                    title = "Por favor, llene este campo"
                    helperText='cliente@email.com'
                    onChange={formikInput.handleChange}
                    value={formikInput.values.email}
                    error={formikInput.touched.email && Boolean(formikInput.errors.birthday)}
                    helperText={formikInput.errors.email}
                />
                {/* Phone */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="phone"
                    name="phone"
                    label="Número Telefónico"
                    helperText="Máx: 16 caracteres"
                    title = "Por favor, llene este campo"
                    onChange={formikInput.handleChange}
                    value={formikInput.values.phone}
                    error={formikInput.touched.phone && Boolean(formikInput.errors.phone)}
                    helperText={formikInput.errors.phone}
                />
                <Typography {...defaultTypoProps}>Ubicación</Typography>
                <Divider/>
                {/* City */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="city"
                    name="city"
                    label="Ciudad"
                    helperText="Máx: 40 caracteres"
                    title = "Por favor, llene este campo"
                    onChange={formikInput.handleChange}
                    value={formikInput.values.city}
                    error={formikInput.touched.city && Boolean(formikInput.errors.city)}
                    helperText={formikInput.errors.city}
                />
                {/* State */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="state"
                    name="state"
                    label="Estado"
                    helperText="Máx: 20 caracteres"
                    title = "Por favor, llene este campo"
                    onChange={formikInput.handleChange}
                    value={formikInput.values.state}
                    error={formikInput.touched.state && Boolean(formikInput.errors.state)}
                    helperText={formikInput.errors.state}
                />
                {/* Address */}
                <TextField 
                    {...defaultInputProps}
                    {...requiredInputs}
                    id="address"
                    name="address"
                    label="Dirección"
                    helperText="Máx: 100 caracteres"
                    title = "Por favor, llene este campo"
                    onChange={formikInput.handleChange}
                    value={formikInput.values.address}
                    error={formikInput.touched.address && Boolean(formikInput.errors.address)}
                    helperText={formikInput.errors.address}
                />
                <SubmitButton 
                    type="submit" 
                    
                >
                    {editClient ? 'Editar Cliente' : 'Agregar Cliente'}
                </SubmitButton>
            </form>
        </div>
    )
}


const CREATE_CLIENT = gql`
    mutation createClient(
        $name: String!
        $gender: String!
        $birthday: Date!
        $email: String!
        $phone: String!
        $city: String!
        $state: String!
        $address: String!
    ) {
        createClient(
            client: {
                name: $name
                gender: $gender
                birthday: $birthday
                contact: {
                    email: $email
                    phone: $phone
                }
                location: {
                    city: $city
                    state: $state
                    address: $address
                }
            }
        ) {
            code
            success
        }
    }
`

const UPDATE_CLIENT = gql`
    mutation updateClient(
        $id: ID!
        $name: String!
        $gender: String!
        $birthday: String!
        $email: String!
        $phone: String!
        $city: String!
        $state: String!
        $address: String!
    ) {
        updateClient(
            _id: $id
            name: $name
            gender: $gender
            birthday: $birthday
            email: $email
            phone: $phone
            city: $city
            state: $state
            address: $address
        ) {
            success
        }
    }
`

export default ClientForm