import { Order, PalletType } from './data'

export interface IApi {
  getOrder: (id: number) => Promise<Order>
  getPalletTypes: () => Promise<PalletType[]>
  loginAdmin: (user: string, pass: string) => Promise<string>
}
