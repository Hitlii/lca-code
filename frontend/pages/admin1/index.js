import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ADMIN_PROPERTIES } from '../../graphql/queries'
import client from '../../lib/apollo-client'

import {
  IconButton,
  InputBase, 
  Paper,
} from '@material-ui/core'

import LoadingCircle from '../../components/LoadingCircle'

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

function AllAdminPropertiesPage({ properties }){

  const classes = useStyles()
  console.log(properties)

  // const { loading, data, error } = useQuery(GET_ADMIN_PROPERTIES, {
  //   variables: { pagination:{pageNumber: 1}}
  // })

  // if(loading) return <LoadingCircle />

  // if(error) {
  //   return `Error! ${error}`
  // }

  //const properties = data.getAdminProperties

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
          return(
            <div
              key={property._id}
              className={classes.propertyCard}
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

// Codigo a utilizar cuando se arregle el problema de autorizacion
export async function getStaticProps(){
  const { data } = await client.query({
    query: GET_ADMIN_PROPERTIES,
    variables: {
      pagination: {
        pageNumber: 1
      }
    }
  })

  if (!data)
    return {
      props: {
        error: "Error",
      },
    }

  return {
    props: {
      properties: data.getAdminProperties
    }
  }
}

export default AllAdminPropertiesPage