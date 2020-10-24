import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { Button as RebassButton, ButtonProps as RebassButtonProps } from 'rebass'
import styled, { css } from 'styled-components'

export interface ButtonProps extends RebassButtonProps {
  foo?: string
}

const StyledRebassButton = styled(RebassButton)`
  font-weight: 500;

  // override specifity
  && {
    ${(props) => {
      switch (props.variant) {
        case 'outline':
          return css`
            // use solid border instead of shadow
            box-shadow: inset 0 0 0 2px;
          `
        default:
          return ''
      }
    }}
  }
` as typeof RebassButton

export const Button: FC<ButtonProps> = observer((props) => <StyledRebassButton {...props} />)
