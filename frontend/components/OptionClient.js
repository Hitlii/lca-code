import React from "react";
import { MenuList, MenuItem ,Collapse} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  item: {
    height: 65,
    boxShadow: "0 2px 2px -2px gray",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  trashIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
    color: "#EB5757",
  },
}));
function OptionClient({stateComponent}) {
  const classes = useStyles();
  return (
    <Collapse in={stateComponent}>
      <MenuList className={classes.root}>
      <MenuItem className={classes.item}>
        {<BiPencil className={classes.icon} />}Editar Cliente
      </MenuItem>
      <MenuItem className={classes.item}>
        {<BiTrashAlt className={classes.trashIcon} />}Remover
      </MenuItem>
    </MenuList>
    </Collapse>
  );
}

export default OptionClient;
