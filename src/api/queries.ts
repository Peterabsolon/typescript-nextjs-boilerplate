import { gql } from 'graphql-request'

export const cityWeatherQuery = gql`
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
