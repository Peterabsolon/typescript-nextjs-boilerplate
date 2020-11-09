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

  constructor(data: OrderItem & { palletNo: string }) {
    makeAutoObservable(this)
    set(this, data)
  }

  setQuantity = (qty: number): void => {
    this.quantity = qty
  }
}
