// Todos lo clientes.
import React, { useEffect, useState } from 'react'
import client from "../../../lib/apollo-client";
import { useRouter } from 'next/router'
import {GET_CLIENTS} from "../../../graphql/queries"
import Link from 'next/link'

import ClientCard from '../../../components/ClientCard'
import AdminNavbar from '../../../components/AdminNavbar'

import { 
    IconButton,
    InputBase,
    Paper
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles((theme)=>({
    root: {
        margin: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 340,
        height: 40,
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        color: 'black'
      },
      iconButton: {
        padding: 10
      },
      divider: {
        height: 28,
        margin: 4
      },
    clientCard: {
        display: 'flex',
        justifyContent: 'center',
    },
    addButton: {
        position: 'fixed',
        bottom: 60,
        right: 25,
        color: '#4CAF50',
        padding: 0,
    },
    addIcon: {
        width: 60,
        height: 60,
    },
}))

export default function AllClientsPage(props){

    const classes = useStyles()
    const router = useRouter()
    const [clientName,setClientName]=useState()
    const [clients,setClients]=useState(props.clients)
    const refreshData = () => {
        router.replace(router.asPath);
    }

    // useEffect(() => {
    //     refreshData()
    // }, [props])

    
    if(props.error) {
        console.log(props.error)
        return (
            <h1> Some error occurred...</h1>
        )
    }
    
    async function findClient(){
        const { data } = await client.query({query: GET_CLIENTS,variables:{name:clientName}})
        console.log(data)
        setClients(data.getClients)
    }

    function onChange(e){ 
        setClientName(e.target.value)
        
    }

    function handleSubmit(e){
        e.preventDefault()
        findClient()
    }
    
    return(
        <div>
            <Paper className={classes.root} elevation={0}>
                <InputBase
                    className={classes.input}
                    onChange={onChange}
                    placeholder='Buscar Cliente'
                    onKeyPress={(e)=>{if(e.key === "Enter"){handleSubmit(e)}}}
                    variant='outlined'
                />
                <IconButton type="submit" className={classes.iconButton}>
                    <SearchIcon />
                </IconButton>
            </Paper>
            {clients.map((client) => {
                return (
                    <div 
                        className={classes.clientCard}
                        key={client._id}
                    >
                        <ClientCard 
                            client={client}
                        />
                    </div>
                )
            })}
            
            <Link href='/admin1/clientes/post-cliente'>
                <IconButton className={classes.addButton}>
                    <AddCircleIcon className={classes.addIcon} />
                </IconButton>
            </Link>
            <AdminNavbar/>
        </div>
    )
}

export async function getStaticProps(){

    const { data } = await client.query({query: GET_CLIENTS})
    
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