import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 auto',
    display: 'block',
    width: 340,
    height: 40,
    color: 'white',
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
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
        >
            {props.children}
        </Button>
  )
}

export default GreenButton
