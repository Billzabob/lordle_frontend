import { makeVar } from '@apollo/client'

export const settingsDialogOpen = makeVar(false)

export const statsDialogOpen = makeVar(false)

export const resultsDialogState = makeVar('incorrect')

export const voiceResultsDialogState = makeVar('incorrect')

export const drawerOpen = makeVar(false)

export const aboutDialogOpen = makeVar(false)

export const loadingBar = makeVar('loaded')
