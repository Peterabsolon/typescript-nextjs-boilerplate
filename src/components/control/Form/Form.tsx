import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { Button } from '../../ui/Button'

import { FormModel } from './Form.model'

const StyledForm = styled.form``

export interface FormProps {
  className?: string
  model: FormModel<any>
}

export const Form: FC<FormProps> = observer(({ className, model }) => {
  return (
    <StyledForm className={className} onSubmit={model.onSubmit}>
      {model.fields.map((field) => field.jsx)}

      <Button label="Clear" />
      <Button type="submit" label="Submit" />
    </StyledForm>
  )
})
