import { Box, LinearProgress } from "@mui/material";
import React from 'react'

export default function LoadingBar({loading}) {
  if (loading) return (
    <Box sx={{width: '100vw', position: 'fixed', bottom: 0, left: 0, zIndex: 1200}}>
      <LinearProgress/>
    </Box>
  )
}