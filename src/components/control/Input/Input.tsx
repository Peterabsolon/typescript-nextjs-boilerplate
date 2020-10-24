import { FC } from 'react'

export interface InputProps {
  value: string
  label: string
}

export const Input: FC<InputProps> = () => {
  return <input type="text" />
}
