import { Box } from "@mui/material";
import { CHECK_VOICE_GUESS } from "../gql/queries/voice-guess";
import { CURRENT_DAY } from "../gql/queries";
import { useQuery } from "@apollo/client";
import CardFlip from "../guessing-game/CardFlip";
import React, { useState } from "react"

export default function VoiceGuess({code, language}) {
  const dayQuery = useQuery(CURRENT_DAY)
  const currentDay = dayQuery.data.currentDay.day
  const { loading, data } = useQuery(CHECK_VOICE_GUESS, { variables: { code, language, day: currentDay } })
  const [loaded, setLoaded] = useState(false)

  return (
    <Box sx={{width: 200}}>
      <CardFlip delay={0} animate run={!loading && loaded}>
        <img
          src={data?.guessVoice.image}
          alt={data?.guessVoice.name}
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', aspectRatio: 0.664, filter: 'drop-shadow(5px 5px 5px black)' }}
        />
      </CardFlip>
    </Box>
  )
}