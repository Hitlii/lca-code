import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 93,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 15,
    backgroundColor: "#F2F2F2",
    textAlign: "center",
    textTransform: "capitalize",
  },

  container: {
    padding: 0,
    margin: 0,
  },
}));

function FilterButton({ name, text, onChange, index, stateButton }) {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      fullWidth
      style={{
        backgroundColor: stateButton ? "grey" : "#F2F2F2",
        color: stateButton ? "white" : "#4A4C4B",
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
