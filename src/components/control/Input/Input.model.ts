import { autorun, makeAutoObservable } from 'mobx'

// TODO: Enable after perf profile
const DEBOUNCE_MS = 0

export class InputModel {
  temp = ''
  value = ''

  constructor(opts?: { disableDebounce: boolean }) {
    makeAutoObservable(this)

    autorun(
      () => {
        this.value = this.temp
      },
      { delay: opts?.disableDebounce ? 0 : DEBOUNCE_MS }
    )
  }

  set = (value: string): void => {
    this.temp = value
  }

  clear = (): void => {
    this.temp = ''
  }

  pop = (): string => {
    const val = this.value
    this.clear()
    return val
  }
}
