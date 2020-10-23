import { action, makeAutoObservable } from 'mobx'

import { Theme } from '../../constants'

const API_URL = 'https://cat-fact.herokuapp.com'

interface Fact {
  _id: string
  text: string
}

export class HomeStore {
  facts: Fact[] = []
  factsLoading = false

  theme: Theme = 'light'

  constructor() {
    makeAutoObservable(this)
  }

  @action fetchFacts = async (): Promise<void> => {
    if (this.factsLoading) return
    this.factsLoading = true

    const res = await window.fetch(`${API_URL}/facts/random?amount=3`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    this.facts = await res.json()
    this.factsLoading = false
  }

  @action switchTheme = (): void => {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
}
