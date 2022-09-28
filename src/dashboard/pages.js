import React from 'react'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import PhotoIcon from '@mui/icons-material/Photo'

const pages = [
  {name: 'Classic', icon: <VideogameAssetIcon/>, link: '/', disabled: false},
  {name: 'Quote', icon: <VolumeUpIcon/>, disabled: true},
  {name: 'Splash', icon: <PhotoIcon/>, disabled: true},
]
export default pages