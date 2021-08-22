import React from 'react'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'

export default function GreenLgButton (props) {
  const classes = useStyles()
  return (
        <Button
            type={props.type}
            className={classes.button}
            variant='contained'
            onClick={props.onClick}
            fullWidth
            {...props}

        >
            {props.children}
        </Button>
  )
}

