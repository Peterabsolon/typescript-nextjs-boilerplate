import styled from 'styled-components'
import { Heading, Flex } from 'rebass'
import { observer } from 'mobx-react-lite'

import { APP_NAME } from '~/constants'
import { Button } from '~/components/ui/Button'
import { useStore } from '~/store'

const PAGE_PADDING = 16
const HEADER_HEIGHT = 80

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const Content = styled.div`
  padding: 0 ${PAGE_PADDING}px;
`

const HeaderContent = styled(Content)`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > * {
    flex: 1 1 0;
  }
`

export const Header = observer(() => {
  const { utils } = useStore()

  return (
    <Wrapper>
      <HeaderContent>
        <Heading fontSize={16} color="primary">
          {APP_NAME}
        </Heading>

        {/* <Flex justifyContent="center">
          {keys(RouteEnum).map((key) => {
            const href = RouteEnum[key]

            return (
              <Heading key={href} fontSize={14} color="secondary" mr={2}>
                <Link href={href}>{RouteLabels[href]}</Link>
              </Heading>
            )
          })}
        </Flex> */}

        <Flex justifyContent="flex-end">
          {/* <Button onClick={utils.toggleMocks} variant="primary" mr={3}>
            {utils.useMocks ? 'Disable' : 'Enable'} mocks
          </Button> */}

          <Button onClick={utils.auth.login} variant="primary">
            {utils.auth.loggedIn
              ? 'Ukončit režim administrátora'
              : 'Přihlásit se jako administátor'}
          </Button>
        </Flex>
      </HeaderContent>
    </Wrapper>
  )
})
