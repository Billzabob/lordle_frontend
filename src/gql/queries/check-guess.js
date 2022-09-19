import { gql } from '@apollo/client'

export const CHECK_GUESS = gql`
query CheckGuess($code: String!) {
  guess(code: $code) {
    cardCode
    image
    correct
    otherCards {
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