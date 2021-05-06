import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import GreenButton from '../buttons/GreenButton'
import GreyButton from '../buttons/GreyButton'
import InputText from '../inputs/InputText'
import InputSelect from '../inputs/InputSelect'
import useForm from '../../hooks/useForm'

import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: 0,
    margin: 0,
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
  gridItem: {
      textAlign: 'center'
  }
}))

function ClientForm () {
    const classes = useStyles()

    const [errors, setErrors] = useState({})

    const { client } = useForm(addClientCallback, {
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
        variables: client.values
    })

    function addClientCallback () {
        createClient()
    }

    const genders = ['Hombre', 'Mujer', 'Otro']

    return (
            <Grid container className={classes.formContainer}>
                    <Grid item xs={12}>
                        <Typography className={classes.headers}>
                            Informacion del cliente
                        </Typography>
                        <Divider className={classes.divider}/>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <InputText
                            placeholder='Nombre completo'
                            type='text'
                            value={client.values.name}
                            name='name'
                            onChange={client.handleChange}
                            error={client.touched.name && client.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <InputSelect
                            object={genders}
                            label='Género'
                            value={client.values.gender}
                            name='gender'
                            onChange={client.handleChange}
                            error={client.touched.gender && client.errors.gender}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}> 
                        <InputText
                            type='date'
                            value={client.values.birthday}
                            name='birthday'
                            onChange={client.handleChange}
                            error={client.touched.birthday && client.errors.birthday}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.headers}>
                            Contacto
                        </Typography>
                        <Divider className={classes.divider}/>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <InputText
                            placeholder='Email'
                            type='email'
                            value={client.values.email}
                            name='email'
                            onChange={client.handleChange}
                            error={client.touched.email && client.errors.email}
                        /> 
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <InputText
                            placeholder='Teléfono'
                            type='text'
                            value={client.values.phone}
                            name='phone'
                            onChange={client.handleChange}
                            error={client.touched.phone && client.errors.phone}
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
                            placeholder='Ciudad'
                            value={client.values.city}
                            name='city'
                            onChange={client.handleChange}
                            error={client.touched.city && client.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <InputText
                            type='text'
                            placeholder='Estado'
                            value={client.values.state}
                            name='state'
                            onChange={client.handleChange}
                            error={client.touched.state && client.errors.state}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <InputText
                            placeholder='Dirección'
                            type='text'
                            value={client.values.address}
                            name='address'
                            onChange={client.handleChange}
                            error={client.touched.address && client.errors.address}
                        />    
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <GreenButton
                            onClick={client.handleSubmit}
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
