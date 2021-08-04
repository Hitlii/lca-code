import { makeStyles } from "@material-ui/core/styles";
import {gray6} from '../../colors'
export const useStyles = makeStyles((theme) => ({
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
    minWidth: 93,
    minHeight: 80,
    maxHeight: 160,
    backgroundColor: gray6,
    textTransform: "capitalize",
    borderRadius: 15,
  },

}));