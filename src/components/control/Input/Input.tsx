import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { InputModel } from './Input.model'

export interface InputProps {
  model: InputModel
}

export const Input: FC<InputProps> = observer(({ model }) => {
  return <input type="text" value={model.temp} onChange={(e) => model.set(e.target.value)} />
})
