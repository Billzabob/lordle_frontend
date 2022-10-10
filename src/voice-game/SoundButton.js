import { Box, IconButton, Skeleton } from "@mui/material"
import { CURRENT_DAY, GET_VOICE_LINES } from "../gql/queries"
import { useQuery } from "@apollo/client"
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone'
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone'
import React, { useCallback, useEffect, useState } from 'react'

export default function SoundButton() {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { data, loading } = useQuery(GET_VOICE_LINES, { variables: { day: currentDay } })
  const [playCount, setPlayCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const voiceLines = data?.voiceLines || []
  const [audios, setAudios] = useState([])
  const audio = audios[playCount % audios.length] || new Audio()

  useEffect(() => {
    if (!loading && audios.length === 0)
      setAudios(voiceLines.map(line => new Audio(line)))
  }, [loading, audios.length, voiceLines])

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setPlayCount(c => c + 1)
  }, [])

  useEffect(() => {
    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
  })

  const playSound = () => {
    setPlaying(true)
    audio.play()
  }

  const pauseSound = () => {
    setPlaying(false)
    audio.pause()
    setPlayCount(c => c + 1)
  }

  const Button = ({ playing }) => {
    if (playing) {
      return (
        <IconButton color='primary' onClick={pauseSound}>
          <PauseCircleFilledTwoToneIcon style={{ fontSize: 120 }} />
        </IconButton>
      )
    } else {
      return (
        <IconButton color='primary' onClick={playSound}>
          <PlayCircleFilledTwoToneIcon style={{ fontSize: 120 }} />
        </IconButton>
      )
    }
  }

  return (
    <Box display='flex' justifyContent='center'>
      {loading ?
        <Skeleton variant='rectangular' width={125} height={125} /> :
        <Button playing={playing} />}
    </Box>
  )
}