import { makeAutoObservable, set } from 'mobx'

import { OrderItem } from '~/api/data'

export class ScannedItemModel implements Partial<OrderItem> {
  palletNo: string
  itemNumber: string
  kitNumber: string
  description: string
  quantity = 0
  unit: string
  customs: string | null

  quantityTemp = 0
  saved = false

  constructor(data: OrderItem & { palletNo: string }) {
    makeAutoObservable(this)
    set(this, data)
  }

  setTempQuantity = (qty: number): void => {
    this.quantityTemp = Number.isNaN(qty) ? 999999999 : qty
  }

  save = (): void => {
    this.quantity = this.quantityTemp
    this.saved = true
  }
}
