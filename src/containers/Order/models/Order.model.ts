import { makeAutoObservable, observable, set } from 'mobx'

import { Address, Kit, Order } from '~/api/data'

import { OrderItemModel } from './OrderItem.model'

export class OrderModel implements Partial<Order> {
  // ====================================================
  // Model
  // ====================================================
  client = 'Plantronics'
  deliveryAddress: Address
  kits: Kit[]

  // deeply observed objects/models
  orderItems = observable<OrderItemModel>([])

  constructor(data: Order) {
    makeAutoObservable(this)
    set(this, data)

    const orderItems = data.orderItems.map((item) => new OrderItemModel(item))
    console.log('orderItems', orderItems)

    this.orderItems.replace(orderItems)
  }

  // ====================================================
  // Memoized views
  // ====================================================
  get isPlantronics(): boolean {
    return Boolean(this.client === 'Plantronics')
  }
}
