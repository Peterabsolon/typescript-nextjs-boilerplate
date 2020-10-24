import axios from 'axios'
import { gql, GraphQLClient } from 'graphql-request'

import { API_URL, GRAPHQL_URL } from '~/constants'

import { Fact, CityWeather } from './models'

const getCityWeatherQuery = gql`
  {
    getCityByName(name: "Bratislava") {
      id
      weather {
        summary {
          title
        }
      }
    }
  }
`

const api = axios.create({ baseURL: API_URL })

const graphql = new GraphQLClient(GRAPHQL_URL)

export const getFacts = (count: number): Promise<Fact[]> => api.get(`/facts/random?amount=${count}`)

export const getCityWeather = (): Promise<CityWeather> => graphql.request(getCityWeatherQuery)
