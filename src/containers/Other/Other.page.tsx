import { ReactElement } from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'

import { Box, Text } from '~/components'

function OtherPage(): ReactElement {
  return (
    <>
      <Head>
        <title>Other page - My awesome boilerplate</title>
      </Head>

      <Box display="flex">
        <Text>Foo</Text>
        <Text>Bar</Text>
      </Box>
    </>
  )
}

export default observer(OtherPage)
