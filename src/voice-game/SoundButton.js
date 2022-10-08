import { Box, IconButton, Skeleton } from "@mui/material";
import { CURRENT_DAY, GET_VOICE_LINES } from "../gql/queries";
import { useQuery } from "@apollo/client";
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone'
import React, { useState } from 'react'

export default function SoundButton() {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { data, loading } = useQuery(GET_VOICE_LINES, { variables: { day: currentDay } })
  const [playCount, setPlayCount] = useState(0)

  const audio = new Audio(data?.voiceLines[playCount % data?.voiceLines.length])

  const playSound = () => {
    audio.play()
    setPlayCount(c => c + 1)
  }

  return (
    <Box display='flex' justifyContent='center'>
      {loading ? <Skeleton variant='rectangular' width={125} height={125} /> :
        <IconButton color='primary' onClick={playSound}>
          <PlayCircleFilledTwoToneIcon style={{ fontSize: 150 }} />
        </IconButton>
      }
    </Box>
  )
}