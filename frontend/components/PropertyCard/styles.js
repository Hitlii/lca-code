import { makeStyles } from '@material-ui/core/styles'

export const HorizontalPropertyCardStyle = makeStyles(({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minWidth: 320,
        height: 250,
        padding: 0,
        marginBottom: 20,
    },
    coverDiv: {
        display: 'flex',
        height: 207,
        width: '55%',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    cover: {
        zIndex: 1,
        marginTop: 9,
        borderRadius: 5,
    }, 
    details: {
        display: 'flex',
        height: '100%',
        width: '45%',
        flexDirection: 'column',
        paddingBottom: 0,
        marginLeft: 10,
    },
    content: {
        paddingBottom: 0
    },
    statusBlueBackground: {
        height: 25,
        width: 70,
        backgroundColor: '#01509D',
        borderRadius: 15,
    },
    statusGreenBackground: {
        height: 25,
        width: 70,
        backgroundColor: '#6DB432',
        borderRadius: 15,
    },
    statusRedBackground: {
        height: 25,
        width: 70,
        backgroundColor: '#E41E2B',
        borderRadius: 15,
    },
    statusText: {
        color: 'white',
        paddingLeft: 10,
        paddingTop: 2,
        fontSize: 16,
        fontFamily: 'Bebas Neue'
    },
    area: {
        color: '#4A4C4B',
        fontSize: 16,
        fontWeight: 700
    }, 
    address: {
        color: '#BDBDBD',
        fontWeight: 300
    }, 
    cityState: {
        color: '#BDBDBD',
        fontWeight: 700
    }, 
    price: {
        color: '#6DB432',
        fontWeight: 600
    }, 
    specialPrice: {
        color: '#BDBDBD',
        fontWeight: 400
    }
}))

export const VerticalPropertyCardStyle = makeStyles(({
    root: {
        position: 'relative',
        display: 'flex',
        width: 207,
        height: 380,
        flexDirection: 'column',
        marginRight: 20,
        
    },
    coverDiv: {
        height: 219,
        width: 207,
        marginBottom: 5,
        cursor: 'pointer',
    },
    cover: {
        zIndex: 1,
        width: 207,
        height: 207,
        borderRadius: 5,
        marginTop: 12,
    }, 
    details: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
    },
    content: {
        padding: 0
    },
    statusBlueBackground: {
        height: 25,
        width: 70,
        backgroundColor: '#01509D',
        marginTop:5,
        marginBottom: 10,
        marginleft:0,
        
        borderRadius: 15,
    },
    statusGreenBackground: {
        height: 25,
        width: 70,
        backgroundColor: '#6DB432',
        marginTop:5,
        marginBottom: 5,
        marginleft:0,
        borderRadius: 15,
    },
    statusRedBackground: {
        height: 25,
        width: 70,
        backgroundColor: '#E41E2B',
        marginTop:5,
        marginBottom: 10,
        marginleft:0,
        borderRadius: 15,
    },
    statusText: {
        color: 'white',
        padding: '2px 10px',
        fontSize: 16,
        fontFamily: 'Bebas Neue'
    },
    area: {
        color: '#4A4C4B',
        fontSize: 16,
        fontWeight: 700,
    }, 
    address: {
        color: '#BDBDBD',
        fontWeight: 300
    }, 
    cityState: {
        color: '#BDBDBD',
        fontWeight: 700
    }, 
    price: {
        color: '#6DB432',
        fontWeight: 600
    }, 
    specialPrice: {
        color: '#BDBDBD',
        fontWeight: 400
    }
}))