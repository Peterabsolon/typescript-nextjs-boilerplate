import { configure } from 'mobx'
import { createContext, useContext } from 'react'

import { HomeStore } from '../containers/Home'

configure({ enforceActions: 'never' })

class AppStore {
  HomeStore = new HomeStore()
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
