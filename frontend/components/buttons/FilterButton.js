import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 94,
    height: 40,
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
      style={{ backgroundColor:stateButton?'grey':'#F2F2F2',color:stateButton?'white':null}}
      onClick={() => {
        onChange(name, index);
        console.log(index)
      }}
    >
      {text}
    </Button>
  );
}

export default FilterButton;
