import React from 'react'
import Image from 'next/image'

import { 
    Avatar,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Typography,
} from '@material-ui/core'

import { HorizontalPropertyCardStyle, VerticalPropertyCardStyle } from '../../styles/PropertyCardStyles'

function PropertyCard({ orientation, property }) {
    let classes
    let width 
    let height
    if(orientation === 'horizontal') {
        classes = HorizontalPropertyCardStyle()
        width = 169
        height = 169
    }
    else {
        classes = VerticalPropertyCardStyle()
        width = 207
        height = 207
    }
        

    const status = property.status.toUpperCase()

    function zonePicker(zone){
        if(zone === 'Comercial'){
            return {
                tagText: 'COMERCIALES',
                tag: classes.blueTag,
                status: classes.statusBlueBackground
            }
        }
        if(zone === 'Campestre'){
            return {
                tagText: 'CAMPESTRES',
                tag: classes.greenTag,
                status: classes.statusGreenBackground
            }
        }
        if(zone === 'Urbana'){
            return {
                tagText: 'URBANOS',
                tag: classes.redTag,
                status: classes.statusRedBackground
            }
        }
    }

    const zone = zonePicker(property.zone)

    return (
        <Card className={classes.root} elevation={0}>
            <div className={classes.coverDiv}>
                <Paper className={zone.tag}>
                    <Typography className={classes.statusText}>
                        TERRENOS {zone.tagText}
                    </Typography>
                </Paper>
                <Avatar className={classes.cover}>
                    <Image
                        className={classes.cover}
                        src={`/${property.media.images[0].replace(/\\/g,'/')}`}
                        width={width}
                        height={height}
                        alt={`${property.type} en ${property.location.city}`}
                    />
                </Avatar>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Paper className={zone.status}>
                        <Typography className={classes.statusText}>
                            EN {status}
                        </Typography>
                    </Paper>
                    <Typography className={classes.area}>
                        {property.area} m²
                    </Typography>
                    <Typography className={classes.address}>
                        {property.location.address}
                    </Typography>
                    <Typography className={classes.cityState}>
                        {property.location.city} {property.location.state}
                    </Typography>
                    <Typography className={classes.price}>
                        ${property.price} {property.currency}                        
                    </Typography>
                    {property.specialPrice !== '' ?
                    <Typography className={classes.specialPrice}>
                        en {property.specialPrice}
                    </Typography> : null}
                </CardContent>
            </div>
        </Card>
    )
}

export default PropertyCard