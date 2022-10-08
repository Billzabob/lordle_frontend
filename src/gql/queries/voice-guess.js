import { gql } from '@apollo/client'

export const CHECK_VOICE_GUESS = gql`
  query VoiceLineGuess($code: String!, $day: Int!) {
    guessVoice(code: $code, day: $day) {
      cardCode
      correct
      image
      name
      language
    }
  }
`