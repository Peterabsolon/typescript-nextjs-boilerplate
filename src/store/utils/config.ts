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
}
