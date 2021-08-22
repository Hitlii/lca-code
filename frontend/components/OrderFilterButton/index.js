import React from "react";

import { MdSort } from "react-icons/lib/md";
import {BsFilter} from "react-icons/lib/bs"
import { Button } from "@material-ui/core";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useStyles} from './styles'
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

