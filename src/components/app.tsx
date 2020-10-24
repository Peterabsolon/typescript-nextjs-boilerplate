import { FC } from 'react'
import { AppProps } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import styled, { createGlobalStyle } from 'styled-components'
import { Button, Heading, Flex } from 'rebass'
import { observer } from 'mobx-react-lite'

import { APP_NAME, RouteEnum, RouteLabels } from '~/constants'
import { Link } from '~/components/ui/Link'
import { useStore } from '~/store'
import { keys } from '~/utils'

const PAGE_TRANSITION_DURATION = 100
const PAGE_PADDING = 16
const PAGE_MAX_WIDTH = 1366
const HEADER_HEIGHT = 80

// TODO: theme types
const GlobalStyles = createGlobalStyle<any>`
  html,
  body {
    color: ${(props) => props.theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif;
  }

  .page-transition-enter {
    opacity: 0;
  }
  .page-transition-enter-active {
    opacity: 1;
    transition: opacity ${PAGE_TRANSITION_DURATION}ms ease-in;
  }
  
  .page-transition-exit {
    opacity: 1;
  }
  .page-transition-exit-active {
    opacity: 0;
    transition: opacity ${PAGE_TRANSITION_DURATION}ms ease-out;
  }
`

const Wrapper = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Page = styled.div`
  flex: 1;
  padding: 0 ${PAGE_PADDING}px;
  max-width: ${PAGE_MAX_WIDTH}px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${PAGE_PADDING}px;
  height: ${HEADER_HEIGHT}px;
  background: ${(props) => props.theme.colors?.backgroundDark};
  margin-bottom: 24px;
`

export const App: FC<AppProps> = observer(({ Component, pageProps, router }) => {
  const { switchTheme, theme, themeKey } = useStore().HomeStore

  return (
    <Wrapper background={theme.colors?.background}>
      <GlobalStyles />

      <Header>
        <Heading fontSize={16} color="primary">
          {APP_NAME}
        </Heading>

        <Flex>
          {keys(RouteEnum).map((key) => {
            const href = RouteEnum[key]

            return (
              <Heading key={href} fontSize={14} color="secondary" mr={2}>
                <Link to={href}>{RouteLabels[href]}</Link>
              </Heading>
            )
          })}
        </Flex>

        <Button onClick={switchTheme} variant="outline">
          {themeKey === 'light' ? 'Dark' : 'Light'} mode
        </Button>
      </Header>

      <div style={{ background: theme.colors?.background }}>
        <PageTransition timeout={PAGE_TRANSITION_DURATION} classNames="page-transition">
          <Page key={router.route}>
            <Component {...pageProps} />
          </Page>
        </PageTransition>
      </div>
    </Wrapper>
  )
})
