import { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography, Slider, Grid, Container } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  slider: {
    backgroundColor: "#F2F2F2",
  },
  center: {
    padding: 0,
    margin:0,
    display: "flex",
    justifyContent: "center",

  },
  spaceBetween: {
    padding: 0,
    margin:0,
    display: "flex",
    justifyContent: "space-between",
  },
  textColor: {
    color: "#828282",
    marginLeft:20,
  },
  textMargin:{
    margin:'auto'
  }
});
const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 5,
    padding: "13px 0",
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#F2F2F2",
    border: "1px solid currentColor",
    marginTop: -10,
    marginLeft: -10,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "#F2F2F2",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function SliderInput({name,label,onChange,value}) {
  const classes = useStyles();

  return (
    <>
      <Typography id="range-slider" className={classes.textColor}gutterBottom>
        {label}
      </Typography>
      <Container className={classes.center}>
        <AirbnbSlider
          value={value}
          className={classes.root}
          onChange={onChange}
          aria-labelledby="range-slider"
        />
      </Container>
      <Container className={classes.spaceBetween}>
        <Typography className={classes.textMargin}>{value[0] + "M"}</Typography>
        <Typography className={classes.textMargin}>{value[1] + "M"}</Typography>
      </Container>
    </>
  );
}

export default SliderInput;
