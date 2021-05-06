import React from 'react'
import PropertyForm from '../../components/forms/PropertyForm'

import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

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

function createProperty() {

    const classes = useStyles()

    return (
        <div>
            <AppBar position='static' elevation={0} className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.iconButton} href='/admin/properties'>
                        <ChevronLeftIcon className={classes.icon}/>
                    </IconButton>
                    <Typography className={classes.typo}>
                        Crear Propiedad
                    </Typography>
                </Toolbar>
            </AppBar>
            <PropertyForm />
        </div>
    )
}

export default createProperty
