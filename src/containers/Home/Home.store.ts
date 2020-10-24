import { makeAutoObservable } from 'mobx'

import { CityWeather, Fact } from '~/api/models'
import { UtilsStore } from '~/store/utils'

export class HomeStore {
  facts: Fact[] = []
  factsFetching = false
  factsFetched = false

  city?: string
  weather?: CityWeather
  weatherFetching = false
  weatherFetched = false

  constructor(private utils: UtilsStore) {
    makeAutoObservable(this)
  }

  fetchFacts = async (): Promise<void> => {
    this.factsFetching = true

    try {
      this.facts = await this.utils.api.getFacts(5)
      this.factsFetched = true
    } catch (error) {
      this.utils.notification.error(error)
      this.utils.logger.error(error)
    } finally {
      this.factsFetching = false
    }
  }

  fetchWeather = async (): Promise<void> => {
    if (!this.city) return

    this.weatherFetching = true

    try {
      this.weather = await this.utils.api.getCityWeather(this.city)
      this.weatherFetched = true
    } catch (error) {
      this.utils.notification.error(error)
      this.utils.logger.error(error)
    } finally {
      this.weatherFetching = false
    }
  }

  setCity = (city: string): void => {
    this.city = city
  }

  mountPage = (): void => {
    if (!this.factsFetched) this.fetchFacts()
    if (!this.weatherFetched) this.fetchWeather()
  }
}
