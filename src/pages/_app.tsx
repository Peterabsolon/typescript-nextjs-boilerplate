require('isomorphic-fetch')

/* eslint-disable import/first */
import React from 'react'
import { AppProps } from 'next/app'
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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const store = useStore()
  const theme = themes[store.theme]

  return (
    <>
      <Reset />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <div style={{ background: theme.colors.background }}>
            <Component {...pageProps} />
          </div>
        </StyledThemeProvider>
      </ThemeProvider>
    </>
  )
}

export default observer(MyApp)
