import React from "react";
import { Grid, Typography ,IconButton,Paper} from "@material-ui/core";
import {useStyles} from './styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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