import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { useStore } from '~/store'

import { Header } from './header'
import { GlobalStyles, PAGE_TRANSITION_DURATION } from './globalStyles'

const PAGE_PADDING = 16

const Wrapper = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  padding: 0 ${PAGE_PADDING}px;
`

const PageContent = styled(Content)`
  flex: 1;
`

const Background = styled.div<{ color: string }>`
  background: ${(props) => props.color};
`

export const App: FC<AppProps> = observer(({ Component, pageProps, router }) => {
  const { utils } = useStore()

  // TODO: fix
  const windowObj = typeof window === 'undefined' ? undefined : window

  useEffect(utils.initApp, [windowObj, utils])

  return (
    <>
      <GlobalStyles />

      <Wrapper background={utils.theme.theme.colors?.background}>
        <Header />

        <Background color={utils.theme.theme.colors?.background}>
          {utils.appReady && (
            <PageTransition timeout={PAGE_TRANSITION_DURATION} classNames="page-transition">
              <PageContent key={router.route}>
                <Component {...pageProps} />
              </PageContent>
            </PageTransition>
          )}
        </Background>
      </Wrapper>
    </>
  )
})
