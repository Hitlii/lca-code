import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({
    card: {
        display: 'flex',
        width: 340,
        height: 100,
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        width: 186,
        margin: 0,
    },
    cover: {
        width: 100,
        height: 100,
        borderRadius:5,
        cursor: 'pointer',
    },
    button: {
        padding: 0,
        marginBottom: 50
    },
    iconButton: {
        padding: 0,
        margin: 0
    },
    code: {
        fontSize: 12
    }, 
    location : {
        fontSize: 14
    },
    blueZoneDot: {
        fontSize: 10,
        marginRight: 5,
        color: '#01509D',
    },
    greenZoneDot: {
        fontSize: 10,
        marginRight: 5,
        color: '#6DB432',
    },
    redZoneDot: {
        fontSize: 10,
        marginRight: 5,
        color: '#E41E2B',
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