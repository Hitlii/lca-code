// Todos lo clientes.

import { GET_ALL_CLIENTS } from '../../../graphql/queries'
import { useQuery } from '@apollo/client';

import ClientCard from '../../../components/cards/ClientCard'
import NavBar from '../../../components/bars/NavBar'

import { 
    IconButton,
    InputBase,
    Paper
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { makeStyles } from '@material-ui/core/styles'

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
    }
}))

export default function AllClientsPage(){

    const classes = useStyles()
    const { data, loading, error } = useQuery(GET_ALL_CLIENTS)

    if(loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    if(error) {
        console.log(error)
    }

    const clients = data.getClients
    
    return(
        <div>
            <Paper className={classes.root} elevation={0}>
                <InputBase
                    className={classes.input}
                    placeholder='Buscar Cliente'
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
                            key={client.id}
                        >
                            <ClientCard 
                                client={client}
                            />
                        </div>
                    )
                })}
            <IconButton href='/admin1/clientes/post-cliente' className={classes.addButton}>
              <AddCircleIcon className={classes.addIcon} />
            </IconButton>
            <NavBar/>
        </div>
    )
}