import { FC } from 'react'
import NextLink from 'next/link'
import { observer } from 'mobx-react-lite'
import { Link as RebassLink } from 'rebass'
import styled from 'styled-components'

interface LinkProps {
  href: string
}

const StyledRebassLink = styled(RebassLink)`` as typeof RebassLink

export const Link: FC<LinkProps> = observer(({ href, children }) => {
  return (
    <NextLink href={href}>
      <StyledRebassLink href={href}>{children}</StyledRebassLink>
    </NextLink>
  )
})
