import { useApolloClient, useQuery } from "@apollo/client"
import { GUESSES } from "./gql/queries"

export default function useGuesses() {
  const client = useApolloClient()
  const { data } = useQuery(GUESSES, { fetchPolicy: 'cache-only' })
  const guesses = data?.guesses || []

  const setGuess = (guess) => {
    client.writeQuery({
      query: GUESSES,
      data: {
        guesses: [
          {
            __typename: 'Guesses',
            cardCode: guess
          }, ...guesses
        ]
      },
    })
  }

  return [guesses, setGuess]
}
