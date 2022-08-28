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

  return <Autocomplete
    autoComplete={true}
    filterOptions={createFilterOptions({limit: 10})}
    id="guess-input"
    options={cards}
    onChange={(_e, {cardCode}) => console.log(cardCode)}
    sx={{ width: 300 }}
    getOptionLabel={(option) => option.name}
    renderInput={(params) => <TextField {...params} label="Guess" />}
  />
}