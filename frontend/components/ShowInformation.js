
// Material UI ---------------------------------------------------------
import Grid from '@material-ui/core/Grid'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// My Imports ------------------------------
import Collapse from './collapse'
import { green, grey6, white, darkNeutral, lightNeutral } from '../public/colors.js'


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
    height: 40,
    borderRadius: 15,
    backgroundColor: grey6,
    fontSize: 16,
    boxShadow:'none',
    textTransform:'capitalize'
  },
  sellButtonStyle: {
    height: 40,
    borderRadius: 15,
    backgroundColor: green,
    color: 'white',
    fontSize: 16,
    boxShadow: 'none',
    textTransform:'capitalize'
  },
  container: {
    padding: 0,
    margin: 'auto',
    maxWidth: 600,
    color: lightNeutral
   
  }, 
  main: {
    maxWidth:280,
    margin: 'auto',
    marginBottom:30,
  }
}))

const ShowInformaction = ({ showInformationCheck }) => {
  
  const classes = useStyles()

  return (
        <Container maxWidth="lg" className={classes.container}>
            <Collapse in={showInformationCheck}>

                <Grid container spacing={1} className={classes.main}>
                  <Grid item xs={6}>
                    <Link href='/nosotros'>
                      <Button
                        fullWidth
                        className={classes.appButtonStyle}
                        variant="contained"
                        xs={6}
                      >   
                        Nosotros
                      </Button>
                    </Link>

                  </Grid>
                  <Grid item xs={6}>
                    <Link href='/servicios'>
                      <Button
                        fullWidth
                        className={classes.appButtonStyle}
                        variant="contained"
                        xs={6}  
                      >   
                        Servicios
                      </Button>
                    </Link>

                  </Grid>
                  <Grid item xs={12}>
                     <Button 
                      fullWidth
                      variant="contained" xs={12} 
                      className={classes.sellButtonStyle}
                    >
                      Vender Propiedad
                    </Button>
                  </Grid>
                </Grid>

             

             </Collapse>
        </Container>
  )
}

export default ShowInformaction
