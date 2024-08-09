import React from 'react'
import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { NoSsr } from '@material-ui/core'
import { LoginForm } from '../components'

export default function Home({ loggedIn, setLoggedIn }) {
  useEffect(() => {
    if (loggedIn) {
      Router.push('/dashboard')
    }
  }, [loggedIn])

  const handleSubmit = (authToken) => {
    localStorage.setItem('token', authToken)
    setLoggedIn(true)
  }

  return (
    <div>
      <Head>
        <title>Qwk Merchant</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"></link>
      </Head>
      <NoSsr>
        <LoginForm onSubmit={handleSubmit} />
      </NoSsr>
    </div>
  )
}
