import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import {
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'

import CardDrawer from '../drawers/CardDrawer'
import DeleteDrawer from '../drawers/DeleteDrawer'

import { drawerStyles } from '../../styles/DrawerStyles'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
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

function TicketCard({ ticket, propertyId }) {
    const classes = useStyles()
    const drawerClasses = drawerStyles()
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
        <>
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
                <IconButton className={drawerClasses.drawerButton}>
                    <MonetizationOnOutlinedIcon className={drawerClasses.createIcon}/>
                    <Typography className={drawerClasses.createText}>
                        Descargar PDF
                    </Typography>
                </IconButton>
                <Divider className={drawerClasses.divider}/>
                <IconButton className={drawerClasses.drawerButton} onClick={onEditTicket}>
                    <CreateOutlinedIcon className={drawerClasses.createIcon}/>
                    <Typography className={drawerClasses.createText}>
                        Editar ticket
                    </Typography>
                </IconButton>
                <Divider className={drawerClasses.divider}/>
                <IconButton 
                    className={drawerClasses.drawerButton}
                    onClick={onClickDelete}
                >
                    <DeleteOutlineIcon className={drawerClasses.deleteIcon}/>                    
                    <Typography className={drawerClasses.deleteText}>
                        Eliminar
                    </Typography>
                </IconButton>
            </CardDrawer>
            <DeleteDrawer
                open={deleteDrawer}
                onClose={onClickDelete}
                onDelete={onDeleteTicket}
            />
        </>
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

export default TicketCard
