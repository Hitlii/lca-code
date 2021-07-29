import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MdSort } from "react-icons/Md";
import {BsFilter} from "react-icons/Bs"
import { Button, Container } from "@material-ui/core";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SortIcon from "@material-ui/icons/Sort";
import FilterListIcon from "@material-ui/icons/FilterList";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    minWidth: 224,
    maxWidth:280,
    minHeight: 40,
 
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    margin:"auto",
    left: 0,
    right: 0,
    bottom: 61,
    zIndex: 100,
    
  },
  button:{
    textTransform:'lowercase',
    
  }
}));
function OrderFilterButton({ onChangeOrder, onChangeFilter }) {
  const classes = useStyles();
  return (
    <ButtonGroup className={classes.root} size="large" variant="text" aria-label="Ordenar y filtrar propiedades" fullWidth>
      <Button className={classes.button} startIcon={<MdSort />} onClick={onChangeOrder}>
        Ordenar
      </Button>
      <Button className={classes.button} startIcon={<BsFilter />} onClick={onChangeFilter}>
        Filtrar
      </Button>
    </ButtonGroup>
  );
}

export default OrderFilterButton;

