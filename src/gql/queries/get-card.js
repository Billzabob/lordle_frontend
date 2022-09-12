import { gql } from '@apollo/client'

export const GET_CARDS_FOR_DAY = gql`
query GetCardsFromYesterday($daysBack: Int!) {
  cardsForDay(daysBack: $daysBack) {
    name
  }
}
`