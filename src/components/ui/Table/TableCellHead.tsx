import React, { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

const Wrapper = styled.th`
  background: ${(props) => props.theme.colors.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  color: #fff;
  font-weight: 700;
  padding: 0.5rem 0.3rem;
`

const Badge = styled.div`
  background: ${(props) => props.theme.colors.background};
  border-radius: 0.25rem;
  display: inline-block;
  font-size: 75%;
  padding: 0.25em 0.4em;
`

export interface TableCellProps {
  children: ReactNode
  badge?: string
}

export const TableCellHead: FC<TableCellProps> = observer(({ badge, children }) => {
  return (
    <Wrapper>
      {children} {badge && <Badge>{badge}</Badge>}
    </Wrapper>
  )
})
