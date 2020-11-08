import { makeAutoObservable } from 'mobx'

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
