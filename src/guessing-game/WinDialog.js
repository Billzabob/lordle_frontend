import { Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, Stack, Typography } from '@mui/material'
import React from 'react'
import Confetti from 'react-confetti'
import CardTooltip from '../CardTooltip'

export default function WinDialog({ open, onClose, correctCard, otherCards = [] }) {
  return (
    <>
      {open && <Confetti />}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle textAlign='center' variant='h3'>
          Victory!
        </DialogTitle>
        <DialogContent dividers={false}>
          <Stack alignItems='center'>
            <CardTooltip image={correctCard}>
              <img src={correctCard} alt='todo' style={{ height: '312px', width: '204px' }} />
            </CardTooltip>
            {
              otherCards.length > 0 &&
              <>
                <Typography variant='h4' sx={{ textAlign: 'center', mt: 3 }}>
                  Other Possible Answers
                </Typography>
                <ImageList cols={Math.min(3, otherCards.length)} sx={{ m: 1 }}>
                  {otherCards.map((item) => (
                    <CardTooltip key={item} image={item}>
                      <ImageListItem>
                        <img src={item} alt='todo' />
                      </ImageListItem>
                    </CardTooltip>
                  ))}
                </ImageList>
              </>
            }
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
