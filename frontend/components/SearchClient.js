import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { GET_ALL_CLIENTS } from '../graphql/queries'

const useStyles = makeStyles(({
    auto: {
        marginBottom: 20,
    },
    textField: {
        width: 340,
        height: 40,
        marginBottom: 30
    }
}))

function SearchClient({
    onChange, 
    clients, 
    handleChangeVendors 
    
    }) {

    const classes = useStyles()

    function handleChange(event,value){ 
        handleChangeVendors(value);
        console.log(value);
    }
    return (
        <Autocomplete 
            className={classes.auto}
            multiple
            limitTags={2}
            options={clients}
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
                <Typography>
                    {option.name} - {option.contact.phone}
                </Typography>
            )}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField 
                    className={classes.textField}
                    {...params} 
                    label='Elija un cliente'
                    variant='outlined'
                />
            )}
        />
    )
}

export default SearchClient