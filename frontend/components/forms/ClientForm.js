import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GreenButton from '../buttons/GreenButton'
import GreyButton from '../buttons/GreyButton'
import InputText from '../inputs/InputText'
import InputSelect from '../inputs/InputSelect'
import useForm from '../../hooks/useForm'
import Typography from '@material-ui/core/Typography'
import { gql, useMutation } from '@apollo/client'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: 0,
    margin: 0,
  },
  headers: {
    marginLeft: 20,
    marginBottom: 10
  }, 
  gridItem: {
      textAlign: 'center'
  }
}))

function ClientForm () {
    const classes = useStyles()

    const [errors, setErrors] = useState({})

    const { onChange, onSubmit, values } = useForm(addClientCallback, {
        name: '',
        gender: '',
        birthday: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        address: ''
    })

    const [createClient] = useMutation(CREATE_CLIENT, {
        update (
        _,
        { data }
        ) {
            console.log(data)
            router.push('/admin/properties')
        },
        onError (err) {
            setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
        },
        variables: values
    })

    function addClientCallback () {
        createClient()
    }

  const genders = ['Hombre', 'Mujer', 'Otro']
  const cities = ['Tijuana', 'Tecate', 'San Quintin', 'Ensenada', 'Mexicali', 'Rosarito']
  const states = ['Baja California']

  return (
        <Grid container className={classes.formContainer}>
            <Grid item xs={12}>
                <Typography variant='h6' className={classes.headers}>
                    Informacion del cliente
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputText
                    placeholder='Nombre completo'
                    type='text'
                    value={values.name}
                    name='name'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputSelect
                    object={genders}
                    value={values.gender}
                    name='gender'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}> 
                <InputText
                    type='date'
                    value={values.birthday}
                    name='birthday'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' className={classes.headers}>
                    Contacto
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputText
                    placeholder='Email'
                    type='email'
                    value={values.email}
                    name='email'
                    onChange={onChange}
                /> 
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputText
                    placeholder='Teléfono'
                    type='text'
                    value={values.phone}
                    name='phone'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h6' className={classes.headers}>
                    Ubicación
                </Typography>
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputSelect
                    object={cities}
                    value={values.city}
                    name='city'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputSelect
                    object={states}
                    value={values.state}
                    name='state'
                    onChange={onChange}
                />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <InputText
                    placeholder='Dirección'
                    type='text'
                    value={values.address}
                    name='address'
                    onChange={onChange}
                />    
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <GreenButton
                    onClick={onSubmit}
                    text='Aceptar'
                />    
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
                <GreyButton
                    text='Cancelar'
                />
            </Grid>
        </Grid>

  )
}


const CREATE_CLIENT = gql`
    mutation createClient(
        $name: String!
        $gender: String!
        $birthday: String!
        $email: String!
        $phone: String!
        $city: String!
        $state: String!
        $address: String!
    ) {
        createClient(
            name: $name
            gender: $gender
            birthday: $birthday
            email: $email
            phone: $phone
            city: $city
            state: $state
            address: $address
        ) {
            name
            gender
            birthday
        }
    }
`


export default ClientForm
