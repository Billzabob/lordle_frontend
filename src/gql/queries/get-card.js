import { gql } from '@apollo/client'

export const GET_CARDS_FOR_DAY = gql`
query GetCardsFromYesterday($day: Int!, $language: Language) {
  cardsForDay(day: $day, language: $language) {
    cardCode
    language
    name
    backgroundImage
  }
}
`