import React from 'react'
import client from '../lib/apollo-client'
import { GET_FEATURED_PROPERTIES } from '../graphql/queries'

import MenuBar from '../components/bars/MenuBar'
import HorizontalScrollDiv from '../components/HorizontalScrollDiv'

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
  item: {
    marginRight: 5,
  },
}))

const Home = ({ properties }) => {
  
  const classes = useStyles()

  // const { data, loading, error } = useQuery(GET_FEATURED_PROPERTIES)
  // if(loading) return <LoadingCircle />
  // if(error) return `Error! ${error}`

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
        text='Zona Comercial'
      />
      <HorizontalScrollDiv>
        {comercial.map((property => {
          return (
            <div key={property.meta.url} className={classes.item}>
              <PropertyCard 
                property={property}
              />
            </div>
          )
        }))}
      </HorizontalScrollDiv>
      <ZoneButton
        href='#'
        text='Zona Campestre'
      />
      <HorizontalScrollDiv>
        {country.map((property => {
          return (
            <div key={property.meta.url} className={classes.item}>
              <PropertyCard 
                property={property}
              />
            </div>
          )
        }))}
      </HorizontalScrollDiv>
      <ZoneButton
        href='#'
        text='Zona Urbana'
      />
      <HorizontalScrollDiv>
        {residential.map((property => {
          return (
            <div key={property.meta.url} className={classes.item}>
              <PropertyCard 
                property={property}
              />
            </div>
          )
        }))}
      </HorizontalScrollDiv>
    </div>

  )
}

export async function getStaticProps() {
  const { data } = await client.query({ query: GET_FEATURED_PROPERTIES });

  return {
    props: {
      properties: data.getFeaturedProperties
    },
 };
}

export default Home