import React from 'react'

import {
    InputBase
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    root: {
        width: 340,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#F2F2F2',
        paddingLeft: 20,
        marginBottom: 20,
    }
}))

function InputText({ type, placeholder, value, name, onChange }) {

    const classes = useStyles()

    return (
        <InputBase 
            className={classes.root}
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
        />
    )
}

export default InputText
