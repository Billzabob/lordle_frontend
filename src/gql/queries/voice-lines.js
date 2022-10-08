import { gql } from '@apollo/client'

export const GET_VOICE_LINES = gql`
  query VoiceLines($day: Int!) {
    voiceLines(day: $day)
  }
`