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

interface TableProps<Row> {
  rows: ({ id?: string | number } & Row)[]
  cols: { key: keyof Row; label?: string; badge?: string; render?: (item: Row) => ReactNode }[]
}

export const Table: <Row>(props: TableProps<Row>) => React.ReactElement | null = observer(
  ({ rows, cols }) => (
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
            <TableRow row={row} key={key}>
              {cols.map((col) => {
                const value = row?.[col.key]

                return (
                  <TableCell key={`${key}-${col.key}`}>
                    {col.render ? col.render(row) : value}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </tbody>
    </StyledTable>
  )
)
