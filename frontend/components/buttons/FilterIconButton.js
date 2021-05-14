import { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  CardMedia,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: 0,
    margin: 0,
  },
  icon: {
    width: 38,
    height: 37,
    textAlign: "center",
  },

  root: {
    width: 93,
    height: 80,
    backgroundColor: "#f2f2f2",
    textTransform: "capitalize",
    borderRadius: 15,
  },

}));

function FilterIconButton({ name,className, Icon, text, onChange, index, stateButton }) {
  const classes = useStyles();

  return (
    <Button
      name={name}
      className={className? className:classes.root}
      style={{ backgroundColor: stateButton ? "grey" : "#F2F2F2" }}
      onClick={() => {
        onChange(name, index);
      }}
    >
      {
        <Grid container direction="column" alignItems="center">
          {Icon}
          <Typography variant="body2" style={{ color: stateButton ? "white" : null}}>{text}</Typography>
        </Grid>
      }
    </Button>
  );
}

export default FilterIconButton;
