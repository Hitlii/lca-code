import React from 'react'

import { 
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import clsx from 'clsx'

const useStyles = makeStyles(({
    root: {
        marginLeft: 20,
        marginBottom: 20,
    },
    label: {
        color: 'black'
    },
    radio: {
        '&:hover': {
            backgroundColor: 'transparent',
          },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#4CAF50',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#4CAF50',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#106ba3',
        },
    },
    error: {
        color: 'red',
    }

}))

function MultipleChoice({ label, object, value, name, onChange, error }) {

    const classes = useStyles()

    function StyledRadio(props) {
        return (
            <Radio
                className={classes.radio}
                disableRipple
                color='default'
                checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                icon={<span className={classes.icon} />}
                {...props}
            />
        )
    }

    return (
        <>

            <FormControl component='fieldset' className={classes.root}>
                {error ? 
                    <FormLabel className={classes.error} focused={false} component='legend'>{label}</FormLabel>
                       :
                    <FormLabel className={classes.label} focused={false} component='legend'>{label}</FormLabel>
                }
                <RadioGroup value={value} name={name} onChange={onChange}>
                    {object.map(value => (
                        <FormControlLabel key={value} label={value} value={value} control={<StyledRadio />}/>
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default MultipleChoice
