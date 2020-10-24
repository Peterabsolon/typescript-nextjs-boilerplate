import { AxiosInstance } from 'axios'
import { GraphQLClient } from 'graphql-request'

import { IApi } from './api.interface'
import { mocks } from './mocks'
import { someMutation } from './mutations'
import { cityWeatherQuery } from './queries'

// Passed in are client instances with Authorization header configured from the store
export const createApi = (useMocks: boolean, axios: AxiosInstance, gql: GraphQLClient): IApi => {
  if (useMocks) {
    // Typecheck all requests have mock version
    return mocks
  }

  // prettier-ignore
  return {
    getFacts: (count) => axios.get(`/facts/random?amount=${count}`).then((res) => res.data),
    getCityWeather: (name) => gql.request(cityWeatherQuery, { name }).then(res => res.getCityByName),
    someMutation: () => gql.request(someMutation).then(),
  }
}
