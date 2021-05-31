
// Material UI  ------------------------------
import Grid from '@material-ui/core/Grid'
import { Typography, Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// My Imports --------------------------------
import { 
  green, 
  grey6, 
  lightGrey,
  white,
  darkNeutral,
  whatsappColor, 
  messengerColor,
  lightNeutral
} from '../public/colors'

import Collapse from './collapse'

// Icons --------------------------------
import {RiWhatsappFill} from 'react-icons/ri'
import { FaFacebookMessenger } from 'react-icons/fa'


import Link from 'next/link'

const useStyles = makeStyles((theme) => ({

  contactTextStyle: {
    fontSize: 18,
    margin: 'auto',
    [theme.breakpoints.only('xs')]: {
      fontSize: 18
    }
  },
  contact:{
    maxWidth:280,
    margin: 'auto',
  },
  button: {
    marginBottom:30,
    height: 40,
    borderRadius: 15,
    backgroundColor: lightGrey,
    textTransform:'capitalize',
    color: lightNeutral
  
  },

  collapseStyle: {
    borderRadius: 15,
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.22);'
  },
  whatsappIconStyle: {
    width: 30,
    height: 30, 
    color: whatsappColor
  },
  messengerIconStyle: {
    width: 24,
    height: 24,
    color: messengerColor
  },
  container: {
    padding: 0,
    margin: 'auto',
    maxWidth: 600,
    
  },
  link: {
    textDecoration: 'none'
  }
}))

const ShowContact = ({ showContactCheck }) => {
  const classes = useStyles()

  return (

        <Container className={classes.container} >
            <Collapse in={showContactCheck} className={classes.collapseStyle}>
                <Grid container spacing={1}  className={classes.contact} justify='center' >
                  <Grid item xs={12}>
                    <Typography variant="h6" display="block" align="left" className={classes.contactTextStyle}>Contactar por</Typography>
                  </Grid>

                <Grid item xs={6}>
                  <a 
                    className={classes.link} 
                    target='_blank' 
                    href='https://api.whatsapp.com/send?phone=+526653922230' 
                    rel='noopener noreferrer'>
                      <Button variant="text"
                          fullWidth
                          className={classes.button}
                          startIcon={<RiWhatsappFill className={classes.whatsappIconStyle}/>}
                      > Whatsapp
                      </Button>
                  </a>
                </Grid>     
                <Grid item xs={6}>
                  <a className={classes.link} target='_blank' href='https://www.facebook.com/lcabienesraices' rel='noopener noreferrer'>
                      <Button
                          variant="text" 

                          fullWidth
                          className={classes.button}
                          startIcon={<FaFacebookMessenger className={classes.messengerIconStyle}/>}
                      > Messenger
                      </Button>
                  </a>
                </Grid>


                </Grid>
            </Collapse>
        </Container>

  )
}

export default ShowContact
