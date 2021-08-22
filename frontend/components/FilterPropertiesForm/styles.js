import {makeStyles} from '@material-ui/styles'
import {
    neutralLight,
    lightResidential,
    gray3,
    whatsappColor,
  } from '../../colors'


export const useStyles = makeStyles(() => ({
    form:{
      margin: 20,
      marginTop:0,
      color: gray3
    },
    icon: {
      width: 38,
      height: 37,
      textAlign: "center",
      color:neutralLight
    },
    marginText: {
      marginLeft: 20,
    },
    margin: {
      marginLeft: 20,
      marginBottom: 10,
    },
    container: {
      padding: 0,
      margin: 0,
      borderRadius: 15,
      boxShadow: "0 0 10px",
    },
    title: {
      margin:20,
    },
    removeFilters: {
      margin:20,
      color: lightResidential,
      textTransform:'lowercase'
    },
    greenButton: {
      
      minHeight: 40,
      borderRadius: 15,
      color: "white",
      
      marginBottom: 0,
      marginTop: 60,
      backgroundColor: whatsappColor,
      "&:hover": {
        backgroundColor: "#439A46",
      },
      inputwidth: {
        width: 100,
      },
  
    },
  }));