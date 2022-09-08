import { gql } from '@apollo/client';

export const INCREMENT_CORRECT_COUNT = gql`
  mutation IncrementCorrectAnswers {
    incrementCorrectAnswers
  }
`