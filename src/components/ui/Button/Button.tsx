import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Button as RebassButton, ButtonProps as RebassButtonProps } from 'rebass'
import styled from 'styled-components'

export interface ButtonProps extends RebassButtonProps {
  foo?: string
}

const StyledRebassButton = styled(RebassButton)`
  font-weight: 500;
  border: 2px solid transparent;

  :focus {
    outline: none;
    border-color: #fff;
  }

  ${(props) => {
    switch (props.variant) {
      case 'outline':
        return 'box-shadow: inset 0 0 0 2px'
      default:
        return ''
    }
  }}
` as typeof RebassButton

export const Button: FC<ButtonProps> = observer((props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (props.onClick) props.onClick(event)
  }

  return <StyledRebassButton {...props} onClick={handleClick} />
})
