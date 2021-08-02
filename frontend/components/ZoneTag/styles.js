import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({
    button: {
        display: 'flex',
        justifyContent: 'space-around',
        width: 227,
        height: 40,
        padding: 0,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: '0px 15px 15px 0px',
    }, 
    text: {
        color: "4A4C4B",
        fontWeight: 700,
    }, 
    icon: {
        width: 20,
        height: 20,
        color: "4a4c4b",
    }
}))