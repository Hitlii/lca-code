import { AuthProvider } from '../context/auth'
import client from '../lib/apollo-client'
import { ApolloProvider } from '@apollo/client'

import '../styles/globals.css'

export default function App ({ Component, pageProps }) {
  
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </AuthProvider>
    </ApolloProvider>
  )
}
