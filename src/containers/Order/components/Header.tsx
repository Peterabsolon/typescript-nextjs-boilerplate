import styled from 'styled-components'
import { Text, Flex, Box } from 'rebass'
import { observer } from 'mobx-react-lite'

import { Button } from '~/components/ui/Button'
import { Input } from '~/components/control/Input'
import { LogoIcon } from '~/components/icons'
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
`

const OrderNumberInput = styled(Input)`
  width: 600px;
  height: 31px;
  margin-right: -3px;
` as typeof Input

export const Header = observer(() => {
  const { utils, pages } = useStore()
  const { orderNumberInput, loadOrder } = pages.OrderStore

  return (
    <Wrapper>
      <HeaderContent>
        <Flex justifyContent="space-between" width="100%">
          <Box width="25%">
            <Flex alignItems="center">
              <LogoIcon />
              <Text ml={1} fontSize={20} fontStyle="italic">
                {utils.config.envName}
              </Text>
            </Flex>
          </Box>

          <Box width="50%">
            <Flex alignItems="center" justifyContent="center">
              <OrderNumberInput model={orderNumberInput} />

              <Button variant="secondary" onClick={loadOrder} disabled={!orderNumberInput.value}>
                Načíst objednávku
              </Button>
            </Flex>
          </Box>

          <Box width="25%">
            <Flex alignItems="center" justifyContent="flex-end">
              {/* <Button onClick={utils.toggleMocks} variant="primary" mr={3}>
            {utils.useMocks ? 'Disable' : 'Enable'} mocks
          </Button> */}

              <Button onClick={utils.auth.login} variant="primary">
                {utils.auth.loggedIn
                  ? 'Ukončit režim administrátora'
                  : 'Přihlásit se jako administátor'}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </HeaderContent>
    </Wrapper>
  )
})
