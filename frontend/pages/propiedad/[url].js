import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_PROPERTY, GET_ALL_PROPERTIES } from '../../graphql/queries'
import client from '../../lib/apollo-client'

import Image from 'next/image'
import Link from 'next/link' 

import GreenButton from '../../components/buttons/GreenButton'
import LoadingCircle from '../../components/LoadingCircle'
import Map from '../../components/map'
import PropertyCard from '../../components/cards/PropertyCard'
import ZoneButton from '../../components/buttons/ZoneButton'

import Carousel from 'react-material-ui-carousel'

import {
    Grid,
    IconButton,
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
        borderRadius: '0px 0px 5px 5px',
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
    wrapper: {
        maxHeight: 360,
        display: 'flex',
        overflowX: 'auto',
        marginLeft: 10,
        marginTop: 20
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
        marginBottom:  20
    },
    description: {
        margin: 10
    },
    a: {
        textDecoration: 'none'
    }
}))

export default function SinglePropertyPage({ property, relatedProperties }){
    const classes = useStyles()
    const [map, setMap] = useState(false)
    const router = useRouter()
    const url = router.query.url
    
    // const { data, loading, error } = useQuery(GET_PROPERTY, { 
    //     variables: { url: url }
    // })

    // if(loading) return (<LoadingCircle />)
    // if(error) return `Error! ${error.message}`

    // const property = data.getProperty.property
    // const relatedProperties = data.getProperty.relatedProperties
    // const slateText = JSON.parse(property.description.text)
    function onClickMap() { 
        setMap(current => !current)
    }

    const slateText = JSON.parse(property.description.text)
     
    return(
        <div className={classes.root}>
        {/* Back Button */}
            <Link href='/propiedades'>
                <IconButton className={classes.backButton}>
                    <ChevronLeftIcon className={classes.backIcon}/>
                </IconButton>
            </Link>

            {/* Property Images*/}
            <Carousel
                autoplay={true}
                animation='fade'
                indicators={true}
                timeout={500}
                navButtonsAlwaysVisible={true}
                navButtonsAlwaysInvisible={false}
            >
                {property.media.images.map((image,i)=>{
                    return(
                        <div key={i} className={classes.img}>
                            <Image 
                                className={classes.img}
                                src={'/'+image} 
                                layout='responsive'
                                width={600}
                                height={600}
                            />
                        </div>
                    )
                })}       
            </Carousel>

            {/* Type of property */}
            <Typography  variant="h5" gutterBottom>
                {property.title}
            </Typography>

            {/* Location */}
            <Typography variant="body2" className={classes.location} gutterBottom>
                {property.location.address} {property.location.city} {property.location.state}
            </Typography>
            {/* Description */}
            <div className={classes.iconDiv}>
                <DescriptionIcon className={classes.icon}/>
                <Typography className={classes.iconText}>Descripción</Typography>
            </div>
            <div className={classes.description}>
                {slateText.map((n, i) => {
                    switch(n.type){
                        case 'bulleted-list': return(
                            <ul key={i}>
                                {n.children.map((firstChild, i) => {
                                    if(firstChild.type === 'list-item'){
                                        return(
                                            <li key={i}>
                                                {firstChild.children[0].text}
                                            </li>
                                        )
                                    }
                                })}  
                            </ul>           
                        ) 
                        case 'heading-one': return(
                            <Typography variant='h5' gutterBottom key={i}>
                                {n.children.map((children, i) => {
                                    if(children.bold) return <strong key={i}>{children.text}</strong>
                                    if(children.italic) return <em key={i}>{children.text}</em>
                                    if(children.underline) return <u key={i}>{children.text}</u>
                                    return <Fragment key={i}>{children.text}</Fragment>
                                })}  
                            </Typography>           
                        )
                        case 'heading-two': return(
                            <Typography variant='h6' gutterBottom key={i}>
                                {n.children.map((children,i) => {
                                    if(children.bold) return <strong key={i}>{children.text}</strong>
                                    if(children.italic) return <em key={i}>{children.text}</em>
                                    if(children.underline) return <u key={i}>{children.text}</u>
                                    return <Fragment key={i}>{children.text}</Fragment>
                                })}  
                            </Typography>           
                        )
                        case 'numbered-list': return(
                            <ol key={i}>
                                {n.children.map((firstChild, i) => {
                                    if(firstChild.type === 'list-item'){
                                        return(
                                            <li key={i}>
                                                {firstChild.children[0].text}
                                            </li>
                                        )
                                    }
                                })}  
                            </ol>           
                        )
                        default: {
                            return (
                                <Typography gutterBottom key={i}>
                                    {n.children.map((children, i) => {
                                        if(children.text === '') return <br/>
                                        if(children.bold) return <strong key={i}>{children.text}</strong>
                                        if(children.italic) return <em key={i}>{children.text}</em>
                                        if(children.underline) return <u key={i}>{children.text}</u>
                                        return <Fragment key={i}>{children.text}</Fragment>
                                    })}
                                </Typography>             
                            )
                        }
                    }
                })}
            </div>

            {/* Video */}
            <div className={classes.iconDiv}>
                <PlayArrowIcon className={classes.icon}/>
                <Typography gutterBottom className={classes.iconText}>Video</Typography>
            </div>
            <div className={classes.iframeContainer}>
                <iframe 
                    className={classes.video} 
                    src={`https://youtube.com/embed/${property.media.video}?showinfo=0`}
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
                            width="100%"
                            src='/dontChargeMeGoogleMaps.png'
                        />
                    </IconButton>
                    </>
                }
            </div>
            {/* Contact Button */}
            <a className={classes.a} target='_blank' href='https://api.whatsapp.com/send?phone=+526653922230'>
                <GreenButton>Contactar</GreenButton>
            </a>
            {/* Social Media Icons */}
            <Grid container className={classes.socialMediaContainer}>
                <Grid item xs={12} className={classes.socialMediaGridItem}>
                    <Typography className={classes.socialMediaText}>
                        ¡Síguenos en nuestras redes sociales!
                    </Typography>
                </Grid>
                <Grid item xs={3} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://www.facebook.com/lcabienesraices'>
                        <FacebookIcon className={classes.socialMediaIcon} />
                    </a>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://www.tiktok.com/@lcabienesraices?_d=secCgYIASAHKAESMgowYT1TrB3ng6pzY72Dpd5OkxEysU%2BHzTSImHyPRc6vk9fandDCg5slJJ2OCL4rxcSTGgA%3D&_r=1&checksum=2f1cbed0b1a1be3ba092cf36c081a5f3ac54b254ab2aa90055a0be7bede6a117&language=es&sec_uid=MS4wLjABAAAAEHUhxoahCJuxNW3FEA8Y5YOL76ei5M6aXlcDx9371YvFzBZX5kX5O-emah2w3Oyz&sec_user_id=MS4wLjABAAAAEHUhxoahCJuxNW3FEA8Y5YOL76ei5M6aXlcDx9371YvFzBZX5kX5O-emah2w3Oyz&share_app_id=1233&share_author_id=6915514760588149766&share_link_id=202F5DC7-9C7C-45E2-8ADD-CABE60553F51&source=h5_m&tt_from=copy&u_code=dgd0bm0e8e085e&user_id=6915514760588149766&utm_campaign=client_share&utm_medium=ios&utm_source=copy'>
                        <IoLogoTiktok className={classes.socialMediaIcon} />
                    </a>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://www.youtube.com/channel/UCej0jSusZmWgqmUDey8UeJQ'>
                        <YouTubeIcon className={classes.socialMediaIcon}/>
                    </a>
                </Grid>
                <Grid item xs={2} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://www.google.com/maps/place/LCA+Bienes+Raices/@32.5661397,-116.590919,17z/data=!3m1!4b1!4m5!3m4!1s0x80d90d6db4b0bd7d:0xcc6fe9ea04043c0e!8m2!3d32.5661397!4d-116.5887303'>
                        <IoLogoGoogleplus className={classes.socialMediaIcon} />
                    </a>
                </Grid>
                <Grid item xs={3} className={classes.socialMediaGridItem}>
                    <a target="_blank" href='https://www.instagram.com/lca_bienesraices/'>
                        <InstagramIcon className={classes.socialMediaIcon}/>
                    </a>
                </Grid>
            </Grid> 
            {/* Related Properties */}
            {relatedProperties.length > 0 
                && 
            <ZoneButton
                href='#'
                text='Relacionados'
            />}
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