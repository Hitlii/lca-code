import React, { useState , useRef } from 'react'

import {GET_ADMIN_PROPERTIES } from "../../graphql/queries";
import client from '../../lib/apollo-client'

import {
  IconButton,
  InputBase, 
  Paper,
} from '@material-ui/core'


import { makeStyles } from '@material-ui/core/styles'

import AdminNavbar from '../../components/AdminNavbar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import OrderFilterPropertiesForm from '../../components/OrderFilterPropertiesForm';



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
    bottom: 100,
    right: 25,
    color: '#4CAF50',
    padding: 0,
  },
  addIcon: {
    width: 60,
    height: 60,
  },
  
  iconButton: {
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  result: {
    margin: 10,
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    textAlign: "center",
  },

  search: {
    border:'none',
    backgroundColor:"#f2f2f2",
    borderRadius: 30,
  },
  icons: {
    backgroundColor: "#f2f2f2",
    margin: "auto",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  containerIcons: {
    display: "flex",
    justifyContent: "center",
  },
  sadIcon: {
    height: 200,
  },
  errorMessage: {
    display: "flex",
    color: "red",
    justifyContent: "center",
  },
  cards: {
    margin:'auto'
  }
}))

function AllAdminPropertiesPage(props){

  const classes = useStyles();




  return (
      <div>
        <OrderFilterPropertiesForm propertiesData={props.propertiesData} isAdmin={true}/>

        <IconButton href='/admin1/propiedades/post-propiedad' className={classes.addButton}>
          <AddCircleIcon className={classes.addIcon} />
        </IconButton>
        <AdminNavbar />
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
      propertiesData: data.getAdminProperties
    }
  }
}

export default AllAdminPropertiesPage