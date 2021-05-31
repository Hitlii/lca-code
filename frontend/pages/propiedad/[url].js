import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_PROPERTY } from '../../graphql/queries'

import Image from 'next/image'

import GreenButton from '../../components/buttons/GreenButton'
import Map from '../../components/map'
import PropertyCard from '../../components/cards/PropertyCard'
import ZoneButton from '../../components/buttons/ZoneButton'

import {
    CircularProgress,
    Grid,
    IconButton,
    Paper,
    Typography
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import DescriptionIcon from '@material-ui/icons/Description'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import YouTubeIcon from '@material-ui/icons/YouTube'

import { IoLogoGoogleplus } from 'react-icons/io'
import { IoLogoTiktok } from 'react-icons/io5'



import { green, lightNeutral } from '../../public/colors'

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(({
    root: {
        maxWidth: 600,
        minWidth: 320,
        margin: 'auto',
    },
    img: {
        width: '100%',
        borderRadius: '0px 0px 15px 15px',
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
    progress: {
        display: "block",
        margin: "auto",
        marginTop: 200,
        color: green,
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
        borderRadius: 15,
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
    wrapper: {
        maxHeight: 400,
        display: 'flex',
        overflowX: 'auto',
        marginLeft: 10,
        marginTop: 20
    },
    wrapperItem: {
        marginRight: 5
    }, 
    video: {
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 10
    }, 
    map: {
        marginTop: 20,
        marginBottom:  20
    }
}))

export default function SinglePropertyPage(){
    const classes = useStyles()
    const router = useRouter()
    const [map, setMap] = useState(false)
    const url = router.query.url

    console.log(url)
    
    const { data, loading, error } = useQuery(GET_PROPERTY, { 
        variables: { url: url }
    })

    if(loading) return(<CircularProgress className={classes.progress} size={60} />)
    if(error) return `Error! ${error.message}`

    const property = data.getProperty.property
    const relatedProperties = data.getProperty.relatedProperties

    function goBack() {
        router.back()
    }
    function onClickMap() { 
        setMap(current => !current)
    }
     
    return(
        <div className={classes.root}>
            {/* Back Button */}
            <IconButton className={classes.backButton} onClick={goBack}>
                <ChevronLeftIcon className={classes.backIcon}/>
            </IconButton>
            {/* Property Thumbnail */}
            <div className={classes.img}>
                <Image 
                    className={classes.img}
                    src={'/'+property.media.images[0]} 
                    layout='responsive'
                    width={360}
                    height={265}
                />
            </div>
            {/* Type of property */}
            <Typography className={classes.type}>
                {property.type === 'venta' ? 'Venta' : 'Renta'} de terreno de {property.area} m²
            </Typography>
            {/* Location */}
            <Typography className={classes.location}>
                {property.location.address} {property.location.city} {property.location.state}
            </Typography>
            {/* Description */}
            <div className={classes.iconDiv}>
                <DescriptionIcon className={classes.icon}/>
                <Typography className={classes.iconText}>Descripción</Typography>
            </div>
            {/* Video */}
            <div className={classes.iconDiv}>
                <PlayArrowIcon className={classes.icon}/>
                <Typography className={classes.iconText}>Video</Typography>
            </div>
            <div className={classes.video}>
                <iframe 
                    style={{borderRadius: 15}} 
                    width='360' 
                    height='202' 
                    src={`https://youtube.com/embed/${property.media.video}`}
                    frameBorder='0'
                    allowFullScreen
                />
            </div>
            {/* Google Maps */}
            <div className={classes.iconDiv}>
                <LocationOnIcon className={classes.icon}/>
                <Typography className={classes.iconText}>Ubicación</Typography>
            </div>
            <div className={classes.map}>
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
                            width={360}
                            height={300}
                            src='/dontChargeMeGoogleMaps.png'
                        />
                    </IconButton>
                    </>
                }
            </div>
            {/* Contact Button */}
            <GreenButton>Contactar</GreenButton>
            {/* Social Media Icons */}
            <Grid container className={classes.socialMediaContainer}>
                <Grid item xs={12} className={classes.socialMediaGridItem}>
                    <Typography className={classes.socialMediaText}>
                        ¡Síguenos en nuestras redes sociales!
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.socialMediaGridItem}>
                    <IconButton className={classes.socialMediaButton}>
                        <FacebookIcon className={classes.socialMediaIcon} />
                    </IconButton>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <IconButton className={classes.socialMediaButton}>
                        <IoLogoTiktok className={classes.socialMediaIcon} />
                    </IconButton>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <IconButton className={classes.socialMediaButton}>
                        <YouTubeIcon className={classes.socialMediaIcon}/>
                    </IconButton>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <IconButton className={classes.socialMediaButton}>
                        <IoLogoGoogleplus className={classes.socialMediaIcon} />
                    </IconButton>
                </Grid>
                <Grid item xs={3} className={classes.socialMediaGridItem}>
                    <IconButton className={classes.socialMediaButton}>
                        <InstagramIcon className={classes.socialMediaIcon}/>
                    </IconButton>
                </Grid>
            </Grid>
            {/* Related Properties */}
            <ZoneButton
                href='#'
                text='Relacionados'
            />
            <div className={classes.wrapper}>
            {relatedProperties.map((property => {
                return (
                    <div key={property._id} className={classes.wrapperItem}>
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