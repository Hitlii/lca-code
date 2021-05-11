import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { Button, Container } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import FilterListIcon from "@material-ui/icons/FilterList";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    width: 220,
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 15,
    margin: "0 auto",
    left: 0,
    right: 0,
    bottom: 100,
    display: "flex",
    textAlign: "space-between",
  },
}));
function OrderFilterButton({ onChangeOrder, onChangeFilter }) {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Button startIcon={<BiSortUp />} onClick={onChangeOrder}>
        Order
      </Button>
      <Button startIcon={<BiSortDown />} onClick={onChangeFilter}>
        Filter
      </Button>
    </Container>
  );
}

export default OrderFilterButton;
