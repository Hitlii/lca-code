import React from 'react'

import {
    InputBase,
    Typography,
} from '@material-ui/core'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    root: {
        width: 340,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F2F2F2',
        paddingLeft: 20,
    },
    error: {
        margin: 0,
        padding: 0,
        marginTop: 5,
        marginBottom: 20,
        color: 'red',
      }
}))

function InputText({ type, placeholder, multiline,  value, name, onChange, error }) {

    const classes = useStyles()

    return (
        <>
            <TextField
                className={classes.root}
                type={type}
                multiline={multiline ? true : false}
                rows='10'
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
            />
            <Typography className={classes.error}>
                {error}
            </Typography>
        </>
    )
}

export default InputText
