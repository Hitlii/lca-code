import React from 'react'
import TicketForm from '../../components/forms/TicketForm'

import { makeStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles({
    appbar: {
        padding: 0,
        marginBottom: 20,
    },
    toolbar: {
        padding: 0,
        margin: 0,
        backgroundColor: 'white'
    },
    iconButton: {
        margin: 10,
        padding: 0,
        width:40,
        height:40,
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width: 20,
        height: 20
    },
    typo: {
        color: 'black'
    }
})

const createTicket = () => {
    const classes = useStyles()
    return (
        <div>
            <AppBar position='static' elevation={0}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.iconButton} href='/admin/properties'>
                        <ChevronLeftIcon className={classes.icon}/>
                    </IconButton>
                    <Typography className={classes.typo}>
                        Crear Ticket
                    </Typography>
                </Toolbar>
            </AppBar>
            <TicketForm/>
        </div>
    )
}

export default createTicket
