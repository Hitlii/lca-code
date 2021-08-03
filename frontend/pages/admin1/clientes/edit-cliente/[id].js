
import ClientForm from '../../../../components/ClientForm'
import {Fragment} from 'react'

import Link from 'next/link'


import client from "../../../../lib/apollo-client"
import {GET_CLIENTS,GET_CLIENT} from "../../../../graphql/queries"


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
    },
})


export default function clientPage(props) {
    const classes = useStyles()

    const editClient = props.client
   
    return (
        <Fragment>
            <AppBar position='static' elevation={0} className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <Link href='/admin1/clientes'>
                        <IconButton className={classes.iconButton} href='/admin1/clientes'>
                            <ChevronLeftIcon className={classes.icon}/>
                        </IconButton>
                    </Link>
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




export  async function getStaticPaths(){ 
    const {data} = await client.query({query:GET_CLIENTS})

    const paths = data.getClients.map((client)=>({
        params:{id:client._id}
    }))

    return {
        paths,
        fallback:false
    }
}


export async function getStaticProps({params}){
    const {data} = await client.query({query:GET_CLIENT,variables:{id:params.id}})

    return {
        props:{
            client:data.getClient
        }
    } 
}

