import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  background: ${(props) => props.theme.colors.background};
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.gray};
  padding: 12px 16px;
`

export interface InputProps {
  value?: string
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, event)
  }

  return <StyledInput type="text" onChange={handleChange} value={value} />
}
