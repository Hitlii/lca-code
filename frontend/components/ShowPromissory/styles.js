import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    iconButton: {
        marginLeft:20,
        padding: 0,
        width:30,
        height:30,
        // backgroundColor: '#f2f2f2'
    },
    textMargin: {
      marginLeft: 20,
    },
    labelStyle: {
      width: 100,
      height: 30,
      backgroundColor: "#F2F2F2",
      marginLeft:10,
      marginBottom: 10,
      display:'block',
      textAlign: 'center'
    },
    typographyStyle: {

      width: 100,
      height: 30,
      marginLeft:10,
      display:'block',
      textAlign: 'center'
    },
    messageStyle: {
        width: 360,
        height: 30,
        backgroundColor: "#F2F2F2",
        marginLeft:10,
        marginBottom: 10,
        display:'block',
        textAlign: 'center'
      }

  }));