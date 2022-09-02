import * as React from 'react';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { GET_CARD } from '../gql/queries';

export default function MainGameFooter() {
  const { data, loading } = useQuery(GET_CARD, { variables: { 'daysBack': 1 } })

  return <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>Yesterday's answer was: {loading ? "" : data.card.name}</Typography>
}