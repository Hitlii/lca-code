import { makeStyles } from "@material-ui/core/styles"
export const useStyles = makeStyles((theme) => ({
    root: {
      padding:20
    },
    buttonGroup: {
      backgroundColor: "#F2F2F2",
      borderRadius: 15,
      minHeight:40
    },
    buttonsContainer: {
      display: "flex",
      textAlign: "space-between",
    },
    subtitle: {
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
     
      height: 40,
      borderRadius: 15,
      color: "white",
      marginTop: 20,
      marginBottom:0,
      backgroundColor: "#4CAF50",
      display: "flex",
      "&:hover": {
        backgroundColor: "#439A46",
      }
      
    },
  }));