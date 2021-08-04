import {makeStyles} from '@material-ui/styles'
import {
    lightNeutral,
    lightResidential,
    gray6,
    whatsapp,
  } from '../../colors'
export const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 320,
      maxWidth: 600,
      margin:"auto"
    },
   
     iconButton: {
       padding: 15,
       backgroundColor: gray6,
     },
     result: {
       margin: 10,
       display: "flex",
       justifyContent: "space-between",
     },
     container: {
       display: "flex",
       textAlign: "center",
     },
   
     search: {
       border:'none',
       backgroundColor:gray6,
       borderRadius: 30,
     },
   
     icons: {
       backgroundColor: gray6,
       margin: "auto",
       "&:hover": {
         backgroundColor: gray6,
       },
     },
     containerIcons: {
       display: "flex",
       justifyContent: "center",
     },
     sadIcon: {
       height: 200,
     },
     errorMessage: {
       display: "flex",
       color: "red",
       justifyContent: "center",
     },
     cards: {
       margin:'auto'
     },
     input: {
       marginLeft: theme.spacing(1),
       flex: 1,
       color: 'black'
     },
     inputBox:{
           margin: 10,
           marginRight: 'auto',
           marginLeft: 'auto',
           padding: '2px 4px',
           display: 'flex',
           alignItems: 'center',
           width: 340,
           height: 50,
           backgroundColor: gray6,
           borderRadius: 15,
     }
   
   }));