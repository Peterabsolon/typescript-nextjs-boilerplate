import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Button } from '~/components'
import { useStore } from '~/store'

const Fact = styled.div`
  margin-top: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
  color: ${(props) => props.theme.colors.text};
`

export const HomePage: FC = observer(() => {
  const { facts, fetchFacts, factsLoading, onPageMount } = useStore().HomeStore

  useEffect(onPageMount, [])

  return (
    <>
      <Button type="button" variant="primary" onClick={fetchFacts}>
        {factsLoading ? 'Loading...' : 'Fetch more'}
      </Button>

      {facts.map((fact) => (
        <Fact key={fact._id}>{fact.text}</Fact>
      ))}
    </>
  )
})
