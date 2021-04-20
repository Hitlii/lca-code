import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme)=>({
    formContainer: {
        padding: 0,
        margin: 0,
        textAlign: 'center',
    },
    textField: {
        width: 340,
        height: 40,
        margin: 20,
        
    },
    acceptButton: {
        width: 340,
        height: 40,
        margin: 20,
    },
    cancelButton: {
        width: 340,
        height: 40,
        margin: 20,
    },
}))

function addClient() {

    const classes = useStyles()

    const [client, setClient] = useState({
        name: '',
        dob: new Date(),
        gender: '',
        profession: '',
        email: '',
        phone: '',
        location: '',
        address: ''
    })

    const genders = ['Hombre','Mujer','Otro']

    const onSubmit = () => {
        console.log(client)
    }

    return(
        <Container maxWidth='sm' className={classes.formContainer}>
            <form className={classes.formContainer}>
                <p><strong>Informacion del cliente</strong></p>
                <TextField
                    className={classes.textField}
                    id='name'
                    placeholder='Nombre completo'
                    type='text'
                    variant='outlined'
                    value={client.name}
                    onChange={(e) => setClient({...client, name:e.target.value})}
                />
                <TextField
                    className={classes.textField}
                    id='dob'
                    type='date'
                    variant='outlined'
                    value={client.dob}
                    onChange={(e) => setClient({...client, dob:e.target.value})}
                />
                <TextField
                    className={classes.textField}
                    id='genero'
                    select
                    label='Género'
                    type='text'
                    variant='outlined'
                    value={client.gender}
                    onChange={(e) => setClient({...client, gender:e.target.value})}
                >
                { genders.map((option)=>(
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                    
                ))}
                </TextField>


                <p><strong>Contacto</strong></p>
                <TextField
                    className={classes.textField}
                    id='email'
                    placeholder='Email'
                    type='email'
                    variant='outlined'
                    value={client.email}
                    onChange={(e) => setClient({...client, email:e.target.value})}
                />
                <TextField
                    className={classes.textField}
                    id='telefono'
                    placeholder='Teléfono'
                    type='text'
                    variant='outlined'
                    value={client.phone}
                    onChange={(e) => setClient({...client, phone:e.target.value})}
                />

                <p><strong>Ubicación</strong></p>
                <TextField
                    className={classes.textField}
                    id='localidad'
                    placeholder='Localidad'
                    type='text'
                    variant='outlined'
                    value={client.location}
                    onChange={(e) => setClient({...client, location:e.target.value})}
                />
                <TextField
                    className={classes.textField}
                    id='direccion'
                    placeholder='Dirección'
                    type='text'
                    variant='outlined'
                    value={client.address}
                    onChange={(e) => setClient({...client, address:e.target.value})}
                />
                <Button 
                    className={classes.acceptButton}
                    variant='contained'
                    onClick={onSubmit}
                >
                   Aceptar 
                </Button>
                <Button 
                    className={classes.cancelButton}
                    variant='contained'
                >
                   Cancelar 
                </Button>
            </form>
        </Container>  
        
    )
}

export default addClient