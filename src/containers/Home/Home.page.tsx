import React, { FC, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Box, Button, Flex, Heading, Text } from '~/components'
import { useStore } from '~/store'

const Fact = styled.div`
  margin-top: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
  color: ${(props) => props.theme.colors.text};
`

export const HomePage: FC = observer(() => {
  const { facts, fetchFacts, factsFetching, onPageMount } = useStore().pages.HomeStore

  useEffect(onPageMount, [])

  return (
    <>
      <Flex>
        <Box>
          <div>
            <Heading color="primary">Todo</Heading>
            <Text mt={2}>- GraphQL</Text>
            <Text mt={2}>- Axios</Text>
            <Text mt={2}>- Mockserver</Text>
          </div>

          <Button type="button" mt={3} onClick={fetchFacts} width={150} variant="primary" mr={2}>
            {factsFetching ? 'Fetching' : 'Fetch request'}
          </Button>

          <Button type="button" mt={3} onClick={fetchFacts} width={150} variant="secondary">
            {factsFetching ? 'Fetching' : 'Fetch request'}
          </Button>

          {facts.map((fact) => (
            <Fact key={fact._id}>{fact.text}</Fact>
          ))}
        </Box>
      </Flex>
    </>
  )
})
