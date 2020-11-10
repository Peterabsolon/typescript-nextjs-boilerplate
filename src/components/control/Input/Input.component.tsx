import { ChangeEvent, FC } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

export interface InputComponentProps {
  type?: 'text' | 'number'
  className?: string
  error?: string
  label?: string
  touched?: boolean
  value: string
  onBlur?: () => void
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
}

export const StyledInput = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d1d9f4;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`

export const InputComponent: FC<InputComponentProps> = observer(
  ({
    className = '',
    error,
    label,
    onBlur,
    onChange,
    onFocus,
    touched = false,
    type = 'text',
    value,
  }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value, e)
      }
    }

    return (
      <>
        {label}

        <StyledInput
          className={className}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        {touched && error}
      </>
    )
  }
)
