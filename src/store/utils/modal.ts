import { makeAutoObservable } from 'mobx'

// TODO
export class ModalStore {
  openModals: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  open = (id: string): void => {
    console.log('open modal id', id)
  }

  close = (): void => {
    this.openModals = []
  }
}
