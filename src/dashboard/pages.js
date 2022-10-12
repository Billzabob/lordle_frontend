import { aboutDialogOpen, page } from '../reactive-vars'
import InfoIcon from '@mui/icons-material/Info'
import PhotoIcon from '@mui/icons-material/Photo'
import React from 'react'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'

const pages = [
  {name: 'Classic', icon: <VideogameAssetIcon/>, onClick: () => page('classic'), disabled: false},
  {name: 'Quote', icon: <VolumeUpIcon/>, onClick: () => page('quote'), disabled: false},
  {name: 'Splash', icon: <PhotoIcon/>, disabled: true},
  {name: 'About', icon: <InfoIcon/>, onClick: () => aboutDialogOpen(true), disabled: false},
]
export default pages