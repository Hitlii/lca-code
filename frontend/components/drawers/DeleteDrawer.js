import React from 'react'

import {
    Drawer,
    Typography
} from '@material-ui/core'
import DeleteButton from '../buttons/DeleteButton'
import { drawerStyles, DeletePaper } from '../../styles/DrawerStyles'

function DeleteDrawer({ open, onClose, onDelete}) {
    const drawerClasses = drawerStyles()
    return (
        <Drawer
                PaperProps={{ component: DeletePaper }}
                anchor='bottom'
                open={open}
                onClose={onClose}
            >
                <Typography className={drawerClasses.confirmText}>
                    ¿Estás seguro?
                </Typography>
                <DeleteButton onClick={onDelete}/>
        </Drawer>
    )
}

export default DeleteDrawer
