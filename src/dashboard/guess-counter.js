import * as React from 'react';
import { useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import { CORRECT_ANSWERS } from '../gql/queries';

export default function GuessCounter() {
  const { data, loading } = useQuery(CORRECT_ANSWERS)
  return <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>{loading ? "" : data.correctAnswers} people already found out!</Typography>
}