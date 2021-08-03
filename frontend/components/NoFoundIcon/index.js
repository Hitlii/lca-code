import React from 'react'
import{Typography} from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import {useStyles} from './styles'
const NoFoundComponent = ({search}) => {
    const classes=useStyles()
    return (
        <div>
        <div className={classes.container}>
        <SentimentVeryDissatisfiedIcon className={classes.icon}/>
        </div>
        <Typography variant='h5'className={classes.text}>No encontramos</Typography>
        <Typography className={classes.text}>"{search}"</Typography>
        </div>
    )
}

export default NoFoundComponent