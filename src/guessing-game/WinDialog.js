import { Button, Dialog, DialogContent, DialogTitle, ImageList, ImageListItem, Stack, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import CardTooltip from '../CardTooltip'

export default function WinDialog({ open, onClose, correctCard, otherCards }) {
  const [tooltip, setTooltip] = useState(false)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign='center' variant='h3'>
        Victory!
      </DialogTitle>
      <DialogContent dividers={false}>
        <Stack alignItems='center'>
          <CardTooltip image={correctCard.image} name={correctCard.name}>
            <img src={correctCard.image} alt={correctCard.name} style={{ height: '312px', width: '204px' }} />
          </CardTooltip>
          <Tooltip open={tooltip} onClose={() => setTooltip(false)} title='Copied to clipboard!'>
            <Button onClick={() => {
              setTooltip(true)
              navigator.clipboard.writeText(shareText())
            }} sx={{ width: '100px', mt: 2 }} variant='contained'>Share</Button>
          </Tooltip>
          {
            (otherCards || []).length > 0 &&
            <>
              <Typography variant='h4' sx={{ textAlign: 'center', mt: 3 }}>
                Other Possible Answers
              </Typography>
              <ImageList cols={Math.min(3, otherCards.length)} sx={{ m: 1 }}>
                {otherCards.map((item) => (
                  <CardTooltip key={item.name} image={item.image} name={item.name}>
                    <ImageListItem>
                      <img src={item.image} alt={item.name} />
                    </ImageListItem>
                  </CardTooltip>
                ))}
              </ImageList>
            </>
          }
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

function shareText() {
  return 'foo'
}
