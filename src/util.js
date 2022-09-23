import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_DAY } from './gql/queries'

export function useLocalStorage(key, defaultValue) {
  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'cache-and-network' })
  const currentDay = data?.currentDay?.day

  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key + currentDay)
    return item ? JSON.parse(item) : defaultValue
  })

  const setValue = (value) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (currentDay)
        window.localStorage.setItem(key + currentDay, JSON.stringify(valueToStore))
  }

  return [storedValue, setValue]
}
