import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import GreenButton from './GreenButton'
import GreyButton from './GreyButton'
import InputField from './InputField'
import useForm from '../../hooks/useForm'

const useStyles = makeStyles((theme) => ({
  formContainer: {
    padding: 0,
    margin: 0,
    textAlign: 'center'
  },
  headers: {
    marginBottom: 10
  }
}))

function ClientForm () {
  const classes = useStyles()

  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(addClientCallback, {
    name: '',
    dob: '',
    gender: '',
    profession: '',
    email: '',
    phone: '',
    location: '',
    address: ''
  })

  function addClientCallback () {

  }

  const genders = ['Hombre', 'Mujer', 'Otro']

  return (
        <Container maxWidth='sm' className={classes.formContainer}>
            <form className={classes.formContainer}>
                <p className={classes.headers}><strong>Informacion del cliente</strong></p>
                <InputField
                    placeholder='Nombre completo'
                    type='text'
                    value={values.name}
                    name='name'
                    onChange={onChange}
                />
                <InputField
                    type='date'
                    value={values.dob}
                    name='dob'
                    onChange={onChange}
                />
                <InputField
                    select
                    object={genders}
                    placeholder='Género'
                    type='text'
                    value={values.gender}
                    name='gender'
                    onChange={onChange}
                />
                <InputField
                    type='text'
                    value={values.profession}
                    name='profession'
                    onChange={onChange}
                />

                <p className={classes.headers}><strong>Contacto</strong></p>
                <InputField
                    placeholder='Email'
                    type='email'
                    value={values.email}
                    name='email'
                    onChange={onChange}
                />
                <InputField
                    placeholder='Teléfono'
                    type='text'
                    value={values.phone}
                    name='phone'
                    onChange={onChange}
                />

                <p className={classes.headers}><strong>Ubicación</strong></p>
                <InputField
                    placeholder='Localidad'
                    type='text'
                    value={values.location}
                    name='location'
                    onChange={onChange}
                />
                <InputField
                    placeholder='Dirección'
                    type='text'
                    value={values.address}
                    name='address'
                    onChange={onChange}
                />
                <GreenButton
                    onClick={onSubmit}
                    text='Aceptar'
                />
                <GreyButton
                    text='Cancelar'
                />
            </form>
        </Container>

  )
}

export default ClientForm
