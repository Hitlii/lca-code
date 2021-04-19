
import {ardMedia, Typography,Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { FaWhatsapp,FaFacebookMessenger } from 'react-icons/fa';
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse';
import {green, grey6} from '../../public/colors.js'

const useStyles = makeStyles((theme) => ({
    
    contactTextStyle:{
        fontSize:18,
        margin:20,
        marginBottom:0,
        [theme.breakpoints.only('xs')]:{
            fontSize:18,
        }
    },
    appButtonStyle:{
        width:150,
        height:40,
        marginLeft:15,
        marginBottom:30,
        marginRight:15,
        borderRadius:15,
        backgroundColor:'#F2F2F2',
    },
    
    collapseStyle:{

        borderRadius:15,
        boxShadow: '0 4px 2px -2px grey',
    },
    whatsappIconStyle:{
        width:24,
        height:24,
        backgroundColor:green,
        color:'white'
    },
    messengerIconStyle:{
        width:24,
        height:24,
        backgroundColor:'white',
        color:'#2196F3'
    },
    container:{
        padding:0,
        margin:0,
    }
  }));

const ShowContact = ({showContactCheck}) => {
    const classes = useStyles()

    return (
        
        <Container maxWidth="lg" className={classes.container} >
            <Collapse in={showContactCheck} className={classes.collapseStyle}>
                
                <Typography variant="h6" className={classes.contactTextStyle}>Contactar por</Typography>
                <Grid container justify="center">
                    
                    <Button variant="text" xs={6} 
                            className={classes.appButtonStyle} 
                            startIcon={<FaWhatsapp className={classes.whatsappIconStyle}/>}>Whatsapp</Button>
                    
                    
                    <Button variant="text" xs={6} 
                            className={classes.appButtonStyle} 
                            startIcon={<FaFacebookMessenger className={classes.messengerIconStyle}/>}
                    >Message </Button>
                    
                </Grid>
                
            </Collapse> 
        </Container>
        
        
            
        
    )
}


export default ShowContact
