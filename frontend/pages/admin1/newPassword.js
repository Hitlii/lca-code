import React, { useState } from 'react'

import {
  InputBase,
  Button, 
  Typography,
} from '@material-ui/core'

import { useFormik } from 'formik';
import * as yup from 'yup';

import loginStyles from '../../styles/loginStyles'

function newPassword () {

  const classes = loginStyles()

  const validationSchema =  yup.object({
    password: yup.string().required('Password is required'),
    confirmPassword: yup.string()
       .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  const newPassword = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  return (
        <div className={classes.formContainer}>
            <img className={classes.img} src='/LogoOriginalSF.png'/>
            <form onSubmit={newPassword.handleSubmit}>
                <Typography className={classes.header}>Nueva contraseña:</Typography>
                <InputBase
                  className={classes.input}
                  id='password'
                  type='password'
                  placeholder='******'
                  name='password'
                  value={newPassword.values.password}
                  onChange={newPassword.handleChange}
                />
                <Typography className={classes.error}>
                  {newPassword.touched.password && newPassword.errors.password}
                </Typography>
                <Typography className={classes.header}>Confirmar contraseña:</Typography>
                <InputBase
                  className={classes.input}
                  id='confirmPassword'
                  type='password'
                  placeholder='******'
                  name='newPassword'
                  value={newPassword.values.confirmPassword}
                  onChange={newPassword.handleChange}
                />
                <Typography className={classes.error}>
                  {newPassword.touched.confirmPassword && newPassword.errors.confirmPassword}
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

export default newPassword
