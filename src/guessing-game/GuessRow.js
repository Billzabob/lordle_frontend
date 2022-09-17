import React, { useState } from 'react'
import GuessBox from './GuessBox'
import { Fade, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { CHECK_GUESS } from '../gql/queries'
import WinDialog from './WinDialog'
import CardTooltip from '../CardTooltip'

export default React.memo(function GuessRow({ code }) {
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code } })
  const [winDialogState, setWinDialogState] = useState('incorrect')

  if (loading) return <div style={{ height: '200px' }}></div>

  if (winDialogState === 'incorrect' && data.guess.correct) {
    setTimeout(() => setWinDialogState('open'), 3500)
  }

  return (
    <Grid container columns={12} spacing={2} minWidth={'868px'}>
      <WinDialog
        open={winDialogState === 'open'}
        onClose={() => setWinDialogState('closed')}
        correctCard={data.guess}
        otherCards={data.guess?.otherCards}
      />
      <Grid item xs={2}>
        <CardTooltip image={data.guess.image} name={data.guess.name}>
          <Fade
            in
            timeout={750}
            style={{ transitionDelay: '500ms' }}
          >
            <img src={data.guess.image} alt={data.guess.name} style={{ width: '128px', height: '193px' }} />
          </Fade>
        </CardTooltip>
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={2}
          correct={data.guess.regionResult.result === 'PARTIAL' ? 'partial' : data.guess.regionResult.result === 'CORRECT'}
          text={data.guess.regionResult.regions.map(cleanName).join(', ')}
          image={getMedia(data.guess.regionResult.regions.slice().sort().join(''))}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={3}
          correct={data.guess.rarityResult.result === 'CORRECT'}
          text={cleanName(data.guess.rarityResult.rarity)}
          image={getMedia(data.guess.rarityResult.rarity)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={4}
          correct={data.guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(data.guess.manaCostResult.manaCost)}
          image={getMedia(data.guess.manaCostResult.result === 'CORRECT' ? data.guess.manaCostResult.manaCost : data.guess.manaCostResult.result)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={5}
          correct={data.guess.typeResult.result === 'CORRECT'}
          text={cleanName(data.guess.typeResult.type)}
          image={getMedia(data.guess.typeResult.type)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          position={6}
          correct={data.guess.setResult.result === 'CORRECT'}
          text={cleanName(data.guess.setResult.set)}
          image={getMedia(data.guess.setResult.set)}
        />
      </Grid>
    </Grid>
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
    case 'ShadowIsles':
      return 'Shadow Isles'
    default:
      if (typeof name == 'number') return name + ' Mana'
      return name
  }
}

function getMedia(name) {
  return 'https://lor-card-images.s3.us-west-1.amazonaws.com/' + name + '.webp'
}
