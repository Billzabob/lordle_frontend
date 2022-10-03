import { compactMode } from './reactive-vars'
import { useMediaQuery, useTheme } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import md5 from 'md5'

export function getImagePath(code, width) {
  const image = code + '.png'
  const hash = md5(image)
  const p1 = hash.slice(0, 1)
  const p2 = hash.slice(0, 2)
  return `https://static.wikia.nocookie.net/leagueoflegends/images/${p1}/${p2}/${image}/revision/latest/scale-to-width-down/${width}`
}

export function useCompactMode() {
  const compactModeEnabled = useReactiveVar(compactMode)
  const theme = useTheme()
  const small = useMediaQuery(theme.breakpoints.down('md'))

  return small && compactModeEnabled
}