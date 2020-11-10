import React, { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import styled, { css } from 'styled-components'

export interface TableCellProps<Row> {
  key: keyof Row
  children: ReactNode
  label?: string
  badge?: string
  highlighted: boolean
}

const Wrapper = styled.td<Pick<TableCellProps<any>, 'highlighted'>>`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.5rem 0.3rem;

  ${(props) => css`
    ${props.highlighted &&
    css`
      && {
        background: ${props.theme.colors.secondary};
        color: #fff;
      }
    `}
  `}
`

export const TableCell: <Row>(props: TableCellProps<Row>) => React.ReactElement | null = observer(
  ({ children, highlighted }) => {
    return <Wrapper highlighted={highlighted}>{children}</Wrapper>
  }
)
