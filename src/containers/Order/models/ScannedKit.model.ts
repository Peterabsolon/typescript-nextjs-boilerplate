import { makeAutoObservable, observable, set } from 'mobx'

import { Kit, KitItem } from '~/api/data'

import { OrderItemModel } from './OrderItem.model'

export class ScannedKitModel implements Kit {
  kitNumber: string
  kitQuantity: number
  items: KitItem[]
  orderItems = observable<OrderItemModel>([])

  constructor(data: Kit, orderItems: OrderItemModel[]) {
    makeAutoObservable(this)
    set(this, data)
    this.orderItems.replace(orderItems)
  }
}
