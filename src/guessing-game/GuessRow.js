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
      setResult {
        set
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
          text={data.guess.regionResult.regions.map(cleanName).join(', ')}
          // TODO: Figure out multi-region images
          image={getMedia(data.guess.regionResult.regions[0])}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={2}
          correct={data.guess.rarityResult.result === 'CORRECT'}
          text={cleanName(data.guess.rarityResult.rarity)}
          image={getMedia(data.guess.rarityResult.rarity)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={3}
          correct={data.guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(data.guess.manaCostResult.manaCost)}
          image={getMedia(data.guess.manaCostResult.manaCost)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={4}
          correct={data.guess.typeResult.result === 'CORRECT'}
          text={cleanName(data.guess.typeResult.type)}
          image={getMedia(data.guess.typeResult.type)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={5}
          correct={data.guess.setResult.result === 'CORRECT'}
          text={cleanName(data.guess.setResult.set)}
          image={getMedia(data.guess.setResult.set)}
        />
      </Grid>
    </>
  )
}

function cleanName(name) {
  switch(name) {
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
      return 'Worldwalker'
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
  switch(name) {
    case 'Demacia':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Demacia.webp'
    case 'Ionia':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Ionia.webp'
    case 'Noxus':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Noxus.webp'
    case 'Bilgewater':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Bilgewater.webp'
    case 'BandleCity':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/BandleCity.webp'
    case 'Freljord':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Freljord.webp'
    case 'PiltoverZaun':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/PiltoverZaun.webp'
    case 'Runeterra':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Runeterra.webp'
    case 'ShadowIsles':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/ShadowIsles.webp'
    case 'Shurima':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Shurima.webp'
    case 'Targon':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Targon.webp'
    case 'Champion':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Champion.webp'
    case 'EPIC':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Epic.webp'
    case 'RARE':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Rare.webp'
    case 'COMMON':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Common.webp'
    case 'Unit':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Unit.webp'
    case 'Landmark':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Landmark.webp'
    case 'Spell':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Spell.webp'
    case 'Set1':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_1.webp'
    case 'Set2':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_2.webp'
    case 'Set3':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_3.webp'
    case 'Set4':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_4.webp'
    case 'Set5':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_5.webp'
    case 'Set6':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_6.webp'
    case 'Set6cde':
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Set_6.webp'
    case 0:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/0.webp'
    case 1:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/1.webp'
    case 2:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/2.webp'
    case 3:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/3.webp'
    case 4:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/4.webp'
    case 5:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/5.webp'
    case 6:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/6.webp'
    case 7:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/7.webp'
    case 8:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/8.webp'
    case 9:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/9.webp'
    case 10:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/10.webp'
    case 12:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/12.webp'
    case 15:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/15.webp'
    default:
      return 'https://lor-card-images.s3.us-west-1.amazonaws.com/Mana.webp'
  }
}
