import React from "react";
import { MenuList, MenuItem ,Collapse} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CreateIcon from "@material-ui/icons/Create";
import { BiPencil,BiTrashAlt } from "react-icons/bi";
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
  MoneyIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
    color: "white",
    backgroundColor: "black",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  trashIcon:{
    width: 30,
    height: 30,
    marginRight: 20,
    color:'#EB5757'
  },
}));

function OptionProperty({stateComponent}) {
  const classes = useStyles();
  return (
    <Collapse in={stateComponent}>
      <MenuList className={classes.root}>
      <MenuItem className={classes.item}>
        {<MonetizationOnIcon className={classes.MoneyIcon} />}Vender Propiedad
      </MenuItem>
      <MenuItem className={classes.item}>
        {<BiPencil className={classes.icon}/>}Editar Propiedad
      </MenuItem>
      <MenuItem className={classes.item}>{<BiTrashAlt className={classes.trashIcon}/>}Eliminar Propiedad</MenuItem>
    </MenuList>
    </Collapse>
  );
}

export default OptionProperty;
