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
    router.push('/admin/properties')
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

  const user = useFormik({
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
      router.push('/admin/properties')
    },
    onError (err) {
      setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
    },
    variables: user.values
  })

  return (
        <div className={classes.formContainer}>
            <img className={classes.img} src='/LogoOriginalSF.png'/>
            <form onSubmit={user.handleSubmit}>
                <InputBase 
                  className={classes.input}
                  id='email'
                  type='email'
                  value={user.values.email}
                  placeholder='Email'
                  name='email'
                  onChange={user.handleChange}
                />
                <Typography className={classes.error}>
                  {user.touched.email && user.errors.email}
                </Typography>
                <InputBase 
                  className={classes.input}
                  id='password'
                  type='password'
                  value={user.values.password}
                  placeholder='******'
                  name='password'
                  onChange={user.handleChange}
                />
                <Typography className={classes.error}>
                  {user.touched.password && user.errors.password}
                </Typography>
                <Checkbox
                    id='rememberMe'
                    name='rememberMe'
                    label='Recuérdame'
                    value={user.values.rememberMe}
                    onChange={user.handleChange}
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
              href='/admin/recoverPassword'
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
