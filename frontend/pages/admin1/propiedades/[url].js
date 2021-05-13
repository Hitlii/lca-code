import React from 'react'

import GreenButton from '../../../components/buttons/GreenButton'
import TicketCard from '../../../components/cards/TicketCard'
import ClientCard from '../../../components/cards/ClientCard'

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
        borderRadius: '0px 0px 15px 15px',
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
    backButton: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
        padding: 0,
        width:40,
        height:40,
        backgroundColor: '#f2f2f2',
        color: '#4A4C4B',
    }, 
    backIcon: {
        fontSize: 28
    }
}))

export default function AdminSinglePropertyPage(){
    const classes = useStyles()
    const propiedad = {
        price: '68,000',
        zone: 'Urbana',
        type: 'Renta',
        code: 'VT001',
        area: 300,
        address: 'Loma Tova',
        city: 'Tijuana',
        state: 'B.C.',
        images: ['https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg'],
        clients:[{
            name: 'John Doe',
            contact: {
                phone: '(666) 777-8888',
                email: 'johndoe@uknown.com',
            }
        }],
        ticket: {
            clients:[
                {
                    name: 'John Doe',
                    contact: {
                        phone: '(666) 777-8888',
                        email: 'johndoe@uknown.com',
                    }
                },
            ],
            area: '4,000',
            price: '68,000',
            emissionDate: '3/12/2021'
        }
    }

    return(
        <div className={classes.root}>
             <IconButton className={classes.backButton} href='/admin1'>
                <ChevronLeftIcon className={classes.backIcon}/>
            </IconButton>
            <img 
                className={classes.img}
                src={propiedad.images[0]} 
                alt='propiedad'
            />
            <Typography className={classes.type}>
                {propiedad.type === 'venta' ? 'Venta' : 'Renta'} de terreno de {propiedad.area} m²
            </Typography>
            <Typography className={classes.location}>
                {propiedad.address} {propiedad.city} {propiedad.state}
            </Typography>
            <GreenButton>
                Vender Propiedad
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
            <div className={classes.clientDiv}>
                <ClientCard client={propiedad.clients[0]}/>
            </div>
            <Divider className={classes.divider} />
            <Typography className={classes.header}>
                Comprador
            </Typography>
            <div className={classes.clientDiv}>
                <TicketCard 
                    ticket={propiedad.ticket}
                />
            </div>
        </div>
    )
}

/*
export const getStaticPaths = async () => {
    
}

export const getStaticProps = async (context) => {
    
}
*/