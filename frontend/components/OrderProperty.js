import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography, Collapse } from "@material-ui/core";
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { BiSortDown, BiSortUp } from "react-icons/bi";
const useStyles = makeStyles((theme) => ({
  root: {
    padding:20
  },
  buttonGroup: {
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    minHeight:40
  },
  buttonsContainer: {
    display: "flex",
    textAlign: "space-between",
  },
  subtitle: {
    color: "#828282",
  },
  textMargin: {
    marginLeft: 20,
    marginTop: 28,
  },
  buttonContainer: {
    width: 150,
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    display: "flex",
    textAlign: "space-between",
  },
  greenButton: {
   
    height: 40,
    borderRadius: 15,
    color: "white",
    marginTop: 20,
    marginBottom:0,
    backgroundColor: "#4CAF50",
    display: "flex",
    "&:hover": {
      backgroundColor: "#439A46",
    }
    
  },
}));
function OrderProperty(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <Typography display="block" variant="h5" gutterBottom>
          <strong>Ordenar por </strong>
        </Typography>
      </Grid>

      {/* PRICE */}
      <Grid item xs={6}>
         <Typography variant="subtitle1" className={classes.subtitle}>
            Precio
        </Typography>
      </Grid>

      {/* AREA */}
      <Grid item xs={6}>
         <Typography variant="subtitle1" className={classes.subtitle}>
            Área
        </Typography>
      </Grid>

      {/* PRICE ORDER */}
      <Grid item xs={6}>
        <ButtonGroup variant="text" fullWidth className={classes.buttonGroup}>
           <Button
            startIcon={<BiSortUp />}
            style={{ backgroundColor: props.orderPrice === 1 ? "grey" : null }}
            onClick={() => props.updateOrderPrice(1)}
          />
          <Button
            startIcon={<BiSortDown />}
            style={{ backgroundColor: props.orderPrice === -1 ? "grey" : null }}
            onClick={() => props.updateOrderPrice(-1)}
          />
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <ButtonGroup variant="text" fullWidth className={classes.buttonGroup} >
          <Button
           startIcon={<BiSortUp />}
           style={{ backgroundColor: props.orderArea === 1 ? "grey" : null }}
            onClick={() => props.updateOrderArea(1)}
          />
         <Button
          startIcon={<BiSortDown />}
          style={{ backgroundColor: props.orderArea=== -1 ? "grey" : null }}
          onClick={() => props.updateOrderArea(-1)}
          />
        </ButtonGroup>
      </Grid>


       
      <Button fullWidth className={classes.greenButton} onClick={props.handleSubmit}>Ordenar</Button>
    </Grid>
  );
}

export default OrderProperty;
