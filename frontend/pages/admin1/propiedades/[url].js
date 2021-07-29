import React from 'react'

import Image from 'next/image'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_ADMIN_PROPERTY, GET_ALL_PROPERTIES } from '../../../graphql/queries'
import client from '../../../lib/apollo-client'

import ClientCard from '../../../components/cards/ClientCard'
import LoadingCircle from '../../../components/LoadingCircle'
import GreenButton from '../../../components/buttons/GreenButton'
import TicketCard from '../../../components/cards/TicketCard'

import {
    Divider,
    Grid,
    IconButton, 
    Typography 
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import { makeStyles } from '@material-ui/core/styles'

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
    iconButton: {
        margin: 10,
        padding: 0,
        width:50,
        height:50,
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width: 20,
        height: 20,
        color: '#4A4C4B'
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
    gridItem: {
        textAlign: 'center'
    }, 
    buttonText: {
        fontWeight: 600,
        color: '#1B1B1D'
    }, 
    header: {
        marginTop: 34,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 700,
        color: '#1B1B1D'
    }, 
    divider: {
        backgroundColor: '#F2F2F2'
    }, 
    clientDiv: {
        padding: 10,
        display: 'flex',
        justifyContent: 'space-between'
    }, 
    ticketDiv: {
        padding: 12,
        display: 'flex',
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
    }
}))

export default function AdminSinglePropertyPage({ adminProperty }){
    const classes = useStyles()
    const router = useRouter()

    // const { data, loading, error } = useQuery(GET_ADMIN_PROPERTY, {
    //     variables: { 
    //         url: router.query.url
    //     }
    // })

    // if (loading) return <LoadingCircle />
    // if(error) return `Error! ${error}`

    // const adminProperty = data.getAdminProperty

    return(
        <div className={classes.root}>
             <IconButton className={classes.backButton} href='/admin1'>
                <ChevronLeftIcon className={classes.backIcon}/>
            </IconButton>
            <div className={classes.img}>
                <Image 
                    className={classes.img}
                    src={'/'+adminProperty.media.images[0]} 
                    layout='responsive'
                    width={265}
                    height={265}
                />
            </div>
            <Typography className={classes.type}>
                {adminProperty.type === 'venta' ? 'Venta' : 'Renta'} de terreno de {adminProperty.area} m²
            </Typography>
            <Typography className={classes.location}>
                {adminProperty.location.address} {adminProperty.location.city} {adminProperty.location.state}
            </Typography>
            <GreenButton>
                Vender propiedad
            </GreenButton>
            <Grid container>
                <Grid item xs={4} className={classes.gridItem}>
                    <IconButton className={classes.iconButton}>
                        <VisibilityOutlinedIcon className={classes.icon} />
                    </IconButton>
                    <Typography className={classes.buttonText}>
                        Ver
                    </Typography>
                    <Typography className={classes.buttonText}>
                        propiedad
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.gridItem}>
                    <IconButton className={classes.iconButton}>
                        <CreateIcon className={classes.icon} />
                    </IconButton>
                    <Typography className={classes.buttonText}>
                        Editar
                    </Typography>
                    <Typography className={classes.buttonText}>
                        propiedad
                    </Typography>
                </Grid>
                <Grid item xs={4} className={classes.gridItem}>
                    <IconButton className={classes.iconButton}>
                        <DeleteIcon className={classes.icon} />
                    </IconButton>
                    <Typography className={classes.buttonText}>
                        Eliminar
                    </Typography>
                    <Typography className={classes.buttonText}>
                        propiedad
                    </Typography>
                </Grid>
            </Grid>
            <Typography className={classes.header}>
                Dueño
            </Typography>
            <Divider className={classes.divider} />
            <Grid container>
                {adminProperty.vendors.map((vendor,i)=>{
                    return(
                        <Grid item xs={12} key={vendor._id}>
                            <ClientCard
                                client={vendor}
                            />
                            {i !== adminProperty.vendors.length - 1 && <Divider className={classes.divider} />}
                        </Grid>
                    )
                })}
            </Grid>
            <Typography className={classes.header}>
                Comprador
            </Typography>
            <Divider className={classes.divider} />
            <div className={classes.ticketDiv}>
                {adminProperty.tickets.map((ticket,i)=>{
                    return(
                        <div key={ticket._id}>
                            <TicketCard
                                ticket={ticket}
                                propertyId={adminProperty._id}
                            />
                            {i !== adminProperty.tickets.length - 1 && <Divider className={classes.divider} />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Codigo a utilizar cuando se arregle el problema de autorizacion
export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_ALL_PROPERTIES,
        variables: {
            isAdminCard: true
        }
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
        query: GET_ADMIN_PROPERTY,
        variables: { url: params.url }
    })

    if (!data)
    return {
      props: {
        error: "Error",
      },
    }

    return {
        props: {
            adminProperty: data.getAdminProperty,
        }
    }
}