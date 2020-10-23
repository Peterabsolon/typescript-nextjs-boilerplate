import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { Button, Heading } from 'rebass'

import { APP_NAME } from '../../../constants/app'
import { useStore } from '../../../store'

interface Page {
  title?: string
}

export const Page: FC<Page> = ({ children, title }) => {
  const { switchTheme } = useStore().HomeStore

  return (
    <Wrapper>
      <Head>
        <title>
          {title && `${title} - `}
          {APP_NAME}
        </title>
      </Head>

      <Heading fontSize={30} mb={24} color="primary">
        {APP_NAME}
      </Heading>

      <Heading fontSize={22} mb={24} color="secondary">
        <Link href="/">Home</Link>
        <Link href="/other">Other page</Link>
      </Heading>

      <Button onClick={switchTheme}>Dark mode</Button>

      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors?.background};
`
