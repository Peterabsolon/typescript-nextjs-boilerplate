import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Button, Heading, Text } from '~/components'
import { useStore } from '~/store'

const Fact = styled.div`
  margin-top: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
  color: ${(props) => props.theme.colors.text};
`

export const HomePage: FC = observer(() => {
  const { facts, fetchFacts, factsFetching, onPageMount } = useStore().HomeStore

  useEffect(onPageMount, [])

  return (
    <>
      <div>
        <Heading color="primary">Todo</Heading>
        <Text mt={2}>- GraphQL</Text>
        <Text mt={2}>- Cyclic import check</Text>
        <Text mt={2}>- Cyclic import check</Text>
      </div>

      <Button type="button" mt={4} variant="primary" onClick={fetchFacts}>
        {factsFetching ? 'Loading...' : 'Fetch more'}
      </Button>

      {facts.map((fact) => (
        <Fact key={fact._id}>{fact.text}</Fact>
      ))}
    </>
  )
})
