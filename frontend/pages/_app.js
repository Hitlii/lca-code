import React from 'react'
import client from '../lib/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '../context/auth'
import ProtectedRoute from '../components/ProtectedRoute'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme()

import '../styles/globals.css'

export default function App ({ Component, pageProps, router }) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ProtectedRoute router={router}>
            <Component {...pageProps} />
          </ProtectedRoute>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
