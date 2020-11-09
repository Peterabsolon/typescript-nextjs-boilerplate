import { makeAutoObservable, set } from 'mobx'

import { OrderItem } from '~/api/data'

import { ScannedItemModel } from './ScannedItem.model'

export class OrderItemModel implements OrderItem {
  // ====================================================
  // Model
  // ====================================================
  barcode: string
  batchNo: string
  batchNo2: string
  buentId: number
  client: string
  customs: string | null
  description: string
  expiryDate: string
  isKit: boolean // is part of a kit
  itemNumber: string
  kitNumber: string // kit identifier
  kitQuantity: string // count of kits
  lineNumberReference: string
  name2: string
  netWeight: number
  orderLineText3: string
  productionDate: string | null
  quantity: number
  scanSerialNumbers: boolean
  serialNumbersMaxLength: number | null
  serialNumbersPattern: string | null
  totalWeight: number
  unit: string

  constructor(data: OrderItem, readonly scannedItems: ScannedItemModel[]) {
    makeAutoObservable(this)
    set(this, data)
  }

  // ====================================================
  // Memoized views
  // ====================================================
  get id(): number {
    return this.buentId
  }

  get scanned(): number {
    return this.scannedItems.reduce((acc, item) => {
      if (item.itemNumber === this.itemNumber && item.kitNumber === this.kitNumber) {
        return acc + item.quantity
      }

      return acc
    }, 0)
  }

  get remaining(): number {
    return this.quantity - this.scanned
  }

  get scanningDone(): boolean {
    return this.remaining === 0
  }
}
