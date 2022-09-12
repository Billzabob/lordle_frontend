import React from 'react'
import { Tooltip } from '@mui/material'

export default function CardTooltip({ image, children }) {
  return (
    <Tooltip
      componentsProps={{ tooltip: { sx: { bgcolor: 'transparent' } } }}
      placement='right'
      followCursor={true}
      enterTouchDelay={0}
      leaveTouchDelay={100000}
      title={
        <img src={image} alt='card' style={{ height: '520px', width: '340px' }} />
      }>
      {children}
    </Tooltip>
  )
}