import {Fragment} from 'react'
import {gql} from '@apollo/client';
import client from "../../../lib/apollo-client";
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { GET_TICKET } from '../../../graphql/queries'

import TicketForm from '../../../components/forms/TicketForm'
import LoadingCircle from '../../../components/LoadingCircle'

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

export default function EditTicket(props){

    const classes = useStyles()
    const router = useRouter()
    
    if(props.error) return <h2> Some error occurred..</h2>

    const { data, loading, error } = useQuery(GET_TICKET,
        {
            variables: {
                _id: router.query.ID
            }
        })

    if(loading) return <LoadingCircle />
    
    if(error) return `Error! ${error}`

    const editTicket = data.getTicket

    console.log(editTicket)

    return(
        <Fragment>
            <AppBar position='static' elevation={0} className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.iconButton} href='/admin1'>
                        <ChevronLeftIcon className={classes.icon}/>
                    </IconButton>
                    <Typography className={classes.typo}>
                        Crear Ticket
                    </Typography>
                </Toolbar>
            </AppBar>
            <TicketForm
                editTicket={editTicket}
                autoCompleteClients={props.clients} 
            />
        </Fragment>
    )
}

export async function getStaticProps(){
    const GET_ALL_CLIENTS = gql`
        query GetAllClients{
            getClients{
                _id
                name
                contact{
                    phone
                    email
                }
            }
        }
    `
     const { data } = await client.query({query: GET_ALL_CLIENTS})
    
    if(!data) return {
        props: {
            error: 'Error'
        }
    }
    return{
        props: {
            clients: data.getClients
        }
    }
}


