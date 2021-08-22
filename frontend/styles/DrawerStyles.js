import Paper from '@material-ui/core/Paper'
import { makeStyles, styled } from '@material-ui/core/styles'


export const drawerStyles = makeStyles(({
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

export const StyledPaper = styled(Paper)({
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 0,
    borderRadius: '15px 15px 0px 0px',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.25)',
    paddingBottom: 20,
    maxWidth: 600,
})

export const DeletePaper = styled(Paper)({
    display: 'flex',
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 0,
    borderRadius: '15px 15px 0px 0px',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.25)',
    paddingBottom: 20,
    maxWidth: 600,
    paddingBottom: 30,
})

export const StyledPaperLarge = styled(Paper)({
    display: 'flex',
    top:100,
    marginRight: 'auto',
    marginLeft: 'auto',
    padding: 0,
    borderRadius: '15px 15px 0px 0px',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.25)',
    paddingBottom: 20,
    maxWidth: 600,
})

