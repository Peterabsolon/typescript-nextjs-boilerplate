require('isomorphic-fetch')

/* eslint-disable import/first */
import React from 'react'
import { AppProps } from 'next/app'
import { observer } from 'mobx-react-lite'
import { ThemeProvider } from 'emotion-theming'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { Reset as StyledReset } from 'styled-reset'

import { createStore, useStore } from '~/store'
import { App as AppComponent } from '~/components/app'

// For perf debug
// export function reportWebVitals(metric: unknown): void {
//   if (process.env.PERF_DEBUG) {
//     console.log(metric)
//   }
// }

createStore()

function MyApp(appProps: AppProps): JSX.Element {
  const { theme } = useStore().utils.theme

  return (
    <>
      <StyledReset />
      <StyledThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <AppComponent {...appProps} />
        </ThemeProvider>
      </StyledThemeProvider>
    </>
  )
}

export default observer(MyApp)
