import { Order, PalletType } from './data'

export interface IApi {
  getOrder: (id: string) => Promise<Order>
  getPalletTypes: () => Promise<PalletType[]>
  loginAdmin: (user: string, pass: string) => Promise<string>
}
