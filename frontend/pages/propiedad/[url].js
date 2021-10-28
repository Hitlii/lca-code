import { useState } from 'react'
import { GET_PROPERTY, GET_ALL_PROPERTIES } from '../../graphql/queries'
import client from '../../lib/apollo-client'

import Image from 'next/image'
import Link from 'next/link' 
import Head from 'next/head'

import MarkdownView from 'react-showdown'
import Carousel from 'react-material-ui-carousel'
import GreenLgButton from '../../components/GreenLgButton'
import HorizontalScroll from '../../components/HorizontalScroll'
import Map from '../../components/map'
import PropertyCard from '../../components/PropertyCard'
import ZoneTag from '../../components/ZoneTag'
import Pixel from '../../components/Pixel'

import {
    Grid,
    IconButton,
    Typography
} from '@material-ui/core'
import { Button } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DescriptionIcon from '@material-ui/icons/Description'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import YouTubeIcon from '@material-ui/icons/YouTube'

import { IoLogoGoogleplus } from 'react-icons/io'
import { IoLogoTiktok } from 'react-icons/io5'

import { lightNeutral } from '../../colors'

import { makeStyles } from "@material-ui/core/styles"

// Google Analytics
import * as ga from '../../lib/google-analytics'
import { StylesContext } from '@material-ui/styles'


const useStyles = makeStyles(({
    root: {
        maxWidth: 800,
        minWidth: 320,
        margin: 'auto',
    },
    button:{
        marginTop:15,
        borderRadius:15,
        backgroundColor:"#2196F3",
        color:"white"

    },
    button360:{
        marginTop:15,
        marginBottom:15,
        borderRadius:15,
        backgroundColor:"#f6dc69",
        color:"353537",
        
    },
    img: {
        marginTop:70,
        width: '100%',
        borderRadius: '5px 5px 5px 5px',
        zIndex: 1
    },
    backButton: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
        padding: 0,
        width:40,
        height:40,
        backgroundColor: '#f2f2f2',
        color: '#4A4C4B',
        zIndex: 2
    },
    backIcon: {
        fontSize: 28,
        zIndex: 2
    },
    type: {
        marginLeft: 10,
        marginTop: 18,
        fontSize: 18,
        fontWeight: 700,
        color: '#568235'
    }, 
    location: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 600,
        color: '#4A4C4B'
    },
    iconDiv: {
        display: 'flex',
        marginTop: 20,
        marginLeft: 10
    },
    icon: {
        fontSize: 25,
        backgroundColor: lightNeutral,
        color: 'white',
        borderRadius: '50%',
        padding: 5
    },
    iconText: {
        fontSize: 18,
        fontWeight: 700,
        color: lightNeutral,
        padding: 4
    },
    socialMediaContainer: {
        marginBottom: 20
    },
    socialMediaGridItem: {
        textAlign: 'center'
    },
    socialMediaText: {
        fontSize: 18,
        fontWeight: 400,
        color: lightNeutral,
        marginTop: 10,
        marginBottom: 10
    }, 
    socialMediaButton: {
        padding: 0
    },
    socialMediaIcon: {
        fontSize: 34,
        color: lightNeutral
    },
    wrapperItem: {
        marginRight: 5
    }, 
    iframeContainer: {
        position: "relative",
        overflow: "hidden",
        width: "100%",
        paddingTop: "56.25%"
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
        borderRadius:15,
    }, 
    map: {
        marginTop: 20,
        marginBottom:  20,

    },
    description: {
        margin: 10
    },
    a: {
        textDecoration: 'none'
    },
  
}))


