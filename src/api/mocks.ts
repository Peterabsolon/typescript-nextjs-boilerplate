// TODO: https://mswjs.io/ seems better, this works for now

import { IApi } from './api.interface'
import { Kit, Order, OrderItem, PalletType } from './data'

const ORDER_ITEM_1_ID = 'ITEM-1'
const ORDER_ITEM_2_ID = 'ITEM-2'
const KIT_1_ID = 'KIT-1'

export const orderItems: OrderItem[] = [
  {
    barcode: `${ORDER_ITEM_1_ID}-barcode`,
    batchNo: '',
    batchNo2: '',
    buentId: 50,
    client: 'Plantronics',
    customs: null,
    description: 'OLED Samsung TV',
    expiryDate: '',
    isKit: true,
    itemNumber: ORDER_ITEM_1_ID,
    kitNumber: KIT_1_ID,
    kitQuantity: '1',
    lineNumberReference: '1',
    name2: 'Samsung TV',
    netWeight: 2.187,
    orderLineText3: '',
    productionDate: null,
    quantity: 1,
    scanSerialNumbers: false,
    serialNumbersMaxLength: null,
    serialNumbersPattern: null,
    totalWeight: 2.187,
    unit: 'KS',
  },
  {
    barcode: `${ORDER_ITEM_2_ID}-barcode`,
    batchNo: '',
    batchNo2: '',
    buentId: 51,
    client: 'Plantronics',
    customs: null,
    description: 'HTML cable',
    expiryDate: '',
    isKit: true,
    itemNumber: ORDER_ITEM_2_ID,
    kitNumber: KIT_1_ID,
    kitQuantity: '1',
    lineNumberReference: '1',
    name2: 'HTML 2.0 Cable',
    netWeight: 2.187,
    orderLineText3: '',
    productionDate: null,
    quantity: 1,
    scanSerialNumbers: false,
    serialNumbersMaxLength: null,
    serialNumbersPattern: null,
    totalWeight: 2.187,
    unit: 'KS',
  },
]

export const kits: Kit[] = [
  {
    kitNumber: KIT_1_ID,
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

const palletTypes: PalletType[] = [
  { id: 1001, name: 'EUR', length: 3, width: 3 },
  { id: 1002, name: 'EUR-2', length: 5, width: 5 },
]

export const mockApi: IApi = {
  getOrder: () => Promise.resolve(order),
  getPalletTypes: () => Promise.resolve(palletTypes),
  loginAdmin: () => Promise.resolve('MOCK_TOKEN'),
}
