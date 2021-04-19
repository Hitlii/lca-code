import {React,useState,useEffect } from 'react'
import {CardMedia, Typography,Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import PhoneIcon from '@material-ui/icons/Phone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import ShowContact from './ShowContact'
import ShowInformaction from './ShowInformaction'

const useStyles = makeStyles((theme) => ({
    root:{ 

    },
    buttonStyle:{ 
        
        margin:10,
        width:40,
        height:40,
        backgroundColor:'#F2F2F2',
        borderRadius:'50%',
        '&:hover':{
            backgroundColor:'grey'
        }
    },
    logoStyle:{
        width:87,
        height:40,
        margin:10,
    },
    container:{
        padding:0,
        margin:0,
        justify:'center',

    }
    
    
  }));

function MenuBar() {
    const classes = useStyles()
    const [showContactCheck,setShowContactCheck]=useState(false)
    const [showInformationCheck,setshowInformationCheck]=useState(false)
    const hanleShowContactButton=() =>{
        setshowInformationCheck(false)
        if(showContactCheck === false){
            setShowContactCheck(true)
        }else{
            setShowContactCheck(false)
        }
        
    }
    const hanleShowInformationButton=() =>{
        setShowContactCheck(false)
        if(showInformationCheck === false){
            setshowInformationCheck(true)
        }else{
            setshowInformationCheck(false)
        }
        
    }



    return (
        <Container maxWidth="lg" className={classes.container} >
        <Grid container  justify="center">
        <Grid container justify="center">
            <Grid item xs={6}>
                <CardMedia className={classes.logoStyle} image='/LogoOriginalSF.png'/>
            </Grid>
        
            <Grid item xs={2} >
                <IconButton  className={classes.buttonStyle}>
                <SearchIcon/>
                </IconButton>
            </Grid>

            <Grid item xs={2}>
                <IconButton  className={classes.buttonStyle} onClick={hanleShowContactButton}>
                <PhoneIcon/>
                </IconButton>
            </Grid>

            <Grid item xs={2}>
                <IconButton  className={classes.buttonStyle} onClick={hanleShowInformationButton}>
                <ExpandMoreIcon/>
                </IconButton> 
            
            </Grid>
        </Grid>

        <ShowContact showContactCheck={showContactCheck}/>
        <ShowInformaction showInformationCheck={showInformationCheck}/>

        </Grid>
        </Container>
    )
}


export default MenuBar
