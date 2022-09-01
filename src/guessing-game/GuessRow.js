import React from 'react';
import GuessBox from './GuessBox';
import { Grid, Tooltip } from '@mui/material';
import { useQuery, gql } from '@apollo/client';

const CHECK_GUESS = gql`
  query CheckGuess($code: String!) {
    guess(code: $code) {
      image
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
`;

export default function GuessRow({ code, isAnimated = false }) {
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code } });

  if (loading) return null

  return (
    <>
      <Grid item xs={2}>
        <Tooltip
          componentsProps={{ tooltip: { sx: { bgcolor: 'transparent' } } }}
          placement='right'
          followCursor={true}
          enterTouchDelay={0}
          title={
            <>
              <img src={data.guess.image} alt='card' style={{ height: '520px', width: '340px' }} />
            </>
          }>
          <img src={data.guess.image} alt='card' style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
        </Tooltip>
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={1}
          correct={data.guess.regionResult.result === 'CORRECT'}
          text={data.guess.regionResult.regions.map(cleanName).join(', ')}
          // TODO: Figure out multi-region images
          image={getMedia(data.guess.regionResult.regions[0])}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={2}
          correct={data.guess.rarityResult.result === 'CORRECT'}
          text={cleanName(data.guess.rarityResult.rarity)}
          image={getMedia(data.guess.rarityResult.rarity)}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={3}
          correct={data.guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(data.guess.manaCostResult.manaCost)}
          image={getMedia(data.guess.manaCostResult.manaCost)}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={4}
          correct={data.guess.typeResult.result === 'CORRECT'}
          text={cleanName(data.guess.typeResult.type)}
          image={getMedia(data.guess.typeResult.type)}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={5}
          correct={data.guess.setResult.result === 'CORRECT'}
          text={cleanName(data.guess.setResult.set)}
          image={getMedia(data.guess.setResult.set)}
          isAnimated={isAnimated}
        />
      </Grid>
    </>
  )
}

function cleanName(name) {
  switch (name) {
    case 'Set1':
      return 'Foundations'
    case 'Set2':
      return 'Rising Tides'
    case 'Set3':
      return 'Call of the Mountain'
    case 'Set4':
      return 'Empires of the Ascended'
    case 'Set5':
      return 'Beyond the Bandlewood'
    case 'Set6':
      return 'Worldwalker'
    case 'Set6cde':
      return 'The Darkin Saga'
    case 'RARE':
      return 'Rare'
    case 'EPIC':
      return 'Epic'
    case 'COMMON':
      return 'Common'
    case 'BandleCity':
      return 'Bandle City'
    case 'PiltoverZaun':
      return 'Piltover & Zaun'
    default:
      return name
  }
}

function getMedia(name) {
  return 'https://lor-card-images.s3.us-west-1.amazonaws.com/' + name + ".webp"
}
