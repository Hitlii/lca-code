import React from "react";
import { Grid, Typography ,IconButton,Paper} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        marginLeft:20,
        padding: 0,
        width:30,
        height:30,
        // backgroundColor: '#f2f2f2'
    },
    textMargin: {
      marginLeft: 20,
    },
    labelStyle: {
      width: 100,
      height: 30,
      borderRadius: 15,
      backgroundColor: "#F2F2F2",
      marginLeft:10,
      marginBottom: 10,
      display:'block',
      textAlign: 'center'
    },
    typographyStyle: {

      width: 100,
      height: 30,
      borderRadius: 15,
      marginLeft:10,
      display:'block',
      textAlign: 'center'
    },
    messageStyle: {
        width: 300,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#F2F2F2",
        marginLeft:10,
        marginBottom: 10,
        display:'block',
        textAlign: 'center'
      }

  }));
const ShowPromissory = ({promissory,deletePromissory}) => {
    const classes=useStyles()
  
  return (

    <Grid container justify='center'>
      
      <Typography className={classes.typographyStyle}variant="body2" gutterBottom>
      {promissory.length ? "Meses":''}
      </Typography>
      <Typography className={classes.typographyStyle}variant="body2" gutterBottom>
      {promissory.length ? "Mensualidad":''}
      </Typography>
      {promissory.length ? promissory.map((promissory, index) => {
        return (
          <Grid container key={index} justify='center'>
            <IconButton className={classes.iconButton} >
             {index+1}
            </IconButton>
            <label className={classes.labelStyle}>{promissory.months}</label>

            <label className={classes.labelStyle}>{promissory.payment}</label> 
            <IconButton className={classes.iconButton} onClick={() => deletePromissory(index)}>
              <HighlightOffIcon/>
            </IconButton>
          </Grid>
        );
      }):
      <Grid container justify='center'>
      <Typography className={classes.messageStyle}variant="body2" gutterBottom>
      No hay pagare
      </Typography>
      </Grid>}
      
    </Grid>

  );
};

export default ShowPromissory;