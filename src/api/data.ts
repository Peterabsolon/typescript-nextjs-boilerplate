export * from '../generated'

export interface PalletType {
  id: number
  name: string
  width: number | null
  length: number | null
}

export interface KitItem {
  itemNumber: string
  quantity: number
}

export interface Kit {
  kitNumber: string
  kitQuantity: number
  items: KitItem[]
}

export interface Address {
  company: string
  street: string
  city: string
  zipCode: string
  country: string
}

export interface OrderItem {
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
}

export interface Order {
  carrier: string
  client: string
  consigmentNumber: string
  customsProperty: string
  deliveryAddress: Address
  deliveryDate: string
  dispatchDate: string
  dispatchMode: string
  freightMode: string
  kits: Kit[]
  nettoWeight: number
  orderItems: OrderItem[]
  orderMode: string
  orderNumber: string
  orderVolume: string
  reference: string
  remarksOrder: string
  remarksPartOrder: string
  supplier: Address
  totalWeight: number
}
