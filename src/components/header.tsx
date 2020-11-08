import styled from 'styled-components'
import { Heading, Flex } from 'rebass'
import { observer } from 'mobx-react-lite'

import { APP_NAME, RouteEnum, RouteLabels } from '~/constants'
import { Button } from '~/components/ui/Button'
import { Link } from '~/components/ui/Link'
import { keys } from '~/utils'
import { useStore } from '~/store'

const PAGE_PADDING = 16
const PAGE_MAX_WIDTH = 1366
const HEADER_HEIGHT = 80

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors?.backgroundDark};
  margin-bottom: 24px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: ${PAGE_MAX_WIDTH}px;
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

        <Flex justifyContent="center">
          {keys(RouteEnum).map((key) => {
            const href = RouteEnum[key]

            return (
              <Heading key={href} fontSize={14} color="secondary" mr={2}>
                <Link href={href}>{RouteLabels[href]}</Link>
              </Heading>
            )
          })}
        </Flex>

        <Flex justifyContent="flex-end">
          <Button onClick={utils.theme.toggle} variant="outline" mr={2}>
            {utils.theme.key === 'light' ? 'Dark' : 'Light'} mode
          </Button>

          <Button onClick={utils.toggleMocks} variant="outline">
            {utils.useMocks ? 'Disable' : 'Enable'} mocks
          </Button>
        </Flex>
      </HeaderContent>
    </Wrapper>
  )
})
