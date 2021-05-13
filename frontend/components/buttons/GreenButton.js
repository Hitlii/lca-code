import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    color: 'white',
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginTop: '1em',
    marginBottom: '1em',
    '&:hover': {
      backgroundColor: "#6ec071",
    }, 
  }
}))

function GreenButton (props) {
  const classes = useStyles()

  return (
        <Button
            type={props.type}
            className={classes.button}
            variant='contained'
            onClick={props.onClick}
            fullWidth={props.fullWidth}
            {...props}

        >
            {props.children}
        </Button>
  )
}

export default GreenButton
