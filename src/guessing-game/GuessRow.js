import React, { useState } from 'react'
import GuessBox from './GuessBox'
import { Fade, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { CHECK_GUESS } from '../gql/queries'
import WinDialog from './WinDialog'
import CardTooltip from '../CardTooltip'

export default React.memo(function GuessRow({ code, isAnimated = false }) {
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code } })
  const [winDialogState, setWinDialogState] = useState('incorrect')

  if (loading) return null

  if (winDialogState === 'incorrect' && data.guess.correct) {
    setTimeout(() => setWinDialogState('open'), 3500)
  }

  return (
    <>
      <WinDialog
        open={winDialogState === 'open'}
        onClose={() => setWinDialogState('closed')}
        correctCard={data.guess.image}
        otherCards={data.guess?.otherCards?.map(c => c.image)}
      />
      <Grid item xs={2}>
        <CardTooltip image={data.guess.image}>
          <Fade
            in={true}
            timeout={750}
            style={isAnimated ? { transitionDelay: '500ms' } : {}}
          >
            <img src={data.guess.image} alt='card' style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
          </Fade>
        </CardTooltip>
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={2}
          correct={data.guess.regionResult.result === 'CORRECT'}
          text={data.guess.regionResult.regions.map(cleanName).join(', ')}
          // TODO: Figure out multi-region images
          image={getMedia(data.guess.regionResult.regions[0])}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={3}
          correct={data.guess.rarityResult.result === 'CORRECT'}
          text={cleanName(data.guess.rarityResult.rarity)}
          image={getMedia(data.guess.rarityResult.rarity)}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={4}
          correct={data.guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(data.guess.manaCostResult.manaCost)}
          image={getMedia(data.guess.manaCostResult.result === 'CORRECT' ? data.guess.manaCostResult.manaCost : data.guess.manaCostResult.result)}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={5}
          correct={data.guess.typeResult.result === 'CORRECT'}
          text={cleanName(data.guess.typeResult.type)}
          image={getMedia(data.guess.typeResult.type)}
          isAnimated={isAnimated}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={6}
          correct={data.guess.setResult.result === 'CORRECT'}
          text={cleanName(data.guess.setResult.set)}
          image={getMedia(data.guess.setResult.set)}
          isAnimated={isAnimated}
        />
      </Grid>
    </>
  )
})

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
      if (typeof name == 'number') return name + ' Mana'
      return name
  }
}

function getMedia(name) {
  return 'https://lor-card-images.s3.us-west-1.amazonaws.com/' + name + '.webp'
}
