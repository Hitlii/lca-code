import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button, Typography, Collapse } from "@material-ui/core";
import { BiSortDown, BiSortUp } from "react-icons/bi";
const useStyles = makeStyles((theme) => ({
  root: {
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
    marginLeft: "auto",
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
function OrderProperty(props) {
  const classes = useStyles();

  return (
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
        </Container>
        <Container className={classes.buttonContainer}>
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
        </Container>
      </Container>
      <Button className={classes.greenButton} onClick={props.handleSubmit}>Ordenar</Button>
    </Container>
  );
}

export default OrderProperty;
