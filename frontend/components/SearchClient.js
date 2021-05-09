 import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'



function SearchClient({
    onChange, 
    clients, 
    handleChangeVendors 
    
    }) {


    function handleChange(event,value){ 
        handleChangeVendors(value);
        console.log(value);
    }
    return (
        <Autocomplete 
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
                    {...params} 
                    label='Elija un cliente'
                    variant='filled'
                />
            )}
        />
    )
}

export default SearchClient
