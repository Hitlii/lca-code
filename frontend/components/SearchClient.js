 import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'



function SearchClient({
    onChange, 
    clients, 
    handleChangeVendors, 
    selectedClients
    }) {

    function handleChange(event,value){ 
        handleChangeVendors(value);
        console.log(value);
    }

    function setDefaultValues(){
        let i, j
        let defaultClients = []
        //Recorro arreglo de todos los clientes
        for(i = 0; i < clients.length; i++) {
            //Recorro arreglo de clientes seleccionados
            for(j = 0; j < selectedClients.length; j++) {
                //Si el cliente seleccionado coincide con arreglo de todos los clientes, metemos a 3er arreglo
                if(clients[i]._id === selectedClients[j]._id) {
                    defaultClients.push(clients[i])
                }
            }
        }
        return defaultClients
    }

    return (
        <Autocomplete 
            multiple
            limitTags={2}
            options={clients}
            defaultValue={setDefaultValues()}
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
