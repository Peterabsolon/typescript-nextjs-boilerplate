/* eslint-disable no-alert */

import { makeAutoObservable } from 'mobx'

// TODO
export class NotificationStore {
  constructor() {
    makeAutoObservable(this)
  }

  success = (message: string): void => {
    alert(`[SUCCESS] ${message}`)
  }

  error = (message: string): void => {
    alert(`[ERROR] ${message}`)
  }
}
