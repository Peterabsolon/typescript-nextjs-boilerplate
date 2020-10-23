import { ReactElement } from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'

import { Box, Page } from '../../components'

function OtherPage(): ReactElement {
  return (
    <Page>
      <Head>
        <title>Other page - My awesome boilerplate</title>
      </Head>

      <Box display="flex">
        <div>Foo</div>
        <div>Bar</div>
      </Box>
    </Page>
  )
}

export default observer(OtherPage)
