
import { makeStyles } from "@material-ui/core/styles";
import { gray6 } from "../../colors";
export const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    minWidth: 224,
    maxWidth:280,
    minHeight: 40,
 
    backgroundColor: gray6,
    borderRadius: 15,
    margin:"auto",
    left: 0,
    right: 0,
    bottom: 61,
    zIndex: 100,
    
  },
  button:{
    textTransform:'lowercase',
    
  }
}));