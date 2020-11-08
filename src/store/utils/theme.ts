import { makeAutoObservable } from 'mobx'

import { ThemeKey, themes } from '~/constants'

export class ThemeStore {
  key: ThemeKey = 'light'

  constructor() {
    makeAutoObservable(this)
  }

  get theme(): Theme {
    return themes[this.key]
  }

  toggle = (): void => {
    this.key = this.key === 'light' ? 'dark' : 'light'
  }
}
