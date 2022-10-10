import { Box, IconButton, Skeleton } from "@mui/material";
import { CURRENT_DAY, GET_VOICE_LINES } from "../gql/queries";
import { useQuery } from "@apollo/client";
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone'
import PauseCircleFilledTwoToneIcon from '@mui/icons-material/PauseCircleFilledTwoTone'
import React, { useEffect, useState } from 'react'

export default function SoundButton() {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { data, loading } = useQuery(GET_VOICE_LINES, { variables: { day: currentDay } })
  const [playCount, setPlayCount] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [audio, setAudio] = useState(new Audio())
  const voiceLines = data?.voiceLines || []

  useEffect(() => setAudio(new Audio(voiceLines[playCount % voiceLines.length])), [voiceLines, playCount])

  useEffect(() => {
    audio.addEventListener('ended', () => {
      setPlaying(false)
      setPlayCount(c => c + 1)
    })
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