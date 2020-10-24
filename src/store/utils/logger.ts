import { action, makeAutoObservable } from 'mobx'

// ...could be anything
const logger = console

export class LoggerStore {
  constructor() {
    makeAutoObservable(this)
  }

  @action info = (message: string): void => {
    logger.log(message)
  }

  @action warning = (message: string): void => {
    logger.warn(message)
  }

  @action error = (message: string): void => {
    logger.error(message)
  }
}
