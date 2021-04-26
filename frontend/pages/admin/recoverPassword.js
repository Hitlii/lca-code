import React, { useState } from 'react'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import { green, grey6 } from '../../public/colors.js'
import styles from '../../styles/Login.module.css'

function recoverPassword () {
  const [email, setEmail] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(email)
  }

  return (
        <div className={styles.form_container}>
            <img src='/LogoOriginalSF.png'/>
            <p>Ingresa tu correo electrónico:</p>
            <form>
            <Input
                type='email'
                placeholder='admin@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={grey6}
            />
            <Button
                color={green}
                text='Enviar'
                onClick={onSubmit}
            />
            </form>
        </div>
  )
}

export default recoverPassword
