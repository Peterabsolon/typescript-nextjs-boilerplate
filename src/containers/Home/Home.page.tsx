import React, { useEffect } from 'react'
import Head from 'next/head'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Button } from '../../components'
import { useStore } from '../../store'

const Wrapper = styled.div`
  padding: 16px;
`

const Fact = styled.div`
  margin-top: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
`

function HomePage(): JSX.Element {
  const { facts, fetchFacts, loading } = useStore()

  useEffect(() => {
    fetchFacts()
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>My awesome boilerplate</title>
      </Head>

      <h2>Random cat facts</h2>

      <Button type="button" variant="primary" onClick={fetchFacts}>
        {loading ? 'Fetching...' : 'I can haz moar?'}
      </Button>

      {facts.map((fact) => (
        <Fact key={fact._id}>{fact.text}</Fact>
      ))}
    </Wrapper>
  )
}

export default observer(HomePage)
