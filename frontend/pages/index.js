import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_FEATURED_PROPERTIES } from '../graphql/queries'

import MenuBar from '../components/bars/MenuBar'

import { makeStyles } from '@material-ui/core/styles'

import PropertyCard from '../components/cards/PropertyCard'
import ZoneButton from '../components/buttons/ZoneButton'

const useStyles = makeStyles(({
  root: {
    maxWidth: 600,
    minWidth: 320,
    margin: 'auto',
  },
  img: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    width: '100%',
    maxWidth: 766,
    maxHeight: 300,
    borderRadius: '0px 0px 15px 15px',
  }, 
  wrapper: {
    maxHeight: 400,
    display: 'flex',
    overflowX: 'auto',
    marginLeft: 10,

  }, 
  item: {
    marginRight: 5,
  }
}))

const Home = () => {
  
  const classes = useStyles()
  const { data, loading, error } = useQuery(GET_FEATURED_PROPERTIES)
  if(loading) return null
  if(error) return `Error! ${error}`

  const properties = data.getFeaturedProperties
  console.log(properties)

  let country = []
  let residential=[]
  let comercial =[]

  properties.forEach( p => {
    if(p.zone === "Campestre") country.push(p)
    if(p.zone === "Urbana") residential.push(p)
    if(p.zone === "Comercial") comercial.push(p)
  })

  return (
    <div className={classes.root}>
      <MenuBar />
      <img
        className={classes.img}
        src='/cover.jpg'
      />
      <ZoneButton
        href='#'
        text='Zona Urbana'
      />
      <div className={classes.wrapper}>
        {residential.map((property => {
          return (
            <div key={property._id} className={classes.item}>
              <PropertyCard 
                key={property._id}
                property={property}
              />
            </div>
          )
        }))}
      </div>
      <ZoneButton
        href='#'
        text='Zona Campestre'
      />
      <div className={classes.wrapper}>
        {country.map((property => {
          return (
            <div key={property._id} className={classes.item}>
              <PropertyCard 
                key={property._id}
                property={property}
              />
            </div>
          )
        }))}
      </div>
      <ZoneButton
        href='#'
        text='Zona Comercial'
      />
      <div className={classes.wrapper}>
        {comercial.map((property => {
          return (
            <div 
              key={property._id} 
              className={classes.item}
            >
              <PropertyCard 
                property={property}
              />
            </div>
          )
        }))}
      </div>
    </div>
  )
}

export default Home