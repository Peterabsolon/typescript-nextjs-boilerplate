import { configure, makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'

import { OrderStore } from '~/containers/Order/Order.store'

import { UtilsStore } from './utils'

configure({ enforceActions: 'never' })

class AppStore {
  utils = new UtilsStore()

  pages = {
    OrderStore: new OrderStore(this.utils),
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
