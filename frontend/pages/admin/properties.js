import React, { useState } from 'react'

import {
  IconButton,
  InputBase, 
  Paper,
  Slide,
} from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles'
import NavBar from '../../components/bars/NavBar'

import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles((theme) => ({
    root: {
    margin: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 340,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'black'
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  addButton: {
    position: 'fixed',
    bottom: 60,
    right: 25,
    color: '#4CAF50',
    padding: 0,
  },
  addIcon: {
    width: 60,
    height: 60,
  }
}))

export default function addProperty () {

  const classes = useStyles()

  return (
        <div>
            <Paper className={classes.root} elevation={0}>
                <InputBase
                    className={classes.input}
                    placeholder='Buscar Propiedad'
                    variant='outlined'
                />
                <IconButton type="submit" className={classes.iconButton}>
                    <SearchIcon />
                </IconButton>
            </Paper>

            <IconButton href='/admin/createProperty' className={classes.addButton}>
              <AddCircleIcon className={classes.addIcon} />
            </IconButton>
            <NavBar />
        </div>
  )
}
