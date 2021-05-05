import React from 'react'

import {
    FormControl,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@material-ui/core'

import {
    makeStyles,
    withStyles,
} from '@material-ui/core/styles'

const Input = withStyles((theme) => ({
    input: {
        height: 18,
        width: 306,  
        borderRadius: 15,
        backgroundColor: '#f2f2f2',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    label: {
        marginRight: 'auto'
    },
    select: {
        borderRadius: 15
    },
    error: {
        margin: 0,
        padding: 0,
        marginTop: 5,
        marginBottom: 20,
        color: 'red',
      }
}));

function InputSelect({ object, label, value, name, onChange, error }) {
    const classes = useStyles()

    return (
        <FormControl>
            <Typography className={classes.label}>{label}</Typography>
            <Select
                className={classes.select}
                value={value}
                name={name}
                onChange={onChange}
                input={<Input/>}
            >
            {object.map((value)=> (
                <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
            </Select>
            <Typography className={classes.error}>
                    {error}
            </Typography>
        </FormControl>
    )
}

export default InputSelect
