import React from "react";

import { Container, Button, Typography, Collapse } from "@material-ui/core";
import Grid from '@material-ui/core/Grid'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { BiSortDown, BiSortUp } from "react-icons/bi";
import {useStyles} from './styles'
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
           title=" De mayor a menor"
            startIcon={<BiSortUp />}
            style={{ backgroundColor: props.orderPrice === 1 ? "grey" : null }}
            onClick={() => props.updateOrderPrice(1)}
          />
          <Button
            title="De menor a mayor"
            startIcon={<BiSortDown />}
            style={{ backgroundColor: props.orderPrice === -1 ? "grey" : null }}
            onClick={() => props.updateOrderPrice(-1)}
          />
        </ButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <ButtonGroup variant="text" fullWidth className={classes.buttonGroup} >
          <Button
          title=" De mayor a menor"
           startIcon={<BiSortUp />}
           style={{ backgroundColor: props.orderArea === 1 ? "grey" : null }}
            onClick={() => props.updateOrderArea(1)}
          />
         <Button
         title="De menor a mayor"
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