// TODO: https://mswjs.io/ seems better, this works for now

import { IApi } from './api.interface'
import { Kit, Order, OrderItem, PalletType } from './data'

const ORDER_ITEM_1_ID = 'ORDER_ITEM_1_ID'

export const orderItems: OrderItem[] = [
  {
    barcode: '1-barcode',
    batchNo: '',
    batchNo2: '',
    buentId: 50,
    client: 'Plantronics',
    customs: null,
    description: 'Cool new Samsung TV',
    expiryDate: '',
    isKit: false,
    itemNumber: ORDER_ITEM_1_ID,
    kitNumber: '',
    kitQuantity: '',
    lineNumberReference: '1',
    name2: 'Samsung TV',
    netWeight: 2.187,
    orderLineText3: '',
    productionDate: null,
    quantity: 1,
    scanSerialNumbers: true,
    serialNumbersMaxLength: null,
    serialNumbersPattern: null,
    totalWeight: 2.187,
    unit: 'KS',
  },
]

export const kits: Kit[] = [
  {
    kitNumber: 'Kit-123',
    kitQuantity: 2,
    items: [{ itemNumber: ORDER_ITEM_1_ID, quantity: 1 }],
  },
]

export const order: Order = {
  orderNumber: '123',
  client: 'Plantronics',
  dispatchDate: '1. 1. 2020',
  deliveryDate: '1. 1. 2020',
  remarksOrder: '456',
  remarksPartOrder: '',
  deliveryAddress: {
    city: 'ESPOO',
    company: '',
    country: 'FI',
    street: 'JUVAN TEOLLISUUSKATU 15B',
    zipCode: '02920',
  },
  supplier: {
    city: 'ESPOO',
    company: 'INSMAT OY',
    country: 'FI',
    street: '',
    zipCode: '02920',
  },
  orderMode: 'PLT_Standard',
  reference: '',
  customsProperty: 'Non-Bonded',
  dispatchMode: 'DSV',
  carrier: 'DSV',
  freightMode: 'Standard',
  orderVolume: '2845.02',
  totalWeight: 378,
  nettoWeight: 378,
  consigmentNumber: 'BUAUK_40',
  orderItems,
  kits,
}

const palletTypes: PalletType[] = [{ id: 1001, name: 'EUR', length: 3, width: 3 }]

export const mockApi: IApi = {
  getOrder: () => Promise.resolve(order),
  getPalletTypes: () => Promise.resolve(palletTypes),
  loginAdmin: () => Promise.resolve('MOCK_TOKEN'),
}
