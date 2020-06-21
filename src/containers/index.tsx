require('isomorphic-fetch')

import { useEffect, useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

const API_URL = 'https://cat-fact.herokuapp.com'

interface IFact {
  _id: string
  text: string
}

export default function HomePage(): JSX.Element {
  const [facts, setFacts] = useState<IFact[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchFacts()
  }, [])

  const fetchFacts = () => {
    if (window) {
      setLoading(true)

      window
        .fetch(`${API_URL}/facts/random?amount=3`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
          setFacts(data)
          setLoading(false)
        })
    }
  }

  return (
    <Wrapper>
      <Head>
        <title>My awesome boilerplate</title>
      </Head>

      <h2>Random cat facts</h2>

      {facts.map((fact) => (
        <Fact key={fact._id}>{fact.text}</Fact>
      ))}

      <button type="button" onClick={fetchFacts}>
        {loading ? 'Fetching...' : 'I want moar'}
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px;
`

const Fact = styled.div`
  margin-bottom: 15px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 4px;
`
