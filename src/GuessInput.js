import { Autocomplete, Button, createFilterOptions, Stack, TextField } from "@mui/material";
import { useQuery, gql } from '@apollo/client';
import React from 'react';

const GET_CARDS = gql`
  query GetCards {
    cards {
      cardCode
      name
    }
  }
`;

export default function GuessInput({ setGuess }) {
  const { data } = useQuery(GET_CARDS);
  const cards = data?.cards || []
  const sorted = cards.slice().sort((c1, c2) => c1.name > c2.name ? 1 : -1)

  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        autoComplete={true}
        filterOptions={createFilterOptions({ limit: 10 })}
        id="guess-input"
        options={sorted}
        onChange={(e, c) => { if (c) setGuess(c.cardCode) }}
        sx={{ width: 300 }}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Guess" />}
      />
      <Button variant="contained">GO</Button>
    </Stack>
  )
}