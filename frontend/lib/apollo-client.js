import { setContext } from '@apollo/client/link/context'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'https://uuuc0ty1s6.execute-api.us-east-1.amazonaws.com/dev/graphql'
});

const authLink = setContext(() => {
  let token
  if(typeof window !== 'undefined') {
    token = localStorage.getItem('token')
  } 
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({addTypename: false})
});

export default client