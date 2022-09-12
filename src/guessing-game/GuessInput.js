import React, { useState } from 'react'
import { Autocomplete, createFilterOptions, Stack, TextField } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_CARDS } from '../gql/queries'

export default function GuessInput({ setGuess, guesses }) {
  const { data } = useQuery(GET_CARDS)
  const [input, setInput] = useState('')
  const cards = data?.cards || []
  const sorted = cards.slice().sort((c1, c2) => c1.name > c2.name ? 1 : -1)

  return (
    <Stack direction='row' spacing={2} justifyContent='center' sx={{ mt: 4 }}>
      <Autocomplete
        blurOnSelect='touch'
        clearOnBlur={true}
        clearOnEscape={true}
        filterOptions={filterOptions(guesses)}
        id='guess-input'
        options={sorted}
        onChange={(e, c) => {
          if (c) setGuess(c.cardCode)
          setInput('')
        }}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.name}
        inputValue={input}
        renderInput={(params) => <TextField onChange={(e) => setInput(e.target.value)} {...params} label='Guess' />}
      />
    </Stack>
  )
}

function filterOptions(guesses) {
  return (cards, state) => {
    const filter = createFilterOptions({ limit: 10 })
    const removePreviousGuesses = cards.filter(c => !guesses.includes(c.cardCode))
    return filter(removePreviousGuesses, state)
  }
}