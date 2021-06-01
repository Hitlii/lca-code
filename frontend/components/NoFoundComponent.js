import React from 'react'
import{Typography} from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
    icon:{
        marginTop:150,
        width:166,
        height:166,
    },
    container:{
        display: 'flex',
        justifyContent: 'center'
    },
    text:{
        textAlign: 'center'
    }
}))

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
