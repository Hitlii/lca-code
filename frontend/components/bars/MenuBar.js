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
    maxWidth: 600,
    minWidth: 320,
    padding:10,
    margin:'auto'
  
  },
  buttonStyle: {
    marginRight:10,
    backgroundColor: '#F2F2F2',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'grey',
      color:'white'
    },
   
  },
  logoStyle: {
    width:87,
    height:40
  },
  


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
     <>
        <Grid container justify="space-between"  className={classes.root}>
            <Grid item xs={4} >
                <Link href='/'>
                    <CardMedia className={classes.logoStyle} image='/LogoOriginalSF.png'/>
                </Link>
            </Grid>
              
            <Grid item container justify="flex-end"  xs={8}>
                  <Link href='/propiedades'>
                    <IconButton  className={classes.buttonStyle} >
                      <SearchIcon />
                    </IconButton>
                  </Link>
              
                  <IconButton className={classes.buttonStyle} onClick={hanleShowContactButton}>
                      <PhoneIcon/>
                  </IconButton>
              
                  <IconButton className={classes.buttonStyle} onClick={hanleShowInformationButton}>
                      <ExpandMoreIcon/>
                  </IconButton>
              
            </Grid>
        </Grid>

        <ShowContact showContactCheck={showContactCheck}/>
        <ShowInformation showInformationCheck={showInformationCheck}/>
      </>
  )
}

export default MenuBar
