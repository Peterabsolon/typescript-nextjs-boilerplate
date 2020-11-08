import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

const StyledTable = styled.table`
  text-align: left;
  opacity: 0.5;
`

interface TableProps<Row> {
  rows: ({ id: string | number } & Row)[]
  cols: { key: keyof Row; label?: string; unit?: string }[]
}

export const Table: <Row>(props: TableProps<Row>) => React.ReactElement | null = observer(
  ({ rows, cols }) => (
    <StyledTable>
      <thead>
        <tr>
          {cols.map((col) => (
            <th key={col.key.toString()} style={{ paddingRight: 15 }}>
              {col.label || col.key}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row) => (
          <TableRow row={row} key={row.id}>
            {cols.map((col) => (
              <TableCell key={`${row.id}-${col.key}`}>{row?.[col.key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
  )
)
