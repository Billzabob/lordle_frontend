import { gql } from '@apollo/client'

export const COUNTDOWN_QUERY = gql`
  query Countdown {
    nextCardTimeSeconds
  }
`