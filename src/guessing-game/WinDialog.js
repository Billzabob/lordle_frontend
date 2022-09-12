import { Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, Stack, Typography } from '@mui/material';
import React from 'react';
import Confetti from 'react-confetti';
import CardTooltip from '../card-tooltip';

const itemData = [
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
  'https://dd.b.pvp.net/3_14_0/set2/en_us/img/cards/02BW037.png',
]

export default function WinDialog({ open, onClose, correctCard, otherCards = [] }) {
  let otherCardsSection = null

  if (itemData.length > 0) {
    otherCardsSection =
      <>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 3 }}>
          Other Possible Answers
        </Typography>
        <ImageList cols={Math.min(3, itemData.length)} sx={{ m: 1 }}>
          {itemData.map((item) => (
            <CardTooltip key={item} image={item}>
              <ImageListItem>
                  <img src={item} alt='todo' />
              </ImageListItem>
            </CardTooltip>
          ))}
        </ImageList>
      </>
  }

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
            {otherCardsSection}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}
