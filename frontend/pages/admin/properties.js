import React from 'react'
import {
    Paper,
    TextField,
    Typography,
} from '@material-ui/core'

export default function addProperty() {

    const onSubmit = () => {
        console.log('Submit')
    }

    return (
        <div>
            <Paper style={{padding:'20px'}}>
                <h2>Agregar propiedad</h2>
                <form onSubmit={onSubmit}>
                    <TextField 
                        margin='normal'
                        label='Titulo de la propiedad'
                        variant='filled'
                        fullWidth
                    />
                    <TextField 
                        margin='normal'
                        label='Titulo de la propiedad'
                        variant='filled'
                        fullWidth
                    />
                    <TextField 
                        margin='normal'
                        label='Titulo de la propiedad'
                        variant='filled'
                        fullWidth
                    />
                </form>
            </Paper>
        </div>
    )
}

