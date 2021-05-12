import React from 'react'

import {
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
    container: {
        width: 340,
        marginBottom: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 0
    },
    body: {
        fontSize: 14,
        color: '#4A4C4B'
    },
    icon: {

    },
    button: {
        padding: 0,
        paddingLeft: 20,
    }
}))

function BuyerCard({ client, property, ticket }) {
    const classes = useStyles()

    return (
        <Grid container
            className={classes.container}
        >
            <Grid item xs={10}>
                <Typography
                    className={classes.header}
                >
                    {client.name}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <IconButton
                    className={classes.button}
                >
                    <MoreHorizIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    className={classes.body}
                >
                    {property.area}m^2 - {property.price}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    className={classes.body}
                >
                    Hace {ticket.emissionDate} día(s)
                </Typography>
            </Grid>
        </Grid>
    )
}

export default BuyerCard
