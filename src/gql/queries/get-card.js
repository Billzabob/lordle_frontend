import { gql } from '@apollo/client';

export const GET_CARD = gql`
query GetCardFromYesterday($daysBack: Int!) {
  card(daysBack: $daysBack) {
    name
  }
}
`