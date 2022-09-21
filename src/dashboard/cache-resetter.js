import { useApolloClient, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { CURRENT_DAY } from "../gql/queries"
import { correctAnswer } from "../reactive-vars/dialogs"

export default function CacheResetter() {
  const client = useApolloClient()
  const { data } = useQuery(CURRENT_DAY, { fetchPolicy: 'no-cache' })

  useEffect(() => {
    async function checkDay() {
      const savedDay = window.localStorage.getItem('day') || ''

      if (data && savedDay !== data.currentDay.toString()) {
        correctAnswer(false)
        window.localStorage.setItem('day', data.currentDay.toString())
        await client.resetStore()
      }
    }

    checkDay().catch(console.error)
  }, [data, client])
}