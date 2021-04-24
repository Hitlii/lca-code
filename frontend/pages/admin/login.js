import { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { AuthContext } from '../../context/auth'

import { green, grey6 } from '../../public/colors.js'
import styles from '../../styles/Login.module.css'

import Button from '../components/Button'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import Link from 'next/link'

function Login () {
  const LOGIN_ADMIN = gql`
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

  const context = useContext(AuthContext)
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const [errors, setErrors] = useState({})

  const [loginAdmin] = useMutation(LOGIN_ADMIN, {
    update (
      _,
      { data }
    ) {
      context.login(data.login.token)
      router.push('/')
    },
    onError (err) {
      setErrors(err && err.graphQLErrors[0] ? err.graphQLErrors[0].extensions.exception.errors : {})
    },
    variables: user
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    loginAdmin()
  }

  return (
        <div className={styles.form_container}>
            <img src='/LogoOriginalSF.png'/>
            <form>
                <Input
                    type='email'
                    placeholder='Email'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    color={grey6}
                />
                <Input
                    type='password'
                    placeholder='******'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    color={grey6}
                />
                <Checkbox
                    label='Recuérdame'
                    value={user.rememberMe}
                    onChange={(e) => setUser({ ...user, rememberMe: e.currentTarget.checked })}
                />
                <Button
                    color={green}
                    text='Login'
                    onClick={onSubmit}
                />
            </form>
            <Link href='/admin/recoverPassword'>Recuperar contraseña</Link>
        </div>
  )
}

export default Login
