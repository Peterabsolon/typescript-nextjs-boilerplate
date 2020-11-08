import { makeAutoObservable } from 'mobx'
import axios, { AxiosInstance } from 'axios'

import { createApi, IApi } from '~/api'
import { AuthStore } from './auth'
import { ConfigStore } from './config'
import { LoggerStore } from './logger'
import { ModalStore } from './modal'
import { NotificationStore } from './notification'
import { RouterStore } from './router'
import { ThemeStore } from './theme'

const USE_MOCK_API = 'USE_MOCK_API'

export class UtilsStore {
  // ====================================================
  // Model
  // ====================================================
  useMocks = process.env.NODE_ENV !== 'production'
  appReady = false

  auth = new AuthStore()
  config = new ConfigStore()
  logger = new LoggerStore()
  modal = new ModalStore()
  notification = new NotificationStore()
  router = new RouterStore()
  theme = new ThemeStore()

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // API
  // ====================================================
  get apiUrl(): string {
    return this.config.webApiUrl || process.env.API_URL || ''
  }

  get headers(): IAnyObject {
    if (!this.auth.token) return {}

    return {
      Authorization: `X-Auth-Token ${this.auth.token}`,
    }
  }

  get apiClient(): AxiosInstance {
    return axios.create({
      baseURL: this.apiUrl,
      headers: this.headers,
    })
  }

  get api(): IApi {
    return createApi(this.useMocks, this.apiClient)
  }

  // ====================================================
  // Actions
  // ====================================================
  initApp = (): void => {
    if (window) {
      const item = window.localStorage.getItem(USE_MOCK_API)
      this.useMocks = item && JSON.parse(item)

      const { prerenderedData } = window as any
      this.config.set(prerenderedData)

      this.appReady = true
    }
  }

  toggleMocks = (): void => {
    this.useMocks = !this.useMocks

    if (window) {
      window.localStorage.setItem(USE_MOCK_API, JSON.stringify(this.useMocks))
      window.location.reload()
    }
  }
}
