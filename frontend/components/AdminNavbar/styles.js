import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
    appBar: {
      top: 'auto',
      padding: 0,
      margin: 0,
      bottom: 0,
      backgroundColor: '#f2f2f2'
    },
    toolbar: {
      display: 'flex',
      marginRight: 'auto',
      marginLeft: 'auto',
      width: 340,
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]:{
        width: 300
      }
    },
    button: {
      margin: 0,
      padding: 0
    },
    icon: {
      margin: 10,
      width: 31,
      height: 28
    }, 
    drawerContainer: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'column',
    },
    drawerButton: {
      width: 100,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }, 
    divider: {
      backgroundColor: '#f2f2f2'
    }
  }))