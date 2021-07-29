import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    root: {
        maxHeight: 400,
        display: 'flex',
        overflowX: 'auto',
        marginLeft: 10,
    }
}))

function HorizontalScrollDiv(props) {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            {props.children}
        </div>
    )
}

export default HorizontalScrollDiv
