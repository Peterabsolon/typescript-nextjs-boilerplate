import { action, makeAutoObservable, configure } from 'mobx'
import { createContext, useContext } from 'react'

import { Theme } from '../constants'

configure({
  enforceActions: 'never',
})

const API_URL = 'https://cat-fact.herokuapp.com'

interface Fact {
  _id: string
  text: string
}

class AppStore {
  facts: Fact[] = []
  factsLoading = false

  theme: Theme = 'light'

  constructor() {
    makeAutoObservable(this)
  }

  @action fetchFacts = async () => {
    if (this.factsLoading) return
    this.factsLoading = true

    const res = await window.fetch(`${API_URL}/facts/random?amount=3`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    this.facts = await res.json()
    this.factsLoading = false
  }

  @action switchTheme = () => {
    this.theme = this.theme === 'light' ? 'dark' : 'light'
  }
}

let store: AppStore

export function createStore(): AppStore {
  if (store) {
    return store
  }

  store = new AppStore()
  return store
}

export function useStore(): AppStore {
  return useContext(createContext(store))
}
