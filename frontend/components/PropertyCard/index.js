import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import {numberWithCommas} from '../../helper/format'
import { 
    Card,
    CardContent,
    Paper,
    Typography,
} from '@material-ui/core'

import { HorizontalPropertyCardStyle, VerticalPropertyCardStyle } from './styles'

function PropertyCard({ orientation, property }) {
    let classes
    let width 
    let height
    if(orientation === 'horizontal') {
        classes = HorizontalPropertyCardStyle()
        width = 207
        height = 207
    }
    else {
        classes = VerticalPropertyCardStyle()
        width = 207
        height = 207
    }
        
    const status = property.status.toUpperCase()

    function zonePicker(zone){
        if(zone === 'Comercial')
            return classes.statusBlueBackground
        if(zone === 'Campestre')
            return classes.statusGreenBackground
        if(zone === 'Urbana')
            return classes.statusRedBackground
    }

    function setArea(area) {
        if (area > 10000) {
            let hectareas = Math.trunc(area*0.0001)
            return hectareas.toString() + " hectárea(s)"
        } else 
            return numberWithCommas(area) + " m²"
    }

    function setPrice(price, specialPrice, currency) {
        if (specialPrice !== "") {
            return specialPrice
        } else 
            return "$" + numberWithCommas(price) + " " + currency
    }

    return (
        <Card className={classes.root} elevation={0}>
            <div className={classes.coverDiv}>
                <Link href={`/propiedad/${property.meta.url}`} passHref>
                    <a>
                        <Image
                            className={classes.cover}
                            src={property.media.images[0]}
                            width={207}
                            height={207}
                            alt={`${property.type} en ${property.location.city}`}
                        />
                    </a>
                </Link>
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Paper className={zonePicker(property.zone)} elevation={0}>
                        <Typography className={classes.statusText}>
                            EN {status}
                        </Typography>
                    </Paper>
                    <Typography className={classes.area}>
                        {setArea(property.area)}
                    </Typography>
                    <Typography className={classes.address}>
                        {property.location.address}
                    </Typography>
                    <Typography className={classes.cityState}>
                        {property.location.city} {property.location.state}
                    </Typography>
                    <Typography className={classes.price}>
                        {setPrice(property.price,property.specialPrice,property.currency)}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    )
}

export default PropertyCard