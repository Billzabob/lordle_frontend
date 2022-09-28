import { aboutDialogOpen } from '../reactive-vars'
import InfoIcon from '@mui/icons-material/Info'
import PhotoIcon from '@mui/icons-material/Photo'
import React from 'react'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

const pages = [
  {name: 'Classic', icon: <VideogameAssetIcon/>, link: '/', disabled: false},
  {name: 'Quote', icon: <VolumeUpIcon/>, disabled: true},
  {name: 'Splash', icon: <PhotoIcon/>, disabled: true},
  {name: 'About', icon: <InfoIcon/>, onClick: () => aboutDialogOpen(true), disabled: false},
]
export default pages