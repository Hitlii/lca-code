import { makeStyles } from "@material-ui/core/styles";
import {gray6} from '../../colors'
export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 93,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 15,
    backgroundColor: gray6,
    textAlign: "center",
    textTransform: "capitalize",
  },

  container: {
    padding: 0,
    margin: 0,
  },
}));