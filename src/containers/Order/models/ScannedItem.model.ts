import { makeAutoObservable } from 'mobx'

export class ScannedItemModel {
  constructor() {
    makeAutoObservable(this)
  }
}
