import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Button as RebassButton, ButtonProps as RebassButtonProps } from 'rebass'
import styled, { css } from 'styled-components'

export interface ButtonProps extends RebassButtonProps {
  label?: string
}

const StyledRebassButton = styled(RebassButton)`
  // override specifity
  && {
    font-weight: 400;
    font-size: inherit;
    padding: 9px 10px;
    white-space: nowrap;

    ${(props) => css`
      ${props.onClick &&
      css`
        &:hover {
          cursor: pointer;
        }
      `}

      ${props.disabled &&
      css`
        opacity: 0.7;
      `}

      ${props.variant === 'outline' &&
      css`
        // use solid border instead of shadow
        box-shadow: inset 0 0 0 2px;
      `}
    `}
  }
` as typeof RebassButton

export const Button: FC<ButtonProps> = observer(
  ({ type = 'button', children, label, ...props }) => (
    <StyledRebassButton type={type} {...props}>
      {label || children}
    </StyledRebassButton>
  )
)
