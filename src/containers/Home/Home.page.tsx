import React, { useEffect } from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Heading, Button } from '../../components'
import { useStore } from '../../store'

const Wrapper = styled.div`
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;
`

const Fact = styled.div`
  margin-top: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
  color: ${(props) => props.theme.colors.text};
`

function HomePage(): JSX.Element {
  const { facts, fetchFacts, factsLoading, switchTheme } = useStore()

  useEffect(() => {
    fetchFacts()
  }, [])

  return (
    <>
      <Head>
        <title>My awesome boilerplate</title>
      </Head>

      <Wrapper>
        <Heading fontSize={40} mb={24} color="primary">
          Random cat facts
        </Heading>

        <Button type="button" variant="secondary" onClick={switchTheme}>
          Dark mode
        </Button>

        <br />
        <br />

        <Button type="button" variant="primary" onClick={fetchFacts}>
          {factsLoading ? 'Loading...' : 'Fetch more'}
        </Button>

        {facts.map((fact) => (
          <Fact key={fact._id}>{fact.text}</Fact>
        ))}
      </Wrapper>
    </>
  )
}

export default observer(HomePage)
