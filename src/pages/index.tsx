import { useEffect, useState } from 'react'
import Head from 'next/head'

interface IActivity {
  id: string
  title: string
}

function HomePage() {
  const [activities, setActivities] = useState<IActivity[]>([])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window
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
