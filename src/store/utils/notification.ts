/* eslint-disable no-alert */

import { action, makeAutoObservable } from 'mobx'

// TODO
export class NotificationStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action success = (message: string): void => {
    alert(`[SUCCESS] ${message}`)
  }

  @action error = (message: string): void => {
    alert(`[ERROR] ${message}`)
  }
}
