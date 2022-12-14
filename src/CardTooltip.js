import React from 'react'
import { Tooltip } from '@mui/material'
import { getImagePath } from './util'

export default function CardTooltip({ code, name, children, language, image }) {
  const imagePath = getImagePath(code, 250)

  return (
    <Tooltip
      componentsProps={{ tooltip: { sx: { bgcolor: 'transparent' } } }}
      placement='right'
      followCursor
      title={
        <img
          src={language === 'en_us' ? imagePath : image}
          alt={name}
          style={{ width: '250px', height: '376px' }}
        />
      }>
      {children}
    </Tooltip>
  )
}