import { makeStyles } from "@material-ui/core/styles"
import {
    gray6,
    messengerBlue,
    neutralLight,
    whatsapp,
} from '../../colors'
export const useStyles = makeStyles(({
    navbar: {
        maxWidth: 600,
        minWidth: 320,
        paddingBottom: 5,
    },
    start: {
        width: '50%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    end: {
        width: '50%',
        display: 'flex',
        justifyContent: 'space-around',
    },
    image: {
        paddingTop: 10
    },
    iconButton: {
        width: 40,
        height: 40,
        color: neutralLight,
        backgroundColor: gray6,
    },
    collapse: {
        maxWidth: 600,
        borderRadius: '0px 0px 15px 15px',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.22);',
        display: 'flex',
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 15,
        backgroundColor: gray6,
        margin: '0px 20px 20px 20px',
        fontFamily: 'Open Sans',
        textTransform: 'none',
        fontSize: 16,
        color: neutralLight,
        fontWeight: 700,
    },
    whatsappIcon: {
        color: whatsapp
    },
    messengerIcon: {
        color: messengerBlue
    },
    text: {
        fontFamily: 'Open Sans',
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: neutralLight,
        marginLeft: 20,
        marginBottom: 10,
    }
}))

export const iconButtonStyle = {
    width: 40,
    height: 40,
    color: neutralLight,
    backgroundColor: gray6,
}

export const buttonStyle = {
    width: 150,
    height: 40,
    borderRadius: 15,
    backgroundColor: gray6,
    margin: '0px 20px 20px 20px',
    fontFamily: 'Open Sans',
    textTransform: 'none',
    fontSize: 16,
    color: neutralLight,
    fontWeight: 700,
}