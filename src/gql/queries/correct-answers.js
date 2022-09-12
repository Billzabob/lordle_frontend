import { gql } from '@apollo/client'

export const CORRECT_ANSWERS = gql`
query CorrectAnswerCount {
	correctAnswers
}
`