import { makeAutoObservable } from 'mobx'

// ...they said I could be anything
const logger = console

export class LoggerStore {
  constructor() {
    makeAutoObservable(this)
  }

  info = (message: string): void => {
    logger.log(message)
  }

  warning = (message: string): void => {
    logger.warn(message)
  }

  error = (message: string): void => {
    logger.error(message)
  }
}
