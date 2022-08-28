import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
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

export default function GuessInput() {
  const { data } = useQuery(GET_CARDS);
  const cards = data?.cards || []
  const sorted = cards.slice().sort((c1, c2) => c1.name > c2.name ? 1 : -1)

  return <Autocomplete
    autoComplete={true}
    filterOptions={createFilterOptions({limit: 10})}
    id="guess-input"
    options={sorted}
    onChange={(_e, {cardCode}) => console.log(cardCode)}
    sx={{ width: 300 }}
    getOptionLabel={(option) => option.name}
    renderInput={(params) => <TextField {...params} label="Guess" />}
  />
}