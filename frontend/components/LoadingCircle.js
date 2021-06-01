import React from 'react'
import { green } from '../public/colors'

import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    root: {
        display: "block",
        margin: "auto",
        marginTop: 200,
        color: green,
    },
}))

function LoadingCircle() {
    const classes = useStyles()
    return (
        <CircularProgress className={classes.root} size={60} />
    )
}

export default LoadingCircle
