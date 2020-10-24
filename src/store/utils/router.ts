import { action, makeAutoObservable } from 'mobx'

// TODO
export class RouterStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action redirect = (href: string): void => {
    console.log('nav to href', href)
  }
}
