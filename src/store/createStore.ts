import { configure } from 'mobx'
import { createContext, useContext } from 'react'

import { HomeStore } from '~/containers/Home'

import { ApiStore } from './api'
import { AuthStore } from './auth'

configure({ enforceActions: 'never' })

class AppStore {
  api = new ApiStore()
  auth = new AuthStore()

  pages = {
    home: new HomeStore()
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
