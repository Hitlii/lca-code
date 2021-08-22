import React from "react";
import { Button } from "@material-ui/core";
import {useStyles} from './styles'
import {gray6,neutralLight} from '../../colors'
function FilterButton({ name, text, onChange, index, stateButton }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      fullWidth
      style={{
        backgroundColor: stateButton ? "grey" : gray6,
        color: stateButton ? "white" : neutralLight,
      }}
      onClick={() => {
        onChange(name, index);
      }}
    >
      {text}
    </Button>
  );
}

export default FilterButton;