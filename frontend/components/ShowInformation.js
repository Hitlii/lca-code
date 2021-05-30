
// Material UI ---------------------------------------------------------
import Grid from '@material-ui/core/Grid'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// My Imports ------------------------------
import Collapse from './collapse'
import { green, grey6, white, darkNeutral } from '../public/colors.js'


import Link from 'next/link'

const useStyles = makeStyles((theme) => ({

  contactTextStyle: {
    fontSize: 18,
    margin: '1em',
    marginBottom: 0,
    [theme.breakpoints.only('xs')]: {
      fontSize: 18
    }
  },
  appButtonStyle: {
    width: 150,
    height: 40,
    margin: 5,
    borderRadius: 15,
    backgroundColor: grey6,
    fontSize: 16,
    boxShadow:'none',
  },
  sellButtonStyle: {
    width: 320,
    height: 40,
    margin: 20,
    borderRadius: 15,
    backgroundColor: green,
    color: 'white',
    fontSize: 16,
    boxShadow: 'none',
  },
  container: {
    padding: 0,
    margin: 0
  }
}))

const ShowInformaction = ({ showInformationCheck }) => {
  
  const classes = useStyles()

  return (
        <Container maxWidth="lg" className={classes.container}>
            <Collapse in={showInformationCheck}>

                <Grid container justify="center">
                  <Link href='/nosotros'>
                    <Button
                      className={classes.appButtonStyle}
                      variant="contained"
                      xs={6}
                    >   
                      Nosotros
                    </Button>
                  </Link>
                  <Link href='/servicios'>
                    <Button
                      className={classes.appButtonStyle}
                      variant="contained"
                      xs={6}  
                    >   
                      Servicios
                    </Button>
                  </Link>
                </Grid>

                <Grid container justify="center">
                    <Button 
                      variant="contained" xs={12} 
                      className={classes.sellButtonStyle}
                    >
                      Vender Propiedad
                    </Button>
                </Grid>

             </Collapse>
        </Container>
  )
}

export default ShowInformaction
