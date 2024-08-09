import React, { useEffect, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from '@material-ui/styles'
import Router from 'next/router'
import client from '../client/apollo-client'
import theme from '../theme'
import { Topbar } from '../components'

function App({ Component, pageProps }) {
  const [authToken, setToken] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')

    // TODO: Handle token expiry for merchants.

    if (token) {
      setToken(token)
      setLoggedIn(true)
    } else {
      setToken('')
      setLoggedIn(false)
      Router.push('/')
    }
  }, [loggedIn])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {loggedIn && <Topbar />}
        <Component {...pageProps} token={authToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
