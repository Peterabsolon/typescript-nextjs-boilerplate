import { action, makeAutoObservable } from 'mobx'

// TODO
export class NotificationStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action success = (message: string): void => {
    console.log('[SUCCESS]', message)
  }

  @action error = (message: string): void => {
    console.log('[ERROR]', message)
  }
}
