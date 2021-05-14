// Estara el formulario de clientes
import {Fragment} from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { GET_CLIENT } from '../../../graphql/queries'
import ClientForm from '../../../components/forms/ClientForm'
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'


const useStyles = makeStyles({
    appbar: {
        padding: 0,
        marginBottom: 20,
    },
    toolbar: {
        padding: 0,
        margin: 0,
        backgroundColor: 'white'
    },
    iconButton: {
        margin: 10,
        padding: 0,
        width:40,
        height:40,
        backgroundColor: '#f2f2f2'
    },
    icon: {
        width: 20,
        height: 20
    },
    typo: {
        color: 'black'
    }
})

export default function EditClientPage(){
    
    const classes = useStyles()
    const router = useRouter()
    const id = router.query.ID

    console.log(id)

    const { loading, error, data } = useQuery(GET_CLIENT, {
        variables: {
            id: id
        }
    })

    if(loading) return null

    if(error) return `Error! ${error}`

    const editClient = data.getClient

    return(
        <Fragment>
            <AppBar position='static' elevation={0} className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.iconButton} href='/admin1/clientes'>
                        <ChevronLeftIcon className={classes.icon}/>
                    </IconButton>
                    <Typography className={classes.typo}>
                        Editar cliente
                    </Typography>
                </Toolbar>
            </AppBar>
            <ClientForm 
                editClient={editClient}
            />
        </Fragment>
    )
}