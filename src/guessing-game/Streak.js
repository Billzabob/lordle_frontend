import React, { useEffect } from "react"

export default function Streak({correct, currentDay}) {
  useEffect(() => {
    const lastCorrectDay = parseInt(window.localStorage.getItem('lastCorrectDay'))
    const streak = parseInt(window.localStorage.getItem('streak'))

    if (!streak)
      window.localStorage.setItem('streak', 0)

    if (correct && lastCorrectDay === currentDay - 1) {
      window.localStorage.setItem('lastCorrectDay', currentDay)
      window.localStorage.setItem('streak', streak + 1)
    }

    if (currentDay - lastCorrectDay > 1)
      window.localStorage.setItem('streak', 0)
  })

  return <div>{window.localStorage.getItem('streak') || '0'}</div>
}