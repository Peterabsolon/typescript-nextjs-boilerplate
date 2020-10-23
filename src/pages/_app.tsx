require('isomorphic-fetch')

/* eslint-disable import/first */
import React from 'react'
import { AppProps } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'emotion-theming'
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'

import { createStore, useStore } from '../store'
import { themes } from '../constants'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

// Perf debug
export function reportWebVitals(metric: unknown): void {
  if (process.env.PERF_DEBUG) {
    console.log(metric)
  }
}

createStore()

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const store = useStore()
  const theme = themes[store.HomeStore.theme]

  return (
    <>
      <Reset />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <PageTransition timeout={100} classNames="page-transition">
            <Component {...pageProps} key={router.route} />
          </PageTransition>
          <style jsx global>
            {`
              .page-transition-enter {
                opacity: 0;
              }
              .page-transition-enter-active {
                opacity: 1;
                transition: opacity 100ms;
              }
              .page-transition-exit {
                opacity: 1;
              }
              .page-transition-exit-active {
                opacity: 0;
                transition: opacity 100ms;
              }
            `}
          </style>
        </StyledThemeProvider>
      </ThemeProvider>
    </>
  )
}

export default observer(MyApp)
