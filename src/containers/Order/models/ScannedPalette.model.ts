import { makeAutoObservable, set } from 'mobx'

export class ScannedPaletteModel {
  paletteNo: string

  type: string

  constructor(data: { paletteNo: string }) {
    makeAutoObservable(this)
    set(this, data)
  }

  get id(): string {
    return this.paletteNo
  }

  setType = (type: string): void => {
    this.type = type
  }
}
