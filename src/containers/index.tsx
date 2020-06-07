require('isomorphic-fetch')

import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

interface IActivity {
  id: string
  title: string
}

export default function HomePage(): JSX.Element {
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
    <Wrapper>
      <Head>
        <title>My new cool app</title>
      </Head>

      {activities.map((activity) => (
        <div key={activity.id}>{activity.title}</div>
      ))}

      <button type="button" onClick={() => alert('With typescript and Jest')}>
        Test Button
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
  background: #ddd;
`
