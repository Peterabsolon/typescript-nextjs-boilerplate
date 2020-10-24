import { FC } from 'react'
import { AppProps } from 'next/app'
import { PageTransition } from 'next-page-transitions'
import styled, { createGlobalStyle } from 'styled-components'
import { Heading, Flex } from 'rebass'
import { observer } from 'mobx-react-lite'

import { APP_NAME, RouteEnum, RouteLabels } from '~/constants'
import { Button } from '~/components/ui/Button'
import { Link } from '~/components/ui/Link'
import { useStore } from '~/store'
import { keys } from '~/utils'

const PAGE_TRANSITION_DURATION = 80
const PAGE_PADDING = 16
const PAGE_MAX_WIDTH = 1366
const HEADER_HEIGHT = 80

// TODO: theme types
const GlobalStyles = createGlobalStyle<any>`
  html,
  body,
  body * {
    color: ${(props) => props.theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto, helvetica neue, Arial, noto sans, sans-serif;
  }

  .page-transition-enter {
    opacity: 0;
  }
  
  .page-transition-enter-active {
    opacity: 1;
    transition: ${PAGE_TRANSITION_DURATION}ms ease-in;
  }
  
  .page-transition-exit {
    opacity: 1;
  }
  
  .page-transition-exit-active {
    opacity: 0;
    transition: ${PAGE_TRANSITION_DURATION}ms ease-out;
  }
`

const Wrapper = styled.div<{ background: string }>`
  background: ${(props) => props.background};
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  background: ${(props) => props.theme.colors?.backgroundDark};
  margin-bottom: 24px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: ${PAGE_MAX_WIDTH}px;
  padding: 0 ${PAGE_PADDING}px;
`

const HeaderContent = styled(Content)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
`

const PageContent = styled(Content)`
  flex: 1;
`

export const App: FC<AppProps> = observer(({ Component, pageProps, router }) => {
  const { toggleTheme, theme, themeKey } = useStore()

  return (
    <Wrapper background={theme.colors?.background}>
      <GlobalStyles />

      <Header>
        <HeaderContent>
          <Heading fontSize={16} color="primary">
            {APP_NAME}
          </Heading>

          <Flex>
            {keys(RouteEnum).map((key) => {
              const href = RouteEnum[key]

              return (
                <Heading key={href} fontSize={14} color="secondary" mr={2}>
                  <Link href={href}>{RouteLabels[href]}</Link>
                </Heading>
              )
            })}
          </Flex>

          <Button onClick={toggleTheme} variant="outline">
            {themeKey === 'light' ? 'Dark' : 'Light'} mode
          </Button>
        </HeaderContent>
      </Header>

      <div style={{ background: theme.colors?.background }}>
        <PageTransition timeout={PAGE_TRANSITION_DURATION} classNames="page-transition">
          <PageContent key={router.route}>
            <Component {...pageProps} />
          </PageContent>
        </PageTransition>
      </div>
    </Wrapper>
  )
})
