import { makeAutoObservable, observable } from 'mobx'
import { FormEvent } from 'react'
import { InputModel } from '../Input'

export interface FormModelProps<FormValues> {
  fields: InputModel[]
  onSubmit: (values: FormValues) => Promise<any>
}

export class FormModel<FormValues extends IAnyObject> {
  fields = observable<InputModel>([])

  constructor(readonly props: FormModelProps<FormValues>) {
    makeAutoObservable(this)
    this.fields.replace(props.fields)
  }

  get values(): FormValues {
    return this.fields.reduce((map, field) => {
      map[field.name] = field.value
      return map
    }, {} as IAnyObject) as FormValues
  }

  get valid(): boolean {
    return this.fields.every((field) => field.valid)
  }

  clear = (): void => {
    this.fields.forEach((field) => field.clear())
  }

  onSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (!this.valid) {
      this.fields.forEach((field) => field.touch())
      return
    }

    this.props.onSubmit(this.values)
  }
}
