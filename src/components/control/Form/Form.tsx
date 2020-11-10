import { FC, FormEvent } from 'react'
import { makeAutoObservable, observable } from 'mobx'
import { observer } from 'mobx-react-lite'

import { Button } from '~/components/ui/Button'

import { InputModel } from '../Input'

export interface FormModelProps<FormValues> {
  fields: InputModel[]
  onSubmit: (values: FormValues) => Promise<any>
}

export class FormModel<FormValues extends IAnyObject> {
  // ====================================================
  // Model
  // ====================================================
  fields = observable<InputModel>([])
  opened = false

  constructor(readonly props: FormModelProps<FormValues>) {
    makeAutoObservable(this)
    this.fields.replace(props.fields)
  }

  // ====================================================
  // Views
  // ====================================================
  get values(): FormValues {
    return this.fields.reduce((map, field) => {
      map[field.name] = field.value
      return map
    }, {} as IAnyObject) as FormValues
  }

  get valid(): boolean {
    return this.fields.every((field) => field.valid)
  }

  get pristine(): boolean {
    return this.fields.every((field) => field.pristine)
  }

  // ====================================================
  // Actions
  // ====================================================
  clear = (): void => {
    this.fields.forEach((field) => field.clear())
  }

  open = (): void => {
    this.opened = true
  }

  close = (): void => {
    this.opened = false
    this.clear()
  }

  onSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    if (!this.valid) {
      this.fields.forEach((field) => field.touch())
      return
    }

    await this.props.onSubmit(this.values)

    this.close()
  }
}

// ====================================================
// Component
// ====================================================
export interface FormProps {
  className?: string
  model: FormModel<any>
}

export const Form: FC<FormProps> = observer(({ className, model }) => {
  if (!model.opened) {
    return null
  }

  return (
    <form className={className} onSubmit={model.onSubmit}>
      {model.fields.map((field) => (
        <div key={field.name}>{field.jsx}</div>
      ))}

      <Button label="Clear" onClick={model.clear} disabled={model.pristine} />
      <Button type="submit" label="Submit" disabled={model.pristine} />
    </form>
  )
})
