import { makeAutoObservable } from 'mobx'
import axios, { AxiosInstance } from 'axios'

import { API_URL } from '~/constants'

export class AuthStore {
  // ====================================================
  // Model
  // ====================================================
  token?: string

  constructor() {
    makeAutoObservable(this)
  }

  // ====================================================
  // Views
  // ====================================================
  get loggedIn(): boolean {
    return Boolean(this.token)
  }

  get headers(): IAnyObject {
    return {
      Authorization: this.token ? `Bearer ${this.token}` : undefined,
    }
  }

  get apiClient(): AxiosInstance {
    return axios.create({
      baseURL: API_URL,
      headers: this.headers,
    })
  }

  // ====================================================
  // Actions
  // ====================================================
  login = (): Promise<void> => {
    this.token = '123'
    return Promise.resolve()
  }

  logout = (): Promise<void> => {
    this.token = undefined
    return Promise.resolve()
  }
}
