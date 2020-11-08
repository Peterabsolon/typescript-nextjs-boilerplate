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
  cols: { key: keyof Row; label?: string; badge?: string }[]
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
              {cols.map((col) => (
                <TableCell key={`${key}-${col.key}`}>{row?.[col.key]}</TableCell>
              ))}
            </TableRow>
          )
        })}
      </tbody>
    </StyledTable>
  )
)
