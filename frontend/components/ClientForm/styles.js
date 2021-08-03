import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(({
    root: {
        maxWidth: 600,
        minWidth: 320,
        margin: 'auto',
        padding: 10,
    },
    map: {
        display: 'float'
    },
    multiline: {
        width: 320,
        marginBottom: 20
    }
}))

export const defaultInputProps = {
    fullWidth: true,
    size: 'medium',
    margin: 'dense',
    variant: 'filled',
}

export const defaultTypoProps = {
    align: 'left',
    display: 'block',
    gutterBottom: true,
    variant: 'h5'
}

export const requiredInputs ={
    required: true,
    title: 'Por favor, llene este campo.'
}