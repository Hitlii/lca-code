import React from 'react'

import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Link from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    button: {
        display: 'flex',
        justifyContent: 'space-around',
        width: 227,
        height: 40,
        padding: 0,
        marginBottom: 12,
        backgroundColor: '#F2F2F2',
        borderRadius: '0px 15px 15px 0px',
    }, 
    text: {
        color: "4A4C4B",
        fontWeight: 700,
    }, 
    icon: {
        width: 20,
        height: 20,
        color: "4a4c4b",
    }
}))

function ZoneButton({ href, text }) {
    const classes = useStyles()
    return (
        <Link href={href}>
            <IconButton className={classes.button}>
                <Typography className={classes.text}>
                    {text}
                </Typography>
                <ArrowForwardIcon className={classes.icon}/>
            </IconButton>
        </Link>
    )
}

export default ZoneButton
