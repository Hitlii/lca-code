import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import {
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'

import CardDrawer from '../CardDrawer'
import DeleteDrawer from '../DeleteDrawer'

import { useStyles } from './styles'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export default function TicketCard({ ticket, propertyId }) {

    const classes = useStyles()
    const router = useRouter()
    const [options, showOptions] = useState(false)
    const [deleteDrawer, setDeleteDrawer] = useState(false)

    const [deleteTicket] = useMutation(DELETE_TICKET, {
        update (
        _,
        { data }
        ) {
            console.log(data)
            document.location.reload()
        },
        variables: {
            _id: ticket._id,
            propertyId: propertyId
        }
    })

    function onEditTicket() {
        router.push({
            pathname: '/admin1/ticket/edit-pagare',
            query: { ID: ticket._id }
        })
    }

    function onClick() {
        showOptions(current => !current)
    }

    function onClickDelete() {
        onClick()
        setDeleteDrawer(current => !current)
    }

    function onDeleteTicket() {
        deleteTicket()
        onClickDelete()
        onClick()
    }

    function daysAgo(emissionDate) {
        const oneDay = 1000*60*60*24
        const today = new Date()
        const ticketDate = new Date(emissionDate)
        const days = today.getTime() - ticketDate.getTime()
        return Math.round(days/oneDay)
    }

    return (
        <div>
            <Grid container
                className={classes.container}
            >
                <Grid item xs={10}>
                    <Typography
                        className={classes.header}
                    >
                        {ticket.clients[0].name}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        className={classes.button}
                        onClick={onClick}
                    >
                        <MoreHorizIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        className={classes.body}
                    >
                        {ticket.area}m² - ${ticket.price}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        className={classes.body}
                    >
                        Hace {daysAgo(ticket.emissionDate)} día(s)
                    </Typography>
                </Grid>
            </Grid>
            <CardDrawer
                open={options}
                onClose={onClick}
            >
                <IconButton className={classes.drawerButton}>
                    <MonetizationOnOutlinedIcon className={classes.createIcon}/>
                    <Typography className={classes.createText}>
                        Descargar PDF
                    </Typography>
                </IconButton>
                <Divider className={classes.divider}/>
                <IconButton className={classes.drawerButton} onClick={onEditTicket}>
                    <CreateOutlinedIcon className={classes.createIcon}/>
                    <Typography className={classes.createText}>
                        Editar ticket
                    </Typography>
                </IconButton>
                <Divider className={classes.divider}/>
                <IconButton 
                    className={classes.drawerButton}
                    onClick={onClickDelete}
                >
                    <DeleteOutlineIcon className={classes.deleteIcon}/>                    
                    <Typography className={classes.deleteText}>
                        Eliminar
                    </Typography>
                </IconButton>
            </CardDrawer>
            <DeleteDrawer
                open={deleteDrawer}
                onClose={onClickDelete}
                onDelete={onDeleteTicket}
            />
        </div>
    )
}

const DELETE_TICKET = gql`
    mutation deleteTicket(
        $_id: ID! 
        $propertyId: ID!
    ) {
        deleteTicket(
            _id: $_id 
            propertyId: $propertyId
        ) {
            success
            code
            message
        }
    }
`
