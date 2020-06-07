import { useEffect, useState } from 'react'
import Head from 'next/head'

function HomePage() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = window
        .fetch('https://api.efforts.app/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: 'query activities {  activities {    id    title  }}',
          }),
        })
        .then((res) => res.json())
        .then((data) => setActivities(data.data.activities))
    }
  }, [])

  return (
    <div>
      <Head>
        <title>My new cool app</title>
      </Head>

      {activities.map((activity) => (
        <div key={activity.id}>{activity.title}</div>
      ))}
    </div>
  )
}

export default HomePage
