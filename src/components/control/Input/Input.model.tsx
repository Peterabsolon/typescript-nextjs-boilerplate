import { FC } from 'react'
import { autorun, makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { v4 as uuid } from 'uuid'

import { InputElement } from './Input.element'

type Validator = (value: string) => string | undefined

// TODO: Enable after perf profile
const DEBOUNCE_MS = 50

interface InputModelProps {
  name: string
  noDebounce?: boolean
  label?: string
  type?: 'text' | 'number'
  validate?: Validator
}

export class InputModel {
  // ====================================================
  // Model
  // ====================================================
  state = ''
  value = ''
  touched = false
  focused = false

  constructor(readonly props?: InputModelProps) {
    makeAutoObservable(this)

    autorun(
      () => {
        this.value = this.state
      },
      { delay: props?.noDebounce ? 0 : DEBOUNCE_MS }
    )
  }

  // ====================================================
  // Views
  // ====================================================
  get name(): string {
    return this.props?.name || uuid()
  }

  get error(): string | undefined {
    if (!this.props?.validate) {
      return undefined
    }

    return this.props.validate(this.value)
  }

  get valid(): boolean {
    return Boolean(!this.error)
  }

  get jsx(): JSX.Element {
    return <Input model={this} {...this.props} />
  }

  // ====================================================
  // Actions
  // ====================================================
  set = (state: string): void => {
    this.state = state
  }

  clear = (): void => {
    this.state = ''
    this.touched = false
  }

  pop = (): string => {
    const val = this.value
    this.clear()
    return val
  }

  touch = (): void => {
    this.touched = true
  }

  focus = (): void => {
    this.focused = true
  }

  blur = (): void => {
    this.touch()
    this.focused = false
  }
}

// ====================================================
// Component
// ====================================================
export interface InputProps {
  label?: string
  className?: string
  model: InputModel
}

export const Input: FC<InputProps> = observer(({ className, model, label }) => {
  return (
    <div>
      {label}

      <InputElement
        className={className}
        type="text"
        value={model.state}
        onChange={(e) => model.set(e.target.value)}
        onBlur={model.blur}
        onFocus={model.focus}
      />

      {model.touched && model.error}
    </div>
  )
})
