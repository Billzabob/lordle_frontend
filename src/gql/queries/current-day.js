import { gql } from '@apollo/client'

export const CURRENT_DAY = gql`
  query CurrentDay {
		currentDay {
      day
    }
  }
`