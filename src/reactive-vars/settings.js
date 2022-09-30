import { makeVar } from '@apollo/client'

export const darkMode = makeVar(localStorage.darkMode ? (localStorage.darkMode === 'true') : true)
export const highContrastMode = makeVar(localStorage.highContrastMode ? (localStorage.highContrastMode === 'true') : false)
export const languageSetting = makeVar(localStorage.language || 'en_us')
