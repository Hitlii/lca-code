import React from 'react'
import { useStyles } from './styles'
import {
    IconButton,
    Typography
} from '@material-ui/core'
import Link from 'next/link'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

function ZoneTag({ href, text }) {
    const classes = useStyles()
    return (
        <Link href={href}>
            <IconButton className={classes.button}>
                <Typography className={classes.text}>
                    {text}
                </Typography>
                <ArrowForwardIosIcon className={classes.icon}/>
            </IconButton>
        </Link>
    )
}

export default ZoneTag
