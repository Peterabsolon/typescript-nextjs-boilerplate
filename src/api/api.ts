import { AxiosInstance } from 'axios'
import { GraphQLClient } from 'graphql-request'

import * as mocks from './mocks'
import * as models from './models'
import * as mutations from './mutations'
import * as queries from './queries'

export interface IApi {
  getFacts: (count: number) => Promise<models.Fact[]>
  getCityWeather: (name: string) => Promise<models.CityWeather>
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

  // prettier-ignore
  return {
    getFacts: (count) => axios.get(`/facts/random?amount=${count}`).then((res) => res.data),
    getCityWeather: (name) => graphql.request(queries.cityWeatherQuery, { name }).then(res => res.getCityByName),
    someMutation: () => graphql.request(mutations.someMutation).then(),
  }
}
