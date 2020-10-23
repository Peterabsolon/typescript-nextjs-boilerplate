import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Button, Page } from '../../components'
import { useStore } from '../../store'

const Fact = styled.div`
  margin-top: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
  color: ${(props) => props.theme.colors.text};
`

function HomePage(): JSX.Element {
  const { facts, fetchFacts, factsLoading } = useStore().HomeStore

  useEffect(() => {
    fetchFacts()
  }, [])

  return (
    <Page title="Home">
      <Button type="button" variant="primary" onClick={fetchFacts}>
        {factsLoading ? 'Loading...' : 'Fetch more'}
      </Button>
      Page transitions pls
      {facts.map((fact) => (
        <Fact key={fact._id}>{fact.text}</Fact>
      ))}
    </Page>
  )
}

export default observer(HomePage)
