 import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { gql, useQuery } from '@apollo/client'

const GET_CLIENTS = gql 
`
query getClients  {
  getClients {
    id
    name
    birthday
    gender
    contact {
      email
      phone
    }
    location {
        state
        city
        address
    }
  }
}

`

const useStyles = makeStyles(({
    textField: {
        width: 340,
        height: 40,
        marginBottom: 30
    }
}))

function SearchClient({ value, onChange}) {

    const classes = useStyles()
    const { data, loading, error } = useQuery(GET_CLIENTS)

    if(loading) {
        return (
            <Typography>
                Loading...
            </Typography>
        )
    }


    if(error) {
        console.log(error)
    }

    const clients = data.getClients
    //value = clients[0]

    return (
        <Autocomplete 
            options={clients}
            value={value}
            onChange={onChange}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
                <Typography>
                    {option.name} - {option.contact.email}
                </Typography>
            )}
            renderInput={(params) => (
                <TextField 
                    className={classes.textField}
                    {...params} 
                    label='Elige un cliente'
                    variant='outlined'
                />
            )}
        />
    )
}

export default SearchClient
