import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    input: {
        width: 340,
        height: 40,
        marginBottom: 30, 
        border: '1px solid #4CAF50'
    }
}))

function InputField({ id, select, object, placeholder, type, value, name, onChange}) {

    const classes = useStyles()

    if(select){
        return (
            <TextField
                className={classes.input}
                id={id}
                select
                label={placeholder}
                type={type}
                variant='outlined'
                value={value}
                name={name}
                onChange={onChange}
            >
                {object.map((value => (
                    <MenuItem key={value} value={value}>
                        {value}
                    </MenuItem>
                )))}
            </TextField>
        )
    }

    return (
        <TextField
            className={classes.input}
            id={id}
            placeholder={placeholder}
            type={type}
            variant='outlined'
            value={value}
            name={name}
            onChange={onChange}
        />
        
    )
}

export default InputField
