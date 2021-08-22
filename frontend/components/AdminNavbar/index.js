import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { useStyles } from './styles'

import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import DescriptionIcon from '@material-ui/icons/Description'
import HouseIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'

function AdminNavbar() {

    const classes = useStyles()
    const { logout } = useContext(AuthContext)
    const [options, showOptions] = useState(false)

    const onClickOptions = () => {
      showOptions(current => !current)
    }

    return (
        <div>
            <AppBar position='fixed' style={{top: 'auto',padding: 0,margin: 0,bottom: 0, backgroundColor: '#f2f2f2'}}>
                <Toolbar className={classes.toolbar}>
                    <IconButton 
                    className={classes.button} 
                    href='/admin1'
                    >
                        <HouseIcon className={classes.icon}/>
                    </IconButton>
                    <IconButton 
                    className={classes.button}
                    href='/admin1/page'
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
                    href='/admin1/clientes'
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
                    href='/admin1/login'
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
        </div>
    )
}

export default AdminNavbar