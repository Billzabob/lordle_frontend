import { CHECK_GUESS, CURRENT_DAY } from '../gql/queries'
import { Fade, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import CardTooltip from '../CardTooltip'
import GuessBox from './GuessBox'
import React, { useEffect } from 'react'
import { resultsDialogState } from '../reactive-vars'

export default React.memo(function GuessRow({ code, animate, index, setResult }) {
  const dayQuery = useQuery(CURRENT_DAY, { fetchPolicy: 'cache-and-network' })
  const currentDay = dayQuery.data?.currentDay?.day
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code, day: currentDay } })
  const guess = data?.guess

  useEffect(() => {
    if (!loading) {
      if (animate) {
        setTimeout(() => {
          setResult({ index, result: guess })
          if (resultsDialogState() === 'incorrect' && guess.correct) resultsDialogState('open')
        }, 2450)
      } else {
        setResult({ index, result: guess })
        if (resultsDialogState() === 'incorrect' && guess.correct) resultsDialogState('closed')
      }
    }
  })

  if (loading || !currentDay) return <div style={{ height: '200px' }}></div>

  return (
    <Grid container columns={12} spacing={2} minWidth={'868px'}>
      <Grid item xs={2}>
        <CardTooltip image={guess.image} name={guess.name}>
          <Fade
            appear={animate}
            in
            timeout={750}
            style={{ transitionDelay: '350ms' }}
          >
            <img src={guess.image} alt={guess.name} style={{ width: '128px', height: '193px' }} />
          </Fade>
        </CardTooltip>
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={2}
          correct={guess.regionResult.result === 'PARTIAL' ? 'partial' : guess.regionResult.result === 'CORRECT'}
          text={guess.regionResult.regions.map(cleanName).join(', ')}
          image={getMedia(guess.regionResult.regions.slice().sort().join(''))}
          padding={guess.regionResult.regions.length > 1 ? 1 : null}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={3}
          correct={guess.rarityResult.result === 'CORRECT'}
          text={cleanName(guess.rarityResult.rarity)}
          image={getMedia(guess.rarityResult.rarity)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={4}
          correct={guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(guess.manaCostResult.manaCost)}
          image={getMedia(guess.manaCostResult.result === 'CORRECT' ? guess.manaCostResult.manaCost : guess.manaCostResult.result)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={5}
          correct={guess.typeResult.result === 'CORRECT'}
          text={cleanName(guess.typeResult.type)}
          image={getMedia(guess.typeResult.type)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={6}
          correct={guess.setResult.result === 'CORRECT'}
          text={cleanName(guess.setResult.set)}
          image={getMedia(guess.setResult.set)}
        />
      </Grid>
    </Grid>
  )
}, (a, b) => a.code === b.code)

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
