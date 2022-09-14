import React from 'react'
import { Tooltip } from '@mui/material'

export default function CardTooltip({ image, name, children }) {
  return (
    <Tooltip
      componentsProps={{ tooltip: { sx: { bgcolor: 'transparent' } } }}
      placement='right'
      followCursor
      title={
        <img src={image} alt={name} style={{ height: '416px', width: '272px' }} />
      }>
      {children}
    </Tooltip>
  )
}