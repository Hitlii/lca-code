import React from 'react'

import {
    Drawer,
} from '@material-ui/core'

import { StyledPaper } from '../../styles/DrawerStyles'

function CardDrawer({ open, onClose, children }) {
    return (
        <Drawer
            PaperProps={{ component: StyledPaper }}
            anchor='bottom'
            open={open}
            onClose={onClose}
        >
            {children}
        </Drawer>
    )
}

export default CardDrawer
