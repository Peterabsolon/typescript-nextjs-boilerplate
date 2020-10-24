import { makeAutoObservable } from 'mobx'

// TODO
export class RouterStore {
  constructor() {
    makeAutoObservable(this)
  }

  redirect = (href: string): void => {
    console.log('nav to href', href)
  }
}
