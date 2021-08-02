import React from 'react'
import client from '../lib/apollo-client'
import { GET_FEATURED_PROPERTIES } from '../graphql/queries'

import HorizontalScroll from '../components/HorizontalScroll'
import PropertyCard from '../components/PropertyCard'
import Navbar from '../components/Navbar'
import ZoneTag from '../components/ZoneTag'

import Image from 'next/image'


import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(({
  root: {
    maxWidth: 600,
    minWidth: 320,
    margin: 'auto',
  },
  cover: {
    borderRadius: '0px 0px 15px 15px'
  },
  item: {
    marginRight: 5,
  },
}))

const Home = ({ properties }) => {
  
  const classes = useStyles()

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
      <Navbar />
      <Image
        className={classes.cover}
        src='/tecate.jpg'
        width={600}
        height={400}
        layout='responsive'
      />

      <ZoneTag href='/' text='Zona Campestre'/>

      <HorizontalScroll>
        {country.map((property)=>{
          return(
            <div key={property.meta.url} className={classes.item}>
              <PropertyCard 
                property={property}
              />
            </div>
          )
        })}
      </HorizontalScroll>
      
      <ZoneTag href='/' text='Zona Comercial'/>

      <HorizontalScroll>
        {comercial.map((property)=>{
          return(
            <div key={property.meta.url} className={classes.item}>
              <PropertyCard 
                property={property}
              />
            </div>
          )
        })}
      </HorizontalScroll>

      <ZoneTag href='/' text='Zona Urbana'/>

      <HorizontalScroll>
        {residential.map((property)=>{
          return(
            <div key={property.meta.url} className={classes.item}>
              <PropertyCard 
                property={property}
              />
            </div>
          )
        })}
      </HorizontalScroll>
    
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