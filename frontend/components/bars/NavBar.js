import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/auth'

import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import DescriptionIcon from '@material-ui/icons/Description'
import HouseIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    padding: 0,
    margin: 0,
    bottom: 0,
    backgroundColor: '#f2f2f2'
  },
  toolbar: {
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 340,
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]:{
      width: 300
    }
  },
  button: {
    margin: 0,
    padding: 0
  },
  icon: {
    margin: 10,
    width: 31,
    height: 28
  }, 
  drawerContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  drawerButton: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }, 
  divider: {
    backgroundColor: '#f2f2f2'
  }
}))

function NavBar () {
  const classes = useStyles()
  const { logout } = useContext(AuthContext)
  const [options, showOptions] = useState(false)

  const onClickOptions = () => {
    showOptions(current => !current)
  }

  return (
        <>
        <AppBar position='fixed' color='primary' className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton 
                  className={classes.button} 
                  href='/admin1'
                >
                    <HouseIcon className={classes.icon}/>
                </IconButton>
                <IconButton 
                  className={classes.button}
                >
                    <DescriptionIcon className={classes.icon}/>
                </IconButton>
                <IconButton 
                  className={classes.button} 
                  onClick={onClickOptions}
                >
                    <MenuIcon className={classes.icon}/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          anchor='right'
          open={options}
          onClose={onClickOptions}
        >
          <div className={classes.drawerContainer}>
          <IconButton 
            href='admin1/clientes'
          >
            <div className={classes.drawerButton}>
              <PeopleAltOutlinedIcon/> 
              <Typography>
                Clientes
              </Typography>
            </div>
            </IconButton>
            <Divider />
            <IconButton 
              className={classes.logout}
              onClick={logout}
              href='admin1/login'
            >
              <div className={classes.drawerButton}>
                <ExitToAppOutlinedIcon/> 
                <Typography>
                  Logout
                </Typography>
              </div>
            </IconButton>
            </div>
        </Drawer>
        </>
  )
}

export default NavBar
