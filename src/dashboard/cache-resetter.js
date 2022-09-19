import { useApolloClient, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { CURRENT_DAY } from "../gql/queries"

export default function CacheResetter() {
  const client = useApolloClient()
  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'network-only' })

  useEffect(() => {
    async function checkDay() {
      const savedDay = window.localStorage.getItem('day') || ''

      if (data && savedDay !== data.currentDay.toString()) {
        window.localStorage.setItem('day', data.currentDay.toString())
        await client.resetStore()
      }
    }

    checkDay().catch(console.error)
  }, [data, client])
}