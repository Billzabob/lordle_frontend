import { CHECK_GUESS, CURRENT_DAY } from '../gql/queries'
import { correctAnswer, resultsDialogOpen } from '../reactive-vars'
import { Fade, Grid } from '@mui/material'
import { useQuery, useReactiveVar } from '@apollo/client'
import CardTooltip from '../CardTooltip'
import GuessBox from './GuessBox'
import React, { useState } from 'react'
import WinDialog from './WinDialog'

export default React.memo(function GuessRow({ code, animate }) {
  const dayQuery = useQuery(CURRENT_DAY, { fetchPolicy: 'cache-and-network' })
  const currentDay = dayQuery.data?.currentDay?.day
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code, day: currentDay } })
  const [winDialogState, setWinDialogState] = useState('incorrect')
  const resultsOpen = useReactiveVar(resultsDialogOpen)

  if (!loading && winDialogState === 'incorrect' && data.guess.correct) {
    if (animate) {
      setTimeout(() => {
        correctAnswer(true)
        setWinDialogState('open')
      }, 2450)
    } else {
      correctAnswer(true)
      setWinDialogState('closed')
    }
  }

  if (loading || !currentDay) return <div style={{ height: '200px' }}></div>

  // Can move WinDialog out once we move state up
  return (
    <Grid container columns={12} spacing={2} minWidth={'868px'}>
      <WinDialog
        open={winDialogState === 'open' || (resultsOpen && data.guess.correct)}
        onClose={() => {
          setWinDialogState('closed')
          resultsDialogOpen(false)
        }}
        correctCard={data.guess}
        otherCards={data.guess?.otherCards}
      />
      <Grid item xs={2}>
        <CardTooltip image={data.guess.image} name={data.guess.name}>
          <Fade
            appear={animate}
            in
            timeout={750}
            style={{ transitionDelay: '350ms' }}
          >
            <img src={data.guess.image} alt={data.guess.name} style={{ width: '128px', height: '193px' }} />
          </Fade>
        </CardTooltip>
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={2}
          correct={data.guess.regionResult.result === 'PARTIAL' ? 'partial' : data.guess.regionResult.result === 'CORRECT'}
          text={data.guess.regionResult.regions.map(cleanName).join(', ')}
          image={getMedia(data.guess.regionResult.regions.slice().sort().join(''))}
          padding={data.guess.regionResult.regions.length > 1 ? 1 : null}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={3}
          correct={data.guess.rarityResult.result === 'CORRECT'}
          text={cleanName(data.guess.rarityResult.rarity)}
          image={getMedia(data.guess.rarityResult.rarity)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={4}
          correct={data.guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(data.guess.manaCostResult.manaCost)}
          image={getMedia(data.guess.manaCostResult.result === 'CORRECT' ? data.guess.manaCostResult.manaCost : data.guess.manaCostResult.result)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          position={5}
          correct={data.guess.typeResult.result === 'CORRECT'}
          text={cleanName(data.guess.typeResult.type)}
          image={getMedia(data.guess.typeResult.type)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
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
