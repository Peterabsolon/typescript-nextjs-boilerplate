import { FC } from 'react'
import NextLink from 'next/link'
import { observer } from 'mobx-react-lite'
import { Link as RebassLink } from 'rebass'

interface LinkProps {
  href: string
}

export const Link: FC<LinkProps> = observer(({ href, children }) => {
  return (
    <NextLink href={href}>
      <RebassLink href={href}>{children}</RebassLink>
    </NextLink>
  )
})
