import React from 'react';
import GuessBox from './GuessBox';
import { Grid } from '@mui/material';
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
    <>
      <Grid item xs={2}>
        <GuessBox
          position={1}
          correct={data.guess.regionResult.result === 'CORRECT'}
          text={data.guess.regionResult.regions.join(', ')}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={2}
          correct={data.guess.rarityResult.result === 'CORRECT'}
          text={data.guess.rarityResult.rarity}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={3}
          correct={data.guess.manaCostResult.result === 'CORRECT'}
          text={data.guess.manaCostResult.manaCost}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={4}
          correct={data.guess.typeResult.result === 'CORRECT'}
          text={data.guess.typeResult.type}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={5}
          correct={data.guess.expansionResult.result === 'CORRECT'}
          text={data.guess.expansionResult.expansion}
        />
      </Grid>
    </>
  )
}