import {React,useState} from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse';
import MenuItem from '@material-ui/core/MenuItem'
import Input from '../components/Input'
import { makeStyles } from '@material-ui/core/styles';
import { green, grey6 } from '../../public/colors'
import Select from '@material-ui/core/Select';
import styles from '../../styles/ClientForm.module.css'

const useStyles = makeStyles(theme=>({
    formContainer: {
        margin:0,
        padding:0,
        textAlign: 'center'
    },
    buttonAdd: {
        width:340,
        height:40,
        borderRadius: 15,
        backgroundColor: '#4CAF50',
        marginBottom: 20
    },
    buttonCancel: {
        width:340,
        height:40,
        borderRadius: 15,
        backgroundColor: '#F2F2F2'
    }
}))


const ClientForm = () => {

    const classes=useStyles()
    
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

    return (
        <Container maxWidth="xs" className={classes.formContainer}>
            
            <form className={classes.formContainer}> 
                <p><strong>Información del cliente</strong></p>
                <input
                    className={styles.input_style}
                    type='text'
                    placeholder='Nombre Completo'
                    value={client.name}
                    onChange={(e) => setClient({...client, name:e.target.value})}
                    color={grey6}
                />

                <input
                    className={styles.input_style}
                    type='date'
                    placeholder='Fecha De Nacimiento dd/mm/yyyy'
                    value={client.dob}
                    onChange={(e) => setClient({...client, dob:e.target.value})}
                    color={grey6}
                />
                
                <Select
                    className={styles.input_style}
                    id="gender"   
                    placeholder='Genero'
                    variant='outlined'
                    value={client.gender}
                    onChange={(e) => setClient({...client, gender:e.target.value})}
                >
            
                {genders.map((gender)=>(
                    <MenuItem key={gender} value={gender}>
                        {gender}
                    </MenuItem>
                ))}
                </Select>    
                
                
                <input
                    className={styles.input_style}
                    type='text'
                    placeholder='Profesión'
                    value={client.profession}
                    onChange={(e) => setClient({...client, profession:e.target.value})}
                    color={grey6}
                />

                <p><strong>Contacto</strong></p>
                <input
                    className={styles.input_style}
                    type='email'
                    placeholder='Email'
                    value={client.email}
                    onChange={(e) => setClient({...client, email:e.target.value})}
                    color={grey6}
                />
                 <input
                    className={styles.input_style}
                    type='text'
                    placeholder='Telefóno'
                    value={client.phone}
                    onChange={(e) => setClient({...client, phone:e.target.value})}
                    color={grey6}
                />

                <p><strong>Ubicación</strong></p>
                <input
                    className={styles.input_style}
                    type='text'
                    placeholder='Localidad'
                    value={client.location}
                    onChange={(e) => setClient({...client, location:e.target.value})}
                    color={grey6}
                />
                 <input
                    className={styles.input_style}
                    type='text'
                    placeholder='Dirección'
                    value={client.address}
                    onChange={(e) => setClient({...client, address:e.target.value})}
                    color={grey6}
                />

                <Button
                    className={classes.buttonAdd}
                    variant='contained'
                    onClick={onSubmit}
                >
                    Agregar
                </Button>
                <Button
                    className={classes.buttonCancel}
                    variant='contained'
                >
                    Cancelar
                </Button>
            </form>

        </Container>
    )
}

export default ClientForm
