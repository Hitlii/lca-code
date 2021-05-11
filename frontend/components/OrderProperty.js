import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography, Collapse } from "@material-ui/core";
import { BiSortDown, BiSortUp } from "react-icons/bi";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: 360,
    height: 195,
    borderRadius: 15,
    bottom: 0,
    backgroundColor: "white",
    boxShadow: "0 0 10px",
    padding: 0,
  },
  buttonsContainer: {
    display: "flex",
    textAlign: "space-between",
  },
  subtitle: {
    width: 150,
    height: 30,
    marginLeft: 10,
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
    width: 320,
    height: 40,
    borderRadius: 15,
    color: "white",
    margin: "auto",
    marginTop: 20,
    backgroundColor: "#4CAF50",
    display: "flex",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#4CAF50",
    },
  },
}));
function OrderProperty({ stateComponent }) {
  const classes = useStyles();
  return (
    <Collapse in={stateComponent}>
      <Container className={classes.root}>
        <Typography variant="h5" className={classes.textMargin}>
          Ordenar por
        </Typography>
        <Container className={classes.buttonsContainer}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Precio
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Area
          </Typography>
        </Container>
        <Container className={classes.buttonsContainer}>
          <Container className={classes.buttonContainer}>
            <Button startIcon={<BiSortUp />}></Button>
            <Button startIcon={<BiSortDown />}></Button>
          </Container>
          <Container className={classes.buttonContainer}>
            <Button startIcon={<BiSortUp />}></Button>
            <Button startIcon={<BiSortDown />}></Button>
          </Container>
        </Container>
        <Button className={classes.greenButton}>Ordenar</Button>
      </Container>
    </Collapse>
  );
}

export default OrderProperty;
