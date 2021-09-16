import client from '../lib/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '../context/auth'
import ProtectedRoute from '../components/ProtectedRoute'
import { useEffect } from 'react'
import * as ga from '../lib/google-analytics'


import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import Head from 'next/head'
const theme = createMuiTheme()

import '../styles/globals.css'

export default function App ({ Component, pageProps, router }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  
  
  return (
    <>
      <Head>
         {/* PWA primary color */}
         <meta name="theme-color" media="(prefers-color-scheme: dark)" content="black"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <ProtectedRoute router={router}>
              <Component {...pageProps} />
            </ProtectedRoute>
          </ThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  )
}
