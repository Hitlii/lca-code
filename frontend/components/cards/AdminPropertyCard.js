import React, { useState} from 'react'
import Link from 'next/link'

import { 
    Card,
    CardContent,
    CardMedia,
    Divider,
    Drawer,
    IconButton,
    Typography
} from '@material-ui/core'

import { drawerStyles, StyledPaper } from '../../styles/DrawerStyles'
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
        borderRadius:15,
        cursor: 'pointer',
    },
    button: {
        padding: 0,
        marginBottom: 50
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
    function onClick() {
        showOptions(current => !current)
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
                <Link
                    href={'/admin1/propiedades/'+property.code}
                >
                    <CardMedia 
                        className={classes.cover}
                        image={property.images[0]}
                        title='baby yoda'
                    />
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
                        <Typography className={classes.code}>{property.address}</Typography>
                        <Typography className={classes.code}>{property.city} {property.state}</Typography>
                    </CardContent>
                </div>
                <IconButton onClick={onClick}className={classes.button}>
                    <MoreHorizIcon/>
                </IconButton>
            </Card>
            

            <Drawer
                PaperProps={{ component: StyledPaper }}
                anchor='bottom'
                open={options}
                onClose={onClick}
            >
                <IconButton 
                    className={drawerClasses.drawerButton}
                    href='/admin1/ticket/post-pagare'
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
                <IconButton className={drawerClasses.drawerButton}>
                    <DeleteOutlineIcon className={drawerClasses.deleteIcon}/>                    
                    <Typography className={drawerClasses.deleteText}>
                        Eliminar propiedad
                    </Typography>
                </IconButton>
            </Drawer>
        </>
    )
}

export default AdminPropertyCard
