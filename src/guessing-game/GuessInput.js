import React from 'react'
import { Autocomplete, createFilterOptions, Stack, TextField } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_CARDS } from '../gql/queries'

export default function GuessInput({ setGuess }) {
  const { data } = useQuery(GET_CARDS)
  const cards = data?.cards || []
  const sorted = cards.slice().sort((c1, c2) => c1.name > c2.name ? 1 : -1)

  return (
    <Stack direction='row' spacing={2} justifyContent='center' sx={{mt: 4}}>
      <Autocomplete
        clearOnEscape={true}
        filterOptions={createFilterOptions({ limit: 10 })}
        id='guess-input'
        options={sorted}
        onChange={(e, c) => { if (c) setGuess(c.cardCode) }}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label='Guess' />}
      />
    </Stack>
  )
}