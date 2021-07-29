import React, { useState} from 'react'
import { gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import Image from 'next/image'
import Link from 'next/link'

import CardDrawer from '../drawers/CardDrawer'
import DeleteDrawer from '../drawers/DeleteDrawer'

import { 
    Avatar,
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography
} from '@material-ui/core'

import { drawerStyles } from '../../styles/DrawerStyles'
import { makeStyles } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: 340,
        height: 100,
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        width: 186,
        margin: 0,
    },
    cover: {
        width: 100,
        height: 100,
        borderRadius:5,
        cursor: 'pointer',
    },
    button: {
        padding: 0,
        marginBottom: 50
    },
    iconButton: {
        padding: 0,
        margin: 0
    },
    code: {
        fontSize: 12
    }, 
    location : {
        fontSize: 14
    },
    blueZoneDot: {
        fontSize: 10,
        marginRight: 5,
        color: '#01509D',
    },
    greenZoneDot: {
        fontSize: 10,
        marginRight: 5,
        color: '#6DB432',
    },
    redZoneDot: {
        fontSize: 10,
        marginRight: 5,
        color: '#E41E2B',
    }, 
}))

function AdminPropertyCard({ property }) {
    const classes = useStyles();
    const drawerClasses = drawerStyles()
    const [options, showOptions] = useState(false)
    const [deleteDrawer, setDeleteDrawer] = useState(false)
    const router = useRouter()

    const [deleteProperty] = useMutation(DELETE_PROPERTY, {
        update (
        _,
        { data }
        ) {
            console.log(data)
        },
        variables: {
            _id: property._id
        }
    })

    function onClick() {
        showOptions(current => !current)
    }
    function onClickDelete() {
        onClick()
        setDeleteDrawer(current => !current)
    }

    function onDeleteProperty() {
        deleteProperty()
        onClickDelete()
        onClick()
        router.push('/admin1')
    }

    function onSellProperty() {
        router.push({
            pathname: '/admin1/ticket/post-pagare',
            query: { ID: property._id }
        })
    }

    function pickZoneDotColor(zone){
        if(zone === 'Comercial')
            return classes.blueZoneDot;
        if(zone === 'Campestre')
            return classes.greenZoneDot;
        if(zone === 'Urbana')
            return classes.redZoneDot;
    }

    const zoneDot = pickZoneDotColor(property.zone)

    return (
        <>
            <Card className={classes.root} elevation={0}>
                <Link href={`/admin1/propiedades/${property.meta.url}`}>
                    <Avatar className={classes.cover}>
                        <Image
                            className={classes.cover}
                            src={'/'+property.media.images[0]}
                            width={100}
                            height={100}
                            alt={`${property.type} en ${property.location.city}`}
                        />
                    </Avatar>
                </Link>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.code}> 
                            <FiberManualRecordIcon
                                className={zoneDot}
                            /> 
                            {property.code}
                        </Typography>
                        <Typography>{property.area} m²</Typography>
                        <Typography className={classes.code}>{property.location.address}</Typography>
                        <Typography className={classes.code}>{property.location.city} {property.location.state}</Typography>
                    </CardContent>
                </div>
                <IconButton onClick={onClick}className={classes.button}>
                    <MoreHorizIcon/>
                </IconButton>
            </Card>
            

            <CardDrawer
                open={options}
                onClose={onClick}
            >
                <IconButton 
                    className={drawerClasses.drawerButton}
                    onClick={onSellProperty}
                >
                    <MonetizationOnOutlinedIcon className={drawerClasses.createIcon}/>
                    <Typography className={drawerClasses.createText}>
                        Vender propiedad
                    </Typography>
                </IconButton>
                <Divider className={drawerClasses.divider}/>
                <IconButton className={drawerClasses.drawerButton}>
                    <CreateOutlinedIcon className={drawerClasses.createIcon}/>
                    <Typography className={drawerClasses.createText}>
                        Editar propiedad
                    </Typography>
                </IconButton>
                <Divider className={drawerClasses.divider}/>
                <IconButton className={drawerClasses.drawerButton} onClick={onClickDelete}>
                    <DeleteOutlineIcon className={drawerClasses.deleteIcon}/>                    
                    <Typography className={drawerClasses.deleteText}>
                        Eliminar 
                    </Typography>
                </IconButton>
            </CardDrawer>

            <DeleteDrawer
                open={deleteDrawer}
                onClose={onClickDelete}
                onDelete={onDeleteProperty}
            />
        </>
    )
}

const DELETE_PROPERTY = gql`
    mutation deleteProperty($_id: ID!) {
        deleteProperty( _id: $_id) {
            success
            code
            message
        }
    } 
`

export default AdminPropertyCard
