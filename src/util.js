import { compactMode } from './reactive-vars'
import { useMediaQuery, useTheme } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import md5 from 'md5'
import { useCallback, useEffect, useState } from 'react'

export function getImagePath(code, width) {
  const image = code + '.png'
  const hash = md5(image)
  const p1 = hash.slice(0, 1)
  const p2 = hash.slice(0, 2)
  return `https://static.wikia.nocookie.net/leagueoflegends/images/${p1}/${p2}/${image}/revision/latest/scale-to-width-down/${width}`
}

export function updateStats(currentDay, numGuesses, prefix) {
  localStorage.setItem(prefix + 'gamesWon', Number(localStorage.getItem(prefix + 'gamesWon') || 0) + 1)
  localStorage.setItem(prefix + 'guessCount', Number(localStorage.getItem(prefix + 'guessCount') || 0) + numGuesses)

  const day = localStorage.getItem(prefix + 'currentDay')

  if (day === undefined || Number(day) === currentDay - 1)
    localStorage.setItem(prefix + 'currentStreak', Number(localStorage.getItem(prefix + 'currentStreak') || 0) + 1)
  else
    localStorage.setItem(prefix + 'currentStreak', 1)

  if (Number(localStorage.getItem(prefix + 'currentStreak')) > Number(localStorage.getItem(prefix + 'maxStreak') || 0))
    localStorage.setItem(prefix + 'maxStreak', localStorage.getItem(prefix + 'currentStreak'))

  localStorage.setItem(prefix + 'currentDay', currentDay)
}

export function useCompactMode() {
  const compactModeEnabled = useReactiveVar(compactMode)
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('md'))

  return small && compactModeEnabled
}

export function classicShareText(results) {
  const maxResults = 5
  const trimmed = results.reverse().slice(0, maxResults)
  const result = trimmed.map(toEmojiRow).join('\n')
  const more = results.length > maxResults ? `➕${numberToEmoji(results.length - maxResults)} more` : ''
  return `I found the LoRdle card in classic mode in ${results.length} ${results.length === 1 ? 'attempt' : 'attempts'}!
${result}
${more}
https://lordle.gg`
}

export function voiceShareText(results) {
  return `I found the LoRdle card in quote mode in ${results.length} ${results.length === 1 ? 'attempt' : 'attempts'}!
https://lordle.gg`
}

const numberToEmoji = (number) => number.toString().split('').map(digitToEmoji).join('')

function digitToEmoji(digit) {
  switch (digit) {
    case '0':
      return '0️⃣'
    case '1':
      return '1️⃣'
    case '2':
      return '2️⃣'
    case '3':
      return '3️⃣'
    case '4':
      return '4️⃣'
    case '5':
      return '5️⃣'
    case '6':
      return '6️⃣'
    case '7':
      return '7️⃣'
    case '8':
      return '8️⃣'
    case '9':
      return '9️⃣'
    default:
      return ''
  }
}

const toEmojiRow = (guess) => [
  guess.regionResult,
  guess.rarityResult,
  guess.manaCostResult,
  guess.typeResult,
  guess.setResult,
].map(resultToEmoji).join('')

function resultToEmoji({ result }) {
  switch (result) {
    case 'CORRECT':
      return '🟩'
    case 'WRONG':
      return '🟥'
    case 'PARTIAL':
      return '🟧'
    case 'UP':
      return '⬆️'
    case 'DOWN':
      return '⬇️'
    default:
      return ''
  }
}

export function useAudios(audioNames) {
  const [audios, setAudios] = useState([])
  const [loadingIndex, setLoadingIndex] = useState(0)

  const audio = new Audio(audioNames[loadingIndex])

  const handleLoaded = useCallback(({ target }) => {
    if (!audios[loadingIndex]) setAudios([...audios, target])
    if (loadingIndex < audioNames.length - 1) setLoadingIndex(i => i + 1)
  }, [loadingIndex, audioNames, audios])

  useEffect(() => {
    audio.addEventListener('canplaythrough', handleLoaded)
    return () => audio.removeEventListener('canplaythrough', handleLoaded)
  })

  return audios
}
