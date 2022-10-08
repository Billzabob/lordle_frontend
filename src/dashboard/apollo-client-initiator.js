import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist'
import React, { useEffect, useState } from 'react'

export default function ApolloClientInitiator({ children }) {
  const [client, setClient] = useState(null)

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Card: {
            keyFields: ['cardCode', 'language']
          },
          Guess: {
            keyFields: ['cardCode', 'language']
          },
          Guesses: {
            keyFields: ['cardCode', 'language']
          },
          VoiceGuess: {
            keyFields: ['cardCode', 'language']
          },
          Day: {
            keyFields: ['day']
          }
        }
      })

      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      })

      setClient(new ApolloClient({
        uri: 'https://app.lordle.gg/graphql',
        cache,
      }))
    }

    init().catch(console.error)
  }, [])

  if (!client) return null

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}