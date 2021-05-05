import React from 'react'

import {
  InputBase,
  Button, 
  Typography,
} from '@material-ui/core'

import { useFormik } from 'formik';
import * as yup from 'yup';

import loginStyles from '../../styles/loginStyles'

function recoverPassword () {

  const classes = loginStyles()
  
  const validationSchema = yup.object({
    email: yup
      .string('Email')
      .email('Ingresa un email válido')
      .required('Email es requerido')
  })

  const email = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
        <div className={classes.formContainer}>
            <img className={classes.img} src='/LogoOriginalSF.png'/>
            <Typography className={classes.header}>Ingresa tu correo electrónico:</Typography>
            <form onSubmit={email.handleSubmit}>
              <InputBase
                className={classes.input}
                id='email'
                type='email'
                placeholder='admin@email.com'
                name='email'
                value={email.values.email}
                onChange={email.handleChange}
              />
              <Typography className={classes.error}>
                {email.touched.email && email.errors.email}
              </Typography>
              <Button
                className={classes.button}
                type='submit'
              >
                Confirmar
              </Button>
            </form>
        </div>
  )
}

export default recoverPassword
