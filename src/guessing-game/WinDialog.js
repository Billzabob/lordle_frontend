import { Dialog, DialogTitle, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import Confetti from 'react-confetti';

const itemData = [
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
]

export default function WinDialog({ open, onClose, correctCard, otherCards }) {
  return (
    <>
      {open && <Confetti />}
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle textAlign='center'>You Guessed the Card!</DialogTitle>
        <Stack alignItems='center'>
          <img src={correctCard} alt='todo' style={{ height: '312px', width: '204px' }} />
          <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>
            Other Possible Answers
          </Typography>
          <ImageList sx={{ width: 500, height: 450 }} gap={20} cols={3}>
            {itemData.map((item) => (
              <ImageListItem key={item}>
                <img src={item} alt='todo' />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      </Dialog>
    </>
  )
}