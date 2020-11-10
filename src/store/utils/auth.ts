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
  setToken = (token: string): void => {
    this.token = token
  }

  clear = (): void => {
    this.token = undefined
  }
}
