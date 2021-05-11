import React from 'react'

import { 
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
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
    }
}))

function AdminPropertyCard({ property }) {
    const classes = useStyles();

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
        <Card className={classes.root} elevation={0}>
            <CardMedia 
                className={classes.cover}
                image={property.images[0]}
                title='baby yoda'
            />
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
            <IconButton className={classes.button}>
                <MoreHorizIcon/>
            </IconButton>
        </Card>
    )
}

export default AdminPropertyCard
