import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    height: 40,
    width: 340,
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 15
  }
}))

function GreenButton ({ onClick, text }) {
  const classes = useStyles()

  return (
        <Button
            className={classes.button}
            variant='contained'
            onClick={onClick}
        >
            {text}
        </Button>
  )
}

export default GreenButton
