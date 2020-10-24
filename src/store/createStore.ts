import { configure, makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'

import { HomeStore } from '~/containers/Home'

import { UtilsStore } from './utils'

configure({ enforceActions: 'never' })

class AppStore {
  utils = new UtilsStore()

  pages = {
    HomeStore: new HomeStore(this.utils),
  }

  constructor() {
    makeAutoObservable(this)
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
