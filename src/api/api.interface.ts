import { Fact, CityWeather } from './models'

export interface IApi {
  getFacts: (count: number) => Promise<Fact[]>
  getCityWeather: (name: string) => Promise<CityWeather>
  someMutation: () => Promise<void>
}
