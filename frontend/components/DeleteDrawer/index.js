import React from 'react'

import {
    Drawer,
    Typography
} from '@material-ui/core'
import DeleteButton from '../DeleteButton'
import { DeletePaper, useStyles } from './styles'

function DeleteDrawer({ open, onClose, onDelete}) {
    const classes = useStyles()
    return (
        <Drawer
                PaperProps={{ component: DeletePaper }}
                anchor='bottom'
                open={open}
                onClose={onClose}
            >
                <Typography className={classes.confirmText}>
                    ¿Estás seguro?
                </Typography>
                <DeleteButton onClick={onDelete}/>
        </Drawer>
    )
}

export default DeleteDrawer
