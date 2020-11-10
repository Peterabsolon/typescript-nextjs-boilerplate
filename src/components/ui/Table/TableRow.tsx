import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'

export interface TableRowProps {
  children: ReactNode
  row: IAnyObject
  highlighted?: boolean
}

const Wrapper = styled.tr<Pick<TableRowProps, 'highlighted'>>`
  ${(props) => css`
    ${props.highlighted &&
    css`
      > td {
        background: #fbd0b1;
      }
    `}
  `}
`

export const TableRow: FC<TableRowProps> = observer(({ children, highlighted }) => {
  return <Wrapper highlighted={highlighted}>{children}</Wrapper>
})
