import { AuthProvider } from '../context/auth'
import client from '../lib/apollo-client'
import { ApolloProvider } from '@apollo/client'

import '../styles/globals.css'

export default function App ({ Component, pageProps }) {

  /*
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  */
  
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
