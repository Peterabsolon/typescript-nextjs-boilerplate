import { Order, PalletType } from './data'

export interface IApi {
  getOrder: (id: string) => Promise<Order>
  getPalletTypes: () => Promise<PalletType[]>
  loginAdmin: (creds: { username: string; password: string }) => Promise<string>
}
