import { Dialog, DialogTitle, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import Confetti from 'react-confetti';

export default function WinDialog({ open, onClose, correctCard, otherCards }) {
  let otherCardsSection = null

  if (open && otherCards.length > 0) {
    otherCardsSection =
      <>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
          Other Possible Answers
        </Typography>
        <ImageList rowHeight={156} gap={10} cols={3}>
          {otherCards.map((item) => (
            <ImageListItem key={item}>
              <img src={item} alt='todo' style={{ height: '234px', width: '153px' }} />
            </ImageListItem>
          ))}
        </ImageList>
      </>
  }

  return (
    <>
      {open && <Confetti />}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle textAlign='center'>You Guessed the Card!</DialogTitle>
        <Stack alignItems='center'>
          <img src={correctCard} alt='todo' style={{ height: '312px', width: '204px' }} />
          {otherCardsSection}
        </Stack>
      </Dialog>
    </>
  )
}
