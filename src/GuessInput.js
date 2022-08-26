import { Autocomplete, TextField } from "@mui/material";
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
  const { loading, error, data } = useQuery(GET_CARDS);

  let cards = []

  if (loading) {
    cards = 
      [
        { label: 'Loading...', id: '01IO012' },
      ]
  } else if (error) {
    cards = 
      [
        { label: 'Error...', id: '01IO012' },
      ]
  } else {
    cards = data.cards.map(card => ({
      ...card,
      label: card.name,
      id: card.cardCode
    }))
  }

  return <Autocomplete
    id="guess-input"
    options={cards}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params} label="Guess" />}
  />
}