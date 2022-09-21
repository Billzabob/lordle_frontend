import { makeVar } from '@apollo/client'

export const settingsDialogOpen = makeVar(false)

export const statsDialogOpen = makeVar(false)

export const resultsDialogOpen = makeVar(false)

export const drawerOpen = makeVar(false)

// TODO: Think this should go bye bye after code is better organized
export const correctAnswer = makeVar(false)