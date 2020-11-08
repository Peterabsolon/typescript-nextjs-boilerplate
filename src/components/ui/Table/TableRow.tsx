import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

export interface TableRowProps {
  children: ReactNode
  row: IAnyObject
}

export const TableRow: FC<TableRowProps> = observer(({ children }) => {
  return <tr>{children}</tr>
})
