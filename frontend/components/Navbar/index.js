import React, { useState } from 'react'
import { 
    useStyles,
    iconButtonStyle,
    buttonStyle
 } from './styles'

import {
    AppBar,
    Button,
    Collapse,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core'

import Image from 'next/image'
import Link from 'next/link'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PhoneIcon from '@material-ui/icons/Phone'
import SearchIcon from '@material-ui/icons/Search'

import { FaFacebookMessenger } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'

export default function Navbar() {
    const classes = useStyles()
    const [firstCollapse, setFirstCollapse] = useState(false)
    const [secondCollapse, setSecondCollapse] = useState(false)
    const onClickFirstCollapse = () => {
        setSecondCollapse(false)
        setFirstCollapse(current => !current)
    }
    const onClickSecondCollapse = () => {
        setFirstCollapse(false)
        setSecondCollapse(current => !current)
    }
    return (
        <AppBar position='static' elevation={0} className={classes.navbar} style={{ backgroundColor:"#FFFFFF"}}> 
            <Toolbar>
                <div className={classes.start}>
                    <Link href='/' passHref>
                        <a>
                            <div className={classes.image}>
                                <Image
                                    src='/LogoOriginalSF.png'
                                    width={122}
                                    height={56}
                                    layout='fixed'
                                />
                            </div>
                        </a>
                    </Link>
                </div>
                <div className={classes.end}>
                    <Link href='/propiedades'>
                        <IconButton style={iconButtonStyle}>
                            <SearchIcon />
                        </IconButton>
                    </Link>
                    <IconButton style={iconButtonStyle} onClick={onClickFirstCollapse}>
                        <PhoneIcon />
                    </IconButton>
                    <IconButton style={iconButtonStyle} onClick={onClickSecondCollapse}>
                        <ExpandMoreIcon />                        
                    </IconButton>
                </div>
            </Toolbar>
            <Collapse in={firstCollapse} timeout='auto' unmountOnExit className={classes.collapse}>
                <Typography className={classes.text} variant='h6'>Contactar por</Typography>
                <Link href='https://api.whatsapp.com/send?phone=+526653922230' passHref>
                    <a target='_blank'>
                        <Button
                            style={buttonStyle}
                            startIcon={<RiWhatsappFill className={classes.whatsappIcon}/>}
                        >
                            WhatsApp
                        </Button>
                    </a>
                </Link>
                <Link href='https://www.facebook.com/lcabienesraices' passHref>
                    <a target='_blank'>
                        <Button
                            style={buttonStyle}
                            startIcon={<FaFacebookMessenger className={classes.messengerIcon}/>}
                        >
                            Messenger
                        </Button>
                    </a>
                </Link>
            </Collapse>
            <Collapse in={secondCollapse} timeout='auto' unmountOnExit className={classes.collapse}>
                <Link href='/nosotros'>
                    <Button style={buttonStyle}>
                        Nosotros
                    </Button>
                </Link>
                <Link href='/servicios'>
                    <Button style={buttonStyle}>
                        Servicios
                    </Button>
                </Link>
            </Collapse>
        </AppBar>
    )
}

