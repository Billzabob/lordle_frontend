import { FormControl, InputLabel, MenuItem, Select, Switch } from '@mui/material'
import { settingsDialogOpen, darkMode, highContrastMode, languageSetting } from '../reactive-vars'
import { useReactiveVar } from '@apollo/client'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'

const ToggleOption = ({ on, toggle, name, title }) => {

  const handleToggle = (toggleStatus) => {
    localStorage.setItem(name, toggleStatus)
    toggle(toggleStatus)
  }

  return (
    <ListItem>
      <ListItemText primary={title} />
      <Switch checked={on} onChange={() => handleToggle(!on)} color='secondary' />
    </ListItem>
  )
}

export default function SettingsDialog() {
  const open = useReactiveVar(settingsDialogOpen)
  const darkModeOn = useReactiveVar(darkMode)
  const highContrastModeOn = useReactiveVar(highContrastMode)
  const chosenLanguage = useReactiveVar(languageSetting)

  const handleClose = () => settingsDialogOpen(false)

  return (
    <Dialog maxWidth='xs' fullWidth onClose={handleClose} open={open}>
      <DialogTitle variant='h4' textAlign='center'>Settings</DialogTitle>
      <List sx={{ pt: 0, mx: 4 }}>
        <ToggleOption
          name='darkMode'
          on={darkModeOn}
          toggle={darkMode}
          title='Dark Mode'
        />
        <ToggleOption
          name='highContrastMode'
          on={highContrastModeOn}
          toggle={highContrastMode}
          title='Colorblind Mode'
        />
        <ListItem>
          <ListItemText primary='Language' />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel color='secondary' id='language-selector'>Language</InputLabel>
            <Select
              color='secondary'
              labelId='language-selector'
              label='Language'
              value={chosenLanguage}
              onChange={(e) => {
                localStorage.language = e.target.value
                languageSetting(e.target.value)
              }}
            >
              <MenuItem value='en_us'>English</MenuItem>
              <MenuItem value='de_de'>German</MenuItem>
              <MenuItem value='es_es'>Spanish (Spain)</MenuItem>
              <MenuItem value='es_mx'>Spanish (Mexico)</MenuItem>
              <MenuItem value='fr_fr'>French</MenuItem>
              <MenuItem value='it_it'>Italian</MenuItem>
              <MenuItem value='ja_jp'>Japanese</MenuItem>
              <MenuItem value='ko_kr'>Korean</MenuItem>
              <MenuItem value='pl_pl'>Polish</MenuItem>
              <MenuItem value='pt_br'>Portuguese</MenuItem>
              <MenuItem value='th_th'>Thai</MenuItem>
              <MenuItem value='tr_tr'>Turkish</MenuItem>
              <MenuItem value='ru_ru'>Russian</MenuItem>
              <MenuItem value='zh_tw'>Chinese</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    </Dialog>
  )
}