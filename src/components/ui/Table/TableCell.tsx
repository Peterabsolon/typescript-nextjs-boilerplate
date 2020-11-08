import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const Wrapper = styled.td`
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 0.5rem 0.3rem;
`

export interface TableCellProps {
  children: ReactNode
}

export const TableCell: FC<TableCellProps> = observer(({ children }) => {
  return <Wrapper>{children}</Wrapper>
})
