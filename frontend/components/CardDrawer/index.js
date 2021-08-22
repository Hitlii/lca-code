import React from 'react'
import { styledPaper } from './styles'
import Drawer from '@material-ui/core/Drawer'

function CardDrawer({ open, onClose, children}) {
    return (
        <Drawer
            PaperProps={{component: styledPaper }}
            anchor='bottom'
            open={open}
            onClose={onClose}
        >
            {children}
        </Drawer>
    )
}

export default CardDrawer
