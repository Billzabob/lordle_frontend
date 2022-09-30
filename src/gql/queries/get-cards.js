import { gql } from '@apollo/client'

export const GET_CARDS = gql`
  query GetCards($language: Language) {
    cards(language: $language) {
      cardCode
      language
      name
    }
  }
`