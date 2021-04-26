import React from 'react'

import {
    FormControl,
    InputBase,
    MenuItem,
    Select,
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
    margin: {
      marginBottom: 20
    },
    select: {
        borderRadius: 15
    }
}));

function InputSelect({ object, placeholder, value, name, onChange }) {
    const classes = useStyles()

    return (
        <FormControl className={classes.margin}>
        <Select
            className={classes.select}
            value={value}
            name={name}
            onChange={onChange}
            input={<Input placeholder={placeholder}/>}
        >
        {object.map((value)=> (
            <MenuItem key={value} value={value}>{value}</MenuItem>
        ))}
        </Select>
      </FormControl>
    )
}

export default InputSelect
