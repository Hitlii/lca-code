import React from 'react'
import client from '../lib/apollo-client'
import { GET_FEATURED_PROPERTIES } from '../graphql/queries'
import Pixel from '../components/Pixel'
import HorizontalScroll from '../components/HorizontalScroll'
import PropertyCard from '../components/PropertyCard'
import Navbar from '../components/Navbar'
import ZoneTag from '../components/ZoneTag'

import Image from 'next/image'
import Head from 'next/head'

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
    <Head>
        <title>LCA Bienes Raices | Juntos por tu patrimonio</title>
        <meta name="description" content="Somos una inmobiliaria y vendemos propiedades, grandes, chicas, medianas, baratas, con vista o planos, nuestro fuerte son los terrenos en zona campestre, nos aseguramos que nuestras propiedades esten al margen de la ley y que tu estes lo mas informado posible."/>
        <meta name="robots"  content="index,follow"/>
        <meta http-equiv="refresh" content="200"/>
    </Head>
    <Pixel name='FACEBOOK_PIXEL_1'/>
      <Navbar />
      <Image
        className={classes.cover}
        src='/main.png'
        alt="Encuentra tu propiedad en zona campestre, urbana o comercial"
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