import { gql } from 'graphql-request'

export const cityWeatherQuery = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      id
      weather {
        summary {
          title
          description
        }
      }
    }
  }
`