export default function SinglePropertyPage({ property, relatedProperties }){
    const classes = useStyles()
    const [map, setMap] = useState(false)

    function onClickMap() { 
        setMap(current => !current)
    }

    const contact = ()=>{
        ga.event({
            action: "contact",
            params : {
              path: `www.lcabienesraices.com/${property.meta.url}`
            }
          })
    }
    const googleMapsDirections = ()=>{
        ga.event({
            action: "googleMapsDirections",
            params : {
              path: `www.lcabienesraices.com/${property.meta.url}`
            }
          })
    }
    const virtualTour = ()=>{
        ga.event({
            action: "virtualTourView",
            params : {
              path: `www.lcabienesraices.com/${property.meta.url}`
            }
          })
    }
     
    return(
        <>
        <Head>
            <title>{property.title}</title>
            <meta name="robots"  content="index,follow"/>
            <meta name="description" content={property.meta.description}/>
            {/* Twitter */}
            <meta name="twitter:card" content="producto"/>
            <meta name="twitter:site" content="www.lcabienesraices.com"/>
            <meta name="twitter:title" content={property.title}/>
            <meta name="twitter:description" content={property.meta.description}/> 
            <meta name="twitter:creator" content="@lcabienesraices"/>
            <meta name="twitter:image" content={property.media.images[0]}/>
            <meta name="twitter:data1" content={property.price}/> 
            <meta name="twitter:label1" content="Price"/>

            {/* <!-- Open Graph data --> */}
            <meta property="og:title" content={property.title} /> 
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://lcabienesraices.com/${property.meta.url}`} />
            <meta property="og:image" content={property.media.images[0]} />
            <meta property="og:description" content={property.meta.description} />
            <meta property="og:site_name" content="www.lcabienesraices.com" />
            <meta property="og:price:amount" content={property.price} />
            <meta property="og:price:currency" content="USD" />
            <link rel="canonical" href={`https://lcabienesraices/propiedad/${property.meta.url}`} />
        </Head>
        <Pixel name='FACEBOOK_PIXEL_1'/>
        <div className={classes.root}>
            <Link href='/propiedades'>
                <IconButton className={classes.backButton}>
                    <ChevronLeftIcon className={classes.backIcon}/>
                </IconButton>
            </Link>

            <Carousel
                autoplay={false}
                animation='slide'
                indicators={true}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
            >
            {/* Property Images */}
            {property.media.images.map((image,i)=>{
                    return(
                        <div key={i} className={classes.img}>
                            <Image 
                                className={classes.img}
                                src={image} 
                                layout='responsive'
                                alt={property.title+i}
                                width={1200}
                                height={1200}
                            />
                        </div>
                    )
            })}    
            </Carousel>   
            

            {/* Type of property */}
            <header>
                <h3 id="titulo">
                    {property.title}
                </h3>
                {/* Location */}
                <Typography variant="body2" className={classes.location} gutterBottom>
                    {property.location.address}, {property.location.city}, {property.location.state} | {property.location.postalCode}
                </Typography>
            </header>
            {/* Description */}
            <div className={classes.iconDiv}>
                <DescriptionIcon className={classes.icon}/>
                <Typography className={classes.iconText} id="descripcion">Descripción</Typography>
            </div>
            <main className={classes.description}>
                <MarkdownView
                    markdown={property.description.text}
                    options={{ 
                        emoji: true, 
                        requireSpaceBeforeHeadingText: true, 
                        openLinksInNewWindow: true, 
                        simplifiedAutoLink:true}}
                />
            </main>

            {/* Video */}
            {property.media.video !== ""&&<>
            <div className={classes.iconDiv}>
                <PlayArrowIcon className={classes.icon}/>
                <Typography gutterBottom className={classes.iconText} id="video">Video</Typography>
            </div>
            <div className={classes.iframeContainer}>
                <iframe 
                    className={classes.video} 
                    src={`https://youtube.com/embed/${property.media.video}?showinfo=0`}
                    frameBorder='0'
                    allowFullScreen
                />
            </div></>}
            {/* Google Maps */}
            <div className={classes.iconDiv}>
                <LocationOnIcon className={classes.icon}/>
                <Typography className={classes.iconText} id="ubicacion">Ubicación</Typography>
            </div>
            <div role="application" className={classes.map}>
                {map ? 
                    <Map
                        marker={property.location.coordinates}
                        zoom={15}
                        forClients={true}
                    />
                    :
                    <> 
                        <Typography style={{marginLeft: 10}} className={classes.socialMediaText}>
                            Da clic en el mapa para activarlo!
                        </Typography>
                        <IconButton 
                            className={classes.socialMediaButton}
                            onClick={onClickMap}
                        >
                            <img
                                width="100%"
                                src='/dontChargeMeGoogleMaps.png'
                                alt="Da click para activar el mapa"
                                title="Click para activar el mapa"
                            />
                        </IconButton>
                    </>
                }
            </div>
        
            {/* Contact Button */}
            <Link href={property.media.image360} passHref onClick={()=> virtualTour()}>
                <a target='_blank' id="recorrido-360">
                    <Button fullWidth variant="contained" className={classes.button360}>
                        Ver Recorrido 360
                    </Button>
                </a>
            </Link>
            <Link href= {`https://api.whatsapp.com/send?phone=526653926857&text=Hola,%20me%20interesa%20esta%20propiedad%20https://lcabienesraices.com/propiedad/${property.meta.url}`} onClick={()=> contact()} passHref>
                <a target='_blank'>
                    <GreenLgButton>Contactar</GreenLgButton>
                </a>
            </Link>
            <Link href={property.bitly.map} passHref onClick={()=> googleMapsDirections()}>
                <a target='_blank' id="como-llegar">
                    <Button fullWidth variant="contained" className={classes.button}>
                        Cómo llegar
                    </Button>
                </a>
            </Link>
            {/* Social Media Icons */}
            <Grid container className={classes.socialMediaContainer}>
                <Grid item xs={12} className={classes.socialMediaGridItem}>
                    <Typography className={classes.socialMediaText}>
                        ¡Síguenos en nuestras redes sociales!
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://bit.ly/facebook-LCABienesRaices'>
                        <FacebookIcon className={classes.socialMediaIcon} />
                    </a>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://bit.ly/TitkTok-LCABienesRaices'>
                        <IoLogoTiktok className={classes.socialMediaIcon} />
                    </a>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://bit.ly/YouTube-LCABienesRaices'>
                        <YouTubeIcon className={classes.socialMediaIcon}/>
                    </a>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://bit.ly/Maps-LCABienesRaices'>
                        <IoLogoGoogleplus className={classes.socialMediaIcon} />
                    </a>
                </Grid>
                <Grid item xs={3} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://bit.ly/Instagram-LCABienesRaices'>
                        <InstagramIcon className={classes.socialMediaIcon}/>
                    </a>
                </Grid>
            </Grid> 
            {/* Related Properties */}
            {relatedProperties.length > 0 
                && 
            <ZoneTag
                href='#'
                text='Relacionados'
            />}
            <nav>
                <HorizontalScroll>
                {relatedProperties&&relatedProperties.map((property => {
                    return (
                        <div key={property._id} className={classes.wrapperItem}>
                            <PropertyCard 
                                property={property}
                            />
                        </div>
                    )
                }))}
                </HorizontalScroll>
            </nav>
        </div>
    </>
    )
}

export async function getStaticPaths() {
    const { data } = await client.query({ 
        query: GET_ALL_PROPERTIES, 
        variables: {isAdminCard: false}
    })
    
    const properties = data.getAllProperties

    const paths = properties.map(property => ({
        params: { url: property.meta.url }
    }))

    return { 
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: GET_PROPERTY,
        variables: { url: params.url }
    })

    if (!data)
    return {
      props: {
        error: "Error",
      },
    };  

    return {
        props: {
            property: data.getProperty.property,
            relatedProperties: data.getProperty.relatedProperties
        }
    }
}