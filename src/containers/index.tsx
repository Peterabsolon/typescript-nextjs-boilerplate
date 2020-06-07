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
      if ('serviceWorker' in navigator) {
        // eslint-disable-next-line
        console.log('has service worker')

        if ((window as any).workbox !== undefined) {
          // eslint-disable-next-line
          console.log('has workbox')

          // @ts-ignore
          window.workbox.addEventListener('waiting', () => {
            // eslint-disable-next-line
            console.log('event - waiting yo')

            if (confirm('A new version is installed, reload to use the new version immediately?')) {
              // @ts-ignore
              window.workbox.addEventListener('controlling', () => {
                // eslint-disable-next-line
                console.log('event - controlling')

                window.location.reload()
              })

              // @ts-ignore
              window.workbox.messageSW({ type: 'SKIP_WAITING' })
            } else {
              // User rejected, new verion will be automatically load when user open the app next time.
            }
          })
        }
      }

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
        <title>Efforts</title>
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
