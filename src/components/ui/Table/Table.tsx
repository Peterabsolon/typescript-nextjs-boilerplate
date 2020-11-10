import { ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { TableRow } from './TableRow'
import { TableCell } from './TableCell'
import { TableCellHead } from './TableCellHead'

const StyledTable = styled.table`
  background: #fff;
  text-align: left;
  margin-bottom: 13px;
  width: 100%;
`
export interface ColProps<Row> {
  key: keyof Row
  label?: string
  badge?: string
  render?: (row: Row) => ReactNode
  highlighted?: (row: Row) => boolean
}

interface TableProps<Row> {
  rows: ({ id?: string | number } & Row)[]
  rowHighlighted?: (row: Row) => boolean
  cols: ColProps<Row>[]
}

export const Table = observer(
  <Row extends IAnyObject>({
    rows,
    rowHighlighted,
    cols,
  }: TableProps<Row>): React.ReactElement | null => (
    <StyledTable>
      <thead>
        <tr>
          {cols.map((col) => (
            <TableCellHead key={col.key.toString()} badge={col.badge}>
              {col.label || col.key}
            </TableCellHead>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => {
          const key = row.id || uuid()

          return (
            <TableRow
              key={key}
              row={row}
              highlighted={typeof rowHighlighted === 'function' && rowHighlighted(row)}
            >
              {cols.map((col) => (
                <TableCell
                  key={`${key}-${col.key}`}
                  highlighted={typeof col.highlighted === 'function' && col.highlighted(row)}
                >
                  {col.render ? col.render(row) : row?.[col.key]}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </tbody>
    </StyledTable>
  )
)
