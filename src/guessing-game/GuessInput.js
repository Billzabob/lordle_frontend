import { Autocomplete, createFilterOptions, Stack, TextField, useTheme } from '@mui/material'
import { GET_CARDS } from '../gql/queries'
import { languageSetting } from '../reactive-vars'
import { useQuery, useReactiveVar } from '@apollo/client'
import React, { useState } from 'react'

export default function GuessInput({ setGuess, guesses }) {
  const language = useReactiveVar(languageSetting)
  const { data, loading } = useQuery(GET_CARDS, { variables: { language }, fetchPolicy: 'no-cache' })
  const [input, setInput] = useState('')
  const cards = data?.cards || []
  const sorted = cards.slice().sort((c1, c2) => c1.name > c2.name ? 1 : -1)
  const theme = useTheme()

  return (
    <Stack direction='row' justifyContent='center' sx={{ mb: 2, mt: 4.5 }}>
      <Autocomplete
        loading={loading}
        blurOnSelect='touch'
        clearOnBlur
        clearOnEscape
        filterOptions={filterOptions(guesses)}
        id='guess-input'
        noOptionsText='No options (collectible cards only)'
        options={sorted}
        onChange={(_, c) => {
          if (c) setGuess(c.cardCode)
          setInput('')
        }}
        sx={{
          width: 300,
          '& .MuiInputBase-root': {
            backgroundColor: theme.palette.mode === 'dark' ? '#00000088' : '#FFFFFF88',
          },
        }}
        getOptionLabel={(option) => option.name}
        inputValue={input}
        renderInput={(params) => <TextField onChange={(e) => setInput(e.target.value)} {...params} label='Guess' />}
      />
    </Stack>
  )
}

function filterOptions(guesses) {
  return (cards, state) => {
    const filter = createFilterOptions({})
    const removePreviousGuesses = cards.filter(c => !guesses.includes(c.cardCode))
    return filter(removePreviousGuesses, state)
  }
}