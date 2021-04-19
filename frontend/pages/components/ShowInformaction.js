
import { Typography,Button, Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {green, grey6} from '../../public/colors.js'
import Grid from '@material-ui/core/Grid'
import Collapse from '@material-ui/core/Collapse';


const useStyles = makeStyles((theme) => ({
    
    contactTextStyle:{
        fontSize:18,
        margin:'1em',
        marginBottom:0,
        [theme.breakpoints.only('xs')]:{
            fontSize:18,
        }
    },
    appButtonStyle:{
        width:150,
        height:40,
        margin:5,
        borderRadius:15,
        backgroundColor:grey6,
        fontSize:16,
    },
    sellButtonStyle:{
        width:320,
        height:40,
        margin:20,
        borderRadius:15,
        backgroundColor:green,
        color:'white',
        fontSize:16,
    },
    collapseStyle:{

        borderRadius:15,
        boxShadow: '0 4px 2px -2px grey',
    },
    container:{
        padding:0,
        margin:0,
        
    }
  }));

const ShowInformaction = ({showInformationCheck}) => {
    const classes = useStyles()

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Collapse in={showInformationCheck} className={classes.collapseStyle}>
                
                <Grid container justify="center">
                    <Button variant="contained" xs={6}
                            className={classes.appButtonStyle} >Nostros</Button>
        
                    <Button variant="contained" xs={6}
                            className={classes.appButtonStyle} >Servicios</Button>
                </Grid>

                <Grid container  justify="center">
                    <Button variant="contained" xs={12} text=''
                            className={classes.sellButtonStyle} >Vender Propiedad</Button>
                    
                </Grid>
                
             </Collapse> 
        </Container>
    )
}

export default ShowInformaction
