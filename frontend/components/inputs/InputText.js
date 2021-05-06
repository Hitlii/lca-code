import React from 'react'

import {
    InputBase,
    Typography,
} from '@material-ui/core'

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

function InputText({className,type, placeholder, value, name, onChange, error }) {

    const classes = useStyles()

    return (
        <>
            <InputBase 
                className={className? className:classes.root}
                type={type}
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
