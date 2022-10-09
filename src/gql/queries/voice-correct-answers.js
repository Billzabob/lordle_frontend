import { gql } from '@apollo/client'

export const VOICE_CORRECT_ANSWERS = gql`
  query VoiceCorrectAnswers {
    correctAnswers: correctVoiceAnswers
  }
`