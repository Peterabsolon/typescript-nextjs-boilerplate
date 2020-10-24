import { action, makeAutoObservable } from 'mobx'
import { createApi, IApi } from '~/api'
import { AuthStore } from './auth'
import { LoggerStore } from './logger'
import { ModalStore } from './modal'
import { NotificationStore } from './notification'
import { RouterStore } from './router'
import { ThemeStore } from './theme'

export class UtilsStore {
  useMockApi = false

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

  @action toggleMockApi = (): void => {
    this.useMockApi = !this.useMockApi
  }
}
