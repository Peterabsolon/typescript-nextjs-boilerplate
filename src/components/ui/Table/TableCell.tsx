import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

export interface TableCellProps {
  children: ReactNode
}

export const TableCell: FC<TableCellProps> = observer(({ children }) => {
  return <td style={{ paddingRight: 15 }}>{children}</td>
})
