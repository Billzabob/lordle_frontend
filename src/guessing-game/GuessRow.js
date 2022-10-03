import { CHECK_GUESS, CURRENT_DAY } from '../gql/queries'
import { getImagePath } from '../util'
import { Grid } from '@mui/material'
import { resultsDialogState } from '../reactive-vars'
import { useQuery } from '@apollo/client'
import CardFlip from './CardFlip'
import CardTooltip from '../CardTooltip'
import GuessBox from './GuessBox'
import React, { useEffect, useState } from 'react'

export default React.memo(function GuessRow({ code, animate, index, setResult, language }) {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { loading, data } = useQuery(CHECK_GUESS, { variables: { code, language, day: currentDay } })
  const [imagesCount, setImagesCount] = useState(0)
  const [doneAnimating, setDoneAnimating] = useState(false)
  const imagesLoaded = imagesCount === 6
  useEffect(() => {
    if (!loading) {
      if (animate && doneAnimating) {
        setResult({ index, result: guess })
        if (resultsDialogState() === 'incorrect' && guess.correct) resultsDialogState('open')
      } else if (!animate) {
        setResult({ index, result: guess })
        if (resultsDialogState() === 'incorrect' && guess.correct) resultsDialogState('closed')
      }
    }
  })

  if (loading) return (
    <Grid container columns={12} spacing={2} minWidth={'868px'} >
      {
        [0, 1, 2, 3, 4, 5].map(i =>
          <Grid key={i} item xs={2}>
            <img src='https://lor-card-images.s3.us-west-1.amazonaws.com/cardback.webp' alt='cardback' style={{ width: '128px', height: '193px' }} />
          </Grid>
        )
      }
    </Grid>
  )

  const guess = data.guess
  const image = getImagePath(code, 150)

  return (
    <Grid container columns={12} spacing={2} minWidth={'868px'} >
      <Grid item xs={2}>
        <CardFlip delay={350} animate={animate} run={imagesLoaded}>
          <CardTooltip code={code} name={guess.name}>
            <img
              src={image}
              alt={guess.name || ''}
              style={{ width: '128px', height: '193px', filter: 'drop-shadow(5px 5px 5px black)' }}
              onLoad={() => setImagesCount(i => i + 1)}
            />
          </CardTooltip>
        </CardFlip>
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          run={imagesLoaded}
          onLoad={() => setImagesCount(i => i + 1)}
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
          run={imagesLoaded}
          onLoad={() => setImagesCount(i => i + 1)}
          position={3}
          correct={guess.rarityResult.result === 'CORRECT'}
          text={cleanName(guess.rarityResult.rarity)}
          image={getMedia(guess.rarityResult.rarity)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          run={imagesLoaded}
          onLoad={() => setImagesCount(i => i + 1)}
          position={4}
          correct={guess.manaCostResult.result === 'CORRECT'}
          text={cleanName(guess.manaCostResult.manaCost)}
          image={getMedia(guess.manaCostResult.result === 'CORRECT' ? guess.manaCostResult.manaCost : guess.manaCostResult.result)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          run={imagesLoaded}
          onLoad={() => setImagesCount(i => i + 1)}
          position={5}
          correct={guess.typeResult.result === 'CORRECT'}
          text={cleanName(guess.typeResult.type)}
          image={getMedia(guess.typeResult.type)}
        />
      </Grid>
      <Grid item xs={2}>
        <GuessBox
          animate={animate}
          run={imagesLoaded}
          onDone={() => setDoneAnimating(true)}
          onLoad={() => setImagesCount(i => i + 1)}
          position={6}
          correct={guess.setResult.result === 'CORRECT'}
          text={cleanName(guess.setResult.set)}
          image={getMedia(guess.setResult.set)}
        />
      </Grid>
    </Grid>
  )
}, (a, b) => a.code === b.code && a.language === b.language)

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
  return name && 'https://lor-card-images.s3.us-west-1.amazonaws.com/' + name + '.webp'
}
