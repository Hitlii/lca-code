import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({
    container: {
        width: 340,
        marginBottom: 10,
    },
    header: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 0
    },
    body: {
        fontSize: 14,
        color: '#4A4C4B'
    },
    icon: {

    },
    button: {
        padding: 0,
        paddingLeft: 20,
    },
    drawerButton: {
        justifyContent: 'left',
        marginLeft: 30,
        padding: '20px 0px 10px 0px'
    }, 
    createIcon: {
        fontSize: 25,
        color: 'black',
        marginRight: 5,
    }, 
    createText: {
        fontSize: 16,
        fontWeight: 400,
        color: 'black',
    },
    deleteIcon: {
        fontSize: 25,
        color: '#EB5757',
        marginRight: 5,
    }, 
    deleteText: {
        fontSize: 16,
        fontWeight: 400,
        color: '#EB5757',
    }, 
    divider: {
        backgroundColor: '#F2F2F2'
    },
    confirmText: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 400,
        color: 'black',
        paddingTop: 20,
    },
    confirmTextIcon: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 400,
        color: 'black',
        paddingTop: 20,
    }
}))