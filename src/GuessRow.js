import React from 'react';
import GuessBox from './GuessBox';
import Stack from '@mui/material/Stack';
import { useQuery, gql } from '@apollo/client';

const CHECK_GUESS = gql`
  query CheckGuess($code: String!) {
    guess(code: $code) {
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
      expansionResult {
        expansion
        result
      }
    }
  }
`;

export default function GuessRow({code}) {
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code } });

  if (loading) return null

  return (
    <Stack direction="row">
      <GuessBox
        correct={data.guess.regionResult.result === 'CORRECT'}
        text={data.guess.regionResult.regions.join(', ')}
      />
      <GuessBox
        correct={data.guess.rarityResult.result === 'CORRECT'}
        text={data.guess.rarityResult.rarity}
      />
      <GuessBox
        correct={data.guess.manaCostResult.result === 'CORRECT'}
        text={data.guess.manaCostResult.manaCost}
      />
      <GuessBox
        correct={data.guess.typeResult.result === 'CORRECT'}
        text={data.guess.typeResult.type}
      />
      <GuessBox
        correct={data.guess.expansionResult.result === 'CORRECT'}
        text={data.guess.expansionResult.expansion}
      />
    </Stack>
  )
}