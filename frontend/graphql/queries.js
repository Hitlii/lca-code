import { gql } from '@apollo/client'

export const GET_ALL_CLIENTS = gql 
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
query getClient($id: ID!) {
    getClient(id: $id) {
        id
        name
        birthday
        gender
        contact {
            email
            phone
        }
        location {
            city
            state
            address
        }
    }
}
`
