import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
import NavBar from '../components/NavBar'
import Paper from '@material-ui/core/Paper'
import TextEditor from '../components/Slate/TextEditor'

import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 340,
        height: 40,
        backgroundColor: '#f2f2f2'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: 'black'
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
  }));

export default function addProperty() {

    const classes = useStyles()

    return (
        <div>
            <Paper className={classes.root}>
                <InputBase 
                    className={classes.input}
                    placeholder='Buscar Propiedad'
                    variant='outlined'
                />
                <IconButton type="submit" className={classes.iconButton}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            <TextEditor />
            <NavBar />
        </div>
    )
}

