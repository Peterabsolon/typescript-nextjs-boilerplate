require('isomorphic-fetch')

/* eslint-disable import/first */
import { ReactElement } from 'react'
import { AppProps } from 'next/app'

import { createStore } from '../store'

// Perf debug
// export function reportWebVitals(metric: any) {
//   console.log(metric)
// }

createStore()

export default function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}
