import { Box, CircularProgress, IconButton, Skeleton } from "@mui/material"
import { CURRENT_DAY, GET_VOICE_LINES } from "../gql/queries"
import { useQuery } from "@apollo/client"
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone'
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone'
import React, { useCallback, useEffect, useState } from 'react'
import { useAudios } from "../util"

export default function SoundButton() {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { data, loading } = useQuery(GET_VOICE_LINES, { variables: { day: currentDay } })
  const [playCount, setPlayCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const voiceLines = data?.voiceLines || []
  const audios = useAudios(voiceLines)

  const audio = audios[playCount % audios.length]

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setPlayCount(c => c + 1)
  }, [])

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', handleEnded)
      return () => audio.removeEventListener('ended', handleEnded)
    }
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

  const Button = ({ playing, audioLoaded }) => {
    if (!audioLoaded) {
      return (
        <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' sx={{ height: 136 }}>
          <CircularProgress size={80} />
        </Box>
      )
    } 
    if (playing) {
      return (
        <IconButton color='primary' onClick={pauseSound}>
          <PauseCircleFilledTwoToneIcon style={{ fontSize: 120 }} />
        </IconButton>
      )
    } 
    return (
      <IconButton color='primary' onClick={playSound}>
        <PlayCircleFilledTwoToneIcon style={{ fontSize: 120 }} />
      </IconButton>
    )
  }

  return (
    <Box display='flex' justifyContent='center'>
      {loading ?
        <Skeleton sx={{my: 2.25}} variant='rectangular' width={100} height={100} /> :
        <Button playing={playing} audioLoaded={audio} />}
    </Box>
  )
}