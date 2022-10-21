import { gql } from '@apollo/client'

export const CHECK_VOICE_GUESS = gql`
  query VoiceLineGuess($code: String!, $day: Int!, $language: String) {
    guessVoice(code: $code, day: $day, language: $language) {
      cardCode
      correct
      image
      name
      language
    }
  }
`
