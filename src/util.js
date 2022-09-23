import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_DAY } from './gql/queries'

export function useLocalStorage(key, defaultValue) {
  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'cache-and-network' })
  const [storedValue, setStoredValue] = useState(defaultValue)

  const defaultValueJson = JSON.stringify(defaultValue)
  const currentDay = data?.currentDay?.day

  const setValue = useCallback((value) => {
    if (currentDay) {
      setStoredValue(value)
      window.localStorage.setItem(currentDay + key, JSON.stringify(value))
    }
  }, [currentDay, key])

  useEffect(() => {
    const item = window.localStorage.getItem(currentDay + key)
    setValue(JSON.parse(item || defaultValueJson))
  }, [currentDay, defaultValueJson, key, setValue])

  return [storedValue, setValue]
}
