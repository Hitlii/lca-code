import client from '../lib/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '../context/auth'
import ProtectedRoute from '../components/ProtectedRoute'

import '../styles/globals.css'

export default function App ({ Component, pageProps, router }) {
  
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ProtectedRoute router={router}>
          <Component {...pageProps} />
        </ProtectedRoute>
      </AuthProvider>
    </ApolloProvider>
  )
}
