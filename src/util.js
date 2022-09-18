import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_DAY } from './gql/queries'

export function useLocalStorage(key, defaultValue) {
  const { data, loading } = useQuery(CURRENT_DAY)
  const [storedValue, setStoredValue] = useState(defaultValue)
  const [readLocalStorage, setReadLocalStorage] = useState(true)

  const setValue = (value) => {
    if (loading) throw new Error('Set while loading')
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    window.localStorage.setItem(data.currentDay + key, JSON.stringify(valueToStore))
  }

  if (!loading && readLocalStorage) {
    const item = window.localStorage.getItem(data.currentDay + key)
    const parsedItem = item ? JSON.parse(item) : defaultValue
    setReadLocalStorage(false)
    setValue(parsedItem)
  }

  return [storedValue, setValue]
}