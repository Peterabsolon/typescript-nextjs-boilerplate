import { AxiosInstance } from 'axios'
import { GraphQLClient } from 'graphql-request'

import * as mocks from './api.mock'
import { Fact, CityWeather } from './models'
import * as queries from './queries'
import * as mutations from './mutations'

export interface IApi {
  getFacts: (count: number) => Promise<Fact[]>
  getCityWeather: (name: string) => Promise<CityWeather>
  someMutation: () => Promise<void>
}

// Passed in are client instances with Authorization header configured from the store
export const createApi = (
  useMocks: boolean,
  axios: AxiosInstance,
  graphql: GraphQLClient
): IApi => {
  if (useMocks) {
    // Typecheck all requests have mock version
    return mocks
  }

  return {
    getFacts: (count) => axios.get(`/facts/random?amount=${count}`),
    getCityWeather: (name) => graphql.request(queries.cityWeatherQuery, name),
    someMutation: () => graphql.request(mutations.someMutation),
  }
}
