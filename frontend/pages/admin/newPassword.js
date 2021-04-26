import React, { useState } from 'react'
import Button from '../../components/buttons/Button'
import Input from '../../components/inputs/Input'
import { green, grey6 } from '../../public/colors.js'
import styles from '../../styles/Login.module.css'

function newPassword () {
  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: ''
  })

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(newPassword)
  }

  return (
        <div className={styles.form_container}>
            <img src='/LogoOriginalSF.png'/>
            <form>
                <p>Nueva contraseña:</p>
                <Input
                    type='password'
                    placeholder='******'
                    value={newPassword.password}
                    onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                    color={grey6}
                />
                <p>Confirmar contraseña:</p>
                <Input
                    type='password'
                    placeholder='******'
                    value={newPassword.confirmPassword}
                    onChange={(e) => setNewPassword({ ...newPassword, confirmPassword: e.target.value })}
                    color={grey6}
                />
                <Button
                    color={green}
                    text='Confirmar'
                    onClick={onSubmit}
                />
            </form>
        </div>
  )
}

export default newPassword
