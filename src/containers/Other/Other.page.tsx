import { ReactElement } from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'

import { Box } from '../../components'

function OtherPage(): ReactElement {
  return (
    <div>
      <Head>
        <title>Other page - My awesome boilerplate</title>
      </Head>

      <Box display="flex">
        <div>Foo</div>
        <div>Bar</div>
      </Box>
    </div>
  )
}

export default observer(OtherPage)
