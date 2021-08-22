import React from 'react'

import { Button } from '@material-ui/core'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'

const useStyles = makeStyles(({
    root: {
        display: 'flex',
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}))

function DeleteButton({ onClick }) {

    const classes = useStyles()

    const ButtonBase = withStyles({
        root: {
            color: 'white',
            backgroundColor: '#d32f2f',
            '&:hover': {
                backgroundColor: '#f44336'
            },
        }
    })(Button)    

    return (
        <ButtonBase
            variant="contained"
            className={classes.root}
            startIcon={<DeleteForeverOutlinedIcon />}
            onClick={onClick}
        >
            Eliminar
      </ButtonBase>
    )
}

export default DeleteButton
