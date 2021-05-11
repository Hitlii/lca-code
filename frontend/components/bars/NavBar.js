import React from 'react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'

import DescriptionIcon from '@material-ui/icons/Description'
import HouseIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: '#f2f2f2'

  },
  toolbar: {
    justifyContent: 'space-between'
  },
  button: {
    margin: 0,
    padding: 0
  },
  icon: {
    margin: 10,
    width: 31,
    height: 28
  }
}))

function NavBar () {
  const classes = useStyles()

  const router = useRouter()

  const onClickProperties = () => {
    router.push('/admin1')
  }

  return (
        <AppBar position='fixed' color='primary' className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton className={classes.button} onClick={onClickProperties}>
                    <HouseIcon className={classes.icon}/>
                </IconButton>
                <IconButton className={classes.button}>
                    <DescriptionIcon className={classes.icon}/>
                </IconButton>
                <IconButton className={classes.button}>
                    <MenuIcon className={classes.icon}/>
                </IconButton>
            </Toolbar>
        </AppBar>
  )
}

export default NavBar
