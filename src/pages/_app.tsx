require('isomorphic-fetch')

/* eslint-disable import/first */
import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'emotion-theming'

import { createStore } from '../store'
import { theme } from '../constants'

// Perf debug
export function reportWebVitals(metric: unknown): void {
  if (process.env.PERF_DEBUG) {
    console.log(metric)
  }
}

createStore()

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
