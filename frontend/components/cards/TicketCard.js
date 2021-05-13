import React, { useState } from 'react'

import {
    Divider,
    Drawer,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'

import { drawerStyles, StyledPaper } from '../../styles/DrawerStyles'

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

function TicketCard({ ticket }) {
    const classes = useStyles()
    const drawerClasses = drawerStyles()
    const [options, showOptions] = useState(false)
    function onClick() {
        showOptions(current => !current)
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
                        {ticket.area}m² - {ticket.price}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        className={classes.body}
                    >
                        {ticket.emissionDate}
                    </Typography>
                </Grid>
            </Grid>
            <Drawer
                PaperProps={{ component: StyledPaper }}
                anchor='bottom'
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
                <IconButton className={drawerClasses.drawerButton}>
                    <CreateOutlinedIcon className={drawerClasses.createIcon}/>
                    <Typography className={drawerClasses.createText}>
                        Editar ticket
                    </Typography>
                </IconButton>
                <Divider className={drawerClasses.divider}/>
                <IconButton 
                    className={drawerClasses.drawerButton}
                >
                    <DeleteOutlineIcon className={drawerClasses.deleteIcon}/>                    
                    <Typography className={drawerClasses.deleteText}>
                        Eliminar
                    </Typography>
                </IconButton>
            </Drawer>
        </>
    )
}

export default TicketCard
