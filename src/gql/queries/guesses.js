import { gql } from '@apollo/client'

export const GUESSES = gql`
  query Guesses {
    guesses {
      cardCode
    }
  }
`