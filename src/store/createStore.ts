import { action, makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'

const API_URL = 'https://cat-fact.herokuapp.com'

interface Fact {
  _id: string
  text: string
}

class AppStore {
  facts: Fact[] = []

  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  @action setLoading = (loading: boolean) => {
    this.loading = loading
  }

  @action setFacts = (facts: Fact[]) => {
    this.facts = facts
  }

  @action fetchFacts = async () => {
    this.setLoading(true)

    const res = await window.fetch(`${API_URL}/facts/random?amount=3`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    this.setFacts(await res.json())
    this.setLoading(false)
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
