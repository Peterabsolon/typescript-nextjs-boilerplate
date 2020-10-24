import { action, makeAutoObservable } from 'mobx'

import { ThemeKey, themes } from '~/constants'

interface Fact {
  _id: string
  text: string
}

const API_URL = 'https://cat-fact.herokuapp.com'
const GET_HEADERS = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
}

export class HomeStore {
  facts: Fact[] = []
  factsFetching = false
  factsFetched = false

  themeKey: ThemeKey = 'dark'

  constructor() {
    makeAutoObservable(this)
  }

  get theme(): Theme {
    return themes[this.themeKey]
  }

  @action fetchFacts = async (): Promise<void> => {
    if (this.factsFetching) {
      return
    }

    this.factsFetching = true

    try {
      const res = await window.fetch(`${API_URL}/facts/random?amount=3`, GET_HEADERS)
      const facts = await res.json()

      this.facts = facts
      this.factsFetched = true
    } catch (error) {
      console.error(error)
    } finally {
      this.factsFetching = false
    }
  }

  @action switchTheme = (): void => {
    this.themeKey = this.themeKey === 'light' ? 'dark' : 'light'
  }

  @action onPageMount = (): void => {
    if (!this.factsFetched) {
      this.fetchFacts()
    }
  }
}
