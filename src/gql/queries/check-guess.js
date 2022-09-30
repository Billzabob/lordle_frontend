import { gql } from '@apollo/client'

export const CHECK_GUESS = gql`
query CheckGuess($code: String!, $day: Int!, $language: Language) {
  guess(code: $code, day: $day, language: $language) {
    name
    cardCode
    image
    language
    correct
    otherCards {
        cardCode
        language
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