export * from '../generated'

export interface Fact {
  _id: string
  text: string
}

export interface CityWeather {
  id: string
  weather: {
    summary: {
      title: string
      description: string
    }
  }
}
