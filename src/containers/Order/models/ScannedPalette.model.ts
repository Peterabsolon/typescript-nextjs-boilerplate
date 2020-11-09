import { makeAutoObservable, set } from 'mobx'
import { PalletType } from '~/api/data'

export class ScannedPaletteModel {
  paletteNo: string
  type: PalletType

  constructor(data: { paletteNo: string }) {
    makeAutoObservable(this)
    set(this, data)
  }

  get id(): string {
    return this.paletteNo
  }

  setType = (type: PalletType): void => {
    this.type = type
  }
}
