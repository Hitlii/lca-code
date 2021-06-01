import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'


import {
    Divider,
    Drawer,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'

import DeleteButton from '../buttons/DeleteButton'

import { drawerStyles, StyledPaper, DeletePaper } from '../../styles/DrawerStyles'
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
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
    button: {
        padding: 0,
        paddingLeft: 20,
    }, 
}))

function ClientCard({ client }) {

    const classes = useStyles()
    const drawerClasses = drawerStyles()

    const router = useRouter()
    const [options, showOptions] = useState(false)
    const [deleteDrawer, setDeleteDrawer] = useState(false)

    function onClick() {
        showOptions(current => !current)
    }

    function onClickDelete() {
        onClick()
        setDeleteDrawer(current => !current)
    }

    function onEditClick() {
        router.push({
            pathname: '/admin1/clientes/edit-cliente',
            query: { ID: client._id }
        })
    }
    
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        update (
        _,
        { data }
        ) {
            console.log(data)
        },
        variables: {
            _id: client._id
        }
    })

    function onDeleteClient() {
        deleteClient()
        onClickDelete()
        onClick()
        router.push('/admin1/clientes')
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
                            {client.name}
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
                            {client.contact.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.body}
                        >
                            {client.contact.email}
                        </Typography>
                    </Grid>
            </Grid>
            <Drawer
                PaperProps={{ component: StyledPaper }}
                anchor='bottom'
                open={options}
                onClose={onClick}
            >
                <IconButton className={drawerClasses.drawerButton} onClick={onEditClick}>
                    <CreateOutlinedIcon className={drawerClasses.createIcon}/>
                    <Typography className={drawerClasses.createText}>
                        Editar cliente
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
            </Drawer>
            <Drawer
                PaperProps={{ component: DeletePaper }}
                anchor='bottom'
                open={deleteDrawer}
                onClose={onClickDelete}
            >
                <Typography className={drawerClasses.confirmText}>
                    ¿Estás seguro?
                </Typography>
                <DeleteButton onClick={onDeleteClient}/>
            </Drawer>
        </>
    )
}

const DELETE_CLIENT = gql`
    mutation deleteClient($_id: ID!) {
        deleteClient( _id: $_id) {
            success
            code
            message
        }
    } 
`

export default ClientCard
