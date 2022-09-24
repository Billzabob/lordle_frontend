import { gql } from '@apollo/client'

export const CHECK_GUESS = gql`
query CheckGuess($code: String!, $day: Int!) {
  guess(code: $code, day: $day) {
    name
    cardCode
    image
    correct
    otherCards {
        cardCode
				image
        name
			}
    regionResult {
      regions
      result
    }
    rarityResult {
      rarity
      result
    }
    manaCostResult {
      manaCost
      result
    }
    typeResult {
      type
      result
    }
    setResult {
      set
      result
    }
  }
}
`