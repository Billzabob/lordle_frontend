import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Dashboard from './dashboard'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://app.lordle.gg/graphql',
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <Dashboard />
  </ApolloProvider>,
)
