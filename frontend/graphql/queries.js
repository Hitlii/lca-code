import { gql } from '@apollo/client'

export const GET_CLIENTS = gql 
`
query getClients  {
    getClients {
        id
        name
        birthday
        gender
        contact {
        email
        phone
        }
        location {
            state
            city
            address
        }
    }
}
`

export const GET_CLIENT = gql 
`
query getClient($name: String!) {
    getClient(name: $name) {
        id
        name
    }
}
`