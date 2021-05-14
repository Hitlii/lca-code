import { makeStyles } from '@material-ui/core/styles'

export const HorizontalPropertyCardStyle = makeStyles(({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: 347,
        height: 178,
        padding: 0,
        marginBottom: 10,
    },
    coverDiv: {
        height: 178,
        width: 169,
    },
    blueTag:{
        position:'absolute',
        width: 141,
        height: 24,
        backgroundColor: '#01509D',
        left: 28,
        borderRadius: '15px 15px 0px 15px'
    },
    greenTag:{
        position:'absolute',
        width: 140,
        height: 24,
        backgroundColor: '#6DB432',
        left: 29,
        borderRadius: '15px 15px 0px 15px'
    },
    redTag:{
        position:'absolute',
        width: 122,
        height: 24,
        backgroundColor: '#E41E2B',
        left: 47,
        borderRadius: '15px 15px 0px 15px'
    },
    cover: {
        height: 169,
        width: 169,
        marginTop: 9,
        borderRadius: 15,
    }, 
    details: {
        display: 'flex',
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
        padding: '5px 10px',
        fontSize: 10,
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
        display: 'flex',
        width: 207,
        height: 368,
        flexDirection: 'column',
        marginLeft: 10,
        marginBottom: 10,
    },
    coverDiv: {
        height: 219,
        width: 207,
        marginBottom: 5,
    },
    blueTag:{
        position:'absolute',
        width: 141,
        height: 24,
        borderRadius: '15px 15px 15px 0px',
        backgroundColor: '#01509D'
    },
    greenTag:{
        position:'absolute',
        width: 140,
        height: 24,
        borderRadius: '15px 15px 15px 0px',
        backgroundColor: '#6DB432'
    },
    redTag:{
        position:'absolute',
        width: 122,
        height: 24,
        borderRadius: '15px 15px 15px 0px',
        backgroundColor: '#E41E2B'
    },
    cover: {
        width: 207,
        height: 207,
        borderRadius: 15,
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
        padding: '5px 10px',
        fontSize: 10,
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