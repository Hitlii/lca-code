import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import CardDrawer from '../CardDrawer'
import DeleteDrawer from '../DeleteDrawer'

import {
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core'

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

import { useStyles } from './styles'

export default function ClientCard({ client }) {

    const classes = useStyles()
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
            pathname: `/admin1/clientes/edit-cliente/${client._id}`
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
        <div>
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
            <CardDrawer
                open={options}
                onClose={onClick}
            >
                <IconButton className={classes.drawerButton} onClick={onEditClick}>
                    <CreateOutlinedIcon className={classes.createIcon}/>
                    <Typography className={classes.createText}>
                        Editar cliente
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
                onDelete={onDeleteClient}
            />
        </div>
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
