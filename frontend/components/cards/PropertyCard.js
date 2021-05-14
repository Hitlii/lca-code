import React from 'react'

import { 
    Card,
    CardContent,
    CardMedia,
    Paper,
    Typography,
} from '@material-ui/core'

import { HorizontalPropertyCardStyle, VerticalPropertyCardStyle } from '../../styles/PropertyCardStyles'

function PropertyCard({ orientation, property }) {
    
    let classes
    if(orientation === 'horizontal')
        classes = HorizontalPropertyCardStyle()
    else 
        classes = VerticalPropertyCardStyle()

    const status = property.status.toUpperCase()

    function zonePicker(zone){
        if( zone === 'Comercial'){
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
                <Paper 
                    className={zone.tag}
                >
                    <Typography className={classes.statusText}>
                        TERRENOS {zone.tagText}
                    </Typography>
                </Paper>
                <CardMedia
                    className={classes.cover}
                    image={property.images[0]}
                />
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
                        {property.address}
                    </Typography>
                    <Typography className={classes.cityState}>
                        {property.city} {property.state}
                    </Typography>
                    <Typography className={classes.price}>
                        ${property.price} {property.currency}                        
                    </Typography>
                    <Typography className={classes.specialPrice}>
                        en {property.specialPrice}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    )
}

export default PropertyCard