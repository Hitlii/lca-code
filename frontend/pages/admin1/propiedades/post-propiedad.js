import {Fragment} from 'react'

import PropertyForm from '../../../components/forms/PropertyForm'
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import client from "../../../lib/apollo-client";
import {gql} from '@apollo/client';

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

export default function PostPropertyPage(props){

 
    const classes = useStyles()
    
    if(props.error) return <h2> Some error occurred..</h2>

    return(
        <Fragment>
            <AppBar position='static' elevation={0} className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.iconButton} href='/admin1'>
                        <ChevronLeftIcon className={classes.icon}/>
                    </IconButton>
                    <Typography className={classes.typo}>
                        Crear Propiedad
                    </Typography>
                </Toolbar>
            </AppBar>
            <PropertyForm 
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


