import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import CardDrawer from '../CardDrawer'
import DeleteDrawer from '../DeleteDrawer'

import { useStyles } from './styles'

import { 
    Avatar,
    Card,
    CardContent,
    Divider,
    IconButton,
    Typography
} from '@material-ui/core'

import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function AdminPropertyCard({ property }) {
    const classes = useStyles()
    const router = useRouter()
    const [options, showOptions] = useState(false)
    const [deleteDrawer, showDeleteDrawer] = useState(false)
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

    function toggleDrawer() { 
        showOptions(current => !current)
    }

    function toggleDeleteDrawer() {
        toggleDrawer()
        showDeleteDrawer(current => !current)
    }

    function onSellProperty() {
        router.push({
            pathname: '/admin1/ticket/post-pagare',
            query: { ID: property._id }
        })
    }

    function onDeleteProperty() {
        deleteProperty()
        onClickDelete()
        onClick()
        router.push('/admin1')
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
        <div>
            <Card className={classes.card} elevation={0}>
                <Link href={`/admin1/propiedades/${property.meta.url}`}>
                    <a>
                        <Image
                            className={classes.cover}
                            src={'/'+property.media.images[0]}
                            width={100}
                            height={100}
                            alt={`${property.type} en ${property.location.city}`}
                        />
                    </a>
                </Link>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.code}> 
                            <FiberManualRecordIcon className={zoneDot}/> 
                            {property.code}
                        </Typography>
                        <Typography>{property.area} m²</Typography>
                        <Typography className={classes.code}>{property.location.address}</Typography>
                        <Typography className={classes.code}>{property.location.city} {property.location.state}</Typography>
                    </CardContent>
                </div>
                <IconButton onClick={toggleDrawer} className={classes.button}>
                    <MoreHorizIcon/>
                </IconButton>
            </Card>
            <CardDrawer
                open={options}
                onClose={toggleDrawer}
            >
                <IconButton 
                    className={classes.drawerButton}
                    onClick={onSellProperty}
                >
                    <MonetizationOnOutlinedIcon className={classes.createIcon}/>
                    <Typography className={classes.createText}>
                        Vender propiedad
                    </Typography>
                </IconButton>
                <Divider className={classes.divider}/>
                <IconButton className={classes.drawerButton}>
                    <CreateOutlinedIcon className={classes.createIcon}/>
                    <Typography className={classes.createText}>
                        Editar propiedad
                    </Typography>
                </IconButton>
                <Divider className={classes.divider}/>
                <IconButton className={classes.drawerButton} onClick={toggleDeleteDrawer}>
                    <DeleteOutlineIcon className={classes.deleteIcon}/>                    
                    <Typography className={classes.deleteText}>
                        Eliminar 
                    </Typography>
                </IconButton>
            </CardDrawer>
            <DeleteDrawer
                open={deleteDrawer}
                onClose={toggleDeleteDrawer}
                onDelete={onDeleteProperty}
            />
        </div>
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
