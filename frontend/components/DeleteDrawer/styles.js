import Paper from '@material-ui/core/Paper'
import { makeStyles, styled } from '@material-ui/core/styles'

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

export const useStyles = makeStyles(({ 
    confirmText: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 400,
        color: 'black',
        paddingTop: 20,
    },
}))