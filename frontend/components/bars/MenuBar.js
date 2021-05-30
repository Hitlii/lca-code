import { React, useState } from 'react'
import Link from 'next/link'

import { 
  CardMedia, 
  Container,
  Grid 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import PhoneIcon from '@material-ui/icons/Phone'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import ShowContact from '../ShowContact'
import ShowInformation from '../ShowInformation'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  buttonStyle: {

    margin: 10,
    width: 40,
    height: 40,
    backgroundColor: '#F2F2F2',
    marginRight: 'auto',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'grey'
    },
    ['@media (max-width:320px)']: { // eslint-disable-line no-useless-computed-key
      margin: 5,
      marginTop: 10
    }
  },
  logoStyle: {
    width: 87,
    height: 40,
    margin: 10

  },
  container: {

    [theme.breakpoints.only('xs')]: {
      padding: 0,
      margin: 0
    }

  },
  image: {
    cursor: 'pointer'
  }

}))

function MenuBar () {
  const classes = useStyles()
  
  const [showContactCheck, setShowContactCheck] = useState(false)
  const [showInformationCheck, setshowInformationCheck] = useState(false)
  const hanleShowContactButton = () => {
    setShowContactCheck(current => !current)
    setshowInformationCheck(false)
  }
  const hanleShowInformationButton = () => {
    setshowInformationCheck(current => !current)
    setShowContactCheck(false)
  }

  return (
        <Container maxWidth="lg" className={classes.container} >
        <Grid container justify="center" direction='row'>

            <Grid item xs={6}>
                <Link href='/' className={classes.image}>
                    <CardMedia className={classes.logoStyle} image='/LogoOriginalSF.png'/>
                </Link>
            </Grid>

            <Grid >
            <Link href='/propiedades'>
                <IconButton  className={classes.buttonStyle} >
                    <SearchIcon />
                </IconButton>
                </Link>   
            </Grid>

            <Grid >
                <IconButton className={classes.buttonStyle} onClick={hanleShowContactButton}>
                    <PhoneIcon/>
                </IconButton>
            </Grid>

            <Grid >
                <IconButton className={classes.buttonStyle} onClick={hanleShowInformationButton}>
                    <ExpandMoreIcon/>
                </IconButton>

            </Grid>
        </Grid>

        <ShowContact showContactCheck={showContactCheck}/>
        <ShowInformation showInformationCheck={showInformationCheck}/>

        </Container>
  )
}

export default MenuBar
