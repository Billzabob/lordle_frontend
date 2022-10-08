import { Box } from "@mui/material"
import FlipMove from 'react-flip-move'
import GuessInput from "../guessing-game/GuessInput"
import React, { useState } from "react"
import SoundButton from "./SoundButton"
import VoiceGuess from "./VoiceGuess"

export default function VoiceGame() {

  const [guesses, setGuesses] = useState([])

  const setGuess = (guess) => {
    setGuesses(guesses => [guess, ...guesses])
  }

  return (
    <Box sx={{ mt: 3 }}>
      <SoundButton />
      <GuessInput guesses={guesses} setGuess={setGuess} />
      <Box display='flex' alignItems='center' flexDirection='column'>
        <FlipMove enterAnimation='accordionVertical'>
          {guesses.map(code => 
            <div key={code}>
              <VoiceGuess code={code} />
            </div>
          )}
        </FlipMove>
      </Box>
    </Box>
  )
}