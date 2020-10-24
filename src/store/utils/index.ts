import { makeAutoObservable } from 'mobx'
import { createApi, IApi } from '~/api'
import { AuthStore } from './auth'
import { LoggerStore } from './logger'
import { ModalStore } from './modal'
import { NotificationStore } from './notification'
import { RouterStore } from './router'
import { ThemeStore } from './theme'

const USE_MOCK_API = 'USE_MOCK_API'

export class UtilsStore {
  useMockApi = false
  appReady = false

  auth = new AuthStore()
  logger = new LoggerStore()
  modal = new ModalStore()
  notification = new NotificationStore()
  router = new RouterStore()
  theme = new ThemeStore()

  constructor() {
    makeAutoObservable(this)
  }

  get api(): IApi {
    return createApi(this.useMockApi, this.auth.restClient, this.auth.graphqlClient)
  }

  initApp = (): void => {
    if (window) {
      const item = window.localStorage.getItem(USE_MOCK_API)

      this.useMockApi = item && JSON.parse(item)
      this.appReady = true
    }
  }

  toggleMockApi = (): void => {
    this.useMockApi = !this.useMockApi

    if (window) {
      window.localStorage.setItem(USE_MOCK_API, JSON.stringify(this.useMockApi))
      window.location.reload()
    }
  }
}
