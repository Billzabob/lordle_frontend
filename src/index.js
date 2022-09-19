import './index.css'
import Dashboard from './dashboard'
import React from 'react'
import ReactDOM from 'react-dom/client'
import ApolloClientInitiator from './dashboard/apollo-client-initiator'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<ApolloClientInitiator><Dashboard/></ApolloClientInitiator>)
