import { makeAutoObservable } from 'mobx'

import { Kit, KitItem } from '~/api/data'

export class ScannedKitModel implements Kit {
  kitNumber: string
  kitQuantity: number
  items: KitItem[]

  constructor() {
    makeAutoObservable(this)
  }
}
