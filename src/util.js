import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_DAY } from './gql/queries'

export function useLocalStorage(key, defaultValue) {
  const { data, loading } = useQuery(CURRENT_DAY)
  const [storedValue, setStoredValue] = useState(defaultValue)

  const defaultValueJson = JSON.stringify(defaultValue)
  const currentDay = data?.currentDay

  const setValue = useCallback((value) => {
    if (loading) throw new Error('Set while loading')
    console.log('setting value to: ' + value)
    setStoredValue(value)
    window.localStorage.setItem(currentDay + key, JSON.stringify(value))
  }, [currentDay, key, loading])

  useEffect(() => {
    if (!loading) {
      const item = window.localStorage.getItem(currentDay + key)
      setValue(JSON.parse(item || defaultValueJson))
    }
  }, [loading, currentDay, defaultValueJson, key, setValue])

  return [storedValue, setValue]
}
