import { makeAutoObservable, observable, set } from 'mobx'

import { Kit, KitItem } from '~/api/data'

import { OrderItemModel } from './OrderItem.model'
import { ScannedItemModel } from './ScannedItem.model'

export class ScannedKitModel implements Kit {
  // ====================================================
  // Model
  // ====================================================
  kitNumber: string
  kitQuantity: number
  items: KitItem[]

  orderItems = observable<OrderItemModel>([])

  constructor(readonly data: Kit, readonly scannedItems: ScannedItemModel[]) {
    makeAutoObservable(this)
    set(this, data)
    this.creteItems(data.items)
  }

  // ====================================================
  // Views
  // ====================================================
  get scanningDone(): boolean {
    return this.orderItems.every((item) => item.scanningDone)
  }

  // ====================================================
  // Actions
  // ====================================================
  creteItems = (kitItems: KitItem[]): void => {
    const orderItems = kitItems.map(
      (kitItem) =>
        new OrderItemModel(
          {
            ...kitItem,
            kitNumber: this.kitNumber,
          },
          this.scannedItems
        )
    )

    this.orderItems.replace(orderItems)
  }
}
