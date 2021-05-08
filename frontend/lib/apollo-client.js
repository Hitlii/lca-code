import { setContext } from '@apollo/client/link/context'
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql'
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
  //link: httpLink,
  cache: new InMemoryCache()
});

export default client