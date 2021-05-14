// Todas las propiedades (propertyAdminCards)
// AllAdminPropertiesPage 

import React from 'react'

import {
  IconButton,
  InputBase, 
  Paper,
} from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles'
import AdminPropertyCard from '../../components/cards/AdminPropertyCard'
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
  propertyCard: {
    display: 'flex',
    justifyContent: 'center',
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

function AllAdminPropertiesPage(){

    const classes = useStyles()

    const properties = [
      {
        zone: 'Urbana',
        code: 'VT001',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg']
      }, 
      {
        zone: 'Comercial',
        code: 'VT002',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607']
      },
      {
        zone: 'Campestre',
        code: 'VT003',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607']
      },
      {
        zone: 'Campestre',
        code: 'VT004',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607']
      },
      {
        zone: 'Campestre',
        code: 'VT005',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607']
      },
      {
        zone: 'Campestre',
        code: 'VT006',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607']
      },
    ]

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

            {properties.map((property) => {
                return (
                  <div 
                    className={classes.propertyCard}
                    key={property.code}
                  >
                    <AdminPropertyCard 
                      property={property}
                    />
                  </div>
                )
            })}

            <IconButton href='/admin1/propiedades/post-propiedad' className={classes.addButton}>
              <AddCircleIcon className={classes.addIcon} />
            </IconButton>
            <NavBar />
        </div>
  )
}

export default AllAdminPropertiesPage