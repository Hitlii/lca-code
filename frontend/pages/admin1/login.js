import { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/auth'

import { 
  Button, 
  InputBase, 
  Typography,
} from '@material-ui/core'
import Checkbox from '../../components/inputs/Checkbox'
import StyledLink from '../../components/StyledLink'

import { useFormik } from 'formik';
import * as yup from 'yup';

import loginStyles from '../../styles/loginStyles'


function Login () {

  const context = useContext(AuthContext)
  const router = useRouter()

  if(context.user) {
    router.replace('/admin1')
  }

  const classes = loginStyles()

  const [errors, setErrors] = useState({})

  const validationSchema = yup.object({
    email: yup
      .string('Email')
      .email('Ingresa un email válido')
      .required('Email es requerido'),
    password: yup
      .string('******')
      .required('Tu contraseña es requerida')
  })

  const admin = useFormik({
    initialValues:{
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)
      loginAdmin()
    },
  })

  const [loginAdmin] = useMutation(LOGIN_ADMIN, {
    update (
      _,
      { data }
    ) {
      context.login(data.login.token)
      router.push('/admin1')
    },
    onError (err) {
      setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
    },
    variables: admin.values
  })

  return (
        <div className={classes.formContainer}>
            <img className={classes.img} src='/LogoOriginalSF.png'/>
            <form onSubmit={admin.handleSubmit}>
                <InputBase 
                  className={classes.input}
                  id='email'
                  type='email'
                  value={admin.values.email}
                  placeholder='Email'
                  name='email'
                  onChange={admin.handleChange}
                />
                <Typography className={classes.error}>
                  {admin.touched.email && admin.errors.email}
                </Typography>
                <InputBase 
                  className={classes.input}
                  id='password'
                  type='password'
                  value={admin.values.password}
                  placeholder='******'
                  name='password'
                  onChange={admin.handleChange}
                />
                <Typography className={classes.error}>
                  {admin.touched.password && admin.errors.password}
                </Typography>
                <Checkbox
                    id='rememberMe'
                    name='rememberMe'
                    label='Recuérdame'
                    value={admin.values.rememberMe}
                    onChange={admin.handleChange}
                />
                <Button
                  type='submit'
                  className={classes.button}
                  variant='contained'
                >
                  Login
                </Button>
            </form>
            <StyledLink 
              href='/admin1/recoverPassword'
              text='Recuperar Contraseña'
            />
        </div>
  )
}

const LOGIN_ADMIN = gql
`
    mutation login(
        $email: String!
        $password: String!
        $rememberMe: Boolean!
    ) {
        login(
            input: {
                email: $email
                password: $password
                rememberMe: $rememberMe
            }
        ) {
            token
        }
    }
`

export default Login
