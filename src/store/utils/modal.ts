import { action, makeAutoObservable } from 'mobx'

// TODO
export class ModalStore {
  openModals: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action open = (id: string): void => {
    console.log('open modal id', id)
  }

  @action close = (): void => {
    this.openModals = []
  }
}
