import { gql } from '@apollo/client'

export const GET_CARDS_FOR_DAY = gql`
query GetCardsFromYesterday($day: Int!) {
  cardsForDay(day: $day) {
    cardCode
    name
    backgroundImage
  }
}
`