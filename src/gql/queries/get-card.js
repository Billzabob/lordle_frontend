import { gql } from '@apollo/client'

export const GET_CARDS_FOR_DAY = gql`
query GetCardsFromYesterday($daysBack: Int!, $currentDay: Int!) {
  cardsForDay(daysBack: $daysBack, currentDay: $currentDay) {
    cardCode
    name
    backgroundImage
  }
}
`