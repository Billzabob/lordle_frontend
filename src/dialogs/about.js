import { aboutDialogOpen } from '../reactive-vars'
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import React from 'react'

export default function AboutDialog() {
  const open = useReactiveVar(aboutDialogOpen)
  const handleClose = () => aboutDialogOpen(false)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
      <DialogTitle variant='h4' textAlign='center'>About</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 1 }}>
          LoRdle is a Legends of Runeterra Wordle clone that is heavily inspired by another Wordle clone: LoLdle.
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Please feel free to reach out to me with feedback or bug reports.
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Twitter: @Billzabob_
        </Typography>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <a href='https://www.buymeacoffee.com/billzabob' target='_blank' rel='noreferrer noopener'>
            <img src='https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png' alt='Buy Me A Coffee' style={{ height: '60px', width: '217px' }} />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}