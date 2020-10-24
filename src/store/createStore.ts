import { action, configure, makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'

import { ThemeKey, themes } from '~/constants'
import { HomeStore } from '~/containers/Home'

import { ApiStore } from './api'

configure({ enforceActions: 'never' })

class AppStore {
  themeKey: ThemeKey = 'dark'
  authToken?: string = undefined

  api = new ApiStore(this.authToken)

  pages = {
    HomeStore: new HomeStore(),
  }

  constructor() {
    makeAutoObservable(this)
  }

  get theme(): Theme {
    return themes[this.themeKey]
  }

  get loggedIn(): boolean {
    return Boolean(this.authToken)
  }

  @action toggleTheme = (): void => {
    this.themeKey = this.themeKey === 'light' ? 'dark' : 'light'
  }

  @action login = () => {
    this.authToken = '123'
  }

  @action logout = () => {
    this.authToken = undefined
  }
}

let store: AppStore

export function createStore(): AppStore {
  if (store) return store
  store = new AppStore()
  return store
}

export function useStore(): AppStore {
  return useContext(createContext(store))
}
