import { makeAutoObservable, set } from 'mobx'

interface PrerenderedData {
  webApiUrl: string
  checkSerialNumbersInDb: boolean
  frontendStateLogging: boolean
  frontendEnvironment: 'PROD' | 'TEST' | string
}

export class ConfigStore {
  webApiUrl?: string
  checkSerialNumbersInDb = false
  frontendStateLogging = false
  frontendEnvironment: 'PROD' | 'TEST' | string

  constructor() {
    makeAutoObservable(this)
  }

  set = (data: PrerenderedData): void => {
    set(this, data)
  }

  get envName(): string {
    switch (this.frontendEnvironment) {
      case 'PROD':
        return 'Packing module'
      case 'TEST':
        return 'Packing module'
      default:
        return 'Neznámé prostředí'
    }
  }
}
